import compression from 'compression';
import { Request, Response, RequestHandler } from 'express';

/**
 * Express HTTP Compression Middleware Configuration
 * Compresses JSON payloads and HTML/CSS/JS text responses to optimize network throughput.
 */
export const configureCompression = (): RequestHandler => {
  return compression({
    level: 6, // Optimal balance between CPU compression speed and payload reduction
    threshold: 1024, // Compress responses > 1KB
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  });
};
