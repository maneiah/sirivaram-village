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
      <Hero data-aos="fade-up" />

      {/* 2️⃣ About Section */}
      <About data-aos="fade-up" />

      {/* 3️⃣ Gallery Section */}
      <Gallery data-aos="fade-up" />

      {/* 4️⃣ Blog Section */}
      <Blog data-aos="fade-up" />

      {/* 5️⃣ FAQ Section */}
      <FaqWithImage data-aos="fade-up" />

      {/* 6️⃣ Contact Form Section */}
      <GetInTouchSimple data-aos="fade-up" />
      <ScrollToTop />

    </div>
  );
}
