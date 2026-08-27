import { Request, Response, NextFunction } from 'express';
import { getOfficerProfile, getOfficerCompetencyProfile } from '../services/officerService';

export const handleGetOfficerProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const karmayogiId = req.params.id || 'KARM-MOSPI-88941';
    const profile = getOfficerProfile(karmayogiId);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const handleGetOfficerCompetencies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const karmayogiId = req.params.id || 'KARM-MOSPI-88941';
    const competencies = getOfficerCompetencyProfile(karmayogiId);
    res.json({ success: true, data: competencies });
  } catch (err) {
    next(err);
  }
};
