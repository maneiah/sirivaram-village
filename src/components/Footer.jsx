import React from "react";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"; // npm install lucide-react

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-2xl mb-4">
              ॐ
            </div>
            <h3 className="font-bold text-lg">Sirivaram</h3>
            <p className="text-amber-100 text-sm mt-2">
              Preserving heritage, celebrating culture
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-amber-100 text-sm">
              <li>
                <a href="/#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/about-village"
                  className="hover:text-white transition"
                >
                  Explore
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-white transition">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-amber-100 text-sm">
              <li>Email: sirivaram@gmail.com</li>
              <li>Phone: +91 70934 85208</li>
              <li>
                Address: Sirivaram Village, Penagaluru Mandal, Annamayya
                District
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#0e63d0] transition-transform transform hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full flex items-center justify-center hover:opacity-90 transition-transform transform hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917093485208"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#1EBE57] transition-transform transform hover:scale-110"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center hover:bg-[#CC0000] transition-transform transform hover:scale-110"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 pt-8">
          <p className="text-center text-amber-100 text-sm">
            © {currentYear} Sirivaram Village. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
