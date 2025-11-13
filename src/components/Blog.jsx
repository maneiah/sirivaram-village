// src/components/Blog.jsx
import React from "react";

export const Blog = () => {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {/* Heading */}
        <div className="max-w-xl mb-10 md:mx-auto text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-amber-900">
            Stories from Sirivaram
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Read short stories, memories, and highlights about the village,
            temple events, and community life.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {/* Card 1 */}
          <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-2xl shadow-sm border border-amber-100">
            <img
              src="https://images.pexels.com/photos/208485/pexels-photo-208485.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="object-cover w-full h-64"
              alt="Temple and heritage"
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
              <button className="inline-flex items-center font-semibold text-sm text-amber-700 hover:text-amber-800">
                Read more
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-2xl shadow-sm border border-amber-100">
            <img
              src="https://images.pexels.com/photos/208485/pexels-photo-208485.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="object-cover w-full h-64"
              alt="Fields and nature"
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
              <button className="inline-flex items-center font-semibold text-sm text-amber-700 hover:text-amber-800">
                Read more
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-2xl shadow-sm border border-amber-100">
            <img
              src="https://images.pexels.com/photos/1661900/pexels-photo-1661900.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="object-cover w-full h-64"
              alt="Festival celebration"
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
              <button className="inline-flex items-center font-semibold text-sm text-amber-700 hover:text-amber-800">
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
