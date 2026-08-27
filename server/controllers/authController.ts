import { Request, Response, NextFunction } from 'express';
import { loginWithCustomCredentials, getDemoOfficers } from '../services/authService';

export const handleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { karmayogiId, password } = req.body;
    const result = await loginWithCustomCredentials(karmayogiId, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const handleGetDemoOfficers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const officers = getDemoOfficers();
    res.json({ officers });
  } catch (err) {
    next(err);
  }
};
