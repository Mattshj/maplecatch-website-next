"use client";

interface ErrorHandlerOptions {
  onError?: (error: Error, errorInfo?: Record<string, unknown>) => void;
  onUnhandledRejection?: (reason: unknown, promise: Promise<unknown>) => void;
  onConsoleError?: (message: string, ...args: unknown[]) => void;
}

class GlobalErrorHandler {
  private options: ErrorHandlerOptions;
  private originalConsoleError: typeof console.error;
  private originalConsoleWarn: typeof console.warn;

  constructor(options: ErrorHandlerOptions = {}) {
    this.options = options;
    this.originalConsoleError = console.error;
    this.originalConsoleWarn = console.warn;
    this.setup();
  }

  private setup() {
    window.addEventListener("unhandledrejection", this.handleUnhandledRejection.bind(this));
    window.addEventListener("error", this.handleError.bind(this));
    this.interceptConsole();

    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("react-error-boundary-error", this.handleReactError.bind(this) as EventListener);
    }
  }

  private handleError(event: ErrorEvent) {
    const error = new Error(event.message);
    error.stack = event.error?.stack || event.message;

    console.error("Global error caught:", error);

    this.options.onError?.(error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent) {
    const reason: unknown = event.reason;
    const promise: Promise<unknown> = event.promise;

    console.error("Unhandled promise rejection:", reason);

    this.options.onUnhandledRejection?.(reason, promise);
  }

  private handleReactError(event: CustomEvent<{ error: Error; componentStack?: string }>) {
    const error = event.detail?.error;
    if (error) {
      console.error("React error boundary error:", error);

      this.options.onError?.(error, {
        componentStack: event.detail?.componentStack,
        errorBoundary: true,
      });
    }
  }

  private interceptConsole() {
    console.error = (...args: unknown[]) => {
      this.originalConsoleError.apply(console, args);

      if (this.options.onConsoleError) {
        const message = args
          .map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
          .join(" ");
        this.options.onConsoleError(message, ...args);
      }
    };

    console.warn = (...args: unknown[]) => {
      this.originalConsoleWarn.apply(console, args);
    };
  }

  public cleanup() {
    window.removeEventListener("unhandledrejection", this.handleUnhandledRejection.bind(this));
    window.removeEventListener("error", this.handleError.bind(this));

    console.error = this.originalConsoleError;
    console.warn = this.originalConsoleWarn;
  }

  public reportError(error: Error, context?: Record<string, unknown>) {
    console.error("Error reported:", error, context);
    this.options.onError?.(error, context);
  }
}

let defaultHandler: GlobalErrorHandler | null = null;

export function initializeErrorHandler(options?: ErrorHandlerOptions) {
  if (defaultHandler) {
    defaultHandler.cleanup();
  }
  defaultHandler = new GlobalErrorHandler(options);
  return defaultHandler;
}

export function getErrorHandler() {
  if (!defaultHandler) {
    throw new Error("Error handler not initialized. Call initializeErrorHandler() first.");
  }
  return defaultHandler;
}

export function cleanupErrorHandler() {
  if (defaultHandler) {
    defaultHandler.cleanup();
    defaultHandler = null;
  }
}

export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback?: T,
  errorContext?: string
): Promise<T> {
  try {
    return await operation();
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));

    defaultHandler?.reportError(err, { context: errorContext });

    if (fallback !== undefined) {
      return fallback;
    }

    throw err;
  }
}

export function safeSync<T>(operation: () => T, fallback?: T, errorContext?: string): T {
  try {
    return operation();
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));

    defaultHandler?.reportError(err, { context: errorContext });

    if (fallback !== undefined) {
      return fallback;
    }

    throw err;
  }
}
