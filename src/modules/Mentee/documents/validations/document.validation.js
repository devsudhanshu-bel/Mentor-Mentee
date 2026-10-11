import { z } from "zod";

export const uploadDocumentSchema = z.object({
  body: z.object({
    documentName: z
      .string()
      .trim()
      .min(1, "Document name is required.")
      .max(100, "Document name cannot exceed 100 characters."),

    category: z.enum([
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
    ]),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional()
      .or(z.literal("")),
  }),
});

export const updateDocumentSchema = z.object({
  body: z.object({
    documentName: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .optional(),

    category: z
      .enum([
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
      ])
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional()
      .or(z.literal("")),
  }),

  params: z.object({
    documentId: z.string().cuid(),
  }),
});

export const getDocumentSchema = z.object({
  params: z.object({
    documentId: z.string().cuid(),
  }),
});

export const deleteDocumentSchema = z.object({
  params: z.object({
    documentId: z.string().cuid(),
  }),
});