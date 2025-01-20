import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

import PageHeader from "../../components/Header";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [logs, setLogs] = useState([]); // Replace with your user ID

  // Get the logs from /api/logs/user/<user_id>
  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => console.error(error));
  }, []);

  // Function to generate emoji based on emotion
  const getEmoji = (activityType) => {
    switch (activityType) {
      case "chat":
        return "💬";
      case "goal":
        return "🎯";
      case "summary":
        return "📄";
      default:
        return "❓";
    }
  };

  // Generate all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Handle day click to open modal
  const handleDayClick = (day) => {
    const dayLogs = logs.filter((log) => isSameDay(new Date(log.date), day));
    setSelectedDate(day);
    setModalData(dayLogs);
  };

  // Change month handlers
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Utility function to get mood emoji
  const getMoodEmoji = (mood) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "stressed":
        return "😟";
      case "overwhelmed":
        return "😵";
      case "neutral":
        return "😐";
      default:
        return "";
    }
  };

  // Utility function to get mood-based styling
  const getMoodClass = (mood) => {
    switch (mood) {
      case "happy":
        return "bg-green-300 text-green-800";
      case "stressed":
        return "bg-yellow-300 text-yellow-800";
      case "overwhelmed":
        return "bg-red-300 text-red-800";
      case "neutral":
        return "bg-gray-300 text-gray-800";
      default:
        return "";
    }
  };

  // Render calendar grid
  const renderCalendar = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {daysInMonth.map((day) => {
          const dayLogs = logs.filter((log) =>
            isSameDay(new Date(log.date), day)
          );

          // Extract the most prominent mood of the day (optional logic: pick the first or derive based on priority)
          const prominentMood = dayLogs.length > 0 ? dayLogs[0].mood : null;
          const moodClass = prominentMood ? getMoodClass(prominentMood) : "";
          const moodEmoji = prominentMood ? getMoodEmoji(prominentMood) : "";

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 hover:text-gray-900 cursor-pointer ${moodClass}`}
            >
              <div>{format(day, "dd")}</div>
              <div>{format(day, "EEEE")}</div>
              <div className="flex space-x-1">
                {dayLogs.map((log, index) => (
                  <span key={index} className="text-lg">
                    {getEmoji(log.activityType)}
                  </span>
                ))}
                {moodEmoji && <span className="text-lg">{moodEmoji}</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render modal for day details
  const renderModal = () => {
    if (!selectedDate || !modalData) return null;

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white text-black rounded-lg p-6 w-11/12 md:w-1/2">
          <h2 className="text-lg font-bold mb-4">
            Details for {format(selectedDate, "MMMM d, yyyy")}
          </h2>
          {modalData.length > 0 ? (
            <ul className="space-y-2">
              {modalData.map((log, index) => (
                <li key={index} className="border-b pb-2">
                  <p>
                    <strong>Type:</strong> {log.activityType}
                  </p>
                  <p>
                    <strong>Details:</strong>{" "}
                    {JSON.stringify(log.activityDetails)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities for this day.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setSelectedDate(null)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <PageHeader
        title="🗓️ Calendar"
        description="View your activities by day"
      />
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </div>
      {renderCalendar()}
      {renderModal()}
    </div>
  );
};

export default CalendarPage;
