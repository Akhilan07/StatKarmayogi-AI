import { Router } from 'express';
import { validateBody } from '../middleware/validateRequest';
import { loginSchema } from '../validation/schemas';
import { handleLogin, handleGetDemoOfficers } from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), handleLogin);
authRouter.get('/demo-officers', handleGetDemoOfficers);
