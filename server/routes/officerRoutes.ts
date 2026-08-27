import { Router } from 'express';
import { handleGetOfficerProfile, handleGetOfficerCompetencies } from '../controllers/officerController';

export const officerRouter = Router();

officerRouter.get('/profile/:id?', handleGetOfficerProfile);
officerRouter.get('/competencies/:id?', handleGetOfficerCompetencies);
