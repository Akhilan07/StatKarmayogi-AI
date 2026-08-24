import { Request, Response, NextFunction } from 'express';

/**
 * HTTPS Enforcement Middleware
 * Redirects HTTP requests to HTTPS in production environments.
 */
export const enforceHttps = (req: Request, res: Response, next: NextFunction) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const forceHttps = process.env.FORCE_HTTPS === 'true';

  if ((isProduction || forceHttps) && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
    const httpsUrl = `https://${req.headers.host}${req.url}`;
    console.log(`[HTTPS Redirect] Redirecting insecure request ${req.url} -> ${httpsUrl}`);
    return res.redirect(301, httpsUrl);
  }

  next();
};
