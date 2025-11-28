import React, { useState } from "react";

export default function GetInTouchSimple() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [responseData, setResponseData] = useState(null);

  const validate = () => {
    let newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!/^\S+@\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.subject.trim().length === 0) {
      newErrors.subject = "Subject is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const apiResponse = {
      status: true,
      message: "Message sent successfully!",
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      data: formData,
    };

    setResponseData(apiResponse);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Sirivaram Village"
      className="w-full bg-white py-16 px-4"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Left: Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200">
          <h2 className="text-3xl font-bold text-center mb-6 text-amber-800">
            Get in touch with Sirivaram Village
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="font-semibold text-amber-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="font-semibold text-amber-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-amber-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="subject" className="font-semibold text-amber-700">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Subject"
                className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-amber-500"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              />
              {errors.subject && (
                <p className="text-red-600 text-sm">{errors.subject}</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="font-semibold text-amber-700">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                rows="5"
                className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-amber-500"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg shadow-md transition-all"
              >
                Send Message
              </button>
            </div>
          </form>

          {responseData && (
            <div className="mt-6 p-4 rounded border border-amber-500 bg-amber-50">
              <h3 className="font-bold text-amber-700">Response Received:</h3>
              <p className="text-sm mt-2 text-gray-800">
                {responseData.message}
              </p>
            </div>
          )}
        </div>

        {/* Right: Google Map */}
        <div className="w-full h-[350px] md:h-[450px] lg:h-full rounded-xl overflow-hidden shadow-lg border border-amber-200">
          <iframe
            title="Sirivaram Village Map"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.6153209192997!2d79.2524203!3d14.3333207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb33138ba7d259f%3A0x1be9a432970e93d3!2sSirivaram%2C%20Andhra%20Pradesh%20516127!5e0!3m2!1sen!2sin!4v1700000000000"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
