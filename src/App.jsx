// src/App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

import ProtectedRoute from "./Auth/ProtectedRoute.jsx";
import PageLoader from "./components/PageLoader";

// Protected pages
import Events from "./Pages/Events.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import Gallery from "./Pages/Gallery.jsx";
import Blogs from "./Pages/Blogs.jsx";
import MyPayments from "./Pages/MyPayments.jsx";
import UpcomingEvents from "./Pages/UpcomingEvents.jsx";

// Lazy-loaded public pages
const Home = lazy(() => import("./Pages/Home.jsx"));
const LoginPage = lazy(() => import("./Auth/Login.jsx"));
const RegisterPage = lazy(() => import("./Auth/Register.jsx"));
// const AboutVillage = lazy(() => import("./Pages/AboutVillage.jsx"));
// const GalleryPage = lazy(() => import("./Pages/allGalleryImages.jsx"));

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const el = document.querySelector(location.hash);
    if (!el) return;

    const yOffset = -90; // ✅ header offset
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    setTimeout(() => {
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 900, once: false });
  }, []);

  // Scroll to top on route change if no hash
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <ScrollToHash />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ✅ PUBLIC ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />

            {/* Optional public pages */}
            {/* <Route path="/about-village" element={<AboutVillage />} />
            <Route path="/gallery" element={<GalleryPage />} /> */}
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
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <MyPayments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upcoming-events"
            element={
              <ProtectedRoute>
                <UpcomingEvents />
              </ProtectedRoute>
            }
          />

          {/* ✅ 404 */}
          <Route path="*" element={<div className="p-6">Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}
