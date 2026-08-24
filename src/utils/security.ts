import DOMPurify from 'dompurify';

/**
 * Frontend Security & XSS Defense Utilities
 * Sanitizes user-generated HTML, escapes unsafe text renders, and prevents script injection.
 */

// Configure DOMPurify default security rules
const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span', 'code', 'pre'],
  ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
  ADD_ATTR: ['target'],
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'style', 'svg', 'math', 'link'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
};

/**
 * Sanitizes dirty HTML string using DOMPurify to eliminate XSS vectors.
 */
export const sanitizeHtml = (dirtyHtml: string): string => {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';
  return DOMPurify.sanitize(dirtyHtml, DOMPURIFY_CONFIG);
};

/**
 * HTML-escapes raw text string for safe rendering.
 */
export const escapeText = (rawText: string): string => {
  if (!rawText || typeof rawText !== 'string') return '';
  return rawText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Recursively sanitizes string properties inside an object tree to prevent XSS payloads.
 */
export const sanitizeObjectStrings = <T extends Record<string, any>>(obj: T): T => {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === 'string'
        ? escapeText(item)
        : typeof item === 'object'
        ? sanitizeObjectStrings(item)
        : item
    ) as unknown as T;
  }

  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      result[key] = escapeText(val);
    } else if (typeof val === 'object' && val !== null) {
      result[key] = sanitizeObjectStrings(val);
    } else {
      result[key] = val;
    }
  }

  return result as T;
};
