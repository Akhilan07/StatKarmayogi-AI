import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSecureAsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Reusable React Hook for Secure Async Operations
 * Manages loading states, error states, and unmount cancellation cleanly.
 */
export function useSecureAsync<T = any>(
  asyncFunction?: (...args: any[]) => Promise<T>
) {
  const [state, setState] = useState<UseSecureAsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      if (!asyncFunction) return null;

      setState({ data: null, isLoading: true, error: null });

      try {
        const result = await asyncFunction(...args);
        if (isMountedRef.current) {
          setState({ data: result, isLoading: false, error: null });
        }
        return result;
      } catch (err: any) {
        const errorMsg = err.message || 'An unexpected error occurred. Please try again.';
        if (isMountedRef.current) {
          setState({ data: null, isLoading: false, error: errorMsg });
        }
        return null;
      }
    },
    [asyncFunction]
  );

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    execute,
    setState,
  };
}
