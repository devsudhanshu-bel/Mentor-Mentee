import prisma from "../../../config/prisma.hod.js";
import { createFileAccessToken } from "../../../utils/fileAccessToken.js";

const CATEGORY_BY_RESOURCE = {
  research: "RESEARCH",
  cocurricular: "CO_CURRICULAR",
  "extra-curricular": "EXTRA_CURRICULAR",
  "awards-achievements": "AWARDS",
  certificates: "CERTIFICATES",
};

/* ==========================================================
   ERROR HELPER
========================================================== */

const fail = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/* ==========================================================
   PRIVATE FILE URL DECORATORS
========================================================== */

const createPrivateFileUrl = (storageKey, recordType, recordId, userId) => {
  if (
    typeof storageKey !== "string" ||
    !userId ||
    !recordId
  ) {
    return null;
  }

  if (
    storageKey.startsWith("/") ||
    storageKey.includes("\\") ||
    storageKey.includes("..") ||
    storageKey.includes("\0")
  ) {
    return null;
  }

  if (
    recordType === "student_document" &&
    !storageKey.startsWith("private/documents/")
  ) {
    return null;
  }

  if (
    recordType === "internship_document" &&
    !storageKey.startsWith("private/internships/")
  ) {
    return null;
  }

  const token = createFileAccessToken({
    storageKey,
    recordType,
    recordId,
    userId,
  });

  return `/api/files/private?token=${encodeURIComponent(token)}`;
};

/* ==========================================================
   STUDENT DOCUMENT DECORATORS
========================================================== */

const decorateStudentDocument = (document, userId) => {
  if (!document) return document;

  const storageKey = document.cloudinaryPublicId;

  if (
    typeof storageKey !== "string" ||
    !storageKey.startsWith("private/documents/")
  ) {
    return {
      ...document,
      fileUrl: null,
    };
  }

  const fileUrl = createPrivateFileUrl(
    storageKey,
    "student_document",
    document.id,
    userId
  );

  return {
    ...document,
    fileUrl,
  };
};

const decorateStudentDocuments = (documents, userId) => {
  if (!Array.isArray(documents)) return documents;

  return documents.map((document) =>
    decorateStudentDocument(document, userId)
  );
};

/* ==========================================================
   INTERNSHIP DOCUMENT DECORATORS
========================================================== */

const decorateInternshipDocument = (document, userId) => {
  if (!document) return document;

  const storageKey = document.cloudinaryPublicId;

  if (
    typeof storageKey !== "string" ||
    !storageKey.startsWith("private/internships/")
  ) {
    return {
      ...document,
      fileUrl: null,
    };
  }

  const fileUrl = createPrivateFileUrl(
    storageKey,
    "internship_document",
    document.id,
    userId
  );

  return {
    ...document,
    fileUrl,
  };
};

const decorateStudentInternshipDocuments = (documents, userId) => {
  if (!Array.isArray(documents)) return documents;

  return documents.map((document) =>
    decorateInternshipDocument(document, userId)
  );
};

const decorateInternship = (internship, userId) => {
  if (!internship) return internship;

  return {
    ...internship,
    internship_documents: decorateStudentInternshipDocuments(
      internship.internship_documents,
      userId
    ),
  };
};

const decorateInternships = (internships, userId) => {
  if (!Array.isArray(internships)) return internships;

  return internships.map((internship) =>
    decorateInternship(internship, userId)
  );
};

/* ==========================================================
   STUDENT
========================================================== */

const getStudent = async (studentId) => {
  const student = await prisma.students.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      registerNumber: true,
      admissionNumber: true,
      fullName: true,
      email: true,
      phone: true,
      profileImage: true,
      programme: true,
      semester: true,
      section: true,
      status: true,
      currentCGPA: true,
      overallAttendance: true,
      totalCredits: true,
      academicStanding: true,
      academicSetupCompleted: true,
      departmentId: true,
      departments: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });

  if (!student) {
    throw fail("Student not found.", 404);
  }

  const assignment = await prisma.mentor_assignments.findFirst({
    where: {
      studentId,
      status: "ACTIVE",
    },
    orderBy: {
      assignedAt: "desc",
    },
    include: {
      teachers: {
        select: {
          id: true,
          fullName: true,
          employeeCode: true,
          email: true,
          designation: true,
          departmentId: true,
          departments_teachers_departmentIdTodepartments: {
            select: {
              name: true,
              code: true,
            },
          },
        },
      },
      academic_terms: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
    },
  });

  return {
    ...student,
    department: student.departments,
    mentor: assignment?.teachers || null,
    activeMentorAssignment: assignment
      ? {
          id: assignment.id,
          assignedAt: assignment.assignedAt,
          term: assignment.academic_terms,
        }
      : null,
  };
};

const ensureStudent = async (studentId) => {
  if (!studentId) {
    throw fail("Student ID is required.", 400);
  }

  return getStudent(studentId);
};

/* ==========================================================
   STUDENT DOCUMENTS
========================================================== */

const getCategoryDocuments = async (studentId, category) => {
  await ensureStudent(studentId);

  return prisma.student_documents.findMany({
    where: {
      studentId,
      category,
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });
};

/* ==========================================================
   DASHBOARD
========================================================== */

const getDashboard = async (studentId, resource, userId) => {
  const student = await ensureStudent(studentId);

  const category = CATEGORY_BY_RESOURCE[resource];

  if (!category) {
    throw fail("Unsupported student profile resource.", 400);
  }

  const documents = decorateStudentDocuments(
    await getCategoryDocuments(studentId, category),
    userId
  );

  const count = (predicate) =>
    documents.filter(predicate).length;

  const verified = (document) =>
    document.researchReviewStatus === "VERIFIED";

  const pending = (document) =>
    !document.researchReviewStatus ||
    ["NOT_REVIEWED", "PENDING"].includes(
      document.researchReviewStatus
    );

  const corrections = (document) =>
    document.researchReviewStatus === "CORRECTIONS_REQUESTED";

  let stats;

  if (resource === "research") {
    stats = {
      totalSubmissions: documents.length,
      verified: count(verified),
      pendingReview: count(pending),
      correctionsRequested: count(corrections),
    };
  } else if (resource === "cocurricular") {
    stats = {
      totalActivities: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
      drafts: 0,
      achievements: count(verified),
    };
  } else if (resource === "extra-curricular") {
    stats = {
      totalActivities: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
      drafts: 0,
      achievements: count(verified),
    };
  } else if (resource === "awards-achievements") {
    stats = {
      totalAwards: documents.length,
      totalAchievements: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
      documents: count((document) => Boolean(document.fileUrl)),
    };
  } else {
    stats = {
      totalCertificates: documents.length,
      approved: count(verified),
      underReview: count(pending),
      correctionsRequested: count(corrections),
    };
  }

  return {
    success: true,
    data: {
      student,
      mentor: student.mentor,
      stats,
      documents,
    },
  };
};

/* ==========================================================
   LIST DOCUMENTS
========================================================== */

const listDocuments = async (studentId, filters = {}, userId) => {
  const student = await ensureStudent(studentId);

  const page = Math.max(1, Number(filters.page) || 1);

  const limit = Math.min(
    100,
    Math.max(1, Number(filters.limit) || 10)
  );

  const where = { studentId };

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.fileType) {
    where.fileType = filters.fileType;
  }

  if (filters.search) {
    where.OR = [
      {
        documentName: {
          contains: String(filters.search),
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: String(filters.search),
          mode: "insensitive",
        },
      },
      {
        fileType: {
          contains: String(filters.search),
          mode: "insensitive",
        },
      },
    ];
  }

  const [rawDocuments, total] = await Promise.all([
    prisma.student_documents.findMany({
      where,
      orderBy: {
        uploadedAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.student_documents.count({ where }),
  ]);

  const documents = decorateStudentDocuments(
    rawDocuments,
    userId
  );

  return {
    success: true,
    data: {
      student,
      mentor: student.mentor,
      documents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  };
};

/* ==========================================================
   GET SINGLE DOCUMENT
========================================================== */

const getDocument = async (
  studentId,
  documentId,
  resource = "documents",
  userId
) => {
  await ensureStudent(studentId);

  const where = {
    id: documentId,
    studentId,
  };

  if (CATEGORY_BY_RESOURCE[resource]) {
    where.category = CATEGORY_BY_RESOURCE[resource];
  }

  const document = await prisma.student_documents.findFirst({
    where,
  });

  if (!document) {
    throw fail("Student document not found.", 404);
  }

  return {
    success: true,
    data: decorateStudentDocument(document, userId),
  };
};

/* ==========================================================
   REVIEW DOCUMENT
========================================================== */

const reviewDocument = async (
  studentId,
  documentId,
  resource,
  body = {},
  userId
) => {
  await ensureStudent(studentId);

  const category = CATEGORY_BY_RESOURCE[resource];

  if (!category) {
    throw fail("Unsupported review resource.", 400);
  }

  const document = await prisma.student_documents.findFirst({
    where: {
      id: documentId,
      studentId,
      category,
    },
    select: {
      id: true,
    },
  });

  if (!document) {
    throw fail("Document not found for this student.", 404);
  }

  const status = String(body.status || "").toUpperCase();

  if (!["VERIFIED", "CORRECTIONS_REQUESTED"].includes(status)) {
    throw fail(
      "Review status must be VERIFIED or CORRECTIONS_REQUESTED.",
      400
    );
  }

  const mentorRemark =
    String(body.mentorRemark || "").trim() || null;

  if (status === "CORRECTIONS_REQUESTED" && !mentorRemark) {
    throw fail(
      "A remark is required when requesting corrections.",
      400
    );
  }

  const updated = await prisma.student_documents.update({
    where: {
      id: documentId,
    },
    data: {
      researchReviewStatus: status,

      // Admin identity is not a teacher foreign key.
      // Do not misattribute this review to a mentor.
      reviewedByTeacherId: null,

      reviewedAt: new Date(),
      mentorRemark,
      updatedAt: new Date(),
    },
  });

  return {
    success: true,
    message:
      status === "VERIFIED"
        ? "Record verified successfully."
        : "Corrections requested successfully.",
    data: decorateStudentDocument(updated, userId),
  };
};

/* ==========================================================
   DOCUMENTS DASHBOARD
========================================================== */

const getDocumentsDashboard = async (studentId, userId) => {
  const student = await ensureStudent(studentId);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    totalDocuments,
    recentlyAdded,
    groupedCategories,
    rawLatestDocuments,
  ] = await Promise.all([
    prisma.student_documents.count({
      where: { studentId },
    }),

    prisma.student_documents.count({
      where: {
        studentId,
        uploadedAt: {
          gte: sevenDaysAgo,
        },
      },
    }),

    prisma.student_documents.groupBy({
      by: ["category"],
      where: { studentId },
      _count: {
        _all: true,
      },
    }),

    prisma.student_documents.findMany({
      where: { studentId },
      orderBy: {
        uploadedAt: "desc",
      },
      take: 6,
    }),
  ]);

  const latestDocuments = decorateStudentDocuments(
    rawLatestDocuments,
    userId
  );

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
      mentor: student.mentor,
      stats,
      categories,
      documents: latestDocuments,
      availableCategories: [
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
      ],
    },
  };
};

/* ==========================================================
   ATTENDANCE
========================================================== */

const getAttendance = async (studentId, semesterValue) => {
  const student = await ensureStudent(studentId);

  const semester = Number(
    semesterValue ||
      String(student.semester || "").match(/\d+/)?.[0] ||
      1
  );

  if (
    !Number.isInteger(semester) ||
    semester < 1 ||
    semester > 8
  ) {
    throw fail("Semester must be between 1 and 8.", 400);
  }

  const academicSemester = await prisma.academic_semesters.findUnique({
    where: {
      studentId_semesterNumber: {
        studentId,
        semesterNumber: semester,
      },
    },
    include: {
      subjects: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const raw = academicSemester?.subjects || [];

  const subjects = raw.map((subject) => {
    const held = Number(subject.classesHeld || 0);
    const attended = Number(subject.classesAttended || 0);

    const percentage =
      held > 0
        ? Number(((attended / held) * 100).toFixed(2))
        : Number(subject.attendance || 0);

    return {
      id: subject.id,
      courseCode: subject.courseCode,
      subjectName: subject.courseName,
      credits: Number(subject.credits || 0),
      classesHeld: held,
      classesAttended: attended,
      percentage,
      storedAttendance: subject.attendance ?? null,
    };
  });

  const classesHeld = subjects.reduce(
    (total, item) => total + item.classesHeld,
    0
  );

  const classesAttended = subjects.reduce(
    (total, item) => total + item.classesAttended,
    0
  );

  const stored = subjects.filter(
    (item) => item.storedAttendance != null
  );

  const percentage = classesHeld
    ? Number(
        ((classesAttended / classesHeld) * 100).toFixed(2)
      )
    : stored.length
      ? Number(
          (
            stored.reduce(
              (total, item) =>
                total + Number(item.storedAttendance),
              0
            ) / stored.length
          ).toFixed(2)
        )
      : Number(student.overallAttendance || 0);

  return {
    semester,
    semesterExists: Boolean(academicSemester),
    currentSemester: Number(
      String(student.semester || "").match(/\d+/)?.[0] || 1
    ),
    hasAttendance: subjects.some(
      (item) =>
        item.classesHeld > 0 ||
        item.storedAttendance != null
    ),
    student,
    mentor: student.mentor,
    academicYear: academicSemester?.academic_years || null,
    term: null,
    subjects,
    summary: {
      classesHeld,
      classesAttended,
      percentage,
    },
  };
};

/* ==========================================================
   ACADEMICS
========================================================== */

const getAcademics = async (studentId) => {
  const student = await ensureStudent(studentId);

  const records = await prisma.academic_semesters.findMany({
    where: { studentId },
    orderBy: {
      semesterNumber: "asc",
    },
    include: {
      subjects: {
        orderBy: {
          courseCode: "asc",
        },
      },
    },
  });

  const backlogs = await prisma.academic_backlogs.findMany({
    where: { studentId },
    orderBy: [
      { status: "asc" },
      { semesterNumber: "asc" },
    ],
  });

  return {
    success: true,
    data: {
      student,
      mentor: student.mentor,
      semesters: records,
      backlogs,
      overall: {
        currentCGPA: student.currentCGPA,
        totalCredits: student.totalCredits,
        overallAttendance: student.overallAttendance,
        academicStanding: student.academicStanding,
      },
    },
  };
};

/* ==========================================================
   ACADEMIC SEMESTER
========================================================== */

const getAcademicSemester = async (
  studentId,
  semesterValue
) => {
  await ensureStudent(studentId);

  const semesterNumber = Number(semesterValue);

  if (
    !Number.isInteger(semesterNumber) ||
    semesterNumber < 1 ||
    semesterNumber > 8
  ) {
    throw fail(
      "Semester number must be between 1 and 8.",
      400
    );
  }

  const record = await prisma.academic_semesters.findUnique({
    where: {
      studentId_semesterNumber: {
        studentId,
        semesterNumber,
      },
    },
    include: {
      subjects: {
        orderBy: {
          courseCode: "asc",
        },
      },
    },
  });

  if (!record) {
    const student = await getStudent(studentId);

    const currentSemester = Number(
      String(student.semester || "").match(/\d+/)?.[0] || 1
    );

    return {
      id: null,
      studentId,
      semesterNumber,
      status:
        semesterNumber === currentSemester
          ? "CURRENT"
          : semesterNumber < currentSemester
            ? "NO_RECORD"
            : "LOCKED",
      sgpa: null,
      totalCredits: 0,
      creditsEarned: 0,
      backlogs: 0,
      subjects: [],
    };
  }

  return record;
};

/* ==========================================================
   MEETINGS
========================================================== */

const getMeetings = async (studentId) => {
  await ensureStudent(studentId);

  const meetings = await prisma.mentor_meetings.findMany({
    where: { studentId },
    include: {
      students: {
        select: {
          id: true,
          fullName: true,
          registerNumber: true,
        },
      },
      teachers: {
        select: {
          id: true,
          fullName: true,
          employeeCode: true,
          email: true,
        },
      },
      mentor_meeting_notes: true,
      mentor_meeting_discussion_points: {
        orderBy: {
          position: "asc",
        },
      },
      mentor_meeting_feedback: true,
    },
    orderBy: {
      startAt: "desc",
    },
  });

  return {
    success: true,
    data: meetings,
  };
};

/* ==========================================================
   INTERNSHIPS
========================================================== */

const getInternships = async (studentId, userId) => {
  const student = await ensureStudent(studentId);

  const rawInternships = await prisma.student_internships.findMany({
    where: { studentId },
    include: {
      internship_documents: true,
      internship_reviews: {
        include: {
          reviewer: true,
        },
        orderBy: {
          reviewedAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const internships = decorateInternships(
    rawInternships,
    userId
  );

  return {
    success: true,
    data: {
      student,
      internships,

      current: internships.filter(
        (item) =>
          !["COMPLETED", "CANCELLED"].includes(item.status)
      ),

      history: internships.filter(
        (item) =>
          ["COMPLETED", "CANCELLED"].includes(item.status)
      ),

      pendingVerifications: internships.filter(
        (item) =>
          [
            "PENDING",
            "PENDING_INITIAL_VERIFICATION",
            "PENDING_COMPLETION_VERIFICATION",
          ].includes(item.verificationStatus) ||
          item.completionVerificationStatus === "PENDING"
      ),
    },
  };
};

/* ==========================================================
   INTERNSHIP QUEUE
========================================================== */

const getInternshipQueue = async (
  studentId,
  stage,
  userId
) => {
  const result = await getInternships(studentId, userId);
  const all = result.data.internships;

  return {
    success: true,
    data: all.filter((item) =>
      stage === "initial"
        ? [
            "PENDING",
            "PENDING_INITIAL_VERIFICATION",
          ].includes(item.verificationStatus)
        : [
            "PENDING",
            "PENDING_COMPLETION_VERIFICATION",
          ].includes(item.completionVerificationStatus)
    ),
  };
};

/* ==========================================================
   GET INTERNSHIP BY ID
========================================================== */

const getInternshipById = async (internshipId, userId) => {
  const internship = await prisma.student_internships.findUnique({
    where: {
      id: internshipId,
    },
    include: {
      student: true,
      internship_documents: true,
      internship_reviews: {
        include: {
          reviewer: true,
        },
        orderBy: {
          reviewedAt: "desc",
        },
      },
    },
  });

  if (!internship) {
    throw fail("Internship not found.", 404);
  }

  return {
    success: true,
    data: decorateInternship(internship, userId),
  };
};

/* ==========================================================
   REVIEW INTERNSHIP
========================================================== */

const reviewInternship = async (
  internshipId,
  stage,
  body = {},
  userId
) => {
  const existing = await prisma.student_internships.findUnique({
    where: {
      id: internshipId,
    },
  });

  if (!existing) {
    throw fail("Internship not found.", 404);
  }

  const decision = String(
    body.decision || ""
  ).toUpperCase();

  if (!["APPROVED", "REJECTED"].includes(decision)) {
    throw fail(
      "Decision must be APPROVED or REJECTED.",
      400
    );
  }

  if (
    decision === "REJECTED" &&
    !String(body.remarks || "").trim()
  ) {
    throw fail(
      "Remarks are required when rejecting an internship.",
      400
    );
  }

  const remarks =
    String(body.remarks || "").trim() || null;

  const now = new Date();

  const data =
    stage === "completion"
      ? {
          completionVerificationStatus: decision,
          completionMentorRemark: remarks,
          completionVerifiedAt: now,

          ...(decision === "APPROVED"
            ? {
                status: "COMPLETED",
                ...(Number.isFinite(Number(body.rating))
                  ? { rating: Number(body.rating) }
                  : {}),
              }
            : {}),
        }
      : {
          verificationStatus: decision,
          mentorRemark: remarks,
          verifiedAt: now,

          ...(decision === "REJECTED"
            ? { status: "ONGOING" }
            : {}),
        };

  const updated = await prisma.student_internships.update({
    where: {
      id: internshipId,
    },
    data,
  });

  return {
    success: true,
    message: "Internship review saved.",
    data: updated,
  };
};

/* ==========================================================
   EXPORTS
========================================================== */

export default {
  getStudent,
  getDashboard,
  getDocumentsDashboard,
  listDocuments,
  getDocument,
  reviewDocument,

  getAttendance,
  getAcademics,
  getAcademicSemester,
  getMeetings,

  getInternships,
  getInternshipQueue,
  getInternshipById,
  reviewInternship,
};