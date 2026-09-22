import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

class StudentsService {
  /* ==========================================================
     GET MY STUDENTS
  ========================================================== */

  async getMyStudents(userId) {
    /*
     * Find the teacher record associated with
     * the currently authenticated mentor.
     */

    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },

      select: {
        id: true,
        fullName: true,
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
       FIND ACTIVE STUDENT ASSIGNMENTS
    ========================================================

       mentor_assignments contains:

       teacherId  → mentor
       studentId  → student
       termId     → academic term
       status     → assignment status

       We only want students who are:

       1. Assigned to the logged-in mentor
       2. Assignment is ACTIVE
       3. Academic term is ACTIVE
    ======================================================== */

    const assignments =
      await prisma.mentor_assignments.findMany({
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

          /* --------------------------------------------------
             STUDENT DETAILS
          -------------------------------------------------- */

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
       FORMAT RESPONSE
    ========================================================

       We are intentionally returning only the information
       required by the current Mentor → My Students page.

       Attendance and meeting information are NOT included.

       Those can be added later when their respective modules
       are implemented.
    ======================================================== */

    const students = assignments.map(
      (assignment) => ({
        assignmentId: assignment.id,

        studentId: assignment.studentId,

        name:
          assignment.students?.fullName ||
          "Unnamed Student",

        registerNumber:
          assignment.students?.registerNumber ||
          null,

        programme:
          assignment.students?.programme ||
          null,

        semester:
          assignment.students?.semester ||
          null,

        currentCGPA:
          assignment.students?.currentCGPA ??
          null,

        profileImage:
          assignment.students?.profileImage ||
          null,

        status:
          assignment.students?.status ||
          null,

        assignedAt:
          assignment.assignedAt,
      })
    );

    /* ========================================================
       RETURN
    ======================================================== */

    return {
      count: students.length,

      students,
    };
  }
}

export default new StudentsService();