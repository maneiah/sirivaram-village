import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <>
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            background: "#92400E", // amber-800
            color: "white",
            padding: "12px",
            borderRadius: "50%",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            cursor: "pointer",
            zIndex: 9000,
            transition: "transform 0.2s ease, background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#B45309")} // amber-700
          onMouseLeave={(e) => (e.currentTarget.style.background = "#92400E")} // amber-800
        >
          <ArrowUp size={20} color="white" />
        </button>
      )}
    </>
  );
}
