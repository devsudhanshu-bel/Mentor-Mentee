import prisma from "../../../config/prisma.js";

import ApiError from "../../../utils/ApiError.js";

class DashboardService {
  /**
   * Dashboard Banner
   */
  async getBanner(userId) {
    const mentor =
      await prisma.mentorProfile.findUnique({
        where: {
          userId,
        },
        include: {
          user: {
            select: {
              fullName: true,
            },
          },
        },
      });

    if (!mentor) {
      throw new ApiError(
        404,
        "Mentor profile not found"
      );
    }

    return {
      fullName: mentor.user.fullName,
      designation: mentor.designation,
      department: mentor.department,
      profileImage: mentor.profileImage,
    };
  }
}

export default new DashboardService();