import { randomUUID } from "crypto";

import hodPrisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

// ============================================================
// ASSIGNMENT SERVICE
// ============================================================

class AssignmentService {
  // ============================================================
  // GET ASSIGNMENT CONTEXT
  // ============================================================

  async getAssignmentContext({
    academicYear,
    academicYearId,
    termId,
    departmentId,
    semesterNumber,
    section,
  } = {}) {
    // ============================================================
    // 1. GET ALL ACADEMIC YEARS
    // ============================================================

    const academicYears = await hodPrisma.academic_years.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        status: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    // ============================================================
    // 2. RESOLVE ACADEMIC YEAR
    // ============================================================

    let resolvedAcademicYearId = academicYearId || null;

    if (!resolvedAcademicYearId && academicYear) {
      const matchingAcademicYear = academicYears.find(
        (year) => year.id === academicYear || year.name === academicYear,
      );

      resolvedAcademicYearId = matchingAcademicYear?.id || null;
    }

    // ============================================================
    // 3. GET ALL TERMS
    // ============================================================

    const allTerms = await hodPrisma.academic_terms.findMany({
      select: {
        id: true,
        academicYearId: true,
        name: true,
        semesterNumber: true,
        startDate: true,
        endDate: true,
        status: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    // ============================================================
    // 4. DETERMINE TERM SCOPE
    // ============================================================

    let scopedTerms = [];
    let selectedTerm = null;

    if (termId) {
      selectedTerm = allTerms.find((term) => term.id === termId);

      if (!selectedTerm) {
        throw new ApiError(404, "Academic term not found");
      }

      scopedTerms = [selectedTerm];
    } else if (resolvedAcademicYearId) {
      scopedTerms = allTerms.filter(
        (term) => term.academicYearId === resolvedAcademicYearId,
      );

      selectedTerm = scopedTerms[0] || null;
    } else {
      selectedTerm =
        allTerms.find((term) => term.status === "ACTIVE") ||
        allTerms[0] ||
        null;

      scopedTerms = selectedTerm ? [selectedTerm] : [];
    }

    // ============================================================
    // 5. TERM IDS
    // ============================================================

    const scopedTermIds = scopedTerms.map((term) => term.id);

    // ============================================================
    // 6. RESOLVED ACADEMIC YEAR
    // ============================================================

    const resolvedAcademicYear = resolvedAcademicYearId
      ? academicYears.find((year) => year.id === resolvedAcademicYearId) || null
      : selectedTerm
        ? academicYears.find(
            (year) => year.id === selectedTerm.academicYearId,
          ) || null
        : null;

    // ============================================================
    // 7. BASE STUDENT SCOPE
    // ============================================================

    const baseStudentWhere = {
      status: "ACTIVE",
    };

    if (scopedTermIds.length > 0) {
      baseStudentWhere.student_enrollments = {
        some: {
          termId: {
            in: scopedTermIds,
          },
          status: "ACTIVE",
        },
      };
    }

    // ============================================================
    // 8. DEPARTMENT FILTER
    // ============================================================

    if (departmentId) {
      baseStudentWhere.departmentId = departmentId;
    }

    // ============================================================
    // 9. SEMESTER / YEAR FILTER
    // ============================================================

    if (
      semesterNumber !== undefined &&
      semesterNumber !== null &&
      semesterNumber !== ""
    ) {
      baseStudentWhere.semester = String(semesterNumber);
    }

    // ============================================================
    // 10. SECTION FILTER
    // ============================================================

    if (section && section !== "All Sections") {
      baseStudentWhere.section = section;
    }

    // ============================================================
    // 11. GET REAL STUDENTS
    // ============================================================

    let students = [];

    if (scopedTermIds.length > 0) {
      students = await hodPrisma.students.findMany({
        where: {
          ...baseStudentWhere,

          ...(termId
            ? {
                mentor_assignments: {
                  none: {
                    termId,
                    status: "ACTIVE",
                  },
                },
              }
            : {}),
        },

        select: {
          id: true,
          registerNumber: true,
          fullName: true,
          email: true,
          phone: true,
          profileImage: true,
          programme: true,
          semester: true,
          section: true,
          status: true,
          departmentId: true,

          departments: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },

          student_enrollments: {
            where: {
              termId: {
                in: scopedTermIds,
              },
              status: "ACTIVE",
            },

            select: {
              id: true,
              termId: true,
              semesterNumber: true,
              status: true,
            },
          },
        },

        orderBy: {
          registerNumber: "asc",
        },
      });
    }

    // ============================================================
    // 12. DEPARTMENT OPTIONS
    // ============================================================

    const departmentOptionWhere = {
      status: "ACTIVE",
    };

    if (scopedTermIds.length > 0) {
      departmentOptionWhere.student_enrollments = {
        some: {
          termId: {
            in: scopedTermIds,
          },
          status: "ACTIVE",
        },
      };
    }

    const departmentStudentRows = await hodPrisma.students.findMany({
      where: departmentOptionWhere,

      select: {
        departmentId: true,
      },

      distinct: ["departmentId"],
    });

    const departmentIds = departmentStudentRows
      .map((student) => student.departmentId)
      .filter(Boolean);

    const departments =
      departmentIds.length > 0
        ? await hodPrisma.departments.findMany({
            where: {
              id: {
                in: departmentIds,
              },
            },

            select: {
              id: true,
              name: true,
              code: true,
            },

            orderBy: {
              name: "asc",
            },
          })
        : [];

    // ============================================================
    // 13. YEAR OPTIONS
    // ============================================================

    const yearOptionWhere = {
      status: "ACTIVE",

      ...(scopedTermIds.length > 0
        ? {
            student_enrollments: {
              some: {
                termId: {
                  in: scopedTermIds,
                },
                status: "ACTIVE",
              },
            },
          }
        : {}),

      ...(departmentId
        ? {
            departmentId,
          }
        : {}),
    };

    const yearRows = await hodPrisma.students.findMany({
      where: yearOptionWhere,

      select: {
        semester: true,
      },

      distinct: ["semester"],
    });

    const semesters = [
      ...new Set(
        yearRows
          .map((student) => Number(student.semester))
          .filter((value) => Number.isFinite(value)),
      ),
    ].sort((a, b) => a - b);

    // ============================================================
    // 14. SECTION OPTIONS
    // ============================================================

    const sectionOptionWhere = {
      status: "ACTIVE",

      ...(scopedTermIds.length > 0
        ? {
            student_enrollments: {
              some: {
                termId: {
                  in: scopedTermIds,
                },
                status: "ACTIVE",
              },
            },
          }
        : {}),

      ...(departmentId
        ? {
            departmentId,
          }
        : {}),

      ...(semesterNumber !== undefined &&
      semesterNumber !== null &&
      semesterNumber !== ""
        ? {
            semester: String(semesterNumber),
          }
        : {}),
    };

    const sectionRows = await hodPrisma.students.findMany({
      where: sectionOptionWhere,

      select: {
        section: true,
      },

      distinct: ["section"],

      orderBy: {
        section: "asc",
      },
    });

    const sections = sectionRows
      .map((student) => student.section)
      .filter(Boolean);

    // ============================================================
    // 15. MENTORS
    // ============================================================

    const mentorWhere = {
      isActive: true,

      ...(departmentId
        ? {
            departmentId,
          }
        : {}),
    };

    const mentors = await hodPrisma.teachers.findMany({
      where: mentorWhere,

      select: {
        id: true,
        employeeCode: true,
        fullName: true,
        email: true,
        phone: true,
        designation: true,
        maxMentees: true,
        departmentId: true,

        departments_teachers_departmentIdTodepartments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },

        mentor_assignments: {
          where:
            scopedTermIds.length > 0
              ? {
                  termId: {
                    in: scopedTermIds,
                  },

                  status: "ACTIVE",
                }
              : {
                  status: "ACTIVE",
                },

          select: {
            id: true,
          },
        },
      },

      orderBy: {
        fullName: "asc",
      },
    });

    // ============================================================
    // 16. FORMAT MENTORS
    // ============================================================

    const formattedMentors = mentors.map((mentor) => {
      const currentMentees = mentor.mentor_assignments.length;

      const maxMentees = mentor.maxMentees || 0;

      const availableSlots = Math.max(maxMentees - currentMentees, 0);

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

        department: mentor.departments_teachers_departmentIdTodepartments,
      };
    });

    // ============================================================
    // 17. RETURN COMPLETE CONTEXT
    // ============================================================

    return {
      academicYear: resolvedAcademicYear
        ? {
            id: resolvedAcademicYear.id,
            name: resolvedAcademicYear.name,
            startDate: resolvedAcademicYear.startDate,
            endDate: resolvedAcademicYear.endDate,
            status: resolvedAcademicYear.status,
          }
        : null,

      term: selectedTerm
        ? {
            id: selectedTerm.id,
            academicYearId: selectedTerm.academicYearId,
            name: selectedTerm.name,
            semesterNumber: selectedTerm.semesterNumber,
            startDate: selectedTerm.startDate,
            endDate: selectedTerm.endDate,
            status: selectedTerm.status,
          }
        : null,

      termId: termId || selectedTerm?.id || null,

      filterOptions: {
        academicYears: academicYears.map((year) => ({
          id: year.id,
          name: year.name,
          startDate: year.startDate,
          endDate: year.endDate,
          status: year.status,
        })),

        terms: scopedTerms.map((term) => ({
          id: term.id,
          academicYearId: term.academicYearId,
          name: term.name,
          semesterNumber: term.semesterNumber,
          startDate: term.startDate,
          endDate: term.endDate,
          status: term.status,
        })),

        departments,

        years: semesters,

        sections,
      },

      students,

      mentors: formattedMentors,

      counts: {
        unassignedStudents: students.length,

        availableMentors: formattedMentors.filter(
          (mentor) => mentor.availableSlots > 0,
        ).length,

        totalMentors: formattedMentors.length,
      },
    };
  }

  // ============================================================
  // ASSIGN STUDENTS TO MENTOR
  // ============================================================

  async assignStudents({ studentIds, teacherId, termId, assignedBy }) {
    // ==========================================================
    // BASIC VALIDATION
    // ==========================================================

    if (!termId) {
      throw new ApiError(400, "Term ID is required");
    }

    if (!teacherId) {
      throw new ApiError(400, "Mentor ID is required");
    }

    if (!assignedBy) {
      throw new ApiError(400, "Assigned-by user ID is required");
    }

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      throw new ApiError(400, "At least one student must be selected");
    }

    const uniqueStudentIds = [...new Set(studentIds.filter(Boolean))];

    // ==========================================================
    // VERIFY TERM
    // ==========================================================

    const term = await hodPrisma.academic_terms.findUnique({
      where: {
        id: termId,
      },

      select: {
        id: true,
        semesterNumber: true,
        status: true,
      },
    });

    if (!term) {
      throw new ApiError(404, "Academic term not found");
    }

    // ==========================================================
    // VERIFY MENTOR
    // ==========================================================

    const mentor = await hodPrisma.teachers.findUnique({
      where: {
        id: teacherId,
      },

      select: {
        id: true,
        employeeCode: true,
        fullName: true,
        maxMentees: true,
        isActive: true,
        departmentId: true,
      },
    });

    if (!mentor) {
      throw new ApiError(404, "Mentor not found");
    }

    if (!mentor.isActive) {
      throw new ApiError(400, "Selected mentor is inactive");
    }

    // ==========================================================
    // VERIFY ASSIGNING USER
    // ==========================================================

    const assigningUser = await hodPrisma.user_accounts.findUnique({
      where: {
        id: assignedBy,
      },

      select: {
        id: true,
        role: true,
        isActive: true,
      },
    });

    if (!assigningUser) {
      throw new ApiError(404, "Assigning user account not found");
    }

    if (!assigningUser.isActive) {
      throw new ApiError(403, "Assigning user account is inactive");
    }

    // ==========================================================
    // FETCH STUDENTS
    // ==========================================================

    const students = await hodPrisma.students.findMany({
      where: {
        id: {
          in: uniqueStudentIds,
        },
      },

      select: {
        id: true,
        registerNumber: true,
        fullName: true,
        departmentId: true,
        status: true,

        student_enrollments: {
          where: {
            termId,
          },

          select: {
            id: true,
            semesterNumber: true,
            status: true,
          },
        },

        mentor_assignments: {
          where: {
            termId,
            status: "ACTIVE",
          },

          select: {
            id: true,
            teacherId: true,
          },
        },
      },
    });

    // ==========================================================
    // VERIFY ALL STUDENTS WERE FOUND
    // ==========================================================

    if (students.length !== uniqueStudentIds.length) {
      throw new ApiError(404, "One or more selected students were not found");
    }

    // ==========================================================
    // VALIDATE EACH STUDENT
    // ==========================================================

    for (const student of students) {
      if (student.status !== "ACTIVE") {
        throw new ApiError(
          400,
          `Student ${student.registerNumber} is not active`,
        );
      }

      const enrollment = student.student_enrollments[0];

      if (!enrollment) {
        throw new ApiError(
          400,
          `Student ${student.registerNumber} is not enrolled in the selected term`,
        );
      }

      if (enrollment.status !== "ACTIVE") {
        throw new ApiError(
          400,
          `Student ${student.registerNumber} does not have an active enrollment`,
        );
      }

      if (student.mentor_assignments.length > 0) {
        throw new ApiError(
          409,
          `Student ${student.registerNumber} is already assigned to a mentor for this term`,
        );
      }

      if (student.departmentId !== mentor.departmentId) {
        throw new ApiError(
          400,
          `Student ${student.registerNumber} and selected mentor belong to different departments`,
        );
      }
    }

    // ==========================================================
    // CHECK MENTOR CAPACITY
    // ==========================================================

    const currentAssignmentCount = await hodPrisma.mentor_assignments.count({
      where: {
        teacherId,
        termId,
        status: "ACTIVE",
      },
    });

    const availableCapacity = Math.max(
      (mentor.maxMentees || 0) - currentAssignmentCount,
      0,
    );

    if (uniqueStudentIds.length > availableCapacity) {
      throw new ApiError(
        400,
        `Mentor capacity exceeded. ${mentor.fullName} has only ${availableCapacity} available slot(s)`,
      );
    }

    // ==========================================================
    // CREATE ASSIGNMENTS
    // ==========================================================
    //
    // IMPORTANT:
    //
    // mentor_assignments.id is required by the Prisma schema.
    //
    // Therefore every assignment receives its own UUID.
    //
    // ==========================================================

    const assignments = await hodPrisma.$transaction(async (tx) => {
      const created = [];

      for (const student of students) {
        const assignment = await tx.mentor_assignments.create({
          data: {
            id: randomUUID(),

            studentId: student.id,

            teacherId,

            termId,

            status: "ACTIVE",

            assignedBy,

            assignedAt: new Date(),

            updatedAt: new Date(),
          },

          select: {
            id: true,
            studentId: true,
            teacherId: true,
            termId: true,
            status: true,
            assignedAt: true,
          },
        });

        created.push(assignment);
      }

      return created;
    });

    // ==========================================================
    // SUCCESS RESPONSE
    // ==========================================================

    return {
      message: `${assignments.length} student(s) assigned successfully`,

      mentor: {
        id: mentor.id,

        employeeCode: mentor.employeeCode,

        fullName: mentor.fullName,
      },

      termId,

      assignments,
    };
  }

  // ============================================================
  // GET ALL ASSIGNMENTS
  // ============================================================

  async getAllAssignments({ termId, departmentId, teacherId, search } = {}) {
    if (!termId) {
      throw new ApiError(400, "Term ID is required");
    }

    const where = {
      termId,
      status: "ACTIVE",
    };

    if (departmentId) {
      where.students = {
        departmentId,
      };
    }

    if (teacherId) {
      where.teacherId = teacherId;
    }

    if (search && search.trim()) {
      const searchValue = search.trim();

      where.students = {
        ...(where.students || {}),

        OR: [
          {
            registerNumber: {
              contains: searchValue,
              mode: "insensitive",
            },
          },

          {
            fullName: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    return await hodPrisma.mentor_assignments.findMany({
      where,

      select: {
        id: true,
        studentId: true,
        teacherId: true,
        termId: true,
        status: true,
        assignedAt: true,

        students: {
          select: {
            id: true,
            registerNumber: true,
            fullName: true,
            email: true,
            semester: true,
            section: true,
          },
        },

        teachers: {
          select: {
            id: true,
            employeeCode: true,
            fullName: true,
            email: true,
          },
        },

        academic_terms: {
          select: {
            id: true,
            academicYearId: true,
            semesterNumber: true,
            name: true,
            status: true,
          },
        },
      },

      orderBy: {
        assignedAt: "desc",
      },
    });
  }
}

// ============================================================
// EXPORT
// ============================================================

export default new AssignmentService();
