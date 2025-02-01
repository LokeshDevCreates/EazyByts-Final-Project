"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Menu, Moon, Sun, Bell } from "lucide-react";
import img from "../../../../public/images/eazylogo.jpg";

const NotificationButton = ({
  onClick,
  notificationCount = 0,
}: {
  onClick: () => void;
  notificationCount?: number;
}) => {
  return (
    <div
      className="relative inline-flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all shadow-md"
      onClick={onClick}
      aria-label="Notifications"
    >
      <Bell className="w-6 h-6 text-gray-700" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 text-xs font-semibold text-white bg-red-500 rounded-full -mr-1 -mt-1">
          {notificationCount > 9 ? "9+" : notificationCount}
        </span>
      )}
    </div>
  );
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const router = useRouter();

  const handleNotificationClick = () => {
    router.push("/notifications");
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* Left Side */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <NotificationButton
            onClick={handleNotificationClick}
            notificationCount={5}
          />

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />

          <div className="flex items-center w-20 h-20 cursor-pointer rounded-full">
            <Image
              src={img}
              alt="My Logo"
              width={80}
              height={80}
              className="object-cover rounded-full"
            />
          </div>
          <span className="font-semibold text-3xl">EazyByts</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
