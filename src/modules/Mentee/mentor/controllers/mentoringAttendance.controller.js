import asyncHandler from "../../../../utils/asyncHandler.js";
import ApiResponse from "../../../../utils/ApiResponse.js";
import hodPrisma from "../../../../config/prisma.hod.js";
import ApiError from "../../../../utils/ApiError.js";

const getStudentMentoringAttendance = asyncHandler(async (req, res) => {
  const userAccountId = req.user?.id;
  if (!userAccountId) throw new ApiError(401, "Authentication required");

  // Resolve the student exclusively from the authenticated account; never accept a student ID from the client.
  const student = await hodPrisma.students.findUnique({
    where: { userAccountId },
    select: { id: true },
  });
  if (!student) throw new ApiError(404, "Student profile not found");

  // Use a parameterized read-only SQL query so this feature does not require
  // changing the Prisma schema or regenerating the client.
  const rows = await hodPrisma.$queryRaw`
    SELECT "sessionDate", status, "markedAt"
    FROM public.mentoring_attendance
    WHERE "studentId" = ${student.id}
    ORDER BY "sessionDate" DESC, "markedAt" DESC
  `;

  const present = rows.filter((row) => row.status === "PRESENT").length;
  const absent = rows.filter((row) => row.status === "ABSENT").length;
  const total = rows.length;

  const data = {
    summary: {
      total,
      present,
      absent,
      percentage: total ? Number(((present / total) * 100).toFixed(2)) : 0,
    },
    history: rows.map((row) => ({
      sessionDate: row.sessionDate,
      status: row.status,
      markedAt: row.markedAt,
    })),
  };

  return res.status(200).json(new ApiResponse(200, "Your mentoring attendance retrieved successfully", data));
});

export default { getStudentMentoringAttendance };
