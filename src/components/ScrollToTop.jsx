import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-11 h-11 rounded-full
        bg-amber-700 text-white
        shadow-lg
        transition-all duration-300 ease-out
        hover:bg-amber-800 hover:scale-110
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
