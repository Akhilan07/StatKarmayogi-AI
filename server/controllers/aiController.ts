import { Request, Response, NextFunction } from 'express';
import {
  generateMcqsFromManual,
  analyzeCompetencyGaps,
  analyzeManualText,
  generateVivaQuestion,
  evaluateVivaAnswer,
} from '../services/geminiService';

export const handleGenerateMcqs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await generateMcqsFromManual(req.body);
    res.json({
      success: true,
      requestId: (req as any).requestId,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleCompetencyGapAnalysis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await analyzeCompetencyGaps(req.body);
    res.json({
      success: true,
      requestId: (req as any).requestId,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleAnalyzeManual = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await analyzeManualText(req.body);
    res.json({
      success: true,
      requestId: (req as any).requestId,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGenerateVivaQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await generateVivaQuestion(req.body);
    res.json({
      success: true,
      requestId: (req as any).requestId,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleEvaluateVivaAnswer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await evaluateVivaAnswer(req.body);
    res.json({
      success: true,
      requestId: (req as any).requestId,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
