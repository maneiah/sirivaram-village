// src/components/Blog.jsx
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    <section id="blog" className="bg-white py-16">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        {/* Heading + CTA */}
        <div className="flex flex-col gap-4 mb-10 text-center md:mx-auto max-w-2xl">
          <h2 className="mb-2 text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-amber-900">
            Stories from Sirivaram
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Read short stories, memories, and highlights about the village,
            temple events, and community life.
          </p>

          {/* Optional CTA like modern websites */}
          <div className="flex justify-center gap-3 mt-2">
            <Link
              to="/blogs"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-colors"
            >
              View All Blogs
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {/* Card 1 */}
          <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-2xl shadow-sm border border-amber-100">
            <img
              src="https://lepakshitemple.in/wp-content/uploads/2023/10/lepakshi-nandi-basavanna.webp"
              className="object-cover w-full h-64"
              alt="Temple and heritage"
              loading="lazy"
            />
            <div className="p-5 border-t border-amber-50">
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase text-amber-700">
                Temple & Heritage
                <span className="text-gray-500 ml-1">— 28 Dec 2024</span>
              </p>
              <h3 className="inline-block mb-3 text-2xl font-bold leading-6 text-amber-900">
                Morning Darshan in Sirivaram
              </h3>
              <p className="mb-4 text-sm text-gray-700 leading-relaxed">
                Experience the calm and divine atmosphere as the first rays of
                sunlight touch the temple gopuram and bells start ringing.
              </p>

              {/* ✅ Use navigate (no reload) */}
              <button
                onClick={() => navigate("/blogs")}
                className="inline-flex items-center font-semibold text-sm text-amber-700 hover:text-amber-800"
              >
                Read more
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-2xl shadow-sm border border-amber-100">
            <img
              src="https://i.pinimg.com/736x/5c/4c/21/5c4c21f0d0240f4039c1f2d42e94eb6d.jpg"
              className="object-cover w-full h-64"
              alt="Fields and nature"
              loading="lazy"
            />
            <div className="p-5 border-t border-amber-50">
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase text-amber-700">
                Village Life
                <span className="text-gray-500 ml-1">— 05 Jan 2025</span>
              </p>
              <h3 className="inline-block mb-3 text-2xl font-bold leading-6 text-amber-900">
                Evenings in the Fields
              </h3>
              <p className="mb-4 text-sm text-gray-700 leading-relaxed">
                Gentle breeze, golden crops and children playing along the
                village paths – Sirivaram’s evenings are simple, yet beautiful.
              </p>

              <button
                onClick={() => navigate("/blogs")}
                className="inline-flex items-center font-semibold text-sm text-amber-700 hover:text-amber-800"
              >
                Read more
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-2xl shadow-sm border border-amber-100">
            <img
              src="https://discovery.sndimg.com/content/dam/images/discovery/fullset/2020/11/10/GettyImages-619276504.jpg.rend.hgtvcom.1280.960.suffix/1605080589671.jpeg"
              className="object-cover w-full h-64"
              alt="Festival celebration"
              loading="lazy"
            />
            <div className="p-5 border-t border-amber-50">
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase text-amber-700">
                Festivals
                <span className="text-gray-500 ml-1">— 14 Jan 2025</span>
              </p>
              <h3 className="inline-block mb-3 text-2xl font-bold leading-6 text-amber-900">
                Festival Nights & Lights
              </h3>
              <p className="mb-4 text-sm text-gray-700 leading-relaxed">
                When the village lights up with lamps, music and devotion, every
                street becomes part of the celebration.
              </p>

              <button
                onClick={() => navigate("/blogs")}
                className="inline-flex items-center font-semibold text-sm text-amber-700 hover:text-amber-800"
              >
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
