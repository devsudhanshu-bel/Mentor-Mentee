import prisma from "../../../config/prisma.js";

import { hashPassword } from "../../../utils/hash.js";
import ApiError from "../../../utils/ApiError.js";

class AdminService {
  /**
   * Create Mentor
   */
  async createMentor({ name, password }) {
    // Validate input
    if (!name || !password) {
      throw new ApiError(400, "Name and password are required");
    }

    // Generate username
    const username = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

    // Generate email
    const email = `${username}@mentor.com`;

    // Check if mentor already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      throw new ApiError(409, "Mentor already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create mentor
    const mentor = await prisma.user.create({
      data: {
        fullName: name,
        username,
        email,
        password: hashedPassword,
        role: "MENTOR",
        isActive: true
      }
    });

    // Remove password before returning
    const { password: _, ...mentorData } = mentor;

    return mentorData;
  }
}

export default new AdminService();