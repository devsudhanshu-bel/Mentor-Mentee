import jwt from "jsonwebtoken";

import hodPrisma from "../config/prisma.hod.js";

import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  // ========================================================
  // GET TOKEN
  // ========================================================

  let token = null;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }

  // ========================================================
  // VERIFY TOKEN
  // ========================================================

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("❌ JWT Error:", error.message);

    throw new ApiError(401, "Invalid or expired token");
  }

  if (!decoded?.id) {
    throw new ApiError(401, "Invalid authentication token");
  }

  // ========================================================
  // FETCH USER FROM HOD AUTH DATABASE
  // ========================================================

  const user = await hodPrisma.user_accounts.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  // ========================================================
  // ACCOUNT STATUS
  // ========================================================

  if (!user.isActive) {
    throw new ApiError(403, "Your account has been disabled");
  }

  // ========================================================
  // SAFE USER
  // ========================================================

  const { password, ...safeUser } = user;

  req.user = safeUser;

  next();
});
