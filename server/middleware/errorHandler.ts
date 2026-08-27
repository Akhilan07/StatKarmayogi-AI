import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { logApiFailure } from '../logging/logger';

/**
 * Centralized Error Handling Middleware
 * Standardizes API error responses, sanitizes stack traces in production,
 * attaches Request ID correlation headers, and enforces proper HTTP status codes.
 */
export const centralizedErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const requestId = req.requestId || 'req-unknown';

  let statusCode = err.statusCode || err.status || 500;
  let errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'An unexpected server error occurred.';
  let details = err.details || undefined;

  // Handle specific error instances
  if (err.name === 'SyntaxError' && (err as any).status === 400 && 'body' in err) {
    statusCode = 400;
    errorCode = 'INVALID_JSON_PAYLOAD';
    message = 'Malformed JSON body syntax provided in request.';
  } else if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorCode = 'INVALID_AUTH_TOKEN';
    message = 'Invalid or expired session security token.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    errorCode = 'EXPIRED_AUTH_TOKEN';
    message = 'Session security token has expired. Please re-authenticate.';
  } else if (err.name === 'ZodError') {
    statusCode = 422;
    errorCode = 'VALIDATION_ERROR';
    message = 'Request parameter validation failed.';
    details = err.errors || err.issues;
  }

  // Always log complete error trace to Winston logger with Request ID
  logApiFailure(req, err instanceof Error ? err : new Error(message), statusCode);

  // Sanitized production response
  const sanitizedMessage = isProduction && statusCode >= 500
    ? 'An unexpected security or system error occurred. Please try again later.'
    : message;

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: sanitizedMessage,
      requestId,
      timestamp: new Date().toISOString(),
      ...(details ? { details } : {}),
      ...(!isProduction && err.stack ? { stack: err.stack } : {}),
    },
  });
};
