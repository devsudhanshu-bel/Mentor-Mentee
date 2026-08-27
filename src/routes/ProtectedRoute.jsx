import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  //--------------------------------------------------
  // Get Authentication Data
  //--------------------------------------------------

  const token = localStorage.getItem("accessToken");
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error(
      "Invalid user data found in localStorage:",
      error
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");

    return <Navigate to="/login" replace />;
  }

  //--------------------------------------------------
  // Authentication Check
  //--------------------------------------------------

  if (!token || !isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  //--------------------------------------------------
  // Authorization Check
  //--------------------------------------------------

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" replace />;
  }

  //--------------------------------------------------
  // Authorized
  //--------------------------------------------------

  return <Outlet />;
};

export default ProtectedRoute;