"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface PageLoaderProps {
  children: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - you can adjust this or remove it for instant loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        {/* Background gradient matching the theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-light-surface-primary to-white" />

        {/* Decorative elements matching the website style */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-light-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-light-primary/5 to-transparent rounded-full translate-y-12 -translate-x-12" />

        {/* Loading content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Loading spinner */}
          <LoadingSpinner size="lg" text="Loading MapleCatch..." />

          {/* Loading progress bar */}
          <div className="w-48 h-1 bg-light-surface-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-light-primary to-light-primaryLight rounded-full animate-pulse"
              style={{ animationDuration: "2s" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
