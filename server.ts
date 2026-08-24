import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import modular security middleware
import { configureSecurityHeaders } from "./server/middleware/securityHeaders";
import { configureCors } from "./server/middleware/corsConfig";
import { enforceHttps } from "./server/middleware/httpsRedirect";
import {
  authLimiter,
  aiLimiter,
  uploadLimiter,
  generalApiLimiter,
} from "./server/middleware/rateLimiters";
import { centralizedErrorHandler } from "./server/middleware/errorHandler";
import {
  handleOfficerLogin,
  handleOfficerRegister,
  handleOfficerLogout,
  handleOfficerSessionCheck,
  authenticateOfficer,
  verifyResourceOwnership,
} from "./server/middleware/authSecurity";
import { validateRequest } from "./server/middleware/validateRequest";
import {
  loginSchema,
  registerSchema,
  generateMcqsSchema,
  competencyGapSchema,
  analyzeManualSchema,
  vivaQuestionSchema,
  vivaEvaluateSchema,
  officerParamSchema,
} from "./server/validation/schemas";
import { sanitizeResponseProjection, authorizeDatabaseMutation } from "./server/middleware/dbSecurity";
import { secureUpload, handleUploadErrors } from "./server/middleware/uploadSecurity";
import { httpLoggerMiddleware } from "./server/middleware/httpLogger";
import { logFileUpload, logAiRequest, logger } from "./server/logging/logger";

dotenv.config();

const app = express();
const parsedPort = Number.parseInt(process.env.PORT || "3000", 10);
const PORT = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

// 1. Production HTTP Telemetry & Access Logger
app.use(httpLoggerMiddleware);

// 2. Force HTTPS in production
app.use(enforceHttps);

// 3. Helmet HTTP Security Headers (CSP, HSTS, Anti-XSS, Frameguard)
app.use(configureSecurityHeaders());

// 4. CORS origin restriction middleware
app.use(configureCors());

// 5. Secure Cookie Parser
app.use(cookieParser(process.env.SESSION_SECRET || "default_dev_secret"));

// 6. Body Parser with payload limit
app.use(express.json({ limit: "50mb" }));

// 7. Global API Rate Limiter
app.use("/api", generalApiLimiter);

// 8. Database Response Data Projection Sanitizer & Mutation Authorization Guard
app.use("/api", sanitizeResponseProjection);
app.use("/api", authorizeDatabaseMutation);

// Server-side Gemini initialization with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in the environment.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Route: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Authentication & Session Routes (with tight auth rate limiter, Zod request validation, bcrypt hashing, and JWT session handling)
app.post("/api/auth/register", authLimiter, validateRequest({ body: registerSchema }), handleOfficerRegister);
app.post("/api/auth/login", authLimiter, validateRequest({ body: loginSchema }), handleOfficerLogin);
app.post("/api/login", authLimiter, validateRequest({ body: loginSchema }), handleOfficerLogin);
app.post("/api/auth/logout", handleOfficerLogout);
app.get("/api/auth/me", authenticateOfficer, handleOfficerSessionCheck);

// Resource Ownership Verification Endpoint (Ensures officers can only access their own resources)
app.get("/api/officer/:officerId/profile", authenticateOfficer, validateRequest({ params: officerParamSchema }), verifyResourceOwnership, (req, res) => {
  res.status(200).json({
    success: true,
    user: (req as any).user,
    message: "Resource ownership verified.",
  });
});

// API Route: Generate Rigorous Bloom's Taxonomy MCQs from MoSPI Manuals
// Conforms to the MoSPI Karmayogi MCQ JSON Output Schema
app.post("/api/generate-mcqs", aiLimiter, validateRequest({ body: generateMcqsSchema }), async (req, res, next) => {
  try {
    const {
      manualText,
      manualTitle = "MoSPI Statistical Manual",
      targetRole = "Senior Statistical Officer",
      difficulty = "Intermediate",
      questionCount = 5,
      bloomsFocus = "All",
      competencyFocus = "Statistical Methodology & Validation",
      includeCitations = true,
    } = req.body;

    if (!manualText || manualText.trim().length === 0) {
      return res.status(400).json({ error: "manualText is required for assessment generation." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are an expert AI Assessment Engine for the Ministry of Statistics and Programme Implementation (MoSPI), Government of India, integrated with the iGOT Karmayogi competency framework.

Your task is to analyze official statistical guidelines, survey manuals, and policy documents, and generate rigorous, Bloom's Taxonomy-aligned Multiple Choice Questions (MCQs) to evaluate officer competency.

Rules:
1. Ground every question strictly in the provided text/manual.
2. Provide 4 plausible options with exactly 1 correct answer.
3. Include clear reasoning for why the correct option is right and cite the specific concept/section.
4. Categorize each question by Difficulty ("Beginner", "Intermediate", "Advanced") and Competency Tag (e.g., "Data Validation", "Sampling Design", "Price Index Calculation").
5. Ensure the tone is objective and academic throughout.`;

    const userPrompt = `Generate exactly ${Math.min(questionCount, 20)} Multiple Choice Questions based on the following official MoSPI manual excerpt:

Manual Title: ${manualTitle}
Target Officer Role: ${targetRole}
Target Difficulty: ${difficulty}
Bloom's Taxonomy / Skill Focus: ${bloomsFocus}
Competency Focus Area: ${competencyFocus}
Include Source Citations: ${includeCitations}

--- SOURCE MANUAL CONTENT ---
${manualText.slice(0, 15000)}
--- END SOURCE MANUAL CONTENT ---

Adhere strictly to the requested JSON response schema. Ensure options are 4 strings prefixed with A), B), C), D) and correct_answer is 'A', 'B', 'C', or 'D'.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for factual grounding
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quiz_title: { type: Type.STRING },
            source_manual: { type: Type.STRING },
            competency_focus: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correct_answer: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  citation: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  competency_tag: { type: Type.STRING },
                },
                required: [
                  "id",
                  "question",
                  "options",
                  "correct_answer",
                  "explanation",
                  "citation",
                  "difficulty",
                  "competency_tag",
                ],
              },
            },
          },
          required: ["quiz_title", "questions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    const rawQuestions = parsed.questions || [];

    // Map into frontend-compatible normalized Question objects
    const normalizedQuestions = rawQuestions.map((q: any, idx: number) => {
      // Parse options whether they are ["A) text", "B) text"] or just ["text", "text"]
      const optionLetters: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
      const formattedOptions = (q.options || []).map((optStr: string, optIdx: number) => {
        let cleanText = optStr.trim();
        const letter = optionLetters[optIdx] || 'A';
        // Remove leading "A) ", "A. ", "(A) ", "A - " if present
        cleanText = cleanText.replace(/^[A-Da-d][\)\.\:\-\s]+/, '').trim();
        cleanText = cleanText.replace(/^\([A-Da-d]\)\s*/, '').trim();
        return {
          id: letter,
          text: cleanText || optStr,
        };
      });

      // Normalize correct answer to A, B, C, or D
      let normCorrect = 'A';
      if (q.correct_answer) {
        const match = q.correct_answer.match(/[A-Da-d]/);
        if (match) {
          normCorrect = match[0].toUpperCase();
        }
      }

      // Infer Bloom's level if not explicitly defined
      const bloomsLevel = (['Remembering', 'Understanding', 'Applying', 'Analyzing', 'Evaluating'] as const)[idx % 5];

      return {
        id: `mcq-${Date.now()}-${idx + 1}`,
        questionNumber: idx + 1,
        question: q.question,
        options: formattedOptions,
        correctAnswer: normCorrect as 'A' | 'B' | 'C' | 'D',
        explanation: q.explanation,
        citation: q.citation || `Ref: ${parsed.source_manual || manualTitle}`,
        difficulty: (['Beginner', 'Intermediate', 'Advanced'].includes(q.difficulty) ? q.difficulty : difficulty) as any,
        competencyTag: q.competency_tag || competencyFocus,
        bloomsLevel,
        manualSource: parsed.source_manual || manualTitle,
      };
    });

    return res.json({
      success: true,
      quiz_title: parsed.quiz_title || `MoSPI Competency Assessment: ${manualTitle}`,
      source_manual: parsed.source_manual || manualTitle,
      competency_focus: parsed.competency_focus || competencyFocus,
      questions: normalizedQuestions,
      raw_quiz_output: parsed,
    });
  } catch (error: any) {
    next(error);
  }
});

// API Route: MoSPI Competency Evaluation Engine (Gap Analysis & iGOT Mapping)
// System Instruction & Schema from Google AI Studio
app.post("/api/competency-gap-analysis", aiLimiter, validateRequest({ body: competencyGapSchema }), async (req, res, next) => {
  try {
    const {
      officerRole = "Statistical Officer",
      recentAssessmentScores = [],
      currentCompetencies = [],
      targetBenchmark = 80,
    } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `You are the MoSPI Competency Evaluation Engine.

Given an officer's target role, self-assessment test results, and current competency scores (0-100), analyze the skill gaps against MoSPI benchmark standards and return:
1. Competency score breakdown.
2. High-priority deficit areas.
3. 3-4 recommended iGOT Karmayogi learning modules to bridge those exact gaps.

Output strictly valid JSON matching the following structure:
{
  "officer_role": "Statistical Officer",
  "overall_readiness_pct": 68,
  "competency_scores": [
    { "competency": "Sampling Design", "score": 85, "benchmark": 80, "status": "Proficient" },
    { "competency": "CPI / IIP Calculation", "score": 52, "benchmark": 75, "status": "Gap Identified" },
    { "competency": "Data Validation & Sanitization", "score": 45, "benchmark": 80, "status": "Critical Gap" }
  ],
  "recommended_igot_courses": [
    {
      "course_id": "iGOT-STAT-302",
      "title": "Automated Data Validation in Official Surveys",
      "target_competency": "Data Validation & Sanitization",
      "duration": "4 Hours",
      "priority": "High"
    }
  ]
}`;

    const promptText = `Evaluate the competency gaps and recommend targeted iGOT Karmayogi courses for:
Officer Role: ${officerRole}
Target Benchmark Standard: ${targetBenchmark}%

Current Assessment Data:
${JSON.stringify({
  role: officerRole,
  assessmentScores: recentAssessmentScores,
  currentCompetencyProfile: currentCompetencies,
}, null, 2)}

Calculate realistic, precise readiness percentage and high-impact iGOT Karmayogi courses tailored for MoSPI official statistical operations (e.g., NSS, PLFS, CPI, ASI, National Accounts, Python/R Data Analytics).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            officer_role: { type: Type.STRING },
            overall_readiness_pct: { type: Type.INTEGER },
            competency_scores: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  competency: { type: Type.STRING },
                  score: { type: Type.INTEGER },
                  benchmark: { type: Type.INTEGER },
                  status: { type: Type.STRING },
                },
                required: ["competency", "score", "benchmark", "status"],
              },
            },
            recommended_igot_courses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  course_id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  target_competency: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  priority: { type: Type.STRING },
                },
                required: ["course_id", "title", "target_competency", "duration", "priority"],
              },
            },
          },
          required: ["officer_role", "overall_readiness_pct", "competency_scores", "recommended_igot_courses"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");

    return res.json({
      success: true,
      analysis: parsed,
    });
  } catch (error: any) {
    next(error);
  }
});

// API Route: Secure Document File Upload (Validates JPG, JPEG, PNG, PDF <= 5MB, blocks executables & Path Traversal)
app.post("/api/upload-manual", uploadLimiter, secureUpload.single("manualFile"), handleUploadErrors, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "File Upload Error: No file uploaded or invalid form field. Expected field 'manualFile'.",
    });
  }

  logFileUpload({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    sizeBytes: req.file.size,
    ip: req.ip || '',
  });

  return res.status(200).json({
    success: true,
    message: "Statistical manual file uploaded and validated successfully.",
    file: {
      originalName: req.file.originalname,
      sanitizedFilename: req.file.filename,
      sizeBytes: req.file.size,
      mimeType: req.file.mimetype,
      savedPath: `/uploads/${req.file.filename}`,
    },
  });
});

// API Route: Analyze Manual & Extract Competencies
app.post("/api/analyze-manual", uploadLimiter, validateRequest({ body: analyzeManualSchema }), async (req, res, next) => {
  try {
    const { manualText, filename = "Official Document" } = req.body;
    if (!manualText) {
      return res.status(400).json({ error: "manualText is required" });
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Analyze the following official MoSPI manual or statistical text and extract structured metadata:
1. Short Title and Document Code
2. Executive Summary (2-3 sentences)
3. Key Competency Tags (3 to 6 tags)
4. Primary Sections/Chapters found
5. Recommended Target Roles in MoSPI (e.g. Senior Statistical Officer, Field Investigator)
6. Key Bloom's Taxonomy evaluation opportunities

Text:
${manualText.slice(0, 10000)}`,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            code: { type: Type.STRING },
            summary: { type: Type.STRING },
            keyCompetencies: { type: Type.ARRAY, items: { type: Type.STRING } },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                },
                required: ["id", "title", "content"],
              },
            },
            recommendedRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "summary", "keyCompetencies", "sections"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, analysis: parsed });
  } catch (error: any) {
    next(error);
  }
});

// API Route: AI Viva Examiner - Ask Question
app.post("/api/viva-examiner/question", aiLimiter, validateRequest({ body: vivaQuestionSchema }), async (req, res, next) => {
  try {
    const { topic = "Survey Sampling Techniques", officerRole = "Senior Statistical Officer", difficulty = "Intermediate", language = "en", chatHistory = [] } = req.body;
    const ai = getGeminiClient();

    const langName = language === "ta" ? "Tamil (தமிழ்)" : language === "hi" ? "Hindi (हिन्दी)" : "English";
    const systemInstruction = `You are a Senior MoSPI Board Examiner conducting an oral viva voce examination for a ${officerRole} in India.
Language of examination: ${langName}.
Topic: ${topic}.
Difficulty: ${difficulty}.
Your task: Formulate one clear, challenging, and practical oral examination question grounded in official MoSPI guidelines (NSS, PLFS, CPI, ASI, or National Accounts).
Keep your question focused, professional, and encouraging. Ask ONLY the question without conversational filler.`;

    const promptText = `Generate question #${chatHistory.length + 1} for candidate oral viva. Previous turns: ${JSON.stringify(chatHistory)}. Focus on evaluating practical statistical methodology.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.3,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            context_hint: { type: Type.STRING },
            target_concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["question", "target_concepts"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    next(error);
  }
});

// API Route: AI Viva Examiner - Evaluate Answer
app.post("/api/viva-examiner/evaluate", aiLimiter, validateRequest({ body: vivaEvaluateSchema }), async (req, res, next) => {
  try {
    const { question, officerAnswer, topic = "Statistical Operations", officerRole = "Senior Statistical Officer", language = "en" } = req.body;
    if (!question || !officerAnswer) {
      return res.status(400).json({ error: "question and officerAnswer are required." });
    }

    const ai = getGeminiClient();
    const langName = language === "ta" ? "Tamil (தமிழ்)" : language === "hi" ? "Hindi (हिन्दी)" : "English";

    const systemInstruction = `You are a Senior MoSPI Board Examiner evaluating an officer's viva response.
Language: ${langName}.
Officer Role: ${officerRole}. Topic: ${topic}.
Evaluate the candidate's answer for technical accuracy, adherence to MoSPI manual standards, completeness, and clarity.
Return strictly valid JSON with score (0-100), qualitative feedback, key strengths, gap areas, and manual citation.`;

    const promptText = `Question Asked: "${question}"
Officer's Answer: "${officerAnswer}"

Evaluate strictly and return JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            grade: { type: Type.STRING },
            summary_feedback: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
            manual_citation: { type: Type.STRING },
            recommended_reading: { type: Type.STRING },
          },
          required: ["score", "grade", "summary_feedback", "strengths", "gaps", "manual_citation"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    // Keep a single response envelope across the AI endpoints. The frontend
    // consumes `data`, as it already does for generated viva questions.
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    next(error);
  }
});

// Centralized error handling middleware
app.use(centralizedErrorHandler);

// Setup Vite middleware for full-stack integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MoSPI StatKarmayogi AI Server running on port ${PORT}`);
  });
}

start();
