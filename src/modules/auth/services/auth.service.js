import prisma from "../../../config/prisma.js";

import ApiError from "../../../utils/ApiError.js";

import { comparePassword } from "../../../utils/hash.js";

import { generateAccessToken } from "../../../utils/jwt.js";

class AuthService {
  /**
   * Login User
   */
  async login(identifier, password) {
    //--------------------------------------------------
    // Find User
    //--------------------------------------------------

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier },
        ],
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    //--------------------------------------------------
    // Check Account Status
    //--------------------------------------------------

    if (!user.isActive) {
      throw new ApiError(
        403,
        "Your account has been disabled"
      );
    }

    //--------------------------------------------------
    // Verify Password
    //--------------------------------------------------

    const isPasswordCorrect = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    //--------------------------------------------------
    // Update Last Login
    //--------------------------------------------------

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    //--------------------------------------------------
    // Generate JWT
    //--------------------------------------------------

    const token = generateAccessToken(user);

    //--------------------------------------------------
    // Build Safe User Object
    //--------------------------------------------------

    const safeUser = {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };

    //--------------------------------------------------
    // Response
    //--------------------------------------------------

    return {
      token,
      user: safeUser,
    };
  }
}

export default new AuthService();