// src/pages/Home.jsx
import React, { Suspense, lazy } from "react";
import PageLoader from "../components/PageLoader";
import ScrollToTop from "../components/ScrollToTop";

// Lazy load all sections
const Hero = lazy(() => import("../components/Hero"));
const About = lazy(() => import("../components/About"));
const Gallery = lazy(() => import("../components/Gallery"));
const Blog = lazy(() =>
  import("../components/Blog").then((m) => ({ default: m.Blog })),
);
const FaqWithImage = lazy(() => import("../components/FaqWithImage"));
const GetInTouchSimple = lazy(() => import("../components/GetInTouchSimple"));

export default function Home() {
  return (
    <Suspense fallback={<PageLoader />}>
      <main className="bg-white">
        {/* ✅ Components already have their own section IDs inside */}
        <Hero />
        <About />
        <Gallery />
        <Blog />
        <FaqWithImage />
        <GetInTouchSimple />

        <ScrollToTop />
      </main>
    </Suspense>
  );
}
