import prisma from "../../../config/prisma.hod.js";

class MentorCertificatesService {
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
  // GET ALL CERTIFICATE DOCUMENTS
  // GET /api/mentor/students/:studentId/certificates
  // ==========================================================

  async getCertificateDocuments(userId, studentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const student = await this.getStudent(studentId);

    const documents = await prisma.student_documents.findMany({
      where: {
        studentId,
        category: "CERTIFICATES",
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
  // GET CERTIFICATES DASHBOARD
  // ==========================================================

  async getDashboard(userId, studentId) {
    const result = await this.getCertificateDocuments(
      userId,
      studentId
    );

    const documents = result.data.documents;

    const stats = {
      totalCertificates: documents.length,

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
  // GET SINGLE CERTIFICATE
  // GET /api/mentor/students/:studentId/certificates/:documentId
  // ==========================================================

  async getDocumentById(userId, studentId, documentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId,
        category: "CERTIFICATES",
      },
    });

    if (!document) {
      const error = new Error("Certificate document not found.");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      data: document,
    };
  }

  // ==========================================================
  // REVIEW CERTIFICATE
  // ==========================================================

  async reviewDocument(userId, studentId, documentId, body) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId,
        category: "CERTIFICATES",
      },
      select: {
        id: true,
      },
    });

    if (!document) {
      const error = new Error("Certificate document not found.");
      error.statusCode = 404;
      throw error;
    }

    const { status, mentorRemark } = body;

    const allowedStatuses = [
      "VERIFIED",
      "CORRECTIONS_REQUESTED",
    ];

    if (!allowedStatuses.includes(status)) {
      const error = new Error("Invalid certificate review status.");
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
          ? "Certificate verified successfully."
          : "Corrections requested successfully.",
      data: updatedDocument,
    };
  }
}

export default new MentorCertificatesService();