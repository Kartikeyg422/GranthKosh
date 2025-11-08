import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Get the previous location or default to home
  const from = location.state?.from?.pathname || "/";

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      // Redirect based on role
      if (userData.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignIn) {
        // Sign in
        if (!formData.email || !formData.password) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        const response = await authAPI.login(formData.email, formData.password);
        
        // Store token and user data
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        
        const userData = {
          id: response.user?._id || response.user?.id,
          email: response.user?.email || formData.email,
          name: response.user?.name || response.user?.fullName || "",
          role: response.user?.role || "user",
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Dispatch custom event to update Header
        window.dispatchEvent(new Event("userLogin"));

        // Redirect based on role
        if (userData.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        // Register
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }

        const response = await authAPI.register({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        // Store token and user data
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        
        const userData = {
          id: response.user?._id || response.user?.id,
          email: response.user?.email || formData.email,
          name: response.user?.name || formData.fullName,
          role: response.user?.role || "user",
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Dispatch custom event to update Header
        window.dispatchEvent(new Event("userLogin"));

        // Redirect based on role
        if (userData.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center px-4 font-[Work_Sans]">
      {/* Header */}
      <header className="absolute top-6 left-8 flex items-center gap-2">
        <span className="text-yellow-600 text-3xl font-bold">📘</span>
        <h1 className="text-2xl font-bold text-gray-900">GranthKosh</h1>
      </header>

      {/* Auth Container */}
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-sm border border-gray-200 mt-12">
        {/* Welcome Text */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Welcome to GranthKosh
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Your next chapter awaits. {isSignIn ? "Sign in" : "Create an account"} to continue.
        </p>

        {/* Tabs */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setIsSignIn(true)}
            className={`w-1/2 py-3 font-semibold transition ${
              isSignIn
                ? "bg-yellow-500 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`w-1/2 py-3 font-semibold transition ${
              !isSignIn
                ? "bg-yellow-500 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter Name Here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required={!isSignIn}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {isSignIn && (
                <a
                  href="#"
                  className="text-sm text-yellow-600 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required={!isSignIn}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Please wait..." : isSignIn ? "Sign in" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social Logins */}
        <div className="flex justify-center gap-4">
          <button
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
          </button>
          <button
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
          </button>
          <button
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
