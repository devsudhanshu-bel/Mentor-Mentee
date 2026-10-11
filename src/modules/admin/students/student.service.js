import { randomUUID } from "crypto";

import hodPrisma from "../../../config/prisma.hod.js";

import ApiError from "../../../utils/ApiError.js";

import { hashPassword } from "../../../utils/hash.js";

// ==========================================================
// DEFAULT PASSWORD
// ==========================================================

const DEFAULT_PASSWORD = "Password@123";

// ==========================================================
// EMAIL REGEX
// ==========================================================

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

// ==========================================================
// REGISTER NUMBER REGEX
// ==========================================================
//
// Supports common university register-number formats:
//
// 24CSE001
// 24CSE002
// 1CS23CS001
// 22CSE/001
// 24-CSE-001
// 2461001
//
// The important restriction is that "Student", "Name",
// "Email", etc. cannot be interpreted as a register number.
// ==========================================================

const REGISTER_NUMBER_REGEX = /^(?=.*\d)[A-Za-z0-9][A-Za-z0-9/_-]{2,}$/;

// ==========================================================
// HEADER / DOCUMENT TEXT
// ==========================================================

const HEADER_WORDS = [
  "register number",
  "register no",
  "reg number",
  "reg no",
  "student name",
  "student",
  "name",
  "email",
  "s.no",
  "sl.no",
  "serial number",
  "columns",
];

// ==========================================================
// NORMALIZE TEXT
// ==========================================================

const normalizePdfText = (text) => {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\u200b/g, "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n+/g, "\n")
    .trim();
};

// ==========================================================
// REGISTER NUMBER VALIDATION
// ==========================================================

const isValidRegisterNumber = (value) => {
  if (!value) {
    return false;
  }

  const cleaned = String(value).trim();

  if (!REGISTER_NUMBER_REGEX.test(cleaned)) {
    return false;
  }

  const normalized = cleaned.toLowerCase();

  // Prevent document/header words from being treated
  // as register numbers.
  if (HEADER_WORDS.some((word) => normalized === word)) {
    return false;
  }

  return true;
};

// ==========================================================
// FIND REGISTER NUMBERS
// ==========================================================
//
// This intentionally searches the COMPLETE extracted text
// instead of relying on PDF line boundaries.
//
// Example:
//
// Student Import Test Data...
// 1 24CSE001 Aarav Sharma aarav@testmail.com
// 2 24CSE002 Ananya Rao ananya@testmail.com
//
// Even if pdf-parse collapses these into one line, we can
// still locate the register numbers.
// ==========================================================

const findRegisterMatches = (text) => {
  const matches = [];

  const regex = /\b\d{2}[A-Za-z]{2,}[A-Za-z0-9/_-]*\d+\b/g;

  let match;

  while ((match = regex.exec(text)) !== null) {
    const registerNumber = match[0].trim();

    if (isValidRegisterNumber(registerNumber)) {
      matches.push({
        registerNumber,
        index: match.index,
        endIndex: match.index + match[0].length,
      });
    }
  }

  return matches;
};

// ==========================================================
// FIND EMAIL MATCHES
// ==========================================================

const findEmailMatches = (text) => {
  const matches = [];

  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push({
      email: match[0].trim().toLowerCase(),

      index: match.index,

      endIndex: match.index + match[0].length,
    });
  }

  return matches;
};

// ==========================================================
// CLEAN DOCUMENT PREFIX
// ==========================================================

const removeDocumentPrefix = (value) => {
  return String(value || "")
    .replace(/Student\s+Import\s+Test\s+Data/gi, " ")
    .replace(
      /Sample\s+PDF\s+for\s+Mentor[-–]Mentee\s+Management\s+System/gi,
      " ",
    )
    .replace(/Mentor[-–]Mentee\s+Management\s+System/gi, " ")
    .replace(/Register\s+Number/gi, " ")
    .replace(/Register\s+No\.?/gi, " ")
    .replace(/Student\s+Name/gi, " ")
    .replace(/NameEmail/gi, " ")
    .replace(/Email/gi, " ")
    .replace(/S\.?\s*No\.?/gi, " ")
    .replace(/Serial\s+Number/gi, " ")
    .replace(/Columns\s*:/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ==========================================================
// CLEAN STUDENT NAME
// ==========================================================

const cleanStudentName = (value) => {
  let name = String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Remove leading serial numbers.
  name = name.replace(/^\d+\s+/, "");

  // Remove obvious table/header leftovers.
  name = name.replace(/^(student\s+name|name)\s+/i, "");

  return name.trim();
};

// ==========================================================
// PARSE STUDENTS USING REGISTER + EMAIL POSITIONS
// ==========================================================
//
// This is the main parser.
//
// We DON'T assume that one student = one PDF line.
//
// Instead:
//
// REGISTER 1 -------- EMAIL 1
// REGISTER 2 -------- EMAIL 2
// REGISTER 3 -------- EMAIL 3
//
// The name is everything between a register number and
// its corresponding email.
// ==========================================================

const parseUsingPositions = (text) => {
  const registerMatches = findRegisterMatches(text);

  const emailMatches = findEmailMatches(text);

  const students = [];

  const parsingErrors = [];

  if (registerMatches.length === 0) {
    return {
      students: [],
      parsingErrors: [
        {
          row: 1,
          reason: "No valid student register numbers could be found in the PDF",
        },
      ],
    };
  }

  if (emailMatches.length === 0) {
    return {
      students: [],
      parsingErrors: [
        {
          row: 1,
          reason: "No student email addresses could be found in the PDF",
        },
      ],
    };
  }

  // ========================================================
  // PAIR REGISTERS WITH EMAILS
  // ========================================================

  for (let i = 0; i < registerMatches.length; i += 1) {
    const register = registerMatches[i];

    const nextRegister = registerMatches[i + 1];

    // ------------------------------------------------------
    // Find the first email after this register number.
    // ------------------------------------------------------

    const email = emailMatches.find(
      (emailMatch) =>
        emailMatch.index > register.endIndex &&
        (!nextRegister || emailMatch.index < nextRegister.index),
    );

    if (!email) {
      parsingErrors.push({
        row: i + 1,

        registerNumber: register.registerNumber,

        reason: "No email address found for this register number",
      });

      continue;
    }

    // ------------------------------------------------------
    // Extract name between register and email.
    // ------------------------------------------------------

    let nameText = text.slice(register.endIndex, email.index);

    nameText = removeDocumentPrefix(nameText);

    nameText = cleanStudentName(nameText);

    // ------------------------------------------------------
    // If the extracted name is empty, attempt to use the
    // text directly before the email.
    // ------------------------------------------------------

    if (!nameText) {
      parsingErrors.push({
        row: i + 1,

        registerNumber: register.registerNumber,

        email: email.email,

        reason: "Student name could not be identified",
      });

      continue;
    }

    // ------------------------------------------------------
    // Reject obvious header/document garbage.
    // ------------------------------------------------------

    const lowerName = nameText.toLowerCase();

    if (
      lowerName.includes("student import test data") ||
      lowerName === "student" ||
      lowerName === "name" ||
      lowerName === "email"
    ) {
      parsingErrors.push({
        row: i + 1,

        registerNumber: register.registerNumber,

        email: email.email,

        reason: "Extracted student name appears to be document/header text",
      });

      continue;
    }

    students.push({
      registerNumber: register.registerNumber,

      fullName: nameText,

      email: email.email,

      sourceRow: i + 1,
    });
  }

  return {
    students,
    parsingErrors,
  };
};

// ==========================================================
// FALLBACK LINE PARSER
// ==========================================================

const parseUsingLines = (text) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const students = [];

  const parsingErrors = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const emailMatch = line.match(EMAIL_REGEX);

    if (!emailMatch) {
      continue;
    }

    const email = emailMatch[0].trim().toLowerCase();

    const emailIndex = line.toLowerCase().lastIndexOf(email);

    let beforeEmail = line.slice(0, emailIndex).trim();

    if (!beforeEmail) {
      continue;
    }

    beforeEmail = removeDocumentPrefix(beforeEmail);

    let tokens = beforeEmail.split(/\s+/).filter(Boolean);

    // Remove serial number.
    if (tokens.length >= 3 && /^\d+$/.test(tokens[0])) {
      tokens = tokens.slice(1);
    }

    // Find register number.
    const registerIndex = tokens.findIndex((token) =>
      isValidRegisterNumber(token),
    );

    if (registerIndex === -1) {
      continue;
    }

    const registerNumber = tokens[registerIndex];

    const fullName = cleanStudentName(
      tokens.slice(registerIndex + 1).join(" "),
    );

    if (!fullName) {
      parsingErrors.push({
        row: i + 1,

        registerNumber,

        email,

        reason: "Student name could not be identified",
      });

      continue;
    }

    students.push({
      registerNumber,

      fullName,

      email,

      sourceRow: i + 1,
    });
  }

  return {
    students,
    parsingErrors,
  };
};

// ==========================================================
// REMOVE DUPLICATE PARSED STUDENTS
// ==========================================================

const removeParsedDuplicates = (students) => {
  const uniqueStudents = [];

  const seenRegisters = new Set();

  const seenEmails = new Set();

  for (const student of students) {
    const registerKey = student.registerNumber.trim().toLowerCase();

    const emailKey = student.email.trim().toLowerCase();

    if (seenRegisters.has(registerKey) || seenEmails.has(emailKey)) {
      continue;
    }

    seenRegisters.add(registerKey);

    seenEmails.add(emailKey);

    uniqueStudents.push(student);
  }

  return uniqueStudents;
};

// ==========================================================
// MAIN PDF PARSER
// ==========================================================

const parseStudentPdfText = (text) => {
  if (!text || !String(text).trim()) {
    throw new ApiError(400, "The uploaded PDF does not contain readable text");
  }

  const normalizedText = normalizePdfText(text);

  // ======================================================
  // PRIMARY PARSER
  // ======================================================

  const positionalResult = parseUsingPositions(normalizedText);

  let students = positionalResult.students;

  let parsingErrors = positionalResult.parsingErrors;

  // ======================================================
  // FALLBACK
  // ======================================================

  if (students.length === 0) {
    const lineResult = parseUsingLines(normalizedText);

    students = lineResult.students;

    parsingErrors = lineResult.parsingErrors;
  }

  // ======================================================
  // REMOVE DUPLICATES
  // ======================================================

  students = removeParsedDuplicates(students);

  return {
    students,
    parsingErrors,
  };
};

// ==========================================================
// DATABASE VALIDATION
// ==========================================================

const validateStudents = async (students) => {
  const validationErrors = [];

  // ======================================================
  // PDF REGISTER DUPLICATES
  // ======================================================

  const registerMap = new Map();

  for (const student of students) {
    const key = student.registerNumber.trim().toLowerCase();

    if (registerMap.has(key)) {
      validationErrors.push({
        row: student.sourceRow,

        registerNumber: student.registerNumber,

        reason: "Duplicate register number inside the PDF",
      });
    } else {
      registerMap.set(key, student.sourceRow);
    }
  }

  // ======================================================
  // PDF EMAIL DUPLICATES
  // ======================================================

  const emailMap = new Map();

  for (const student of students) {
    const key = student.email.trim().toLowerCase();

    if (emailMap.has(key)) {
      validationErrors.push({
        row: student.sourceRow,

        email: student.email,

        reason: "Duplicate email inside the PDF",
      });
    } else {
      emailMap.set(key, student.sourceRow);
    }
  }

  // ======================================================
  // UNIQUE VALUES
  // ======================================================

  const registerNumbers = [
    ...new Set(students.map((student) => student.registerNumber)),
  ];

  const emails = [...new Set(students.map((student) => student.email))];

  // ======================================================
  // EXISTING STUDENTS
  // ======================================================

  const existingStudents = await hodPrisma.students.findMany({
    where: {
      OR: [
        {
          registerNumber: {
            in: registerNumbers,
          },
        },

        {
          email: {
            in: emails,
          },
        },
      ],
    },

    select: {
      registerNumber: true,

      email: true,
    },
  });

  const existingRegisters = new Set(
    existingStudents.map((student) => student.registerNumber.toLowerCase()),
  );

  const existingStudentEmails = new Set(
    existingStudents
      .filter((student) => student.email)
      .map((student) => student.email.toLowerCase()),
  );

  // ======================================================
  // CHECK EXISTING STUDENTS
  // ======================================================

  for (const student of students) {
    if (existingRegisters.has(student.registerNumber.toLowerCase())) {
      validationErrors.push({
        row: student.sourceRow,

        registerNumber: student.registerNumber,

        reason: "Register number already exists",
      });
    }

    if (existingStudentEmails.has(student.email.toLowerCase())) {
      validationErrors.push({
        row: student.sourceRow,

        email: student.email,

        reason: "Email already exists for a student",
      });
    }
  }

  // ======================================================
  // EXISTING USER ACCOUNTS
  // ======================================================

  const existingUsers = await hodPrisma.user_accounts.findMany({
    where: {
      email: {
        in: emails,
      },
    },

    select: {
      email: true,
    },
  });

  const existingUserEmails = new Set(
    existingUsers
      .filter((user) => user.email)
      .map((user) => user.email.toLowerCase()),
  );

  for (const student of students) {
    if (existingUserEmails.has(student.email.toLowerCase())) {
      validationErrors.push({
        row: student.sourceRow,

        email: student.email,

        reason: "Email already exists as a user account",
      });
    }
  }

  // ======================================================
  // USERNAME COLLISION
  // ======================================================
  //
  // Username = registerNumber.
  //
  // Email remains the authentication identifier.
  // ======================================================

  const existingUsernames = await hodPrisma.user_accounts.findMany({
    where: {
      username: {
        in: registerNumbers,
      },
    },

    select: {
      username: true,
    },
  });

  const existingUsernameSet = new Set(
    existingUsernames.map((user) => user.username.toLowerCase()),
  );

  for (const student of students) {
    if (existingUsernameSet.has(student.registerNumber.toLowerCase())) {
      validationErrors.push({
        row: student.sourceRow,

        registerNumber: student.registerNumber,

        reason: "Register number is already used as a username",
      });
    }
  }

  return validationErrors;
};

// ==========================================================
// STUDENT SERVICE
// ==========================================================

class StudentService {
  // ========================================================
  // IMPORT STUDENTS FROM PDF
  // ========================================================

  async importStudentsFromPdf({ pdfText, departmentId, termId }) {
    // ======================================================
    // REQUIRED INPUT
    // ======================================================

    if (!departmentId) {
      throw new ApiError(400, "Department is required for student import");
    }

    if (!termId) {
      throw new ApiError(400, "Academic term is required for student import");
    }

    // ======================================================
    // VERIFY DEPARTMENT
    // ======================================================

    const department = await hodPrisma.departments.findUnique({
      where: {
        id: departmentId,
      },

      select: {
        id: true,

        name: true,

        code: true,
      },
    });

    if (!department) {
      throw new ApiError(404, "Selected department was not found");
    }

    // ======================================================
    // VERIFY TERM
    // ======================================================

    const term = await hodPrisma.academic_terms.findUnique({
      where: {
        id: termId,
      },

      select: {
        id: true,

        name: true,

        semesterNumber: true,

        status: true,

        startDate: true,

        endDate: true,
      },
    });

    if (!term) {
      throw new ApiError(404, "Selected academic term was not found");
    }

    // ======================================================
    // PARSE PDF
    // ======================================================

    const { students, parsingErrors } = parseStudentPdfText(pdfText);

    console.log("📄 Parsed PDF student count:", students.length);

    console.log("📄 Parsed students:", students);

    // ======================================================
    // NO VALID STUDENTS
    // ======================================================

    if (students.length === 0) {
      const error = new ApiError(
        400,
        "The PDF could not be parsed into valid student records",
      );

      error.parsingErrors = parsingErrors;

      throw error;
    }

    // ======================================================
    // DATABASE VALIDATION
    // ======================================================

    const validationErrors = await validateStudents(students);

    if (validationErrors.length) {
      const error = new ApiError(409, "Student import validation failed");

      error.validationErrors = validationErrors;

      error.parsingErrors = parsingErrors;

      throw error;
    }

    // ======================================================
    // HASH TEMPORARY PASSWORD
    // ======================================================

    const hashedPassword = await hashPassword(DEFAULT_PASSWORD);

    // ======================================================
    // CREATE EVERYTHING ATOMICALLY
    // ======================================================
    //
    // Each imported student receives:
    //
    // 1. user_accounts
    // 2. students
    // 3. student_enrollments
    //
    // If anything fails, EVERYTHING rolls back.
    // ======================================================

    const createdStudents = await hodPrisma.$transaction(async (tx) => {
      const created = [];

      for (const student of students) {
        const now = new Date();

        const userAccountId = randomUUID();

        const studentId = randomUUID();

        const enrollmentId = randomUUID();

        // ==================================================
        // USER ACCOUNT
        // ==================================================

        await tx.user_accounts.create({
          data: {
            id: userAccountId,

            /*
             * Username is the register number.
             * Authentication still uses email.
             */
            username: student.registerNumber,

            email: student.email,

            password: hashedPassword,

            role: "STUDENT",

            isActive: true,

            /*
             * Student must replace
             * Password@123 after first login.
             */
            mustChangePassword: true,

            createdAt: now,

            updatedAt: now,
          },
        });

        // ==================================================
        // STUDENT
        // ==================================================

        const createdStudent = await tx.students.create({
          data: {
            id: studentId,

            registerNumber: student.registerNumber,

            fullName: student.fullName,

            email: student.email,

            departmentId: departmentId,

            userAccountId: userAccountId,

            /*
             * Imported students are ACTIVE immediately.
             */
            status: "ACTIVE",

            /*
             * Remaining academic/profile
             * information can be completed later.
             */
            academicSetupCompleted: false,

            createdAt: now,

            updatedAt: now,
          },

          select: {
            id: true,

            registerNumber: true,

            fullName: true,

            email: true,

            departmentId: true,

            userAccountId: true,

            status: true,
          },
        });

        // ==================================================
        // ACTIVE TERM ENROLLMENT
        // ==================================================
        //
        // This is REQUIRED by the Assignments page.
        //
        // AssignmentService expects the student to have:
        //
        // student.status = ACTIVE
        //
        // AND:
        //
        // student_enrollments:
        //   termId = selected term
        //   status = ACTIVE
        //
        // ==================================================

        await tx.student_enrollments.create({
          data: {
            id: enrollmentId,

            studentId: studentId,

            termId: termId,

            semesterNumber: term.semesterNumber,

            status: "ACTIVE",

            enrolledAt: now,

            createdAt: now,

            updatedAt: now,
          },
        });

        created.push(createdStudent);
      }

      return created;
    });

    // ======================================================
    // RESULT
    // ======================================================

    return {
      importedCount: createdStudents.length,

      department: {
        id: department.id,

        name: department.name,

        code: department.code,
      },

      term: {
        id: term.id,

        name: term.name,

        semesterNumber: term.semesterNumber,
      },

      students: createdStudents.map((student) => ({
        registerNumber: student.registerNumber,

        fullName: student.fullName,

        email: student.email,

        status: student.status,
      })),

      temporaryPassword: DEFAULT_PASSWORD,

      mustChangePassword: true,

      parsingErrors,
    };
  }
}

// ==========================================================
// EXPORT
// ==========================================================

export default new StudentService();
