import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Employees from "./pages/Employees";
import Feedback from "./pages/Feedback";
import Goals from "./pages/TL/Goals";
import KPIs from "./pages/User/KPIs";
import PerformanceReviews from "./pages/TL/PerformanceReviews";
import ProtectedRoute from "./components/ProtectedRoute";
import HRDB from "./pages/HR/HRDB";
import TLDB from "./pages/TL/TLDB";
import UserDB from "./pages/User/UserDB";
import Task from "./pages/User/Task";

import './style.css'

// Navigation Component
function Navigation() {
  const location = useLocation();
  const role = sessionStorage.getItem("role");

  if (location.pathname === "/login") return null; // Hide on login page

  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      {role === "HR" && (
        <>
          <a href="/hr/dashboard">Dashboard</a>
          <a href="/hr/employees">Employees</a>
          <a href="/hr/performance-reviews">Performance Reviews</a>
          <a href="/hr/feedback">Feedback</a>
        </>
      )}
      {role === "TL" && (
        <>
          <a href="/tl/dashboard">Dashboard</a>
          <a href="/tl/goals">Goals</a>
          <a href="/tl/performance-reviews">Performance Reviews</a>
          <a href="/tl/feedback">Feedback</a>
        </>
      )}
      {role === "USER" && (
        <>
          <a href="/user/dashboard">Dashboard</a>
          <a href="/user/task">Task</a>
          <a href="/user/feedback">Feedback</a>
        </>
      )}
    </nav>
  );
}

// Logout Button Component
function LogoutButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  // Show logout button **only for protected routes**
  if (!role || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg">
        Logout
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="relative max-h-screen">
        <LogoutButton /> {/* ✅ Placed outside <Routes>, so it won’t break */}
        <Navigation />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* HR Routes */}
          <Route element={<ProtectedRoute allowedRoles={["HR"]} />}>
            <Route path="/hr/dashboard" element={<HRDB />} />
            <Route path="/hr/employees" element={<Employees />} />
            <Route path="/hr/performance-reviews" element={<PerformanceReviews />} />
            <Route path="/hr/feedback" element={<Feedback />} />
          </Route>

          {/* TL Routes */}
          <Route element={<ProtectedRoute allowedRoles={["TL"]} />}>
            <Route path="/tl/dashboard" element={<TLDB />} />
            <Route path="/tl/goals" element={<Goals />} />
            <Route path="/tl/performance-reviews" element={<PerformanceReviews />} />
            <Route path="/tl/feedback" element={<Feedback />} />
          </Route>

          {/* User Routes */}
          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
            <Route path="/user/dashboard" element={<UserDB />} />
            <Route path="/user/task" element={<Task />} />
            <Route path="/user/feedback" element={<Feedback />} />
          </Route>

          {/* Catch-all for unauthorized access */}
          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

          {/* Default Route - Redirect to Login if no session */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
