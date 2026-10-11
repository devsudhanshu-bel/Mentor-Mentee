import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

class StudentsService {
  /* ==========================================================
     GET STUDENTS ASSIGNED TO LOGGED-IN MENTOR
  ========================================================== */

  async getMyStudents(userId) {
    /* ========================================================
       1. FIND MENTOR
    ======================================================== */

    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        fullName: true,
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor teacher record not found.");
    }

    /* ========================================================
       2. FIND ACTIVE STUDENT ASSIGNMENTS
    ======================================================== */

    const assignments = await prisma.mentor_assignments.findMany({
      where: {
        teacherId: teacher.id,

        status: "ACTIVE",

        academic_terms: {
          status: "ACTIVE",
        },
      },

      select: {
        id: true,
        studentId: true,
        assignedAt: true,

        students: {
          select: {
            id: true,
            fullName: true,
            registerNumber: true,
            programme: true,
            semester: true,
            currentCGPA: true,
            profileImage: true,
            status: true,
          },
        },
      },

      orderBy: {
        assignedAt: "desc",
      },
    });

    /* ========================================================
       3. FORMAT STUDENT DATA
    ======================================================== */

    const students = assignments.map((assignment) => ({
      assignmentId: assignment.id,

      studentId: assignment.studentId,

      name: assignment.students?.fullName || "Unnamed Student",

      registerNumber: assignment.students?.registerNumber || null,

      programme: assignment.students?.programme || null,

      semester: assignment.students?.semester || null,

      currentCGPA: assignment.students?.currentCGPA ?? null,

      profileImage: assignment.students?.profileImage || null,

      status: assignment.students?.status || null,

      assignedAt: assignment.assignedAt,
    }));

    /* ========================================================
       4. RETURN RESPONSE
    ======================================================== */

    return {
      count: students.length,
      students,
    };
  }
}

export default new StudentsService();
