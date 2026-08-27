import { Router } from 'express';
import { aiLimiter } from '../middleware/rateLimiters';
import { validateBody } from '../middleware/validateRequest';
import {
  generateMcqsSchema,
  competencyGapSchema,
  analyzeManualSchema,
  vivaQuestionSchema,
  vivaEvaluateSchema,
} from '../validation/schemas';
import {
  handleGenerateMcqs,
  handleCompetencyGapAnalysis,
  handleAnalyzeManual,
  handleGenerateVivaQuestion,
  handleEvaluateVivaAnswer,
} from '../controllers/aiController';

export const aiRouter = Router();

aiRouter.post('/generate-mcqs', aiLimiter, validateBody(generateMcqsSchema), handleGenerateMcqs);
aiRouter.post('/competency-gap-analysis', aiLimiter, validateBody(competencyGapSchema), handleCompetencyGapAnalysis);
aiRouter.post('/analyze-manual', aiLimiter, validateBody(analyzeManualSchema), handleAnalyzeManual);
aiRouter.post('/viva-examiner/question', aiLimiter, validateBody(vivaQuestionSchema), handleGenerateVivaQuestion);
aiRouter.post('/viva-examiner/evaluate', aiLimiter, validateBody(vivaEvaluateSchema), handleEvaluateVivaAnswer);
