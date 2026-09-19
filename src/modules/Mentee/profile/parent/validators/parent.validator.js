import { z } from "zod";

const optionalString = z.string().trim().optional().nullable();

const optionalEmail = z.string().trim().email().optional().nullable();

const parentSchema = z.object({
  /* ==========================================================
     Father
  ========================================================== */

  fatherName: optionalString,

  fatherOccupation: optionalString,

  fatherCompany: optionalString,

  fatherAnnualIncome: optionalString,

  fatherQualification: optionalString,

  fatherEmail: optionalEmail,

  fatherPhone: optionalString,

  fatherAddress: optionalString,

  /* ==========================================================
     Mother
  ========================================================== */

  motherName: optionalString,

  motherOccupation: optionalString,

  motherCompany: optionalString,

  motherAnnualIncome: optionalString,

  motherQualification: optionalString,

  motherEmail: optionalEmail,

  motherPhone: optionalString,

  motherAddress: optionalString,

  /* ==========================================================
     Guardian
  ========================================================== */

  guardianName: optionalString,

  guardianRelationship: optionalString,

  guardianPhone: optionalString,

  guardianAlternatePhone: optionalString,
});

export default parentSchema;
