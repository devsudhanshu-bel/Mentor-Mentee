import { randomUUID } from "node:crypto";
import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

const dateOnly = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) {
    throw new ApiError(400, "date must use YYYY-MM-DD format");
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new ApiError(400, "A valid session date is required");
  }
  return parsed;
};

const toDateString = (date) => date.toISOString().slice(0, 10);

const getAccountId = (user) =>
  user?.id ?? user?.userId ?? user?.sub ?? user?.accountId ?? null;

async function resolveMentor(user) {
  if (user?.teacherId) {
    const byTeacherId = await prisma.teachers.findUnique({
      where: { id: user.teacherId },
      select: { id: true, isActive: true },
    });
    if (byTeacherId?.isActive) return byTeacherId;
  }

  const accountId = getAccountId(user);
  if (!accountId) throw new ApiError(401, "Authenticated account ID is missing");

  const mentor = await prisma.teachers.findFirst({
    where: {
      OR: [{ userAccountId: accountId }, { id: accountId }],
    },
    select: { id: true, isActive: true },
  });

  if (!mentor || !mentor.isActive) {
    throw new ApiError(403, "Active mentor profile not found for this account");
  }
  return mentor;
}

async function getAssignedStudents(mentorTeacherId) {
  const assignments = await prisma.mentor_assignments.findMany({
    where: { teacherId: mentorTeacherId, status: "ACTIVE" },
    select: {
      students: {
        select: {
          id: true,
          fullName: true,
          registerNumber: true,
          email: true,
          section: true,
          semester: true,
        },
      },
    },
  });

  const unique = new Map();
  for (const row of assignments) {
    if (row.students) unique.set(row.students.id, row.students);
  }
  return [...unique.values()].sort((a, b) =>
    (a.fullName || "").localeCompare(b.fullName || "")
  );
}

class MentoringAttendanceService {
  async getForDate(user, inputDate) {
    const date = dateOnly(inputDate);
    const mentor = await resolveMentor(user);
    const [students, saved] = await Promise.all([
      getAssignedStudents(mentor.id),
      prisma.mentoring_attendance.findMany({
        where: { mentorTeacherId: mentor.id, sessionDate: date },
        select: { studentId: true, status: true, markedAt: true },
      }),
    ]);

    const savedByStudent = new Map(saved.map((row) => [row.studentId, row]));
    const records = students.map((student) => {
      const record = savedByStudent.get(student.id);
      return {
        ...student,
        status: record?.status ?? null,
        markedAt: record?.markedAt ?? null,
      };
    });
    const marked = records.filter((record) => record.status !== null);
    const present = marked.filter((record) => record.status === "PRESENT").length;
    const absent = marked.filter((record) => record.status === "ABSENT").length;

    return {
      date: toDateString(date),
      students: records,
      submitted: saved.length > 0,
      summary: {
        total: records.length,
        marked: marked.length,
        present,
        absent,
        unmarked: records.length - marked.length,
        percentage: marked.length ? Math.round((present / marked.length) * 100) : 0,
      },
    };
  }

  async getStudentSummary(user, studentId) {
    if (!studentId) throw new ApiError(400, "Student ID is required");
    const mentor = await resolveMentor(user);

    const assignment = await prisma.mentor_assignments.findFirst({
      where: {
        teacherId: mentor.id,
        studentId,
        status: "ACTIVE",
      },
      select: { studentId: true },
    });

    if (!assignment) {
      throw new ApiError(403, "You can only view attendance for your currently assigned mentees");
    }

    const rows = await prisma.mentoring_attendance.findMany({
      where: { mentorTeacherId: mentor.id, studentId },
      select: { sessionDate: true, status: true, markedAt: true },
      orderBy: { sessionDate: "desc" },
    });

    const present = rows.filter((row) => row.status === "PRESENT").length;
    const absent = rows.filter((row) => row.status === "ABSENT").length;
    const total = present + absent;

    return {
      studentId,
      summary: {
        present,
        absent,
        total,
        percentage: total ? Math.round((present / total) * 1000) / 10 : 0,
      },
      history: rows.map((row) => ({
        sessionDate: toDateString(row.sessionDate),
        status: row.status,
        markedAt: row.markedAt,
      })),
    };
  }

  async saveForDate(user, body = {}) {
    const date = dateOnly(body.date);
    if (!Array.isArray(body.records) || body.records.length === 0) {
      throw new ApiError(400, "Mark at least one mentee before saving attendance");
    }

    const mentor = await resolveMentor(user);
    const assigned = await prisma.mentor_assignments.findMany({
      where: { teacherId: mentor.id, status: "ACTIVE" },
      select: { studentId: true },
    });
    const assignedIds = new Set(assigned.map((row) => row.studentId));

    // A date is a one-time submission. Existing records (including records
    // saved before this lock was added) make that mentor/date read-only.
    const existing = await prisma.mentoring_attendance.findFirst({
      where: { mentorTeacherId: mentor.id, sessionDate: date },
      select: { id: true },
    });
    if (existing) {
      throw new ApiError(409, "Attendance has already been submitted for this date and cannot be changed.");
    }

    const seen = new Set();

    for (const record of body.records) {
      if (!record?.studentId || !["PRESENT", "ABSENT"].includes(record.status)) {
        throw new ApiError(400, "Each record requires studentId and status PRESENT or ABSENT");
      }
      if (!assignedIds.has(record.studentId)) {
        throw new ApiError(403, "You can only mark attendance for your currently assigned mentees");
      }
      if (seen.has(record.studentId)) {
        throw new ApiError(400, "Duplicate student attendance record in request");
      }
      seen.add(record.studentId);
    }

    if (seen.size !== assignedIds.size || [...assignedIds].some((id) => !seen.has(id))) {
      throw new ApiError(400, "Mark Present or Absent for every assigned mentee before submitting attendance.");
    }

    const now = new Date();
    await prisma.$transaction(
      body.records.map((record) =>
        prisma.mentoring_attendance.create({
          data: {
            id: randomUUID(),
            mentorTeacherId: mentor.id,
            studentId: record.studentId,
            sessionDate: date,
            status: record.status,
            markedAt: now,
            createdAt: now,
            updatedAt: now,
          },
        })
      )
    );

    return this.getForDate(user, toDateString(date));
  }
}

export default new MentoringAttendanceService();
