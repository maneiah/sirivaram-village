// src/components/Hero.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FULL_TEXT = "Welcome to Sirivaram";
const CAROUSEL_IMAGES = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/2831299/pexels-photo-2831299.jpeg",
    alt: "Sirivaram village landscape",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/161258/church-windmill-road-old-161258.jpeg",
    alt: "Village agricultural fields",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/33148790/pexels-photo-33148790.jpeg",
    alt: "Village traditional architecture",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/34699449/pexels-photo-34699449.jpeg",
    alt: "Village community gathering",
  },
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timerRef = useRef(null);
  const carouselTimerRef = useRef(null);

  // Typing effect (now with single brand color style)
  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setDisplayedText(FULL_TEXT);
      return;
    }

    if (displayedText.length < FULL_TEXT.length) {
      timerRef.current = setTimeout(() => {
        const nextLen = displayedText.length + 1;
        setDisplayedText(FULL_TEXT.slice(0, nextLen));
      }, 80);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayedText]);

  // Background carousel
  useEffect(() => {
    carouselTimerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => {
      if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background carousel */}
      <div className="absolute inset-0 w-full h-full">
        {CAROUSEL_IMAGES.map((image, idx) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover"
              decoding="async"
              loading="lazy"
            />
          </div>
        ))}

        {/* Amber-tinted overlay to match header/footer theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-amber-900/70" />
      </div>

      {/* Carousel arrows */}
      <button
        onClick={handlePrevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentImageIndex
                ? "bg-amber-300 w-8"
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentImageIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 
                     bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 
                     bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,0,0,0.7)]"
          aria-live="polite"
        >
          {displayedText}
          {displayedText.length < FULL_TEXT.length && (
            <span className="animate-pulse text-amber-200" aria-hidden="true">
              |
            </span>
          )}
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-amber-50/90 mb-8 leading-relaxed max-w-2xl drop-shadow-md">
          Discover the spiritual heritage and rich cultural tapestry of
          Sirivaram, a historic village known for its magnificent temple
          dedicated to Lord Shiva. Experience authentic traditions, warm
          hospitality, and timeless beauty.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold 
                       hover:bg-amber-700 transition-all shadow-md hover:shadow-lg
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            aria-label="Create your account and get started"
          >
            Get Started
          </a>
          <a
            href="/#about"
            className="px-8 py-3 border-2 border-amber-200/80 text-amber-50 rounded-lg 
                       font-semibold bg-white/5 hover:bg-white/10 transition-all
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            aria-label="Learn more about Sirivaram"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
