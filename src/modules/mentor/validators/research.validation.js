import { z } from "zod";

// ==========================================================
// GET RESEARCH DOCUMENTS
// ==========================================================

export const getResearchDocumentsSchema = z.object({
  params: z.object({
    studentId: z.string().trim().min(1, "Student ID is required."),
  }),
});

// ==========================================================
// GET RESEARCH DASHBOARD
// ==========================================================

export const getResearchDashboardSchema = z.object({
  params: z.object({
    studentId: z.string().trim().min(1, "Student ID is required."),
  }),
});

// ==========================================================
// GET SINGLE RESEARCH DOCUMENT
// ==========================================================

export const getResearchDocumentSchema = z.object({
  params: z.object({
    studentId: z.string().trim().min(1, "Student ID is required."),
    documentId: z.string().trim().min(1, "Document ID is required."),
  }),
});

// ==========================================================
// REVIEW RESEARCH DOCUMENT
// PATCH /:studentId/research/:documentId/review
// ==========================================================

export const reviewResearchSchema = z.object({
  params: z.object({
    studentId: z.string().trim().min(1, "Student ID is required."),
    documentId: z.string().trim().min(1, "Document ID is required."),
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
        .max(2000, "Mentor remark cannot exceed 2000 characters.")
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