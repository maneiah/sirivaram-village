// src/Home.jsx
import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import { Blog } from "../components/Blog";
import FaqWithImage from "../components/FaqWithImage";
import GetInTouchSimple from "../components/GetInTouchSimple";
import PageLoader from "../components/PageLoader";
import ScrollToTop from "../components/ScrollToTop";
export default function Home() {
  const [loading, setLoading] = React.useState(true);
  

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) return <PageLoader />;

  return (
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
      {/* 6️⃣ Contact Form Section */}
      <section id="contact">
        <GetInTouchSimple data-aos="fade-up" />
      </section>
      <ScrollToTop />
    </div>
  );
}
