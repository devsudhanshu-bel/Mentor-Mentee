import pdfParse from "pdf-parse";
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
   IMPORT ATTENDANCE PDF
   Validates the register number before writing any records.
   Existing schema stores one aggregate row per subject, so Theory and
   Practical counts are summed per subject before using the existing save flow.
========================================================== */

export const importAttendancePdfForStudent = async (
  userId,
  semester,
  buffer,
) => {
  /* ==========================================================
     1. VALIDATE REQUEST
  ========================================================== */

  const semesterNumber = Number(semester);

  if (!validateSemester(semesterNumber)) {
    const error = new Error("Semester must be between 1 and 8.");
    error.statusCode = 400;
    throw error;
  }

  if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
    const error = new Error("Please upload a valid attendance PDF.");
    error.statusCode = 400;
    throw error;
  }

  const student = await getStudent(userId);

  /* ==========================================================
     2. EXTRACT PDF TEXT
  ========================================================== */

  let parsed;

  try {
    parsed = await pdfParse(buffer);
  } catch {
    const error = new Error(
      "Unable to read this PDF. Please upload the original attendance PDF.",
    );
    error.statusCode = 400;
    throw error;
  }

  const text = String(parsed?.text || "")
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[‐‑‒–—]/g, "-");

  if (!text.trim()) {
    const error = new Error(
      "The PDF contains no extractable text. Please upload a text-based attendance PDF, not a scanned image.",
    );
    error.statusCode = 400;
    throw error;
  }

  /* ==========================================================
     3. EXTRACT AND VERIFY REGISTER NUMBER

     Accepts labels such as:
       Register No: 2362177
       Register Number: 2362177
       Register No. 2362177
  ========================================================== */

  const registerMatch = text.match(
    /\bRegister\s*(?:No\.?|Number|#)\s*:?\s*([A-Z0-9][A-Z0-9/-]*)/i,
  );

  if (!registerMatch) {
    const error = new Error(
      "Could not find the register number in this PDF. Please upload the official attendance PDF.",
    );
    error.statusCode = 400;
    throw error;
  }

  const normalizeRegister = (value) =>
    String(value || "")
      .replace(/[^a-z0-9]/gi, "")
      .toUpperCase();

  const pdfRegister = normalizeRegister(registerMatch[1]);
  const studentRegister = normalizeRegister(student.registerNumber);

  if (!studentRegister || pdfRegister !== studentRegister) {
    const error = new Error(
      "This attendance PDF belongs to another student. Please upload your own attendance PDF.",
    );
    error.statusCode = 403;
    throw error;
  }

  /* ==========================================================
     4. PARSE THE EXTRACTED TABLE

     pdf-parse can flatten the table into strings such as:
       1HOLISTIC EDUCATIONTheory11.011.00.0100.0

     Therefore this parser does not rely on whitespace between
     columns. It detects Theory/Practical markers, reconstructs
     the four numeric columns using attendance arithmetic, and
     associates category rows with numbered subject headings.
  ========================================================== */

  const subjects = new Map();
  const flatText = text.replace(/\s+/g, " ").trim();
  const categoryPattern = /(Extra\s+Curricular|Theory|Practical)(?=\s*\d)/gi;
  const categoryMatches = [...flatText.matchAll(categoryPattern)];

  const normalizeSubjectName = (name) =>
    String(name || "")
      .replace(/^\s*\d{1,3}\s*/, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s:.-]+|[\s:.-]+$/g, "")
      .trim();

  // Recover a prefix of four concatenated numeric values:
  // held, attended, absent, percentage. Accept a split only when
  // held = attended + absent and percentage matches attended / held.

  const parseNumericPrefix = (source) => {
    const value = String(source || "").replace(/^[\s:]+/, "");
    const candidates = [];
    const MAX_TOKEN_LENGTH = 12;

    const visit = (position, values, tokens) => {
      while (position < value.length && /\s/.test(value[position])) {
        position++;
      }

      if (values.length === 4) {
        const [held, attended, absent, percentage] = values;

        if (
          !Number.isInteger(held) ||
          !Number.isInteger(attended) ||
          !Number.isInteger(absent) ||
          held < 0 ||
          attended < 0 ||
          absent < 0 ||
          attended > held ||
          attended + absent !== held
        ) {
          return;
        }

        const expectedPercentage = held === 0 ? 0 : (attended / held) * 100;

        if (Math.abs(expectedPercentage - percentage) > 0.16) {
          return;
        }

        candidates.push({
          held,
          attended,
          absent,
          percentage,
          consumed: position,
          tokens,
        });

        return;
      }

      if (position >= value.length || !/\d/.test(value[position])) {
        return;
      }

      for (
        let end = position + 1;
        end <= Math.min(value.length, position + MAX_TOKEN_LENGTH);
        end++
      ) {
        const token = value.slice(position, end);

        if (!/^\d+(?:\.\d+)?$/.test(token)) {
          continue;
        }

        const nextChar = value[end];

        // A column boundary must be whitespace, another digit,
        // a decimal point, or the end of the string.
        if (nextChar && !/[\s\d.]/.test(nextChar)) {
          continue;
        }

        const number = Number(token);

        if (!Number.isFinite(number)) {
          continue;
        }

        visit(end, [...values, number], [...tokens, token]);
      }
    };

    visit(0, [], []);

    if (candidates.length === 0) {
      return null;
    }

    // Prefer the candidate that consumes the most source text.
    // On ties, prefer the candidate with fewer decimal fragments.
    candidates.sort((a, b) => {
      if (b.consumed !== a.consumed) {
        return b.consumed - a.consumed;
      }

      return a.tokens.length - b.tokens.length;
    });

    const best = candidates[0];

    return {
      held: best.held,
      attended: best.attended,
      consumed: best.consumed,
    };
  };

  const extractNumberedSubject = (chunk) => {
    const cleaned = String(chunk || "")
      .replace(
        /\b(?:Sl\.?\s*No\.?|Subject\s*Name|Attendance|Type|Conducted|Present|Absent|Percentage)\b/gi,
        " ",
      )
      .replace(/\b(?:Extra\s+Curricular|Theory|Practical)\b/gi, " ");

    // The serial number may touch the subject name (e.g. 1HOLISTIC).
    const pattern =
      /(?:^|\s)(\d{1,2})\s*([A-Z][A-Z0-9][A-Z0-9 &,'()\-./]*?)(?=\s*$)/gi;
    let match;
    let candidate = "";
    while ((match = pattern.exec(cleaned)) !== null) {
      const serial = Number(match[1]);
      const name = normalizeSubjectName(match[2]);
      if (serial >= 1 && serial <= 99 && name && !/^total\b/i.test(name)) {
        candidate = name;
      }
    }
    return candidate;
  };

  const addAttendanceRow = (
    subjectName,
    category,
    heldValue,
    attendedValue,
  ) => {
    const cleanName = normalizeSubjectName(subjectName);
    const held = Number(heldValue);
    const attended = Number(attendedValue);

    if (
      !cleanName ||
      !Number.isInteger(held) ||
      !Number.isInteger(attended) ||
      held < 0 ||
      attended < 0 ||
      attended > held
    )
      return;

    const key = cleanName.toLowerCase();
    if (!subjects.has(key)) {
      subjects.set(key, {
        subjectName: cleanName,
        classesHeld: 0,
        classesAttended: 0,
        categories: [],
      });
    }

    const subject = subjects.get(key);
    const normalizedCategory =
      category[0].toUpperCase() + category.slice(1).toLowerCase();
    if (subject.categories.includes(normalizedCategory)) return;

    subject.classesHeld += held;
    subject.classesAttended += attended;
    subject.categories.push(normalizedCategory);
  };

  let currentSubject = extractNumberedSubject(
    flatText.slice(0, categoryMatches[0]?.index ?? flatText.length),
  );

  for (let i = 0; i < categoryMatches.length; i++) {
    const match = categoryMatches[i];
    const rowEnd = match.index + match[0].length;
    const nextCategoryIndex = categoryMatches[i + 1]?.index ?? flatText.length;
    const segment = flatText.slice(rowEnd, nextCategoryIndex);
    const numeric = parseNumericPrefix(segment);

    if (numeric && currentSubject) {
      addAttendanceRow(
        currentSubject,
        match[1],
        numeric.held,
        numeric.attended,
      );
    }

    // Text after the numeric columns and before the next category
    // contains the next numbered subject heading, if this is a new one.
    if (numeric) {
      const trailingText = segment.slice(numeric.consumed);
      const nextSubject = extractNumberedSubject(trailingText);
      if (nextSubject) currentSubject = nextSubject;
    }
  }

  /* ==========================================================
     7. VALIDATE PARSER RESULT
  ========================================================== */

  const importedSubjects = [...subjects.values()].map((subject) => ({
    subjectName: subject.subjectName,
    courseCode: "",
    classesHeld: subject.classesHeld,
    classesAttended: subject.classesAttended,
    attendance: calculatePercentage(
      subject.classesAttended,
      subject.classesHeld,
    ),
    categories: [...subject.categories],
  }));

  if (importedSubjects.length === 0) {
    const error = new Error(
      "The PDF text was extracted, but no valid subject attendance rows could be reconstructed. Please verify the attendance table format.",
    );
    error.statusCode = 400;
    throw error;
  }

  /* ==========================================================
     8. RETURN PARSED DATA

     This function parses and validates only.
     The existing controller/service flow must save the returned
     subjects using saveSemesterAttendance().
  ========================================================== */

  return {
    registerNumber: student.registerNumber,
    semester: semesterNumber,
    subjects: importedSubjects,
    summary: calculateSummary(importedSubjects),
    note: "Theory, Practical, and Extra Curricular attendance counts are combined per subject to match the existing database schema.",
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

  const saved = await hodPrisma.$transaction(
    async (transaction) => {
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

      const allStudentSemesters = await transaction.academic_semesters.findMany(
        {
          where: {
            studentId: student.id,
          },

          include: {
            subjects: true,
          },
        },
      );

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
    },
    {
      maxWait: 10000,
      timeout: 20000,
    },
  );

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

export const clearSemesterSubjects = async (userId, semester) => {
  const semesterNumber = Number(semester);

  if (!validateSemester(semesterNumber)) {
    const error = new Error("Semester must be between 1 and 8.");
    error.statusCode = 400;
    throw error;
  }

  const student = await getStudent(userId);

  await hodPrisma.$transaction(
    async (tx) => {
      const academicSemester = await tx.academic_semesters.findUnique({
        where: {
          studentId_semesterNumber: {
            studentId: student.id,
            semesterNumber,
          },
        },
      });

      // Nothing to clear if this semester does not exist.
      if (academicSemester) {
        await tx.academic_subjects.deleteMany({
          where: {
            academicSemesterId: academicSemester.id,
          },
        });
      }

      // Recalculate the student's overall attendance using
      // all remaining semester subjects.
      const semesters = await tx.academic_semesters.findMany({
        where: {
          studentId: student.id,
        },
        include: {
          subjects: true,
        },
      });

      const remainingSubjects = semesters.flatMap((item) => item.subjects);

      const summary = calculateSummary(remainingSubjects);

      await tx.students.update({
        where: {
          id: student.id,
        },
        data: {
          overallAttendance:
            remainingSubjects.length > 0 ? summary.percentage : null,
          updatedAt: new Date(),
        },
      });
    },
    {
      maxWait: 10000,
      timeout: 20000,
    },
  );

  // Return fresh data for the selected semester.
  return getSemesterAttendance(userId, semesterNumber);
};
