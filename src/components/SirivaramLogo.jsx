import React from "react";

export default function SirivaramLogo({ isScrolled = false, size = 42 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isScrolled ? "rgba(255,255,255,0.2)" : "#92400e", // amber-900
        backdropFilter: isScrolled ? "blur(6px)" : "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 350 350"
        style={{
          width: size * 0.85,
          height: size * 0.85,
          filter: isScrolled ? "invert(1)" : "none",
        }}
      >
        {/* House */}
        <g transform="translate(75,110)">
          <rect x="40" y="80" width="80" height="70" rx="6" fill="#FFDD66" />
          <path d="M30 90 L80 40 L130 90 Z" fill="#F28C28" />
          <rect x="75" y="110" width="20" height="40" rx="4" fill="#8B5A00" />
        </g>

        {/* Tree */}
        <g transform="translate(200,80)">
          <circle cx="40" cy="40" r="30" fill="#7ED957" />
          <rect x="33" y="60" width="14" height="40" rx="3" fill="#5C3B00" />
        </g>

        {/* Book */}
        <path
          d="M60 230 q30 -20 60 0 t60 0"
          fill="#fff"
          stroke="#1B4A90"
          strokeWidth="6"
        />

        {/* Gear */}
        <g transform="translate(210,210) scale(0.8)">
          <path
            d="M50 0 L60 0 L70 20 L90 20 L100 40 L90 60 L100 80 L90 100 L70 100 L60 120 L50 120 L40 100 L20 100 L10 80 L20 60 L10 40 L20 20 L40 20 Z"
            fill="#F0F0F0"
            stroke="#C4C4C4"
            strokeWidth="5"
          />
          <circle cx="55" cy="60" r="22" fill="#0A6CC7" />
        </g>

        {/* Leaf */}
        <path
          d="M260 150 C300 140, 330 180, 260 230 C240 210, 230 170, 260 150"
          fill="#5CC165"
        />

        {/* River */}
        <path
          d="M40 260 C100 300, 200 200, 310 260"
          stroke="#FFFFFF"
          strokeWidth="14"
          fill="none"
          opacity="0.9"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
