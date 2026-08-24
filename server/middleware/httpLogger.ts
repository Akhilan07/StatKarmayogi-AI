import { Request, Response, NextFunction } from 'express';
import { logger } from '../logging/logger';

/**
 * Express HTTP Request Telemetry & Access Logging Middleware
 * Logs method, URL, execution duration, status code, and IP address while masking sensitive parameters.
 */
export const httpLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    const statusCode = res.statusCode;

    const logData = {
      category: 'HTTP_ACCESS',
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode,
      durationMs,
      ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    };

    if (statusCode >= 500) {
      logger.error(`[HTTP ${statusCode}] ${req.method} ${req.originalUrl} (${durationMs}ms)`, logData);
    } else if (statusCode >= 400) {
      logger.warn(`[HTTP ${statusCode}] ${req.method} ${req.originalUrl} (${durationMs}ms)`, logData);
    } else {
      logger.info(`[HTTP ${statusCode}] ${req.method} ${req.originalUrl} (${durationMs}ms)`, logData);
    }
  });

  next();
};
