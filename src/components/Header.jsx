// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const firstMobileLinkRef = useRef(null);

  // Add shadow / bg color after scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open + focus first item
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstMobileLinkRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isMobileMenuOpen]);

  // Close menu when route changes
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

  // Smooth scroll to #about if already on home, else navigate using hash
  const handleAboutClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.querySelector("#about");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Smooth scroll to #gallery if already on home
  const handleGalleryClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.querySelector("#gallery");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
              ॐ
            </div>
            <span
              className={`font-bold text-lg md:text-xl hidden sm:inline transition-colors ${
                isScrolled ? "text-white" : "text-amber-900"
              }`}
            >
              Sirivaram
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {/* About scrolls to #about on Home */}
            <Link
              to="/#about"
              onClick={handleAboutClick}
              className={linkBase}
              aria-current={
                location.hash === "#about" && isOn("/") ? "page" : undefined
              }
            >
              About
            </Link>

            {/* Gallery scrolls to #gallery on Home */}
            <Link
              to="/#gallery"
              onClick={handleGalleryClick}
              className={linkBase}
              aria-current={
                location.hash === "#gallery" && isOn("/") ? "page" : undefined
              }
            >
              Gallery
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
              aria-current={isOn("/register") ? "page" : undefined}
            >
              Register
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-white" : "text-amber-900"
            }`}
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden pb-4 flex flex-col gap-3"
            role="dialog"
            aria-modal="true"
          >
            <Link
              to="/#about"
              onClick={(e) => {
                handleAboutClick(e);
                setIsMobileMenuOpen(false);
              }}
              ref={firstMobileLinkRef}
              className={`block ${linkBase}`}
              aria-current={
                location.hash === "#about" && isOn("/") ? "page" : undefined
              }
            >
              About
            </Link>

            <Link
              to="/#gallery"
              onClick={(e) => {
                handleGalleryClick(e);
                setIsMobileMenuOpen(false);
              }}
              className={`block ${linkBase}`}
              aria-current={
                location.hash === "#gallery" && isOn("/") ? "page" : undefined
              }
            >
              Gallery
            </Link>

            <Link
              to="/login"
              className={`block ${linkBase}`}
              aria-current={isOn("/login") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={`block px-4 py-2 rounded-lg font-semibold text-center transition-all ${
                isScrolled
                  ? "bg-white text-amber-900"
                  : "bg-amber-700 text-white"
              }`}
              aria-current={isOn("/register") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
