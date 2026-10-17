
import hodPrisma from "../../../../config/prisma.hod.js";

const parseSemester = (value) => {
  const text = String(value ?? "").trim().toUpperCase();
  const numeric = text.match(/\d+/);

  if (numeric) {
    const number = Number(numeric[0]);
    return number >= 1 && number <= 8 ? number : null;
  }

  const roman = {
    VIII: 8,
    VII: 7,
    VI: 6,
    V: 5,
    IV: 4,
    III: 3,
    II: 2,
    I: 1,
  };

  return (
    Object.entries(roman).find(([key]) => text.includes(key))?.[1] ?? null
  );
};

const calculateAttendance = (semesters) => {
  const subjects = semesters.flatMap((semester) => semester.subjects ?? []);

  const classesHeld = subjects.reduce(
    (total, subject) => total + Number(subject.classesHeld || 0),
    0,
  );

  const classesAttended = subjects.reduce(
    (total, subject) => total + Number(subject.classesAttended || 0),
    0,
  );

  if (classesHeld > 0) {
    return {
      classesHeld,
      classesAttended,
      classesMissed: Math.max(classesHeld - classesAttended, 0),
      percentage: Number(
        ((classesAttended / classesHeld) * 100).toFixed(2),
      ),
    };
  }

  // Preserve legacy stored percentages when class counts are unavailable.
  const storedValues = subjects
    .map((subject) => subject.attendance)
    .filter((value) => value !== null && value !== undefined)
    .map(Number)
    .filter(Number.isFinite);

  const percentage = storedValues.length
    ? Number(
        (
          storedValues.reduce((sum, value) => sum + value, 0) /
          storedValues.length
        ).toFixed(2),
      )
    : 0;

  return {
    classesHeld: 0,
    classesAttended: 0,
    classesMissed: 0,
    percentage,
  };
};

class DashboardService {
  async getOverview(userAccountId) {
    if (!userAccountId) {
      const error = new Error("Authenticated user is required.");
      error.statusCode = 401;
      throw error;
    }

    const student = await hodPrisma.students.findUnique({
      where: { userAccountId },
      select: {
        id: true,
        fullName: true,
        semester: true,
        currentCGPA: true,
        overallAttendance: true,
      },
    });

    if (!student) {
      const error = new Error("Student profile not found.");
      error.statusCode = 404;
      throw error;
    }

    const currentSemester = parseSemester(student.semester);

    const [semesters, nextMeeting, documentCount, internshipCount] =
      await Promise.all([
        hodPrisma.academic_semesters.findMany({
          where: { studentId: student.id },
          select: {
            id: true,
            semesterNumber: true,
            sgpa: true,
            subjects: {
              select: {
                classesHeld: true,
                classesAttended: true,
                attendance: true,
              },
            },
          },
          orderBy: { semesterNumber: "asc" },
        }),

        hodPrisma.mentor_meetings.findFirst({
          where: {
            studentId: student.id,
            startAt: { gte: new Date() },
          },
          select: {
            id: true,
            title: true,
            startAt: true,
            endAt: true,
            status: true,
          },
          orderBy: { startAt: "asc" },
        }),

        hodPrisma.student_documents.count({
          where: { studentId: student.id },
        }),

        hodPrisma.student_internships.count({
          where: { studentId: student.id },
        }),
      ]);

    const attendance = calculateAttendance(semesters);

    // Use the existing stored percentage when subject counts
    // are unavailable, matching the existing attendance service.
    if (
      attendance.classesHeld === 0 &&
      student.overallAttendance !== null &&
      student.overallAttendance !== undefined
    ) {
      attendance.percentage = Number(student.overallAttendance) || 0;
    }

    return {
      student: {
        fullName: student.fullName,
        currentSemester,
        currentCGPA:
          student.currentCGPA === null ||
          student.currentCGPA === undefined
            ? null
            : Number(student.currentCGPA),
      },

      kpis: {
        currentSemester,
        cgpa:
          student.currentCGPA === null ||
          student.currentCGPA === undefined
            ? null
            : Number(student.currentCGPA),
        attendancePercentage: attendance.percentage,
        nextMeeting,
        documentCount,
        internshipCount,
      },

      sgpaTrend: semesters
        .filter(
          (semester) =>
            semester.sgpa !== null && semester.sgpa !== undefined,
        )
        .map((semester) => ({
          semesterNumber: semester.semesterNumber,
          semester: `Sem ${semester.semesterNumber}`,
          sgpa: Number(semester.sgpa),
        })),

      attendance,
    };
  }
}

export default new DashboardService();
