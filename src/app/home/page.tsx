"use client";
import React from "react";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Custom button component using Lucide React icon
const IconButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );
};

// Dynamically import Slider component to avoid SSR issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const LandingPage: React.FC = () => {
  const events = [
    { image: "/images/ex1.jpg", title: "Event 1", date: "Feb 12, 2025" },
    { image: "/images/ex2.jpg", title: "Event 2", date: "Mar 5, 2025" },
    { image: "/images/ex3.jpg", title: "Event 3", date: "Apr 20, 2025" },
    { image: "/images/ex4.jpg", title: "Event 4", date: "May 10, 2025" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight tracking-tight">
            Discover and Book Amazing Events
          </h1>
          <p className="text-lg mb-6 opacity-90">
            From concerts to workshops, find events that inspire you.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/events">
              <IconButton
                icon={<Calendar />}
                label="Explore Events"
                onClick={() => {}}
              />
            </Link>
            <Link href="/signup">
              <IconButton
                icon={<Calendar />}
                label="Sign Up Now"
                onClick={() => {}}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Event Highlights (Image Carousel) */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Upcoming Events
          </h2>
          <div className="relative">
            <Slider {...settings}>
              {events.map((event, index) => (
                <div key={index} className="p-6 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 ease-in-out transform hover:scale-105">
                  <div className="mb-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[500px] object-cover rounded-xl mb-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    />
                    <div className="mt-4 flex justify-center">
                      <Link href="/events">
                        <IconButton
                          icon={<Calendar />}
                          label="Go to Events"
                          onClick={() => {}}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">How do I book an event?</h3>
              <p className="text-sm text-gray-600">
                Browse events, select one, and complete the booking process with ease.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Can I cancel my booking?</h3>
              <p className="text-sm text-gray-600">
                Yes, you can cancel or reschedule bookings through your dashboard.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">What types of events can I find?</h3>
              <p className="text-sm text-gray-600">
                You can find a wide variety of events, from concerts and workshops to conferences and networking events.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Are there any membership plans?</h3>
              <p className="text-sm text-gray-600">
                Yes, we offer different membership plans that provide discounts and exclusive access to premium events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Have any questions or need support? Reach out to us, and we’ll be happy to assist you!
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Email</h3>
              <p className="text-lg text-gray-600">eazybyts@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Phone</h3>
              <p className="text-lg text-gray-600">91+ 8270891270</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Eventify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
