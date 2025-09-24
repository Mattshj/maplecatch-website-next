"use client";

import { useEffect } from "react";

// 1. Use a generic type <T> to make the props interface flexible.
interface JsonLdProps<T> {
  data: T;
}

// 2. Update the function to accept the generic type.
// We constrain T to ensure it's always an object-like structure.
export default function JsonLd<T extends Record<string, unknown>>({
  data,
}: JsonLdProps<T>) {
  useEffect(() => {
    // This logic remains exactly the same.
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      // Use a more specific selector to avoid removing the wrong script
      // if multiple components were to use this logic.
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [data]);

  return null;
}
