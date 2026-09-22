import prisma from "../../../config/prisma.hod.js";

import ApiError from "../../../utils/ApiError.js";

class DashboardService {
  /* ==========================================================
     DASHBOARD BANNER
  ========================================================== */

  async getBanner(userId) {
    /*
     * Find the teacher associated with the
     * currently authenticated mentor account.
     *
     * userId comes from:
     *
     * req.user.id
     *
     * Relationship:
     *
     * user_accounts.id
     *        ↓
     * teachers.userAccountId
     */

    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,

        fullName: true,

        designation: true,

        /* ----------------------------------------------------
           Department
        ---------------------------------------------------- */

        departments_teachers_departmentIdTodepartments: {
          select: {
            name: true,
          },
        },

        /* ----------------------------------------------------
           Teacher Profile
        ---------------------------------------------------- */

        teacher_profiles: {
          select: {
            profileImage: true,
          },
        },
      },
    });

    /* ========================================================
       MENTOR NOT FOUND
    ======================================================== */

    if (!teacher) {
      throw new ApiError(
        404,
        "Mentor teacher record not found."
      );
    }

    /* ========================================================
       RETURN BANNER DATA
    ======================================================== */

    return {
      fullName:
        teacher.fullName || "Mentor",

      designation:
        teacher.designation || "",

      department:
        teacher
          .departments_teachers_departmentIdTodepartments
          ?.name || "",

      profileImage:
        teacher.teacher_profiles
          ?.profileImage || null,
    };
  }
}

export default new DashboardService();