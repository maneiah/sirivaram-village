"use client";
import { useState } from "react";


const allGalleryImages = [
  {
    id: 1,
    title: "Ancient Temple",
    category: "Heritage",
    description:
      "The sacred temple of Sirivaram showcasing ancient architecture",
    image: "/ancient-temple-architecture-sirivaram.jpg",
  },
  {
    id: 2,
    title: "Golden Fields",
    category: "Agriculture",
    description: "Vast agricultural lands during harvest season",
    image: "/rural-village-agricultural-fields-harvest.jpg",
  },
  {
    id: 3,
    title: "Traditional Pottery",
    category: "Culture",
    description: "Artisans creating traditional pottery and crafts",
    image: "/traditional-indian-pottery-crafts.jpg",
  },
  {
    id: 4,
    title: "Festival Lights",
    category: "Events",
    description: "Diwali and festival celebrations lighting up the village",
    image: "/indian-festival-diwali-lights-celebration.jpg",
  },
  {
    id: 5,
    title: "Village Market",
    category: "Community",
    description: "Traditional weekly village market and gathering place",
    image: "/traditional-indian-village-market.jpg",
  },
  {
    id: 6,
    title: "Sacred Rituals",
    category: "Heritage",
    description: "Daily religious rituals and spiritual ceremonies",
    image: "/hindu-temple-religious-rituals-ceremony.jpg",
  },
  {
    id: 7,
    title: "Village Streets",
    category: "Community",
    description: "Charming pathways and architecture of the village",
    image: "/rural-village-streets-traditional-houses.jpg",
  },
  {
    id: 8,
    title: "Seasonal Farming",
    category: "Agriculture",
    description: "Traditional farming practices throughout the seasons",
    image: "/traditional-farming-village-agriculture-seasons.jpg",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Heritage",
    "Agriculture",
    "Culture",
    "Events",
    "Community",
  ];

  const filteredImages =
    selectedCategory === "All"
      ? allGalleryImages
      : allGalleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="bg-white">
     
      <main className="min-h-screen bg-gradient-to-b from-white to-amber-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-amber-900 mb-4">
              Sirivaram Gallery
            </h1>
            <p className="text-xl text-gray-600">
              Explore the rich cultural heritage and natural beauty of our
              village
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? "bg-amber-700 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-amber-900">
                      {image.title}
                    </h3>
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No images found for this category
              </p>
            </div>
          )}
        </div>
      </main>

     
    </div>
  );
}
