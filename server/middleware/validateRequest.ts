import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface ValidationTargets {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
}

/**
 * Reusable Request Validation Middleware
 * Validates request body, query parameters, URL params, and uploaded metadata using Zod schemas.
 * Never trusts frontend validation and returns clear, helpful 400 Bad Request error responses.
 */
export const validateRequest = (targets: ValidationTargets) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationErrors: Array<{ target: string; field: string; message: string }> = [];

      // 1. Validate URL Parameters
      if (targets.params) {
        const result = targets.params.safeParse(req.params);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            validationErrors.push({
              target: 'params',
              field: issue.path.join('.'),
              message: issue.message,
            });
          });
        } else {
          req.params = result.data;
        }
      }

      // 2. Validate Query Parameters
      if (targets.query) {
        const result = targets.query.safeParse(req.query);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            validationErrors.push({
              target: 'query',
              field: issue.path.join('.'),
              message: issue.message,
            });
          });
        } else {
          req.query = result.data;
        }
      }

      // 3. Validate Request Body & Upload Metadata
      if (targets.body) {
        const result = targets.body.safeParse(req.body);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            validationErrors.push({
              target: 'body',
              field: issue.path.join('.'),
              message: issue.message,
            });
          });
        } else {
          req.body = result.data;
        }
      }

      // If any validation errors exist, reject request with 400 Bad Request
      if (validationErrors.length > 0) {
        console.warn(`[Validation Failure] ${req.method} ${req.url} - ${validationErrors.length} issues detected`);
        return res.status(400).json({
          success: false,
          error: 'Validation Error: Invalid input parameters provided.',
          details: validationErrors,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Convenience helper to validate request body
 */
export const validateBody = (schema: ZodSchema<any>) => validateRequest({ body: schema });
