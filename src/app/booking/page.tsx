"use client";

import React, { useState } from "react";
import Image from "next/image";

const img1 = "/images/pic1.jpg";
const img2 = "/images/pic2.jpg";
const img3 = "/images/pic3.jpg";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  details: string;
}

const events: Event[] = [
  {
    id: 7,
    title: "Basketball Championship",
    description: "Watch thrilling basketball action live.",
    date: "2025-08-10",
    location: "New York, USA",
    category: "Sports",
    image: img1,
    details:
      "The championship features the best teams competing for the title. Get ready for an action-packed day!",
  },
  {
    id: 8,
    title: "Soccer World Cup Screening",
    description: "Cheer for your favorite team in a lively atmosphere.",
    date: "2025-09-15",
    location: "Paris, France",
    category: "Sports",
    image: img2,
    details:
      "Join fans from around the world to watch the finals on a big screen. Food and beverages will be available.",
  },
  {
    id: 9,
    title: "Gaming Expo",
    description: "Discover the latest trends in gaming and technology.",
    date: "2025-10-05",
    location: "San Francisco, USA",
    category: "Technology",
    image: img3,
    details:
      "Experience cutting-edge gaming setups, meet developers, and enjoy exclusive previews of upcoming games.",
  },
];

const Bookings: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const handleEventSelect = (eventId: number) => {
    if (selectedEventId === eventId) {
      setSelectedEventId(null);
    } else {
      setSelectedEventId(eventId);
      setIsBooked(false);
    }
  };

  const handleBooking = (eventId: number) => {
    setIsBooked(true);
    alert(`Successfully booked for the event with ID: ${eventId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Event Bookings
      </h1>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {/* Event Card */}
            <div onClick={() => handleEventSelect(event.id)}>
              <Image
                src={event.image}
                alt={event.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm dark:text-gray-300">
                  {event.date} | {event.location}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {event.category}
                </p>
                <p className="text-gray-700 mt-2 dark:text-gray-300">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Event Details (Visible Only for Selected Event) */}
            {selectedEventId === event.id && (
              <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-b-lg">
                <p className="text-lg text-gray-700 dark:text-gray-100">
                  <strong>Details:</strong> {event.details}
                </p>
                {isBooked ? (
                  <p className="text-green-500 font-semibold mt-4">
                    You have successfully booked for this event!
                  </p>
                ) : (
                  <button
                    onClick={() => handleBooking(event.id)}
                    className="bg-green-500 text-white py-2 px-6 mt-4 rounded-lg shadow-md transition-colors hover:bg-green-600"
                  >
                    Book Now
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
