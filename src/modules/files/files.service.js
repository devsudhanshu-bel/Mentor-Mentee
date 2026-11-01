import path from "node:path";

import prisma from "../../config/prisma.hod.js";
import ApiError from "../../utils/ApiError.js";

import { verifyFileAccessToken } from "../../utils/fileAccessToken.js";
import { getLocalFilePath } from "../../utils/localStorage.js";

// ==========================================================
// PRIVATE FILE SERVICE
// ==========================================================

class FilesService {
  // ========================================================
  // VERIFY VIEWER PERMISSION
  // ========================================================

  async assertDocumentAccess(user, studentId) {
    if (!user?.id || !user?.role) {
      throw new ApiError(401, "Authentication required.");
    }

    // STUDENT: OWN DOCUMENTS ONLY

    if (user.role === "STUDENT") {
      const student = await prisma.students.findFirst({
        where: {
          id: studentId,
          userAccountId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!student) {
        throw new ApiError(
          403,
          "You cannot access this document."
        );
      }

      return;
    }

    // MENTOR: ACTIVE ASSIGNMENT ONLY

    if (user.role === "MENTOR") {
      const mentor = await prisma.teachers.findUnique({
        where: {
          userAccountId: user.id,
        },
        select: {
          id: true,
          isActive: true,
        },
      });

      if (!mentor || !mentor.isActive) {
        throw new ApiError(
          403,
          "Active mentor profile not found."
        );
      }

      const assignment = await prisma.mentor_assignments.findFirst({
        where: {
          teacherId: mentor.id,
          studentId,
          status: "ACTIVE",
        },
        select: {
          id: true,
        },
      });

      if (!assignment) {
        throw new ApiError(
          403,
          "You are not authorized to access this student's documents."
        );
      }

      return;
    }

    // ADMIN / SYSTEM ADMIN

    if (
      user.role === "ADMIN" ||
      user.role === "SYSTEM_ADMIN"
    ) {
      return;
    }

    throw new ApiError(
      403,
      "You do not have permission to access this file."
    );
  }

  // ========================================================
  // GET STUDENT DOCUMENT
  // ========================================================

  async getStudentDocument(payload) {
    if (
      typeof payload.storageKey !== "string" ||
      !payload.storageKey.startsWith("private/documents/")
    ) {
      throw new ApiError(
        403,
        "Invalid document storage location."
      );
    }

    const document = await prisma.student_documents.findUnique({
      where: {
        id: payload.recordId,
      },
      select: {
        id: true,
        studentId: true,
        documentName: true,
        category: true,
        fileType: true,
        fileSize: true,
        cloudinaryPublicId: true,
        resourceType: true,
        uploadedAt: true,
      },
    });

    if (!document) {
      throw new ApiError(404, "Document not found.");
    }

    if (document.cloudinaryPublicId !== payload.storageKey) {
      throw new ApiError(
        403,
        "This file-access link is no longer valid."
      );
    }

    return {
      studentId: document.studentId,
      documentId: document.id,
      documentName: document.documentName,
      fileType: document.fileType,
      fileSize: document.fileSize,
      resourceType: document.resourceType,
      category: document.category,
    };
  }

  // ========================================================
  // GET INTERNSHIP DOCUMENT
  // ========================================================

  async getInternshipDocument(payload) {
    if (
      typeof payload.storageKey !== "string" ||
      !payload.storageKey.startsWith("private/internships/")
    ) {
      throw new ApiError(
        403,
        "Invalid internship document storage location."
      );
    }

    const document = await prisma.internship_documents.findUnique({
      where: {
        id: payload.recordId,
      },
      select: {
        id: true,
        internshipId: true,
        documentName: true,
        documentType: true,
        submissionStage: true,
        fileType: true,
        fileSize: true,
        cloudinaryPublicId: true,
        resourceType: true,
        uploadedAt: true,
        internship: {
          select: {
            studentId: true,
          },
        },
      },
    });

    if (!document) {
      throw new ApiError(
        404,
        "Internship document not found."
      );
    }

    if (!document.internship) {
      throw new ApiError(
        404,
        "Associated internship record not found."
      );
    }

    if (document.cloudinaryPublicId !== payload.storageKey) {
      throw new ApiError(
        403,
        "This file-access link is no longer valid."
      );
    }

    return {
      studentId: document.internship.studentId,
      documentId: document.id,
      documentName: document.documentName,
      fileType: document.fileType,
      fileSize: document.fileSize,
      resourceType: document.resourceType,
      category: "INTERNSHIPS",
      documentType: document.documentType,
      submissionStage: document.submissionStage,
    };
  }

  // ========================================================
  // GET PROJECT SUBMISSION
  // ========================================================

  async getProjectSubmission(payload) {
    if (
      typeof payload.storageKey !== "string" ||
      !payload.storageKey.startsWith("private/projects/")
    ) {
      throw new ApiError(
        403,
        "Invalid project submission storage location."
      );
    }

    const project = await prisma.mentor_projects.findUnique({
      where: {
        id: payload.recordId,
      },
      select: {
        id: true,
        studentId: true,
        submissionPublicId: true,
        submissionFilename: true,
        submissionMimeType: true,
        submissionSize: true,
        submittedAt: true,
      },
    });

    if (!project) {
      throw new ApiError(
        404,
        "Project submission not found."
      );
    }

    // CHECK THAT A SUBMISSION EXISTS FIRST

    if (!project.submissionPublicId) {
      throw new ApiError(
        404,
        "No project submission is available."
      );
    }

    // VERIFY THE STORAGE KEY

    if (project.submissionPublicId !== payload.storageKey) {
      throw new ApiError(
        403,
        "This project submission link is no longer valid."
      );
    }

    return {
      studentId: project.studentId,
      documentId: project.id,
      documentName:
        project.submissionFilename || "project-submission",
      fileType:
        project.submissionMimeType || "application/octet-stream",
      fileSize: project.submissionSize,
      resourceType: "raw",
      category: "PROJECTS",
    };
  }

  // ========================================================
  // GET AUTHORIZED PRIVATE DOCUMENT
  // ========================================================

  async getPrivateFile(user, token) {
    if (!user?.id || !user?.role) {
      throw new ApiError(401, "Authentication required.");
    }

    // VERIFY SIGNED TOKEN

    const payload = verifyFileAccessToken(token);

    // TOKEN MUST BELONG TO CURRENT VIEWER

    if (payload.userId !== user.id) {
      throw new ApiError(
        403,
        "This file-access link was issued to another user."
      );
    }

    // FETCH THE CORRECT DOCUMENT TYPE

    let document;

    if (payload.recordType === "student_document") {
      document = await this.getStudentDocument(payload);
    } else if (payload.recordType === "internship_document") {
      document = await this.getInternshipDocument(payload);
    } else if (payload.recordType === "project_submission") {
      document = await this.getProjectSubmission(payload);
    } else {
      throw new ApiError(
        400,
        "Unsupported file record type."
      );
    }

    // VERIFY CURRENT VIEWER PERMISSIONS

    await this.assertDocumentAccess(
      user,
      document.studentId
    );

    // RESOLVE SAFE FILESYSTEM PATH

    let filePath;

    try {
      filePath = await getLocalFilePath(payload.storageKey);
    } catch (error) {
      if (
        error.code === "ENOENT" ||
        error.code === "ENOTDIR"
      ) {
        throw new ApiError(
          404,
          "Stored document file not found."
        );
      }

      throw error;
    }

    // RETURN FILE INFORMATION TO CONTROLLER

    return {
      filePath,
      fileName: path.basename(filePath),
      documentName: document.documentName,
      fileType: document.fileType,
      fileSize: document.fileSize,
      resourceType: document.resourceType,
      category: document.category,
      documentId: document.documentId,
      documentType: document.documentType,
      submissionStage: document.submissionStage,
    };
  }
}

export default new FilesService();