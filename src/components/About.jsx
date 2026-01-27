import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Image1 from "../assets/image1 (1).png";

/* -------------------- Static Data -------------------- */
const FEATURES = [
  {
    title: "Historic Temple",
    description:
      "Home to an ancient temple with magnificent architecture and spiritual significance dating back centuries.",
    icon: "🏛️",
  },
  {
    title: "Warm Community",
    description:
      "Experience the warmth and hospitality of our tight-knit community that welcomes visitors with open arms.",
    icon: "👥",
  },
  {
    title: "Rich Culture",
    description:
      "Immerse yourself in the vibrant cultural traditions, festivals, and ceremonies of Sirivaram.",
    icon: "🎭",
  },
];

const KEY_VALUES = [
  { icon: "🛕", title: "Spiritual Heritage", desc: "Rich temple traditions" },
  { icon: "🌾", title: "Agricultural Roots", desc: "Farming heritage" },
  { icon: "❤️", title: "Community Bond", desc: "Strong family values" },
  { icon: "🎨", title: "Cultural Arts", desc: "Traditional crafts" },
];

const STATS = [
  { label: "Families", value: 20, suffix: "+" },
  { label: "Years Heritage", value: 5, suffix: "+" },
  { label: "Community Unity", value: 10, suffix: "%" },
  { label: "People", value: 100, suffix: "+" },
];

/* -------------------- Feature Card -------------------- */
const FeatureCard = memo(({ icon, title, description }) => (
  <article
    className="group bg-white/90 backdrop-blur rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-xl transition-all duration-300"
    aria-label={title}
  >
    <div className="flex items-start gap-4">
      <div className="text-4xl leading-none">{icon}</div>
      <div>
        <h3 className="text-xl font-extrabold text-amber-900 mb-2 group-hover:text-amber-800 transition">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </article>
));

/* -------------------- Value Card -------------------- */
const ValueCard = memo(({ icon, title, desc }) => (
  <div
    className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition text-center"
    aria-label={title}
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h4 className="font-extrabold text-amber-900 text-lg">{title}</h4>
    <p className="text-sm text-gray-600 mt-1">{desc}</p>
  </div>
));

/* -------------------- Stat Card -------------------- */
const StatCard = memo(({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  const reduceMotion = useMemo(
    () =>
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
    [],
  );

  useEffect(() => {
    if (!ref.current || animated.current) return;

    if (reduceMotion) {
      setCount(value);
      animated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animated.current) return;

        const duration = 1200;
        const start = performance.now();

        const animate = (t) => {
          const progress = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        animated.current = true;
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, reduceMotion]);

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white/90 backdrop-blur p-5 border border-amber-200 shadow-sm hover:shadow-md transition text-center"
    >
      <p className="text-3xl sm:text-4xl font-extrabold text-amber-900">
        {count}
        {84}
        {suffix}
      </p>
      <p className="text-sm sm:text-base mt-2 text-gray-700 font-medium">
        {label}
      </p>
    </div>
  );
});

/* -------------------- About Section -------------------- */
export default function About() {
  const location = useLocation();

  // Auto-scroll when route contains hash like "/#about"
  useEffect(() => {
    if (location.hash !== "#about") return;

    const el = document.querySelector("#about");
    if (!el) return;

    setTimeout(() => {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
  }, [location.hash]);

  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-b from-amber-50 via-white to-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-700 font-bold uppercase tracking-wider text-sm md:text-base">
            Discover Our Village
          </p>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-900 mt-3"
          >
            About Sirivaram
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-base sm:text-lg mt-5 leading-relaxed">
            Learn about the rich heritage and vibrant community that makes
            Sirivaram special. Discover traditions, values, and the temple
            culture that unites generations.
          </p>
        </div>

        {/* Two-column highlight - Image on top (mobile), right (desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Text */}
          <div className="order-2 lg:order-1 rounded-2xl bg-white/90 backdrop-blur border border-amber-200 shadow-sm p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-amber-900 mb-4">
              A place of tradition and togetherness
            </h3>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Sirivaram is known for its spiritual heritage, cultural festivals,
              and warm community life. Visitors experience authentic village
              traditions and a peaceful atmosphere surrounded by natural beauty.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 text-sm font-semibold">
                🛕 Temple Culture
              </span>
              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 text-sm font-semibold">
                🎉 Festivals
              </span>
              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 text-sm font-semibold">
                🌾 Farming Life
              </span>
              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 text-sm font-semibold">
                ❤️ Community
              </span>
            </div>
          </div>

          {/* Image - Top on mobile */}
          <div className="order-1 lg:order-2 group">
            <div className="h-64 sm:h-80 md:h-96 lg:h-full min-h-80 rounded-2xl overflow-hidden border border-amber-200 shadow-lg">
              <img
                src={Image1}
                alt="Scenic view of Sirivaram Village with historic temple and community surroundings"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
          {FEATURES.map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-16 md:mb-20">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Key Values */}
        <div className="rounded-2xl border border-amber-200 bg-white/80 backdrop-blur p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-extrabold text-amber-900 text-center mb-10">
            Our Key Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_VALUES.map((val, i) => (
              <ValueCard key={i} {...val} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/about-village"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-amber-800 text-white font-semibold text-lg hover:bg-amber-900 transition shadow-lg hover:shadow-xl"
            >
              Explore More
            </Link>
            <p className="text-sm md:text-base text-gray-600 mt-4">
              Discover detailed history, village updates, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
