import { Request, Response, NextFunction } from 'express';
import { sanitizeDbRecord } from '../db/databaseService';
import { AuthenticatedRequest } from './authSecurity';

/**
 * Database Data Projection Sanitizer Middleware
 * Intercepts JSON responses and automatically strips internal database fields before client delivery.
 */
export const sanitizeResponseProjection = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (body: any) {
    if (body && typeof body === 'object') {
      if (Array.isArray(body.data)) {
        body.data = body.data.map((item: any) => sanitizeDbRecord(item));
      } else if (body.data && typeof body.data === 'object') {
        body.data = sanitizeDbRecord(body.data);
      } else if (body.user && typeof body.user === 'object') {
        body.user = sanitizeDbRecord(body.user);
      }
    }
    return originalJson.call(this, body);
  };

  next();
};

/**
 * Authorization Guard Middleware for Database Update/Delete Mutations
 * Enforces authorization verification before allowing UPDATE or DELETE operations.
 */
export const authorizeDatabaseMutation = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const isMutation = ['PUT', 'PATCH', 'DELETE'].includes(req.method);

  if (isMutation) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required to perform database updates or deletions.',
      });
    }

    const targetResourceId = req.params.officerId || req.params.id || req.body?.officerId;

    if (targetResourceId && targetResourceId.toUpperCase() !== req.user.karmayogiId.toUpperCase()) {
      console.warn(`[Unauthorized DB Mutation Attempt] Officer ${req.user.karmayogiId} attempted ${req.method} on ${req.url}`);
      return res.status(403).json({
        success: false,
        error: 'Database Security Error: You are not authorized to update or delete this resource.',
      });
    }
  }

  next();
};
