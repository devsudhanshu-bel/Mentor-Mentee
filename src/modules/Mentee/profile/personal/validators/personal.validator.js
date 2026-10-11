import { z } from "zod";

const personalSchema = z.object({
  registerNumber: z.string().trim().optional(),

  admissionNumber: z.string().trim().optional(),

  profileImage: z.string().trim().optional(),

  dateOfBirth: z
    .string()
    .datetime({ offset: true })
    .or(z.string().date())
    .optional(),

  gender: z
    .enum(["MALE", "FEMALE", "OTHER"])
    .optional(),

  bloodGroup: z
    .enum([
      "A_POSITIVE",
      "A_NEGATIVE",
      "B_POSITIVE",
      "B_NEGATIVE",
      "AB_POSITIVE",
      "AB_NEGATIVE",
      "O_POSITIVE",
      "O_NEGATIVE",
    ])
    .optional(),

  nationality: z.string().trim().optional(),

  religion: z.string().trim().optional(),

  department: z.string().trim().optional(),

  programme: z.string().trim().optional(),

  semester: z.string().trim().optional(),

  section: z.string().trim().optional(),

  studentType: z
    .enum(["DAY_SCHOLAR", "HOSTELLER"])
    .optional(),
});

export default personalSchema;