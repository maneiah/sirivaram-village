import React, { useEffect, useMemo, useState } from "react";
import { Facebook, Instagram, ArrowUp } from "lucide-react";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FOOTER_API = "https://sirivaram-backed.onrender.com/api/footer";

const safeStr = (v) => (typeof v === "string" ? v : "");
const cleanUrl = (url, fallback = "") => {
  const u = safeStr(url).trim();
  if (!u) return fallback;
  try {
    const parsed = new URL(u);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") return u;
    return fallback;
  } catch {
    return fallback;
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const [showTop, setShowTop] = useState(false);

  // ✅ API footer state
  const [footer, setFooter] = useState({
    id: "",
    address:
      "Sirivaram Village, Penagaluru Mandal, Annamayya District, Andhra Pradesh",
    contactNo: "+91 70934 85208",
    email: "sirivaram@gmail.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  });
  const [loading, setLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ✅ fetch footer from backend
  useEffect(() => {
    let alive = true;

    const fetchFooter = async () => {
      setLoading(true);
      try {
        const res = await fetch(FOOTER_API, {
          headers: { ...getAuthHeaders() },
        });
        if (!res.ok) throw new Error(`Footer API failed: ${res.status}`);
        const data = await res.json();

        if (!alive) return;

        setFooter((prev) => ({
          ...prev,
          id: safeStr(data?.id),
          address: safeStr(data?.address) || prev.address,
          contactNo: safeStr(data?.contactNo) || prev.contactNo,
          email: safeStr(data?.email) || prev.email,
          facebook: cleanUrl(data?.facebook, prev.facebook),
          instagram: cleanUrl(data?.instagram, prev.instagram),
          youtube: cleanUrl(data?.youtube, prev.youtube),
        }));
      } catch {
        // keep defaults if api fails (no UI break)
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchFooter();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ show back-to-top only after scroll
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 350);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ smooth scroll helper (works from any route)
  const smoothScroll = (e, sectionId) => {
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
      }, 220);

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

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", location.pathname);
  };

  // ✅ schema uses API data
  const orgSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Sirivaram Village",
      url: "https://sirivaram-village.vercel.app",
      logo: "https://sirivaram-village.vercel.app/favicon.png",
      sameAs: [footer.facebook, footer.instagram, footer.youtube].filter(
        Boolean,
      ),
      contactPoint: {
        "@type": "ContactPoint",
        email: footer.email,
        telephone: footer.contactNo,
        contactType: "customer support",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: footer.address,
        addressCountry: "IN",
      },
    }),
    [footer],
  );

  // WhatsApp link (you can also add whatsapp in API later; for now using contactNo)
  const whatsappLink = useMemo(() => {
    const digits = safeStr(footer.contactNo).replace(/[^\d]/g, "");
    // If number already contains country code, keep it; else assume India (+91)
    const formatted = digits.length >= 10 ? digits : "917093485208";
    return `https://wa.me/${formatted}`;
  }, [footer.contactNo]);

  return (
    <footer className="relative bg-amber-950 text-white">
      {/* Top glow / divider */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center shadow-sm border border-white/10">
                {/* Village SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 350 350"
                  className="w-9 h-9 brightness-0 invert"
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

              <div>
                <h2 className="font-extrabold text-lg tracking-wide">
                  SIRIVARAM
                </h2>
                <p className="text-xs text-amber-100/80">
                  Heritage • Culture • Community
                </p>
              </div>
            </div>

            <p className="text-amber-100/90 text-sm mt-4 leading-relaxed">
              Preserving heritage, celebrating culture, and welcoming devotees
              and visitors to our village temple.
            </p>

            {loading ? (
              <p className="text-xs text-amber-100/70 mt-3">
                Updating footer info…
              </p>
            ) : null}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-amber-100/90 font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-amber-100/85">
              <li>
                <Link
                  to="/#about"
                  onClick={(e) => smoothScroll(e, "#about")}
                  className="hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/#blog"
                  onClick={(e) => smoothScroll(e, "#blog")}
                  className="hover:text-white transition"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/#gallery"
                  onClick={(e) => smoothScroll(e, "#gallery")}
                  className="hover:text-white transition"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/#faq"
                  onClick={(e) => smoothScroll(e, "#faq")}
                  className="hover:text-white transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  onClick={(e) => smoothScroll(e, "#contact")}
                  className="hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (API driven) */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-amber-100/90 font-semibold mb-4">
              Contact
            </h3>

            <address className="not-italic text-amber-100/85 text-sm leading-relaxed space-y-2">
              <div>
                <span className="font-semibold text-amber-100">Email:</span>{" "}
                <a href={`mailto:${footer.email}`} className="hover:underline">
                  {footer.email}
                </a>
              </div>

              <div>
                <span className="font-semibold text-amber-100">Phone:</span>{" "}
                <a
                  href={`tel:${footer.contactNo.replace(/\s+/g, "")}`}
                  className="hover:underline"
                >
                  {footer.contactNo}
                </a>
              </div>

              <div>
                <span className="font-semibold text-amber-100">Address:</span>
                <div className="mt-1 whitespace-pre-line">{footer.address}</div>
              </div>
            </address>
          </div>

          {/* Social (API driven) */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-amber-100/90 font-semibold mb-4">
              Follow Us
            </h3>
            <p className="text-amber-100/85 text-sm mb-4 leading-relaxed">
              Stay connected with updates, events and stories from Sirivaram.
            </p>

            <div className="flex gap-3">
              <a
                href={footer.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition transform hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>

              <a
                href={footer.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition transform hover:scale-105"
                aria-label="Instagram"
                style={{
                  background:
                    "linear-gradient(45deg, #FEC564, #FE2A54, #8800F2)",
                }}
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition transform hover:scale-105"
                aria-label="WhatsApp"
              >
                <FaWhatsappSquare className="w-5 h-5 text-white" />
              </a>

              <a
                href={footer.youtube || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition transform hover:scale-105"
                aria-label="YouTube"
              >
                <IoLogoYoutube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/10 pt-6 mt-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-amber-100/80 text-xs sm:text-sm">
              © {currentYear} Sirivaram Village. All rights reserved.
            </p>

            <div className="text-amber-100/70 text-xs sm:text-sm">
              Built with ❤️ for Sirivaram
            </div>
          </div>
        </div>

        {/* ✅ JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </div>

      {/* ✅ Back to Top Button */}
      {showTop && (
        <button
          onClick={backToTop}
          className="fixed bottom-6 right-6 z-50 bg-amber-700 hover:bg-amber-800 text-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
