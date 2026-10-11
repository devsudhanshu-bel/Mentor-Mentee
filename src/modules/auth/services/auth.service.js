import hodPrisma from "../../../config/prisma.hod.js";

import ApiError from "../../../utils/ApiError.js";

import { comparePassword, hashPassword } from "../../../utils/hash.js";

import { generateAccessToken } from "../../../utils/jwt.js";

class AuthService {
  // ========================================================
  // LOGIN USER
  // ========================================================

  async login(identifier, password) {
    // ======================================================
    // VALIDATION
    // ======================================================

    if (!identifier || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    // ======================================================
    // NORMALIZE EMAIL
    // ======================================================

    const normalizedEmail = identifier.trim().toLowerCase();

    // ======================================================
    // FIND USER ACCOUNT
    // ======================================================

    const user = await hodPrisma.user_accounts.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    // ======================================================
    // ACCOUNT STATUS
    // ======================================================

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been disabled");
    }

    // ======================================================
    // PASSWORD EXISTENCE
    // ======================================================

    if (!user.password) {
      throw new ApiError(401, "Invalid credentials");
    }

    // ======================================================
    // VERIFY PASSWORD
    // ======================================================

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    // ======================================================
    // UPDATE LAST LOGIN
    // ======================================================

    await hodPrisma.user_accounts.update({
      where: {
        id: user.id,
      },

      data: {
        lastLogin: new Date(),
      },
    });

    // ======================================================
    // GENERATE ACCESS TOKEN
    // ======================================================

    const token = generateAccessToken(user);

    // ======================================================
    // SAFE USER OBJECT
    // ======================================================

    const safeUser = {
      id: user.id,

      username: user.username,

      email: user.email,

      role: user.role,

      isActive: user.isActive,

      // ----------------------------------------------------
      // IMPORTANT
      // ----------------------------------------------------
      //
      // Imported students have:
      //
      // mustChangePassword = true
      //
      // Existing admin/mentor accounts normally have:
      //
      // mustChangePassword = false
      //
      // ----------------------------------------------------

      mustChangePassword: user.mustChangePassword,
    };

    // ======================================================
    // RESPONSE
    // ======================================================

    return {
      token,

      user: safeUser,
    };
  }

  // ========================================================
  // CHANGE PASSWORD
  // ========================================================

  async changePassword(userId, currentPassword, newPassword) {
    // ======================================================
    // VALIDATION
    // ======================================================

    if (!currentPassword || !newPassword) {
      throw new ApiError(400, "Current password and new password are required");
    }

    // ======================================================
    // PASSWORD LENGTH
    // ======================================================

    if (newPassword.length < 8) {
      throw new ApiError(
        400,
        "New password must contain at least 8 characters",
      );
    }

    // ======================================================
    // PASSWORD DIFFERENCE
    // ======================================================

    if (currentPassword === newPassword) {
      throw new ApiError(
        400,
        "New password must be different from the current password",
      );
    }

    // ======================================================
    // FIND USER
    // ======================================================

    const user = await hodPrisma.user_accounts.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApiError(404, "User account not found");
    }

    // ======================================================
    // ACCOUNT STATUS
    // ======================================================

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been disabled");
    }

    // ======================================================
    // PASSWORD EXISTENCE
    // ======================================================

    if (!user.password) {
      throw new ApiError(
        400,
        "This account does not have a password configured",
      );
    }

    // ======================================================
    // VERIFY CURRENT PASSWORD
    // ======================================================

    const passwordMatches = await comparePassword(
      currentPassword,
      user.password,
    );

    if (!passwordMatches) {
      throw new ApiError(401, "Current password is incorrect");
    }

    // ======================================================
    // HASH NEW PASSWORD
    // ======================================================

    const hashedPassword = await hashPassword(newPassword);

    // ======================================================
    // UPDATE PASSWORD
    // ======================================================

    await hodPrisma.user_accounts.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashedPassword,

        // --------------------------------------------------
        // IMPORTANT
        // --------------------------------------------------
        // The first-login requirement is now completed.
        // --------------------------------------------------

        mustChangePassword: false,

        updatedAt: new Date(),
      },
    });

    // ======================================================
    // RESPONSE
    // ======================================================

    return {
      message: "Password changed successfully",
    };
  }
}

export default new AuthService();
