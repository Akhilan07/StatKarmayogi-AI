import { Request, Response, NextFunction } from 'express';
import { logApiFailure } from '../logging/logger';

/**
 * Centralized Error Handling Middleware
 * Sanitizes internal exception details and prevents sensitive stack trace leaks in production.
 */
export const centralizedErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = err.status || err.statusCode || 500;

  // Always log complete error trace to winston logging pipeline
  logApiFailure(req, err instanceof Error ? err : new Error(err?.message || 'Server Error'), statusCode);

  // Prepare sanitized response payload
  const errorResponse: {
    success: boolean;
    error: string;
    code?: string;
    stack?: string;
  } = {
    success: false,
    error: isProduction && statusCode === 500
      ? 'An unexpected security or system error occurred. Please try again later.'
      : err.message || 'Internal Server Error',
  };

  // Only attach stack trace in non-production environments
  if (!isProduction && err.stack) {
    errorResponse.stack = err.stack;
  }

  if (err.code) {
    errorResponse.code = err.code;
  }

  res.status(statusCode).json(errorResponse);
};
