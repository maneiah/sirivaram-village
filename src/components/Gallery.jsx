// src/components/Gallery.jsx
"use client";

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const galleryImages = [
  {
    id: 1,
    title: "Temple Gopuram",
    category: "Heritage",
    image:
      "https://t3.ftcdn.net/jpg/04/96/97/92/240_F_496979256_zYzs2iSkK3pRRjkRYk60kSxxhVPoukE8.jpg",
  },
  {
    id: 2,
    title: "Green Fields",
    category: "Nature",
    image:
      "https://i.pinimg.com/736x/88/c4/b4/88c4b40afa5a1e7dc6a4daf922a5031b.jpg",
  },
  {
    id: 3,
    title: "Village Pathway",
    category: "Village Life",
    image:
      "https://images.stockcake.com/public/8/8/2/882ac73a-c289-4020-a2ba-c7310f1d7105_large/rural-village-pathway-stockcake.jpg",
  },
  {
    id: 4,
    title: "Festival Lights",
    category: "Celebration",
    image:
      "https://png.pngtree.com/thumb_back/fw800/background/20251005/pngtree-nighttime-village-celebration-with-fireworks-and-glowing-festive-lights-image_19765805.webp",
  },
  {
    id: 5,
    title: "Misty Green Hills",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Sunrise Over Green Fields",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Rustic Village Walkway",
    category: "Village Life",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Peaceful Village Morning",
    category: "Village Life",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS_vsKBih_smdN7JGM9KM5AG3iFRIuDXm7Yw&s",
  },
];

export default function Gallery() {
  const location = useLocation();

  // ✅ Auto scroll when URL is "/#gallery"
  useEffect(() => {
    if (location.hash !== "#gallery") return;

    const el = document.querySelector("#gallery");
    if (!el) return;

    setTimeout(() => {
      const yOffset = -90; // header height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  }, [location.hash]);

  return (
    <section
      id="gallery"
      className="px-4 sm:px-6 lg:px-8 bg-white py-16"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2
              id="gallery-heading"
              className="text-3xl sm:text-4xl font-extrabold text-amber-900 mb-2"
            >
              Gallery
            </h2>
            <p className="text-gray-700 text-sm sm:text-base max-w-xl">
              A small glimpse of Sirivaram’s temple, fields, festivals and
              everyday village life.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-colors"
          >
            View Full Gallery
          </Link>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={img.image || "/placeholder.svg"}
                alt={img.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs uppercase tracking-wide text-amber-200">
                  {img.category}
                </p>
                <h3 className="text-sm font-semibold text-white">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
