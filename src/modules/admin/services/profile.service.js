import { randomUUID } from "node:crypto";

import prisma from "../../../config/prisma.hod.js";
import ApiError from "../../../utils/ApiError.js";

const PROFILE_FIELDS = [
  "fullName",
  "employeeId",
  "designation",
  "department",
  "school",
  "qualification",
  "specialization",
  "dateOfBirth",
  "gender",
  "nationality",
  "dateOfJoining",
  "office",
  "officePhone",
  "officeHours",
  "phone",
  "profileImage",
  "about",
];

const DATE_FIELDS = new Set([
  "dateOfBirth",
  "dateOfJoining",
]);

const STRING_FIELDS = new Set(
  PROFILE_FIELDS.filter(
    (field) => !DATE_FIELDS.has(field),
  ),
);

const hasOwn = (object, key) =>
  Object.prototype.hasOwnProperty.call(object, key);

/* ==========================================================
   VALIDATION HELPERS
========================================================== */

const cleanString = (value, fieldName) => {
  if (value === null) return null;

  if (typeof value !== "string") {
    throw new ApiError(
      400,
      `${fieldName} must be a string.`,
    );
  }

  const cleaned = value.trim();

  return cleaned.length ? cleaned : null;
};

const cleanEmail = (value) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new ApiError(
      400,
      "Email address is required.",
    );
  }

  const email = value.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError(
      400,
      "Please provide a valid email address.",
    );
  }

  if (email.length > 254) {
    throw new ApiError(
      400,
      "Email address is too long.",
    );
  }

  return email;
};

const cleanDate = (value, fieldName) => {
  if (value === null || value === "") {
    return null;
  }

  if (
    typeof value !== "string" &&
    !(value instanceof Date)
  ) {
    throw new ApiError(
      400,
      `${fieldName} must be a valid date.`,
    );
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ApiError(
      400,
      `${fieldName} must be a valid date.`,
    );
  }

  return date;
};

const buildProfileData = (
  input,
  { creating = false } = {},
) => {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    throw new ApiError(
      400,
      "A valid profile payload is required.",
    );
  }

  const data = {};

  for (const field of PROFILE_FIELDS) {
    if (!hasOwn(input, field)) continue;

    if (DATE_FIELDS.has(field)) {
      data[field] = cleanDate(input[field], field);
    } else if (STRING_FIELDS.has(field)) {
      data[field] = cleanString(input[field], field);
    }
  }

  if (hasOwn(data, "fullName")) {
    if (!data.fullName) {
      throw new ApiError(
        400,
        "Full name cannot be empty.",
      );
    }

    if (data.fullName.length > 150) {
      throw new ApiError(
        400,
        "Full name cannot exceed 150 characters.",
      );
    }
  }

  if (creating && !data.fullName) {
    throw new ApiError(
      400,
      "Full name is required to create a profile.",
    );
  }

  if (
    hasOwn(data, "employeeId") &&
    data.employeeId !== null &&
    data.employeeId.length > 100
  ) {
    throw new ApiError(
      400,
      "Employee ID cannot exceed 100 characters.",
    );
  }

  return data;
};

/* ==========================================================
   PROFILE SERIALIZATION
========================================================== */

/**
 * Employee ID priority:
 * 1. Linked teachers.employeeCode
 * 2. admin_profiles.employeeId
 * 3. Empty string if neither exists
 *
 * Employee ID is returned for display, not edited through
 * the Professional Information form.
 */
const serializeProfile = (
  account,
  profile,
  teacher = null,
) => ({
  id: profile?.id ?? null,
  userAccountId: account.id,

  fullName:
    profile?.fullName ??
    account.username ??
    "",

  employeeId:
    teacher?.employeeCode ??
    profile?.employeeId ??
    "",

  designation: profile?.designation ?? "",
  department: profile?.department ?? "",
  school: profile?.school ?? "",
  qualification: profile?.qualification ?? "",
  specialization: profile?.specialization ?? "",

  dateOfBirth: profile?.dateOfBirth ?? null,
  gender: profile?.gender ?? "",
  nationality: profile?.nationality ?? "",
  dateOfJoining: profile?.dateOfJoining ?? null,

  email: account.email ?? "",
  phone: profile?.phone ?? "",
  officePhone: profile?.officePhone ?? "",
  office: profile?.office ?? "",
  officeHours: profile?.officeHours ?? "",

  profileImage: profile?.profileImage ?? "",
  about: profile?.about ?? "",

  isActive: account.isActive,
  role: account.role,

  createdAt: profile?.createdAt ?? null,
  updatedAt: profile?.updatedAt ?? null,
});

/* ==========================================================
   ACCOUNT HELPERS
========================================================== */

const getAccount = async (client, userId) => {
  const account = await client.user_accounts.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  if (!account) {
    throw new ApiError(
      404,
      "Admin account not found.",
    );
  }

  if (
    !["ADMIN", "SYSTEM_ADMIN"].includes(account.role)
  ) {
    throw new ApiError(
      403,
      "This account cannot access the Admin profile.",
    );
  }

  return account;
};

/**
 * Find the employee code belonging to this user account.
 * Returns null if the Admin has no linked teacher record.
 */
const getLinkedTeacher = async (client, userId) => {
  return client.teachers.findUnique({
    where: {
      userAccountId: userId,
    },
    select: {
      employeeCode: true,
    },
  });
};

const ensureEmailAvailable = async (
  tx,
  email,
  userId,
) => {
  const existingAccount =
    await tx.user_accounts.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

  if (existingAccount) {
    throw new ApiError(
      409,
      "This email address is already associated with another account.",
    );
  }
};

const updateAccountEmail = async (
  tx,
  account,
  input,
) => {
  if (!hasOwn(input, "email")) {
    return account;
  }

  const email = cleanEmail(input.email);

  if (email === account.email) {
    return account;
  }

  await ensureEmailAvailable(
    tx,
    email,
    account.id,
  );

  return tx.user_accounts.update({
    where: {
      id: account.id,
    },
    data: {
      email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
    },
  });
};

/* ==========================================================
   UPDATE EXISTING PROFILE
========================================================== */

const updateExistingProfile = async (
  tx,
  account,
  existing,
  input,
) => {
  const data = buildProfileData(input);

  // Employee ID is sourced from the linked teacher record
  // and is intentionally excluded from profile edits.
  delete data.employeeId;

  const updatedAccount = await updateAccountEmail(
    tx,
    account,
    input,
  );

  const profile =
    Object.keys(data).length > 0
      ? await tx.admin_profiles.update({
          where: {
            userAccountId: account.id,
          },
          data: {
            ...data,
            updatedAt: new Date(),
          },
        })
      : existing;

  const teacher = await getLinkedTeacher(
    tx,
    account.id,
  );

  return {
    profileExists: true,
    profile: serializeProfile(
      updatedAccount,
      profile,
      teacher,
    ),
  };
};

/* ==========================================================
   ADMIN PROFILE SERVICE
========================================================== */

class AdminProfileService {
  /**
   * GET /api/admin/profile
   */
  async getProfile(userId) {
    const account = await getAccount(
      prisma,
      userId,
    );

    const [profile, teacher] = await Promise.all([
      prisma.admin_profiles.findUnique({
        where: {
          userAccountId: userId,
        },
      }),

      getLinkedTeacher(prisma, userId),
    ]);

    return {
      profileExists: Boolean(profile),

      profile: serializeProfile(
        account,
        profile,
        teacher,
      ),
    };
  }

  /**
   * POST /api/admin/profile
   *
   * Creates a profile if one doesn't exist.
   * If a profile already exists, updates it.
   */
  async createProfile(userId, input) {
    if (
      !input ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {
      throw new ApiError(
        400,
        "A valid profile payload is required.",
      );
    }

    return prisma.$transaction(async (tx) => {
      const account = await getAccount(
        tx,
        userId,
      );

      const existing =
        await tx.admin_profiles.findUnique({
          where: {
            userAccountId: userId,
          },
        });

      if (existing) {
        return updateExistingProfile(
          tx,
          account,
          existing,
          input,
        );
      }

      const data = buildProfileData(
        input,
        {
          creating: true,
        },
      );

      // Never accept an Employee ID from the profile form.
      delete data.employeeId;

      const updatedAccount =
        await updateAccountEmail(
          tx,
          account,
          input,
        );

      const now = new Date();

      const profile =
        await tx.admin_profiles.create({
          data: {
            id: randomUUID(),
            userAccountId: userId,
            ...data,
            createdAt: now,
            updatedAt: now,
          },
        });

      const teacher = await getLinkedTeacher(
        tx,
        userId,
      );

      return {
        profileExists: true,

        profile: serializeProfile(
          updatedAccount,
          profile,
          teacher,
        ),
      };
    });
  }

  /**
   * PUT /api/admin/profile
   */
  async updateProfile(userId, input) {
    if (
      !input ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {
      throw new ApiError(
        400,
        "A valid profile payload is required.",
      );
    }

    const data = buildProfileData(input);

    // Employee ID cannot be modified through this service.
    delete data.employeeId;

    const hasEmail = hasOwn(input, "email");

    if (
      Object.keys(data).length === 0 &&
      !hasEmail
    ) {
      throw new ApiError(
        400,
        "No editable profile fields were provided.",
      );
    }

    return prisma.$transaction(async (tx) => {
      const account = await getAccount(
        tx,
        userId,
      );

      const existing =
        await tx.admin_profiles.findUnique({
          where: {
            userAccountId: userId,
          },
        });

      if (!existing) {
        throw new ApiError(
          404,
          "Profile not found. Please create your profile first.",
        );
      }

      return updateExistingProfile(
        tx,
        account,
        existing,
        input,
      );
    });
  }
}

export default new AdminProfileService();