import { randomUUID } from "crypto";
import hodPrisma from "../src/config/prisma.hod.js";

// Recovery utility for a term transition that already ended mentor assignments
// without carrying them forward. Defaults to DRY RUN. Use --apply only after
// reviewing the counts and backing up the database.
const apply = process.argv.includes("--apply");

const main = async () => {
  const activeTerm = await hodPrisma.academic_terms.findFirst({
    where: { status: "ACTIVE" },
    orderBy: { startDate: "desc" },
  });
  if (!activeTerm) throw new Error("No active academic term found.");

  const previousTerm = await hodPrisma.academic_terms.findFirst({
    where: { status: "COMPLETED", endDate: { lte: activeTerm.startDate } },
    orderBy: { endDate: "desc" },
  });
  if (!previousTerm) throw new Error("No completed previous term found.");

  const endedAssignments = await hodPrisma.mentor_assignments.findMany({
    where: { termId: previousTerm.id, status: "ENDED" },
    include: {
      students: { select: { id: true, status: true, semester: true } },
    },
  });

  let candidates = [];
  for (const old of endedAssignments) {
    if (old.students?.status !== "ACTIVE") continue;
    const enrollment = await hodPrisma.student_enrollments.findFirst({
      where: {
        studentId: old.studentId,
        termId: activeTerm.id,
        status: "ACTIVE",
      },
      select: { id: true, semesterNumber: true },
    });
    if (!enrollment || Number(enrollment.semesterNumber) >= 9) continue;
    const exists = await hodPrisma.mentor_assignments.findFirst({
      where: {
        studentId: old.studentId,
        teacherId: old.teacherId,
        termId: activeTerm.id,
        status: "ACTIVE",
      },
      select: { id: true },
    });
    if (!exists) candidates.push(old);
  }

  console.log({
    mode: apply ? "APPLY" : "DRY RUN",
    previousTerm: previousTerm.name,
    activeTerm: activeTerm.name,
    assignmentsToRestore: candidates.length,
  });

  if (!apply) {
    console.log("No records changed. Review the count, back up the DB, then rerun with --apply if correct.");
    return;
  }

  await hodPrisma.$transaction(async (tx) => {
    for (const old of candidates) {
      const duplicate = await tx.mentor_assignments.findFirst({
        where: {
          studentId: old.studentId,
          teacherId: old.teacherId,
          termId: activeTerm.id,
          status: "ACTIVE",
        }, select: { id: true },
      });
      if (duplicate) continue;
      await tx.mentor_assignments.create({
        data: {
          id: randomUUID(),
          studentId: old.studentId,
          teacherId: old.teacherId,
          termId: activeTerm.id,
          status: "ACTIVE",
          assignedAt: new Date(),
          assignedBy: old.assignedBy,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }, { maxWait: 10000, timeout: 60000 });
  console.log("Mentor assignments restored for the active term.");
};

main().catch((error) => {
  console.error("Recovery failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await hodPrisma.$disconnect();
});
