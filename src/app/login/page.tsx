"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { AlertCircle, CheckCircle } from "lucide-react";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });

  const validateForm = (): boolean => {
    let isValid = true;
    const errors = { username: "", password: "" };

    if (!username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => setRedirecting(true), 1000);
        setTimeout(() => router.push(callbackUrl), 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsSuccess(false);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear error message when user types
  useEffect(() => {
    setFormErrors({ username: "", password: "" });
  }, [username, password]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full mx-4">
        {redirecting ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <CircularProgress size={32} color="inherit" />
            <p className="text-gray-600 mt-4 text-center">
              Redirecting to dashboard...
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
              Admin Login
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Enter your credentials to access the dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.username ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your username"
                  data-testid="username-input"
                />
                {formErrors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.username}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  data-testid="password-input"
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md font-semibold hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
                data-testid="login-button"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <CircularProgress size={24} color="inherit" />
                    <span className="ml-2">Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {message && (
              <div
                className={`mt-6 p-3 rounded-md flex items-center transition duration-300 ${
                  isSuccess
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle size={20} className="mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                )}
                <p>{message}</p>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Default login: admin / adminPassword123</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
