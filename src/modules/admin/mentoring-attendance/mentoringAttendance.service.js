import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

const toDateString = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 10);
};

class AdminMentoringAttendanceService {
  async getStudentSummary(studentId) {
    if (!studentId) throw new ApiError(400, "Student ID is required");

    const student = await prisma.students.findUnique({
      where: { id: studentId },
      select: { id: true, fullName: true, registerNumber: true },
    });
    if (!student) throw new ApiError(404, "Student not found");

    const rows = await prisma.mentoring_attendance.findMany({
      where: { studentId },
      select: { sessionDate: true, status: true, markedAt: true },
      orderBy: [{ sessionDate: "desc" }, { markedAt: "desc" }],
    });

    const present = rows.filter((row) => row.status === "PRESENT").length;
    const absent = rows.filter((row) => row.status === "ABSENT").length;
    const total = present + absent;

    return {
      student,
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
}

export default new AdminMentoringAttendanceService();
