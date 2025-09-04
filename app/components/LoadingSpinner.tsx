"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-light-surface-primary rounded-full animate-spin-slow`}
          style={{
            borderTopColor: "#C62828",
            borderRightColor: "#C62828",
          }}
        />
        {/* Inner ring for extra visual appeal */}
        <div
          className={`absolute top-1 left-1 ${
            size === "sm"
              ? "w-2 h-2"
              : size === "md"
              ? "w-6 h-6"
              : size === "lg"
              ? "w-10 h-10"
              : "w-14 h-14"
          } border-2 border-transparent rounded-full animate-spin`}
          style={{
            borderTopColor: "#EF5350",
            animationDuration: "0.8s",
            animationDirection: "reverse",
          }}
        />
        {/* Center dot */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            size === "sm"
              ? "w-1 h-1"
              : size === "md"
              ? "w-2 h-2"
              : size === "lg"
              ? "w-3 h-3"
              : "w-4 h-4"
          } bg-light-primary rounded-full animate-pulse-glow`}
        />
      </div>
      {text && (
        <p className="text-sm text-light-text-secondary font-inter-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
