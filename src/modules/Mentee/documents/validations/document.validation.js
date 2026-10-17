import { z } from "zod";

// ==========================================================
// SHARED DOCUMENT FIELDS
// ==========================================================

const documentCategorySchema = z.enum([
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
]);

// Document IDs are generated with crypto.randomUUID()
// in DocumentService, so validate them as UUIDs, not CUIDs.
const documentIdSchema = z.string().uuid("Invalid document ID.");

// ==========================================================
// UPLOAD DOCUMENT
// ==========================================================

export const uploadDocumentSchema = z.object({
  body: z.object({
    documentName: z
      .string()
      .trim()
      .min(1, "Document name is required.")
      .max(100, "Document name cannot exceed 100 characters."),

    category: documentCategorySchema,

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional()
      .or(z.literal("")),
  }),
});

// ==========================================================
// UPDATE DOCUMENT
// ==========================================================

export const updateDocumentSchema = z.object({
  body: z.object({
    documentName: z
      .string()
      .trim()
      .min(1, "Document name is required.")
      .max(100, "Document name cannot exceed 100 characters.")
      .optional(),

    category: documentCategorySchema.optional(),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional()
      .or(z.literal("")),
  }),

  params: z.object({
    documentId: documentIdSchema,
  }),
});

// ==========================================================
// GET SINGLE DOCUMENT
// ==========================================================

export const getDocumentSchema = z.object({
  params: z.object({
    documentId: documentIdSchema,
  }),
});

// ==========================================================
// DELETE DOCUMENT
// ==========================================================

export const deleteDocumentSchema = z.object({
  params: z.object({
    documentId: documentIdSchema,
  }),
});