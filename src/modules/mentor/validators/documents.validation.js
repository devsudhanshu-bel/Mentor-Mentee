import { z } from "zod";

const studentIdSchema = z
  .string()
  .trim()
  .min(1, "Student ID is required.");

const documentIdSchema = z
  .string()
  .trim()
  .min(1, "Document ID is required.");

const categorySchema = z.enum([
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

const querySchema = z.object({
  category: categorySchema.optional(),

  fileType: z
    .string()
    .trim()
    .min(1, "File type cannot be empty.")
    .max(100, "File type is too long.")
    .optional(),

  search: z
    .string()
    .trim()
    .max(200, "Search cannot exceed 200 characters.")
    .optional(),

  page: z.coerce
    .number()
    .int("Page must be a whole number.")
    .min(1, "Page must be at least 1.")
    .optional(),

  limit: z.coerce
    .number()
    .int("Limit must be a whole number.")
    .min(1, "Limit must be at least 1.")
    .max(100, "Limit cannot exceed 100.")
    .optional(),
});

export const getDocumentsSchema = z.object({
  params: z.object({
    studentId: studentIdSchema,
  }),
  query: querySchema,
});

export const getDocumentsDashboardSchema = z.object({
  params: z.object({
    studentId: studentIdSchema,
  }),
});

export const getDocumentByIdSchema = z.object({
  params: z.object({
    studentId: studentIdSchema,
    documentId: documentIdSchema,
  }),
});