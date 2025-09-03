"use client";

import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaExclamationTriangle,
  FaInfoCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useError } from "../contexts/ErrorContext";

interface ErrorToastProps {
  error: {
    id: string;
    message: string;
    type: "error" | "warning" | "info";
    timestamp: Date;
    component?: string;
  };
  onDismiss: (id: string) => void;
}

export default function ErrorToast({ error, onDismiss }: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(error.id), 300); // Wait for fade out animation
    }, 8000);

    return () => clearTimeout(timer);
  }, [error.id, onDismiss]);

  const getIcon = () => {
    switch (error.type) {
      case "error":
        return <FaExclamationCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <FaInfoCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <FaExclamationCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (error.type) {
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-red-50 border-red-200";
    }
  };

  const getTextColor = () => {
    switch (error.type) {
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-red-800";
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(error.id), 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${getBgColor()} border rounded-lg shadow-lg p-4 mb-3 transition-all duration-300 ease-in-out transform ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${getTextColor()}`}>
              {error.component
                ? `${error.component}: ${error.message}`
                : error.message}
            </p>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss error"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-1 text-xs text-gray-500">
            {error.timestamp.toLocaleTimeString()}
          </div>

          {error.component && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
            >
              {isExpanded ? "Hide details" : "Show details"}
            </button>
          )}

          {isExpanded && error.component && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
              <strong>Component:</strong> {error.component}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
