import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSearch,
  faHome,
  faBookmark,
  faComments,
  faSignOutAlt,
  faChevronDown,
  faUser,
  faSyncAlt,
  faClipboardList,
  faChartLine,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex ">
      {/* Sidebar Toggle Button */}
      <span
        className="absolute text-4xl top-9 left-4 cursor-pointer btn rounded-circle px-2 d-inline-flex align-items-center justify-content-center"
        onClick={toggleSidebar}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-xl-heavy"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 left-0 bottom-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-xl">
          {/* Header */}
          <div className="p-2.5 mt-1 flex items-center">
            <img
              src="/logo.svg"
              className="w-12 h-12 rounded-md bg-blue-600 cursor-pointer"
              onClick={toggleSidebar}
            />
            <h1 className="font-bold text-[15px] ml-3">Care Compass</h1>
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer ml-auto"
              onClick={toggleSidebar}
            />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        {/* Search Bar */}
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700">
          <FontAwesomeIcon icon={faSearch} className="text-sm" />
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* Menu Items */}
        <Link
          to="/"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faHome} />
          <span className="text-[15px] ml-4 font-bold">Home</span>
        </Link>

        <Link
          to="/login"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faAddressBook} />
          <span className="text-[15px] ml-4 font-bold">Accounts</span>
        </Link>

        <div className="my-4 bg-gray-600 h-[1px]"></div>

        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faComments} />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 font-bold">Chatbox</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-sm transition-transform duration-300 ${
                isDropdownOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="text-left text-sm mt-2 w-4/5 mx-auto font-bold">
            <Link
              to="/chat?type=personal"
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
            >
              Personal
            </Link>
            <Link
              to="/chat?type=knowledge"
              className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
            >
              Knowledge
            </Link>
          </div>
        )}

        <Link
          to="/goals"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faBookmark} />
          <span className="text-[15px] ml-4 font-bold">Goals</span>
        </Link>

        <Link
          to="/skillsync"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faSyncAlt} />
          <span className="text-[15px] ml-4 font-bold">Skill Sync</span>
        </Link>

        <Link
          to="/calendar"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faClipboardList} />
          <span className="text-[15px] ml-4 font-bold">Activity Logs</span>
        </Link>

        <Link
          to="/daily"
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faChartLine} />
          <span className="text-[15px] ml-4 font-bold">Daily Summary</span>
        </Link>

        <div className="mt-auto">
          {/* Profile */}
          <Link
            to="/profile"
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="text-[15px] ml-4 font-bold">Profile</span>
          </Link>

          {/* Logout */}
          <Link
            to="/login"
            onClick={() => sessionStorage.removeItem("user_id")}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="text-[15px] ml-4 font-bold">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
