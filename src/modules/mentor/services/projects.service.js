import { randomUUID } from "node:crypto";

import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

import { createFileAccessToken } from "../../../utils/fileAccessToken.js";

const PROJECT_STATUSES = [
  "ASSIGNED",
  "ONGOING",
  "COMPLETED",
];

class ProjectsService {
  // ==========================================================
  // MENTOR HELPERS
  // ==========================================================

  async getMentor(userId) {
    const mentor = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!mentor || !mentor.isActive) {
      throw new ApiError(404, "Active mentor teacher record not found.");
    }

    return mentor;
  }

  async assertAssignedStudent(mentorId, studentId) {
    const assignment = await prisma.mentor_assignments.findFirst({
      where: {
        teacherId: mentorId,
        studentId,
        status: "ACTIVE",
        academic_terms: {
          status: "ACTIVE",
        },
      },
      select: {
        id: true,
      },
    });

    if (!assignment) {
      throw new ApiError(
        403,
        "This student is not currently assigned to you."
      );
    }
  }

  // ==========================================================
  // PROJECT FILE DECORATION
  // ==========================================================

  decorateProject(project, userId) {
    if (!project) {
      return project;
    }

    const storageKey = project.submissionPublicId;

    // Only VPS private project files are supported.
    // Legacy or invalid storage references are not exposed.
    if (
      typeof storageKey !== "string" ||
      !storageKey.startsWith("private/projects/") ||
      storageKey.includes("\\") ||
      storageKey.includes("..")
    ) {
      return {
        ...project,
        submissionUrl: null,
      };
    }

    const token = createFileAccessToken({
      storageKey,
      recordType: "project_submission",
      recordId: project.id,
      userId,
    });

    return {
      ...project,
      submissionUrl: `/api/files/private?token=${encodeURIComponent(token)}`,
    };
  }

  // ==========================================================
  // LIST STUDENT PROJECTS
  // ==========================================================

  async listStudentProjects(userId, studentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(
      mentor.id,
      studentId
    );

    const projects = await prisma.mentor_projects.findMany({
      where: {
        mentorId: mentor.id,
        studentId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      projects: projects.map((project) =>
        this.decorateProject(project, userId)
      ),
    };
  }

  // ==========================================================
  // CREATE PROJECT
  // ==========================================================

  async createProject(userId, studentId, payload) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(
      mentor.id,
      studentId
    );

    const title =
      typeof payload.title === "string"
        ? payload.title.trim()
        : "";

    const projectType =
      typeof payload.projectType === "string"
        ? payload.projectType.trim()
        : "";

    const description =
      typeof payload.description === "string"
        ? payload.description.trim()
        : "";

    if (description.length > 5000) {
      throw new ApiError(
        400,
        "Project description must be 5000 characters or fewer."
      );
    }

    if (!title) {
      throw new ApiError(400, "Project title is required.");
    }

    if (title.length > 180) {
      throw new ApiError(
        400,
        "Project title must be 180 characters or fewer."
      );
    }

    if (!projectType) {
      throw new ApiError(400, "Project type is required.");
    }

    if (projectType.length > 80) {
      throw new ApiError(
        400,
        "Project type must be 80 characters or fewer."
      );
    }

    let deadline = null;

    if (payload.deadline) {
      deadline = new Date(
        `${payload.deadline}T00:00:00.000Z`
      );

      if (Number.isNaN(deadline.getTime())) {
        throw new ApiError(
          400,
          "A valid deadline is required."
        );
      }
    }

    const now = new Date();

    return prisma.mentor_projects.create({
      data: {
        id: `mp_${randomUUID()}`,
        studentId,
        mentorId: mentor.id,
        title,
        projectType,
        description: description || null,
        deadline,
        status: "ASSIGNED",
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  // ==========================================================
  // GET PROJECT MESSAGES
  // ==========================================================

  async getProjectMessages(userId, projectId) {
    const mentor = await this.getMentor(userId);

    const project = await prisma.mentor_projects.findFirst({
      where: {
        id: projectId,
        mentorId: mentor.id,
      },
      select: {
        id: true,
        studentId: true,
      },
    });

    if (!project) {
      throw new ApiError(404, "Project not found.");
    }

    await this.assertAssignedStudent(
      mentor.id,
      project.studentId
    );

    return prisma.mentor_project_messages.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  // ==========================================================
  // SEND PROJECT MESSAGE
  // ==========================================================

  async sendProjectMessage(userId, projectId, payload) {
    const mentor = await this.getMentor(userId);

    const project = await prisma.mentor_projects.findFirst({
      where: {
        id: projectId,
        mentorId: mentor.id,
      },
      select: {
        id: true,
        studentId: true,
      },
    });

    if (!project) {
      throw new ApiError(404, "Project not found.");
    }

    await this.assertAssignedStudent(
      mentor.id,
      project.studentId
    );

    const message =
      typeof payload.message === "string"
        ? payload.message.trim()
        : "";

    if (!message) {
      throw new ApiError(400, "Message cannot be empty.");
    }

    if (message.length > 5000) {
      throw new ApiError(
        400,
        "Message must be 5000 characters or fewer."
      );
    }

    return prisma.mentor_project_messages.create({
      data: {
        id: `pm_${randomUUID()}`,
        projectId,
        senderUserAccountId: userId,
        senderRole: "MENTOR",
        message,
      },
    });
  }

  // ==========================================================
  // UPDATE PROJECT STATUS
  // ==========================================================

  async updateProjectStatus(userId, projectId, status) {
    if (!PROJECT_STATUSES.includes(status)) {
      throw new ApiError(
        400,
        "Status must be ASSIGNED, ONGOING, or COMPLETED."
      );
    }

    const mentor = await this.getMentor(userId);

    const project = await prisma.mentor_projects.findFirst({
      where: {
        id: projectId,
        mentorId: mentor.id,
      },
      select: {
        id: true,
        studentId: true,
      },
    });

    if (!project) {
      throw new ApiError(404, "Project not found.");
    }

    await this.assertAssignedStudent(
      mentor.id,
      project.studentId
    );

    return prisma.mentor_projects.update({
      where: {
        id: projectId,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  }
}

export default new ProjectsService();