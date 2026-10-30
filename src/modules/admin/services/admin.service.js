import crypto from "node:crypto";
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

  async createMentor({
    fullName,
    name,
    employeeCode,
    email,
    username,
    password,
    departmentId,
    phone = null,
    designation = null,
    maxMentees = 30,
    isActive = true,
  }) {
    // Keep compatibility with older callers that send `name`.
    const normalizedName = String(fullName ?? name ?? "").trim();
    const normalizedEmployeeCode = String(employeeCode ?? "").trim();
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    const normalizedUsername = String(username ?? "").trim().toLowerCase();
    const normalizedDepartmentId = String(departmentId ?? "").trim();
    const normalizedPassword = String(password ?? "");
    const capacity = Number(maxMentees);

    if (!normalizedName || !normalizedEmployeeCode || !normalizedEmail ||
        !normalizedUsername || !normalizedDepartmentId || !normalizedPassword) {
      throw new ApiError(
        400,
        "Full name, employee code, email, username, password, and department are required.",
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      throw new ApiError(400, "Enter a valid email address.");
    }
    if (normalizedPassword.length < 8) {
      throw new ApiError(400, "Temporary password must contain at least 8 characters.");
    }
    if (!/^[a-z0-9._-]{3,60}$/.test(normalizedUsername)) {
      throw new ApiError(400, "Username must be 3–60 characters and contain only letters, numbers, dots, underscores, or hyphens.");
    }
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 500) {
      throw new ApiError(400, "Maximum mentees must be a whole number between 1 and 500.");
    }

    const department = await hodPrisma.departments.findUnique({
      where: { id: normalizedDepartmentId },
      select: { id: true, name: true },
    });
    if (!department) throw new ApiError(400, "Selected department does not exist.");

    const [existingAccount, existingTeacher] = await Promise.all([
      hodPrisma.user_accounts.findFirst({
        where: { OR: [{ username: normalizedUsername }, { email: normalizedEmail }] },
        select: { id: true, username: true, email: true },
      }),
      hodPrisma.teachers.findUnique({
        where: { employeeCode: normalizedEmployeeCode },
        select: { id: true },
      }),
    ]);
    if (existingAccount) {
      if (existingAccount.username === normalizedUsername) {
        throw new ApiError(409, "That username is already in use.");
      }
      throw new ApiError(409, "An account with that email already exists.");
    }
    if (existingTeacher) throw new ApiError(409, "That employee code is already in use.");

    const now = new Date();
    const userId = crypto.randomUUID();
    const teacherId = crypto.randomUUID();
    const passwordHash = await hashPassword(normalizedPassword);

    try {
      await hodPrisma.$transaction(async (tx) => {
        await tx.user_accounts.create({
          data: {
            id: userId,
            username: normalizedUsername,
            email: normalizedEmail,
            password: passwordHash,
            role: "MENTOR",
            isActive: Boolean(isActive),
            mustChangePassword: true,
            createdAt: now,
            updatedAt: now,
          },
        });

        await tx.teachers.create({
          data: {
            id: teacherId,
            employeeCode: normalizedEmployeeCode,
            fullName: normalizedName,
            email: normalizedEmail,
            phone: phone ? String(phone).trim() : null,
            designation: designation ? String(designation).trim() : null,
            maxMentees: capacity,
            isActive: Boolean(isActive),
            departmentId: department.id,
            userAccountId: userId,
            createdAt: now,
            updatedAt: now,
          },
        });

        // Create the optional profile row so the existing mentor profile
        // editor can update its fields without a separate profile bootstrap.
        await tx.teacher_profiles.create({
          data: {
            id: crypto.randomUUID(),
            teacherId,
            createdAt: now,
            updatedAt: now,
          },
        });
      });
    } catch (error) {
      if (error?.code === "P2002") {
        throw new ApiError(409, "Username, email, or employee code is already in use.");
      }
      throw error;
    }

    return {
      id: teacherId,
      userAccountId: userId,
      fullName: normalizedName,
      employeeCode: normalizedEmployeeCode,
      email: normalizedEmail,
      username: normalizedUsername,
      phone: phone ? String(phone).trim() : null,
      designation: designation ? String(designation).trim() : null,
      department: { id: department.id, name: department.name },
      maxMentees: capacity,
      isActive: Boolean(isActive),
      mustChangePassword: true,
    };
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

  // ==========================================================
  // ADMIN STUDENT DIRECTORY WITH CURRENT MENTOR ASSIGNMENTS
  // ==========================================================
  async getStudentDirectory({ search = "", semester = "", sort = "name-asc", mentorId = "" } = {}) {
    const where = {};
    const term = String(search || "").trim();
    if (term) {
      where.OR = [
        { fullName: { contains: term, mode: "insensitive" } },
        { registerNumber: { contains: term, mode: "insensitive" } },
        { email: { contains: term, mode: "insensitive" } },
      ];
    }
    if (semester) where.semester = String(semester);

    // Only students with an ACTIVE assignment to the selected mentor.
    // Students without active assignments remain visible when "All mentors" is selected.
    if (mentorId) {
      where.mentor_assignments = {
        some: {
          status: "ACTIVE",
          teachers: { id: String(mentorId) },
        },
      };
    }

    const orderBy = sort === "name-desc" ? { fullName: "desc" }
      : sort === "semester-desc" ? { semester: "desc" }
      : { fullName: "asc" };

    const students = await hodPrisma.students.findMany({
      where, orderBy,
      select: {
        id: true, registerNumber: true, fullName: true, email: true, phone: true,
        status: true, profileImage: true, programme: true, semester: true,
        currentCGPA: true, overallAttendance: true, departmentId: true,
        mentor_assignments: {
          where: { status: "ACTIVE" },
          orderBy: { assignedAt: "desc" },
          select: { id: true, status: true, assignedAt: true, termId: true,
            teachers: { select: { id: true, fullName: true, employeeCode: true, email: true, designation: true, isActive: true,
              departments_teachers_departmentIdTodepartments: { select: { id: true, name: true, code: true } } } },
            academic_terms: { select: { id: true, name: true, semesterNumber: true, status: true } },
          },
        },
      },
    });

    return {
      total: students.length,
      students: students.map((student) => {
        const assignments = student.mentor_assignments || [];
        const current = assignments[0] || null;
        return {
          id: student.id, registerNumber: student.registerNumber, fullName: student.fullName,
          email: student.email, phone: student.phone, status: student.status,
          profileImage: student.profileImage, programme: student.programme, semester: student.semester,
          currentCGPA: student.currentCGPA, overallAttendance: student.overallAttendance,
          mentor: current?.teachers ? {
            id: current.teachers.id, fullName: current.teachers.fullName,
            employeeCode: current.teachers.employeeCode, email: current.teachers.email,
            designation: current.teachers.designation, isActive: current.teachers.isActive,
            department: current.teachers.departments_teachers_departmentIdTodepartments,
            assignmentStatus: current.status, assignedAt: current.assignedAt,
            term: current.academic_terms,
          } : null,
          activeAssignmentCount: assignments.length,
        };
      }),
    };
  }
}

export default new AdminService();
