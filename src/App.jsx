// src/App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Events from "./Pages/Events.jsx";
import ProtectedRoute from "./Auth/ProtectedRoute.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";

// Lazy-loaded pages
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

  useEffect(() => {
    AOS.init({ duration: 900, once: false });
  }, []);

  // Scroll to top if no hash exists
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <ScrollToHash />

      {/* Suspense fallback loader */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about-village" element={<AboutVillage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Route>
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
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
