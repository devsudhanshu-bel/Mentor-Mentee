import prisma from "../../../../config/prisma.js";

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
  // UPLOAD DOCUMENT
  // ==========================================================

  async uploadDocument(userId, body, file) {
    const {
      documentName,
      category,
      description,
    } = body;

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
    // Find student profile
    // --------------------------------------------------------

    const studentProfile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!studentProfile) {
      throw new Error(
        "Student profile not found."
      );
    }

    // --------------------------------------------------------
    // Determine Cloudinary folder
    // --------------------------------------------------------

    const folder =
      this.getFolder(category);

    // --------------------------------------------------------
    // Upload file to Cloudinary
    // --------------------------------------------------------

    const uploadedFile =
      await uploadToCloudinary(
        file,
        folder
      );

    // --------------------------------------------------------
    // Save document in database
    // --------------------------------------------------------

    const document =
      await prisma.studentDocument.create({
        data: {
          studentProfileId:
            studentProfile.id,

          documentName,

          category,

          description,

          fileType:
            uploadedFile.fileType,

          fileSize:
            uploadedFile.fileSize,

          resourceType:
            uploadedFile.resourceType,

          cloudinaryPublicId:
            uploadedFile.publicId,

          fileUrl:
            uploadedFile.url,
        },
      });

    // --------------------------------------------------------
    // Return response
    // --------------------------------------------------------

    return {
      success: true,

      message:
        "Document uploaded successfully.",

      data: document,
    };
  }

  // ==========================================================
  // GET DOCUMENT DASHBOARD
  //
  // Optional category filter:
  //
  // GET /api/mentee/documents/dashboard
  // GET /api/mentee/documents/dashboard?category=RESEARCH
  //
  // If category is not provided:
  // → Returns all documents
  //
  // If category is provided:
  // → Returns only documents from that category
  // ==========================================================

  async getDashboard(userId, category = null) {
    // --------------------------------------------------------
    // Find student profile
    // --------------------------------------------------------

    const studentProfile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!studentProfile) {
      throw new Error(
        "Student profile not found."
      );
    }

    // --------------------------------------------------------
    // Build document filter
    // --------------------------------------------------------

    const documentWhere = {
      studentProfileId:
        studentProfile.id,
    };

    // --------------------------------------------------------
    // Apply category filter if provided
    // --------------------------------------------------------

    if (category) {
      documentWhere.category = category;
    }

    // --------------------------------------------------------
    // Get documents
    // --------------------------------------------------------

    const documents =
      await prisma.studentDocument.findMany({
        where: documentWhere,

        orderBy: {
          uploadedAt: "desc",
        },
      });

    // --------------------------------------------------------
    // Get category counts
    //
    // If category is provided, this will naturally return
    // only the selected category.
    //
    // If category is not provided, it returns all categories.
    // --------------------------------------------------------

    const categoryCounts =
      await prisma.studentDocument.groupBy({
        by: ["category"],

        where: documentWhere,

        _count: {
          category: true,
        },
      });

    // --------------------------------------------------------
    // Calculate recently added
    // --------------------------------------------------------

    const sevenDaysAgo =
      new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    );

    const recentlyAdded =
      documents.filter(
        (document) => {
          const uploadedDate =
            new Date(
              document.uploadedAt
            );

          return (
            uploadedDate >=
            sevenDaysAgo
          );
        }
      ).length;

    // --------------------------------------------------------
    // Stats
    // --------------------------------------------------------

    const stats = {
      totalDocuments:
        documents.length,

      totalCategories:
        categoryCounts.length,

      recentlyAdded,

      totalFiles:
        documents.length,
    };

    // --------------------------------------------------------
    // Return dashboard
    // --------------------------------------------------------

    return {
      success: true,

      data: {
        stats,

        categories:
          categoryCounts.map(
            (item) => ({
              category:
                item.category,

              count:
                item._count.category,
            })
          ),

        documents,
      },
    };
  }

  // ==========================================================
  // GET SINGLE DOCUMENT
  // ==========================================================

  async getDocumentById(
    userId,
    documentId
  ) {
    // --------------------------------------------------------
    // Find student profile
    // --------------------------------------------------------

    const studentProfile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!studentProfile) {
      throw new Error(
        "Student profile not found."
      );
    }

    // --------------------------------------------------------
    // Find document belonging to student
    // --------------------------------------------------------

    const document =
      await prisma.studentDocument.findFirst({
        where: {
          id: documentId,

          studentProfileId:
            studentProfile.id,
        },
      });

    if (!document) {
      throw new Error(
        "Document not found."
      );
    }

    // --------------------------------------------------------
    // Return complete document information
    // --------------------------------------------------------

    return {
      success: true,

      data: {
        id: document.id,

        studentProfileId:
          document.studentProfileId,

        documentName:
          document.documentName,

        category:
          document.category,

        description:
          document.description,

        fileType:
          document.fileType,

        fileSize:
          document.fileSize,

        resourceType:
          document.resourceType,

        cloudinaryPublicId:
          document.cloudinaryPublicId,

        fileUrl:
          document.fileUrl,

        uploadedAt:
          document.uploadedAt,

        updatedAt:
          document.updatedAt,
      },
    };
  }

  // ==========================================================
  // UPDATE DOCUMENT
  // ==========================================================

  async updateDocument(
    userId,
    documentId,
    body,
    file
  ) {
    const {
      documentName,
      category,
      description,
    } = body;

    // --------------------------------------------------------
    // Find student profile
    // --------------------------------------------------------

    const studentProfile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!studentProfile) {
      throw new Error(
        "Student profile not found."
      );
    }

    // --------------------------------------------------------
    // Find existing document
    // --------------------------------------------------------

    const existingDocument =
      await prisma.studentDocument.findFirst({
        where: {
          id: documentId,

          studentProfileId:
            studentProfile.id,
        },
      });

    if (!existingDocument) {
      throw new Error(
        "Document not found."
      );
    }

    // --------------------------------------------------------
    // Prepare database update
    // --------------------------------------------------------

    const updateData = {};

    if (
      documentName !== undefined
    ) {
      updateData.documentName =
        documentName;
    }

    if (category !== undefined) {
      updateData.category =
        category;
    }

    if (
      description !== undefined
    ) {
      updateData.description =
        description;
    }

    // --------------------------------------------------------
    // Replace Cloudinary file
    // --------------------------------------------------------

    if (file) {
      // ------------------------------------------------------
      // Determine folder
      // ------------------------------------------------------

      const newCategory =
        category ??
        existingDocument.category;

      const folder =
        this.getFolder(
          newCategory
        );

      // ------------------------------------------------------
      // Upload NEW file FIRST
      // ------------------------------------------------------

      const uploadedFile =
        await uploadToCloudinary(
          file,
          folder
        );

      // ------------------------------------------------------
      // Delete OLD Cloudinary file
      // ------------------------------------------------------

      if (
        existingDocument.cloudinaryPublicId
      ) {
        try {
          await deleteFromCloudinary(
            existingDocument.cloudinaryPublicId,
            existingDocument.resourceType
          );
        } catch (cloudinaryError) {
          console.error(
            "Failed to delete old Cloudinary document:",
            cloudinaryError
          );

          // Do not stop the update because the new file
          // has already been uploaded successfully.
        }
      }

      // ------------------------------------------------------
      // Store NEW Cloudinary information
      // ------------------------------------------------------

      updateData.fileType =
        uploadedFile.fileType;

      updateData.fileSize =
        uploadedFile.fileSize;

      updateData.resourceType =
        uploadedFile.resourceType;

      updateData.cloudinaryPublicId =
        uploadedFile.publicId;

      updateData.fileUrl =
        uploadedFile.url;
    }

    // --------------------------------------------------------
    // Update database
    // --------------------------------------------------------

    const updatedDocument =
      await prisma.studentDocument.update({
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

      message:
        "Document updated successfully.",

      data: updatedDocument,
    };
  }

  // ==========================================================
  // DELETE DOCUMENT
  // ==========================================================

  async deleteDocument(
    userId,
    documentId
  ) {
    // --------------------------------------------------------
    // Find student profile
    // --------------------------------------------------------

    const studentProfile =
      await prisma.studentProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!studentProfile) {
      throw new Error(
        "Student profile not found."
      );
    }

    // --------------------------------------------------------
    // Find document
    // --------------------------------------------------------

    const existingDocument =
      await prisma.studentDocument.findFirst({
        where: {
          id: documentId,

          studentProfileId:
            studentProfile.id,
        },
      });

    if (!existingDocument) {
      throw new Error(
        "Document not found."
      );
    }

    // --------------------------------------------------------
    // Delete from Cloudinary
    // --------------------------------------------------------

    if (
      existingDocument.cloudinaryPublicId
    ) {
      await deleteFromCloudinary(
        existingDocument.cloudinaryPublicId,
        existingDocument.resourceType
      );
    }

    // --------------------------------------------------------
    // Delete from database
    // --------------------------------------------------------

    await prisma.studentDocument.delete({
      where: {
        id: documentId,
      },
    });

    // --------------------------------------------------------
    // Return response
    // --------------------------------------------------------

    return {
      success: true,

      message:
        "Document deleted successfully.",
    };
  }
}

export default new DocumentService();