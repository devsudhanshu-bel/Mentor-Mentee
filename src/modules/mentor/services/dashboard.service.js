
import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

class DashboardService {
  // ==========================================================
  // GET ACTIVE MENTOR
  // ==========================================================

  async getMentor(userId) {
    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },
      select: {
        id: true,
        fullName: true,
        designation: true,
        departmentId: true,
        isActive: true,
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

    if (!teacher || !teacher.isActive) {
      throw new ApiError(404, "Active mentor teacher record not found.");
    }

    return teacher;
  }

  // ==========================================================
  // DASHBOARD BANNER
  // Existing functionality preserved.
  // ==========================================================

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

  // ==========================================================
  // MENTOR DASHBOARD OVERVIEW
  // GET /api/mentor/dashboard/overview
  // ==========================================================

  async getOverview(userId) {
    const mentor = await this.getMentor(userId);

    const now = new Date();
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const activeAssignmentWhere = {
      teacherId: mentor.id,
      status: "ACTIVE",
    };

    const assignedStudentIds = await prisma.mentor_assignments.findMany({
      where: activeAssignmentWhere,
      select: {
        studentId: true,
      },
      distinct: ["studentId"],
    });

    const studentIds = assignedStudentIds.map(
      (assignment) => assignment.studentId
    );

    const studentWhere = {
      id: {
        in: studentIds,
      },
    };

    const meetingWhere = {
      mentorTeacherId: mentor.id,
    };

    const [
      assignedStudents,
      upcomingMeetings,
      todaysMeetings,
      pendingInitialInternships,
      pendingCompletionInternships,
    ] = await Promise.all([
      prisma.mentor_assignments.count({
        where: activeAssignmentWhere,
      }),

      prisma.mentor_meetings.findMany({
        where: {
          ...meetingWhere,
          status: "SCHEDULED",
          startAt: {
            gte: now,
          },
        },
        orderBy: {
          startAt: "asc",
        },
        take: 5,
        include: {
          students: {
            select: {
              id: true,
              fullName: true,
              registerNumber: true,
              profileImage: true,
            },
          },
        },
      }),

      prisma.mentor_meetings.findMany({
        where: {
          ...meetingWhere,
          startAt: {
            gte: dayStart,
            lt: dayEnd,
          },
          status: {
            in: ["SCHEDULED", "IN_PROGRESS"],
          },
        },
        orderBy: {
          startAt: "asc",
        },
        include: {
          students: {
            select: {
              id: true,
              fullName: true,
              registerNumber: true,
              profileImage: true,
            },
          },
        },
      }),

      studentIds.length
        ? prisma.student_internships.findMany({
            where: {
              studentId: studentWhere.id,
              verificationStatus: "PENDING",
            },
            orderBy: {
              createdAt: "asc",
            },
            take: 10,
            include: {
              student: {
                select: {
                  id: true,
                  fullName: true,
                  registerNumber: true,
                },
              },
            },
          })
        : Promise.resolve([]),

      studentIds.length
        ? prisma.student_internships.findMany({
            where: {
              studentId: studentWhere.id,
              completionRequested: true,
              completionVerificationStatus: "PENDING",
            },
            orderBy: {
              completionRequestedAt: "asc",
            },
            take: 10,
            include: {
              student: {
                select: {
                  id: true,
                  fullName: true,
                  registerNumber: true,
                },
              },
            },
          })
        : Promise.resolve([]),
    ]);

    const pendingInternshipReviews = [
      ...pendingInitialInternships.map((internship) => ({
        id: internship.id,
        type: "INITIAL_INTERNSHIP_VERIFICATION",
        title: "Review internship",
        description: `${internship.student.fullName} · ${internship.companyName}`,
        studentId: internship.student.id,
        studentName: internship.student.fullName,
        registerNumber: internship.student.registerNumber,
        createdAt: internship.createdAt,
      })),
      ...pendingCompletionInternships.map((internship) => ({
        id: internship.id,
        type: "INTERNSHIP_COMPLETION_VERIFICATION",
        title: "Review internship completion",
        description: `${internship.student.fullName} · ${internship.companyName}`,
        studentId: internship.student.id,
        studentName: internship.student.fullName,
        registerNumber: internship.student.registerNumber,
        createdAt: internship.completionRequestedAt,
      })),
    ].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });

    return {
      mentor: {
        id: mentor.id,
        fullName: mentor.fullName || "Mentor",
        designation: mentor.designation || "",
        department:
          mentor.departments_teachers_departmentIdTodepartments?.name || "",
        profileImage: mentor.teacher_profiles?.profileImage || null,
      },

      stats: {
        assignedStudents: new Set(studentIds).size,
        upcomingMeetings: await prisma.mentor_meetings.count({
          where: {
            ...meetingWhere,
            status: "SCHEDULED",
            startAt: {
              gte: now,
            },
          },
        }),
        pendingInternshipReviews:
          pendingInitialInternships.length +
          pendingCompletionInternships.length,
      },

      todaysMeetings,
      upcomingMeetings,

      upcomingDeadlines: pendingInternshipReviews.slice(0, 8),
    };
  }
}

export default new DashboardService();
