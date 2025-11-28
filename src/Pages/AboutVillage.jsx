"use client";

import { Link } from "react-router-dom";

export default function AboutVillage() {
  const villageCards = [
    {
      title: "Ancient Shiva Temple",
      description:
        "Sirivaram’s famous Lord Shiva Temple is over 500 years old, known for its spiritual importance, stone architecture, and heritage value.",
      icon: "🛕",
    },
    {
      title: "Agricultural Heritage",
      description:
        "Located in Kadapa District, Sirivaram is known for rice, groundnut, and redgram farming with traditional irrigation methods.",
      icon: "🌾",
    },
    {
      title: "Cultural Festivals",
      description:
        "Shivaratri, Ugadi, Sankranti, and Deepawali are celebrated grandly with community gatherings, rituals, and traditional games.",
      icon: "🎉",
    },
    {
      title: "Local Panchayathi",
      description:
        "Sirivaram comes under Kodur Panchayathi in Penagalur Mandal, ensuring local governance, development programs, and welfare activities.",
      icon: "🏢",
    },
    {
      title: "Spiritual Practices",
      description:
        "Daily poojas, bhajans, meditation gatherings, and yearly temple festivals keep spiritual traditions alive in the village.",
      icon: "🧘",
    },
    {
      title: "Village Community",
      description:
        "A peaceful and united community that participates in welfare activities, temple celebrations, and cultural preservation.",
      icon: "🤝",
    },
    {
      title: "Natural Beauty",
      description:
        "Surrounded by greenery, farmland, and scenic hill views — the village offers a calm and refreshing environment.",
      icon: "🌿",
    },
    {
      title: "Location Advantage",
      description:
        "Sirivaram is located near Rajampet town, making it easily accessible while retaining its traditional rural charm.",
      icon: "📍",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            Discover Sirivaram Village
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sirivaram Village, located in <strong>Penagalur Mandal</strong>,
            <strong> Kadapa District</strong>, under{" "}
            <strong>Kodur Panchayathi</strong>, is known for its ancient
            temples, rich agriculture, spiritual traditions, and strong cultural
            heritage. The village is also conveniently located near{" "}
            <strong>Rajampet town</strong>.
          </p>
        </div>

        {/* Cards Section */}
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
