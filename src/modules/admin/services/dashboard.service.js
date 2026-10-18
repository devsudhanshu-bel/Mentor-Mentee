import hodPrisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

class DashboardService {
  /* ==========================================================
     VERIFY ADMIN ACCOUNT
  ========================================================== */

  async getAdminAccount(userId) {
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

    if (!["ADMIN", "SYSTEM_ADMIN"].includes(admin.role)) {
      throw new ApiError(
        403,
        "This account cannot access the Admin dashboard."
      );
    }

    return admin;
  }

  /* ==========================================================
     FIND ACTIVE ACADEMIC TERM
  ========================================================== */

  async getActiveAcademicTerm() {
    return hodPrisma.academic_terms.findFirst({
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
  }

  /* ==========================================================
     BUILD ACTIVE ASSIGNMENT FILTER
  ========================================================== */

  buildAssignmentWhere(activeTerm) {
    return {
      status: "ACTIVE",

      ...(activeTerm
        ? {
            termId: activeTerm.id,
          }
        : {}),
    };
  }

  /* ==========================================================
     PROFILE OVERVIEW STATISTICS
  ========================================================== */

  async getProfileOverview(userId) {
    await this.getAdminAccount(userId);

    const activeTerm = await this.getActiveAcademicTerm();

    const assignmentWhere = this.buildAssignmentWhere(activeTerm);

    const [
      totalMentors,
      totalStudents,
      assignedStudents,
      attendanceAggregate,
      completedMeetings,
    ] = await Promise.all([
      // Active mentors.
      hodPrisma.teachers.count({
        where: {
          isActive: true,
        },
      }),

      // Active students.
      hodPrisma.students.count({
        where: {
          status: "ACTIVE",
        },
      }),

      // Active assignments for the current term.
      hodPrisma.mentor_assignments.count({
        where: assignmentWhere,
      }),

      // Average attendance among active students
      // who have an attendance value.
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

      // Total completed meetings across all mentors.
      hodPrisma.mentor_meetings.count({
        where: {
          status: "COMPLETED",
        },
      }),
    ]);

    const unassignedStudents = Math.max(
      totalStudents - assignedStudents,
      0
    );

    const averageAttendance =
      attendanceAggregate._avg.overallAttendance != null
        ? Number(
            attendanceAggregate._avg.overallAttendance.toFixed(1)
          )
        : null;

    return {
      mentors: totalMentors,
      students: totalStudents,

      // Total completed meetings across all mentors.
      meetings: completedMeetings,

      // Null means attendance data is unavailable.
      attendance: averageAttendance,

      assignedStudents,
      unassignedStudents,

      academicTerm: activeTerm,
    };
  }

  /* ==========================================================
     ADMIN DASHBOARD OVERVIEW
  ========================================================== */

  async getOverview(userId) {
    const admin = await this.getAdminAccount(userId);

    const activeTerm = await this.getActiveAcademicTerm();

    const assignmentWhere = this.buildAssignmentWhere(activeTerm);

    const [
      totalMentors,
      totalStudents,
      assignedStudents,
      attendanceAggregate,
      completedMeetings,
    ] = await Promise.all([
      // Active mentors.
      hodPrisma.teachers.count({
        where: {
          isActive: true,
        },
      }),

      // Active students.
      hodPrisma.students.count({
        where: {
          status: "ACTIVE",
        },
      }),

      // Active assignments for the current term.
      hodPrisma.mentor_assignments.count({
        where: assignmentWhere,
      }),

      // Average attendance.
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

      // Total completed meetings across all mentors.
      hodPrisma.mentor_meetings.count({
        where: {
          status: "COMPLETED",
        },
      }),
    ]);

    const unassignedStudents = Math.max(
      totalStudents - assignedStudents,
      0
    );

    const averageAttendance =
      attendanceAggregate._avg.overallAttendance != null
        ? Number(
            attendanceAggregate._avg.overallAttendance.toFixed(1)
          )
        : null;

    // Mentor workload.
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

    // Pending transfer requests.
    const pendingTransfers =
      await hodPrisma.mentor_transfer_requests.findMany({
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
      {}
    );

    // Format mentor workload.
    const mentorWorkload = mentors
      .map((mentor) => {
        const students = mentor.mentor_assignments.length;
        const capacity = mentor.maxMentees || 0;

        const utilization =
          capacity > 0 ? (students / capacity) * 100 : 0;

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

          pendingTransfers:
            pendingTransferCountByMentor[mentor.id] || 0,

          status,

          profileImage:
            mentor.teacher_profiles?.profileImage || null,
        };
      })
      .sort((a, b) => b.students - a.students);

    const topMentors = mentorWorkload.slice(0, 5);

    // Meeting metrics are now supported by mentor_meetings.
    // Goal metrics remain unsupported.
    const unsupportedMetrics = {
      meetings: false,
      goals: false,
    };

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

        meetingsConducted: completedMeetings,
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
    const admin = await this.getAdminAccount(userId);

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