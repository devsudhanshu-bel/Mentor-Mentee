
import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

const ROMAN_TO_NUMBER = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
};

const getCurrentSemesterNumber = (semester) => {
  if (semester === null || semester === undefined) {
    return 1;
  }

  const value = String(semester).trim().toUpperCase();
  const numericMatch = value.match(/\d+/);

  if (numericMatch) {
    const number = Number(numericMatch[0]);

    if (number >= 1 && number <= 8) {
      return number;
    }
  }

  for (const [roman, number] of Object.entries(ROMAN_TO_NUMBER)) {
    if (
      value === roman ||
      value.includes(`SEMESTER ${roman}`)
    ) {
      return number;
    }
  }

  return 1;
};

const validateSemesterNumber = (value) => {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1 || number > 8) {
    throw new ApiError(
      400,
      "Semester number must be between 1 and 8",
    );
  }

  return number;
};

class MentorAcademicsService {
  /* ========================================================
     VERIFY MENTOR-STUDENT ASSIGNMENT
  ======================================================== */

  async getAssignedStudent(mentorUserId, studentId) {
    if (!studentId || typeof studentId !== "string") {
      throw new ApiError(400, "A valid student ID is required");
    }

    const teacher = await prisma.teachers.findUnique({
      where: {
        userAccountId: mentorUserId,
      },
      select: {
        id: true,
      },
    });

    if (!teacher) {
      throw new ApiError(404, "Mentor teacher record not found");
    }

    const assignment = await prisma.mentor_assignments.findFirst({
      where: {
        teacherId: teacher.id,
        studentId,
        status: "ACTIVE",
        academic_terms: {
          status: "ACTIVE",
        },
      },
      select: {
        id: true,
        studentId: true,
      },
    });

    if (!assignment) {
      throw new ApiError(
        403,
        "You are not authorized to view this student's academic records",
      );
    }

    const student = await prisma.students.findUnique({
      where: {
        id: assignment.studentId,
      },
      select: {
        id: true,
        fullName: true,
        registerNumber: true,
        email: true,
        programme: true,
        semester: true,
        profileImage: true,
        status: true,
        academicSetupCompleted: true,
        currentCGPA: true,
        totalCredits: true,
        overallAttendance: true,
        academicStanding: true,
      },
    });

    if (!student) {
      throw new ApiError(404, "Student profile not found");
    }

    return student;
  }

  /* ========================================================
     GET COMPLETE ACADEMIC OVERVIEW
  ======================================================== */

  async getProfile(mentorUserId, studentId) {
    const student = await this.getAssignedStudent(
      mentorUserId,
      studentId,
    );

    const records = await prisma.academic_semesters.findMany({
      where: {
        studentId: student.id,
      },
      orderBy: {
        semesterNumber: "asc",
      },
      select: {
        id: true,
        semesterNumber: true,
        status: true,
        entryStatus: true,
        sgpa: true,
        totalCredits: true,
        creditsEarned: true,
        backlogs: true,
      },
    });

    const currentSemester = getCurrentSemesterNumber(
      student.semester,
    );

    const recordMap = new Map(
      records.map((record) => [
        record.semesterNumber,
        record,
      ]),
    );

    const semesters = Array.from(
      { length: 8 },
      (_, index) => {
        const semesterNumber = index + 1;
        const record = recordMap.get(semesterNumber);

        let status = "LOCKED";

        if (record) {
          status = record.status;
        } else if (semesterNumber === currentSemester) {
          status = "CURRENT";
        } else if (semesterNumber < currentSemester) {
          status = "NO_RECORD";
        }

        return {
          semesterNumber,
          status,
          hasRecord: Boolean(record),
          sgpa: record?.sgpa ?? null,
          totalCredits: record?.totalCredits ?? 0,
          creditsEarned: record?.creditsEarned ?? 0,
          backlogs: record?.backlogs ?? 0,
        };
      },
    );

    const completedPreviousSemesters = records.filter(
      (record) =>
        record.semesterNumber < currentSemester &&
        record.status === "COMPLETED",
    ).length;

    const backlogCounts = await prisma.academic_backlogs.groupBy({
      by: ["status"],
      where: {
        studentId: student.id,
      },
      _count: {
        _all: true,
      },
    });

    const backlogSummary = {
      active: 0,
      cleared: 0,
    };

    backlogCounts.forEach((item) => {
      if (item.status === "ACTIVE") {
        backlogSummary.active = item._count._all;
      }

      if (item.status === "CLEARED") {
        backlogSummary.cleared = item._count._all;
      }
    });

    return {
      student: {
        id: student.id,
        fullName: student.fullName,
        registerNumber: student.registerNumber,
        email: student.email,
        programme: student.programme,
        semester: student.semester,
        profileImage: student.profileImage,
        status: student.status,
      },

      academicSetupCompleted: student.academicSetupCompleted,
      currentSemester,
      completedPreviousSemesters,

      semesters,

      overall: {
        currentCGPA: student.currentCGPA,
        totalCredits: student.totalCredits,
        overallAttendance: student.overallAttendance,
        academicStanding: student.academicStanding,
      },

      backlogSummary,
    };
  }

  /* ========================================================
     GET A SINGLE SEMESTER
  ======================================================== */

  async getSemester(
    mentorUserId,
    studentId,
    semesterNumber,
  ) {
    const number = validateSemesterNumber(semesterNumber);

    const student = await this.getAssignedStudent(
      mentorUserId,
      studentId,
    );

    const currentSemester = getCurrentSemesterNumber(
      student.semester,
    );

    if (number > currentSemester) {
      throw new ApiError(403, "This semester is currently locked");
    }

    const record = await prisma.academic_semesters.findUnique({
      where: {
        studentId_semesterNumber: {
          studentId: student.id,
          semesterNumber: number,
        },
      },

      include: {
        subjects: {
          orderBy: {
            courseCode: "asc",
          },
        },
      },
    });

    if (!record) {
      return {
        id: null,
        studentId: student.id,
        semesterNumber: number,
        status:
          number === currentSemester
            ? "CURRENT"
            : "NO_RECORD",
        sgpa: null,
        totalCredits: 0,
        creditsEarned: 0,
        backlogs: 0,
        subjects: [],
      };
    }

    return record;
  }

  /* ========================================================
     GET BACKLOGS
  ======================================================== */

  async getBacklogs(mentorUserId, studentId) {
    const student = await this.getAssignedStudent(
      mentorUserId,
      studentId,
    );

    const backlogs = await prisma.academic_backlogs.findMany({
      where: {
        studentId: student.id,
      },
      orderBy: [
        {
          status: "asc",
        },
        {
          semesterNumber: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });

    return {
      backlogs,
      activeCount: backlogs.filter(
        (item) => item.status === "ACTIVE",
      ).length,
      clearedCount: backlogs.filter(
        (item) => item.status === "CLEARED",
      ).length,
    };
  }
}

export default new MentorAcademicsService();
