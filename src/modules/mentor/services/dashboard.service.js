import prisma from "../../../config/prisma.hod.js";

import ApiError from "../../../utils/ApiError.js";

class DashboardService {
  /* ==========================================================
     DASHBOARD BANNER
  ========================================================== */

  async getBanner(userId) {
    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        fullName: true,
        designation: true,

        departments_teachers_departmentIdTodepartments: {
          select: {
            name: true,
          },
        },

        teacher_profiles: {
          select: {
            profileImage: true,
          },
        },
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor teacher record not found.");
    }

    return {
      fullName: teacher.fullName || "Mentor",

      designation: teacher.designation || "",

      department:
        teacher.departments_teachers_departmentIdTodepartments?.name || "",

      profileImage: teacher.teacher_profiles?.profileImage || null,
    };
  }
}

export default new DashboardService();
