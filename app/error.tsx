"use client";

import { useEffect } from "react";
import { useError } from "./contexts/ErrorContext";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const { reportError } = useError();

  useEffect(() => {
    // Report the error to our error context
    reportError(error, "GlobalErrorPage", "page-error");

    // Log the error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Global error caught:", error);
    }
  }, [error, reportError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h1>

        <p className="text-gray-600 mb-6">
          We're sorry, but an unexpected error occurred. Our team has been
          notified and is working to fix this issue.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 font-medium">
              Error Details (Development)
            </summary>
            <div className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-600">
              <p className="font-medium mb-2">Error Message:</p>
              <p className="mb-2">{error.message}</p>
              {error.digest && (
                <>
                  <p className="font-medium mb-2">Error Digest:</p>
                  <p className="mb-2 font-mono">{error.digest}</p>
                </>
              )}
              {error.stack && (
                <>
                  <p className="font-medium mb-2">Stack Trace:</p>
                  <pre className="whitespace-pre-wrap overflow-auto max-h-32">
                    {error.stack}
                  </pre>
                </>
              )}
            </div>
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-light transition-colors font-medium"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Go Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Refresh Page
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            If this problem persists, please contact support with error ID:{" "}
            {error.digest || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
