// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./Pages/Home.jsx";
import LoginPage from "./Auth/Login.jsx";
import RegisterPage from "./Auth/Register.jsx";
import AboutVillage from "./Pages/AboutVillage.jsx";
import GalleryPage from "./Pages/allGalleryImages.jsx";

// Handles scrolling to #about, #gallery, etc
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);

  return null;
}

function App() {
  const location = useLocation();

  // Scroll to top on normal route change (without hash)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

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

export default App;
