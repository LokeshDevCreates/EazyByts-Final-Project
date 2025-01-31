"use client"; 

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // If the user is not logged in, redirect to the login page
      router.push("/login");
    }
  }, [router]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("auth_token");
    router.push("/login"); // Redirect to the login page after logging out
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Are you sure you want to log out?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          You will be logged out of your account and your session will be ended.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleLogOut}
            className="w-full py-3 px-6 bg-red-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-red-700 transition duration-300"
          >
            Yes, Log Out
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 px-6 bg-gray-300 text-gray-800 text-lg font-semibold rounded-xl shadow-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutPage;
