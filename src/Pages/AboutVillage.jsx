"use client";

import { Link } from "react-router-dom";

export default function AboutVillage() {
  const villageCards = [
    {
      title: "Ancient Shiva Temple",
      description:
        "A 500-year-old temple dedicated to Lord Shiva, featuring intricate stone carvings and spiritual importance.",
      icon: "🏛️",
    },
    {
      title: "Agricultural Heritage",
      description:
        "Sirivaram is known for its rich agricultural traditions and organic farming practices passed down through generations.",
      icon: "🌾",
    },
    {
      title: "Cultural Festivals",
      description:
        "Experience vibrant festivals like Shivaratri, Diwali, and Makar Sankranti celebrated with traditional rituals.",
      icon: "🎉",
    },
    {
      title: "Local Craftsmanship",
      description:
        "Discover traditional handicrafts, pottery, and weaving that showcase the artistic skills of local artisans.",
      icon: "🎨",
    },
    {
      title: "Spiritual Practices",
      description:
        "Learn about meditation, yoga, and ancient spiritual practices rooted in Hindu traditions.",
      icon: "🧘",
    },
    {
      title: "Community Service",
      description:
        "Sirivaram's community is dedicated to social welfare, education, and cultural preservation initiatives.",
      icon: "❤️",
    },
    {
      title: "Natural Beauty",
      description:
        "Surrounded by lush greenery, scenic landscapes, and serene water bodies perfect for nature lovers.",
      icon: "🌿",
    },
    {
      title: "Heritage Conservation",
      description:
        "Active efforts in preserving historical structures, traditions, and the village's cultural identity.",
      icon: "🏺",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            Discover Sirivaram
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive look at the heritage, culture, and traditions of our
            beautiful village.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {villageCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{card.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </div>
  );
}
