import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [], allowPasswordChange = false }) => {
  // ========================================================
  // GET AUTHENTICATION DATA
  // ========================================================

  const token = localStorage.getItem("accessToken");

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  let user = null;

  // ========================================================
  // READ STORED USER
  // ========================================================

  try {
    const storedUser = localStorage.getItem("user");

    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data found in localStorage:", error);

    // ------------------------------------------------------
    // CLEAR INVALID AUTH DATA
    // ------------------------------------------------------

    localStorage.removeItem("accessToken");

    localStorage.removeItem("user");

    localStorage.removeItem("userRole");

    localStorage.removeItem("isAuthenticated");

    return <Navigate to="/login" replace />;
  }

  // ========================================================
  // AUTHENTICATION CHECK
  // ========================================================

  if (!token || !isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // ========================================================
  // AUTHORIZATION CHECK
  // ========================================================

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // ========================================================
  // FORCED PASSWORD CHANGE
  // ========================================================
  //
  // Only STUDENT accounts imported by Admin should normally
  // reach this state.
  //
  // If mustChangePassword is true:
  //
  // STUDENT
  //    ↓
  // /student/*
  //    ↓
  // /change-password
  //
  // However, the change-password route explicitly enables
  // allowPasswordChange so the user can access that page.
  //
  // ========================================================

  if (user.mustChangePassword === true && !allowPasswordChange) {
    return <Navigate to="/change-password" replace />;
  }

  // ========================================================
  // AUTHORIZED
  // ========================================================

  return <Outlet />;
};

export default ProtectedRoute;
