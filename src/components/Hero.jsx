import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/ChatGPT Image Nov 6, 2025, 11_28_58 AM.png"; // Consider renaming to a simpler file name

const FULL_TEXT = "Welcome to Sirivaram";
const COLORS = ["text-amber-900", "text-amber-700", "text-red-700", "text-orange-700"];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion: no typing animation
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplayedText(FULL_TEXT);
      setColorIndex(0);
      return;
    }

    if (displayedText.length < FULL_TEXT.length) {
      timerRef.current = setTimeout(() => {
        const nextLen = displayedText.length + 1;
        setDisplayedText(FULL_TEXT.slice(0, nextLen));
        setColorIndex((prev) => (prev + 1) % COLORS.length);
      }, 80);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayedText]);

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center">
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 transition-colors ${COLORS[colorIndex]}`}
              aria-live="polite"
            >
              {displayedText}
              {displayedText.length < FULL_TEXT.length && (
                <span className="animate-pulse" aria-hidden="true">|</span>
              )}
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Discover the spiritual heritage and rich cultural tapestry of Sirivaram,
              a historic village known for its magnificent temple dedicated to Lord Shiva.
              Experience authentic traditions, warm hospitality, and timeless beauty.
            </p>

            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Create your account and get started"
            >
              Get Started
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={Logo}
                alt="Sirivaram village landscape"
                className="w-full h-full object-cover"
                decoding="async"
                loading="lazy"
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 90vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
