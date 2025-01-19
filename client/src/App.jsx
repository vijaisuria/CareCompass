import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./pages/layout/MainLayout";

import "./App.css";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ChatPage from "./pages/chat";
import CalendarPage from "./pages/calendar";

const PrivateRoute = ({ children }) => {
  // Check authentication status
  const isAuthenticated = sessionStorage.getItem("user_id"); // Replace with your logic

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const logs = [
    {
      userId: "1",
      date: "2025-01-01",
      activityType: "chat",
      activityDetails: { message: "Hello" },
    },
    {
      userId: "1",
      date: "2025-01-01",
      activityType: "goal",
      activityDetails: { goal: "Run 5km" },
    },
    {
      userId: "1",
      date: "2025-01-01",
      activityType: "summary",
      activityDetails: { summary: "Weekly Review" },
    },
  ];

  return (
    <Router>
      <Routes>
        {/* Define a parent route for Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* Protected Routes */}
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="calendar"
            element={
              <PrivateRoute>
                <CalendarPage logs={logs} />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
