import { 
  AppLanguage, 
  DifficultyLevel, 
  BloomsLevel, 
  Question, 
  AssessmentResult, 
  VivaTurn 
} from '../types';

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
    gap_areas: string[];
    manual_citation: string;
  };
  error?: string;
}

/**
 * Service Abstraction for MoSPI Competency AI Operations
 */
export class MoSPIAssessmentApiService {
  /**
   * Triggers Gemini 3.7 Flash to generate structured MCQs from manual text
   */
  public static async generateQuizFromManual(payload: QuizGenerationPayload): Promise<QuizGenerationResponse> {
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned status HTTP ${response.status}`);
      }

      return await response.json();
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
      const response = await fetch('/api/viva-examiner/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      return await response.json();
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
      const response = await fetch('/api/viva-examiner/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.warn('[MoSPIApiService] Viva evaluation exception:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to evaluate candidate oral response.',
      };
    }
  }
}
