// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const firstMobileLinkRef = useRef(null);

  // Shadow after scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstMobileLinkRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close on ESC
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const linkBase = isScrolled
    ? "text-white hover:text-amber-100"
    : "text-gray-700 hover:text-amber-900";

  const isOn = (path) => location.pathname === path;

  // ✅ Smooth scroll helper (works from any route)
  const smoothScroll = async (e, sectionId) => {
    e.preventDefault();

    // Always close menu
    setIsMobileMenuOpen(false);

    // If not on home, navigate first
    if (location.pathname !== "/") {
      navigate("/" + sectionId);

      // wait small time for home page to render then scroll
      setTimeout(() => {
        const el = document.querySelector(sectionId);
        if (el) {
          const yOffset = -90; // header height offset
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);

      return;
    }

    // Already on home → scroll
    const el = document.querySelector(sectionId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // Update hash in URL
      window.history.replaceState(null, "", sectionId);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-amber-900 shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled ? "bg-white/20 backdrop-blur-sm" : "bg-amber-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 350 350"
                className={`w-8 h-8 md:w-10 md:h-10 transition-all duration-300 ${
                  isScrolled ? "brightness-0 invert" : ""
                }`}
              >
                {/* House */}
                <g transform="translate(75,110)">
                  <rect
                    x="40"
                    y="80"
                    width="80"
                    height="70"
                    rx="6"
                    fill="#FFDD66"
                  />
                  <path d="M30 90 L80 40 L130 90 Z" fill="#F28C28" />
                  <rect
                    x="75"
                    y="110"
                    width="20"
                    height="40"
                    rx="4"
                    fill="#8B5A00"
                  />
                </g>

                {/* Tree */}
                <g transform="translate(200,80)">
                  <circle cx="40" cy="40" r="30" fill="#7ED957" />
                  <rect
                    x="33"
                    y="60"
                    width="14"
                    height="40"
                    rx="3"
                    fill="#5C3B00"
                  />
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

            <span
              className={`font-bold text-lg md:text-xl hidden sm:inline transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-amber-900"
              }`}
            >
              SIRIVARAM
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex gap-8 items-center text-[16px]">
            <Link
              to="/#about"
              onClick={(e) => smoothScroll(e, "#about")}
              className={linkBase}
            >
              About
            </Link>
            <Link
              to="/#gallery"
              onClick={(e) => smoothScroll(e, "#gallery")}
              className={linkBase}
            >
              Gallery
            </Link>
            <Link
              to="/#blog"
              onClick={(e) => smoothScroll(e, "#blog")}
              className={linkBase}
            >
              Blogs
            </Link>
            <Link
              to="/#contact"
              onClick={(e) => smoothScroll(e, "#contact")}
              className={linkBase}
            >
              Contact
            </Link>

            <Link
              to="/login"
              className={linkBase}
              aria-current={isOn("/login") ? "page" : undefined}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                isScrolled
                  ? "bg-white text-amber-900 hover:bg-amber-50"
                  : "bg-amber-700 text-white hover:bg-amber-800"
              }`}
            >
              Register
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-white" : "text-amber-900"
            }`}
            onClick={() => setIsMobileMenuOpen((s) => !s)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3" id="mobile-menu">
            <Link
              ref={firstMobileLinkRef}
              to="/#about"
              onClick={(e) => smoothScroll(e, "#about")}
              className={linkBase}
            >
              About
            </Link>

            <Link
              to="/#gallery"
              onClick={(e) => smoothScroll(e, "#gallery")}
              className={linkBase}
            >
              Gallery
            </Link>

            <Link
              to="/#blog"
              onClick={(e) => smoothScroll(e, "#blog")}
              className={linkBase}
            >
              Blogs
            </Link>

            <Link
              to="/#contact"
              onClick={(e) => smoothScroll(e, "#contact")}
              className={linkBase}
            >
              Contact
            </Link>

            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className={linkBase}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-lg font-semibold text-center transition-all ${
                isScrolled
                  ? "bg-white text-amber-900"
                  : "bg-amber-700 text-white"
              }`}
            >
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
