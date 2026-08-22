# MoSPI StatKarmayogi AI Engine 🇮🇳

> **AI-Powered Competency Mapping & Assessment Platform for the Ministry of Statistics and Programme Implementation (MoSPI), Government of India, integrated with the iGOT Karmayogi Competency Framework.**

---

## 📌 Overview

**MoSPI StatKarmayogi Engine** is an intelligent, full-stack assessment and competency mapping platform designed to empower civil servants, statistical officers, field investigators, and data analysts across India.

By leveraging **Google Gemini 3.7 Flash**, the engine automatically digests complex statistical manuals, survey guidelines (NSS, PLFS, CPI, ASI, National Accounts), and policy documentation to generate grounded Bloom's Taxonomy-aligned assessments, conduct multilingual oral viva voce examinations, perform automated competency gap analysis, and recommend tailored iGOT Karmayogi learning paths.

---

## ✨ Key Features

### 1. 📄 AI Manual Analysis & MCQ Assessment Generator
* **Automatic Document Digesting:** Upload or paste excerpts from official MoSPI survey manuals and guidelines.
* **Bloom's Taxonomy Alignment:** Generates rigorous MCQs structured around *Remembering, Understanding, Applying, Analyzing, and Evaluating*.
* **Strict Source Grounding & Citations:** Every question includes direct citations, granular explanations, and difficulty ratings (*Beginner, Intermediate, Advanced*).

### 2. 🎯 Competency Gap Analysis & iGOT Mapping
* **Benchmark Evaluation:** Evaluates officer performance against role-specific target benchmarks.
* **Automated iGOT Karmayogi Course Recommendations:** Maps identified skill gaps directly to specific iGOT learning modules (e.g., *Automated Data Validation in Official Surveys*, *Consumer Price Index Compilation*).
* **Readiness Index:** Computes overall role-readiness percentage and radar breakdowns.

### 3. 🎙️ Multilingual AI Viva Voce Oral Examiner
* **Simulated Board Viva:** Interactive oral examination system tailored for MoSPI candidates.
* **Multilingual Support:** Conduct exams in **English**, **Hindi (हिन्दी)**, or **Tamil (தமிழ்)**.
* **AI Evaluation Engine:** Assesses candidates' verbal responses with scores (0–100), key strengths, gap analysis, and manual citations.

### 4. 📊 Analytics, Reports & Certificate Generation
* **Visual Dashboards:** Performance summaries, competency heatmaps, and progress tracking.
* **PDF Certificate Generation:** Built-in downloadable certificates of completion powered by `jsPDF` and interactive confetti celebrations.
* **PDF Document Preview:** Built-in PDF rendering using `pdfjs-dist`.

---

## 🛠️ Technology Stack

### **Frontend**
* **Framework:** React 19 + TypeScript + Vite 6
* **Styling:** TailwindCSS v4
* **Animations & UI:** Motion (Framer Motion), Lucide Icons
* **Utilities:** `jspdf`, `canvas-confetti`, `pdfjs-dist`

### **Backend**
* **Server:** Node.js + Express
* **Execution & Build:** `tsx`, `esbuild`

### **AI & Intelligence**
* **LLM Engine:** Google Gemini 3.7 Flash (`@google/genai` SDK)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm** or **bun**
* **Google Gemini API Key:** Get your API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mospi-statkarmayogi-engine.git
   cd mospi-statkarmayogi-engine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

---

## 🏃 Running the Application

### Development Mode
Runs the Express backend server with integrated Vite middleware and hot-module reloading:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Production Build & Run
To compile the frontend and bundle the Express server for production:
```bash
npm run build
npm start
```

### Type Checking & Linting
```bash
npm run lint
```

---

## 📡 API Endpoints Summary

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/health` | `GET` | Server health check and timestamp |
| `/api/generate-mcqs` | `POST` | Generates Bloom's Taxonomy-aligned MCQs grounded in uploaded MoSPI manual text |
| `/api/analyze-manual` | `POST` | Extracts key competency metadata, sections, and summary from raw manual text |
| `/api/competency-gap-analysis` | `POST` | Analyzes officer scores against role benchmarks and maps to iGOT Karmayogi modules |
| `/api/viva-examiner/question` | `POST` | Generates oral viva voce examination questions (English/Hindi/Tamil) |
| `/api/viva-examiner/evaluate` | `POST` | Evaluates oral viva response and returns score, feedback, strengths, and manual citations |

---

## 📁 Project Structure

```
├── server.ts                   # Express server & Gemini API integration routes
├── src/
│   ├── App.tsx                 # Main application layout and view router
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles & Tailwind import
│   ├── components/             # React UI components
│   │   ├── AnalyticsReportsView.tsx      # Dashboard & assessment analytics
│   │   ├── AssessmentReportModal.tsx     # Comprehensive report popup
│   │   ├── AssessmentRunnerModal.tsx     # Interactive quiz runner
│   │   ├── CertificateModal.tsx          # PDF Certificate viewer & download
│   │   ├── CompetencyAnalyzerView.tsx    # Gap analysis engine view
│   │   ├── DashboardView.tsx             # Main dashboard
│   │   ├── IGOTLearningPathView.tsx      # iGOT course recommendations
│   │   ├── LoginModal.tsx                # Officer authentication modal
│   │   ├── QuizGeneratorView.tsx         # AI Manual parser & quiz generator
│   │   ├── SideNavBar.tsx                # Primary navigation sidebar
│   │   ├── TopNavBar.tsx                 # Header navigation & officer profile
│   │   └── VivaExaminerView.tsx          # AI Oral Examiner chat interface
│   ├── data/
│   │   └── mockData.ts         # Pre-loaded MoSPI manuals & sample officer profiles
│   ├── services/
│   │   └── api.ts              # API client methods
│   └── types.ts                # TypeScript type definitions
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">
  <sub>Built for the <b>Ministry of Statistics and Programme Implementation (MoSPI)</b> & <b>iGOT Karmayogi Platform</b>.</sub>
</div>
