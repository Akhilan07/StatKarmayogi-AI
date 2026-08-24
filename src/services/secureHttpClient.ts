import { sanitizeObjectStrings } from '../utils/security';

interface SecureRequestOptions extends RequestInit {
  timeoutMs?: number;
  skipDuplicateCheck?: boolean;
}

// In-flight active pending requests map for deduplication
const pendingRequestsMap = new Map<string, Promise<any>>();

/**
 * Generates a unique request key for deduplication.
 */
const getRequestKey = (url: string, options: RequestInit = {}): string => {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? String(options.body) : '';
  return `${method}:${url}:${body}`;
};

/**
 * Transforms HTTP error status codes and network exceptions into friendly, user-readable messages.
 */
const getFriendlyErrorMessage = (status: number, serverError?: string): string => {
  if (serverError && typeof serverError === 'string' && serverError.trim().length > 0) {
    return serverError;
  }

  switch (status) {
    case 400:
      return 'Invalid request parameters. Please verify your input and try again.';
    case 401:
      return 'Session expired or unauthenticated. Please log in again to continue.';
    case 403:
      return 'Access forbidden. You do not have authorization for this action.';
    case 404:
      return 'Requested resource or API endpoint could not be found.';
    case 429:
      return 'Rate limit exceeded. Too many requests submitted. Please wait a moment before retrying.';
    case 500:
    case 502:
    case 503:
      return 'The MoSPI Assessment Server is temporarily busy. Please try again shortly.';
    default:
      return `Server communication error (HTTP ${status}). Please try again.`;
  }
};

/**
 * Resilient & Secure HTTP Client Wrapper
 * Implements 15s request timeout, duplicate request deduplication, friendly error messages, and XSS sanitization.
 */
export const secureHttpClient = async <T = any>(
  url: string,
  options: SecureRequestOptions = {}
): Promise<T> => {
  const { timeoutMs = 15000, skipDuplicateCheck = false, ...fetchOptions } = options;
  const requestKey = getRequestKey(url, fetchOptions);

  // 1. Duplicate Request Protection (Return existing in-flight promise if identical request is pending)
  if (!skipDuplicateCheck && pendingRequestsMap.has(requestKey)) {
    console.log(`[SecureHttpClient] Deduplicated duplicate request to ${url}`);
    return pendingRequestsMap.get(requestKey) as Promise<T>;
  }

  // 2. Request Timeout with AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const requestPromise = (async () => {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(fetchOptions.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      // Parse JSON payload safely
      let data: any = {};
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
      }

      // Handle non-2xx HTTP response statuses
      if (!response.ok) {
        const errorMsg = getFriendlyErrorMessage(response.status, data?.error || data?.message);
        throw new Error(errorMsg);
      }

      // 3. Sanitize returned object strings against XSS vectors
      return sanitizeObjectStrings(data) as T;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeoutMs / 1000} seconds. Please check your network connection and try again.`);
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network Connection Error: Unable to connect to the MoSPI server. Please check your internet connection.');
      }

      throw error;
    } finally {
      // Remove from pending deduplication map upon resolution/rejection
      pendingRequestsMap.delete(requestKey);
    }
  })();

  if (!skipDuplicateCheck) {
    pendingRequestsMap.set(requestKey, requestPromise);
  }

  return requestPromise;
};
