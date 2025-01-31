"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter hook from next/navigation

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  // Check if the user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make a request to the backend API for login validation
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store user information in localStorage (if needed)
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to the dashboard on successful login
        router.push("/dashboard");
      } else {
        // Handle errors from the backend (e.g., invalid credentials)
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const navigateToSignup = () => {
    router.push("/signup"); // Redirect to the signup page
  };

  const handleLogout = () => {
    // If the user is on the login page, prevent logout from triggering
    localStorage.removeItem("user");
    sessionStorage.removeItem("auth_token");
    router.push("/login"); // Just in case, redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h2>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <button
              onClick={navigateToSignup}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Logout Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Log Out (if already logged in)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
