"use client";
import React, { useState, useEffect } from "react";
import { Search, Calendar, MapPin, X } from "lucide-react";
import Image from "next/image"; // Import Image from Next.js
import "tailwindcss/tailwind.css";

const img1 = "/images/pic4.jpg";
const img2 = "/images/pic5.jpg";
const img3 = "/images/pic6.jpg";
const img4 = "/images/pic7.jpg";
const img5 = "/images/pic8.jpg";
const img6 = "/images/pic9.jpg";
const img7 = "/images/pic1.jpg";
const img8 = "/images/pic2.jpg";
const img9 = "/images/pic3.jpg";
const img10 = "/images/pic10.jpg";
const img11 = "/images/pic11.jpg";
const img12 = "/images/pic12.jpg";
const img13 = "/images/pic13.jpg";
const img14 = "/images/pic14.jpg";
const img15 = "/images/pic15.jpg";

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

const EventsPage: React.FC = () => {
  const mockEvents: Event[] = [
    {
      id: 1,
      title: "Music Concert",
      description: "Enjoy an evening of live music by top artists.",
      date: "2025-02-15",
      location: "New York, USA",
      category: "Music",
      image: img1,
      details: "This concert features performances by world-renowned musicians. Tickets include access to the VIP lounge and refreshments.",
    },
    {
      id: 2,
      title: "Art Exhibition",
      description: "Explore breathtaking artworks by renowned artists.",
      date: "2025-03-10",
      location: "Paris, France",
      category: "Art",
      image: img2,
      details: "The exhibition showcases modern and classic artworks. Guided tours are available.",
    },
    {
      id: 3,
      title: "Tech Conference",
      description: "Stay ahead with the latest trends in technology.",
      date: "2025-04-05",
      location: "San Francisco, USA",
      category: "Technology",
      image: img3,
      details: "The conference covers AI, blockchain, and more. Network with industry leaders.",
    },
    {
      id: 4,
      title: "Food Festival",
      description: "Taste delicious cuisines from around the world.",
      date: "2025-05-20",
      location: "Tokyo, Japan",
      category: "Food",
      image: img4,
      details: "Experience gourmet delights and live cooking shows. Family-friendly event.",
    },
    {
      id: 5,
      title: "Book Fair",
      description: "Dive into the world of books and meet your favorite authors.",
      date: "2025-06-10",
      location: "London, UK",
      category: "Literature",
      image: img5,
      details: "Special book signings and discounts available. Attend workshops and readings.",
    },
    {
      id: 6,
      title: "Film Festival",
      description: "Experience the magic of cinema with award-winning films.",
      date: "2025-07-15",
      location: "Berlin, Germany",
      category: "Film",
      image: img6,
      details: "Screenings of indie and blockbuster films. Meet directors and actors.",
    },
    {
      id: 7,
      title: "Basketball Championship",
      description: "Watch thrilling basketball action live.",
      date: "2025-08-10",
      location: "New York, USA",
      category: "Sports",
      image: img7,
      details: "The championship features the best teams competing for the title. Get ready for an action-packed day!",
    },
    {
      id: 8,
      title: "Soccer World Cup Screening",
      description: "Cheer for your favorite team in a lively atmosphere.",
      date: "2025-09-15",
      location: "Paris, France",
      category: "Sports",
      image: img8,
      details: "Join fans from around the world to watch the finals on a big screen. Food and beverages will be available.",
    },
    {
      id: 9,
      title: "Gaming Expo",
      description: "Discover the latest trends in gaming and technology.",
      date: "2025-10-05",
      location: "San Francisco, USA",
      category: "Technology",
      image: img9,
      details: "Experience cutting-edge gaming setups, meet developers, and enjoy exclusive previews of upcoming games.",
    },
    {
      id: 10,
      title: "Esports Tournament",
      description: "Witness top gamers battle it out for the championship.",
      date: "2025-11-20",
      location: "Tokyo, Japan",
      category: "Technology",
      image: img10,
      details: "The tournament features popular games like League of Legends and Valorant. Merchandise and giveaways included!",
    },
    {
      id: 11,
      title: "Marathon for Charity",
      description: "Run for a cause and make a difference.",
      date: "2025-12-05",
      location: "London, UK",
      category: "Sports",
      image: img11,
      details: "Join thousands of participants in a scenic route. Proceeds go to charitable organizations.",
    },
    {
      id: 12,
      title: "Indie Game Developer Meetup",
      description: "Connect with indie game developers and enthusiasts.",
      date: "2026-01-15",
      location: "Berlin, Germany",
      category: "Technology",
      image: img12,
      details: "An event for indie game developers to showcase their work, network, and learn from industry veterans.",
    },
    {
      id: 13,
      title: "Yoga and Wellness Retreat",
      description: "Relax, recharge, and reconnect with nature.",
      date: "2026-02-10",
      location: "New York, USA",
      category: "Wellness",
      image: img13,
      details: "A week-long retreat focusing on mindfulness, yoga sessions, and wellness workshops.",
    },
    {
      id: 14,
      title: "Rock Climbing Challenge",
      description: "Test your limits with this adrenaline-pumping challenge.",
      date: "2026-03-25",
      location: "Paris, France",
      category: "Sports",
      image: img14,
      details: "An event for rock climbing enthusiasts of all skill levels. Equipment and training sessions provided.",
    },
    {
      id: 15,
      title: "Winter Wonderland Festival",
      description: "Celebrate the magic of winter with family and friends.",
      date: "2026-12-15",
      location: "San Francisco, USA",
      category: "Food",
      image: img15,
      details: "Enjoy ice skating, snow sculptures, and delicious winter treats. Perfect for all ages!",
    },
  ];

  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredEvents = mockEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  const handleFilter = (category: string, location: string) => {
    let filteredEvents = mockEvents;

    if (category !== "All") {
      filteredEvents = filteredEvents.filter((event) => event.category === category);
    }

    if (location !== "All") {
      filteredEvents = filteredEvents.filter((event) => event.location === location);
    }

    setEvents(filteredEvents);
  };

  useEffect(() => {
    handleFilter(filterCategory, filterLocation);
  }, [filterCategory, filterLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-900 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto py-10 px-4 sm:px-8">
        <h1 className="text-5xl font-extrabold text-center text-blue-900 dark:text-blue-300 mb-10">Discover Events</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap gap-6 justify-center mb-10">
          {/* Search Bar */}
          <div className="flex items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/3">
            <Search className="text-gray-500 dark:text-gray-300 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full outline-none text-gray-700 dark:text-gray-300 bg-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery && (
              <X
                className="text-gray-500 dark:text-gray-300 cursor-pointer ml-3"
                size={20}
                onClick={() => handleSearch("")}
              />
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg w-full sm:w-1/3 lg:w-1/4">
            <Calendar className="text-gray-500 dark:text-gray-300 mr-3" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-transparent text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Food">Food</option>
              <option value="Literature">Literature</option>
              <option value="Film">Film</option>
              <option value="Wellness">Wellness</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg w-full sm:w-1/3 lg:w-1/4">
            <MapPin className="text-gray-500 dark:text-gray-300 mr-3" size={20} />
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full bg-transparent text-gray-700 dark:text-gray-300 outline-none"
            >
              <option value="All">All Locations</option>
              <option value="New York, USA">New York, USA</option>
              <option value="Paris, France">Paris, France</option>
              <option value="San Francisco, USA">San Francisco, USA</option>
              <option value="Tokyo, Japan">Tokyo, Japan</option>
              <option value="London, UK">London, UK</option>
              <option value="Berlin, Germany">Berlin, Germany</option>
            </select>
          </div>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <Image
                src={event.image}
                alt={event.title}
                width={600}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{event.description}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-4">{event.date}</p>
                <p className="text-gray-500 dark:text-gray-400">{event.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-11/12 sm:w-9/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
                onClick={() => setSelectedEvent(null)}
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-semibold mb-4">{selectedEvent.title}</h2>
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                width={600}
                height={300}
                className="w-full h-64 object-cover mb-4"
              />
              <p className="mb-4">{selectedEvent.details}</p>
              <p className="text-gray-500 dark:text-gray-400">
                Location: {selectedEvent.location}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Date: {selectedEvent.date}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
