import hodPrisma from "../../../../config/prisma.hod.js";
import crypto from "crypto";

/* ==========================================================
   CONSTANTS
========================================================== */

const MIN_SEMESTER = 1;
const MAX_SEMESTER = 8;

/* ==========================================================
   VALIDATE SEMESTER
========================================================== */

const validateSemester = (semester) => {
  const value = Number(semester);

  return (
    Number.isInteger(value) && value >= MIN_SEMESTER && value <= MAX_SEMESTER
  );
};

/* ==========================================================
   CALCULATE ATTENDANCE PERCENTAGE
========================================================== */

const calculatePercentage = (attended, held) => {
  const attendedValue = Number(attended) || 0;

  const heldValue = Number(held) || 0;

  if (heldValue <= 0) {
    return 0;
  }

  return Number(((attendedValue / heldValue) * 100).toFixed(2));
};

/* ==========================================================
   GET CURRENT SEMESTER NUMBER

   Handles values such as:

   "Semester V"
   "V"
   "5"
   "Semester 5"
========================================================== */

const getCurrentSemesterNumber = (semester) => {
  const value = String(semester || "")
    .trim()
    .toUpperCase();

  const numericMatch = value.match(/\d+/);

  if (numericMatch) {
    const number = Number(numericMatch[0]);

    if (number >= MIN_SEMESTER && number <= MAX_SEMESTER) {
      return number;
    }
  }

  const romanSemesters = {
    VIII: 8,
    VII: 7,
    VI: 6,
    V: 5,
    IV: 4,
    III: 3,
    II: 2,
    I: 1,
  };

  for (const [roman, number] of Object.entries(romanSemesters)) {
    if (value.includes(roman)) {
      return number;
    }
  }

  return 1;
};

/* ==========================================================
   GET AUTHENTICATED STUDENT
========================================================== */

const getStudent = async (userId) => {
  if (!userId) {
    const error = new Error("Authenticated user is required.");

    error.statusCode = 401;

    throw error;
  }

  const student = await hodPrisma.students.findUnique({
    where: {
      userAccountId: userId,
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

      academicStanding: true,

      currentCGPA: true,

      totalCredits: true,

      overallAttendance: true,

      userAccountId: true,
    },
  });

  if (!student) {
    const error = new Error("Student profile not found.");

    error.statusCode = 404;

    throw error;
  }

  return student;
};

/* ==========================================================
   GET ACTIVE MENTOR
========================================================== */

const getMentor = async (studentId) => {
  const assignment = await hodPrisma.mentor_assignments.findFirst({
    where: {
      studentId,

      status: "ACTIVE",
    },

    orderBy: {
      assignedAt: "desc",
    },

    select: {
      teacherId: true,

      teachers: {
        select: {
          id: true,

          fullName: true,

          employeeCode: true,

          email: true,

          designation: true,
        },
      },
    },
  });

  return assignment?.teachers || null;
};

/* ==========================================================
   GET FALLBACK STORED ATTENDANCE

   IMPORTANT:

   Old records may contain:

       attendance = 94.44
       classesHeld = 0
       classesAttended = 0

   In that situation we cannot mathematically reconstruct
   the original class counts.

   Therefore we temporarily use the stored percentage.

   Once actual class counts are entered, the calculated
   percentage becomes the source of truth.
========================================================== */

const getStoredAttendanceAverage = (subjects) => {
  const values = subjects
    .map((subject) => {
      if (subject.attendance === null || subject.attendance === undefined) {
        return null;
      }

      const value = Number(subject.attendance);

      return Number.isFinite(value) ? value : null;
    })
    .filter((value) => value !== null);

  if (values.length === 0) {
    return 0;
  }

  return Number(
    (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2),
  );
};

/* ==========================================================
   GET ATTENDANCE FROM SUBJECTS

   RULE:

   1. If actual class data exists:
        total attended / total held

   2. If no class data exists:
        use stored attendance

   This prevents existing attendance such as 94.44%
   from suddenly becoming 0%.
========================================================== */

const calculateSummary = (subjects) => {
  const classesHeld = subjects.reduce(
    (total, subject) => total + Number(subject.classesHeld || 0),
    0,
  );

  const classesAttended = subjects.reduce(
    (total, subject) => total + Number(subject.classesAttended || 0),
    0,
  );

  let percentage = 0;

  if (classesHeld > 0) {
    percentage = calculatePercentage(classesAttended, classesHeld);
  } else {
    percentage = getStoredAttendanceAverage(subjects);
  }

  return {
    classesHeld,

    classesAttended,

    percentage,
  };
};

/* ==========================================================
   FORMAT SUBJECT
========================================================== */

const formatSubject = (subject) => {
  const classesHeld = Number(subject.classesHeld || 0);

  const classesAttended = Number(subject.classesAttended || 0);

  const hasClassData = classesHeld > 0;

  /*
   * IMPORTANT:
   *
   * If actual class data exists, calculate.
   *
   * Otherwise use stored attendance.
   */

  const percentage = hasClassData
    ? calculatePercentage(classesAttended, classesHeld)
    : subject.attendance !== null && subject.attendance !== undefined
      ? Number(subject.attendance)
      : 0;

  return {
    id: subject.id,

    courseCode: subject.courseCode,

    subjectName: subject.courseName,

    credits: Number(subject.credits || 0),

    classesHeld,

    classesAttended,

    percentage,

    /*
     * Keep the database value available
     * for Academics and compatibility.
     */
    storedAttendance:
      subject.attendance !== null && subject.attendance !== undefined
        ? Number(subject.attendance)
        : null,
  };
};

/* ==========================================================
   BUILD ALL 8 SEMESTERS
========================================================== */

const buildAvailableSemesters = (existingSemesters) => {
  const existingSet = new Set(
    existingSemesters.map((semester) => Number(semester.semesterNumber)),
  );

  return Array.from(
    {
      length: MAX_SEMESTER,
    },
    (_, index) => {
      const semesterNumber = index + 1;

      return {
        semesterNumber,

        exists: existingSet.has(semesterNumber),
      };
    },
  );
};

/* ==========================================================
   GET SEMESTER ATTENDANCE
========================================================== */

export const getSemesterAttendance = async (userId, semester) => {
  const semesterNumber = Number(semester);

  if (!validateSemester(semesterNumber)) {
    const error = new Error("Semester must be between 1 and 8.");

    error.statusCode = 400;

    throw error;
  }

  /* ======================================================
       STUDENT
    ====================================================== */

  const student = await getStudent(userId);

  /* ======================================================
       MENTOR
    ====================================================== */

  const mentor = await getMentor(student.id);

  /* ======================================================
       CURRENT SEMESTER
    ====================================================== */

  const currentSemester = getCurrentSemesterNumber(student.semester);

  /* ======================================================
       ALL EXISTING SEMESTERS
    ====================================================== */

  const existingSemesters = await hodPrisma.academic_semesters.findMany({
    where: {
      studentId: student.id,
    },

    select: {
      semesterNumber: true,
    },

    orderBy: {
      semesterNumber: "asc",
    },
  });

  const availableSemesters = buildAvailableSemesters(existingSemesters);

  /* ======================================================
       SELECTED SEMESTER
    ====================================================== */

  const academicSemester = await hodPrisma.academic_semesters.findUnique({
    where: {
      studentId_semesterNumber: {
        studentId: student.id,

        semesterNumber: semesterNumber,
      },
    },

    include: {
      subjects: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  /* ======================================================
       NO SEMESTER RECORD
    ====================================================== */

  if (!academicSemester) {
    return {
      semester: semesterNumber,

      semesterExists: false,

      currentSemester,

      availableSemesters,

      student: {
        id: student.id,

        registerNumber: student.registerNumber,

        fullName: student.fullName,

        email: student.email,

        phone: student.phone,

        programme: student.programme,

        semester: student.semester,

        profileImage: student.profileImage,

        academicStanding: student.academicStanding,

        currentCGPA: student.currentCGPA,

        totalCredits: student.totalCredits,

        overallAttendance: student.overallAttendance,

        mentor,
      },

      mentor,

      hasAttendance: false,

      academicYear: null,

      term: null,

      subjects: [],

      summary: {
        classesHeld: 0,

        classesAttended: 0,

        percentage: 0,
      },
    };
  }

  /* ======================================================
       FORMAT SUBJECTS
    ====================================================== */

  const subjects = academicSemester.subjects.map(formatSubject);

  /* ======================================================
       SUMMARY
    ====================================================== */

  const summary = calculateSummary(academicSemester.subjects);

  /* ======================================================
       HAS ATTENDANCE
    ====================================================== */

  const hasAttendance = academicSemester.subjects.some(
    (subject) =>
      Number(subject.classesHeld || 0) > 0 ||
      (subject.attendance !== null && subject.attendance !== undefined),
  );

  /* ======================================================
       RETURN
    ====================================================== */

  return {
    semester: semesterNumber,

    semesterExists: true,

    currentSemester,

    availableSemesters,

    student: {
      id: student.id,

      registerNumber: student.registerNumber,

      fullName: student.fullName,

      email: student.email,

      phone: student.phone,

      programme: student.programme,

      semester: student.semester,

      profileImage: student.profileImage,

      academicStanding: student.academicStanding,

      currentCGPA: student.currentCGPA,

      totalCredits: student.totalCredits,

      overallAttendance: student.overallAttendance,

      mentor,
    },

    mentor,

    hasAttendance,

    academicYear: null,

    term: null,

    subjects,

    summary,
  };
};

/* ==========================================================
   SAVE SEMESTER ATTENDANCE
========================================================== */

export const saveSemesterAttendance = async (userId, semester, subjects) => {
  const semesterNumber = Number(semester);

  /* ======================================================
       VALIDATE SEMESTER
    ====================================================== */

  if (!validateSemester(semesterNumber)) {
    const error = new Error("Semester must be between 1 and 8.");

    error.statusCode = 400;

    throw error;
  }

  /* ======================================================
       VALIDATE SUBJECT ARRAY
    ====================================================== */

  if (!Array.isArray(subjects) || subjects.length === 0) {
    const error = new Error("At least one subject is required.");

    error.statusCode = 400;

    throw error;
  }

  /* ======================================================
       STUDENT
    ====================================================== */

  const student = await getStudent(userId);

  /* ======================================================
       CLEAN SUBJECTS
    ====================================================== */

  const cleanedSubjects = [];

  const subjectCodes = new Set();

  const subjectNames = new Set();

  for (const subject of subjects) {
    const subjectName =
      typeof subject?.subjectName === "string"
        ? subject.subjectName.trim()
        : "";

    const courseCode =
      typeof subject?.courseCode === "string"
        ? subject.courseCode.trim().toUpperCase()
        : "";

    const classesHeld = Number(subject?.classesHeld);

    const classesAttended = Number(subject?.classesAttended);

    /* ====================================================
         SUBJECT NAME
      ==================================================== */

    if (!subjectName) {
      const error = new Error("Subject name is required.");

      error.statusCode = 400;

      throw error;
    }

    /* ====================================================
         DUPLICATE NAME
      ==================================================== */

    const normalizedName = subjectName.toLowerCase();

    if (subjectNames.has(normalizedName)) {
      const error = new Error(`Duplicate subject: ${subjectName}`);

      error.statusCode = 400;

      throw error;
    }

    subjectNames.add(normalizedName);

    /* ====================================================
         DUPLICATE COURSE CODE
      ==================================================== */

    if (courseCode) {
      if (subjectCodes.has(courseCode)) {
        const error = new Error(`Duplicate course code: ${courseCode}`);

        error.statusCode = 400;

        throw error;
      }

      subjectCodes.add(courseCode);
    }

    /* ====================================================
         CLASSES HELD
      ==================================================== */

    if (!Number.isInteger(classesHeld) || classesHeld < 0) {
      const error = new Error(`Invalid classes held for ${subjectName}.`);

      error.statusCode = 400;

      throw error;
    }

    /* ====================================================
         CLASSES ATTENDED
      ==================================================== */

    if (!Number.isInteger(classesAttended) || classesAttended < 0) {
      const error = new Error(`Invalid classes attended for ${subjectName}.`);

      error.statusCode = 400;

      throw error;
    }

    /* ====================================================
         ATTENDED CANNOT EXCEED HELD
      ==================================================== */

    if (classesAttended > classesHeld) {
      const error = new Error(
        `Classes attended cannot exceed classes held for ${subjectName}.`,
      );

      error.statusCode = 400;

      throw error;
    }

    /* ====================================================
         CALCULATE PERCENTAGE
      ==================================================== */

    const attendance = calculatePercentage(classesAttended, classesHeld);

    cleanedSubjects.push({
      subjectName,

      courseCode,

      classesHeld,

      classesAttended,

      attendance,
    });
  }

  /* ======================================================
       TRANSACTION
    ====================================================== */

  const saved = await hodPrisma.$transaction(async (transaction) => {
    /* ==================================================
             FIND SEMESTER
          ================================================== */

    let academicSemester = await transaction.academic_semesters.findUnique({
      where: {
        studentId_semesterNumber: {
          studentId: student.id,

          semesterNumber: semesterNumber,
        },
      },
    });

    /* ==================================================
             CREATE SEMESTER IF MISSING
          ================================================== */

    if (!academicSemester) {
      academicSemester = await transaction.academic_semesters.create({
        data: {
          id: crypto.randomUUID(),

          studentId: student.id,

          semesterNumber: semesterNumber,

          status: "LOCKED",

          entryStatus: "DRAFT",

          totalCredits: 0,

          creditsEarned: 0,

          backlogs: 0,

          createdAt: new Date(),

          updatedAt: new Date(),
        },
      });
    }

    /* ==================================================
             EXISTING SUBJECTS
          ================================================== */

    const existingSubjects = await transaction.academic_subjects.findMany({
      where: {
        academicSemesterId: academicSemester.id,
      },
    });

    /* ==================================================
             UPDATE / CREATE
          ================================================== */

    for (const subject of cleanedSubjects) {
      let existingSubject = null;

      /* ----------------------------------------------
               MATCH COURSE CODE
            ---------------------------------------------- */

      if (subject.courseCode) {
        existingSubject = existingSubjects.find(
          (item) =>
            item.courseCode?.trim().toUpperCase() === subject.courseCode,
        );
      }

      /* ----------------------------------------------
               FALLBACK TO SUBJECT NAME
            ---------------------------------------------- */

      if (!existingSubject) {
        existingSubject = existingSubjects.find(
          (item) =>
            item.courseName?.trim().toLowerCase() ===
            subject.subjectName.toLowerCase(),
        );
      }

      /* =================================================
               UPDATE EXISTING SUBJECT
            ================================================= */

      if (existingSubject) {
        await transaction.academic_subjects.update({
          where: {
            id: existingSubject.id,
          },

          data: {
            /*
             * Keep existing academic
             * information intact.
             */

            courseCode: subject.courseCode || existingSubject.courseCode,

            courseName: existingSubject.courseName,

            credits: existingSubject.credits,

            /*
             * UPDATE ATTENDANCE ONLY
             */

            classesHeld: subject.classesHeld,

            classesAttended: subject.classesAttended,

            attendance: subject.attendance,

            updatedAt: new Date(),
          },
        });
      } else {

      /* =================================================
               CREATE NEW SUBJECT
            ================================================= */
        await transaction.academic_subjects.create({
          data: {
            id: crypto.randomUUID(),

            academicSemesterId: academicSemester.id,

            courseCode:
              subject.courseCode ||
              `ATT-${semesterNumber}-${cleanedSubjects.indexOf(subject) + 1}`,

            courseName: subject.subjectName,

            /*
             * Attendance modal does not
             * own academic credits.
             */
            credits: 0,

            classesHeld: subject.classesHeld,

            classesAttended: subject.classesAttended,

            attendance: subject.attendance,

            createdAt: new Date(),

            updatedAt: new Date(),
          },
        });
      }
    }

    /* ==================================================
             FETCH UPDATED SUBJECTS
          ================================================== */

    const updatedSubjects = await transaction.academic_subjects.findMany({
      where: {
        academicSemesterId: academicSemester.id,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    /* ==================================================
             SELECTED SEMESTER SUMMARY
          ================================================== */

    const summary = calculateSummary(updatedSubjects);

    /* ==================================================
             FETCH ALL STUDENT SUBJECTS
          ================================================== */

    const allStudentSemesters = await transaction.academic_semesters.findMany({
      where: {
        studentId: student.id,
      },

      include: {
        subjects: true,
      },
    });

    const allStudentSubjects = allStudentSemesters.flatMap(
      (semesterRecord) => semesterRecord.subjects,
    );

    /* ==================================================
             OVERALL ATTENDANCE
          ================================================== */

    const overallSummary = calculateSummary(allStudentSubjects);

    /* ==================================================
             UPDATE STUDENT OVERALL ATTENDANCE
          ================================================== */

    await transaction.students.update({
      where: {
        id: student.id,
      },

      data: {
        overallAttendance:
          allStudentSubjects.length > 0 ? overallSummary.percentage : null,

        updatedAt: new Date(),
      },
    });

    /* ==================================================
             RETURN
          ================================================== */

    return {
      academicSemester,

      subjects: updatedSubjects,

      summary,

      overallAttendance: overallSummary.percentage,
    };
  });

  /* ========================================================
       MENTOR
    ======================================================== */

  const mentor = await getMentor(student.id);

  /* ========================================================
       RETURN
    ======================================================== */

  return {
    semester: semesterNumber,

    semesterExists: true,

    currentSemester: getCurrentSemesterNumber(student.semester),

    hasAttendance: saved.subjects.some(
      (subject) =>
        Number(subject.classesHeld || 0) > 0 ||
        (subject.attendance !== null && subject.attendance !== undefined),
    ),

    student: {
      id: student.id,

      registerNumber: student.registerNumber,

      fullName: student.fullName,

      email: student.email,

      phone: student.phone,

      programme: student.programme,

      semester: student.semester,

      profileImage: student.profileImage,

      academicStanding: student.academicStanding,

      currentCGPA: student.currentCGPA,

      totalCredits: student.totalCredits,

      overallAttendance: saved.overallAttendance,

      mentor,
    },

    mentor,

    subjects: saved.subjects.map(formatSubject),

    summary: saved.summary,
  };
};
