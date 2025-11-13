// src/components/Gallery.jsx
"use client";

import React from "react";
import { Link } from "react-router-dom";

const galleryImages = [
  {
    id: 1,
    title: "Temple Gopuram",
    category: "Heritage",
    image:
      "https://images.pexels.com/photos/208485/pexels-photo-208485.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Green Fields",
    category: "Nature",
    image:
      "https://images.pexels.com/photos/2664029/pexels-photo-2664029.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Village Pathway",
    category: "Village Life",
    image:
      "https://images.pexels.com/photos/2664029/pexels-photo-2664029.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Festival Lights",
    category: "Celebration",
    image:
      "https://images.pexels.com/photos/1661900/pexels-photo-1661900.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Temple Gopuram",
    category: "Heritage",
    image:
      "https://images.pexels.com/photos/208485/pexels-photo-208485.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Green Fields",
    category: "Nature",
    image:
      "https://images.pexels.com/photos/2664029/pexels-photo-2664029.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 7,
    title: "Village Pathway",
    category: "Village Life",
    image:
      "https://images.pexels.com/photos/2664029/pexels-photo-2664029.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 8,
    title: "Festival Lights",
    category: "Celebration",
    image:
      "https://images.pexels.com/photos/1661900/pexels-photo-1661900.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
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

        {/* Image grid */}
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
