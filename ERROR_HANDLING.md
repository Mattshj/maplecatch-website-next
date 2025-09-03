# Error Handling System Documentation

This document explains the comprehensive error handling system implemented in your Next.js project.

## Overview

The error handling system provides multiple layers of error management:

- **Error Boundaries** - Catch React component errors
- **Global Error Handler** - Handle unhandled errors and promise rejections
- **Error Context** - Centralized error state management
- **Error Toasts** - User-friendly error notifications
- **Custom Hooks** - Easy-to-use error handling utilities

## Components

### 1. ErrorBoundary

A React error boundary component that catches JavaScript errors in child components.

```tsx
import ErrorBoundary from "./components/ErrorBoundary";

<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>;
```

**Props:**

- `children` - React components to wrap
- `fallback` - Custom error UI component
- `onError` - Callback function when errors occur

### 2. ErrorContext

Provides global error state management and error reporting.

```tsx
import { useError } from "./contexts/ErrorContext";

const { reportError, addError, setGlobalError } = useError();
```

**Available Methods:**

- `reportError(error, component?, userAction?)` - Report errors with context
- `addError(error)` - Add error to the error list
- `setGlobalError(message)` - Set a global error message
- `clearErrors()` - Clear all errors
- `removeError(id)` - Remove specific error

### 3. ErrorToast

Displays error messages as toast notifications.

```tsx
import ErrorToast from "./components/ErrorToast";

<ErrorToast error={errorObject} onDismiss={handleDismiss} />;
```

**Features:**

- Auto-dismiss after 8 seconds
- Expandable error details
- Different styles for error, warning, and info types
- Smooth animations

### 4. ErrorToastContainer

Manages and displays all error toasts in a fixed position.

```tsx
import ErrorToastContainer from "./components/ErrorToastContainer";

// Automatically included in layout.tsx
```

## Utilities

### 1. Global Error Handler

Handles unhandled errors, promise rejections, and console errors.

```tsx
import { initializeErrorHandler, getErrorHandler } from "./utils/errorHandler";

// Initialize with custom handlers
initializeErrorHandler({
  onError: (error, errorInfo) => {
    // Custom error handling logic
  },
  onUnhandledRejection: (reason, promise) => {
    // Handle unhandled promise rejections
  },
});

// Get the handler instance
const handler = getErrorHandler();
handler.reportError(new Error("Custom error"));
```

### 2. Safe Execution Utilities

```tsx
import { safeAsync, safeSync } from "./utils/errorHandler";

// Safe async execution
const result = await safeAsync(
  () => riskyAsyncOperation(),
  fallbackValue,
  "operation-context"
);

// Safe sync execution
const result = safeSync(
  () => riskySyncOperation(),
  fallbackValue,
  "operation-context"
);
```

### 3. Custom Hook

```tsx
import { useErrorHandler } from "./hooks/useErrorHandler";

const { handleError, handleAsync, showError, withErrorHandling } =
  useErrorHandler();

// Handle errors directly
handleError(new Error("Something went wrong"), "ComponentName", "user-action");

// Show user-friendly error messages
showError("Failed to load data", "error");

// Wrap functions with error handling
const safeFunction = withErrorHandling(riskyFunction, "function-context");
```

## Usage Examples

### Basic Error Handling

```tsx
import { useError } from "./contexts/ErrorContext";

function MyComponent() {
  const { reportError } = useError();

  const handleClick = () => {
    try {
      // Risky operation
      riskyOperation();
    } catch (error) {
      reportError(error, "MyComponent", "button-click");
    }
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Async Error Handling

```tsx
import { useErrorHandler } from "./hooks/useErrorHandler";

function MyComponent() {
  const { handleAsync, showError } = useErrorHandler();

  const loadData = async () => {
    try {
      const data = await handleAsync(
        () => fetch("/api/data"),
        null,
        "data-fetch"
      );
      // Handle success
    } catch (error) {
      showError("Failed to load data", "error");
    }
  };

  return <button onClick={loadData}>Load Data</button>;
}
```

### Image Error Handling

```tsx
import Image from "next/image";
import { useError } from "./contexts/ErrorContext";

function MyImage() {
  const { reportError } = useError();

  return (
    <Image
      src="/path/to/image.jpg"
      alt="Description"
      width={300}
      height={200}
      onError={() => {
        const error = new Error("Failed to load image");
        reportError(error, "MyImage", "image-load");
      }}
    />
  );
}
```

## Error Types

The system supports three types of errors:

1. **Error** - Critical errors that need immediate attention
2. **Warning** - Non-critical issues that should be monitored
3. **Info** - Informational messages

## Configuration

### Environment Variables

```bash
# Development mode shows detailed error information
NODE_ENV=development

# Production mode hides sensitive error details
NODE_ENV=production
```

### Custom Error Reporting

You can integrate with external error reporting services:

```tsx
// In your error handler initialization
initializeErrorHandler({
  onError: (error, errorInfo) => {
    // Send to Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === "production") {
      // External error reporting service
      externalErrorService.captureException(error, errorInfo);
    }
  },
});
```

## Best Practices

1. **Always wrap risky operations** in try-catch blocks
2. **Provide meaningful context** when reporting errors
3. **Use the custom hook** for consistent error handling
4. **Handle async operations** with safeAsync utility
5. **Show user-friendly messages** instead of technical error details
6. **Log errors appropriately** for debugging and monitoring

## Error Recovery

The system provides several recovery mechanisms:

1. **Retry functionality** for failed operations
2. **Fallback values** for safe execution
3. **Error boundaries** to prevent app crashes
4. **User-friendly error messages** with recovery options

## Monitoring and Debugging

### Development Mode

- Detailed error stack traces
- Component error information
- User action context
- Console logging for debugging

### Production Mode

- Sanitized error messages
- Error reporting service integration
- Performance monitoring
- User analytics

## Troubleshooting

### Common Issues

1. **Error boundary not catching errors**

   - Ensure the component is wrapped in ErrorBoundary
   - Check that errors are thrown, not just logged

2. **Toasts not appearing**

   - Verify ErrorToastContainer is included in layout
   - Check that errors are being added to the context

3. **Global errors not working**
   - Ensure error handler is initialized
   - Check browser console for initialization errors

### Debug Mode

Enable debug logging by setting:

```tsx
// In your component
const { reportError } = useError();
reportError(new Error("Test error"), "DebugComponent", "test-action");
```

This will log detailed information to the console in development mode.

## Integration with External Services

The error handling system is designed to easily integrate with external error reporting services:

- **Sentry** - Error tracking and performance monitoring
- **LogRocket** - Session replay and error tracking
- **Bugsnag** - Error monitoring and reporting
- **Rollbar** - Error tracking and alerting

Example Sentry integration:

```tsx
import * as Sentry from "@sentry/nextjs";

initializeErrorHandler({
  onError: (error, errorInfo) => {
    Sentry.captureException(error, {
      extra: errorInfo,
      tags: {
        component: errorInfo?.component || "unknown",
        userAction: errorInfo?.userAction || "unknown",
      },
    });
  },
});
```

## Performance Considerations

- Error toasts auto-dismiss to prevent UI clutter
- Error context uses efficient state management
- Global error handler has minimal performance impact
- Safe execution utilities provide fallback mechanisms

## Security

- Error details are only shown in development mode
- User input is sanitized in error messages
- No sensitive information is exposed in production errors
- Error reporting can be configured to exclude sensitive data
