"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "info" | "warning" | "success" | "error";
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Event Registration",
    message: "You have successfully registered for the 'Gaming Expo 2025' event.",
    date: "2025-01-20",
    type: "success",
    isRead: false,
  },
  {
    id: 2,
    title: "Event Reminder",
    message: "Reminder: The 'Basketball Championship 2025' is coming up soon!",
    date: "2025-01-22",
    type: "info",
    isRead: false,
  },
  {
    id: 3,
    title: "Event Unregistration",
    message: "You have been unregistered from 'Esports Tournament 2024'.",
    date: "2025-01-18",
    type: "warning",
    isRead: true,
  },
  {
    id: 4,
    title: "New Feature Added",
    message: "We have added a new feature to your profile! Check it out now.",
    date: "2025-01-17",
    type: "success",
    isRead: false,
  },
  {
    id: 5,
    title: "Account Issue",
    message: "Your account has been temporarily suspended due to suspicious activity.",
    date: "2025-01-10",
    type: "error",
    isRead: true,
  },
  {
    id: 6,
    title: "Event Update",
    message: "The 'Yoga and Wellness Retreat' event location has been updated.",
    date: "2025-01-05",
    type: "info",
    isRead: true,
  },
];

const NotificationPage: React.FC = () => {
  const [notificationsData, setNotificationsData] = useState<Notification[]>(notifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleMarkAsRead = (id: number) => {
    const updatedNotifications = notificationsData.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    setNotificationsData(updatedNotifications);
  };

  const handleDeleteNotification = (id: number) => {
    const updatedNotifications = notificationsData.filter((notification) => notification.id !== id);
    setNotificationsData(updatedNotifications);
  };

  const handleSelectNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  const closeDetails = () => setSelectedNotification(null);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-screen-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Your Notifications</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Stay up-to-date with the latest events and updates.
          </p>
        </div>

        {/* Notification List */}
        <div className="space-y-6">
          {notificationsData.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">No notifications available.</p>
          ) : (
            notificationsData.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleSelectNotification(notification)}
                className={`cursor-pointer flex items-center justify-between p-5 rounded-lg shadow-lg transition-all duration-300 ${
                  notification.isRead
                    ? "bg-gray-50 dark:bg-gray-700 text-gray-500"
                    : notification.type === "success"
                    ? "bg-green-50 dark:bg-green-800 text-green-700 dark:text-green-300"
                    : notification.type === "error"
                    ? "bg-red-50 dark:bg-red-800 text-red-700 dark:text-red-300"
                    : notification.type === "warning"
                    ? "bg-yellow-50 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300"
                    : "bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
                }`}
              >
                <div className="flex flex-col space-y-2 w-4/5">
                  <h3 className="text-xl font-semibold">{notification.title}</h3>
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{notification.date}</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  {!notification.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                      className="bg-blue-600 text-white py-2 px-5 rounded-lg text-sm hover:bg-blue-500 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notification.id);
                    }}
                    className="bg-red-600 text-white py-2 px-5 rounded-lg text-sm hover:bg-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Notification Details Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={closeDetails}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              aria-label="Close Details"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {selectedNotification.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{selectedNotification.message}</p>
            <span className="text-xs text-gray-400 dark:text-gray-500">{selectedNotification.date}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
