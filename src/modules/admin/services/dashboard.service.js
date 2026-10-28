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
     MEETING STATISTICS
     Completed: All completed meetings across all mentors.
     Upcoming: Scheduled meetings within the next 7 days.
  ========================================================== */

  async getMeetingStatistics() {
    const now = new Date();

    const nextSevenDays = new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const [completedMeetings, upcomingMeetings] =
      await Promise.all([
        hodPrisma.mentor_meetings.count({
          where: {
            status: "COMPLETED",
          },
        }),

        hodPrisma.mentor_meetings.count({
          where: {
            status: "SCHEDULED",

            startAt: {
              gte: now,
              lt: nextSevenDays,
            },
          },
        }),
      ]);

    return {
      completedMeetings,
      upcomingMeetings,
    };
  }

  /* ==========================================================
     SHARED STUDENT AND ASSIGNMENT STATISTICS
  ========================================================== */

  async getCoreStatistics(activeTerm) {
    const assignmentWhere = this.buildAssignmentWhere(activeTerm);

    const [
      totalMentors,
      totalStudents,
      assignedStudents,
      attendanceAggregate,
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

      // Active assignments for the current academic term.
      hodPrisma.mentor_assignments.count({
        where: assignmentWhere,
      }),

      // Average attendance for active students with attendance data.
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
      totalMentors,
      totalStudents,
      assignedStudents,
      unassignedStudents,
      averageAttendance,
    };
  }

  /* ==========================================================
     PROFILE OVERVIEW STATISTICS
  ========================================================== */

  async getProfileOverview(userId) {
    // These reads are independent, so do not wait for one before starting the other.
    const [, activeTerm] = await Promise.all([
      this.getAdminAccount(userId),
      this.getActiveAcademicTerm(),
    ]);

    const [statistics, meetingStatistics] = await Promise.all([
      this.getCoreStatistics(activeTerm),
      this.getMeetingStatistics(),
    ]);

    return {
      mentors: statistics.totalMentors,
      students: statistics.totalStudents,

      // Completed meetings across all mentors and all dates.
      meetings: meetingStatistics.completedMeetings,

      attendance: statistics.averageAttendance,

      assignedStudents: statistics.assignedStudents,
      unassignedStudents: statistics.unassignedStudents,

      academicTerm: activeTerm,
    };
  }

  /* ==========================================================
     ADMIN DASHBOARD OVERVIEW
  ========================================================== */

  async getOverview(userId) {
    // Temporary diagnostic timings. These logs contain durations only, not user data.
    const requestStartedAt = Date.now();
    const logStage = (stage, startedAt) => {
      console.info(`[ADMIN DASHBOARD TIMING] ${stage}: ${Date.now() - startedAt}ms`);
    };

    // Account validation and active-term lookup are independent database reads.
    const initialStageStartedAt = Date.now();
    const [admin, activeTerm] = await Promise.all([
      this.getAdminAccount(userId),
      this.getActiveAcademicTerm(),
    ]);
    logStage("account + active term (parallel total)", initialStageStartedAt);

    const assignmentWhere = this.buildAssignmentWhere(activeTerm);

    // Run all remaining independent reads together instead of serially waiting
    // for statistics, mentor workload, and pending transfers one after another.
    const dataStageStartedAt = Date.now();
    const [statistics, meetingStatistics, mentors, pendingTransfers] =
      await Promise.all([
        this.getCoreStatistics(activeTerm),
        this.getMeetingStatistics(),
        hodPrisma.teachers.findMany({
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
        }),
        hodPrisma.mentor_transfer_requests.findMany({
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
        }),
      ]);
    logStage("statistics + meetings + mentor workload + transfers (parallel total)", dataStageStartedAt);

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

    // --------------------------------------------------
    // FORMAT MENTOR WORKLOAD
    // --------------------------------------------------

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

    // --------------------------------------------------
    // METRIC AVAILABILITY
    // --------------------------------------------------

    const unsupportedMetrics = {
      meetings: false,
      goals: true,
    };

    console.info(`[ADMIN DASHBOARD TIMING] getOverview total before response: ${Date.now() - requestStartedAt}ms`);

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    return {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },

      academicTerm: activeTerm,

      kpis: {
        totalMentors: statistics.totalMentors,
        totalStudents: statistics.totalStudents,
        assignedStudents: statistics.assignedStudents,
        unassignedStudents: statistics.unassignedStudents,
        averageAttendance: statistics.averageAttendance,

        meetingsConducted: meetingStatistics.completedMeetings,
        upcomingMeetings: meetingStatistics.upcomingMeetings,

        // Goals are not implemented yet.
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