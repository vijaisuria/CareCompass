import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faBook,
  faRobot,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import PageHeader from "../Header";

const GoalsDisplay = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user ID from session storage or default to 1
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/goals/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch goals. Please try again.");
        }
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError("Failed to fetch goals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-10 text-blue-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="My Goals"
        description="Here are your goals. Click on a goal to view more details."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center text-xl"
          onClick={() => (window.location.href = "/new-goals")}
        >
          <FontAwesomeIcon icon={faMap} className="mr-2" />
          Create New Goal
        </button>
        {goals.map((goal) => (
          <div
            key={goal._id}
            className="bg-white shadow-lg rounded-lg p-4 transition-transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-purple-700 mb-2">
              {goal.title}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Description:</span>{" "}
              {goal.description || "No description provided."}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Category:</span> {goal.category}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Deadline:</span>{" "}
              {goal.deadline
                ? new Date(goal.deadline).toLocaleDateString()
                : "No deadline set."}
            </p>
            <p className={`text-gray-600 mb-2`}>
              <span className="font-bold">Status:</span>{" "}
              {goal.completed ? (
                <span className="text-green-600 font-bold">Completed</span>
              ) : (
                <span className="text-red-600 font-bold">In Progress</span>
              )}
            </p>

            {goal.category === "educational" && (
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                  onClick={() =>
                    navigate(`/loading?page=roadmap&goalId=${goal._id}`)
                  }
                >
                  <FontAwesomeIcon icon={faMap} className="mr-2" />
                  View Roadmap
                </button>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"
                  onClick={() =>
                    navigate(`/loading?page=learning&goalId=${goal._id}`)
                  }
                >
                  <FontAwesomeIcon icon={faBook} className="mr-2" />
                  Learning Module
                </button>
              </div>
            )}

            {goal.category !== "educational" && (
              <div className="mt-4">
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center">
                  <FontAwesomeIcon icon={faNoteSticky} className="mr-2" />
                  View Milestones
                </button>
              </div>
            )}

            <div className="mt-4">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="mr-2" />
                Talk with CareCompass AI
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsDisplay;
