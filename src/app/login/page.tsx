"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setLoading(false);

    if (data.success) {
      setIsSuccess(true);
      setMessage("Login successful!");
      router.push("/");
    } else {
      setIsSuccess(false);
      setMessage(data.message || "Login failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome Back Admin!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your username and password to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md font-semibold hover:from-green-600 hover:to-green-700 transition duration-300 transform hover:scale-105"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center transition duration-300 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
