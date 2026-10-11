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

    return `mentor-mentee/mentee/documents/${folderMap[category] ?? "other"}`;
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

    // --------------------------------------------------------
    // Validate file
    // --------------------------------------------------------

    if (!file) {
      throw new Error("Please upload a document.");
    }

    // --------------------------------------------------------
    // Validate category
    // --------------------------------------------------------

    if (!category) {
      throw new Error("Document category is required.");
    }

    // --------------------------------------------------------
    // Find student
    // --------------------------------------------------------

    const student = await this.getStudent(userId);

    // --------------------------------------------------------
    // Determine Cloudinary folder
    // --------------------------------------------------------

    const folder = this.getFolder(category);

    // --------------------------------------------------------
    // Upload file to Cloudinary
    // --------------------------------------------------------

    const uploadedFile = await uploadToCloudinary(file, folder);

    // --------------------------------------------------------
    // Save document
    // --------------------------------------------------------

    const now = new Date();

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

    // --------------------------------------------------------
    // Return response
    // --------------------------------------------------------

    return {
      success: true,

      message: "Document uploaded successfully.",

      data: document,
    };
  }

  // ==========================================================
  // GET DOCUMENT DASHBOARD
  //
  // GET /api/mentee/documents/dashboard
  // GET /api/mentee/documents/dashboard?category=RESEARCH
  // ==========================================================

  async getDashboard(userId, category = null) {
    // --------------------------------------------------------
    // Find student
    // --------------------------------------------------------

    const student = await this.getStudent(userId);

    // --------------------------------------------------------
    // Build document filter
    // --------------------------------------------------------

    const documentWhere = {
      studentId: student.id,
    };

    // --------------------------------------------------------
    // Apply category filter
    // --------------------------------------------------------

    if (category) {
      documentWhere.category = category;
    }

    // --------------------------------------------------------
    // Get documents
    // --------------------------------------------------------

    const documents = await prisma.student_documents.findMany({
      where: documentWhere,

      orderBy: {
        uploadedAt: "desc",
      },
    });

    // --------------------------------------------------------
    // Get category counts
    // --------------------------------------------------------

    const categoryCounts = await prisma.student_documents.groupBy({
      by: ["category"],

      where: documentWhere,

      _count: {
        category: true,
      },
    });

    // --------------------------------------------------------
    // Calculate recently added
    // --------------------------------------------------------

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentlyAdded = documents.filter((document) => {
      const uploadedDate = new Date(document.uploadedAt);

      return uploadedDate >= sevenDaysAgo;
    }).length;

    // --------------------------------------------------------
    // Stats
    // --------------------------------------------------------

    const stats = {
      totalDocuments: documents.length,

      totalCategories: categoryCounts.length,

      recentlyAdded,

      totalFiles: documents.length,
    };

    // --------------------------------------------------------
    // Return dashboard
    // --------------------------------------------------------

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
    // --------------------------------------------------------
    // Find student
    // --------------------------------------------------------

    const student = await this.getStudent(userId);

    // --------------------------------------------------------
    // Find document belonging to student
    // --------------------------------------------------------

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,

        studentId: student.id,
      },
    });

    if (!document) {
      throw new Error("Document not found.");
    }

    // --------------------------------------------------------
    // Return complete document information
    // --------------------------------------------------------

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
      },
    };
  }

  // ==========================================================
  // UPDATE DOCUMENT
  // ==========================================================

  async updateDocument(userId, documentId, body, file) {
    const { documentName, category, description } = body;

    // --------------------------------------------------------
    // Find student
    // --------------------------------------------------------

    const student = await this.getStudent(userId);

    // --------------------------------------------------------
    // Find existing document
    // --------------------------------------------------------

    const existingDocument = await prisma.student_documents.findFirst({
      where: {
        id: documentId,

        studentId: student.id,
      },
    });

    if (!existingDocument) {
      throw new Error("Document not found.");
    }

    // --------------------------------------------------------
    // Prepare database update
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // Replace Cloudinary file
    // --------------------------------------------------------

    if (file) {
      // ------------------------------------------------------
      // Determine folder
      // ------------------------------------------------------

      const newCategory = category ?? existingDocument.category;

      const folder = this.getFolder(newCategory);

      // ------------------------------------------------------
      // Upload NEW file FIRST
      // ------------------------------------------------------

      const uploadedFile = await uploadToCloudinary(file, folder);

      // ------------------------------------------------------
      // Delete OLD Cloudinary file
      // ------------------------------------------------------

      if (existingDocument.cloudinaryPublicId) {
        try {
          await deleteFromCloudinary(
            existingDocument.cloudinaryPublicId,
            existingDocument.resourceType,
          );
        } catch (cloudinaryError) {
          console.error(
            "Failed to delete old Cloudinary document:",
            cloudinaryError,
          );

          // Do not stop the update because
          // the new file was uploaded successfully.
        }
      }

      // ------------------------------------------------------
      // Store NEW Cloudinary information
      // ------------------------------------------------------

      updateData.fileType = uploadedFile.fileType;

      updateData.fileSize = uploadedFile.fileSize;

      updateData.resourceType = uploadedFile.resourceType;

      updateData.cloudinaryPublicId = uploadedFile.publicId;

      updateData.fileUrl = uploadedFile.url;
    }

    // --------------------------------------------------------
    // Update database
    // --------------------------------------------------------

    const updatedDocument = await prisma.student_documents.update({
      where: {
        id: documentId,
      },

      data: updateData,
    });

    // --------------------------------------------------------
    // Return updated document
    // --------------------------------------------------------

    return {
      success: true,

      message: "Document updated successfully.",

      data: updatedDocument,
    };
  }

  // ==========================================================
  // DELETE DOCUMENT
  // ==========================================================

  async deleteDocument(userId, documentId) {
    // --------------------------------------------------------
    // Find student
    // --------------------------------------------------------

    const student = await this.getStudent(userId);

    // --------------------------------------------------------
    // Find document
    // --------------------------------------------------------

    const existingDocument = await prisma.student_documents.findFirst({
      where: {
        id: documentId,

        studentId: student.id,
      },
    });

    if (!existingDocument) {
      throw new Error("Document not found.");
    }

    // --------------------------------------------------------
    // Delete from Cloudinary
    // --------------------------------------------------------

    if (existingDocument.cloudinaryPublicId) {
      await deleteFromCloudinary(
        existingDocument.cloudinaryPublicId,
        existingDocument.resourceType,
      );
    }

    // --------------------------------------------------------
    // Delete from database
    // --------------------------------------------------------

    await prisma.student_documents.delete({
      where: {
        id: documentId,
      },
    });

    // --------------------------------------------------------
    // Return response
    // --------------------------------------------------------

    return {
      success: true,

      message: "Document deleted successfully.",
    };
  }
}

export default new DocumentService();
