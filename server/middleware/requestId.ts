import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Extend Express Request interface to include requestId
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

/**
 * Request ID Middleware
 * Assigns a unique tracking ID to every incoming HTTP request for distributed tracing & log correlation.
 */
export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const incomingId = req.headers['x-request-id'] as string;
  const requestId = incomingId || `req-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  next();
};
