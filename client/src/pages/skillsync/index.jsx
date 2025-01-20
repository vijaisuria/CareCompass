import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const SkillSyncPortal = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const userData = await response.json();
        setEducation(userData.education || "");
        setProfession(userData.profession || "");
        setBio(userData.bio || "");
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      toast.error("User ID not found. Please log in.");
      navigate("/login");
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/onboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            education,
            profession,
            bio,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to onboard user.");
      }

      setSuccess("Your details have been successfully updated!");
      toast.success("User details updated successfully!");
      navigate("/goals");
      setError(null);
    } catch (err) {
      setSuccess(null);
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen grid bg-black">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
        {/* Left Section */}
        <div className="relative sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover">
          <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
          <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center">
            <div className="font-bold leading-tight mb-6 mx-auto w-full content-center items-center">
              <img src="/logo.svg" alt="AIgnite Learn" className="w-auto" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none">
          <div className="max-w-xl w-full space-y-12">
            <div className="lg:text-left text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Welcome back!
              </h2>
              <p className="text-white mb-8">
                Welcome back to our Skill Sync Portal, powered by CareCompass.
              </p>
              <div className="flex items-center justify-center">
                <div className="bg-black flex flex-col border border-gray-900 rounded-lg px-8 py-10">
                  <form
                    className="flex flex-col space-y-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col space-y-4">
                      <label className="text-white">
                        Education
                        <input
                          type="text"
                          name="education"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="mt-1 p-2 bg-black border border-gray-700 rounded-lg w-full"
                          placeholder="Enter your education"
                        />
                      </label>
                      <label className="text-white">
                        Profession
                        <input
                          type="text"
                          name="profession"
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                          className="mt-1 p-2 bg-black border border-gray-700 rounded-lg w-full"
                          placeholder="Enter your profession"
                        />
                      </label>
                      <label className="text-white">
                        Short Bio (max 250 characters)
                        <textarea
                          name="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="mt-1 p-2 bg-black border border-gray-700 rounded-lg w-full"
                          placeholder="Enter a short bio"
                          maxLength="250"
                        />
                      </label>
                    </div>

                    <p className="text-sm text-gray-400 mt-4">
                      This ensures your information is up-to-date with our
                      knowledge base. You can skip if there is no change since
                      your last update. Thanks!
                    </p>
                    {error && (
                      <div className="text-red-600 text-sm mt-2">{error}</div>
                    )}
                    {success && (
                      <div className="text-green-600 text-sm mt-2">
                        {success}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="text-indigo-600 mt-4 underline"
                      onClick={() => navigate("/goals")}
                    >
                      Skip
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SkillSyncPortal;
