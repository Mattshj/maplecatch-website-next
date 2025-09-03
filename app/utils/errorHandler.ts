"use client";

interface ErrorHandlerOptions {
  onError?: (error: Error, errorInfo?: any) => void;
  onUnhandledRejection?: (reason: any, promise: Promise<any>) => void;
  onConsoleError?: (message: string, ...args: any[]) => void;
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
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));

    // Handle runtime errors
    window.addEventListener('error', this.handleError.bind(this));

    // Handle console errors and warnings
    this.interceptConsole();

    // Handle React error boundary errors (if using React 18+)
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('react-error-boundary-error', this.handleReactError.bind(this));
    }
  }

  private handleError(event: ErrorEvent) {
    const error = new Error(event.message);
    error.stack = event.error?.stack || event.message;
    
    console.error('Global error caught:', error);
    
    if (this.options.onError) {
      this.options.onError(error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
      });
    }
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent) {
    const reason = event.reason;
    const promise = event.promise;
    
    console.error('Unhandled promise rejection:', reason);
    
    if (this.options.onUnhandledRejection) {
      this.options.onUnhandledRejection(reason, promise);
    }
  }

  private handleReactError(event: CustomEvent) {
    const error = event.detail?.error;
    if (error) {
      console.error('React error boundary error:', error);
      
      if (this.options.onError) {
        this.options.onError(error, {
          componentStack: event.detail?.componentStack,
          errorBoundary: true,
        });
      }
    }
  }

  private interceptConsole() {
    // Intercept console.error
    console.error = (...args) => {
      this.originalConsoleError.apply(console, args);
      
      if (this.options.onConsoleError) {
        const message = args.map(arg => 
          typeof arg === 'string' ? arg : JSON.stringify(arg)
        ).join(' ');
        this.options.onConsoleError(message, ...args);
      }
    };

    // Intercept console.warn
    console.warn = (...args) => {
      this.originalConsoleWarn.apply(console, args);
      
      // You could add warning handling here if needed
    };
  }

  public cleanup() {
    // Remove event listeners
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
    window.removeEventListener('error', this.handleError.bind(this));
    
    // Restore original console methods
    console.error = this.originalConsoleError;
    console.warn = this.originalConsoleWarn;
  }

  public reportError(error: Error, context?: any) {
    console.error('Error reported:', error, context);
    
    if (this.options.onError) {
      this.options.onError(error, context);
    }
  }
}

// Create a default instance
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
    throw new Error('Error handler not initialized. Call initializeErrorHandler() first.');
  }
  return defaultHandler;
}

export function cleanupErrorHandler() {
  if (defaultHandler) {
    defaultHandler.cleanup();
    defaultHandler = null;
  }
}

// Utility function to safely execute async operations
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback?: T,
  errorContext?: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    
    if (defaultHandler) {
      defaultHandler.reportError(err, { context: errorContext });
    }
    
    if (fallback !== undefined) {
      return fallback;
    }
    
    throw err;
  }
}

// Utility function to safely execute sync operations
export function safeSync<T>(
  operation: () => T,
  fallback?: T,
  errorContext?: string
): T {
  try {
    return operation();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    
    if (defaultHandler) {
      defaultHandler.reportError(err, { context: errorContext });
    }
    
    if (fallback !== undefined) {
      return fallback;
    }
    
    throw err;
  }
}
