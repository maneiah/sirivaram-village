import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function GetInTouchSimple() {
  const location = useLocation();

  const initialForm = useMemo(
    () => ({ name: "", email: "", subject: "", message: "" }),
    [],
  );

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Auto-scroll when URL is "/#contact"
  useEffect(() => {
    if (location.hash !== "#contact") return;

    const el = document.querySelector("#contact");
    if (!el) return;

    setTimeout(() => {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  }, [location.hash]);

  const setField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // ✅ remove error while typing
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const validate = () => {
    const newErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email";
    if (!subject) newErrors.subject = "Subject is required";
    if (message.length < 5)
      newErrors.message = "Message must be at least 5 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseData(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // ✅ Mock API response (replace with real API later)
      await new Promise((r) => setTimeout(r, 700));

      const apiResponse = {
        status: true,
        message: "Message sent successfully! We will contact you soon.",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        data: formData,
      };

      setResponseData(apiResponse);
      setFormData(initialForm);
      setErrors({});
    } catch (err) {
      setResponseData({
        status: false,
        message: "Something went wrong. Please try again.",
      });
      setErrors(err.message || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Sirivaram Village"
      className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-amber-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
         

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-900">
            Get in touch with Sirivaram Village
          </h2>

          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            Have a question, feedback, or want to connect with the village
            community? Send a message and we’ll get back to you.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="bg-white/90 backdrop-blur p-7 md:p-8 rounded-2xl shadow-sm border border-amber-200">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-amber-800"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className={`w-full mt-1 bg-amber-50/60 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-400 ${
                      errors.name ? "border-red-400" : "border-amber-200"
                    }`}
                    value={formData.name}
                    onChange={(e) => setField("name", e.target.value)}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-amber-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className={`w-full mt-1 bg-amber-50/60 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-400 ${
                      errors.email ? "border-red-400" : "border-amber-200"
                    }`}
                    value={formData.email}
                    onChange={(e) => setField("email", e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-amber-800"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  className={`w-full mt-1 bg-amber-50/60 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-400 ${
                    errors.subject ? "border-red-400" : "border-amber-200"
                  }`}
                  value={formData.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                />
                {errors.subject && (
                  <p className="text-red-600 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-amber-800"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Write your message..."
                  rows={5}
                  className={`w-full mt-1 bg-amber-50/60 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-400 resize-none ${
                    errors.message ? "border-red-400" : "border-amber-200"
                  }`}
                  value={formData.message}
                  onChange={(e) => setField("message", e.target.value)}
                />
                {errors.message && (
                  <p className="text-red-600 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold shadow-sm transition ${
                  isSubmitting
                    ? "bg-amber-400 text-white cursor-not-allowed"
                    : "bg-amber-800 text-white hover:bg-amber-900"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {/* Response */}
              {responseData && (
                <div
                  className={`mt-4 p-4 rounded-xl border text-sm ${
                    responseData.status
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : "border-red-300 bg-red-50 text-red-900"
                  }`}
                >
                  <p className="font-semibold">
                    {responseData.status ? "✅ Success" : "⚠️ Error"}
                  </p>
                  <p className="mt-1">{responseData.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right: Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-amber-200 bg-white">
            <div className="h-[320px] sm:h-[380px] lg:h-full">
              <iframe
                title="Sirivaram Village Map"
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.6153209192997!2d79.2524203!3d14.3333207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb33138ba7d259f%3A0x1be9a432970e93d3!2sSirivaram%2C%20Andhra%20Pradesh%20516127!5e0!3m2!1sen!2sin!4v1700000000000"
              />
            </div>
          </div>
        </div>

        {/* Optional small footer info */}
        <div className="text-center mt-10 text-sm text-gray-600">
          Prefer WhatsApp or Phone? You can add contact details here later.
        </div>
      </div>
    </section>
  );
}
