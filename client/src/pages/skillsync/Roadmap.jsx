import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import RoadmapHeader from "../../components/skillsync/RoadmapHeader";
import { motion } from "framer-motion";
import GraphVisualization from "../../components/skillsync/GraphVisualization";

const Roadmap = () => {
  const location = useLocation(); // Get the location object
  const [data, setData] = useState(null); // State to store API response
  const [loading, setLoading] = useState(true); // Loading state

  // Helper function to extract query params
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const goalId = getQueryParam("goalId"); // Extract goalId from query params

  useEffect(() => {
    if (!goalId) {
      console.error("No goalId provided in query parameters");
      return;
    }

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/goals/${goalId}`
        );
        const result = await response.json();

        // format the result.roadMapJson into json object
        result.roadMapJson = JSON.parse(result.roadMapJson);

        // Set the data and steps
        setData(result);
      } catch (error) {
        console.error("Error fetching roadmap data:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchData();
  }, [goalId]);

  if (loading) {
    return <div>Loading...</div>; // Loading message until data is fetched
  }

  return (
    <div className="relative">
      <div className="relative">
        <motion.div
          className="container mx-auto px-4 grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RoadmapHeader data={data} />
          {data ? (
            <GraphVisualization data={data.roadMapJson} />
          ) : (
            <div>No data available for visualization</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap;
