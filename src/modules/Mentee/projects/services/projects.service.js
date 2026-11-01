import hodPrisma from "../../../../config/prisma.hod.js";
import ApiError from "../../../../utils/ApiError.js";

import {
  uploadLocalFile,
  deleteLocalFile,
} from "../../../../utils/localStorage.js";

import { createFileAccessToken } from "../../../../utils/fileAccessToken.js";
import { randomUUID } from "node:crypto";

class StudentProjectsService {
  // ==========================================================
  // STORAGE HELPERS
  // ==========================================================

  isLocalFile(storageKey) {
    return (
      typeof storageKey === "string" &&
      storageKey.startsWith("private/projects/") &&
      !storageKey.includes("..") &&
      !storageKey.includes("\\")
    );
  }

  async cleanupStoredFile(storageKey) {
    if (!storageKey) return;

    // Only delete files belonging to the local projects directory.
    // Do not delete unknown or unsupported storage keys.
    if (!this.isLocalFile(storageKey)) {
      console.warn(
        "Skipping project file cleanup: unsupported storage key."
      );
      return;
    }

    try {
      await deleteLocalFile(storageKey);
    } catch (error) {
      console.error("Project file cleanup failed:", error);
    }
  }

  decorateProject(project, userAccountId) {
    if (!project?.submissionPublicId) return project;

    if (!this.isLocalFile(project.submissionPublicId)) {
      return project;
    }

    const token = createFileAccessToken({
      storageKey: project.submissionPublicId,
      recordType: "project_submission",
      recordId: project.id,
      userId: userAccountId,
    });

    return {
      ...project,
      submissionUrl: `/api/files/private?token=${encodeURIComponent(token)}`,
    };
  }

  // ==========================================================
  // STUDENT
  // ==========================================================

  async getStudent(userAccountId) {
    const student = await hodPrisma.students.findUnique({
      where: { userAccountId },
      select: {
        id: true,
        fullName: true,
      },
    });

    if (!student) {
      throw new ApiError(404, "Student profile not found.");
    }

    return student;
  }

  // ==========================================================
  // UNREAD COUNT
  // ==========================================================

  async getUnreadCount(userAccountId) {
    const student = await this.getStudent(userAccountId);

    const count = await hodPrisma.mentor_projects.count({
      where: {
        studentId: student.id,
        studentViewedAt: null,
      },
    });

    return { unreadCount: count };
  }

  // ==========================================================
  // LIST PROJECTS
  // ==========================================================

  async listMyProjects(userAccountId) {
    const student = await this.getStudent(userAccountId);

    const projects = await hodPrisma.mentor_projects.findMany({
      where: { studentId: student.id },
      orderBy: [{ createdAt: "desc" }],
      include: {
        teachers: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    await hodPrisma.mentor_projects.updateMany({
      where: {
        studentId: student.id,
        studentViewedAt: null,
      },
      data: {
        studentViewedAt: new Date(),
      },
    });

    return {
      projects: projects.map((project) =>
        this.decorateProject(project, userAccountId)
      ),
    };
  }

  // ==========================================================
  // GET PROJECT MESSAGES
  // ==========================================================

  async getProjectMessages(userAccountId, projectId) {
    const student = await this.getStudent(userAccountId);

    const project = await hodPrisma.mentor_projects.findFirst({
      where: {
        id: projectId,
        studentId: student.id,
      },
      select: { id: true },
    });

    if (!project) {
      throw new ApiError(404, "Project not found for this student.");
    }

    return hodPrisma.mentor_project_messages.findMany({
      where: { projectId },
      orderBy: { createdAt: "asc" },
    });
  }

  // ==========================================================
  // SEND PROJECT MESSAGE
  // ==========================================================

  async sendProjectMessage(userAccountId, projectId, payload) {
    const student = await this.getStudent(userAccountId);

    const project = await hodPrisma.mentor_projects.findFirst({
      where: {
        id: projectId,
        studentId: student.id,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!project) {
      throw new ApiError(404, "Project not found for this student.");
    }

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

    return hodPrisma.mentor_project_messages.create({
      data: {
        id: `pm_${randomUUID()}`,
        projectId,
        senderUserAccountId: userAccountId,
        senderRole: "STUDENT",
        message,
      },
    });
  }

  // ==========================================================
  // SUBMIT PROJECT
  // Persistent VPS storage
  // ==========================================================

  async submitProject(
    userAccountId,
    projectId,
    file,
    submissionMessage = ""
  ) {
    if (!file) {
      throw new ApiError(
        400,
        "Choose a project file before submitting."
      );
    }

    if (file.size > 30 * 1024 * 1024) {
      throw new ApiError(
        400,
        "The file must be 30 MB or smaller."
      );
    }

    const student = await this.getStudent(userAccountId);

    const project = await hodPrisma.mentor_projects.findFirst({
      where: {
        id: projectId,
        studentId: student.id,
      },
      select: {
        id: true,
        status: true,
        submissionPublicId: true,
      },
    });

    if (!project) {
      throw new ApiError(404, "Project not found for this student.");
    }

    if (String(project.status).toUpperCase() === "COMPLETED") {
      throw new ApiError(
        400,
        "This project is already marked completed and cannot accept another submission."
      );
    }

    const optionalMessage =
      typeof submissionMessage === "string"
        ? submissionMessage.trim()
        : "";

    if (optionalMessage.length > 5000) {
      throw new ApiError(
        400,
        "Submission message must be 5000 characters or fewer."
      );
    }

    // Upload to persistent VPS storage.
    const uploaded = await uploadLocalFile(
      file,
      "projects",
      [project.id]
    );

    let updatedProject;

    try {
      const now = new Date();

      // Update project and create optional message atomically.
      updatedProject = await hodPrisma.$transaction(async (tx) => {
        const updated = await tx.mentor_projects.update({
          where: { id: projectId },
          data: {
            submissionUrl: null,
            submissionPublicId: uploaded.storageKey,
            submissionFilename: file.originalname,
            submissionMimeType:
              file.mimetype || "application/octet-stream",
            submissionSize: file.size,
            submittedAt: now,
            updatedAt: now,
          },
        });

        if (optionalMessage) {
          await tx.mentor_project_messages.create({
            data: {
              id: `pm_${randomUUID()}`,
              projectId,
              senderUserAccountId: userAccountId,
              senderRole: "STUDENT",
              message: optionalMessage,
            },
          });
        }

        return updated;
      });
    } catch (error) {
      // Database transaction failed: remove the newly uploaded file.
      await this.cleanupStoredFile(uploaded.storageKey);
      throw error;
    }

    // Delete the previous local file only after the DB succeeds.
    if (
      project.submissionPublicId &&
      project.submissionPublicId !== uploaded.storageKey
    ) {
      await this.cleanupStoredFile(project.submissionPublicId);
    }

    return this.decorateProject(updatedProject, userAccountId);
  }
}

export default new StudentProjectsService();