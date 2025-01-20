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
import GoalsDisplay from "./components/Goal";
import LoadingPage from "./pages/skillsync/Loading";
import Roadmap from "./pages/skillsync/Roadmap";
import LearningModule from "./pages/skillsync/LearningModule";
import SkillSyncPortal from "./pages/skillsync";
import CreateGoalForm from "./components/Goal/CreateGoal";

const PrivateRoute = ({ children }) => {
  // Check authentication status
  const isAuthenticated = sessionStorage.getItem("user_id"); // Replace with your logic

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
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
                <CalendarPage />
              </PrivateRoute>
            }
          />
          <Route
            path="goals"
            element={
              <PrivateRoute>
                <GoalsDisplay />
              </PrivateRoute>
            }
          />
          <Route
            path="create-goal"
            element={
              <PrivateRoute>
                <CreateGoalForm />
              </PrivateRoute>
            }
          />
          <Route
            path="loading"
            element={
              <PrivateRoute>
                <LoadingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="roadmap"
            element={
              <PrivateRoute>
                <Roadmap />
              </PrivateRoute>
            }
          />
          <Route
            path="learning"
            element={
              <PrivateRoute>
                <LearningModule />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="skillsync"
          element={
            <PrivateRoute>
              <SkillSyncPortal />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
