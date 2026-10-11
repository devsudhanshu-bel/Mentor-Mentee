
import hodPrisma from "../../../config/prisma.hod.js";

const MIN_SEMESTER = 1;
const MAX_SEMESTER = 8;

const httpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateSemester = (semester) =>
  Number.isInteger(semester) &&
  semester >= MIN_SEMESTER &&
  semester <= MAX_SEMESTER;

const calculatePercentage = (attended, held) => {
  if (held <= 0) return 0;
  return Number(((attended / held) * 100).toFixed(2));
};

const getStoredAttendanceAverage = (subjects) => {
  const values = subjects
    .map((subject) => {
      if (
        subject.attendance === null ||
        subject.attendance === undefined
      ) {
        return null;
      }

      const value = Number(subject.attendance);
      return Number.isFinite(value) ? value : null;
    })
    .filter((value) => value !== null);

  if (!values.length) return 0;

  return Number(
    (
      values.reduce((total, value) => total + value, 0) /
      values.length
    ).toFixed(2),
  );
};

const calculateSummary = (subjects) => {
  const classesHeld = subjects.reduce(
    (total, subject) =>
      total + Number(subject.classesHeld || 0),
    0,
  );

  const classesAttended = subjects.reduce(
    (total, subject) =>
      total + Number(subject.classesAttended || 0),
    0,
  );

  const percentage =
    classesHeld > 0
      ? calculatePercentage(classesAttended, classesHeld)
      : getStoredAttendanceAverage(subjects);

  return {
    classesHeld,
    classesAttended,
    percentage,
  };
};

const formatSubject = (subject) => {
  const classesHeld = Number(subject.classesHeld || 0);
  const classesAttended = Number(subject.classesAttended || 0);

  const percentage =
    classesHeld > 0
      ? calculatePercentage(classesAttended, classesHeld)
      : subject.attendance !== null &&
          subject.attendance !== undefined
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
    storedAttendance:
      subject.attendance !== null &&
      subject.attendance !== undefined
        ? Number(subject.attendance)
        : null,
  };
};

const getCurrentSemesterNumber = (semester) => {
  const value = String(semester || "")
    .trim()
    .toUpperCase();

  const numericMatch = value.match(/\d+/);

  if (numericMatch) {
    const number = Number(numericMatch[0]);

    if (number >= 1 && number <= 8) {
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

  for (const [roman, number] of Object.entries(
    romanSemesters,
  )) {
    if (value.includes(roman)) {
      return number;
    }
  }

  return 1;
};

const getMentor = async (mentorUserId) => {
  const mentor = await hodPrisma.teachers.findUnique({
    where: {
      userAccountId: mentorUserId,
    },
    select: {
      id: true,
      fullName: true,
      employeeCode: true,
      email: true,
      designation: true,
    },
  });

  if (!mentor) {
    throw httpError("Mentor profile not found.", 404);
  }

  return mentor;
};

const getStudentSemesterAttendance = async ({
  mentorUserId,
  studentId,
  semester,
}) => {
  if (!validateSemester(semester)) {
    throw httpError(
      "Semester must be between 1 and 8.",
      400,
    );
  }

  // Resolve the authenticated mentor.
  const mentor = await getMentor(mentorUserId);

  // Verify that this student is actively assigned to the mentor.
  const assignment =
    await hodPrisma.mentor_assignments.findFirst({
      where: {
        studentId,
        teacherId: mentor.id,
        status: "ACTIVE",
      },
      select: {
        id: true,
      },
    });

  if (!assignment) {
    throw httpError(
      "You are not authorized to view this student's attendance.",
      403,
    );
  }

  // Fetch the assigned student.
  const student = await hodPrisma.students.findUnique({
    where: {
      id: studentId,
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
    },
  });

  if (!student) {
    throw httpError("Student profile not found.", 404);
  }

  // Fetch semester and subjects.
  const academicSemester =
    await hodPrisma.academic_semesters.findUnique({
      where: {
        studentId_semesterNumber: {
          studentId,
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

  const rawSubjects = academicSemester?.subjects || [];
  const subjects = rawSubjects.map(formatSubject);
  const summary = calculateSummary(rawSubjects);

  const hasAttendance = rawSubjects.some(
    (subject) =>
      Number(subject.classesHeld || 0) > 0 ||
      (subject.attendance !== null &&
        subject.attendance !== undefined),
  );

  return {
    semester,
    semesterExists: Boolean(academicSemester),
    currentSemester: getCurrentSemesterNumber(
      student.semester,
    ),
    hasAttendance,
    student: {
      id: student.id,
      registerNumber: student.registerNumber,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      profileImage: student.profileImage,
      programme: student.programme,
      semester: student.semester,
      academicStanding: student.academicStanding,
      currentCGPA: student.currentCGPA,
      totalCredits: student.totalCredits,
      overallAttendance: student.overallAttendance,
    },
    mentor,
    academicYear: null,
    term: null,
    subjects,
    summary,
  };
};

// IMPORTANT: Default export required by attendance.controller.js
const mentorAttendanceService = {
  getStudentSemesterAttendance,
};

export default mentorAttendanceService;
