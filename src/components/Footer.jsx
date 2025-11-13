import React from "react";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"; // npm install lucide-react

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo / Brand */}
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl mb-4 shadow-sm">
              ॐ
            </div>
            <h3 className="font-bold text-lg tracking-wide">Sirivaram</h3>
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
                <a href="/login" className="hover:text-white transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="hover:text-white transition-colors"
                >
                  Register
                </a>
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

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-50 text-sm uppercase tracking-wide">
              Follow Us
            </h4>
            <p className="text-amber-100 text-sm mb-3">
              Stay connected with updates, events and stories from Sirivaram.
            </p>
            <div className="flex gap-3">
              {/* All icons now follow same amber theme */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-amber-800/80 flex items-center justify-center hover:bg-amber-500 transition-all transform hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-amber-50" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-amber-800/80 flex items-center justify-center hover:bg-amber-500 transition-all transform hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-amber-50" />
              </a>

              <a
                href="https://wa.me/917093485208"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-amber-800/80 flex items-center justify-center hover:bg-amber-500 transition-all transform hover:scale-110 shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-amber-50" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-amber-800/80 flex items-center justify-center hover:bg-amber-500 transition-all transform hover:scale-110 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-amber-50" />
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
