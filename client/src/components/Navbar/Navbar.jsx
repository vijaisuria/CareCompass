import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    // Sync the theme with the document when the component mounts
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user_id");
    setIsLoggedIn(false);
    setUserId(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="flex gap-3">
      <nav className="bg-white/30 backdrop-blur-md shadow-md rounded-lg w-full h-16 items-center ml-12">
        <div className="px-2 relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center text-xl font-bold ">
                <img src="/logo.svg" alt="Logo" className="h-8 w-auto mr-2" />
                CareCompass
              </Link>
            </div>
          </div>

          {/* Right-side controls */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:mr-6 sm:pl-0">
            {/* Profile Dropdown */}
            {isLoggedIn ? (
              <div className="hidden sm:flex space-x-4">
                <Link to="/profile" className="block px-4 py-2 ">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 font-medium bg-red-500 hover:bg-red-600 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 font-medium hover:font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 font-medium bg-green-500 hover:bg-green-600 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center mr-10 w-8 h-8 rounded-full bg-slate-600  focus:outline-none"
          >
            {theme === "light" ? (
              <svg
                className="icon sun w-6 h-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="5" fill="yellow"></circle>
                <g className="sun-rays" stroke="yellow">
                  <line x1="12" y1="1" x2="12" y2="4"></line>
                  <line x1="12" y1="20" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"></line>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="4" y2="12"></line>
                  <line x1="20" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"></line>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"></line>
                </g>
              </svg>
            ) : (
              <svg
                className="icon moon w-6 h-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:hidden absolute right-0 top-16 bg-white/30 backdrop-blur-md shadow-lg rounded-md`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-4 py-3">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-base font-medium "
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium bg-green-500 hover:bg-green-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
