"use client";

import React from "react";
import { useError } from "../contexts/ErrorContext";
import ErrorToast from "./ErrorToast";

export default function ErrorToastContainer() {
  const { state, removeError } = useError();

  if (state.errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full space-y-2">
      {state.errors.map((error) => (
        <ErrorToast key={error.id} error={error} onDismiss={removeError} />
      ))}
    </div>
  );
}
