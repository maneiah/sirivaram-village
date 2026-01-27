// src/components/Gallery.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
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

  const [activeCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  // ✅ Auto scroll when URL is "/#gallery"
  useEffect(() => {
    if (location.hash !== "#gallery") return;

    const el = document.querySelector("#gallery");
    if (!el) return;

    setTimeout(() => {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  }, [location.hash]);

  // ✅ Filtered images
  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  // ✅ Close modal on ESC
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section
      id="gallery"
      className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-b from-white via-amber-50 to-white"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* ✅ CENTER Heading like Blog */}
        <div className="flex flex-col gap-4 mb-10 text-center md:mx-auto max-w-2xl">
          <h2
            id="gallery-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-900"
          >
            Gallery
          </h2>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            A small glimpse of Sirivaram’s temple, fields, festivals and
            everyday village life. Tap any image to view in full.
          </p>

          <div className="flex justify-center gap-3 mt-2">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold py-2.5 px-6 rounded-xl shadow-sm transition"
            >
              View Full Gallery
            </Link>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img)}
              className="group relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Open image: ${img.title}`}
            >
              <img
                src={img.image || "/placeholder.svg"}
                alt={img.title}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-95" />

              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-xs uppercase tracking-wide text-amber-200">
                  {img.category}
                </p>
                <h3 className="text-sm font-semibold text-white">
                  {img.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Lightbox Modal */}
      {selected && (
        <>
          <button
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setSelected(null)}
            aria-label="Close image preview backdrop"
          />

          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div>
                  <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">
                    {selected.category}
                  </p>
                  <p className="text-lg font-extrabold text-amber-900">
                    {selected.title}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="px-3 py-2 rounded-lg hover:bg-gray-100"
                  aria-label="Close preview"
                >
                  ✕
                </button>
              </div>

              <div className="bg-black">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
