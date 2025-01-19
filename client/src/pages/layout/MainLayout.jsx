// components/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar";

import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="container mx-auto mt-6">
        <Outlet />
      </main>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default MainLayout;
