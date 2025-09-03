"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";

export interface ErrorItem {
  id: string;
  message: string;
  type: "error" | "warning" | "info";
  timestamp: Date;
  component?: string;
  stack?: string;
  userAction?: string;
}

interface ErrorState {
  errors: ErrorItem[];
  isGlobalError: boolean;
  globalErrorMessage?: string;
}

type ErrorAction =
  | { type: "ADD_ERROR"; payload: Omit<ErrorItem, "id" | "timestamp"> }
  | { type: "REMOVE_ERROR"; payload: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_GLOBAL_ERROR"; payload: string }
  | { type: "CLEAR_GLOBAL_ERROR" };

const initialState: ErrorState = {
  errors: [],
  isGlobalError: false,
};

function errorReducer(state: ErrorState, action: ErrorAction): ErrorState {
  switch (action.type) {
    case "ADD_ERROR":
      const newError: ErrorItem = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      };
      return {
        ...state,
        errors: [...state.errors, newError],
      };

    case "REMOVE_ERROR":
      return {
        ...state,
        errors: state.errors.filter((error) => error.id !== action.payload),
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: [],
      };

    case "SET_GLOBAL_ERROR":
      return {
        ...state,
        isGlobalError: true,
        globalErrorMessage: action.payload,
      };

    case "CLEAR_GLOBAL_ERROR":
      return {
        ...state,
        isGlobalError: false,
        globalErrorMessage: undefined,
      };

    default:
      return state;
  }
}

interface ErrorContextType {
  state: ErrorState;
  addError: (error: Omit<ErrorItem, "id" | "timestamp">) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
  setGlobalError: (message: string) => void;
  clearGlobalError: () => void;
  reportError: (error: Error, component?: string, userAction?: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  const addError = useCallback((error: Omit<ErrorItem, "id" | "timestamp">) => {
    dispatch({ type: "ADD_ERROR", payload: error });
  }, []);

  const removeError = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ERROR", payload: id });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, []);

  const setGlobalError = useCallback((message: string) => {
    dispatch({ type: "SET_GLOBAL_ERROR", payload: message });
  }, []);

  const clearGlobalError = useCallback(() => {
    dispatch({ type: "CLEAR_GLOBAL_ERROR" });
  }, []);

  const reportError = useCallback(
    (error: Error, component?: string, userAction?: string) => {
      addError({
        message: error.message,
        type: "error",
        component,
        stack: error.stack,
        userAction,
      });

      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.group("Error Reported");
        console.error("Error:", error);
        console.error("Component:", component);
        console.error("User Action:", userAction);
        console.groupEnd();
      }

      // In production, you could send to an error reporting service
      // Example: Sentry, LogRocket, etc.
    },
    [addError]
  );

  const value: ErrorContextType = {
    state,
    addError,
    removeError,
    clearErrors,
    setGlobalError,
    clearGlobalError,
    reportError,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}
