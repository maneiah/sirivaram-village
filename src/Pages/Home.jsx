// src/Home.jsx
import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import { Blog } from "../components/Blog";
export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      {/* Make sure About renders an element with id="about" */}
     
      <About />
      <Gallery />
      <Blog />
    </div>
  );
}
