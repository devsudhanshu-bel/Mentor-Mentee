
import { z } from "zod";

// ==========================================================
// GET EXTRA CURRICULAR DOCUMENTS
// ==========================================================

export const getExtraCurricularDocumentsSchema = z.object({
  params: z.object({
    studentId: z
      .string()
      .trim()
      .min(1, "Student ID is required."),
  }),
});

// ==========================================================
// GET EXTRA CURRICULAR DASHBOARD
// ==========================================================

export const getExtraCurricularDashboardSchema = z.object({
  params: z.object({
    studentId: z
      .string()
      .trim()
      .min(1, "Student ID is required."),
  }),
});

// ==========================================================
// GET SINGLE EXTRA CURRICULAR DOCUMENT
// ==========================================================

export const getExtraCurricularDocumentSchema = z.object({
  params: z.object({
    studentId: z
      .string()
      .trim()
      .min(1, "Student ID is required."),

    documentId: z
      .string()
      .trim()
      .min(1, "Document ID is required."),
  }),
});

// ==========================================================
// REVIEW EXTRA CURRICULAR DOCUMENT
// ==========================================================

export const reviewExtraCurricularSchema = z.object({
  params: z.object({
    studentId: z
      .string()
      .trim()
      .min(1, "Student ID is required."),

    documentId: z
      .string()
      .trim()
      .min(1, "Document ID is required."),
  }),

  body: z
    .object({
      status: z.enum([
        "VERIFIED",
        "CORRECTIONS_REQUESTED",
      ]),

      mentorRemark: z
        .string()
        .trim()
        .max(
          2000,
          "Mentor remark cannot exceed 2000 characters."
        )
        .optional()
        .or(z.literal("")),
    })
    .superRefine((body, ctx) => {
      if (
        body.status === "CORRECTIONS_REQUESTED" &&
        !body.mentorRemark?.trim()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["mentorRemark"],
          message:
            "A remark is required when requesting corrections.",
        });
      }
    }),
});
