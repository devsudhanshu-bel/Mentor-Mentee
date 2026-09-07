import hodPrisma from "../../../config/prisma.hod.js";

import ApiError from "../../../utils/ApiError.js";

import { comparePassword } from "../../../utils/hash.js";

import { generateAccessToken } from "../../../utils/jwt.js";

class AuthService {
  /**
   * Login User
   *
   * Authentication is handled exclusively through
   * the HOD/Auth database (user_accounts).
   *
   * Login identifier:
   * - Email only
   *
   * Role:
   * - Retrieved from user_accounts
   */
  async login(email, password) {
    //--------------------------------------------------
    // Validate Login Input
    //--------------------------------------------------

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const normalizedEmail = email.trim().toLowerCase();

    //--------------------------------------------------
    // Find User
    //--------------------------------------------------

    const user = await hodPrisma.user_accounts.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    //--------------------------------------------------
    // Check Account Status
    //--------------------------------------------------

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been disabled");
    }

    //--------------------------------------------------
    // Verify Password
    //--------------------------------------------------

    if (!user.password) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    //--------------------------------------------------
    // Update Last Login
    //--------------------------------------------------

    await hodPrisma.user_accounts.update({
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
