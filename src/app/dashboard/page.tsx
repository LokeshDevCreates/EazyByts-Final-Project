"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

// Example data for dashboard stats and events
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Stats {
  eventsCount: number;
  usersCount: number;
  activeEvents: number;
  completedEvents: number;
}

const stats: Stats = {
  eventsCount: 45,
  usersCount: 1200,
  activeEvents: 30,
  completedEvents: 15,
};

const recentEvents: Event[] = [
  {
    id: 1,
    title: 'Gaming Expo 2025',
    date: '2025-10-05',
    location: 'Seattle, USA',
    description: 'A grand gaming event featuring esports, gaming products, and networking opportunities.',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Basketball Championship 2025',
    date: '2025-08-10',
    location: 'Chicago, USA',
    description: 'Witness the best basketball teams compete for the championship.',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Esports Tournament 2025',
    date: '2025-11-20',
    location: 'Seoul, South Korea',
    description: 'Top esports players from around the world competing for glory.',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Yoga and Wellness Retreat',
    date: '2026-02-10',
    location: 'Bali, Indonesia',
    description: 'A rejuvenating retreat focused on wellness, yoga, and meditation.',
    status: 'completed',
  },
];

const DashboardPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const router = useRouter();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-screen-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Your event management overview.</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Total Events</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.eventsCount}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Users</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.usersCount}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Active Events</h3>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.activeEvents}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Completed Events</h3>
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-300">{stats.completedEvents}</p>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Recent Events</h2>
          {selectedEvent ? (
            <div>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Location: {selectedEvent.location}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Date: {selectedEvent.date}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Description: {selectedEvent.description}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                    selectedEvent.status === 'upcoming'
                      ? 'bg-green-500 text-white'
                      : selectedEvent.status === 'completed'
                      ? 'bg-gray-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`cursor-pointer flex justify-between items-center p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105 ${
                    event.status === 'upcoming'
                      ? 'bg-green-50 dark:bg-green-800 text-green-700 dark:text-green-300'
                      : event.status === 'completed'
                      ? 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      : 'bg-red-50 dark:bg-red-800 text-red-700 dark:text-red-300'
                  }`}
                >
                  <div className="flex flex-col space-y-1 w-4/5">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-sm">{event.location}</p>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{event.date}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span
                      className={`text-xs font-semibold py-1 px-3 rounded-full ${
                        event.status === 'upcoming'
                          ? 'bg-green-500 text-white'
                          : event.status === 'completed'
                          ? 'bg-gray-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/profile')}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition-colors"
          >
            Profile Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
