import React from "react";
import { useNavigate } from "react-router-dom";
import HRPerformanceMetrics from "./Performance";

function HRDB() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Remove user data
    sessionStorage.removeItem("role"); // Remove role
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1>HR Dashboard</h1>
      <HRPerformanceMetrics/>
    </div>
  );
}

export default HRDB;
