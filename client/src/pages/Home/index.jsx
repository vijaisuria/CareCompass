import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  // Function to generate random star positions
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      const randomX = Math.random() * 100; // Random X position (0% to 100%)
      const randomY = Math.random() * 100; // Random Y position (0% to 100%)
      const randomDelay = Math.random() * 3; // Random animation delay
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            top: `${randomY}%`,
            left: `${randomX}%`,
            animationDelay: `${randomDelay}s`,
          }}
        ></div>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Header Section */}
      <header className="text-center px-6">
        <div className="my-28 md:my-32"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <Typewriter
            words={["CareCompass", "Your AI-Powered Companion"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="text-lg md:text-xl mb-6">
          A multi-purpose tool designed for working professionals and students{" "}
          <br />
          to manage their day efficiently with emotional support, goal tracking,
          and personalized care.
        </p>
      </header>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Try CareCompass
        </Link>
        <Link
          to="/features"
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Explore Features
        </Link>
      </div>

      {/* Galaxy Illustration */}
      <div className="galaxy-container mt-20 relative">
        <div className="light-rays"></div>
        <div className="stars">{generateStars()}</div>
        <img
          src="/logo.svg"
          alt="CareCompass Illustration"
          className="w-full max-w-md mx-auto logo-animation"
        />
      </div>

      <div>
        <section
          id="features"
          className="relative block px-6 py-10 md:py-20 md:px-10  border-t border-b border-neutral-900 bg-neutral-900/30"
        >
          <div className="relative mx-auto max-w-5xl text-center">
            <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
              Why choose us
            </span>
            <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
              Build a Website That Your Customers Love
            </h2>
            <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
              Our templates allow for maximum customization. No technical skills
              required – our intuitive design tools let you get the job done
              easily.
            </p>
          </div>

          <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-color-swatch"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                  <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                  <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                  <line x1="17" y1="17" x2="17" y2="17.01"></line>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-400">Customizable</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Tailor your landing page's look and feel, from the color scheme
                to the font size, to the design of the page.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-bolt"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-400">Fast Performance</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                We build our templates for speed in mind, for super-fast load
                times so your customers never waver.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-tools"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                  <polyline points="12 8 7 3 3 7 8 12"></polyline>
                  <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                  <polyline points="16 12 21 17 17 21 12 16"></polyline>
                  <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-400">Fully Featured</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Everything you need to succeed and launch your landing page,
                right out of the box. No need to install anything else.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-color-swatch"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                  <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                  <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                  <line x1="17" y1="17" x2="17" y2="17.01"></line>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-400">Customizable</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Tailor your landing page's look and feel, from the color scheme
                to the font size, to the design of the page.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-bolt"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-400">Fast Performance</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                We build our templates for speed in mind, for super-fast load
                times so your customers never waver.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-tools"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                  <polyline points="12 8 7 3 3 7 8 12"></polyline>
                  <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                  <polyline points="16 12 21 17 17 21 12 16"></polyline>
                  <line x1="16" y1="17" x2="14.5" y2="18.5"></line>
                </svg>
              </div>
              <h3 className="mt-6 text-gray-400">Fully Featured</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Everything you need to succeed and launch your landing page,
                right out of the box. No need to install anything else.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CareCompass. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
