import { randomUUID } from "node:crypto";

import prisma from "../../../../config/prisma.hod.js";

import {
  uploadLocalFile,
  deleteLocalFile,
} from "../../../../utils/localStorage.js";

import { createFileAccessToken } from "../../../../utils/fileAccessToken.js";

class DocumentService {
  // ==========================================================
  // CATEGORY FOLDER MAP
  // ==========================================================

  getFolder(category) {
    const folderMap = {
      ACADEMICS: "academics",
      CERTIFICATES: "certificates",
      INTERNSHIPS: "internships",
      PROJECTS: "projects",
      RESEARCH: "research",
      CO_CURRICULAR: "co-curricular",
      EXTRA_CURRICULAR: "extra-curricular",
      AWARDS: "awards",
      PERSONAL: "personal",
      OTHER: "other",
    };

    return folderMap[category] ?? "other";
  }

  // ==========================================================
  // STORAGE IDENTIFICATION
  // ==========================================================

  isLocalFile(storageKey) {
    if (typeof storageKey !== "string") {
      return false;
    }

    if (!storageKey.startsWith("private/documents/")) {
      return false;
    }

    if (
      storageKey.includes("\\") ||
      storageKey.includes("\0")
    ) {
      return false;
    }

    const segments = storageKey.split("/");

    return (
      segments.length >= 3 &&
      segments.every(
        (segment) =>
          segment !== "" &&
          segment !== "." &&
          segment !== ".."
      )
    );
  }

  // ==========================================================
  // CLEANUP LOCAL FILE
  // ==========================================================

  async cleanupStoredFile(storageKey) {
    if (!storageKey) return;

    if (!this.isLocalFile(storageKey)) {
      console.warn(
        "Skipped cleanup: invalid local document storage key."
      );
      return;
    }

    await deleteLocalFile(storageKey);
  }

  // ==========================================================
  // GENERATE PRIVATE FILE URL
  // ==========================================================

  decorateDocument(document, userId) {
    if (!document) return document;

    const storageKey = document.cloudinaryPublicId;

    // Only local VPS storage keys are supported.
    // Do not expose legacy or unsupported external URLs.
    if (!this.isLocalFile(storageKey)) {
      return {
        ...document,
        fileUrl: null,
      };
    }

    const token = createFileAccessToken({
      storageKey,
      recordType: "student_document",
      recordId: document.id,
      userId,
    });

    return {
      ...document,
      fileUrl: `/api/files/private?token=${encodeURIComponent(token)}`,
    };
  }

  // ==========================================================
  // GET STUDENT BY USER ACCOUNT
  // ==========================================================

  async getStudent(userId) {
    const student = await prisma.students.findUnique({
      where: {
        userAccountId: userId,
      },
      select: {
        id: true,
        userAccountId: true,
      },
    });

    if (!student) {
      throw new Error("Student profile not found.");
    }

    return student;
  }

  // ==========================================================
  // UPLOAD DOCUMENT
  // ==========================================================

  async uploadDocument(userId, body, file) {
    const {
      documentName,
      category,
      description,
    } = body;

    if (!file) {
      throw new Error("Please upload a document.");
    }

    if (!category) {
      throw new Error("Document category is required.");
    }

    const student = await this.getStudent(userId);
    const folder = this.getFolder(category);

    const uploadedFile = await uploadLocalFile(
      file,
      "documents",
      [student.id, folder]
    );

    const now = new Date();

    try {
      const document = await prisma.student_documents.create({
        data: {
          id: randomUUID(),
          studentId: student.id,
          documentName,
          category,
          description: description || null,
          fileType: uploadedFile.fileType,
          fileSize: uploadedFile.fileSize,
          resourceType: uploadedFile.resourceType,

          // Existing database column stores the VPS storage key.
          cloudinaryPublicId: uploadedFile.storageKey,

          fileUrl: null,
          uploadedAt: now,
          updatedAt: now,
        },
      });

      return {
        success: true,
        message: "Document uploaded successfully.",
        data: this.decorateDocument(document, userId),
      };
    } catch (error) {
      if (uploadedFile?.storageKey) {
        try {
          await this.cleanupStoredFile(
            uploadedFile.storageKey
          );
        } catch (cleanupError) {
          console.error(
            "Failed to clean up local file after database creation failure:",
            cleanupError
          );
        }
      }

      throw error;
    }
  }

  // ==========================================================
  // GET DOCUMENT DASHBOARD
  // ==========================================================

  async getDashboard(userId, category = null) {
    const student = await this.getStudent(userId);

    const documentWhere = {
      studentId: student.id,
    };

    if (category) {
      documentWhere.category = category;
    }

    const documents = await prisma.student_documents.findMany({
      where: documentWhere,
      orderBy: {
        uploadedAt: "desc",
      },
    });

    const categoryCounts = await prisma.student_documents.groupBy({
      by: ["category"],
      where: documentWhere,
      _count: {
        category: true,
      },
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentlyAdded = documents.filter((document) => {
      return new Date(document.uploadedAt) >= sevenDaysAgo;
    }).length;

    const stats = {
      totalDocuments: documents.length,
      totalCategories: categoryCounts.length,
      recentlyAdded,
      totalFiles: documents.length,
    };

    return {
      success: true,
      data: {
        stats,

        categories: categoryCounts.map((item) => ({
          category: item.category,
          count: item._count.category,
        })),

        documents: documents.map((document) =>
          this.decorateDocument(document, userId)
        ),
      },
    };
  }

  // ==========================================================
  // GET SINGLE DOCUMENT
  // ==========================================================

  async getDocumentById(userId, documentId) {
    const student = await this.getStudent(userId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId: student.id,
      },
    });

    if (!document) {
      throw new Error("Document not found.");
    }

    const responseDocument = {
      id: document.id,
      studentId: document.studentId,
      documentName: document.documentName,
      category: document.category,
      description: document.description,
      fileType: document.fileType,
      fileSize: document.fileSize,
      resourceType: document.resourceType,
      cloudinaryPublicId: document.cloudinaryPublicId,
      fileUrl: document.fileUrl,
      uploadedAt: document.uploadedAt,
      updatedAt: document.updatedAt,

      researchReviewStatus: document.researchReviewStatus,
      reviewedByTeacherId: document.reviewedByTeacherId,
      reviewedAt: document.reviewedAt,
      mentorRemark: document.mentorRemark,
    };

    return {
      success: true,
      data: this.decorateDocument(
        responseDocument,
        userId
      ),
    };
  }

  // ==========================================================
  // UPDATE / REPLACE DOCUMENT
  // ==========================================================

  async updateDocument(userId, documentId, body, file) {
    const {
      documentName,
      category,
      description,
    } = body;

    const student = await this.getStudent(userId);

    const existingDocument = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId: student.id,
      },
    });

    if (!existingDocument) {
      throw new Error("Document not found.");
    }

    const newCategory = category ?? existingDocument.category;
    const hasReplacementFile = Boolean(file);

    // ========================================================
    // DETECT RESUBMISSIONS
    // ========================================================

    const isCertificateResubmission =
      existingDocument.category === "CERTIFICATES" &&
      newCategory === "CERTIFICATES" &&
      hasReplacementFile;

    const isResearchResubmission =
      existingDocument.category === "RESEARCH" &&
      newCategory === "RESEARCH" &&
      hasReplacementFile;

    const isCoCurricularResubmission =
      existingDocument.category === "CO_CURRICULAR" &&
      newCategory === "CO_CURRICULAR" &&
      hasReplacementFile;

    const isExtraCurricularResubmission =
      existingDocument.category === "EXTRA_CURRICULAR" &&
      newCategory === "EXTRA_CURRICULAR" &&
      hasReplacementFile;

    const isAwardsResubmission =
      existingDocument.category === "AWARDS" &&
      newCategory === "AWARDS" &&
      hasReplacementFile;

    const isReviewResubmission =
      isCertificateResubmission ||
      isResearchResubmission ||
      isCoCurricularResubmission ||
      isExtraCurricularResubmission ||
      isAwardsResubmission;

    // ========================================================
    // BUILD UPDATE DATA
    // ========================================================

    const updateData = {
      updatedAt: new Date(),
    };

    if (documentName !== undefined) {
      updateData.documentName = documentName;
    }

    if (category !== undefined) {
      updateData.category = category;
    }

    if (description !== undefined) {
      updateData.description = description || null;
    }

    // ========================================================
    // UPLOAD REPLACEMENT FILE TO LOCAL STORAGE
    // ========================================================

    let uploadedFile = null;

    if (file) {
      const folder = this.getFolder(newCategory);

      uploadedFile = await uploadLocalFile(
        file,
        "documents",
        [student.id, folder]
      );

      updateData.fileType = uploadedFile.fileType;
      updateData.fileSize = uploadedFile.fileSize;
      updateData.resourceType = uploadedFile.resourceType;

      // Existing database column stores the VPS storage key.
      updateData.cloudinaryPublicId = uploadedFile.storageKey;

      updateData.fileUrl = null;
    }

    // ========================================================
    // RESET REVIEW AFTER RESUBMISSION
    // ========================================================

    if (isReviewResubmission) {
      updateData.researchReviewStatus = "NOT_REVIEWED";
      updateData.reviewedByTeacherId = null;
      updateData.reviewedAt = null;
      updateData.mentorRemark = null;

      updateData.uploadedAt = new Date();
    }

    // ========================================================
    // UPDATE DATABASE
    // ========================================================

    let updatedDocument;

    try {
      updatedDocument = await prisma.student_documents.update({
        where: {
          id: documentId,
        },
        data: updateData,
      });
    } catch (error) {
      if (uploadedFile?.storageKey) {
        try {
          await this.cleanupStoredFile(
            uploadedFile.storageKey
          );
        } catch (cleanupError) {
          console.error(
            "Failed to clean up replacement upload after database failure:",
            cleanupError
          );
        }
      }

      throw error;
    }

    // ========================================================
    // DELETE OLD LOCAL FILE AFTER DATABASE SUCCESS
    // ========================================================

    if (
      uploadedFile &&
      existingDocument.cloudinaryPublicId
    ) {
      try {
        await this.cleanupStoredFile(
          existingDocument.cloudinaryPublicId
        );
      } catch (cleanupError) {
        console.error(
          "Failed to delete old document after replacement:",
          cleanupError
        );
      }
    }

    // ========================================================
    // RESPONSE MESSAGE
    // ========================================================

    let message = "Document updated successfully.";

    if (isCertificateResubmission) {
      message =
        "Certificate resubmitted successfully for mentor review.";
    } else if (isResearchResubmission) {
      message =
        "Research document resubmitted successfully for mentor review.";
    } else if (isCoCurricularResubmission) {
      message =
        "Co-Curricular activity resubmitted successfully for mentor review.";
    } else if (isExtraCurricularResubmission) {
      message =
        "Extra-Curricular activity resubmitted successfully for mentor review.";
    } else if (isAwardsResubmission) {
      message =
        "Award document resubmitted successfully for mentor review.";
    }

    return {
      success: true,
      message,
      data: this.decorateDocument(
        updatedDocument,
        userId
      ),
    };
  }

  // ==========================================================
  // DELETE DOCUMENT
  // ==========================================================

  async deleteDocument(userId, documentId) {
    const student = await this.getStudent(userId);

    const existingDocument = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId: student.id,
      },
    });

    if (!existingDocument) {
      throw new Error("Document not found.");
    }

    await prisma.student_documents.delete({
      where: {
        id: documentId,
      },
    });

    if (existingDocument.cloudinaryPublicId) {
      try {
        await this.cleanupStoredFile(
          existingDocument.cloudinaryPublicId
        );
      } catch (cleanupError) {
        console.error(
          "Failed to clean up deleted document storage:",
          cleanupError
        );
      }
    }

    return {
      success: true,
      message: "Document deleted successfully.",
    };
  }
}

export default new DocumentService();