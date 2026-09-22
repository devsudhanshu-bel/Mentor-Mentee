import hodPrisma from "../../../config/prisma.hod.js";

import ApiError from "../../../utils/ApiError.js";

class DashboardService {
  /* ==========================================================
     ADMIN DASHBOARD OVERVIEW
  ========================================================== */

  async getOverview(userId) {
    // ========================================================
    // 1. VERIFY ADMIN ACCOUNT
    // ========================================================

    const admin = await hodPrisma.user_accounts.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!admin) {
      throw new ApiError(404, "Admin account not found.");
    }

    // ========================================================
    // 2. FIND CURRENT ACTIVE ACADEMIC TERM
    // ========================================================

    const activeTerm = await hodPrisma.academic_terms.findFirst({
      where: {
        status: "ACTIVE",
      },

      orderBy: {
        startDate: "desc",
      },

      select: {
        id: true,
        name: true,
        semesterNumber: true,
        startDate: true,
        endDate: true,
        status: true,
      },
    });

    // ========================================================
    // 3. ASSIGNMENT FILTER
    // ========================================================

    const assignmentWhere = {
      status: "ACTIVE",
      ...(activeTerm
        ? {
            termId: activeTerm.id,
          }
        : {}),
    };

    // ========================================================
    // 4. BASIC COUNTS
    // ========================================================

    const [totalMentors, totalStudents, assignedStudents, attendanceAggregate] =
      await Promise.all([
        // ------------------------------------------------------
        // Active mentors
        // ------------------------------------------------------

        hodPrisma.teachers.count({
          where: {
            isActive: true,
          },
        }),

        // ------------------------------------------------------
        // Active students
        // ------------------------------------------------------

        hodPrisma.students.count({
          where: {
            status: "ACTIVE",
          },
        }),

        // ------------------------------------------------------
        // Current active assignments
        // ------------------------------------------------------

        hodPrisma.mentor_assignments.count({
          where: assignmentWhere,
        }),

        // ------------------------------------------------------
        // Average attendance
        // ------------------------------------------------------

        hodPrisma.students.aggregate({
          where: {
            status: "ACTIVE",

            overallAttendance: {
              not: null,
            },
          },

          _avg: {
            overallAttendance: true,
          },
        }),
      ]);

    // ========================================================
    // 5. UNASSIGNED STUDENTS
    // ========================================================

    const unassignedStudents = Math.max(totalStudents - assignedStudents, 0);

    // ========================================================
    // 6. AVERAGE ATTENDANCE
    // ========================================================

    const averageAttendance =
      attendanceAggregate._avg.overallAttendance !== null
        ? Number(attendanceAggregate._avg.overallAttendance.toFixed(1))
        : null;

    // ========================================================
    // 7. MENTOR WORKLOAD
    // ========================================================

    const mentors = await hodPrisma.teachers.findMany({
      where: {
        isActive: true,
      },

      select: {
        id: true,
        employeeCode: true,
        fullName: true,
        designation: true,
        maxMentees: true,

        teacher_profiles: {
          select: {
            profileImage: true,
          },
        },

        mentor_assignments: {
          where: assignmentWhere,

          select: {
            id: true,
          },
        },
      },

      orderBy: {
        fullName: "asc",
      },
    });

    // ========================================================
    // 8. PENDING TRANSFER REQUESTS
    //
    // These are real pending workflow records from the
    // HOD database.
    // ========================================================

    const pendingTransfers = await hodPrisma.mentor_transfer_requests.findMany({
      where: {
        status: "PENDING",

        ...(activeTerm
          ? {
              termId: activeTerm.id,
            }
          : {}),
      },

      select: {
        currentMentorId: true,
      },
    });

    const pendingTransferCountByMentor = pendingTransfers.reduce(
      (result, request) => {
        if (!request.currentMentorId) {
          return result;
        }

        result[request.currentMentorId] =
          (result[request.currentMentorId] || 0) + 1;

        return result;
      },
      {},
    );

    // ========================================================
    // 9. FORMAT WORKLOAD
    // ========================================================

    const mentorWorkload = mentors
      .map((mentor) => {
        const students = mentor.mentor_assignments.length;

        const capacity = mentor.maxMentees || 0;

        const utilization = capacity > 0 ? (students / capacity) * 100 : 0;

        let status = "Active";

        if (utilization >= 80) {
          status = "Moderate";
        }

        if (utilization >= 100) {
          status = "High";
        }

        return {
          id: mentor.id,

          employeeCode: mentor.employeeCode,

          name: mentor.fullName,

          designation: mentor.designation || "Faculty Mentor",

          students,

          capacity,

          utilization: Number(utilization.toFixed(1)),

          pendingTransfers: pendingTransferCountByMentor[mentor.id] || 0,

          status,

          profileImage: mentor.teacher_profiles?.profileImage || null,
        };
      })
      .sort((a, b) => b.students - a.students);

    // ========================================================
    // 10. TOP 5 MENTORS
    // ========================================================

    const topMentors = mentorWorkload.slice(0, 5);

    // ========================================================
    // 11. DATA AVAILABILITY
    //
    // There are currently NO meeting/goal models in the
    // HOD Prisma schema.
    //
    // Therefore we intentionally do NOT fabricate numbers.
    // ========================================================

    const unsupportedMetrics = {
      meetings: false,
      goals: false,
    };

    // ========================================================
    // 12. RESPONSE
    // ========================================================

    return {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },

      academicTerm: activeTerm,

      kpis: {
        totalMentors,

        totalStudents,

        assignedStudents,

        unassignedStudents,

        averageAttendance,

        meetingsConducted: null,

        upcomingMeetings: null,

        activeGoals: null,
      },

      mentorWorkload: topMentors,

      unsupportedMetrics,
    };
  }

  /* ==========================================================
     DASHBOARD BANNER
  ========================================================== */

  async getBanner(userId) {
    const admin = await hodPrisma.user_accounts.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!admin) {
      throw new ApiError(404, "Admin account not found.");
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

      adminName: admin.username || admin.email || "Administrator",

      designation:
        admin.role === "SYSTEM_ADMIN"
          ? "System Administrator"
          : "Administrator",

      currentDate,
    };
  }
}

export default new DashboardService();
