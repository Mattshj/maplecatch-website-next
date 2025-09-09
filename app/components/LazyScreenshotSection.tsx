"use client";

import dynamic from "next/dynamic";

// Lazy load heavy components with client-side rendering
const ScreenshotSection = dynamic(() => import("./ScreenshotPhoneCard"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
  ssr: false, // Disable SSR for this component since it's interactive
});

export default ScreenshotSection;
