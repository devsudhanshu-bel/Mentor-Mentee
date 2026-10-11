import hodPrisma from "../../../../config/prisma.hod.js";

class MentorService {
  /**
   * Get the mentor assigned to the currently logged-in student.
   *
   * Flow:
   * JWT → req.user.id
   *      ↓
   * user_accounts.id
   *      ↓
   * students.userAccountId
   *      ↓
   * mentor_assignments.studentId
   *      ↓
   * teachers
   *      ↓
   * teacher_profiles / departments
   */
  async getMyMentor(userAccountId) {
    // ---------------------------------------------------------
    // 1. Resolve the student from the authenticated user
    // ---------------------------------------------------------
    const student = await hodPrisma.students.findUnique({
      where: {
        userAccountId,
      },
      select: {
        id: true,
        registerNumber: true,
        fullName: true,
        userAccountId: true,
      },
    });

    if (!student) {
      throw new Error("Student profile not found");
    }

    // ---------------------------------------------------------
    // 2. Find the student's currently active mentor assignment
    // ---------------------------------------------------------
    const assignment = await hodPrisma.mentor_assignments.findFirst({
      where: {
        studentId: student.id,
        status: "ACTIVE",
      },
      orderBy: {
        assignedAt: "desc",
      },
      include: {
        teachers: {
          include: {
            teacher_profiles: true,
            departments: true,
          },
        },
        academic_terms: true,
      },
    });

    // ---------------------------------------------------------
    // 3. No mentor assigned
    // ---------------------------------------------------------
    if (!assignment) {
      return {
        assigned: false,
        student: {
          id: student.id,
          registerNumber: student.registerNumber,
          fullName: student.fullName,
        },
        mentor: null,
        assignment: null,
      };
    }

    // ---------------------------------------------------------
    // 4. Return normalized mentor information
    // ---------------------------------------------------------
    const teacher = assignment.teachers;

    return {
      assigned: true,

      student: {
        id: student.id,
        registerNumber: student.registerNumber,
        fullName: student.fullName,
      },

      mentor: teacher
        ? {
            id: teacher.id,
            employeeCode: teacher.employeeCode,
            fullName: teacher.fullName,
            email: teacher.email,
            phone: teacher.phone,
            designation: teacher.designation,
            isActive: teacher.isActive,

            profile: teacher.teacher_profiles
              ? {
                  ...teacher.teacher_profiles,
                }
              : null,

            department: teacher.departments
              ? {
                  ...teacher.departments,
                }
              : null,
          }
        : null,

      assignment: {
        id: assignment.id,
        status: assignment.status,
        assignedAt: assignment.assignedAt,
        endedAt: assignment.endedAt,
        assignedBy: assignment.assignedBy,

        term: assignment.academic_terms
          ? {
              ...assignment.academic_terms,
            }
          : null,
      },
    };
  }
}

export default new MentorService();
