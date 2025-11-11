"use client";
import { Link } from "react-router-dom";
const galleryImages = [
  {
    id: 1,
    title: "Temple Architecture",
    category: "Heritage",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixels.com%2Ffeatured%2Fvillage-scene-in-warli-tribal-art-jey-manokaran.html%3Fproduct%3Dgreeting-card%26srsltid%3DAfmBOoqjVFVZe10XLBd9aUKbJ_hvOTFJreuUXdi5YYp237gkq7a1M988&psig=AOvVaw28kp5L58gV47Bwax0AM6b8&ust=1762968396048000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDbrZ3P6pADFQAAAAAdAAAAABAE",
  },
  {
    id: 2,
    title: "Village Fields",
    category: "Agriculture",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixels.com%2Ffeatured%2Fvillage-scene-in-warli-tribal-art-jey-manokaran.html%3Fproduct%3Dgreeting-card%26srsltid%3DAfmBOoqjVFVZe10XLBd9aUKbJ_hvOTFJreuUXdi5YYp237gkq7a1M988&psig=AOvVaw28kp5L58gV47Bwax0AM6b8&ust=1762968396048000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDbrZ3P6pADFQAAAAAdAAAAABAE",
  },
  {
    id: 3,
    title: "Traditional Arts",
    category: "Culture",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixels.com%2Ffeatured%2Fvillage-scene-in-warli-tribal-art-jey-manokaran.html%3Fproduct%3Dgreeting-card%26srsltid%3DAfmBOoqjVFVZe10XLBd9aUKbJ_hvOTFJreuUXdi5YYp237gkq7a1M988&psig=AOvVaw28kp5L58gV47Bwax0AM6b8&ust=1762968396048000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDbrZ3P6pADFQAAAAAdAAAAABAE",
  },
  {
    id: 4,
    title: "Festival Celebration",
    category: "Events",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FSamriddhi-Bullock-Cart-Village-Picture%2Fdp%2FB0D9NZWJKT&psig=AOvVaw28kp5L58gV47Bwax0AM6b8&ust=1762968396048000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDbrZ3P6pADFQAAAAAdAAAAABAp",
  },
  {
    id: 5,
    title: "Morning Prayers",
    category: "Spiritual Life",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_eVEl-hIPIM1GwGkRZMT4N9RLXmTWiyuNSA&s",
  },
  {
    id: 6,
    title: "Local Market",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1594040229653-c3d8f6c1225e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    title: "Cultural Dance",
    category: "Festivals",
    image:
      "https://images.unsplash.com/photo-1589187151053-5ec8818e6613?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    title: "Sunset Over Fields",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1616249980459-08d3b1f8893e?auto=format&fit=crop&w=900&q=80",
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
