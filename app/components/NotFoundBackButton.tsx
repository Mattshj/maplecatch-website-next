"use client";

export default function NotFoundBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
    >
      Go Back
    </button>
  );
}
