import jwt from "jsonwebtoken";

/**
 * Generate Access Token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};