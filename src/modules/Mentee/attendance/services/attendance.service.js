import prisma from "../../../../config/prisma.js";

/* ==========================================================
   Constants
========================================================== */

const MIN_SEMESTER = 1;
const MAX_SEMESTER = 8;

/* ==========================================================
   Helpers
========================================================== */

const validateSemester = (semester) => {
  return (
    Number.isInteger(semester) &&
    semester >= MIN_SEMESTER &&
    semester <= MAX_SEMESTER
  );
};

const calculatePercentage = (attended, held) => {
  if (!held || held <= 0) {
    return 0;
  }

  return Number(((attended / held) * 100).toFixed(2));
};

/* ==========================================================
   Get Student Profile
========================================================== */

/*
 * IMPORTANT:
 * For now this uses the register number from the
 * currently discussed student.
 *
 * Once we connect your existing auth middleware,
 * this will be replaced with req.user / authenticated
 * StudentProfile information.
 */

const getStudentProfile = async () => {
  return prisma.studentProfile.findUnique({
    where: {
      registerNumber: "2362177",
    },
  });
};

/* ==========================================================
   GET SEMESTER ATTENDANCE
========================================================== */

export const getSemesterAttendance = async (semester) => {
  if (!validateSemester(semester)) {
    const error = new Error("Semester must be between 1 and 8.");

    error.statusCode = 400;

    throw error;
  }

  const studentProfile = await getStudentProfile();

  if (!studentProfile) {
    const error = new Error("Student profile not found.");

    error.statusCode = 404;

    throw error;
  }

  /*
   * Find the student's semester.
   */

  const academicSemester = await prisma.academicSemester.findUnique({
    where: {
      studentProfileId_semesterNumber: {
        studentProfileId: studentProfile.id,

        semesterNumber: semester,
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

  /*
   * Semester doesn't exist.
   */

  if (!academicSemester) {
    return {
      semester,
      semesterExists: false,
      hasAttendance: false,

      subjects: [],

      summary: {
        classesHeld: 0,
        classesAttended: 0,
        percentage: 0,
      },
    };
  }

  /*
   * Calculate totals from subjects.
   */

  const classesHeld = academicSemester.subjects.reduce(
    (total, subject) => total + subject.classesHeld,
    0,
  );

  const classesAttended = academicSemester.subjects.reduce(
    (total, subject) => total + subject.classesAttended,
    0,
  );

  const percentage = calculatePercentage(classesAttended, classesHeld);

  /*
   * Format subjects.
   */

  const subjects = academicSemester.subjects.map((subject) => ({
    id: subject.id,

    courseCode: subject.courseCode,

    subjectName: subject.courseName,

    credits: subject.credits,

    classesHeld: subject.classesHeld,

    classesAttended: subject.classesAttended,

    percentage: calculatePercentage(
      subject.classesAttended,
      subject.classesHeld,
    ),
  }));

  return {
    semester,

    semesterExists: true,

    hasAttendance: academicSemester.subjects.some(
      (subject) => subject.classesHeld > 0,
    ),

    academicYear: academicSemester.academicYear,

    term: academicSemester.term,

    subjects,

    summary: {
      classesHeld,
      classesAttended,
      percentage,
    },
  };
};

/* ==========================================================
   SAVE SEMESTER ATTENDANCE
========================================================== */

export const saveSemesterAttendance = async (semester, subjects) => {
  if (!validateSemester(semester)) {
    const error = new Error("Semester must be between 1 and 8.");

    error.statusCode = 400;

    throw error;
  }

  if (!Array.isArray(subjects) || subjects.length === 0) {
    const error = new Error("At least one subject is required.");

    error.statusCode = 400;

    throw error;
  }

  const studentProfile = await getStudentProfile();

  if (!studentProfile) {
    const error = new Error("Student profile not found.");

    error.statusCode = 404;

    throw error;
  }

  /*
   * Find semester.
   */

  const academicSemester = await prisma.academicSemester.findUnique({
    where: {
      studentProfileId_semesterNumber: {
        studentProfileId: studentProfile.id,

        semesterNumber: semester,
      },
    },
  });

  if (!academicSemester) {
    const error = new Error("Academic semester not found.");

    error.statusCode = 404;

    throw error;
  }

  /*
   * Validate all subjects before writing
   * anything to the database.
   */

  const cleanedSubjects = [];

  const subjectNames = new Set();

  for (const subject of subjects) {
    const subjectName =
      typeof subject.subjectName === "string" ? subject.subjectName.trim() : "";

    const courseCode =
      typeof subject.courseCode === "string" ? subject.courseCode.trim() : "";

    const credits = Number(subject.credits) || 0;

    const classesHeld = Number(subject.classesHeld);

    const classesAttended = Number(subject.classesAttended);

    /*
     * Subject name.
     */

    if (!subjectName) {
      const error = new Error("Subject name is required.");

      error.statusCode = 400;

      throw error;
    }

    /*
     * Duplicate subjects.
     */

    const normalizedName = subjectName.toLowerCase();

    if (subjectNames.has(normalizedName)) {
      const error = new Error(`Duplicate subject: ${subjectName}`);

      error.statusCode = 400;

      throw error;
    }

    subjectNames.add(normalizedName);

    /*
     * Classes held.
     */

    if (!Number.isInteger(classesHeld) || classesHeld < 0) {
      const error = new Error(`Invalid classes held for ${subjectName}.`);

      error.statusCode = 400;

      throw error;
    }

    /*
     * Classes attended.
     */

    if (!Number.isInteger(classesAttended) || classesAttended < 0) {
      const error = new Error(`Invalid classes attended for ${subjectName}.`);

      error.statusCode = 400;

      throw error;
    }

    /*
     * Impossible attendance.
     */

    if (classesAttended > classesHeld) {
      const error = new Error(
        `Classes attended cannot exceed classes held for ${subjectName}.`,
      );

      error.statusCode = 400;

      throw error;
    }

    /*
     * Backend calculates percentage.
     */

    const attendance = calculatePercentage(classesAttended, classesHeld);

    cleanedSubjects.push({
      subjectName,
      courseCode,
      credits,
      classesHeld,
      classesAttended,
      attendance,
    });
  }

  /*
   * Save inside transaction.
   */

  const savedSubjects = await prisma.$transaction(async (transaction) => {
    const results = [];

    for (const subject of cleanedSubjects) {
      /*
       * Try to find an existing subject
       * in this semester.
       */

      let existingSubject = await transaction.academicSubject.findFirst({
        where: {
          academicSemesterId: academicSemester.id,

          courseName: subject.subjectName,
        },
      });

      /*
       * Update existing subject.
       */

      if (existingSubject) {
        existingSubject = await transaction.academicSubject.update({
          where: {
            id: existingSubject.id,
          },

          data: {
            courseCode: subject.courseCode || existingSubject.courseCode,

            credits: subject.credits || existingSubject.credits,

            classesHeld: subject.classesHeld,

            classesAttended: subject.classesAttended,

            attendance: subject.attendance,
          },
        });
      } else {

      /*
       * Create subject if it doesn't exist.
       */
        existingSubject = await transaction.academicSubject.create({
          data: {
            academicSemesterId: academicSemester.id,

            courseCode:
              subject.courseCode || `ATT-${semester}-${results.length + 1}`,

            courseName: subject.subjectName,

            credits: subject.credits,

            classesHeld: subject.classesHeld,

            classesAttended: subject.classesAttended,

            attendance: subject.attendance,
          },
        });
      }

      results.push(existingSubject);
    }

    return results;
  });

  /*
   * Calculate semester totals
   * again on backend.
   */

  const classesHeld = savedSubjects.reduce(
    (total, subject) => total + subject.classesHeld,
    0,
  );

  const classesAttended = savedSubjects.reduce(
    (total, subject) => total + subject.classesAttended,
    0,
  );

  const percentage = calculatePercentage(classesAttended, classesHeld);

  return {
    semester,

    hasAttendance: true,

    subjects: savedSubjects.map((subject) => ({
      id: subject.id,

      courseCode: subject.courseCode,

      subjectName: subject.courseName,

      credits: subject.credits,

      classesHeld: subject.classesHeld,

      classesAttended: subject.classesAttended,

      percentage: calculatePercentage(
        subject.classesAttended,
        subject.classesHeld,
      ),
    })),

    summary: {
      classesHeld,
      classesAttended,
      percentage,
    },
  };
};
