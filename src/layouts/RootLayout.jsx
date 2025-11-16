// src/layouts/RootLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="pt-12 md:pt-16 flex-1">
        <Outlet />
      </main>
      <Footer  className="pt-12 md:pt-16" />
    </div>
  );
}
