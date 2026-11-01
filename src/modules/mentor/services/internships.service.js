import { randomUUID } from "node:crypto";

import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";
import { createFileAccessToken } from "../../../utils/fileAccessToken.js";

const COMPLETION_DOCUMENT_TYPES = [
  "COMPLETION_CERTIFICATE",
  "COMPLETION_LETTER",
  "FINAL_REPORT",
];

// ============================================================
// LOCAL STORAGE DOCUMENT URL HELPERS
// ============================================================

const isLocalInternshipFile = (storageKey) => {
  if (typeof storageKey !== "string") {
    return false;
  }

  if (!storageKey.startsWith("private/internships/")) {
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
};

const decorateInternshipDocument = (document, userId) => {
  if (!document) return document;

  const storageKey = document.cloudinaryPublicId;

  if (!isLocalInternshipFile(storageKey)) {
    return {
      ...document,
      fileUrl: null,
    };
  }

  const token = createFileAccessToken({
    storageKey,
    recordType: "internship_document",
    recordId: document.id,
    userId,
  });

  return {
    ...document,
    fileUrl: `/api/files/private?token=${encodeURIComponent(token)}`,
  };
};

const decorateInternship = (internship, userId) => {
  if (!internship) return internship;

  return {
    ...internship,
    internship_documents: (
      internship.internship_documents ?? []
    ).map((document) =>
      decorateInternshipDocument(document, userId)
    ),
  };
};

const decorateInternships = (internships, userId) => {
  return internships.map((internship) =>
    decorateInternship(internship, userId)
  );
};

// ============================================================
// MENTOR HELPERS
// ============================================================

const getTeacher = async (userAccountId) => {
  const teacher = await prisma.teachers.findUnique({
    where: { userAccountId },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!teacher || !teacher.isActive) {
    throw new ApiError(403, "Active mentor profile not found");
  }

  return teacher;
};

const getAssignedStudentIds = async (teacherId) => {
  const assignments = await prisma.mentor_assignments.findMany({
    where: {
      teacherId,
      status: "ACTIVE",
    },
    select: {
      studentId: true,
    },
  });

  return [
    ...new Set(assignments.map((assignment) => assignment.studentId)),
  ];
};

const assertAssignedMentor = async (teacherId, studentId) => {
  const assignment = await prisma.mentor_assignments.findFirst({
    where: {
      teacherId,
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
      "You are not the currently assigned mentor for this student"
    );
  }
};

// ============================================================
// DOCUMENT VALIDATION HELPERS
// ============================================================

const getRequiredInitialDocuments = (internship) => {
  if (internship.internshipType === "ALREADY_COMPLETED") {
    return ["OFFER_LETTER", ...COMPLETION_DOCUMENT_TYPES];
  }

  return ["OFFER_LETTER"];
};

const getMissingDocuments = (internship, requiredTypes, stage) => {
  const documents = internship.internship_documents ?? [];

  const uploadedTypes = new Set(
    documents
      .filter((document) => document.submissionStage === stage)
      .map((document) => document.documentType)
  );

  return requiredTypes.filter(
    (documentType) => !uploadedTypes.has(documentType)
  );
};

const ensureDocumentsPresent = (internship, requiredTypes, stage) => {
  const missingDocuments = getMissingDocuments(
    internship,
    requiredTypes,
    stage
  );

  if (missingDocuments.length > 0) {
    throw new ApiError(
      400,
      `Required documents are missing: ${missingDocuments.join(", ")}`
    );
  }
};

const validateDecision = (decision, remarks) => {
  if (!["APPROVED", "REJECTED"].includes(decision)) {
    throw new ApiError(
      400,
      "Decision must be APPROVED or REJECTED"
    );
  }

  if (
    decision === "REJECTED" &&
    (typeof remarks !== "string" || !remarks.trim())
  ) {
    throw new ApiError(
      400,
      "Remarks are required when rejecting"
    );
  }
};

const validateRating = (rating) => {
  if (
    rating !== undefined &&
    (
      typeof rating !== "number" ||
      !Number.isFinite(rating) ||
      rating < 1 ||
      rating > 5
    )
  ) {
    throw new ApiError(
      400,
      "Rating must be a number between 1 and 5"
    );
  }
};

// ============================================================
// FETCH AN INTERNSHIP FOR AN AUTHORIZED MENTOR
// ============================================================

const getInternshipForReview = async (internshipId, teacherId) => {
  const internship = await prisma.student_internships.findUnique({
    where: {
      id: internshipId,
    },
    include: {
      student: {
        select: {
          id: true,
          fullName: true,
          registerNumber: true,
          profileImage: true,
          departmentId: true,
          userAccountId: true,
        },
      },
      internship_documents: {
        orderBy: {
          uploadedAt: "desc",
        },
      },
      internship_reviews: {
        orderBy: {
          reviewedAt: "desc",
        },
      },
    },
  });

  if (!internship) {
    throw new ApiError(404, "Internship not found");
  }

  await assertAssignedMentor(teacherId, internship.studentId);

  return internship;
};

// ============================================================
// GET STUDENT INTERNSHIPS
// GET /api/mentor/internships/student/:studentId
// ============================================================

const getStudentInternships = async (userAccountId, studentId) => {
  if (!studentId) {
    throw new ApiError(400, "Student ID is required");
  }

  const teacher = await getTeacher(userAccountId);

  await assertAssignedMentor(teacher.id, studentId);

  const student = await prisma.students.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
      fullName: true,
      registerNumber: true,
      profileImage: true,
    },
  });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const internships = await prisma.student_internships.findMany({
    where: {
      studentId,
    },
    include: {
      internship_documents: {
        orderBy: {
          uploadedAt: "desc",
        },
      },
      internship_reviews: {
        orderBy: {
          reviewedAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const current = internships.filter((internship) =>
    [
      "ONGOING",
      "PENDING_INITIAL_VERIFICATION",
      "PENDING_COMPLETION_VERIFICATION",
    ].includes(internship.status)
  );

  const history = internships.filter(
    (internship) =>
      internship.status === "COMPLETED" &&
      internship.verificationStatus === "APPROVED" &&
      internship.completionVerificationStatus === "APPROVED"
  );

  const pendingVerifications = internships.filter(
    (internship) =>
      (
        internship.status === "PENDING_INITIAL_VERIFICATION" &&
        internship.verificationStatus === "PENDING"
      ) ||
      (
        internship.status === "PENDING_COMPLETION_VERIFICATION" &&
        internship.completionVerificationStatus === "PENDING"
      )
  );

  return {
    student,
    internships: decorateInternships(internships, userAccountId),
    current: decorateInternships(current, userAccountId),
    history: decorateInternships(history, userAccountId),
    pendingVerifications: decorateInternships(
      pendingVerifications,
      userAccountId
    ),
  };
};

// ============================================================
// INITIAL VERIFICATION QUEUE
// GET /api/mentor/internships/initial-queue
// ============================================================

const getInitialQueue = async (userAccountId) => {
  const teacher = await getTeacher(userAccountId);

  const studentIds = await getAssignedStudentIds(teacher.id);

  if (studentIds.length === 0) {
    return [];
  }

  const internships = await prisma.student_internships.findMany({
    where: {
      studentId: {
        in: studentIds,
      },
      status: "PENDING_INITIAL_VERIFICATION",
      verificationStatus: "PENDING",
    },
    include: {
      student: {
        select: {
          id: true,
          fullName: true,
          registerNumber: true,
          profileImage: true,
          departmentId: true,
        },
      },
      internship_documents: {
        orderBy: {
          uploadedAt: "desc",
        },
      },
      internship_reviews: {
        orderBy: {
          reviewedAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return internships.map((internship) => {
    const requiredDocuments =
      getRequiredInitialDocuments(internship);

    const missingDocuments = getMissingDocuments(
      internship,
      requiredDocuments,
      "INITIAL"
    );

    return {
      ...decorateInternship(internship, userAccountId),
      requiredDocuments,
      missingDocuments,
      isReadyForReview: missingDocuments.length === 0,
    };
  });
};

// ============================================================
// COMPLETION VERIFICATION QUEUE
// GET /api/mentor/internships/completion-queue
// ============================================================

const getCompletionQueue = async (userAccountId) => {
  const teacher = await getTeacher(userAccountId);

  const studentIds = await getAssignedStudentIds(teacher.id);

  if (studentIds.length === 0) {
    return [];
  }

  const internships = await prisma.student_internships.findMany({
    where: {
      studentId: {
        in: studentIds,
      },
      status: "PENDING_COMPLETION_VERIFICATION",
      completionVerificationStatus: "PENDING",
    },
    include: {
      student: {
        select: {
          id: true,
          fullName: true,
          registerNumber: true,
          profileImage: true,
          departmentId: true,
        },
      },
      internship_documents: {
        orderBy: {
          uploadedAt: "desc",
        },
      },
      internship_reviews: {
        orderBy: {
          reviewedAt: "desc",
        },
      },
    },
    orderBy: [
      {
        completionRequestedAt: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
  });

  return internships.map((internship) => {
    const documentStage =
      internship.internshipType === "ALREADY_COMPLETED"
        ? "INITIAL"
        : "COMPLETION";

    const missingDocuments = getMissingDocuments(
      internship,
      COMPLETION_DOCUMENT_TYPES,
      documentStage
    );

    return {
      ...decorateInternship(internship, userAccountId),
      documentStage,
      requiredDocuments: COMPLETION_DOCUMENT_TYPES,
      missingDocuments,
      isReadyForReview: missingDocuments.length === 0,
    };
  });
};

// ============================================================
// SINGLE INTERNSHIP DETAILS
// GET /api/mentor/internships/:internshipId
// ============================================================

const getInternshipDetails = async (
  userAccountId,
  internshipId
) => {
  const teacher = await getTeacher(userAccountId);

  const internship = await getInternshipForReview(
    internshipId,
    teacher.id
  );

  const initialMissingDocuments = getMissingDocuments(
    internship,
    getRequiredInitialDocuments(internship),
    "INITIAL"
  );

  const completionStage =
    internship.internshipType === "ALREADY_COMPLETED"
      ? "INITIAL"
      : "COMPLETION";

  const completionMissingDocuments = getMissingDocuments(
    internship,
    COMPLETION_DOCUMENT_TYPES,
    completionStage
  );

  return {
    ...decorateInternship(internship, userAccountId),
    initialMissingDocuments,
    completionMissingDocuments,
    initialReadyForReview:
      initialMissingDocuments.length === 0,
    completionReadyForReview:
      completionMissingDocuments.length === 0,
  };
};

// ============================================================
// INITIAL VERIFICATION DECISION
// ============================================================

const reviewInitial = async (
  userAccountId,
  internshipId,
  { decision, remarks }
) => {
  validateDecision(decision, remarks);

  const teacher = await getTeacher(userAccountId);

  const internship = await getInternshipForReview(
    internshipId,
    teacher.id
  );

  if (
    internship.status !== "PENDING_INITIAL_VERIFICATION" ||
    internship.verificationStatus !== "PENDING"
  ) {
    throw new ApiError(
      400,
      "This internship is not awaiting initial review"
    );
  }

  ensureDocumentsPresent(
    internship,
    getRequiredInitialDocuments(internship),
    "INITIAL"
  );

  const now = new Date();
  const approved = decision === "APPROVED";

  const isAlreadyCompleted =
    internship.internshipType === "ALREADY_COMPLETED";

  const updateData = approved
    ? {
        verificationStatus: "APPROVED",
        verifiedAt: now,
        mentorRemark: remarks?.trim() || null,

        ...(isAlreadyCompleted
          ? {
              status: "PENDING_COMPLETION_VERIFICATION",
              completionVerificationStatus: "PENDING",
              completionRequestedAt: now,
            }
          : {
              status: "ONGOING",
            }),
      }
    : {
        verificationStatus: "REJECTED",
        verifiedAt: now,
        mentorRemark: remarks.trim(),
      };

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.student_internships.update({
      where: {
        id: internship.id,
      },
      data: updateData,
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            registerNumber: true,
            profileImage: true,
          },
        },
        internship_documents: true,
      },
    });

    await tx.internship_reviews.create({
      data: {
        id: randomUUID(),
        internshipId: internship.id,
        reviewerTeacherId: teacher.id,
        reviewStage: "INITIAL",
        decision,
        remarks: remarks?.trim() || null,
        reviewedAt: now,
      },
    });

    return result;
  });

  return decorateInternship(updated, userAccountId);
};

// ============================================================
// COMPLETION VERIFICATION DECISION
// ============================================================

const reviewCompletion = async (
  userAccountId,
  internshipId,
  { decision, remarks, rating }
) => {
  validateDecision(decision, remarks);
  validateRating(rating);

  const teacher = await getTeacher(userAccountId);

  const internship = await getInternshipForReview(
    internshipId,
    teacher.id
  );

  if (
    internship.status !== "PENDING_COMPLETION_VERIFICATION" ||
    internship.completionVerificationStatus !== "PENDING"
  ) {
    throw new ApiError(
      400,
      "This internship is not awaiting completion verification"
    );
  }

  if (internship.verificationStatus !== "APPROVED") {
    throw new ApiError(
      400,
      "Initial internship verification must be approved first"
    );
  }

  const documentStage =
    internship.internshipType === "ALREADY_COMPLETED"
      ? "INITIAL"
      : "COMPLETION";

  ensureDocumentsPresent(
    internship,
    COMPLETION_DOCUMENT_TYPES,
    documentStage
  );

  const now = new Date();
  const approved = decision === "APPROVED";

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.student_internships.update({
      where: {
        id: internship.id,
      },
      data: {
        status: approved ? "COMPLETED" : "ONGOING",

        completionVerificationStatus: approved
          ? "APPROVED"
          : "REJECTED",

        completionMentorRemark: remarks?.trim() || null,
        completionVerifiedAt: now,

        ...(approved && rating !== undefined
          ? { rating }
          : {}),
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            registerNumber: true,
            profileImage: true,
          },
        },
        internship_documents: true,
      },
    });

    await tx.internship_reviews.create({
      data: {
        id: randomUUID(),
        internshipId: internship.id,
        reviewerTeacherId: teacher.id,
        reviewStage: "COMPLETION",
        decision,
        remarks: remarks?.trim() || null,
        reviewedAt: now,
      },
    });

    return result;
  });

  return decorateInternship(updated, userAccountId);
};

// ============================================================
// REVIEW HISTORY
// ============================================================

const getReviewHistory = async (
  userAccountId,
  internshipId
) => {
  const teacher = await getTeacher(userAccountId);

  await getInternshipForReview(
    internshipId,
    teacher.id
  );

  return prisma.internship_reviews.findMany({
    where: {
      internshipId,
      reviewerTeacherId: teacher.id,
    },
    orderBy: {
      reviewedAt: "desc",
    },
  });
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

const internshipService = {
  getStudentInternships,
  getInitialQueue,
  getCompletionQueue,
  getInternshipDetails,
  reviewInitial,
  reviewCompletion,
  getReviewHistory,
};

export default internshipService;