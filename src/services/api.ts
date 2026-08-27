import { 
  AppLanguage, 
  DifficultyLevel, 
  BloomsLevel, 
  Question, 
  AssessmentResult, 
  VivaTurn 
} from '../types';
import { secureHttpClient } from './secureHttpClient';

export interface QuizGenerationPayload {
  manualText: string;
  manualTitle: string;
  targetRole: string;
  difficulty: DifficultyLevel;
  questionCount: number;
  bloomsFocus: BloomsLevel | 'All';
  language?: AppLanguage;
}

export interface QuizGenerationResponse {
  success?: boolean;
  quiz_title?: string;
  source_manual?: string;
  competency_focus?: string;
  questions?: Question[];
  aiTransparency?: any;
  error?: string;
}

export interface VivaQuestionPayload {
  topic: string;
  officerRole: string;
  difficulty: DifficultyLevel;
  language: AppLanguage;
  chatHistory: VivaTurn[];
}

export interface VivaQuestionResponse {
  success: boolean;
  data?: {
    question: string;
    context_hint?: string;
    target_concepts?: string[];
  };
  error?: string;
}

export interface VivaEvaluationPayload {
  question: string;
  officerAnswer: string;
  topic: string;
  officerRole: string;
  language: AppLanguage;
}

export interface VivaEvaluationResponse {
  success: boolean;
  data?: {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D';
    summary_feedback: string;
    strengths: string[];
    gaps: string[];
    manual_citation: string;
    recommended_reading?: string;
  };
  error?: string;
}

/**
 * Service Abstraction for MoSPI Competency AI Operations
 * Utilizes secureHttpClient for request timeout protection, in-flight request deduplication,
 * friendly error messages, and XSS string sanitization.
 */
export class MoSPIAssessmentApiService {
  /**
   * Triggers Gemini 3.7 Flash to generate structured MCQs from manual text
   */
  public static async generateQuizFromManual(payload: QuizGenerationPayload): Promise<QuizGenerationResponse> {
    try {
      return await secureHttpClient<QuizGenerationResponse>('/api/generate-mcqs', {
        method: 'POST',
        body: JSON.stringify(payload),
        timeoutMs: 20000, // 20s timeout for complex AI generation
      });
    } catch (error: any) {
      console.warn('[MoSPIApiService] API quiz generation exception:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to connect to MoSPI assessment server.',
      };
    }
  }

  /**
   * Fetches an oral examination question from Gemini Board Examiner
   */
  public static async fetchVivaQuestion(payload: VivaQuestionPayload): Promise<VivaQuestionResponse> {
    try {
      return await secureHttpClient<VivaQuestionResponse>('/api/viva-examiner/question', {
        method: 'POST',
        body: JSON.stringify(payload),
        timeoutMs: 15000,
      });
    } catch (error: any) {
      console.warn('[MoSPIApiService] Viva question fetch exception:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to generate board viva question.',
      };
    }
  }

  /**
   * Evaluates officer oral response using Gemini Board Examiner
   */
  public static async evaluateVivaResponse(payload: VivaEvaluationPayload): Promise<VivaEvaluationResponse> {
    try {
      return await secureHttpClient<VivaEvaluationResponse>('/api/viva-examiner/evaluate', {
        method: 'POST',
        body: JSON.stringify(payload),
        timeoutMs: 15000,
      });
    } catch (error: any) {
      console.warn('[MoSPIApiService] Viva evaluation exception:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to evaluate candidate oral response.',
      };
    }
  }

  /**
   * Evaluates officer competency gaps and iGOT module mapping
   */
  public static async evaluateCompetencyGaps(payload: any): Promise<any> {
    try {
      return await secureHttpClient<any>('/api/competency-gap-analysis', {
        method: 'POST',
        body: JSON.stringify(payload),
        timeoutMs: 15000,
      });
    } catch (error: any) {
      console.warn('[MoSPIApiService] Competency gap evaluation exception:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to analyze competency gaps.',
      };
    }
  }
}
