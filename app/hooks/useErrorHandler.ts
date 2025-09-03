"use client";

import { useCallback } from 'react';
import { useError } from '../contexts/ErrorContext';
import { safeAsync, safeSync } from '../utils/errorHandler';

export function useErrorHandler() {
  const { reportError, addError, setGlobalError } = useError();

  const handleError = useCallback((error: Error, context?: string, userAction?: string) => {
    reportError(error, context, userAction);
  }, [reportError]);

  const handleAsync = useCallback(async <T>(
    operation: () => Promise<T>,
    fallback?: T,
    context?: string
  ): Promise<T> => {
    return safeAsync(operation, fallback, context);
  }, []);

  const handleSync = useCallback(<T>(
    operation: () => T,
    fallback?: T,
    context?: string
  ): T => {
    return safeSync(operation, fallback, context);
  }, []);

  const showError = useCallback((message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    addError({
      message,
      type,
      component: 'useErrorHandler',
    });
  }, [addError]);

  const showGlobalError = useCallback((message: string) => {
    setGlobalError(message);
  }, [setGlobalError]);

  const withErrorHandling = useCallback(<T extends any[], R>(
    fn: (...args: T) => R | Promise<R>,
    context?: string
  ) => {
    return async (...args: T): Promise<R> => {
      try {
        const result = fn(...args);
        if (result instanceof Promise) {
          return await result;
        }
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        handleError(err, context);
        throw err;
      }
    };
  }, [handleError]);

  return {
    handleError,
    handleAsync,
    handleSync,
    showError,
    showGlobalError,
    withErrorHandling,
    reportError,
  };
}
