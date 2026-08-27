import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export const handleHealthCheck = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const memoryUsage = process.memoryUsage();
    res.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      version: 'v1.0.0',
      uptimeSeconds: Math.floor(process.uptime()),
      memory: {
        rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
        heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      },
      subsystems: {
        geminiAiService: env.GEMINI_API_KEY ? 'CONFIGURED' : 'UNCONFIGURED',
        igotTelemetrySync: 'ONLINE',
      },
    });
  } catch (err) {
    next(err);
  }
};
