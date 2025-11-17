import React from "react";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io"; 

import { Link } from "react-router-dom";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo / Brand */}
          <div>
            <div className="w-14 h-14 rounded-xl bg-amber-800 flex items-center justify-center p-2 shadow-sm">
              {/* Village SVG ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 350 350"
                className="w-10 h-10 brightness-0 invert"
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

            <h3 className="font-bold text-lg tracking-wide mt-3">Sirivaram</h3>
            <p className="text-amber-100 text-sm mt-2 leading-relaxed">
              Preserving heritage, celebrating culture and welcoming devotees
              and visitors to our village temple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-50 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-amber-100 text-sm">
              <li>
                <a
                  href="/#about"
                  className="hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#blogs"
                  className="hover:text-white transition-colors"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/about-village"
                  className="hover:text-white transition-colors"
                >
                  Explore Village
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <Link  to="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-50 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-amber-100 text-sm leading-relaxed">
              <li>
                <span className="font-medium text-amber-50">Email:</span>{" "}
                sirivaram@gmail.com
              </li>
              <li>
                <span className="font-medium text-amber-50">Phone:</span> +91
                70934 85208
              </li>
              <li>
                <span className="font-medium text-amber-50">Address:</span>{" "}
                Sirivaram Village, Penagaluru Mandal,
                <br />
                Annamayya District, Andhra Pradesh
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-50 text-sm uppercase tracking-wide">
              Follow Us
            </h4>
            <p className="text-amber-100 text-sm mb-3">
              Stay connected with updates, events and stories from Sirivaram.
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:brightness-110 transition-all transform hover:scale-110 shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-md"
                aria-label="Instagram"
                style={{
                  background:
                    "linear-gradient(45deg, #FEC564, #FE2A54, #8800F2)",
                }}
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917093485208"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:brightness-110 transition-all transform hover:scale-110 shadow-md"
                aria-label="WhatsApp"
              >
                <FaWhatsappSquare className="w-5 h-5 text-white" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center hover:brightness-110 transition-all transform hover:scale-110 shadow-md"
                aria-label="YouTube"
              >
                <IoLogoYoutube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-amber-800 pt-6 mt-4">
          <p className="text-center text-amber-100 text-xs sm:text-sm">
            © {currentYear} Sirivaram Village. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
