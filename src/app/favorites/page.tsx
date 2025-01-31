"use client";

import React, { useState } from "react";
import { Heart, X } from "lucide-react";

// Favorite Event Card Component
const FavoriteEventCard = ({
  event,
  onRemove,
  onViewDetails,
}: {
  event: { title: string; description: string; date: string; image: string };
  onRemove: () => void;
  onViewDetails: () => void;
}) => {
  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden bg-white border border-gray-300 hover:shadow-xl transition-all transform hover:scale-105">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover rounded-t-lg cursor-pointer"
        onClick={onViewDetails} // Clicking on the image opens the details modal
      />
      <div className="p-4">
        <h3
          className="text-xl font-serif text-gray-800 cursor-pointer"
          onClick={onViewDetails} // Clicking the title opens the details modal
        >
          {event.title}
        </h3>
        <p className="text-base text-gray-600">{event.description}</p>
        <p className="text-sm text-gray-500">{event.date}</p>
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all"
          aria-label="Remove from favorites"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([
    {
      title: "Concert in the Park",
      description: "An amazing open-air concert with live bands and food trucks.",
      date: "February 15, 2025",
      image:
        "https://media.istockphoto.com/id/458119657/photo/tentertainment-music-festival-england.jpg?s=612x612&w=0&k=20&c=HeOd_zmNAS3QQptcZrypASP9eZgu-hQNKSY7SrC_3rw=",
    },
    {
      title: "Tech Conference 2025",
      description: "The biggest tech conference with the latest trends in the industry.",
      date: "March 5, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsbP1SjH7EkE1TXIwAcnjd0wZOTem0iIlysA&s",
    },
    {
      title: "Movie Night Under the Stars",
      description: "A cozy movie night with classic films, popcorn, and blankets.",
      date: "April 3, 2025",
      image:
        "https://liveheadwaters.com/wp-content/uploads/2018/11/movie-under-the-stars.jpg",
    },
    {
      title: "Charity Fun Run 2025",
      description: "Join us for a 5k run to support local charities.",
      date: "May 10, 2025",
      image:
        "https://images.squarespace-cdn.com/content/v1/5ec49b013663ea17f76bf531/1620267193015-01AUNGLIQS7PZSI4MTPM/Hero+Image+-+Smaller.png",
    },
    {
      title: "Food Festival Extravaganza",
      description: "Taste the best local and international dishes from top chefs.",
      date: "June 18, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlniVFd_dXLbpBlmBzUDFKTwIIbH8vNI2r1w&s",
    },
  ]);

  const [selectedFavorite, setSelectedFavorite] = useState<any | null>(null); // State for modal

  // Remove event from favorites list
  const handleEventRemove = (eventTitle: string) => {
    setFavorites(favorites.filter((event) => event.title !== eventTitle));
  };

  // Handle showing event details in modal
  const handleViewDetails = (event: any) => {
    setSelectedFavorite(event);
  };

  const handleModalClose = () => {
    setSelectedFavorite(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif text-center text-gray-800 mb-12">
          Your Favorite Events
        </h1>

        {/* Favorites List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="text-xl text-gray-600">
                No favorite events yet. Add some events!
              </p>
            </div>
          ) : (
            favorites.map((event) => (
              <FavoriteEventCard
                key={event.title}
                event={event}
                onRemove={() => handleEventRemove(event.title)} // Removes event from favorites
                onViewDetails={() => handleViewDetails(event)} // Opens modal for event details
              />
            ))
          )}
        </div>

        {/* Favorite Item Modal */}
        {selectedFavorite && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
                <h2 className="text-2xl font-serif text-blue-900 dark:text-blue-300">
                  {selectedFavorite.title}
                </h2>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  onClick={handleModalClose} // Close modal
                >
                  <X size={24} />
                </button>
              </div>
              <img
                src={selectedFavorite.image}
                alt={selectedFavorite.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedFavorite.description}
                </p>
                <button className="mt-5 px-6 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
