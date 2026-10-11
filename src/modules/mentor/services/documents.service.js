import prisma from "../../../config/prisma.hod.js";

const DOCUMENT_CATEGORIES = [
  "ACADEMICS",
  "CERTIFICATES",
  "INTERNSHIPS",
  "PROJECTS",
  "RESEARCH",
  "CO_CURRICULAR",
  "EXTRA_CURRICULAR",
  "AWARDS",
  "PERSONAL",
  "OTHER",
];

class MentorDocumentsService {
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
  // BUILD DOCUMENT FILTER
  // All categories are included unless a filter is provided.
  // ==========================================================

  buildDocumentWhere(studentId, filters = {}) {
    const { category, fileType, search } = filters;

    const where = {
      studentId,
    };

    if (category) {
      where.category = category;
    }

    if (fileType) {
      where.fileType = {
        equals: fileType,
        mode: "insensitive",
      };
    }

    if (search?.trim()) {
      where.OR = [
        {
          documentName: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
      ];
    }

    return where;
  }

  // ==========================================================
  // GET ALL STUDENT DOCUMENTS
  // GET /api/mentor/students/:studentId/documents
  // ==========================================================

  async getDocuments(userId, studentId, filters = {}) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const student = await this.getStudent(studentId);

    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(filters.limit) || 10)
    );

    const where = this.buildDocumentWhere(studentId, filters);

    const [documents, total] = await Promise.all([
      prisma.student_documents.findMany({
        where,
        orderBy: {
          uploadedAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.student_documents.count({
        where,
      }),
    ]);

    return {
      success: true,
      data: {
        student,
        mentor: {
          id: mentor.id,
          fullName: mentor.fullName,
        },
        documents,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        filters: {
          category: filters.category || null,
          fileType: filters.fileType || null,
          search: filters.search?.trim() || null,
        },
      },
    };
  }

  // ==========================================================
  // GET DOCUMENT DASHBOARD
  // GET /api/mentor/students/:studentId/documents/dashboard
  // ==========================================================

  async getDashboard(userId, studentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const student = await this.getStudent(studentId);

    // Fetch all documents, irrespective of category.
    const where = {
      studentId,
    };

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalDocuments,
      recentlyAdded,
      groupedCategories,
      latestDocuments,
    ] = await Promise.all([
      prisma.student_documents.count({
        where,
      }),

      prisma.student_documents.count({
        where: {
          ...where,
          uploadedAt: {
            gte: sevenDaysAgo,
          },
        },
      }),

      prisma.student_documents.groupBy({
        by: ["category"],
        where,
        _count: {
          _all: true,
        },
      }),

      prisma.student_documents.findMany({
        where,
        orderBy: {
          uploadedAt: "desc",
        },
        take: 6,
      }),
    ]);

    const categories = groupedCategories.map((item) => ({
      category: item.category,
      count: item._count._all,
    }));

    const stats = {
      totalDocuments,
      totalCategories: categories.length,
      recentlyAdded,
      totalFiles: totalDocuments,
    };

    return {
      success: true,
      data: {
        student,
        mentor: {
          id: mentor.id,
          fullName: mentor.fullName,
        },
        stats,
        categories,
        documents: latestDocuments,
        availableCategories: DOCUMENT_CATEGORIES,
      },
    };
  }

  // ==========================================================
  // GET SINGLE STUDENT DOCUMENT
  // GET /api/mentor/students/:studentId/documents/:documentId
  // ==========================================================

  async getDocumentById(userId, studentId, documentId) {
    const mentor = await this.getMentor(userId);

    await this.assertAssignedStudent(mentor.id, studentId);

    const document = await prisma.student_documents.findFirst({
      where: {
        id: documentId,
        studentId,
      },
    });

    if (!document) {
      const error = new Error("Student document not found.");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      data: document,
    };
  }
}

export default new MentorDocumentsService();