"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://sirivaram-backed.onrender.com/api/auth/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // ✅ Only digits for mobile (blocks characters)
  const handleMobileChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-digits
    const limited = onlyDigits.slice(0, 10); // limit to 10 digits
    setMobile(limited);
    setError("");
    setInfo("");
  };

  const validate = () => {
    if (!mobile || !password) return "Please fill in all fields";
    if (mobile.trim().length !== 10)
      return "Please enter a valid 10-digit mobile number";
    return "";
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setInfo("");

  const v = validate();
  if (v) {
    setError(v);
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobile.trim(),
        password,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || data?.success === false) {
      setError(data?.message || "Login failed");
      return;
    }

    // ✅ SAVE USER DATA
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);
    localStorage.setItem("mobile", data.mobile);
    localStorage.setItem("status", data.status);

    setInfo("Login successful! Redirecting...");
    setMobile("");
    setPassword("");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  } catch (err) {
    setError(err.message || "Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Login to your Sirivaram account
          </p>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* INFO */}
          {info && (
            <div className="bg-blue-50 border border-blue-300 text-blue-700 px-4 py-3 rounded mb-4">
              {info}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter 10-digit number"
                value={mobile}
                onChange={handleMobileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                    setInfo("");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                loading
                  ? "bg-amber-400 cursor-not-allowed text-white"
                  : "bg-amber-700 hover:bg-amber-800 text-white"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-amber-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
