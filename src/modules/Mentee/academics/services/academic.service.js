import crypto from "crypto";
import hodPrisma from "../../../../config/prisma.hod.js";
import ApiError from "../../../../utils/ApiError.js";

// ==========================================================
// CONSTANTS
// ==========================================================

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

// ==========================================================
// SEMESTER NUMBER
// ==========================================================

const getCurrentSemesterNumber = (semester) => {
  if (semester === null || semester === undefined) {
    return 1;
  }

  const value = String(semester).trim().toUpperCase();

  const numericMatch = value.match(/\d+/);

  if (numericMatch) {
    const numeric = Number(numericMatch[0]);

    if (numeric >= 1 && numeric <= 8) {
      return numeric;
    }
  }

  for (const [roman, number] of Object.entries(ROMAN_TO_NUMBER)) {
    if (value === roman || value.includes(`SEMESTER ${roman}`)) {
      return number;
    }
  }

  return 1;
};

// ==========================================================
// VALIDATE SEMESTER
// ==========================================================

const validateSemesterNumber = (semesterNumber) => {
  const number = Number(semesterNumber);

  if (!Number.isInteger(number) || number < 1 || number > 8) {
    throw new ApiError(400, "Semester number must be between 1 and 8");
  }

  return number;
};

// ==========================================================
// NULLABLE NUMBER
// ==========================================================

const nullableNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

// ==========================================================
// NORMALISE ACADEMIC MARKS
//
// IMPORTANT:
// This function ONLY normalises academic fields.
//
// It does NOT accept or process:
// - credits
// - attendance
// - classesHeld
// - classesAttended
// - courseCode
// - courseName
//
// Those values come from the existing DB subject.
// ==========================================================

const normaliseAcademicMarks = (subject) => {
  const cia1 = nullableNumber(subject.cia1);

  const mse = nullableNumber(subject.mse);

  const cia3 = nullableNumber(subject.cia3);

  const ese = nullableNumber(subject.ese);

  const suppliedTotal = nullableNumber(subject.totalMarksObtained);

  const calculatedTotal = [cia1, mse, cia3, ese]
    .filter((value) => value !== null)
    .reduce((total, value) => total + Number(value), 0);

  const totalMarksObtained =
    suppliedTotal !== null ? suppliedTotal : calculatedTotal;

  const grade = subject.grade
    ? String(subject.grade).trim().toUpperCase()
    : null;

  const suppliedGradePoint = nullableNumber(subject.gradePoint);

  const gradePoint =
    suppliedGradePoint !== null
      ? suppliedGradePoint
      : grade && GRADE_POINTS[grade] !== undefined
        ? GRADE_POINTS[grade]
        : null;

  return {
    cia1,
    mse,
    cia3,
    ese,

    maximumMarks: nullableNumber(subject.maximumMarks),

    totalMarksObtained: Number.isFinite(totalMarksObtained)
      ? totalMarksObtained
      : null,

    grade,

    gradePoint: Number.isFinite(gradePoint) ? gradePoint : null,
  };
};

// ==========================================================
// CALCULATE SEMESTER
//
// Credits are taken from EXISTING DB SUBJECTS.
// ==========================================================

const calculateSemester = (subjects) => {
  const totalCredits = subjects.reduce(
    (total, subject) => total + Number(subject.credits || 0),
    0,
  );

  const creditsEarned = subjects.reduce(
    (total, subject) =>
      total + (subject.grade === "F" ? 0 : Number(subject.credits || 0)),
    0,
  );

  const backlogs = subjects.filter((subject) => subject.grade === "F").length;

  const gradedSubjects = subjects.filter(
    (subject) =>
      subject.gradePoint !== null &&
      subject.gradePoint !== undefined &&
      Number.isFinite(Number(subject.gradePoint)),
  );

  const weightedPoints = gradedSubjects.reduce(
    (total, subject) =>
      total + Number(subject.credits || 0) * Number(subject.gradePoint || 0),
    0,
  );

  const gradedCredits = gradedSubjects.reduce(
    (total, subject) => total + Number(subject.credits || 0),
    0,
  );

  return {
    totalCredits,

    creditsEarned,

    backlogs,

    sgpa:
      gradedCredits > 0
        ? Number((weightedPoints / gradedCredits).toFixed(2))
        : null,

    status: backlogs === 0 ? "COMPLETED" : "FAILED",
  };
};

// ==========================================================
// CALCULATE OVERALL
//
// Attendance is calculated from actual attendance records.
// ==========================================================

const calculateOverallAcademicValues = (allSemesters) => {
  const allSubjects = allSemesters.flatMap(
    (semester) => semester.subjects || [],
  );

  // ------------------------------------------------------
  // CGPA
  // ------------------------------------------------------

  const gradedSubjects = allSubjects.filter(
    (subject) =>
      subject.gradePoint !== null &&
      subject.gradePoint !== undefined &&
      Number.isFinite(Number(subject.gradePoint)),
  );

  const cgpaCredits = gradedSubjects.reduce(
    (total, subject) => total + Number(subject.credits || 0),
    0,
  );

  const cgpaPoints = gradedSubjects.reduce(
    (total, subject) =>
      total + Number(subject.credits || 0) * Number(subject.gradePoint || 0),
    0,
  );

  const currentCGPA =
    cgpaCredits > 0 ? Number((cgpaPoints / cgpaCredits).toFixed(2)) : null;

  // ------------------------------------------------------
  // TOTAL CREDITS
  // ------------------------------------------------------

  const totalCredits = allSemesters.reduce(
    (total, semester) => total + Number(semester.creditsEarned || 0),
    0,
  );

  // ------------------------------------------------------
  // ATTENDANCE
  //
  // IMPORTANT:
  // Attendance remains completely independent
  // from academic marks updates.
  // ------------------------------------------------------

  let classesHeld = 0;

  let classesAttended = 0;

  allSubjects.forEach((subject) => {
    classesHeld += Number(subject.classesHeld || 0);

    classesAttended += Number(subject.classesAttended || 0);
  });

  const overallAttendance =
    classesHeld > 0
      ? Number(((classesAttended / classesHeld) * 100).toFixed(2))
      : null;

  // ------------------------------------------------------
  // BACKLOGS
  // ------------------------------------------------------

  const overallBacklogs = allSemesters.reduce(
    (total, semester) => total + Number(semester.backlogs || 0),
    0,
  );

  // ------------------------------------------------------
  // ACADEMIC STANDING
  // ------------------------------------------------------

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

  return {
    totalCredits,

    currentCGPA,

    overallAttendance,

    academicStanding,
  };
};

// ==========================================================
// FIND STUDENT
// ==========================================================

const findStudentByUserId = async (userId) => {
  const student = await hodPrisma.students.findUnique({
    where: {
      userAccountId: userId,
    },

    select: {
      id: true,

      registerNumber: true,

      fullName: true,

      email: true,

      semester: true,

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
};

// ==========================================================
// ACADEMIC SERVICE
// ==========================================================

class AcademicService {
  // ========================================================
  // GET PROFILE
  // ========================================================

  async getProfile(userId) {
    const student = await findStudentByUserId(userId);

    const records = await hodPrisma.academic_semesters.findMany({
      where: {
        studentId: student.id,
      },

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
    });

    const currentSemester = getCurrentSemesterNumber(student.semester);

    const recordMap = new Map(
      records.map((record) => [record.semesterNumber, record]),
    );

    const semesters = Array.from(
      {
        length: 8,
      },
      (_, index) => {
        const semesterNumber = index + 1;

        const record = recordMap.get(semesterNumber);

        let status = "LOCKED";

        if (record) {
          status = record.status;
        } else if (semesterNumber <= currentSemester) {
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
      },
    );

    const completedPreviousSemesters = records.filter(
      (record) =>
        record.semesterNumber < currentSemester &&
        record.status === "COMPLETED",
    ).length;

    return {
      studentProfileId: student.id,

      studentId: student.id,

      registerNumber: student.registerNumber,

      currentSemester,

      setupCompleted: student.academicSetupCompleted,

      completedPreviousSemesters,

      semesters,

      overall: {
        currentCGPA: student.currentCGPA,

        totalCredits: student.totalCredits,

        overallAttendance: student.overallAttendance,

        academicStanding: student.academicStanding,
      },
    };
  }

  // ========================================================
  // GET SINGLE SEMESTER
  // ========================================================

  async getSemester(userId, semesterNumber) {
    const number = validateSemesterNumber(semesterNumber);

    const student = await findStudentByUserId(userId);

    const currentSemester = getCurrentSemesterNumber(student.semester);

    const record = await hodPrisma.academic_semesters.findUnique({
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

    /*
     * Previous + current semesters can be viewed.
     * Future semesters remain locked.
     */

    if (number > currentSemester) {
      throw new ApiError(403, "This semester is currently locked");
    }

    return (
      record || {
        id: null,

        studentId: student.id,

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

  // ========================================================
  // SAVE SEMESTER
  //
  // Academics DOES NOT create subject structure.
  //
  // Attendance is responsible for creating subjects,
  // credits and attendance.
  //
  // This method only updates academic marks.
  // ========================================================

  async saveSemester(userId, body) {
    const semesterNumber = validateSemesterNumber(body.semesterNumber);

    const student = await findStudentByUserId(userId);

    const currentSemester = getCurrentSemesterNumber(student.semester);

    if (semesterNumber > currentSemester) {
      throw new ApiError(403, "This semester is currently locked");
    }

    if (!Array.isArray(body.subjects) || body.subjects.length === 0) {
      throw new ApiError(400, "At least one subject is required");
    }

    const existingSemester = await hodPrisma.academic_semesters.findUnique({
      where: {
        studentId_semesterNumber: {
          studentId: student.id,

          semesterNumber,
        },
      },

      include: {
        subjects: true,
      },
    });

    if (!existingSemester) {
      throw new ApiError(
        404,
        "Academic semester not found. Please enter attendance/subject details first.",
      );
    }

    /*
     * Build academic marks ONLY.
     */

    const academicSubjects = body.subjects.map((subject) => {
      if (!subject?.id) {
        throw new ApiError(
          400,
          "Subject ID is required when entering academic marks.",
        );
      }

      const existing = existingSemester.subjects.find(
        (item) => item.id === subject.id,
      );

      if (!existing) {
        throw new ApiError(
          400,
          `Subject ${subject.id} does not belong to this semester.`,
        );
      }

      return {
        existing,

        marks: normaliseAcademicMarks(subject),
      };
    });

    /*
     * Merge DB subject information with
     * academic marks.
     *
     * Credits ALWAYS come from DB.
     */

    const calculationSubjects = existingSemester.subjects.map((existing) => {
      const incoming = academicSubjects.find(
        (item) => item.existing.id === existing.id,
      );

      const marks = incoming?.marks;

      return {
        ...existing,

        cia1: marks?.cia1 ?? existing.cia1,

        mse: marks?.mse ?? existing.mse,

        cia3: marks?.cia3 ?? existing.cia3,

        ese: marks?.ese ?? existing.ese,

        totalMarksObtained:
          marks?.totalMarksObtained ?? existing.totalMarksObtained,

        grade: marks?.grade ?? existing.grade,

        gradePoint: marks?.gradePoint ?? existing.gradePoint,
      };
    });

    const calculated = calculateSemester(calculationSubjects);

    const result = await hodPrisma.$transaction(async (tx) => {
      // --------------------------------------------
      // UPDATE SEMESTER SUMMARY
      // --------------------------------------------

      const semester = await tx.academic_semesters.update({
        where: {
          id: existingSemester.id,
        },

        data: {
          status: calculated.status,

          entryStatus: "SUBMITTED",

          sgpa: calculated.sgpa,

          /*
           * totalCredits is calculated from
           * existing DB credits.
           */

          totalCredits: calculated.totalCredits,

          creditsEarned: calculated.creditsEarned,

          backlogs: calculated.backlogs,

          updatedAt: new Date(),
        },
      });

      // --------------------------------------------
      // UPDATE ACADEMIC MARKS ONLY
      // --------------------------------------------

      for (const item of academicSubjects) {
        await tx.academic_subjects.update({
          where: {
            id: item.existing.id,
          },

          data: {
            /*
             * ONLY academic fields.
             */

            cia1: item.marks.cia1,

            cia2: null,

            mse: item.marks.mse,

            cia3: item.marks.cia3,

            ese: item.marks.ese,

            maximumMarks: item.marks.maximumMarks,

            totalMarksObtained: item.marks.totalMarksObtained,

            grade: item.marks.grade,

            gradePoint: item.marks.gradePoint,

            updatedAt: new Date(),
          },
        });
      }

      /*
       * ABSOLUTELY NOTHING HERE FOR:
       *
       * courseCode
       * courseName
       * credits
       * attendance
       * classesHeld
       * classesAttended
       */

      // --------------------------------------------
      // FETCH ALL SEMESTERS
      // --------------------------------------------

      const allSemesters = await tx.academic_semesters.findMany({
        where: {
          studentId: student.id,
        },

        include: {
          subjects: true,
        },
      });

      const overall = calculateOverallAcademicValues(allSemesters);

      // --------------------------------------------
      // UPDATE STUDENT SUMMARY
      // --------------------------------------------

      await tx.students.update({
        where: {
          id: student.id,
        },

        data: {
          academicSetupCompleted: true,

          totalCredits: overall.totalCredits,

          currentCGPA: overall.currentCGPA,

          overallAttendance: overall.overallAttendance,

          academicStanding: overall.academicStanding,

          updatedAt: new Date(),
        },
      });

      // --------------------------------------------
      // RETURN
      // --------------------------------------------

      return tx.academic_semesters.findUnique({
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

  // ========================================================
  // UPDATE EXISTING SEMESTER
  //
  // MARKS ONLY.
  //
  // Credits + attendance are NEVER written.
  // ========================================================

  async updateSemester(userId, semesterNumber, body) {
    const number = validateSemesterNumber(semesterNumber);

    const student = await findStudentByUserId(userId);

    const currentSemester = getCurrentSemesterNumber(student.semester);

    // ------------------------------------------------------
    // CURRENT + FUTURE SEMESTERS ARE LOCKED
    // ------------------------------------------------------

    if (number >= currentSemester) {
      throw new ApiError(
        403,
        `Semester ${number} is currently locked and cannot be edited`,
      );
    }

    // ------------------------------------------------------
    // GET EXISTING SEMESTER
    // ------------------------------------------------------

    const existingSemester = await hodPrisma.academic_semesters.findUnique({
      where: {
        studentId_semesterNumber: {
          studentId: student.id,
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

    // ------------------------------------------------------
    // VALIDATE REQUEST
    // ------------------------------------------------------

    if (!Array.isArray(body.subjects) || body.subjects.length === 0) {
      throw new ApiError(400, "At least one subject is required");
    }

    // ------------------------------------------------------
    // IMPORTANT
    //
    // Only academic fields are accepted.
    //
    // NEVER use:
    // credits
    // attendance
    // classesHeld
    // classesAttended
    // courseCode
    // courseName
    //
    // from the request for updating the subject.
    // ------------------------------------------------------

    for (const incoming of body.subjects) {
      if (!incoming?.id) {
        throw new ApiError(400, "Subject ID is required.");
      }

      const existingSubject = existingSemester.subjects.find(
        (subject) => subject.id === incoming.id,
      );

      if (!existingSubject) {
        throw new ApiError(
          400,
          `Subject ${incoming.id} does not belong to Semester ${number}.`,
        );
      }

      const academicData = {
        cia1:
          incoming.cia1 === "" ||
          incoming.cia1 === null ||
          incoming.cia1 === undefined
            ? null
            : Number(incoming.cia1),

        mse:
          incoming.mse === "" ||
          incoming.mse === null ||
          incoming.mse === undefined
            ? null
            : Number(incoming.mse),

        cia3:
          incoming.cia3 === "" ||
          incoming.cia3 === null ||
          incoming.cia3 === undefined
            ? null
            : Number(incoming.cia3),

        ese:
          incoming.ese === "" ||
          incoming.ese === null ||
          incoming.ese === undefined
            ? null
            : Number(incoming.ese),

        maximumMarks:
          incoming.maximumMarks === "" ||
          incoming.maximumMarks === null ||
          incoming.maximumMarks === undefined
            ? null
            : Number(incoming.maximumMarks),

        totalMarksObtained:
          incoming.totalMarksObtained === "" ||
          incoming.totalMarksObtained === null ||
          incoming.totalMarksObtained === undefined
            ? null
            : Number(incoming.totalMarksObtained),

        grade:
          incoming.grade === "" ||
          incoming.grade === null ||
          incoming.grade === undefined
            ? null
            : String(incoming.grade).trim().toUpperCase(),

        gradePoint:
          incoming.gradePoint === "" ||
          incoming.gradePoint === null ||
          incoming.gradePoint === undefined
            ? null
            : Number(incoming.gradePoint),

        updatedAt: new Date(),
      };

      // ----------------------------------------------------
      // UPDATE ACADEMIC FIELDS ONLY
      // ----------------------------------------------------

      await hodPrisma.academic_subjects.update({
        where: {
          id: existingSubject.id,
        },

        data: academicData,
      });
    }

    // ------------------------------------------------------
    // FETCH UPDATED SUBJECTS
    // ------------------------------------------------------

    const updatedSubjects = await hodPrisma.academic_subjects.findMany({
      where: {
        academicSemesterId: existingSemester.id,
      },

      orderBy: {
        courseCode: "asc",
      },
    });

    // ------------------------------------------------------
    // CALCULATE SEMESTER SUMMARY
    //
    // IMPORTANT:
    // calculateSemester() uses credits FROM DATABASE.
    //
    // It does NOT use credits from the frontend.
    // ------------------------------------------------------

    const calculated = calculateSemester(updatedSubjects);

    // ------------------------------------------------------
    // UPDATE SEMESTER SUMMARY
    // ------------------------------------------------------

    await hodPrisma.academic_semesters.update({
      where: {
        id: existingSemester.id,
      },

      data: {
        status: calculated.status,

        entryStatus: "SUBMITTED",

        sgpa: calculated.sgpa,

        /*
         * Calculated using the existing DB credits.
         */
        totalCredits: calculated.totalCredits,

        creditsEarned: calculated.creditsEarned,

        backlogs: calculated.backlogs,

        updatedAt: new Date(),
      },
    });

    // ------------------------------------------------------
    // FETCH ALL SEMESTERS
    // ------------------------------------------------------

    const allSemesters = await hodPrisma.academic_semesters.findMany({
      where: {
        studentId: student.id,
      },

      include: {
        subjects: true,
      },
    });

    // ------------------------------------------------------
    // RECALCULATE STUDENT SUMMARY
    // ------------------------------------------------------

    const overall = calculateOverallAcademicValues(allSemesters);

    // ------------------------------------------------------
    // UPDATE STUDENT SUMMARY
    // ------------------------------------------------------

    await hodPrisma.students.update({
      where: {
        id: student.id,
      },

      data: {
        academicSetupCompleted: true,

        totalCredits: overall.totalCredits,

        currentCGPA: overall.currentCGPA,

        overallAttendance: overall.overallAttendance,

        academicStanding: overall.academicStanding,

        updatedAt: new Date(),
      },
    });

    // ------------------------------------------------------
    // RETURN FRESH SEMESTER
    // ------------------------------------------------------

    const result = await hodPrisma.academic_semesters.findUnique({
      where: {
        id: existingSemester.id,
      },

      include: {
        subjects: {
          orderBy: {
            courseCode: "asc",
          },
        },
      },
    });

    return result;
  }

  // ========================================================
  // GET BACKLOGS
  // ========================================================

  async getBacklogs(userId) {
    const student = await findStudentByUserId(userId);

    const backlogs = await hodPrisma.academic_backlogs.findMany({
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

      activeCount: backlogs.filter((backlog) => backlog.status === "ACTIVE")
        .length,

      clearedCount: backlogs.filter((backlog) => backlog.status === "CLEARED")
        .length,
    };
  }

  // ========================================================
  // CREATE BACKLOG
  // ========================================================

  async createBacklog(userId, body) {
    const student = await findStudentByUserId(userId);

    const subjectCode = String(body.subjectCode || "")
      .trim()
      .toUpperCase();

    const subjectName = String(body.subjectName || "").trim();

    const semesterNumber = Number(body.semesterNumber);

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

    const existingBacklog = await hodPrisma.academic_backlogs.findFirst({
      where: {
        studentId: student.id,

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

    return hodPrisma.academic_backlogs.create({
      data: {
        id: crypto.randomUUID(),

        studentId: student.id,

        subjectCode,

        subjectName,

        semesterNumber,

        status: "ACTIVE",

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    });
  }

  // ========================================================
  // UPDATE BACKLOG
  // ========================================================

  async updateBacklog(userId, backlogId, body) {
    const student = await findStudentByUserId(userId);

    const backlog = await hodPrisma.academic_backlogs.findFirst({
      where: {
        id: backlogId,

        studentId: student.id,
      },
    });

    if (!backlog) {
      throw new ApiError(404, "Backlog record not found");
    }

    if (backlog.status === "CLEARED") {
      throw new ApiError(400, "A cleared backlog cannot be edited");
    }

    const subjectCode = String(body.subjectCode || "")
      .trim()
      .toUpperCase();

    const subjectName = String(body.subjectName || "").trim();

    const semesterNumber = Number(body.semesterNumber);

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

    const duplicate = await hodPrisma.academic_backlogs.findFirst({
      where: {
        studentId: student.id,

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

    return hodPrisma.academic_backlogs.update({
      where: {
        id: backlogId,
      },

      data: {
        subjectCode,

        subjectName,

        semesterNumber,

        updatedAt: new Date(),
      },
    });
  }

  // ========================================================
  // DELETE BACKLOG
  // ========================================================

  async deleteBacklog(userId, backlogId) {
    const student = await findStudentByUserId(userId);

    const backlog = await hodPrisma.academic_backlogs.findFirst({
      where: {
        id: backlogId,

        studentId: student.id,
      },
    });

    if (!backlog) {
      throw new ApiError(404, "Backlog record not found");
    }

    await hodPrisma.academic_backlogs.delete({
      where: {
        id: backlogId,
      },
    });

    return {
      id: backlogId,

      deleted: true,
    };
  }

  // ========================================================
  // CLEAR BACKLOG
  // ========================================================

  async clearBacklog(userId, backlogId, body) {
    const student = await findStudentByUserId(userId);

    const backlog = await hodPrisma.academic_backlogs.findFirst({
      where: {
        id: backlogId,

        studentId: student.id,
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

    return hodPrisma.academic_backlogs.update({
      where: {
        id: backlogId,
      },

      data: {
        status: "CLEARED",

        clearedSemesterNumber,

        clearedGrade,

        clearedMarks,

        clearedAt: new Date(),

        updatedAt: new Date(),
      },
    });
  }
}

export default new AcademicService();
