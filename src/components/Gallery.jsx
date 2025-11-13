"use client";
import { Link } from "react-router-dom";
const galleryImages = [
  {
    id: 1,
    title: "Temple Architecture",
    category: "Heritage",
    image: "https://i.ibb.co/wNWGjmhd/ORDER-RICE-ONLINE.png",
  },

  {
    id: 2,
    title: "Village Fields",
    category: "Agriculture",
    image: "https://i.ibb.co/F4jMpmXr/Groceries.png",
  },
  {
    id: 3,
    title: "Traditional Arts",
    category: "Culture",
    image: "https://i.ibb.co/mWQHvFT/Pets-ca3ab0d5bb314a9dc270.png",
  },
  {
    id: 4,
    title: "Festival Celebration",
    category: "Events",
    image:
      "https://i.ibb.co/rRLB5P3q/Transportation-73d3a5de19f5bf0ab577-1.png",
  },
  {
    id: 5,
    title: "Morning Vibes",
    category: "Spiritual Life",
    image: "https://i.ibb.co/s9FMTHBk/Education-e7e8a28db21bea7913a2.png",
  },
  {
    id: 6,
    title: "Local Market",
    category: "Community",
    image: "https://i.ibb.co/fYLJPHMH/Food-Beverage-f6f559081d73ac0954f1.png",
  },
  {
    id: 7,
    title: "Cultural Dance",
    category: "Festivals",
    image: "https://i.ibb.co/MDRtFLkX/games-a8a1f4e472b2b491412b.png",
  },
  {
    id: 8,
    title: "Sunset Over Fields",
    category: "Nature",
    image: "https://i.ibb.co/7JCGw842/legal-services-5638bd2fe81fef1e3ac4.png",
  },
];


export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-16 bg-gradient-to-b from-white to-amber-50 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Village Gallery
          </h2>
          <p className="text-lg text-gray-600">
            Discover the beauty and heritage of Sirivaram through our image
            collection
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-amber-100 text-sm">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View Gallery Button */}
        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
