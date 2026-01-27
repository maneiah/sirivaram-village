// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const firstMobileLinkRef = useRef(null);

  // Shadow + blur after scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close on ESC
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  // Focus first link when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setTimeout(() => firstMobileLinkRef.current?.focus(), 100);
    }
  }, [isMobileMenuOpen]);

  // Detect active hash (/#about etc.)
  const activeHash = location.hash || "";
  const isHashActive = (hash) =>
    location.pathname === "/" && activeHash === hash;

  // Smooth scroll helper (works from any route)
  const smoothScroll = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

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
      }, 250);
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

  // Styles
  const headerBg = isScrolled
    ? "bg-amber-950/90 backdrop-blur-md shadow-lg"
    : "bg-white/95 backdrop-blur-sm";

  const linkBase = isScrolled
    ? "text-white/90 hover:text-white"
    : "text-gray-800 hover:text-amber-900";

  const activeLink = isScrolled
    ? "text-white font-semibold"
    : "text-amber-900 font-semibold";

  const navItemClass = (isActive) =>
    `transition-colors ${isActive ? activeLink : linkBase}`;

  // Mobile dropdown styles
  const mobileMenuBg = isScrolled ? "bg-amber-950" : "bg-white";
  const mobileLinkBase = isScrolled
    ? "text-white/90 hover:bg-white/10"
    : "text-gray-800 hover:bg-amber-50";
  const mobileActive = isScrolled
    ? "bg-white/15 text-white font-semibold"
    : "bg-amber-100 text-amber-900 font-semibold";
  const mobileDivider = isScrolled ? "bg-white/15" : "bg-gray-200";

  const mobileLinkClass = (isActive) =>
    `block px-4 py-3 rounded-xl transition-colors text-lg ${isActive ? mobileActive : mobileLinkBase}`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 md:h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled ? "bg-white/15 ring-1 ring-white/15" : "bg-amber-900"
              }`}
              aria-label="Sirivaram Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 350 350"
                className={`w-8 h-8 md:w-10 md:h-10 transition-all duration-300 ${
                  isScrolled ? "brightness-0 invert" : ""
                }`}
              >
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

                <path
                  d="M60 230 q30 -20 60 0 t60 0"
                  fill="#fff"
                  stroke="#1B4A90"
                  strokeWidth="6"
                />

                <g transform="translate(210,210) scale(0.8)">
                  <path
                    d="M50 0 L60 0 L70 20 L90 20 L100 40 L90 60 L100 80 L90 100 L70 100 L60 120 L50 120 L40 100 L20 100 L10 80 L20 60 L10 40 L20 20 L40 20 Z"
                    fill="#F0F0F0"
                    stroke="#C4C4C4"
                    strokeWidth="5"
                  />
                  <circle cx="55" cy="60" r="22" fill="#0A6CC7" />
                </g>

                <path
                  d="M260 150 C300 140, 330 180, 260 230 C240 210, 230 170, 260 150"
                  fill="#5CC165"
                />

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

            <div className="leading-tight">
              <div
                className={`font-extrabold tracking-wide text-lg md:text-xl ${isScrolled ? "text-white" : "text-amber-900"}`}
              >
                SIRIVARAM
              </div>
              <div
                className={`text-xs md:text-sm ${isScrolled ? "text-white/70" : "text-gray-600"}`}
              >
                Village Portal
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-[16px]">
            <Link
              to="/#about"
              onClick={(e) => smoothScroll(e, "#about")}
              className={navItemClass(isHashActive("#about"))}
            >
              About
            </Link>
            <Link
              to="/#gallery"
              onClick={(e) => smoothScroll(e, "#gallery")}
              className={navItemClass(isHashActive("#gallery"))}
            >
              Gallery
            </Link>
            <Link
              to="/#blog"
              onClick={(e) => smoothScroll(e, "#blog")}
              className={navItemClass(isHashActive("#blog"))}
            >
              Blogs
            </Link>
            <Link
              to="/#contact"
              onClick={(e) => smoothScroll(e, "#contact")}
              className={navItemClass(isHashActive("#contact"))}
            >
              Contact
            </Link>

            <Link
              to="/login"
              className={navItemClass(location.pathname === "/login")}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                isScrolled
                  ? "bg-white text-amber-900 hover:bg-amber-50"
                  : "bg-amber-800 text-white hover:bg-amber-900"
              }`}
            >
              Register
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON (toggles open/close) */}
          <button
            className={`md:hidden rounded-xl px-3 py-2 transition-colors ${
              isScrolled
                ? "text-white hover:bg-white/10"
                : "text-amber-900 hover:bg-amber-100"
            }`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <div
          className={`md:hidden absolute inset-x-0 top-full ${mobileMenuBg} shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                ref={firstMobileLinkRef}
                to="/#about"
                onClick={(e) => smoothScroll(e, "#about")}
                className={mobileLinkClass(isHashActive("#about"))}
              >
                About
              </Link>

              <Link
                to="/#gallery"
                onClick={(e) => smoothScroll(e, "#gallery")}
                className={mobileLinkClass(isHashActive("#gallery"))}
              >
                Gallery
              </Link>

              <Link
                to="/#blog"
                onClick={(e) => smoothScroll(e, "#blog")}
                className={mobileLinkClass(isHashActive("#blog"))}
              >
                Blogs
              </Link>

              <Link
                to="/#contact"
                onClick={(e) => smoothScroll(e, "#contact")}
                className={mobileLinkClass(isHashActive("#contact"))}
              >
                Contact
              </Link>

              <div className={`h-px ${mobileDivider} my-4`} />

              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClass(location.pathname === "/login")}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 py-3 mt-2 rounded-xl font-semibold text-center transition-all ${
                  isScrolled
                    ? "bg-white text-amber-950 hover:bg-amber-50"
                    : "bg-amber-800 text-white hover:bg-amber-900"
                }`}
              >
                Register
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
