// src/Home.jsx
import React, { Suspense, lazy } from "react";
import PageLoader from "../components/PageLoader";
import ScrollToTop from "../components/ScrollToTop";

// Lazy load all sections
const Hero = lazy(() => import("../components/Hero"));
const About = lazy(() => import("../components/About"));
const Gallery = lazy(() => import("../components/Gallery"));
const Blog = lazy(() => import("../components/Blog").then(m => ({ default: m.Blog })));
const FaqWithImage = lazy(() => import("../components/FaqWithImage"));
const GetInTouchSimple = lazy(() => import("../components/GetInTouchSimple"));

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <div className="bg-white">
        {/* 1️⃣ Hero Section */}
        <section id="hero">
          <Hero data-aos="fade-up" />
        </section>

        {/* 2️⃣ About Section */}
        <section id="about">
          <About data-aos="fade-up" />
        </section>

        {/* 3️⃣ Gallery Section */}
        <section id="gallery">
          <Gallery data-aos="fade-up" />
        </section>

        {/* 4️⃣ Blog Section */}
        <section id="blog">
          <Blog data-aos="fade-up" />
        </section>

        {/* 5️⃣ FAQ Section */}
        <section>
          <FaqWithImage data-aos="fade-up" />
        </section>

        {/* 6️⃣ Contact Section */}
        <section id="contact">
          <GetInTouchSimple data-aos="fade-up" />
        </section>

        <ScrollToTop />
      </div>
    </Suspense>
  );
}
