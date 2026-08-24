export type TabType = 'dashboard' | 'competency' | 'igot' | 'generator' | 'analytics' | 'viva';

export type AppLanguage = 'en' | 'hi' | 'ta';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type BloomsLevel = 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating';

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  questionNumber: number;
  question: string;
  options: MCQOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  citation: string;
  difficulty: DifficultyLevel;
  competencyTag: string;
  bloomsLevel: BloomsLevel;
  manualSource?: string;
}

export interface AssessmentConfig {
  targetRole: string;
  difficulty: DifficultyLevel;
  questionCount: number;
  includeCitations: boolean;
  bloomsFocus?: BloomsLevel | 'All';
  competencyFocus?: string;
  manualId: string;
  customText?: string;
}

export interface AssessmentResult {
  id: string;
  title: string;
  timestamp: string;
  manualTitle: string;
  targetRole: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  questions: Question[];
  bloomsBreakdown: Record<BloomsLevel, { correct: number; total: number }>;
  competencyBreakdown: Record<string, { correct: number; total: number }>;
  recommendations: string[];
}

export interface OfficialManual {
  id: string;
  title: string;
  code: string;
  department: string;
  year: string;
  pages: number;
  fileSize: string;
  summary: string;
  keyCompetencies: string[];
  sampleText: string;
  sections: { id: string; title: string; content: string }[];
}

export type CompetencyPillar = 'Statistical' | 'Technical' | 'Digital Governance' | 'Behavioural & Managerial';

export interface CompetencyDomain {
  id: string;
  name: string;
  shortName: string;
  pillar: CompetencyPillar;
  currentLevel: number; // 1-5
  targetLevel: number; // 1-5
  peerBenchmark: number; // 1-5
  scorePercentage: number;
  status: 'Critical Gap' | 'High Gap' | 'Developing' | 'Proficient';
  skills: {
    name: string;
    status: 'Critical Gap' | 'High Gap' | 'Developing' | 'Proficient';
    iGotCourseId?: string;
  }[];
}

export interface IGOTCourse {
  id: string;
  title: string;
  provider: string;
  matchScore: number;
  duration: string;
  level: DifficultyLevel;
  competency: string;
  description: string;
  imageAlt: string;
  imageUrl: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  syllabus: string[];
}

export interface NSSTATPACProgram {
  id: string;
  title: string;
  tpacCode: string;
  category: 'Probationers' | 'In-Service' | 'Specialized Workshop' | 'Executive Leadership';
  duration: string;
  mode: 'Residential (NSSTA Greater Noida)' | 'Hybrid / Online' | 'Institutional Workshop';
  targetCadre: string;
  matchScore: number;
  competency: string;
  description: string;
  upcomingBatchDate: string;
  seatsAvailable: number;
  nominationStatus: 'Open' | 'Nominated' | 'Waitlisted' | 'Completed';
  syllabus: string[];
}

export interface LearningHistoryItem {
  id: string;
  title: string;
  completedDate: string;
  score: number;
  certificateId: string;
  competency: string;
}

export interface AIStudioMCQ {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  citation: string;
  difficulty: string;
  competency_tag: string;
}

export interface AIStudioQuizOutput {
  quiz_title: string;
  source_manual: string;
  competency_focus: string;
  questions: AIStudioMCQ[];
}

export interface CompetencyScoreItem {
  competency: string;
  score: number;
  benchmark: number;
  status: 'Proficient' | 'Gap Identified' | 'Critical Gap' | 'Developing';
}

export interface RecommendedIGOTCourse {
  course_id: string;
  title: string;
  target_competency: string;
  duration: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface CompetencyGapAnalysisResult {
  officer_role: string;
  overall_readiness_pct: number;
  competency_scores: CompetencyScoreItem[];
  recommended_igot_courses: RecommendedIGOTCourse[];
  executive_summary?: string;
}

// AI Viva Examiner Types
export interface VivaTurn {
  id: string;
  question: string;
  contextHint?: string;
  targetConcepts?: string[];
  userAnswer?: string;
  score?: number;
  grade?: string;
  feedback?: string;
  strengths?: string[];
  gaps?: string[];
  manualCitation?: string;
  recommendedReading?: string;
}

export interface VivaSession {
  id: string;
  topic: string;
  officerRole: string;
  difficulty: DifficultyLevel;
  startTime: string;
  turns: VivaTurn[];
  overallScore?: number;
  status: 'active' | 'completed';
}

export interface MasteryBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  earnedDate?: string;
  isUnlocked: boolean;
  karmaPointsReward: number;
}

export interface DivisionMetric {
  code: string;
  name: string;
  officersCount: number;
  avgReadiness: number;
  topGap: string;
  status: 'Optimal' | 'Requires Attention' | 'Critical Training Deficit';
}

export interface OfficerProfile {
  name: string;
  role: string;
  division: string;
  karmayogiId: string;
  avatarUrl?: string;
  readinessScore?: number;
  karmaPoints?: number;
}


