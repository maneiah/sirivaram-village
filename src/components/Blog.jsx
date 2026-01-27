// src/components/Blog.jsx
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/* -------------------- Blog Data -------------------- */
const BLOGS = [
  {
    id: 1,
    category: "Temple & Heritage",
    date: "28 Dec 2024",
    title: "Morning Darshan in Sirivaram",
    excerpt:
      "Experience the calm and divine atmosphere as the first rays of sunlight touch the temple gopuram and bells start ringing.",
    image:
      "https://lepakshitemple.in/wp-content/uploads/2023/10/lepakshi-nandi-basavanna.webp",
  },
  {
    id: 2,
    category: "Village Life",
    date: "05 Jan 2025",
    title: "Evenings in the Fields",
    excerpt:
      "Gentle breeze, golden crops and children playing along the village paths – Sirivaram’s evenings are simple, yet beautiful.",
    image:
      "https://i.pinimg.com/736x/5c/4c/21/5c4c21f0d0240f4039c1f2d42e94eb6d.jpg",
  },
  {
    id: 3,
    category: "Festivals",
    date: "14 Jan 2025",
    title: "Festival Nights & Lights",
    excerpt:
      "When the village lights up with lamps, music and devotion, every street becomes part of the celebration.",
    image:
      "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2020/11/10/GettyImages-619276504.jpg.rend.hgtvcom.1280.960.suffix/1605080589671.jpeg",
  },
];

export const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Auto-scroll when URL is "/#blog"
  useEffect(() => {
    if (location.hash !== "#blog") return;

    const el = document.querySelector("#blog");
    if (!el) return;

    setTimeout(() => {
      const yOffset = -90; // header offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  }, [location.hash]);

  return (
    <section
      id="blog"
      className="py-16 md:py-20 bg-gradient-to-b from-white via-amber-50 to-white"
      aria-labelledby="blog-heading"
    >
      <div className="px-4 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
        

          <h2
            id="blog-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-900"
          >
            Stories from Sirivaram
          </h2>

          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            Read short stories, memories, and highlights about village life,
            temple events, and cultural celebrations.
          </p>

          <div className="mt-6">
            <Link
              to="/blogs"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-amber-800 text-white font-semibold hover:bg-amber-900 transition shadow-sm"
            >
              View All Blogs
            </Link>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOGS.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-2">
                  {blog.category}
                  <span className="text-gray-500 ml-1">— {blog.date}</span>
                </p>

                <h3 className="text-xl font-extrabold text-amber-900 mb-3 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed mb-5">
                  {blog.excerpt}
                </p>

                <button
                  onClick={() => navigate("/blogs")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900 transition"
                  aria-label={`Read more about ${blog.title}`}
                >
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
