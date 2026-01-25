"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const API_URL = "https://sirivaram-backed.onrender.com/api/auth/register";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Generic change handler
  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    setError("");
    setSuccess("");
  };

  // Mobile: digits only, max 10
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: value }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const { name, mobile, password } = formData;

    if (!name.trim()) return "Please enter your full name";
    if (!mobile) return "Please enter your mobile number";
    if (mobile.length !== 10) return "Mobile number must be exactly 10 digits";
    if (!password) return "Please create a password";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        password: formData.password,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Registration failed. Please try again.",
        );
      }

      setSuccess(
        data?.message || "Registered successfully! Redirecting to login...",
      );
      setFormData({ name: "", mobile: "", password: "" });
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-amber-100">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-900">
              Sirivaram
            </h1>
            <p className="mt-1 text-gray-600 text-base">
              Create your account in seconds
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-5 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center text-sm font-medium">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange("name")}
                disabled={loading}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                autoFocus
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Enter 10-digit mobile"
                value={formData.mobile}
                onChange={handleMobileChange}
                disabled={loading}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
              />
              <p className="mt-1.5 text-sm text-gray-500">
                {formData.mobile.length}/10 digits
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password (min 6 chars)"
                  value={formData.password}
                  onChange={handleChange("password")}
                  disabled={loading}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent pr-12 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-amber-700 text-xl"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  disabled={loading}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent pr-12 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-amber-700 text-xl"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                loading
                  ? "bg-amber-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <LoadingOutlined spin />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-amber-700 hover:text-amber-800 hover:underline transition"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
}
