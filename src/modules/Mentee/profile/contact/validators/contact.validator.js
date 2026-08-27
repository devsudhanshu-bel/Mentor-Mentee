import { z } from "zod";

const contactSchema = z.object({
  permanentAddress: z.string().trim().optional(),

  currentAddress: z.string().trim().optional(),

  addressType: z
    .enum([
      "HOME",
      "HOSTEL",
      "RENTED",
      "OTHER",
    ])
    .optional(),

  durationAtCurrentAddress: z.string().trim().optional(),

  personalMobile: z.string().trim().optional(),

  alternateMobile: z.string().trim().optional(),

  personalEmail: z.string().email().optional(),

  alternateEmail: z.string().email().optional(),

  whatsappNumber: z.string().trim().optional(),

  telegramUsername: z.string().trim().optional(),

  linkedInProfile: z.string().trim().optional(),

  githubProfile: z.string().trim().optional(),

  preferredContactMethod: z
    .enum([
      "MOBILE",
      "EMAIL",
      "WHATSAPP",
    ])
    .optional(),

  preferredContactTime: z.string().trim().optional(),

  communicationEmailPreference: z
    .enum([
      "UNIVERSITY_EMAIL",
      "PERSONAL_EMAIL",
    ])
    .optional(),

  allowWhatsappCommunication: z
    .boolean()
    .optional(),
});

export default contactSchema;