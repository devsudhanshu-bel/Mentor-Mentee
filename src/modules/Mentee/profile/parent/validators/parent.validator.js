import { z } from "zod";

const parentSchema = z.object({
  /* ==========================================================
     Father Details
  ========================================================== */

  fatherName: z.string().trim().optional(),

  fatherOccupation: z.string().trim().optional(),

  fatherPhone: z.string().trim().optional(),

  fatherEmail: z
    .string()
    .email()
    .optional(),

  /* ==========================================================
     Mother Details
  ========================================================== */

  motherName: z.string().trim().optional(),

  motherOccupation: z.string().trim().optional(),

  motherPhone: z.string().trim().optional(),

  motherEmail: z
    .string()
    .email()
    .optional(),

  /* ==========================================================
     Guardian Details
  ========================================================== */

  guardianName: z.string().trim().optional(),

  guardianRelation: z.string().trim().optional(),

  guardianPhone: z.string().trim().optional(),

  guardianEmail: z
    .string()
    .email()
    .optional(),
});

export default parentSchema;