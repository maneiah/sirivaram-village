// src/App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

import ProtectedRoute from "./Auth/ProtectedRoute.jsx";

// Protected pages
import Events from "./Pages/Events.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import Gallery from "./Pages/Gallery.jsx";
import Blogs from "./Pages/Blogs.jsx";

// Lazy-loaded public pages
const Home = lazy(() => import("./Pages/Home.jsx"));
const LoginPage = lazy(() => import("./Auth/Login.jsx"));
const RegisterPage = lazy(() => import("./Auth/Register.jsx"));
const AboutVillage = lazy(() => import("./Pages/AboutVillage.jsx"));
const GalleryPage = lazy(() => import("./Pages/allGalleryImages.jsx"));

// Scroll to #hash (anchors)
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]); // ✅ updated dependency

  return null;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 900, once: false });
  }, []);

  // Scroll to top if no hash exists
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <ScrollToHash />

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          {/* ✅ PUBLIC ROUTES */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about-village" element={<AboutVillage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Route>

          {/* ✅ PROTECTED ROUTES */}
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery-view"
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />

          {/* ✅ Optional: 404 */}
          <Route path="*" element={<div className="p-6">Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}
