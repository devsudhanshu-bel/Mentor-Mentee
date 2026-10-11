
import prisma from "../../../config/prisma.hod.js";

class MentorExtraCurricularService {
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
  // GET EXTRA CURRICULAR DOCUMENTS
  // ==========================================================

  async getExtraCurricularDocuments(userId, studentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const student = await this.getStudent(studentId);

    const documents = await prisma.student_documents.findMany({
      where: {
        studentId,
        category: "EXTRA_CURRICULAR",
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
        documents,
      },
    };
  }

  // ==========================================================
  // GET EXTRA CURRICULAR DASHBOARD
  // ==========================================================

  async getDashboard(userId, studentId) {
    const result = await this.getExtraCurricularDocuments(
      userId,
      studentId
    );

    const documents = result.data.documents;

    const stats = {
      totalActivities: documents.length,

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

      drafts: 0,

      achievements: documents.filter(
        (document) =>
          document.researchReviewStatus === "VERIFIED"
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
  // GET SINGLE EXTRA CURRICULAR DOCUMENT
  // ==========================================================

  async getDocumentById(userId, studentId, documentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId,
        category: "EXTRA_CURRICULAR",
      },
    });

    if (!document) {
      const error = new Error(
        "Extra Curricular document not found."
      );

      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      data: document,
    };
  }

  // ==========================================================
  // REVIEW EXTRA CURRICULAR DOCUMENT
  // ==========================================================

  async reviewDocument(userId, studentId, documentId, body) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId,
        category: "EXTRA_CURRICULAR",
      },
      select: {
        id: true,
      },
    });

    if (!document) {
      const error = new Error(
        "Extra Curricular document not found."
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
        "Invalid Extra Curricular review status."
      );

      error.statusCode = 400;
      throw error;
    }

    const normalizedRemark = mentorRemark?.trim() || null;

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

    const updatedDocument = await prisma.student_documents.update({
      where: {
        id: documentId,
      },
      data: {
        researchReviewStatus: status,
        reviewedByTeacherId: mentor.id,
        reviewedAt: new Date(),
        mentorRemark: normalizedRemark,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message:
        status === "VERIFIED"
          ? "Extra Curricular activity approved successfully."
          : "Extra Curricular corrections requested successfully.",
      data: updatedDocument,
    };
  }
}

export default new MentorExtraCurricularService();
