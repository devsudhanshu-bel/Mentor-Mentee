import { randomBytes, randomUUID } from "crypto";

import hodPrisma from "../../../config/prisma.hod.js";

import ApiError from "../../../utils/ApiError.js";

import { hashPassword } from "../../../utils/hash.js";
import StudentCredentialsEmailService from "../../../services/studentCredentialsEmail.service.js";

// ==========================================================
// PER-STUDENT TEMPORARY PASSWORD
// ==========================================================

const generateTemporaryPassword = () => randomBytes(18).toString("base64url");

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

  // PDF text extraction can join the register number directly to the name.
  // Example: "AIDS26TEST017Test Student" must split into register "AIDS26TEST017"
  // and name "Test Student".
  const regex = /\b[A-Za-z][A-Za-z0-9/_-]*?\d+(?=\s|[A-Z][a-z]+\s|$)|\b\d{2}[A-Za-z][A-Za-z0-9/_-]*?\d+(?=\s|[A-Z][a-z]+\s|$)/g;

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

    // Extract an optional semester number after the email,
    // up to the next student's register number.
    const afterEmailEnd = email.endIndex;
    const nextRegisterStart = nextRegister ? nextRegister.index : text.length;
    const trailingStudentText = text.slice(afterEmailEnd, nextRegisterStart);
    const semesterMatch =
      trailingStudentText.match(/\bsemester(?:\s+number)?\s*[:#-]?\s*(\d{1,2})\b/i) ||
      trailingStudentText.match(/(?:^|\s)([1-8])\s*$/);
    const semesterNumber = semesterMatch ? Number(semesterMatch[1]) : null;

    students.push({
      registerNumber: register.registerNumber,
      fullName: nameText,
      email: email.email,
      semesterNumber,
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
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const students = [];
  const parsingErrors = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const emailMatch = line.match(EMAIL_REGEX);

    if (!emailMatch) continue;

    const email = emailMatch[0].trim().toLowerCase();
    const emailIndex = line.toLowerCase().indexOf(email);
    if (emailIndex < 0) continue;

    // Only inspect text BEFORE the email for a register number.
    // This prevents email-domain fragments such as "com4" from
    // being mistaken for register numbers.
    let beforeEmail = removeDocumentPrefix(line.slice(0, emailIndex));
    beforeEmail = beforeEmail.replace(/^\s*\d+\s+/, "").trim();

    // Prefer a register number ending in digits immediately before
    // a capitalized name token, e.g. AIDS26TEST017Test Student.
    // The lookahead splits the register at 017, before "Test".
    let registerNumber = null;
    let nameText = "";

    const joinedColumnsMatch = beforeEmail.match(
      /^([A-Za-z][A-Za-z0-9/_-]*?\d{2,})(?=[A-Z][a-z]+\s)([\s\S]*)$/
    );

    if (joinedColumnsMatch) {
      registerNumber = joinedColumnsMatch[1];
      nameText = joinedColumnsMatch[2].trim();
    } else {
      const tokens = beforeEmail.split(/\s+/).filter(Boolean);
      const registerIndex = tokens.findIndex((token) =>
        isValidRegisterNumber(token)
      );

      if (registerIndex >= 0) {
        registerNumber = tokens[registerIndex];
        nameText = tokens.slice(registerIndex + 1).join(" ").trim();
      }
    }

    if (!registerNumber || !isValidRegisterNumber(registerNumber)) {
      parsingErrors.push({
        row: i + 1,
        email,
        reason: "A valid register number could not be identified before the email",
      });
      continue;
    }

    nameText = cleanStudentName(nameText);

    // If a PDF line is laid out as REGISTER+NAME, separate the
    // leading title-cased name from the register number safely.
    if (!nameText) {
      parsingErrors.push({
        row: i + 1,
        registerNumber,
        email,
        reason: "Student name could not be identified",
      });
      continue;
    }

    const trailingText = line.slice(emailIndex + email.length);
    const semesterMatch =
      trailingText.match(/^\s*(?:semester(?:\s+number)?\s*[:#-]?\s*)?([1-8])\b/i) ||
      trailingText.match(/\bsemester(?:\s+number)?\s*[:#-]?\s*([1-8])\b/i);
    const semesterNumber = semesterMatch ? Number(semesterMatch[1]) : null;

    students.push({
      registerNumber,
      fullName: nameText,
      email,
      semesterNumber,
      sourceRow: i + 1,
    });
  }

  return { students, parsingErrors };
};


// ==========================================================
// FLATTENED TABLE PARSER
// Handles PDFs where all table rows are extracted as one line,
// e.g. 2362044ASHUTOSH DASHashutosh...in7 2362005ABHISHEK...
// ==========================================================
const parseFlattenedTable = (text) => {
  // Use a case-sensitive match first: when the PDF joins an uppercase name
  // directly to a lowercase email (e.g. DASHashutosh@...), a case-insensitive
  // regex incorrectly consumes the final name token as part of the email.
  const emails = [];
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/g;
  let emailMatch;
  while ((emailMatch = emailRegex.exec(text)) !== null) {
    emails.push({
      email: emailMatch[0].trim().toLowerCase(),
      index: emailMatch.index,
      endIndex: emailMatch.index + emailMatch[0].length,
    });
  }
  const students = [];
  const parsingErrors = [];

  for (let i = 0; i < emails.length; i += 1) {
    const email = emails[i];
    const previousEmailEnd = i === 0 ? 0 : emails[i - 1].endIndex;
    const beforeEmail = text.slice(previousEmailEnd, email.index);

    // The supplied university register numbers are seven digits and
    // may be concatenated directly with the student's name.
    const registerMatches = [...beforeEmail.matchAll(/\d{7}(?=[A-Z])/g)];
    const registerMatch = registerMatches[registerMatches.length - 1];

    if (!registerMatch) {
      parsingErrors.push({ row: i + 1, email: email.email, reason: "Could not identify a 7-digit register number before this email" });
      continue;
    }

    const registerNumber = registerMatch[0];
    let fullName = beforeEmail.slice(registerMatch.index + registerNumber.length);
    fullName = removeDocumentPrefix(fullName)
      .replace(/^[^A-Za-z]+/, "")
      .replace(/\s+/g, " ")
      .trim();

    // Remove stray table/header fragments; names should contain letters only
    // plus spaces, periods, apostrophes, or hyphens.
    fullName = fullName.replace(/[^A-Za-z .'-].*$/, "").trim();

    if (!fullName || !/[A-Za-z]/.test(fullName)) {
      parsingErrors.push({ row: i + 1, registerNumber, email: email.email, reason: "Could not identify a valid student name" });
      continue;
    }

    const nextEmailStart = i + 1 < emails.length ? emails[i + 1].index : text.length;
    const afterEmail = text.slice(email.endIndex, nextEmailStart);
    const semesterMatch = afterEmail.match(/^\s*([1-8])\b/) || afterEmail.match(/semester(?:\s+number)?\s*[:#-]?\s*([1-8])\b/i);

    students.push({
      registerNumber,
      fullName,
      email: email.email,
      semesterNumber: semesterMatch ? Number(semesterMatch[1]) : null,
      sourceRow: i + 1,
    });
  }

  return { students, parsingErrors };
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

  // First parse by email-delimited records. This works even when the PDF
  // extractor flattens every table row into one long line.
  const flattenedResult = parseFlattenedTable(normalizedText);
  let students = flattenedResult.students;
  let parsingErrors = flattenedResult.parsingErrors;

  // For older alphanumeric register formats, retain existing parsers as fallback.
  if (students.length === 0) {
    const lineResult = parseUsingLines(normalizedText);
    students = lineResult.students;
    parsingErrors = lineResult.parsingErrors;
    if (students.length === 0) {
      const positionalResult = parseUsingPositions(normalizedText);
      students = positionalResult.students;
      parsingErrors = positionalResult.parsingErrors;
    }
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
  // An inactive STUDENT account with the same username/email and no
  // linked student profile is an orphan left by a previous deletion or
  // interrupted workflow. It can be safely reactivated by the import
  // transaction below. All other account collisions remain validation errors.

  const existingUsers = await hodPrisma.user_accounts.findMany({
    where: {
      OR: [
        { email: { in: emails } },
        { username: { in: registerNumbers } },
      ],
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
      students: { select: { id: true } },
    },
  });

  for (const student of students) {
    const normalizedEmail = student.email.trim().toLowerCase();
    const normalizedRegister = student.registerNumber.trim().toLowerCase();

    const emailAccount = existingUsers.find(
      (user) => user.email?.trim().toLowerCase() === normalizedEmail,
    );
    const usernameAccount = existingUsers.find(
      (user) => user.username?.trim().toLowerCase() === normalizedRegister,
    );

    const reusableOrphan =
      emailAccount &&
      usernameAccount &&
      emailAccount.id === usernameAccount.id &&
      emailAccount.role === "STUDENT" &&
      emailAccount.isActive === false &&
      emailAccount.students === null &&
      emailAccount.username.trim().toLowerCase() === normalizedRegister &&
      emailAccount.email?.trim().toLowerCase() === normalizedEmail;

    if (emailAccount && !reusableOrphan) {
      validationErrors.push({
        row: student.sourceRow,
        email: student.email,
        reason: "Email already exists as a user account",
      });
    }

    if (usernameAccount && !reusableOrphan) {
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

    console.log("📄 RAW EXTRACTED PDF TEXT:", JSON.stringify(pdfText));

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
        const temporaryPassword = generateTemporaryPassword();
        const hashedPassword = await hashPassword(temporaryPassword);

        // ==================================================
        // USER ACCOUNT
        // ==================================================
        // Reuse only the exact inactive, unlinked STUDENT account that
        // passed validation. This repairs orphaned accounts without
        // weakening duplicate checks for active or unrelated accounts.

        const existingOrphanAccount = await tx.user_accounts.findFirst({
          where: {
            username: student.registerNumber,
            email: student.email,
            role: "STUDENT",
            isActive: false,
            students: { is: null },
          },
          select: { id: true },
        });

        const accountId = existingOrphanAccount?.id || userAccountId;

        if (existingOrphanAccount) {
          await tx.user_accounts.update({
            where: { id: existingOrphanAccount.id },
            data: {
              password: hashedPassword,
              isActive: true,
              mustChangePassword: true,
              updatedAt: now,
            },
          });
        } else {
          await tx.user_accounts.create({
            data: {
              id: accountId,
              username: student.registerNumber,
              email: student.email,
              password: hashedPassword,
              role: "STUDENT",
              isActive: true,
              mustChangePassword: true,
              createdAt: now,
              updatedAt: now,
            },
          });
        }

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

            userAccountId: accountId,

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

            semesterNumber: student.semesterNumber ?? term.semesterNumber,

            status: "ACTIVE",

            enrolledAt: now,

            createdAt: now,

            updatedAt: now,
          },
        });

        created.push({
          student: createdStudent,
          temporaryPassword,
        });
      }

      return created;
    });

    // ======================================================
    // SEND TEMPORARY PASSWORD EMAILS AFTER DATABASE COMMIT
    // ======================================================
    // Email delivery is deliberately outside the transaction: an SMTP
    // outage must not roll back already-created student records.
    // Failed sends are reported so they can be retried safely without
    // importing the same students a second time.
    // ======================================================

    const emailResults = await Promise.all(
      createdStudents.map(async ({ student, temporaryPassword }) => {
        try {
          await StudentCredentialsEmailService.sendTemporaryPassword({
            email: student.email,
            fullName: student.fullName,
            registerNumber: student.registerNumber,
            temporaryPassword,
          });

          return { email: student.email.toLowerCase(), sent: true };
        } catch (error) {
          console.error(
            `Failed to send temporary-password email to ${student.email}:`,
            error?.message || error,
          );

          return { email: student.email.toLowerCase(), sent: false };
        }
      }),
    );

    const emailResultByAddress = new Map(
      emailResults.map((item) => [item.email, item.sent]),
    );

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

      students: createdStudents.map(({ student }) => ({
        registerNumber: student.registerNumber,

        fullName: student.fullName,

        email: student.email,

        semesterNumber: student.semesterNumber ?? term.semesterNumber,

        status: student.status,

        temporaryPasswordEmailSent: emailResultByAddress.get(student.email.toLowerCase()) === true,
      })),

      emailSummary: {
        sent: emailResults.filter((item) => item.sent).length,
        failed: emailResults.filter((item) => !item.sent).length,
        failedEmails: emailResults.filter((item) => !item.sent).map((item) => item.email),
      },

      mustChangePassword: true,

      parsingErrors,
    };
  }

  // ==========================================================
  // DELETE AN INCORRECT STUDENT ENTRY
  // ==========================================================
  // Only safe to hard-delete records that have no academic or
  // mentoring history. The linked login account is deactivated
  // rather than deleted to avoid removing unrelated audit data.
  async deleteStudent(studentId) {
    if (!studentId || typeof studentId !== "string") {
      throw new ApiError(400, "A valid student ID is required.");
    }

    const student = await hodPrisma.students.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        registerNumber: true,
        fullName: true,
        userAccountId: true,
      },
    });

    if (!student) {
      throw new ApiError(404, "Student not found.");
    }

    // This endpoint is intended for correcting unassigned student
    // entries. Do not silently delete a student with assignments.
    const activeAssignment = await hodPrisma.mentor_assignments.findFirst({
      where: { studentId: student.id },
      select: { id: true },
    });
    if (activeAssignment) {
      throw new ApiError(
        409,
        "This student has mentor assignment records. Remove or review those records before deleting the student.",
      );
    }

    // Preserve student data when related academic/history records exist.
    const dependencyChecks = [
      ["mentor_meetings", () => hodPrisma.mentor_meetings.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["mentor_meeting_series", () => hodPrisma.mentor_meeting_series.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["mentor_transfer_requests", () => hodPrisma.mentor_transfer_requests.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["mentor_projects", () => hodPrisma.mentor_projects.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["academic_semesters", () => hodPrisma.academic_semesters.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["academic_backlogs", () => hodPrisma.academic_backlogs.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["detentions", () => hodPrisma.detentions.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["student_documents", () => hodPrisma.student_documents.findFirst({ where: { studentId: student.id }, select: { id: true } })],
      ["student_internships", () => hodPrisma.student_internships.findFirst({ where: { studentId: student.id }, select: { id: true } })],
    ];

    for (const [relationName, check] of dependencyChecks) {
      // Some installations may not expose an optional legacy model.
      if (typeof check !== "function") continue;
      const relatedRecord = await check();
      if (relatedRecord) {
        throw new ApiError(
          409,
          `This student has related ${relationName.replaceAll("_", " ")} records. Deletion was blocked to protect historical data.`,
        );
      }
    }

    await hodPrisma.$transaction(async (tx) => {
      // Enrollment rows belong to the student record and are safe to
      // remove only after the historical-dependency checks above pass.
      await tx.student_enrollments.deleteMany({
        where: { studentId: student.id },
      });

      await tx.students.delete({
        where: { id: student.id },
      });

      if (student.userAccountId) {
        await tx.user_accounts.updateMany({
          where: { id: student.userAccountId },
          data: { isActive: false },
        });
      }
    });

    return {
      id: student.id,
      registerNumber: student.registerNumber,
      fullName: student.fullName,
      message: "Student entry deleted successfully.",
    };
  }

}

// ==========================================================
// EXPORT
// ==========================================================

export default new StudentService();
