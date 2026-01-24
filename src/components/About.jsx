import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  { label: "Families", value: 200, suffix: "+" },
  { label: "Years Heritage", value: 50, suffix: "+" },
  { label: "Community", value: 100, suffix: "%" },
  { label: "Peoples", value: 1000, suffix: "+" },
];

/* -------------------- Feature Card -------------------- */
const FeatureCard = memo(({ icon, title, description }) => (
  <article
    className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-amber-200"
    aria-label={title}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-amber-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </article>
));

/* -------------------- Value Card -------------------- */
const ValueCard = memo(({ icon, title, desc }) => (
  <div className="text-center" aria-label={title}>
    <div className="text-4xl mb-3">{icon}</div>
    <h4 className="font-bold text-amber-900">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
));

/* -------------------- Stat Card (with count animation) -------------------- */
const StatCard = memo(({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  const reduceMotion = useMemo(
    () =>
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
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

        const duration = 900;
        const start = performance.now();

        const animate = (t) => {
          const progress = Math.min(1, (t - start) / duration);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        animated.current = true;
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value, reduceMotion]);

  return (
    <div
      ref={ref}
      className="bg-white p-4 md:p-6 rounded-lg text-center border-2 border-amber-300 shadow-md"
    >
      <p className="text-2xl md:text-3xl font-extrabold text-amber-800">
        {count}
        {suffix}
      </p>
      <p className="text-sm md:text-base mt-2 text-amber-700">{label}</p>
    </div>
  );
});

/* -------------------- About Section -------------------- */
export default function About() {
  const location = useLocation();

  // ✅ Auto-scroll when route contains hash like "/#about"
  useEffect(() => {
    if (location.hash !== "#about") return;

    const el = document.querySelector("#about");
    if (!el) return;

    // wait for layout
    setTimeout(() => {
      const yOffset = -90; // header height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  }, [location.hash]);

  return (
    <section
      id="about"
      className="px-4 sm:px-6 lg:px-8 bg-white py-16"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          id="about-heading"
          className="text-4xl font-bold text-amber-900 text-center mb-4"
        >
          About Sirivaram
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto text-lg mb-12">
          Learn about the rich heritage and vibrant community that makes
          Sirivaram special.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {FEATURES.map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Key Values */}
        <div className="py-12 border-y-2 border-amber-200 mb-16">
          <h3 className="text-2xl font-bold text-amber-900 text-center mb-8">
            Key Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_VALUES.map((val, i) => (
              <ValueCard key={i} {...val} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/about-village"
            className="inline-block px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition shadow-md"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
