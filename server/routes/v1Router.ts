import { Router } from 'express';
import { healthRouter } from './healthRoutes';
import { authRouter } from './authRoutes';
import { officerRouter } from './officerRoutes';
import { aiRouter } from './aiRoutes';

export const v1Router = Router();

// Mount Health Check Routes
v1Router.use('/', healthRouter);

// Mount Modular API Domains under v1
v1Router.use('/auth', authRouter);
v1Router.use('/officer', officerRouter);
v1Router.use('/', aiRouter);

export default v1Router;
