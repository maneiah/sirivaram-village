import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** ---- Static data (hoisted) ---- */
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

/** ---- Small memoized cards ---- */
const FeatureCard = memo(function FeatureCard({ icon, title, description }) {
  return (
    <article
      className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      aria-label={title}
    >
      <div className="text-4xl mb-4" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-amber-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </article>
  );
});

const ValueCard = memo(function ValueCard({ icon, title, desc }) {
  return (
    <div className="text-center" aria-label={title}>
      <div className="text-4xl mb-3" aria-hidden="true">
        {icon}
      </div>
      <h4 className="font-bold text-amber-900">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
});

/** ---- Stat card with count-up that respects reduced motion ---- */
const StatCard = memo(function StatCard({ value, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);
  const prefersReduced = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    if (prefersReduced) {
      setCount(value);
      hasAnimated.current = true;
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasAnimated.current) {
            const duration = 900; // ms
            const start = performance.now();
            const animate = (t) => {
              const p = Math.min(1, (t - start) / duration);
              setCount(Math.floor(p * value));
              if (p < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            hasAnimated.current = true;
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, prefersReduced]);

  return (
    <div
      ref={ref}
      className="bg-white p-4 md:p-6 rounded-lg text-center border-2 shadow-md border-violet-700/60"
    >
      <p className="text-2xl md:text-3xl font-extrabold text-violet-800 tracking-tight">
        {count}
        {suffix}
      </p>
      <p className="text-sm md:text-base mt-2 text-violet-700/80">{label}</p>
    </div>
  );
});

/** ---- About Section ---- */
export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="about-heading"
          className="text-4xl font-bold text-amber-900 mb-4 text-center"
        >
          About Sirivaram
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
          Learn about the rich heritage and vibrant community that makes
          Sirivaram special.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        {/* Stats (count-up) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Key Values */}
        <div className="mb-12 py-12 border-t-2 border-b-2 border-amber-200">
          <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">
            Key Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_VALUES.map((v) => (
              <ValueCard key={v.title} {...v} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/about-village"
            className="inline-block px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="View more about Sirivaram village"
          >
            <span className="sr-only">Navigate to more details: </span>
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
