import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="loader" aria-label="Loading content..."></div>

      <style>{`
        .loader {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 6px solid transparent;
          border-top: 6px solid #008cba;
          border-right: 6px solid #33b5e5;
          border-left: 6px solid #006f9b;
          animation: spin 0.8s linear infinite, glow 2s ease-in-out infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 2px #008cba); }
          50% { filter: drop-shadow(0 0 10px #008cba); }
        }
      `}</style>
    </div>
  );
}
