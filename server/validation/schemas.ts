import { z } from 'zod';

/**
 * Zod Request Validation Schemas
 * Strictly validates request body, query parameters, URL params, and file upload metadata.
 */

// 1. Officer Login Schema
export const loginSchema = z.object({
  karmayogiId: z
    .string()
    .min(3, 'Karmayogi ID must be at least 3 characters long.')
    .max(50, 'Karmayogi ID exceeds maximum length of 50 characters.')
    .regex(/^[A-Za-z0-9\-_]+$/, 'Karmayogi ID must contain only alphanumeric characters, hyphens, or underscores.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .optional(),
  role: z.string().optional(),
  division: z.string().optional(),
});

// 2. Officer Registration Schema
export const registerSchema = z.object({
  karmayogiId: z
    .string()
    .min(3, 'Karmayogi ID must be at least 3 characters long.')
    .max(50, 'Karmayogi ID exceeds maximum length of 50 characters.')
    .regex(/^[A-Za-z0-9\-_]+$/, 'Karmayogi ID must contain only alphanumeric characters, hyphens, or underscores.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.'),
  name: z.string().min(2, 'Name must be at least 2 characters.').optional(),
  role: z.string().optional(),
  division: z.string().optional(),
});

// 3. AI MCQ Generation Schema
export const generateMcqsSchema = z.object({
  manualText: z
    .string()
    .min(10, 'manualText must contain at least 10 characters of statistical manual content.')
    .max(100000, 'manualText exceeds maximum size limit of 100,000 characters.'),
  manualTitle: z.string().max(200, 'manualTitle is too long.').optional().default('MoSPI Statistical Manual'),
  targetRole: z.string().max(100).optional().default('Senior Statistical Officer'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional().default('Intermediate'),
  questionCount: z.number().int().min(1, 'Minimum 1 question required.').max(20, 'Maximum 20 questions allowed.').optional().default(5),
  bloomsFocus: z.string().optional().default('All'),
  competencyFocus: z.string().optional().default('Statistical Methodology & Validation'),
  includeCitations: z.boolean().optional().default(true),
});

// 4. Competency Gap Analysis Schema
export const competencyGapSchema = z.object({
  officerRole: z.string().max(100).optional().default('Statistical Officer'),
  recentAssessmentScores: z.array(z.record(z.string(), z.any())).optional().default([]),
  currentCompetencies: z.array(z.record(z.string(), z.any())).optional().default([]),
  targetBenchmark: z.number().min(0).max(100).optional().default(85),
});

// 5. Manual Upload & Metadata Analysis Schema
export const analyzeManualSchema = z.object({
  manualText: z
    .string()
    .min(10, 'manualText must be at least 10 characters long.'),
  filename: z.string().max(255, 'Filename is too long.').optional().default('Official Document'),
  fileSize: z.number().max(52428800, 'File size exceeds maximum allowed limit of 50MB.').optional(),
  mimeType: z.string().optional(),
});

// 6. Viva Examiner Question Request Schema
export const vivaQuestionSchema = z.object({
  topic: z.string().max(200).optional().default('Survey Sampling Techniques'),
  officerRole: z.string().max(100).optional().default('Senior Statistical Officer'),
  difficulty: z.string().optional().default('Intermediate'),
  language: z.enum(['en', 'hi', 'ta']).optional().default('en'),
  chatHistory: z.array(z.record(z.string(), z.any())).optional().default([]),
});

// 7. Viva Examiner Evaluation Request Schema
export const vivaEvaluateSchema = z.object({
  question: z
    .string()
    .min(5, 'Question string must be at least 5 characters.'),
  officerAnswer: z
    .string()
    .min(2, 'Officer answer must be at least 2 characters long.'),
  topic: z.string().optional().default('Statistical Operations'),
  officerRole: z.string().optional().default('Senior Statistical Officer'),
  language: z.enum(['en', 'hi', 'ta']).optional().default('en'),
});

// 8. URL Officer Parameter Validation Schema
export const officerParamSchema = z.object({
  officerId: z
    .string()
    .min(3, 'officerId parameter must be at least 3 characters long.')
    .regex(/^[A-Za-z0-9\-_]+$/, 'Invalid officerId format in URL.'),
});

// 9. Query Parameters Schema Example
export const generalQuerySchema = z.object({
  lang: z.enum(['en', 'hi', 'ta']).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});
