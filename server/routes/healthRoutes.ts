import { Router } from 'express';
import { handleHealthCheck } from '../controllers/healthController';

export const healthRouter = Router();

healthRouter.get('/health', handleHealthCheck);
