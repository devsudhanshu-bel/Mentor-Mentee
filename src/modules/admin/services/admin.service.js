import prisma from "../../../config/prisma.js";
import hodPrisma from "../../../config/prisma.hod.js";

import { hashPassword } from "../../../utils/hash.js";
import ApiError from "../../../utils/ApiError.js";

class AdminService {
  // ==========================================================
  // GET ALL MENTORS
  // ==========================================================

  async getMentors({
    search = "",
    departmentId = "",
    status = "",
    workload = "",
  } = {}) {
    // ========================================================
    // BUILD FILTER
    // ========================================================

    const where = {};

    // --------------------------------------------------------
    // Department
    // --------------------------------------------------------

    if (departmentId) {
      where.departmentId = departmentId;
    }

    // --------------------------------------------------------
    // Status
    // --------------------------------------------------------

    if (status === "Active") {
      where.isActive = true;
    }

    if (status === "Inactive") {
      where.isActive = false;
    }

    // --------------------------------------------------------
    // Search
    // --------------------------------------------------------

    if (search.trim()) {
      const searchValue = search.trim();

      where.OR = [
        {
          fullName: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          employeeCode: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
      ];
    }

    // ========================================================
    // FETCH MENTORS
    // ========================================================

    const mentors = await hodPrisma.teachers.findMany({
      where,

      select: {
        id: true,

        employeeCode: true,

        fullName: true,

        email: true,

        phone: true,

        designation: true,

        maxMentees: true,

        isActive: true,

        departmentId: true,

        departments_teachers_departmentIdTodepartments: {
          select: {
            id: true,

            name: true,

            code: true,
          },
        },

        mentor_assignments: {
          where: {
            status: "ACTIVE",
          },

          select: {
            id: true,

            students: {
              select: {
                overallAttendance: true,
              },
            },
          },
        },
      },

      orderBy: {
        fullName: "asc",
      },
    });

    // ========================================================
    // FORMAT MENTORS
    // ========================================================

    let formattedMentors = mentors.map((mentor) => {
      const currentMentees = mentor.mentor_assignments.length;

      const maxMentees = mentor.maxMentees || 0;

      const availableSlots = Math.max(maxMentees - currentMentees, 0);

      // ----------------------------------------------------
      // Attendance
      // ----------------------------------------------------

      const attendanceValues = mentor.mentor_assignments
        .map((assignment) => assignment.students?.overallAttendance)
        .filter((value) => typeof value === "number" && Number.isFinite(value));

      const averageAttendance = attendanceValues.length
        ? Math.round(
            attendanceValues.reduce((sum, value) => sum + value, 0) /
              attendanceValues.length,
          )
        : null;

      // ----------------------------------------------------
      // Workload
      // ----------------------------------------------------

      let workloadLevel = "Low";

      if (maxMentees > 0) {
        const utilization = (currentMentees / maxMentees) * 100;

        if (utilization >= 80) {
          workloadLevel = "High";
        } else if (utilization >= 50) {
          workloadLevel = "Medium";
        }
      }

      return {
        id: mentor.id,

        employeeCode: mentor.employeeCode,

        fullName: mentor.fullName,

        email: mentor.email,

        phone: mentor.phone,

        designation: mentor.designation,

        maxMentees,

        currentMentees,

        availableSlots,

        isActive: mentor.isActive,

        status: mentor.isActive ? "Active" : "Inactive",

        workload: workloadLevel,

        attendance: averageAttendance,

        // No meeting model currently exists.
        meetings: null,

        department: mentor.departments_teachers_departmentIdTodepartments,
      };
    });

    // ========================================================
    // WORKLOAD FILTER
    // ========================================================

    if (workload) {
      formattedMentors = formattedMentors.filter(
        (mentor) => mentor.workload === workload,
      );
    }

    // ========================================================
    // COUNTS
    // ========================================================

    const totalMentors = formattedMentors.length;

    const activeMentors = formattedMentors.filter(
      (mentor) => mentor.isActive,
    ).length;

    const mentorsWithStudents = formattedMentors.filter(
      (mentor) => mentor.currentMentees > 0,
    ).length;

    const totalAssignedStudents = formattedMentors.reduce(
      (sum, mentor) => sum + mentor.currentMentees,
      0,
    );

    const averageStudents =
      totalMentors > 0
        ? Number((totalAssignedStudents / totalMentors).toFixed(1))
        : 0;

    // ========================================================
    // DEPARTMENTS
    // ========================================================

    const departments = await hodPrisma.departments.findMany({
      select: {
        id: true,

        name: true,

        code: true,
      },

      orderBy: {
        name: "asc",
      },
    });

    // ========================================================
    // RESPONSE
    // ========================================================

    return {
      mentors: formattedMentors,

      counts: {
        totalMentors,

        activeMentors,

        mentorsWithStudents,

        averageStudents,

        totalAssignedStudents,
      },

      departments,
    };
  }

  // ==========================================================
  // CREATE MENTOR
  // ==========================================================

  async createMentor({ name, password }) {
    // --------------------------------------------------------
    // Validate
    // --------------------------------------------------------

    if (!name || !password) {
      throw new ApiError(400, "Name and password are required");
    }

    // --------------------------------------------------------
    // Username
    // --------------------------------------------------------

    const username = name.trim().toLowerCase().replace(/\s+/g, "");

    // --------------------------------------------------------
    // Email
    // --------------------------------------------------------

    const email = `${username}@mentor.com`;

    // --------------------------------------------------------
    // Existing user
    // --------------------------------------------------------

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },

          {
            email,
          },
        ],
      },
    });

    if (existingUser) {
      throw new ApiError(409, "Mentor already exists");
    }

    // --------------------------------------------------------
    // Hash password
    // --------------------------------------------------------

    const hashedPassword = await hashPassword(password);

    // --------------------------------------------------------
    // Create mentor
    // --------------------------------------------------------

    const mentor = await prisma.user.create({
      data: {
        fullName: name,

        username,

        email,

        password: hashedPassword,

        role: "MENTOR",

        isActive: true,
      },
    });

    // --------------------------------------------------------
    // Remove password
    // --------------------------------------------------------

    const { password: _password, ...mentorData } = mentor;

    return mentorData;
  }

  // ==========================================================
  // GET MENTOR DETAILS
  // ==========================================================

  async getMentorDetails(mentorId) {
    if (!mentorId) {
      throw new ApiError(400, "Mentor ID is required");
    }

    const mentor = await hodPrisma.teachers.findUnique({
      where: {
        id: mentorId,
      },

      select: {
        id: true,
        employeeCode: true,
        fullName: true,
        email: true,
        phone: true,
        designation: true,
        maxMentees: true,
        isActive: true,
        departmentId: true,

        teacher_profiles: {
          select: {
            profileImage: true,
            qualification: true,
            specialization: true,
            office: true,
            officeHours: true,
            about: true,
            linkedIn: true,
            googleScholar: true,
            researchGate: true,
            orcid: true,
            website: true,
          },
        },

        departments_teachers_departmentIdTodepartments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },

        mentor_assignments: {
          where: {
            status: "ACTIVE",
          },

          orderBy: {
            assignedAt: "desc",
          },

          select: {
            id: true,
            assignedAt: true,
            termId: true,

            students: {
              select: {
                id: true,
                registerNumber: true,
                fullName: true,
                email: true,
                phone: true,
                section: true,
                semester: true,
                currentCGPA: true,
                overallAttendance: true,
                status: true,
                profileImage: true,
                programme: true,

                departments: {
                  select: {
                    id: true,
                    name: true,
                    code: true,
                  },
                },
              },
            },

            academic_terms: {
              select: {
                id: true,
                name: true,
                semesterNumber: true,
                startDate: true,
                endDate: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!mentor) {
      throw new ApiError(404, "Mentor not found");
    }

    const assignments = mentor.mentor_assignments || [];

    const students = assignments
      .filter((assignment) => assignment.students)
      .map((assignment) => {
        const student = assignment.students;

        return {
          id: student.id,

          registerNumber: student.registerNumber,

          name: student.fullName,

          email: student.email || "No email",

          phone: student.phone || null,

          programme: student.programme || "—",

          semester: student.semester || "—",

          section: student.section || "—",

          currentCGPA: student.currentCGPA,

          attendance: student.overallAttendance,

          status: student.status === "ACTIVE" ? "Active" : student.status,

          profileImage: student.profileImage || null,

          department: student.departments
            ? {
                id: student.departments.id,

                name: student.departments.name,

                code: student.departments.code,
              }
            : null,

          assignedAt: assignment.assignedAt,

          term: assignment.academic_terms
            ? {
                id: assignment.academic_terms.id,

                name: assignment.academic_terms.name,

                semesterNumber: assignment.academic_terms.semesterNumber,

                status: assignment.academic_terms.status,
              }
            : null,
        };
      });

    const attendanceValues = students
      .map((student) => student.attendance)
      .filter((value) => typeof value === "number" && Number.isFinite(value));

    const averageAttendance =
      attendanceValues.length > 0
        ? Number(
            (
              attendanceValues.reduce((sum, value) => sum + value, 0) /
              attendanceValues.length
            ).toFixed(1),
          )
        : null;

    const cgpaValues = students
      .map((student) => student.currentCGPA)
      .filter((value) => typeof value === "number" && Number.isFinite(value));

    const averageCGPA =
      cgpaValues.length > 0
        ? Number(
            (
              cgpaValues.reduce((sum, value) => sum + value, 0) /
              cgpaValues.length
            ).toFixed(2),
          )
        : null;

    const assignedCount = students.length;

    const capacity = mentor.maxMentees || 0;

    const utilization =
      capacity > 0 ? Number(((assignedCount / capacity) * 100).toFixed(1)) : 0;

    return {
      mentor: {
        id: mentor.id,

        employeeCode: mentor.employeeCode,

        fullName: mentor.fullName,

        email: mentor.email,

        phone: mentor.phone,

        designation: mentor.designation,

        maxMentees: mentor.maxMentees,

        isActive: mentor.isActive,

        status: mentor.isActive ? "Active" : "Inactive",

        department: mentor.departments_teachers_departmentIdTodepartments,

        profile: mentor.teacher_profiles || null,
      },

      stats: {
        studentsAssigned: assignedCount,

        capacity,

        utilization,

        averageAttendance,

        averageCGPA,

        // No meeting/goal models currently
        // exist in the HOD schema.
        meetingsConducted: null,

        goalCompletion: null,
      },

      students,

      assignmentCount: assignments.length,
    };
  }
}

export default new AdminService();
