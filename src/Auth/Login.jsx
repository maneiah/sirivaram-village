"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const API_URL = "https://sirivaram-backed.onrender.com/api/auth/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Mobile input: only digits, max 10
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!mobile || !password) return "Please fill in all fields";
    if (mobile.length !== 10) return "Mobile number must be exactly 10 digits";
    return "";
  };

  const handleLogin = async (e) => {
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

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          mobile: mobile.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data?.success === false) {
        throw new Error(
          data?.message || "Login failed. Please check your credentials.",
        );
      }

      // Save user data to localStorage
      localStorage.setItem("token", data.token || "");
      localStorage.setItem("userId", data.userId || "");
      localStorage.setItem("name", data.name || "");
      localStorage.setItem("role", data.role || "");
      localStorage.setItem("mobile", data.mobile || "");
      localStorage.setItem("status", data.status || "");

      setSuccess("Login successful! Redirecting...");
      setMobile("");
      setPassword("");

      // Smooth redirect after brief success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message || "Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-amber-100">
          {/* Logo / Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-900">
              Sirivaram
            </h1>
            <p className="mt-2 text-lg text-amber-700 font-medium">
              Welcome Back
            </p>
            <p className="mt-1 text-gray-600">
              Sign in to continue to your account
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center font-medium">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Enter 10-digit mobile"
                value={mobile}
                onChange={handleMobileChange}
                disabled={loading}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                autoFocus
              />
              <p className="mt-2 text-sm text-gray-500">
                {mobile.length}/10 digits
              </p>
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
                    setSuccess("");
                  }}
                  disabled={loading}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent pr-12 transition"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                loading
                  ? "bg-amber-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <LoadingOutlined spin />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New to Sirivaram?{" "}
              <Link
                to="/register"
                className="font-semibold text-amber-700 hover:text-amber-800 hover:underline transition"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
}
