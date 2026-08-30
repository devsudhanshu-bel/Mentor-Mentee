import prisma from "../../../../config/prisma.js";
import ApiError from "../../../../utils/ApiError.js";

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

const GRADE_POINTS = {
  O: 10,
  "A+": 10,
  A: 9,
  "A-": 8,
  "B+": 7,
  B: 6,
  "B-": 5,
  C: 5,
  P: 4,
  F: 0,
};

const getCurrentSemesterNumber = (semester) => {
  if (semester === null || semester === undefined) return 1;

  const value = String(semester).trim().toUpperCase();

  const numeric = Number(value.replace(/[^0-9]/g, ""));

  if (numeric >= 1 && numeric <= 8) {
    return numeric;
  }

  for (const [roman, number] of Object.entries(ROMAN_TO_NUMBER)) {
    if (value.includes(roman)) {
      return number;
    }
  }

  return 1;
};

const validateSemesterNumber = (semesterNumber) => {
  const number = Number(semesterNumber);

  if (!Number.isInteger(number) || number < 1 || number > 8) {
    throw new ApiError(400, "Semester number must be between 1 and 8");
  }

  return number;
};

const normaliseSubject = (subject) => {
  if (!subject?.courseCode || !subject?.courseName) {
    throw new ApiError(400, "Course code and course name are required");
  }

  const credits = Number(subject.credits);

  if (!Number.isFinite(credits) || credits <= 0) {
    throw new ApiError(400, `Invalid credits for ${subject.courseCode}`);
  }

  const totalMarksObtained =
    subject.totalMarksObtained !== undefined &&
    subject.totalMarksObtained !== null &&
    subject.totalMarksObtained !== ""
      ? Number(subject.totalMarksObtained)
      : [subject.cia1, subject.mse, subject.cia3, subject.ese]
          .filter(
            (value) => value !== undefined && value !== null && value !== "",
          )
          .reduce((sum, value) => sum + Number(value), 0);

  const grade = subject.grade?.trim() || null;

  const gradePoint =
    subject.gradePoint !== undefined &&
    subject.gradePoint !== null &&
    subject.gradePoint !== ""
      ? Number(subject.gradePoint)
      : grade && GRADE_POINTS[grade] !== undefined
        ? GRADE_POINTS[grade]
        : null;

  return {
    courseCode: String(subject.courseCode).trim().toUpperCase(),

    courseName: String(subject.courseName).trim(),

    credits,

    cia1:
      subject.cia1 === "" || subject.cia1 == null ? null : Number(subject.cia1),

    mse: subject.mse === "" || subject.mse == null ? null : Number(subject.mse),

    cia3:
      subject.cia3 === "" || subject.cia3 == null ? null : Number(subject.cia3),

    ese: subject.ese === "" || subject.ese == null ? null : Number(subject.ese),

    maximumMarks:
      subject.maximumMarks === "" || subject.maximumMarks == null
        ? null
        : Number(subject.maximumMarks),

    totalMarksObtained: Number.isFinite(totalMarksObtained)
      ? totalMarksObtained
      : null,

    grade,

    gradePoint: Number.isFinite(gradePoint) ? gradePoint : null,

    attendance:
      subject.attendance === "" || subject.attendance == null
        ? null
        : Number(subject.attendance),
  };
};

const calculateSemester = (subjects) => {
  const totalCredits = subjects.reduce(
    (sum, subject) => sum + subject.credits,
    0,
  );

  const creditsEarned = subjects.reduce(
    (sum, subject) => sum + (subject.grade === "F" ? 0 : subject.credits),
    0,
  );

  const backlogs = subjects.filter((subject) => subject.grade === "F").length;

  const gradedSubjects = subjects.filter((subject) =>
    Number.isFinite(subject.gradePoint),
  );

  const weightedPoints = gradedSubjects.reduce(
    (sum, subject) => sum + subject.credits * subject.gradePoint,
    0,
  );

  const gradedCredits = gradedSubjects.reduce(
    (sum, subject) => sum + subject.credits,
    0,
  );

  return {
    totalCredits,
    creditsEarned,
    backlogs,

    sgpa: gradedCredits
      ? Number((weightedPoints / gradedCredits).toFixed(2))
      : null,

    status: backlogs === 0 ? "COMPLETED" : "FAILED",
  };
};

class AcademicService {
  // =========================================================
  // GET ACADEMIC PROFILE
  // =========================================================

  async getProfile(userId) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },

      include: {
        academicSemesters: {
          orderBy: {
            semesterNumber: "asc",
          },

          include: {
            subjects: {
              orderBy: {
                courseCode: "asc",
              },
            },
          },
        },
      },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    const currentSemester = getCurrentSemesterNumber(profile.semester);

    const records = profile.academicSemesters;

    const recordMap = new Map(
      records.map((record) => [record.semesterNumber, record]),
    );

    const semesters = Array.from({ length: 8 }, (_, index) => {
      const semesterNumber = index + 1;

      const record = recordMap.get(semesterNumber);

      let status = "LOCKED";

      if (record) {
        status = record.status;
      } else if (semesterNumber < currentSemester) {
        status = "CURRENT";
      } else if (semesterNumber === currentSemester) {
        status = "CURRENT";
      } else if (
        semesterNumber === currentSemester + 1 &&
        recordMap.get(currentSemester)?.status === "COMPLETED"
      ) {
        status = "CURRENT";
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
    });

    const completedPreviousSemesters = records.filter(
      (record) =>
        record.semesterNumber < currentSemester &&
        record.status === "COMPLETED",
    ).length;

    return {
      studentProfileId: profile.id,

      currentSemester,

      setupCompleted: profile.academicSetupCompleted,

      completedPreviousSemesters,

      semesters,

      overall: {
        currentCGPA: profile.currentCGPA,

        totalCredits: profile.totalCredits,

        overallAttendance: profile.overallAttendance,

        academicStanding: profile.academicStanding,
      },
    };
  }

  // =========================================================
  // GET SEMESTER
  // =========================================================

  async getSemester(userId, semesterNumber) {
    const number = validateSemesterNumber(semesterNumber);

    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    const currentSemester = getCurrentSemesterNumber(profile.semester);

    const record = await prisma.academicSemester.findUnique({
      where: {
        studentProfileId_semesterNumber: {
          studentProfileId: profile.id,

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

    const currentRecord = await prisma.academicSemester.findUnique({
      where: {
        studentProfileId_semesterNumber: {
          studentProfileId: profile.id,

          semesterNumber: currentSemester,
        },
      },
    });

    const unlocked =
      number < currentSemester ||
      (number === currentSemester + 1 && currentRecord?.status === "COMPLETED");

    if (!unlocked) {
      throw new ApiError(403, "This semester is currently locked");
    }

    return (
      record || {
        id: null,

        semesterNumber: number,

        status: number === currentSemester ? "CURRENT" : "LOCKED",

        entryStatus: "DRAFT",

        sgpa: null,

        totalCredits: 0,

        creditsEarned: 0,

        backlogs: 0,

        subjects: [],
      }
    );
  }

  // =========================================================
  // SAVE SEMESTER
  // =========================================================

  async saveSemester(userId, body) {
    const semesterNumber = validateSemesterNumber(body.semesterNumber);

    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    const currentSemester = getCurrentSemesterNumber(profile.semester);

    const existingCurrent = await prisma.academicSemester.findUnique({
      where: {
        studentProfileId_semesterNumber: {
          studentProfileId: profile.id,

          semesterNumber: currentSemester,
        },
      },
    });

    const allowed =
      semesterNumber < currentSemester ||
      (semesterNumber === currentSemester + 1 &&
        existingCurrent?.status === "COMPLETED");

    if (!allowed) {
      throw new ApiError(403, "This semester is currently locked");
    }

    if (!Array.isArray(body.subjects) || body.subjects.length === 0) {
      throw new ApiError(400, "At least one subject is required");
    }

    const subjects = body.subjects.map(normaliseSubject);

    const calculated = calculateSemester(subjects);

    const result = await prisma.$transaction(async (tx) => {
      const semester = await tx.academicSemester.upsert({
        where: {
          studentProfileId_semesterNumber: {
            studentProfileId: profile.id,

            semesterNumber: semesterNumber,
          },
        },

        create: {
          studentProfileId: profile.id,

          semesterNumber,

          academicYear: body.academicYear || null,

          term: body.term || null,

          status: calculated.status,

          entryStatus: "SUBMITTED",

          ...calculated,
        },

        update: {
          academicYear: body.academicYear || null,

          term: body.term || null,

          status: calculated.status,

          entryStatus: "SUBMITTED",

          ...calculated,
        },
      });

      await tx.academicSubject.deleteMany({
        where: {
          academicSemesterId: semester.id,
        },
      });

      await tx.academicSubject.createMany({
        data: subjects.map((subject) => ({
          academicSemesterId: semester.id,

          ...subject,
        })),
      });

      const allSemesters = await tx.academicSemester.findMany({
        where: {
          studentProfileId: profile.id,
        },

        include: {
          subjects: true,
        },
      });

      const graded = allSemesters
        .flatMap((item) => item.subjects)
        .filter((subject) => subject.gradePoint != null);

      const cgpaCredits = graded.reduce(
        (sum, subject) => sum + subject.credits,
        0,
      );

      const cgpaPoints = graded.reduce(
        (sum, subject) => sum + subject.credits * subject.gradePoint,
        0,
      );

      const totalCredits = allSemesters.reduce(
        (sum, item) => sum + item.creditsEarned,
        0,
      );

      const attendanceValues = allSemesters
        .flatMap((item) => item.subjects.map((subject) => subject.attendance))
        .filter((value) => value != null);

      await tx.studentProfile.update({
        where: {
          id: profile.id,
        },

        data: {
          academicSetupCompleted:
            profile.academicSetupCompleted || semesterNumber < currentSemester,

          totalCredits,

          currentCGPA: cgpaCredits
            ? Number((cgpaPoints / cgpaCredits).toFixed(2))
            : null,

          overallAttendance: attendanceValues.length
            ? Number(
                (
                  attendanceValues.reduce((sum, value) => sum + value, 0) /
                  attendanceValues.length
                ).toFixed(2),
              )
            : null,

          academicStanding:
            calculated.backlogs === 0 ? "Excellent" : "Needs Attention",
        },
      });

      return tx.academicSemester.findUnique({
        where: {
          id: semester.id,
        },

        include: {
          subjects: {
            orderBy: {
              courseCode: "asc",
            },
          },
        },
      });
    });

    return result;
  }

  // =========================================================
  // UPDATE EXISTING SEMESTER
  // =========================================================

  async updateSemester(userId, semesterNumber, body) {
    // -------------------------------------------------------
    // Validate semester number
    // -------------------------------------------------------

    const number = validateSemesterNumber(semesterNumber);

    // -------------------------------------------------------
    // Find student profile
    // -------------------------------------------------------

    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    // -------------------------------------------------------
    // Determine current semester
    // -------------------------------------------------------

    const currentSemester = getCurrentSemesterNumber(profile.semester);

    // -------------------------------------------------------
    // Only previous semesters can be edited.
    //
    // Current and future semesters remain locked.
    // -------------------------------------------------------

    if (number >= currentSemester) {
      throw new ApiError(
        403,
        `Semester ${number} is currently locked and cannot be edited`,
      );
    }

    // -------------------------------------------------------
    // Check whether the semester actually exists
    // -------------------------------------------------------

    const existingSemester = await prisma.academicSemester.findUnique({
      where: {
        studentProfileId_semesterNumber: {
          studentProfileId: profile.id,

          semesterNumber: number,
        },
      },

      include: {
        subjects: true,
      },
    });

    if (!existingSemester) {
      throw new ApiError(
        404,
        `Academic record for Semester ${number} does not exist`,
      );
    }

    // -------------------------------------------------------
    // Validate subjects
    // -------------------------------------------------------

    if (!Array.isArray(body.subjects) || body.subjects.length === 0) {
      throw new ApiError(400, "At least one subject is required");
    }

    // -------------------------------------------------------
    // Normalise subjects
    // -------------------------------------------------------

    const subjects = body.subjects.map(normaliseSubject);

    // -------------------------------------------------------
    // Recalculate semester values
    //
    // This means editing a mark/grade/credit will
    // automatically recalculate:
    //
    // - Total Credits
    // - Credits Earned
    // - Backlogs
    // - SGPA
    // - Semester Status
    // -------------------------------------------------------

    const calculated = calculateSemester(subjects);

    // -------------------------------------------------------
    // Transaction
    // -------------------------------------------------------

    const result = await prisma.$transaction(async (tx) => {
      // -------------------------------------------------
      // Update semester
      // -------------------------------------------------

      const semester = await tx.academicSemester.update({
        where: {
          id: existingSemester.id,
        },

        data: {
          academicYear:
            body.academicYear !== undefined
              ? body.academicYear
              : existingSemester.academicYear,

          term: body.term !== undefined ? body.term : existingSemester.term,

          status: calculated.status,

          entryStatus: "SUBMITTED",

          ...calculated,
        },
      });

      // -------------------------------------------------
      // Remove old subjects
      //
      // We replace ONLY subjects belonging to this
      // semester.
      //
      // No other semester is touched.
      // -------------------------------------------------

      await tx.academicSubject.deleteMany({
        where: {
          academicSemesterId: semester.id,
        },
      });

      // -------------------------------------------------
      // Insert edited subjects
      // -------------------------------------------------

      await tx.academicSubject.createMany({
        data: subjects.map((subject) => ({
          academicSemesterId: semester.id,

          ...subject,
        })),
      });

      // -------------------------------------------------
      // Recalculate student-wide academic values
      // -------------------------------------------------

      const allSemesters = await tx.academicSemester.findMany({
        where: {
          studentProfileId: profile.id,
        },

        include: {
          subjects: true,
        },
      });

      // -------------------------------------------------
      // CGPA calculation
      // -------------------------------------------------

      const gradedSubjects = allSemesters
        .flatMap((item) => item.subjects)
        .filter(
          (subject) =>
            subject.gradePoint !== null && subject.gradePoint !== undefined,
        );

      const cgpaCredits = gradedSubjects.reduce(
        (sum, subject) => sum + Number(subject.credits || 0),
        0,
      );

      const cgpaPoints = gradedSubjects.reduce(
        (sum, subject) =>
          sum + Number(subject.credits || 0) * Number(subject.gradePoint || 0),
        0,
      );

      const currentCGPA =
        cgpaCredits > 0 ? Number((cgpaPoints / cgpaCredits).toFixed(2)) : null;

      // -------------------------------------------------
      // Total credits
      // -------------------------------------------------

      const totalCredits = allSemesters.reduce(
        (sum, semesterRecord) =>
          sum + Number(semesterRecord.creditsEarned || 0),
        0,
      );

      // -------------------------------------------------
      // Attendance
      // -------------------------------------------------

      const attendanceValues = allSemesters
        .flatMap((semesterRecord) =>
          semesterRecord.subjects.map((subject) => subject.attendance),
        )
        .filter((value) => value !== null && value !== undefined);

      const overallAttendance =
        attendanceValues.length > 0
          ? Number(
              (
                attendanceValues.reduce(
                  (sum, value) => sum + Number(value),
                  0,
                ) / attendanceValues.length
              ).toFixed(2),
            )
          : null;

      // -------------------------------------------------
      // Overall backlog count
      // -------------------------------------------------

      const overallBacklogs = allSemesters.reduce(
        (total, semesterRecord) => total + Number(semesterRecord.backlogs || 0),
        0,
      );

      // -------------------------------------------------
      // Academic standing
      // -------------------------------------------------

      let academicStanding = "Excellent";

      if (overallBacklogs > 0) {
        academicStanding = "Needs Attention";
      } else if (currentCGPA !== null && currentCGPA < 2) {
        academicStanding = "Needs Improvement";
      } else if (currentCGPA !== null && currentCGPA < 2.5) {
        academicStanding = "Satisfactory";
      } else if (currentCGPA !== null && currentCGPA < 3) {
        academicStanding = "Good";
      } else if (currentCGPA !== null && currentCGPA < 3.5) {
        academicStanding = "Very Good";
      }

      // -------------------------------------------------
      // Update StudentProfile
      // -------------------------------------------------

      await tx.studentProfile.update({
        where: {
          id: profile.id,
        },

        data: {
          totalCredits,

          currentCGPA,

          overallAttendance,

          academicStanding,
        },
      });

      // -------------------------------------------------
      // Return updated semester
      // -------------------------------------------------

      return tx.academicSemester.findUnique({
        where: {
          id: semester.id,
        },

        include: {
          subjects: {
            orderBy: {
              courseCode: "asc",
            },
          },
        },
      });
    });

    return result;
  }

  // =========================================================
  // BACKLOG MANAGEMENT
  // =========================================================

  async getBacklogs(userId) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    const backlogs = await prisma.academicBacklog.findMany({
      where: {
        studentProfileId: profile.id,
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

      activeCount: backlogs.filter((backlog) => backlog.status === "ACTIVE")
        .length,

      clearedCount: backlogs.filter((backlog) => backlog.status === "CLEARED")
        .length,
    };
  }

  // =========================================================
  // CREATE BACKLOG
  // =========================================================

  async createBacklog(userId, body) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    // -------------------------------------------------------
    // SUBJECT CODE
    // -------------------------------------------------------

    const subjectCode = String(body.subjectCode || "")
      .trim()
      .toUpperCase();

    // -------------------------------------------------------
    // SUBJECT NAME
    // -------------------------------------------------------

    const subjectName = String(body.subjectName || "").trim();

    // -------------------------------------------------------
    // SEMESTER
    // -------------------------------------------------------

    const semesterNumber = Number(body.semesterNumber);

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!subjectCode) {
      throw new ApiError(400, "Subject code is required");
    }

    if (!subjectName) {
      throw new ApiError(400, "Subject name is required");
    }

    if (
      !Number.isInteger(semesterNumber) ||
      semesterNumber < 1 ||
      semesterNumber > 8
    ) {
      throw new ApiError(400, "Semester number must be between 1 and 8");
    }

    // -------------------------------------------------------
    // DUPLICATE ACTIVE BACKLOG CHECK
    // -------------------------------------------------------

    const existingBacklog = await prisma.academicBacklog.findFirst({
      where: {
        studentProfileId: profile.id,

        subjectCode: {
          equals: subjectCode,

          mode: "insensitive",
        },

        semesterNumber,

        status: "ACTIVE",
      },
    });

    if (existingBacklog) {
      throw new ApiError(
        409,
        "This subject is already listed as an active backlog for this semester",
      );
    }

    // -------------------------------------------------------
    // CREATE
    // -------------------------------------------------------

    const backlog = await prisma.academicBacklog.create({
      data: {
        studentProfileId: profile.id,

        subjectCode,

        subjectName,

        semesterNumber,

        status: "ACTIVE",
      },
    });

    return backlog;
  }

  // =========================================================
  // UPDATE BACKLOG
  // =========================================================

  async updateBacklog(userId, backlogId, body) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    const backlog = await prisma.academicBacklog.findFirst({
      where: {
        id: backlogId,

        studentProfileId: profile.id,
      },
    });

    if (!backlog) {
      throw new ApiError(404, "Backlog record not found");
    }

    if (backlog.status === "CLEARED") {
      throw new ApiError(400, "A cleared backlog cannot be edited");
    }

    // -------------------------------------------------------
    // SUBJECT CODE
    // -------------------------------------------------------

    const subjectCode = String(body.subjectCode || "")
      .trim()
      .toUpperCase();

    // -------------------------------------------------------
    // SUBJECT NAME
    // -------------------------------------------------------

    const subjectName = String(body.subjectName || "").trim();

    // -------------------------------------------------------
    // SEMESTER
    // -------------------------------------------------------

    const semesterNumber = Number(body.semesterNumber);

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!subjectCode) {
      throw new ApiError(400, "Subject code is required");
    }

    if (!subjectName) {
      throw new ApiError(400, "Subject name is required");
    }

    if (
      !Number.isInteger(semesterNumber) ||
      semesterNumber < 1 ||
      semesterNumber > 8
    ) {
      throw new ApiError(400, "Semester number must be between 1 and 8");
    }

    // -------------------------------------------------------
    // DUPLICATE CHECK
    // -------------------------------------------------------

    const duplicate = await prisma.academicBacklog.findFirst({
      where: {
        studentProfileId: profile.id,

        subjectCode: {
          equals: subjectCode,

          mode: "insensitive",
        },

        semesterNumber,

        status: "ACTIVE",

        NOT: {
          id: backlogId,
        },
      },
    });

    if (duplicate) {
      throw new ApiError(
        409,
        "This subject is already listed as an active backlog for this semester",
      );
    }

    // -------------------------------------------------------
    // UPDATE
    // -------------------------------------------------------

    const updatedBacklog = await prisma.academicBacklog.update({
      where: {
        id: backlogId,
      },

      data: {
        subjectCode,

        subjectName,

        semesterNumber,
      },
    });

    return updatedBacklog;
  }

  // =========================================================
  // DELETE BACKLOG
  // =========================================================

  async deleteBacklog(userId, backlogId) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    const backlog = await prisma.academicBacklog.findFirst({
      where: {
        id: backlogId,

        studentProfileId: profile.id,
      },
    });

    if (!backlog) {
      throw new ApiError(404, "Backlog record not found");
    }

    await prisma.academicBacklog.delete({
      where: {
        id: backlogId,
      },
    });

    return {
      id: backlogId,
      deleted: true,
    };
  }

  // =========================================================
  // CLEAR BACKLOG
  // =========================================================

  async clearBacklog(userId, backlogId, body) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ApiError(404, "Student profile not found");
    }

    const backlog = await prisma.academicBacklog.findFirst({
      where: {
        id: backlogId,

        studentProfileId: profile.id,
      },
    });

    if (!backlog) {
      throw new ApiError(404, "Backlog record not found");
    }

    if (backlog.status === "CLEARED") {
      throw new ApiError(400, "This backlog has already been cleared");
    }

    const clearedSemesterNumber = Number(body.clearedSemesterNumber);

    const clearedGrade = String(body.clearedGrade || "").trim();

    const clearedMarks =
      body.clearedMarks === "" ||
      body.clearedMarks === null ||
      body.clearedMarks === undefined
        ? null
        : Number(body.clearedMarks);

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (
      !Number.isInteger(clearedSemesterNumber) ||
      clearedSemesterNumber < 1 ||
      clearedSemesterNumber > 8
    ) {
      throw new ApiError(400, "Cleared semester must be between 1 and 8");
    }

    if (!clearedGrade) {
      throw new ApiError(400, "Cleared grade is required");
    }

    if (
      clearedMarks !== null &&
      (!Number.isFinite(clearedMarks) || clearedMarks < 0)
    ) {
      throw new ApiError(
        400,
        "Cleared marks must be a valid non-negative number",
      );
    }

    // -------------------------------------------------------
    // MARK AS CLEARED
    // -------------------------------------------------------

    const updatedBacklog = await prisma.academicBacklog.update({
      where: {
        id: backlogId,
      },

      data: {
        status: "CLEARED",

        clearedSemesterNumber,

        clearedGrade,

        clearedMarks,

        clearedAt: new Date(),
      },
    });

    return updatedBacklog;
  }
}

export default new AcademicService();
