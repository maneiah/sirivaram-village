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

  const themeColor = "#008cba"; // ONE COLOR USED EVERYWHERE

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
      <section id="contact" className="pt-20 bg-white">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
          <h2
            className="text-3xl font-bold text-center mb-6 text-amber-800"
         
          >
            Get in touch
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-amber-700" >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2"
                  style={{
                    borderColor: themeColor,
                    focusRingColor: themeColor,
                  }}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="font-semibold text-amber-700" >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2"
                  style={{
                    borderColor: themeColor,
                    focusRingColor: themeColor,
                  }}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="font-semibold text-amber-700" >
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2"
                style={{ borderColor: themeColor }}
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
              {errors.subject && (
                <p className="text-red-600 text-sm">{errors.subject}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="font-semibold text-amber-700">
                Message
              </label>
              <textarea
                placeholder="Your message"
                rows="5"
                className="w-full bg-gray-100 p-3 rounded mt-1 outline-none focus:ring-2"
                style={{ borderColor: themeColor }}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 rounded bg-amber-700 text-white rounded-lg  text-white font-semibold"
                // style={{ backgroundColor: themeColor }}
              >
                Send Message
              </button>
            </div>
          </form>

          {responseData && (
            <div
              className="mt-6 p-4 rounded"
              style={{
                border: `1px solid ${themeColor}`,
                backgroundColor: "#e6f7fb",
              }}
            >
              <h3 className="font-bold" style={{ color: themeColor }}>
                Response Received:
              </h3>
              <pre className="text-sm mt-2 text-gray-800">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>
    );
}
