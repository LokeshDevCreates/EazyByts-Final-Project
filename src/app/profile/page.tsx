"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Example user data
interface User {
  name: string;
  email: string;
  profilePicture: string;
  bio: string;
  upcomingEvents: string[];
  pastEvents: string[];
  activity: string[];
}

const user: User = {
  name: "Lokesh",
  email: "lokil3832@gmail.com",
  profilePicture:
    "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
  bio: "Event enthusiast, loves to attend tech conferences and gaming expos!",
  upcomingEvents: ["Gaming Expo 2025", "Basketball Championship 2025"],
  pastEvents: ["Esports Tournament 2024", "Yoga and Wellness Retreat 2024"],
  activity: ["Commented on 'Gaming Expo 2025' event", "Registered for 'Basketball Championship 2025'"],
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedBio, setUpdatedBio] = useState(user.bio);
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedBio(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedEmail(event.target.value);
  };

  const handleSaveChanges = () => {
    setIsUpdating(true);
    setTimeout(() => {
      user.bio = updatedBio;
      user.name = updatedName;
      user.email = updatedEmail;
      setIsUpdating(false);
      setIsEditMode(false);
      alert("Profile updated successfully!");
    }, 1500);
  };

  const handleEventUnregister = (event: string) => {
    user.upcomingEvents = user.upcomingEvents.filter((e) => e !== event);
    alert(`You have unregistered from the event: ${event}`);
  };

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-screen-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
        {/* Profile Header */}
        <div className="flex items-center mb-8 space-x-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">{updatedName}</h1>
            <p className="text-gray-600 dark:text-gray-300">{updatedEmail}</p>
            <button
              onClick={handleEditToggle}
              className="text-blue-500 hover:underline mt-2"
            >
              {isEditMode ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Editable Profile Section */}
        {isEditMode && (
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm space-y-4 mb-8">
            <div>
              <label className="text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                value={updatedName}
                onChange={handleNameChange}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={updatedEmail}
                onChange={handleEmailChange}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-300">Bio</label>
              <textarea
                value={updatedBio}
                onChange={handleBioChange}
                rows={4}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                disabled={isUpdating}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Bio Section */}
        {!isEditMode && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Bio</h2>
            <p className="text-gray-600 dark:text-gray-300">{updatedBio}</p>
          </div>
        )}

        {/* Activity Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
          <ul className="list-disc ml-6 mt-4 text-gray-700 dark:text-gray-300">
            {user.activity.length > 0 ? (
              user.activity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))
            ) : (
              <p>No recent activity</p>
            )}
          </ul>
        </div>

        {/* Events Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Upcoming Events</h2>
          <div className="space-y-4">
            {user.upcomingEvents.length > 0 ? (
              user.upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-gray-700 dark:text-gray-300">{event}</span>
                  <button
                    onClick={() => handleEventUnregister(event)}
                    className="text-red-500 hover:underline"
                  >
                    Unregister
                  </button>
                </div>
              ))
            ) : (
              <p>No upcoming events</p>
            )}
          </div>
        </div>

        {/* Past Events Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Past Events</h2>
          <div className="space-y-4">
            {user.pastEvents.length > 0 ? (
              user.pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-gray-700 dark:text-gray-300">{event}</span>
                </div>
              ))
            ) : (
              <p>No past events</p>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
