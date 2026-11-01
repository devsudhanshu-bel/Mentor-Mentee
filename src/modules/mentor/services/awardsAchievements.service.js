import prisma from "../../../config/prisma.hod.js";
import { createFileAccessToken } from "../../../utils/fileAccessToken.js";

class MentorAwardsAchievementsService {
  // ==========================================================
  // VALIDATE LOCAL DOCUMENT STORAGE KEY
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
  // GENERATE SECURE DOCUMENT URL
  // ==========================================================

  decorateDocument(document, userId) {
    if (!document) return document;

    const storageKey = document.cloudinaryPublicId;

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
  // GET ACTIVE MENTOR
  // ==========================================================

  async getMentor(userId) {
    const mentor = await prisma.teachers.findUnique({
      where: {
        userAccountId: userId,
      },
      select: {
        id: true,
        userAccountId: true,
        fullName: true,
        isActive: true,
      },
    });

    if (!mentor || !mentor.isActive) {
      const error = new Error("Active mentor profile not found.");
      error.statusCode = 403;
      throw error;
    }

    return mentor;
  }

  // ==========================================================
  // VERIFY ACTIVE STUDENT ASSIGNMENT
  // ==========================================================

  async assertAssignedStudent(mentorId, studentId) {
    const assignment = await prisma.mentor_assignments.findFirst({
      where: {
        teacherId: mentorId,
        studentId,
        status: "ACTIVE",
      },
      select: {
        id: true,
      },
    });

    if (!assignment) {
      const error = new Error(
        "You are not the active mentor of this student."
      );

      error.statusCode = 403;
      throw error;
    }
  }

  // ==========================================================
  // GET STUDENT
  // ==========================================================

  async getStudent(studentId) {
    const student = await prisma.students.findUnique({
      where: {
        id: studentId,
      },
      select: {
        id: true,
        registerNumber: true,
        fullName: true,
        profileImage: true,
        programme: true,
        semester: true,
      },
    });

    if (!student) {
      const error = new Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }

    return student;
  }

  // ==========================================================
  // GET AWARDS & ACHIEVEMENTS DOCUMENTS
  // ==========================================================

  async getAwardsAchievementsDocuments(userId, studentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const student = await this.getStudent(studentId);

    const documents = await prisma.student_documents.findMany({
      where: {
        studentId,
        category: "AWARDS",
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    return {
      success: true,
      data: {
        student,
        mentor: {
          id: mentor.id,
          fullName: mentor.fullName,
        },
        documents: documents.map((document) =>
          this.decorateDocument(document, userId)
        ),
      },
    };
  }

  // ==========================================================
  // GET AWARDS & ACHIEVEMENTS DASHBOARD
  // ==========================================================

  async getDashboard(userId, studentId) {
    const result = await this.getAwardsAchievementsDocuments(
      userId,
      studentId
    );

    const documents = result.data.documents;

    const stats = {
      totalAwards: documents.length,

      totalAchievements: documents.length,

      approved: documents.filter(
        (document) =>
          document.researchReviewStatus === "VERIFIED"
      ).length,

      underReview: documents.filter(
        (document) =>
          !document.researchReviewStatus ||
          document.researchReviewStatus === "NOT_REVIEWED" ||
          document.researchReviewStatus === "PENDING"
      ).length,

      correctionsRequested: documents.filter(
        (document) =>
          document.researchReviewStatus === "CORRECTIONS_REQUESTED"
      ).length,

      documents: documents.filter(
        (document) => Boolean(document.fileUrl)
      ).length,
    };

    return {
      success: true,
      data: {
        student: result.data.student,
        mentor: result.data.mentor,
        stats,
        documents,
      },
    };
  }

  // ==========================================================
  // GET SINGLE AWARD OR ACHIEVEMENT DOCUMENT
  // ==========================================================

  async getDocumentById(userId, studentId, documentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId,
        category: "AWARDS",
      },
    });

    if (!document) {
      const error = new Error(
        "Award or achievement document not found."
      );

      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      data: this.decorateDocument(document, userId),
    };
  }

  // ==========================================================
  // REVIEW AWARD OR ACHIEVEMENT DOCUMENT
  // ==========================================================

  async reviewDocument(userId, studentId, documentId, body) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId,
        category: "AWARDS",
      },
      select: {
        id: true,
      },
    });

    if (!document) {
      const error = new Error(
        "Award or achievement document not found."
      );

      error.statusCode = 404;
      throw error;
    }

    const { status, mentorRemark } = body;

    const allowedStatuses = [
      "VERIFIED",
      "CORRECTIONS_REQUESTED",
    ];

    if (!allowedStatuses.includes(status)) {
      const error = new Error(
        "Invalid Awards & Achievements review status."
      );

      error.statusCode = 400;
      throw error;
    }

    const normalizedRemark =
      typeof mentorRemark === "string"
        ? mentorRemark.trim() || null
        : null;

    if (
      status === "CORRECTIONS_REQUESTED" &&
      !normalizedRemark
    ) {
      const error = new Error(
        "A remark is required when requesting corrections."
      );

      error.statusCode = 400;
      throw error;
    }

    const now = new Date();

    const updatedDocument = await prisma.student_documents.update({
      where: {
        id: documentId,
      },
      data: {
        researchReviewStatus: status,
        reviewedByTeacherId: mentor.id,
        reviewedAt: now,
        mentorRemark: normalizedRemark,
        updatedAt: now,
      },
    });

    return {
      success: true,
      message:
        status === "VERIFIED"
          ? "Award or achievement verified successfully."
          : "Corrections requested successfully.",
      data: this.decorateDocument(updatedDocument, userId),
    };
  }
}

export default new MentorAwardsAchievementsService();