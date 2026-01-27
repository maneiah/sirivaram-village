import React from "react";

export default function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      role="status"
      aria-live="polite"
      aria-label="Loading Sirivaram website"
    >
      {/* Loader Ring */}
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-amber-200"></div>

        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-700 animate-spin"></div>

        {/* Inner pulse */}
        <div className="absolute inset-3 rounded-full bg-amber-100 animate-pulse"></div>
      </div>

      {/* Text */}
      <h2 className="text-amber-900 font-semibold tracking-wide text-lg">
        Loading Sirivaram
      </h2>
      <p className="text-sm text-gray-500 mt-1">Please wait…</p>
    </div>
  );
}
