import prisma from "../../../../config/prisma.hod.js";

import uploadToCloudinary from "../../../../utils/cloudinaryUpload.js";
import deleteFromCloudinary from "../../../../utils/cloudinaryDelete.js";

class DocumentService {
  // ==========================================================
  // FOLDER MAP
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

    return `mentor-mentee/mentee/documents/${
      folderMap[category] ?? "other"
    }`;
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
    const { documentName, category, description } = body;

    if (!file) {
      throw new Error("Please upload a document.");
    }

    if (!category) {
      throw new Error("Document category is required.");
    }

    const student = await this.getStudent(userId);
    const folder = this.getFolder(category);

    const uploadedFile = await uploadToCloudinary(file, folder);
    const now = new Date();

    try {
      const document = await prisma.student_documents.create({
        data: {
          id: crypto.randomUUID(),
          studentId: student.id,
          documentName,
          category,
          description: description || null,
          fileType: uploadedFile.fileType,
          fileSize: uploadedFile.fileSize,
          resourceType: uploadedFile.resourceType,
          cloudinaryPublicId: uploadedFile.publicId,
          fileUrl: uploadedFile.url,
          uploadedAt: now,
          updatedAt: now,
        },
      });

      return {
        success: true,
        message: "Document uploaded successfully.",
        data: document,
      };
    } catch (error) {
      // Clean up Cloudinary if database creation fails.
      if (uploadedFile?.publicId) {
        try {
          await deleteFromCloudinary(
            uploadedFile.publicId,
            uploadedFile.resourceType
          );
        } catch (cleanupError) {
          console.error(
            "Failed to clean up uploaded file after database creation failure:",
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
        documents,
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

    return {
      success: true,
      data: {
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

        // Review information shared with student and mentor.
        researchReviewStatus: document.researchReviewStatus,
        reviewedByTeacherId: document.reviewedByTeacherId,
        reviewedAt: document.reviewedAt,
        mentorRemark: document.mentorRemark,
      },
    };
  }

  // ==========================================================
  // UPDATE / REPLACE DOCUMENT
  // ==========================================================

  async updateDocument(userId, documentId, body, file) {
    const { documentName, category, description } = body;

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
    // A replacement file is required to trigger a review reset.
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
    // UPLOAD REPLACEMENT FILE
    // ========================================================

    let uploadedFile = null;

    if (file) {
      const folder = this.getFolder(newCategory);

      uploadedFile = await uploadToCloudinary(file, folder);

      updateData.fileType = uploadedFile.fileType;
      updateData.fileSize = uploadedFile.fileSize;
      updateData.resourceType = uploadedFile.resourceType;
      updateData.cloudinaryPublicId = uploadedFile.publicId;
      updateData.fileUrl = uploadedFile.url;
    }

    // ========================================================
    // RESET REVIEW AFTER RESUBMISSION
    // ========================================================

    if (isReviewResubmission) {
      updateData.researchReviewStatus = "NOT_REVIEWED";
      updateData.reviewedByTeacherId = null;
      updateData.reviewedAt = null;
      updateData.mentorRemark = null;

      // Record the latest submission time.
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
      // Remove the replacement asset if the database update fails.
      if (uploadedFile?.publicId) {
        try {
          await deleteFromCloudinary(
            uploadedFile.publicId,
            uploadedFile.resourceType
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
    // DELETE OLD CLOUDINARY ASSET AFTER DATABASE SUCCESS
    // ========================================================

    if (
      uploadedFile &&
      existingDocument.cloudinaryPublicId &&
      existingDocument.cloudinaryPublicId !== uploadedFile.publicId
    ) {
      try {
        await deleteFromCloudinary(
          existingDocument.cloudinaryPublicId,
          existingDocument.resourceType
        );
      } catch (cloudinaryError) {
        // The database already references the replacement file.
        console.error(
          "Failed to delete old Cloudinary document:",
          cloudinaryError
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
      data: updatedDocument,
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

    if (existingDocument.cloudinaryPublicId) {
      await deleteFromCloudinary(
        existingDocument.cloudinaryPublicId,
        existingDocument.resourceType
      );
    }

    await prisma.student_documents.delete({
      where: {
        id: documentId,
      },
    });

    return {
      success: true,
      message: "Document deleted successfully.",
    };
  }
}

export default new DocumentService();