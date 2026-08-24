import { CookieOptions, Response } from 'express';

/**
 * Secure Cookie Security Helper Configuration
 * Enforces HttpOnly, Secure, and SameSite=Lax attributes on session tokens.
 */
export const getSecureCookieOptions = (customOptions?: CookieOptions): CookieOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const configuredDomain = process.env.COOKIE_DOMAIN;

  const baseOptions: CookieOptions = {
    httpOnly: true, // Prevents XSS scripts from reading sensitive cookie data
    secure: isProduction, // Enforces HTTPS transmission in production
    sameSite: 'lax', // Defends against CSRF attacks while allowing seamless navigation
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // 24 Hours validity
  };

  if (configuredDomain && isProduction) {
    baseOptions.domain = configuredDomain;
  }

  return { ...baseOptions, ...customOptions };
};

/**
 * Sets an authenticated security session cookie on the Express response object.
 */
export const setAuthSessionCookie = (res: Response, token: string, cookieName: string = 'statkarmayogi_session') => {
  const options = getSecureCookieOptions();
  res.cookie(cookieName, token, options);
};

/**
 * Clears the authenticated security session cookie.
 */
export const clearAuthSessionCookie = (res: Response, cookieName: string = 'statkarmayogi_session') => {
  const options = getSecureCookieOptions({ maxAge: 0 });
  res.clearCookie(cookieName, options);
};
