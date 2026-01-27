// src/components/Hero.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image1 from "../assets/image1 (1).png";

const FULL_TEXT = "Welcome to Sirivaram";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const timerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const smoothScrollTo = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/" + sectionId);
      setTimeout(() => {
        const el = document.querySelector(sectionId);
        if (el) {
          const yOffset = -90;
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
      return;
    }

    const el = document.querySelector(sectionId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.replaceState(null, "", sectionId);
    }
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduceMotion) {
      setDisplayedText(FULL_TEXT);
      return;
    }

    if (displayedText.length < FULL_TEXT.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedText(FULL_TEXT.slice(0, displayedText.length + 1));
      }, 80);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayedText]);

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
      {/* ✅ ONE image only */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={Image1}
          alt="Sirivaram village background"
          className="absolute inset-0 w-full h-full object-fill"
          loading="eager"
          decoding="async"
        />

        {/* Overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 drop-shadow-[0_0_25px_rgba(0,0,0,0.85)]"
          aria-live="polite"
        >
          <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent">
            {displayedText}
          </span>
          {displayedText.length < FULL_TEXT.length && (
            <span className="animate-pulse text-amber-200" aria-hidden="true">
              |
            </span>
          )}
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl drop-shadow-md">
          Discover the spiritual heritage and rich cultural tapestry of
          Sirivaram, a historic village known for its magnificent temple
          dedicated to Lord Shiva. Experience authentic traditions, warm
          hospitality, and timeless beauty.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold 
                       hover:bg-amber-700 transition-all shadow-md hover:shadow-lg
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            Get Started
          </button>

          <button
            onClick={(e) => smoothScrollTo(e, "#about")}
            className="px-8 py-3 border-2 border-white/80 text-white rounded-lg 
                       font-semibold bg-white/10 hover:bg-white/20 transition-all
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
