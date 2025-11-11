"use client";

import { useState } from "react";
import { Link } from "react-router-dom";



export default function RegisterPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!mobileNumber || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // Handle registration logic here
    alert("Registration successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
  
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2 text-center">
            Join Sirivaram
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Create your account today
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                maxLength="10"
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-2 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-700 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
   
    </div>
  );
}
