import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token = null;

  /* ==========================================================
     Get Token
  ========================================================== */

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Future Support (Cookies)
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }

  /* ==========================================================
     Verify JWT
  ========================================================== */

  let decoded;

try {
  decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log("✅ Decoded:", decoded);

} catch (error) {
  console.log("❌ JWT Error Name:", error.name);
  console.log("❌ JWT Error Message:", error.message);

  throw new ApiError(401, "Invalid or expired token");
}

  /* ==========================================================
     Fetch User
  ========================================================== */

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account has been disabled");
  }

  /* ==========================================================
     Remove Password
  ========================================================== */

  const { password, ...safeUser } = user;

  req.user = safeUser;

  next();
});