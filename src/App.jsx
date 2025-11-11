// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./Pages/Home.jsx";
import LoginPage from "./Auth/Login.jsx";
import RegisterPage from "./Auth/Register.jsx";
import AboutVillage from "./Pages/AboutVillage.jsx";
import GalleryPage from "./Pages/allGalleryImages.jsx";
function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    // if there's a hash in the URL (e.g., /#about), smooth scroll to it
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // default behavior: go to top on route change without a hash
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        {/* Layout with shared Header & Footer */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about-village" element={<AboutVillage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
    </>
  );
}
