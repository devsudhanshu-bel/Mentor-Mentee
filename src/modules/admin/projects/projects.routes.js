import express from "express";
import prisma from "../../../config/prisma.hod.js";

const router = express.Router();

// Read-only Admin endpoints. Authentication and ADMIN authorization are
// inherited from admin.routes.js before this router is mounted.
router.get("/students", async (_req, res, next) => {
  try {
    const [students, assignments, projects] = await Promise.all([
      prisma.students.findMany({
        select: { id: true, fullName: true, registerNumber: true, email: true },
        orderBy: { fullName: "asc" },
      }),
      prisma.mentor_assignments.findMany({
        where: { status: "ACTIVE", academic_terms: { status: "ACTIVE" } },
        select: { studentId: true, teacherId: true },
      }),
      prisma.mentor_projects.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const teacherIds = [...new Set(assignments.map((a) => a.teacherId))];
    const teachers = teacherIds.length
      ? await prisma.teachers.findMany({
          where: { id: { in: teacherIds } },
          select: { id: true, fullName: true },
        })
      : [];
    const mentorById = new Map(teachers.map((t) => [t.id, t]));
    const assignmentByStudent = new Map();
    assignments.forEach((a) => {
      if (!assignmentByStudent.has(a.studentId)) assignmentByStudent.set(a.studentId, a);
    });
    const projectsByStudent = new Map();
    projects.forEach((p) => {
      if (!projectsByStudent.has(p.studentId)) projectsByStudent.set(p.studentId, []);
      projectsByStudent.get(p.studentId).push(p);
    });

    res.json({
      success: true,
      students: students.map((student) => {
        const assignment = assignmentByStudent.get(student.id);
        const mentor = assignment ? mentorById.get(assignment.teacherId) : null;
        return {
          ...student,
          mentorId: mentor?.id ?? null,
          mentorName: mentor?.fullName ?? "Not currently assigned",
          projects: projectsByStudent.get(student.id) ?? [],
          projectCount: (projectsByStudent.get(student.id) ?? []).length,
        };
      }),
      mentors: teachers.map((t) => ({ id: t.id, name: t.fullName })),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId", async (req, res, next) => {
  try {
    const project = await prisma.mentor_projects.findUnique({
      where: { id: req.params.projectId },
    });
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });

    const [student, mentor, messages] = await Promise.all([
      prisma.students.findUnique({ where: { id: project.studentId }, select: { id: true, fullName: true, registerNumber: true, email: true } }),
      prisma.teachers.findUnique({ where: { id: project.mentorId }, select: { id: true, fullName: true } }),
      prisma.mentor_project_messages.findMany({
        where: { projectId: project.id },
        orderBy: { createdAt: "asc" },
      }),
    ]);
    return res.json({ success: true, project, student, mentor, messages });
  } catch (error) {
    next(error);
  }
});

export default router;
