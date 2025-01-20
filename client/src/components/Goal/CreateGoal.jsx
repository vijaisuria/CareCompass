import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTag,
  faFileAlt,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGoalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("personal");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = sessionStorage.getItem("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/goals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            title,
            description,
            category,
            deadline,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create the goal.");
      }

      setTitle("");
      setDescription("");
      setCategory("personal");
      setDeadline("");
      toast.success("Goal created successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900/10 glassmorphism p-8 rounded-lg shadow-xl backdrop-blur-md">
      <div className="glassmorphism p-8 rounded-lg shadow-xl max-w-lg w-full bg-white/10 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FontAwesomeIcon icon={faPen} className="mr-2" />
          Create a New Goal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg border border-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter goal title"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg border border-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter goal description"
            />
          </div>

          <div>
            <label className="font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-blue-950 p-3 rounded-lg bg-white/20 backdrop-blur-lg border border-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            >
              <option value="personal">Personal</option>
              <option value="professional">Professional</option>
              <option value="educational">Educational</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg border border-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-indigo-600 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Creating Goal..." : "Create Goal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGoalForm;
