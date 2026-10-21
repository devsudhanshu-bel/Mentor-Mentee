import hodPrisma from "../../../../config/prisma.hod.js";
import ApiError from "../../../../utils/ApiError.js";
import uploadToCloudinary from "../../../../utils/cloudinaryUpload.js";
import { randomUUID } from "node:crypto";

class StudentProjectsService {
  async getStudent(userAccountId) {
    const student = await hodPrisma.students.findUnique({
      where: { userAccountId },
      select: { id: true, fullName: true },
    });
    if (!student) throw new ApiError(404, "Student profile not found.");
    return student;
  }

  async getUnreadCount(userAccountId) {
    const student = await this.getStudent(userAccountId);
    const count = await hodPrisma.mentor_projects.count({
      where: { studentId: student.id, studentViewedAt: null },
    });
    return { unreadCount: count };
  }

  async listMyProjects(userAccountId) {
    const student = await this.getStudent(userAccountId);
    const projects = await hodPrisma.mentor_projects.findMany({
      where: { studentId: student.id },
      orderBy: [{ createdAt: "desc" }],
      include: { teachers: { select: { fullName: true, email: true } } },
    });
    await hodPrisma.mentor_projects.updateMany({
      where: { studentId: student.id, studentViewedAt: null },
      data: { studentViewedAt: new Date() },
    });
    return { projects };
  }

  async getProjectMessages(userAccountId, projectId) {
    const student = await this.getStudent(userAccountId);
    const project = await hodPrisma.mentor_projects.findFirst({ where: { id: projectId, studentId: student.id }, select: { id: true } });
    if (!project) throw new ApiError(404, "Project not found for this student.");
    return hodPrisma.mentor_project_messages.findMany({ where: { projectId }, orderBy: { createdAt: "asc" } });
  }

  async sendProjectMessage(userAccountId, projectId, payload) {
    const student = await this.getStudent(userAccountId);
    const project = await hodPrisma.mentor_projects.findFirst({ where: { id: projectId, studentId: student.id }, select: { id: true, status: true } });
    if (!project) throw new ApiError(404, "Project not found for this student.");
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    if (!message) throw new ApiError(400, "Message cannot be empty.");
    if (message.length > 5000) throw new ApiError(400, "Message must be 5000 characters or fewer.");
    return hodPrisma.mentor_project_messages.create({ data: { id: `pm_${randomUUID()}`, projectId, senderUserAccountId: userAccountId, senderRole: "STUDENT", message } });
  }

  async submitProject(userAccountId, projectId, file, submissionMessage = "") {
    if (!file) throw new ApiError(400, "Choose a project file before submitting.");
    if (file.size > 30 * 1024 * 1024) throw new ApiError(400, "The file must be 30 MB or smaller.");
    const student = await this.getStudent(userAccountId);
    const project = await hodPrisma.mentor_projects.findFirst({
      where: { id: projectId, studentId: student.id },
      select: { id: true, status: true, submissionPublicId: true },
    });
    if (!project) throw new ApiError(404, "Project not found for this student.");
    if (String(project.status).toUpperCase() === "COMPLETED") {
      throw new ApiError(400, "This project is already marked completed and cannot accept another submission.");
    }

    const optionalMessage = typeof submissionMessage === "string" ? submissionMessage.trim() : "";
    if (optionalMessage.length > 5000) throw new ApiError(400, "Submission message must be 5000 characters or fewer.");
    const uploaded = await uploadToCloudinary(file, "mentor-mentee/project-submissions");
    const now = new Date();
    const updatedProject = await hodPrisma.mentor_projects.update({
      where: { id: projectId },
      data: {
        submissionUrl: uploaded.url,
        submissionPublicId: uploaded.publicId,
        submissionFilename: file.originalname,
        submissionMimeType: file.mimetype || "application/octet-stream",
        submissionSize: file.size,
        submittedAt: now,
        updatedAt: now,
      },
    });
    if (optionalMessage) await hodPrisma.mentor_project_messages.create({ data: { id: `pm_${randomUUID()}`, projectId, senderUserAccountId: userAccountId, senderRole: "STUDENT", message: optionalMessage } });
    return updatedProject;
  }
}

export default new StudentProjectsService();
