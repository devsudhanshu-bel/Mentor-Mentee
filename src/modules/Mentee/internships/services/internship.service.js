import { randomUUID } from "node:crypto";

import prisma from "../../../../config/prisma.hod.js";
import ApiError from "../../../../utils/ApiError.js";

import {
  uploadLocalFile,
  deleteLocalFile,
} from "../../../../utils/localStorage.js";

import { createFileAccessToken } from "../../../../utils/fileAccessToken.js";

const INITIAL_DOCUMENT_TYPES = ["OFFER_LETTER"];

const COMPLETION_DOCUMENT_TYPES = [
  "COMPLETION_CERTIFICATE",
  "COMPLETION_LETTER",
  "FINAL_REPORT",
];

const ALLOWED_DOCUMENT_TYPES = [
  ...INITIAL_DOCUMENT_TYPES,
  ...COMPLETION_DOCUMENT_TYPES,
  "OTHER",
];

const CURRENT_STATUSES = [
  "PENDING_INITIAL_VERIFICATION",
  "ONGOING",
  "PENDING_COMPLETION_VERIFICATION",
];

// ============================================================
// PRIVATE FILE HELPERS
// ============================================================

const isLocalInternshipFile = (storageKey) =>
  typeof storageKey === "string" &&
  storageKey.startsWith("private/internships/");

const decorateInternshipDocument = (document, userAccountId) => {
  if (!document?.cloudinaryPublicId) {
    return document;
  }

  if (!isLocalInternshipFile(document.cloudinaryPublicId)) {
    return document;
  }

  const token = createFileAccessToken({
    storageKey: document.cloudinaryPublicId,
    recordType: "internship_document",
    recordId: document.id,
    userId: userAccountId,
  });

  return {
    ...document,
    fileUrl: `/api/files/private?token=${encodeURIComponent(token)}`,
  };
};

const decorateInternship = (internship, userAccountId) => {
  if (!internship) return internship;

  return {
    ...internship,
    internship_documents: (
      internship.internship_documents || []
    ).map((document) =>
      decorateInternshipDocument(document, userAccountId),
    ),
  };
};

const decorateInternships = (internships, userAccountId) =>
  internships.map((internship) =>
    decorateInternship(internship, userAccountId),
  );

const cleanupStoredFile = async (storageKey) => {
  if (!storageKey) return;

  if (!isLocalInternshipFile(storageKey)) {
    console.warn(
      "Skipped cleanup: invalid local internship storage key."
    );
    return;
  }

  try {
    await deleteLocalFile(storageKey);
  } catch (error) {
    console.error(
      "Failed to clean up local internship document:",
      error
    );
  }
};

// ============================================================
// STUDENT HELPERS
// ============================================================

const getStudent = async (userAccountId) => {
  const student = await prisma.students.findUnique({
    where: { userAccountId },
    select: {
      id: true,
      userAccountId: true,
    },
  });

  if (!student) {
    throw new ApiError(404, "Student profile not found");
  }

  return student;
};

const getOwnedInternship = async (studentId, internshipId) => {
  const internship = await prisma.student_internships.findFirst({
    where: {
      id: internshipId,
      studentId,
    },
    include: {
      internship_documents: {
        orderBy: { uploadedAt: "desc" },
      },
      internship_reviews: {
        orderBy: { reviewedAt: "desc" },
      },
    },
  });

  if (!internship) {
    throw new ApiError(404, "Internship not found");
  }

  return internship;
};

// ============================================================
// VALIDATION HELPERS
// ============================================================

const validateDate = (value, fieldName, required = false) => {
  if (!value && !required) {
    return null;
  }

  if (!value) {
    throw new ApiError(400, `${fieldName} is required`);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, `${fieldName} is invalid`);
  }

  return date;
};

const getMissingDocuments = (documents, requiredTypes, stage) => {
  const uploadedTypes = new Set(
    documents
      .filter((document) => document.submissionStage === stage)
      .map((document) => document.documentType),
  );

  return requiredTypes.filter((type) => !uploadedTypes.has(type));
};

// ============================================================
// CREATE INTERNSHIP
// ============================================================

const createInternship = async (userAccountId, payload) => {
  const student = await getStudent(userAccountId);

  const {
    internshipType,
    companyName,
    internshipTitle,
    role,
    startDate,
    endDate,
    location,
    mode,
    projectName,
    description,
  } = payload;

  if (!["ONGOING", "ALREADY_COMPLETED"].includes(internshipType)) {
    throw new ApiError(
      400,
      "internshipType must be ONGOING or ALREADY_COMPLETED",
    );
  }

  if (!companyName?.trim()) {
    throw new ApiError(400, "Company name is required");
  }

  if (!internshipTitle?.trim()) {
    throw new ApiError(400, "Internship title is required");
  }

  const parsedStartDate = validateDate(startDate, "Start date", true);
  const parsedEndDate = validateDate(endDate, "End date");

  if (parsedEndDate && parsedEndDate < parsedStartDate) {
    throw new ApiError(400, "End date cannot be before start date");
  }

  if (
    mode !== undefined &&
    mode !== null &&
    !["ONSITE", "REMOTE", "HYBRID"].includes(mode)
  ) {
    throw new ApiError(400, "Invalid internship mode");
  }

  return prisma.student_internships.create({
    data: {
      id: randomUUID(),
      studentId: student.id,
      internshipType,
      companyName: companyName.trim(),
      internshipTitle: internshipTitle.trim(),
      role: role?.trim() || null,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      location: location?.trim() || null,
      mode: mode || null,
      projectName: projectName?.trim() || null,
      description: description?.trim() || null,
      status: "PENDING_INITIAL_VERIFICATION",
      verificationStatus: "PENDING",
      completionVerificationStatus: "NOT_SUBMITTED",
    },
    include: {
      internship_documents: true,
    },
  });
};

// ============================================================
// GET MY INTERNSHIPS
// ============================================================

const getMyInternships = async (userAccountId) => {
  const student = await getStudent(userAccountId);

  const internships = await prisma.student_internships.findMany({
    where: {
      studentId: student.id,
    },
    include: {
      internship_documents: {
        orderBy: { uploadedAt: "desc" },
      },
      internship_reviews: {
        orderBy: { reviewedAt: "desc" },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const decorated = decorateInternships(internships, userAccountId);

  return {
    internships: decorated,

    current: decorated.filter((item) =>
      CURRENT_STATUSES.includes(item.status),
    ),

    history: decorated.filter(
      (item) =>
        item.status === "COMPLETED" &&
        item.verificationStatus === "APPROVED" &&
        item.completionVerificationStatus === "APPROVED",
    ),

    pendingVerifications: decorated.filter(
      (item) =>
        item.verificationStatus === "PENDING" ||
        item.completionVerificationStatus === "PENDING",
    ),
  };
};

// ============================================================
// GET ONE INTERNSHIP
// ============================================================

const getInternshipById = async (userAccountId, internshipId) => {
  const student = await getStudent(userAccountId);

  const internship = await getOwnedInternship(student.id, internshipId);

  return decorateInternship(internship, userAccountId);
};

// ============================================================
// UPLOAD OR REPLACE INTERNSHIP DOCUMENT
// ============================================================

const uploadInternshipDocument = async (
  userAccountId,
  internshipId,
  payload,
  file,
) => {
  if (!file) {
    throw new ApiError(400, "Please select a document to upload");
  }

  const student = await getStudent(userAccountId);

  const internship = await getOwnedInternship(
    student.id,
    internshipId,
  );

  const { documentType } = payload;

  if (!ALLOWED_DOCUMENT_TYPES.includes(documentType)) {
    throw new ApiError(400, "Invalid internship document type");
  }

  if (
    internship.status === "COMPLETED" ||
    internship.status === "CANCELLED"
  ) {
    throw new ApiError(
      400,
      "Documents cannot be changed for a completed or cancelled internship",
    );
  }

  let submissionStage;
  let isRejectedOfferReplacement = false;

  if (documentType === "OFFER_LETTER") {
    const isInitialStage =
      internship.status === "PENDING_INITIAL_VERIFICATION";

    const isPending = internship.verificationStatus === "PENDING";
    const isRejected = internship.verificationStatus === "REJECTED";

    if (!isInitialStage || (!isPending && !isRejected)) {
      throw new ApiError(
        400,
        "The offer letter can only be uploaded before initial verification or after rejection",
      );
    }

    submissionStage = "INITIAL";
    isRejectedOfferReplacement = isRejected;
  } else if (COMPLETION_DOCUMENT_TYPES.includes(documentType)) {
    if (internship.internshipType === "ALREADY_COMPLETED") {
      if (
        internship.status !== "PENDING_INITIAL_VERIFICATION" ||
        internship.verificationStatus !== "PENDING"
      ) {
        throw new ApiError(
          400,
          "Initial completion documents can only be uploaded before initial verification",
        );
      }

      submissionStage = "INITIAL";
    } else {
      if (internship.status !== "ONGOING") {
        throw new ApiError(
          400,
          "Completion documents can only be uploaded while the internship is ongoing",
        );
      }

      submissionStage = "COMPLETION";
    }
  } else {
    if (
      internship.status === "PENDING_INITIAL_VERIFICATION" &&
      ["PENDING", "REJECTED"].includes(internship.verificationStatus)
    ) {
      submissionStage = "INITIAL";
    } else if (internship.status === "ONGOING") {
      submissionStage = "COMPLETION";
    } else {
      throw new ApiError(
        400,
        "Documents cannot be uploaded at the current verification stage",
      );
    }
  }

  const existingDocument =
    await prisma.internship_documents.findFirst({
      where: {
        internshipId: internship.id,
        documentType,
        submissionStage,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

  const uploadedFile = await uploadLocalFile(
    file,
    "internships",
    [internship.id],
  );

  let document;

  try {
    const now = new Date();

    const documentData = {
      documentType,
      submissionStage,
      documentName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      cloudinaryPublicId: uploadedFile.storageKey,
      fileUrl: null,
      resourceType: uploadedFile.resourceType || "raw",
      uploadedAt: now,
      updatedAt: now,
    };

    document = await prisma.$transaction(async (tx) => {
      let savedDocument;

      if (existingDocument) {
        savedDocument = await tx.internship_documents.update({
          where: {
            id: existingDocument.id,
          },
          data: documentData,
        });
      } else {
        savedDocument = await tx.internship_documents.create({
          data: {
            id: randomUUID(),
            internshipId: internship.id,
            ...documentData,
          },
        });
      }

      if (
        documentType === "OFFER_LETTER" &&
        isRejectedOfferReplacement
      ) {
        await tx.student_internships.update({
          where: {
            id: internship.id,
          },
          data: {
            verificationStatus: "PENDING",
            verifiedAt: null,
          },
        });
      }

      return savedDocument;
    });
  } catch (error) {
    await cleanupStoredFile(uploadedFile.storageKey);
    throw error;
  }

  if (
    existingDocument?.cloudinaryPublicId &&
    existingDocument.cloudinaryPublicId !== uploadedFile.storageKey
  ) {
    await cleanupStoredFile(existingDocument.cloudinaryPublicId);
  }

  return decorateInternshipDocument(document, userAccountId);
};

// ============================================================
// DELETE DOCUMENT
// ============================================================

const deleteInternshipDocument = async (
  userAccountId,
  internshipId,
  documentId,
) => {
  const student = await getStudent(userAccountId);

  const internship = await getOwnedInternship(
    student.id,
    internshipId,
  );

  const document = await prisma.internship_documents.findFirst({
    where: {
      id: documentId,
      internshipId: internship.id,
    },
  });

  if (!document) {
    throw new ApiError(404, "Internship document not found");
  }

  const canDeleteInitial =
    document.submissionStage === "INITIAL" &&
    internship.status === "PENDING_INITIAL_VERIFICATION" &&
    internship.verificationStatus === "PENDING";

  const canDeleteRejectedInitial =
    document.submissionStage === "INITIAL" &&
    internship.status === "PENDING_INITIAL_VERIFICATION" &&
    internship.verificationStatus === "REJECTED";

  const canDeleteCompletion =
    document.submissionStage === "COMPLETION" &&
    internship.status === "ONGOING";

  if (
    !canDeleteInitial &&
    !canDeleteRejectedInitial &&
    !canDeleteCompletion
  ) {
    throw new ApiError(
      400,
      "This document can no longer be deleted at the current verification stage",
    );
  }

  await prisma.internship_documents.delete({
    where: {
      id: document.id,
    },
  });

  await cleanupStoredFile(document.cloudinaryPublicId);

  return {
    documentId: document.id,
    message: "Internship document deleted successfully",
  };
};

// ============================================================
// REQUEST COMPLETION VERIFICATION
// ============================================================

const requestCompletion = async (
  userAccountId,
  internshipId,
  payload = {},
) => {
  const student = await getStudent(userAccountId);

  const internship = await getOwnedInternship(
    student.id,
    internshipId,
  );

  if (internship.status !== "ONGOING") {
    throw new ApiError(
      400,
      "Only an approved ongoing internship can be submitted for completion verification",
    );
  }

  const parsedEndDate = validateDate(
    payload.endDate || internship.endDate,
    "End date",
    true,
  );

  if (parsedEndDate < internship.startDate) {
    throw new ApiError(
      400,
      "End date cannot be before start date",
    );
  }

  const missingDocuments = getMissingDocuments(
    internship.internship_documents,
    COMPLETION_DOCUMENT_TYPES,
    "COMPLETION",
  );

  if (missingDocuments.length > 0) {
    throw new ApiError(
      400,
      `Upload all required completion documents first: ${missingDocuments.join(", ")}`,
    );
  }

  const updated = await prisma.student_internships.update({
    where: {
      id: internship.id,
    },
    data: {
      endDate: parsedEndDate,
      status: "PENDING_COMPLETION_VERIFICATION",
      completionVerificationStatus: "PENDING",
      completionRequestedAt: new Date(),
      completionMentorRemark: null,
    },
    include: {
      internship_documents: true,
    },
  });

  return decorateInternship(updated, userAccountId);
};

// ============================================================
// GET INITIAL SUBMISSION STATUS
// ============================================================

const getInitialSubmissionStatus = async (internshipId) => {
  const internship = await prisma.student_internships.findUnique({
    where: {
      id: internshipId,
    },
    include: {
      internship_documents: true,
    },
  });

  if (!internship) {
    throw new ApiError(404, "Internship not found");
  }

  const requiredDocuments =
    internship.internshipType === "ALREADY_COMPLETED"
      ? [
          ...INITIAL_DOCUMENT_TYPES,
          ...COMPLETION_DOCUMENT_TYPES,
        ]
      : INITIAL_DOCUMENT_TYPES;

  const missingDocuments = getMissingDocuments(
    internship.internship_documents,
    requiredDocuments,
    "INITIAL",
  );

  return {
    readyForMentorVerification:
      missingDocuments.length === 0 &&
      internship.verificationStatus === "PENDING" &&
      internship.status === "PENDING_INITIAL_VERIFICATION",

    missingDocuments,
    verificationStatus: internship.verificationStatus,
    status: internship.status,
    mentorRemark: internship.mentorRemark,

    canReplaceOfferLetter:
      internship.status === "PENDING_INITIAL_VERIFICATION" &&
      internship.verificationStatus === "REJECTED",
  };
};

// ============================================================
// EXPORTS
// ============================================================

export {
  createInternship,
  getMyInternships,
  getInternshipById,
  uploadInternshipDocument,
  deleteInternshipDocument,
  requestCompletion,
  getInitialSubmissionStatus,
};