import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "./Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faBullseye,
  faBrain,
  faBell,
  faSmile,
  faUniversalAccess,
  faCalendarAlt,
  faChartLine,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";

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
          className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
        >
          <div className="relative mx-auto max-w-5xl text-center">
            <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
              Why CareCompass?
            </span>
            <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
              Managing time, goals, and emotions is tough.
            </h2>
            <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
              Students often lose focus, professionals struggle to balance work
              and life, and everyone feels overwhelmed with achieving
              milestones. Most tools help with tasks but don’t address the
              emotional journey.
            </p>
            <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
              CareCompass fills this gap. It’s not just a tool to track
              progress—it’s like having a mentor and a friend, supporting you at
              every step with insights, encouragement, and clarity.
            </p>
          </div>

          <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faBullseye}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">
                Personalized Goal Milestone Recommendations
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Intelligent suggestions for milestones based on user inputs,
                ensuring achievable and relevant targets.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">Daily Summary Reports</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                At the end of each day, users receive an overview of their
                accomplishments, areas for improvement, and tailored suggestions
                for growth.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faSmile}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">
                Emotional Support and Remedial Steps
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                A built-in friendly chatbot acts as a mentor and confidant,
                offering emotional support alongside practical solutions.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">
                Reminders and Notifications
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Never miss a milestone with timely notifications.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faBrain}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">
                AI-Powered Goal Tracking and Management
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Stay on track with real-time updates and helpful feedback.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faUniversalAccess}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">Accessibility</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Text-to-voice and voice-to-text options for inclusive user
                experiences.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">
                Customizable Calendar and Roadmap Views
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                A customizable calendar and roadmap view to visualize progress
                intuitively.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">Secure Authentication</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                Ensures user data is safe and private.
              </p>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
              <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border feature-card">
                <FontAwesomeIcon
                  icon={faPuzzlePiece}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="mt-6 text-gray-400">User-Friendly Design</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                The design is simple, intuitive, and adjustable to fit your
                needs.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center w-full">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CareCompass. All rights reserved.
        </p>
        <p classname="text-sm text-gray-400">
          Made with <span className="text-red-500">❤</span> by{" "}
          <a
            href="https://linkedin.com/in/vijaisuria"
            target="_blank"
            className="text-blue-500 font-semibold hover:underline"
          >
            Vijai Suria
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
