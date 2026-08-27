import prisma from "../../../config/prisma.js";

import ApiError from "../../../utils/ApiError.js";

class DashboardService {
  /* ==========================================================
     Dashboard Banner
  ========================================================== */

  async getBanner(userId) {
    const admin = await prisma.adminProfile.findUnique({
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

    if (!admin) {
      throw new ApiError(
        404,
        "Admin profile not found. Please create your profile first."
      );
    }

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
      greeting = "Good Morning";
    } else if (hour < 17) {
      greeting = "Good Afternoon";
    }

    const currentDate = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return {
      greeting,
      adminName: admin.user.fullName,
      designation: admin.designation,
      profileImage: admin.profileImage,
      currentDate,
    };
  }
}

export default new DashboardService();