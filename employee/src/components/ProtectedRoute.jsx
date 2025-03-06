import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const role = sessionStorage.getItem("role");
  console.log("Stored Role:", role);
  console.log("Allowed Roles:", allowedRoles);

  if (!role) {
    console.log("No role found, redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("Unauthorized Role:", role, "Allowed:", allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Access granted to role:", role);
  return <Outlet />;
};

export default ProtectedRoute;
