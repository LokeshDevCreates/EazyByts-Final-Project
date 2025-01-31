"use client";
import React, { useState, useEffect } from "react";
import { Search, Calendar, MapPin, X } from "lucide-react";
import "tailwindcss/tailwind.css";

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
  const mockEvents: Event[] =[
    {
      "id": 1,
      "title": "Music Concert",
      "description": "Enjoy an evening of live music by top artists.",
      "date": "2025-02-15",
      "location": "New York, USA",
      "category": "Music",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy1_-CtaHKfJ4P5lrBXGx0OmVKg5EwqQKovg&s",
      "details": "This concert features performances by world-renowned musicians. Tickets include access to the VIP lounge and refreshments."
    },
    {
      "id": 2,
      "title": "Art Exhibition",
      "description": "Explore breathtaking artworks by renowned artists.",
      "date": "2025-03-10",
      "location": "Paris, France",
      "category": "Art",
      "image": "https://images.pexels.com/photos/1671014/pexels-photo-1671014.jpeg?cs=srgb&dl=pexels-myatezhny39-1671014.jpg&fm=jpg",
      "details": "The exhibition showcases modern and classic artworks. Guided tours are available."
    },
    {
      "id": 3,
      "title": "Tech Conference",
      "description": "Stay ahead with the latest trends in technology.",
      "date": "2025-04-05",
      "location": "San Francisco, USA",
      "category": "Technology",
      "image": "https://cdn.prod.website-files.com/6331e19fdfcbe01f4c12b610/66baffd5ee7f9fa6efed4473_640f82ab5d300300a891d92a_viva.jpeg",
      "details": "The conference covers AI, blockchain, and more. Network with industry leaders."
    },
    {
      "id": 4,
      "title": "Food Festival",
      "description": "Taste delicious cuisines from around the world.",
      "date": "2025-05-20",
      "location": "Tokyo, Japan",
      "category": "Food",
      "image": "https://thumbs.6sqft.com/wp-content/uploads/2018/10/17084538/Smorgasburg_-e1539780362373.jpg?w=1560&format=webp",
      "details": "Experience gourmet delights and live cooking shows. Family-friendly event."
    },
    {
      "id": 5,
      "title": "Book Fair",
      "description": "Dive into the world of books and meet your favorite authors.",
      "date": "2025-06-10",
      "location": "London, UK",
      "category": "Literature",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKLyjU2MQb1msPayIa4sg_Az3xC5Aq_h4jA&s",
      "details": "Special book signings and discounts available. Attend workshops and readings."
    },
    {
      "id": 6,
      "title": "Film Festival",
      "description": "Experience the magic of cinema with award-winning films.",
      "date": "2025-07-15",
      "location": "Berlin, Germany",
      "category": "Film",
      "image": "https://news.cgtn.com/news/2020-08-22/The-10th-Beijing-International-Film-Festival-kicks-off-on-August-22-TamA9SC9Ak/img/494c9e37685c47298977f1ed940f044f/494c9e37685c47298977f1ed940f044f.jpeg",
      "details": "Screenings of indie and blockbuster films. Meet directors and actors."
    },
    {
      "id": 7,
      "title": "Basketball Championship",
      "description": "Watch thrilling basketball action live.",
      "date": "2025-08-10",
      "location": "New York, USA",
      "category": "Sports",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkNhfskvsWFfwLjJ6Jxng7sZz_Bol9WDRvkA&s",
      "details": "The championship features the best teams competing for the title. Get ready for an action-packed day!"
    },
    {
      "id": 8,
      "title": "Soccer World Cup Screening",
      "description": "Cheer for your favorite team in a lively atmosphere.",
      "date": "2025-09-15",
      "location": "Paris, France",
      "category": "Sports",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxa6jA0D0R6rf0-lw3gkvhXIkKuVwBVwkCag&s",
      "details": "Join fans from around the world to watch the finals on a big screen. Food and beverages will be available."
    },
    {
      "id": 9,
      "title": "Gaming Expo",
      "description": "Discover the latest trends in gaming and technology.",
      "date": "2025-10-05",
      "location": "San Francisco, USA",
      "category": "Technology",
      "image": "https://www.reviewjournal.com/wp-content/uploads/2019/10/12850877_web1_G2E-EXPO-DAY-ONE-OCT16-19-051.jpg",
      "details": "Experience cutting-edge gaming setups, meet developers, and enjoy exclusive previews of upcoming games."
    },
    {
      "id": 10,
      "title": "Esports Tournament",
      "description": "Witness top gamers battle it out for the championship.",
      "date": "2025-11-20",
      "location": "Tokyo, Japan",
      "category": "Technology",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQLUpVlgAnrgbSC63aIMXuhT3E-Vi81HvBg&s",
      "details": "The tournament features popular games like League of Legends and Valorant. Merchandise and giveaways included!"
    },
    {
      "id": 11,
      "title": "Marathon for Charity",
      "description": "Run for a cause and make a difference.",
      "date": "2025-12-05",
      "location": "London, UK",
      "category": "Sports",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQquyuY6uDwpA8KCAdCG9GaBoBlpEElu0vCVQ&s",
      "details": "Join thousands of participants in a scenic route. Proceeds go to charitable organizations."
    },
    {
      "id": 12,
      "title": "Indie Game Developer Meetup",
      "description": "Connect with indie game developers and enthusiasts.",
      "date": "2026-01-15",
      "location": "Berlin, Germany",
      "category": "Technology",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuw2tVRXt2rUJvFdx80qqXIv1EbI7aUUyWmg&s",
      "details": "An event for indie game developers to showcase their work, network, and learn from industry veterans."
    },
    {
      "id": 13,
      "title": "Yoga and Wellness Retreat",
      "description": "Relax, recharge, and reconnect with nature.",
      "date": "2026-02-10",
      "location": "New York, USA",
      "category": "Wellness",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYypSrkE7NOIi3GoO9IwKoLgNjlRk4VzvdHw&s",
      "details": "A week-long retreat focusing on mindfulness, yoga sessions, and wellness workshops."
    },
    {
      "id": 14,
      "title": "Rock Climbing Challenge",
      "description": "Test your limits with this adrenaline-pumping challenge.",
      "date": "2026-03-25",
      "location": "Paris, France",
      "category": "Sports",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBJ8FpI4nn-z2MHJbyh1W1Nvs9XJixrvUuHw&s",
      "details": "An event for rock climbing enthusiasts of all skill levels. Equipment and training sessions provided."
    },
    {
      "id": 15,
      "title": "Winter Wonderland Festival",
      "description": "Celebrate the magic of winter with family and friends.",
      "date": "2026-12-15",
      "location": "San Francisco, USA",
      "category": "Food",
      "image": "https://donstravels.com/wp-content/uploads/2019/01/Hyde-Park-Winter-Wonderland-market-2017.jpeg",
      "details": "Enjoy ice skating, snow sculptures, and delicious winter treats. Perfect for all ages!"
    }
  ];
  

  // States
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredEvents = mockEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  // Handle filtering functionality
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
          </div>

          {/* Category Filter */}
          <select
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg w-full sm:w-1/4 text-gray-700 dark:text-gray-300"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Literature">Literature</option>
            <option value="Film">Film</option>
          </select>

          {/* Location Filter */}
          <select
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg w-full sm:w-1/4 text-gray-700 dark:text-gray-300"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
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

        {/* Event List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-300">{event.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="mr-2 text-blue-500 dark:text-blue-300" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <MapPin className="mr-2 text-blue-500 dark:text-blue-300" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-600 dark:text-gray-400">No events found.</p>
          )}
        </div>

        {/* Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-300">{selectedEvent.title}</h2>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X size={24} />
                </button>
              </div>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedEvent.details}</p>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="mr-2 text-blue-500 dark:text-blue-300" />
                  {selectedEvent.date}
                </div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <MapPin className="mr-2 text-blue-500 dark:text-blue-300" />
                  {selectedEvent.location}
                </div>
                <button className="mt-5 px-6 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800">Book Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
