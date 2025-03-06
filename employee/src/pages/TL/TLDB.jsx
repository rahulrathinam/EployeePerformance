import React from "react";
import { useNavigate } from "react-router-dom";
import HRPerformanceMetrics from "../HR/Performance";

function TLDB() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Remove user data
    sessionStorage.removeItem("role"); // Remove role
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-700 p-6">
      
      {/* Card Container */}
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-white/30">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Team Lead Dashboard</h1>
          <p className="text-gray-300">Manage team performance efficiently</p>
        </div>

        {/* Performance Metrics Component */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <HRPerformanceMetrics />
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="mt-6 w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default TLDB;
  