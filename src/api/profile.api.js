import api from "./axios";

/* ==========================================================
   MENTOR PROFILE
========================================================== */

/**
 * Unwrap common API response envelopes without assuming a single backend
 * response shape. Older responses use response.data.data; newer ones may
 * return the profile directly or include teacher/profile relations.
 */
const unwrapMentorPayload = (value) => {
  let current = value;

  for (let index = 0; index < 4; index += 1) {
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      current.data &&
      typeof current.data === "object"
    ) {
      current = current.data;
      continue;
    }

    break;
  }

  return current;
};

const normalizeMentorRecord = (record) => {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return null;
  }

  const teacher =
    record.teacher ??
    record.mentor ??
    record.teachers ??
    null;

  const profileDetails =
    record.profile ??
    record.teacherProfile ??
    record.teacher_profiles ??
    teacher?.teacherProfile ??
    teacher?.teacher_profiles ??
    null;

  const normalized = {
    ...(teacher && typeof teacher === "object" ? teacher : {}),
    ...record,
    ...(profileDetails && typeof profileDetails === "object"
      ? profileDetails
      : {}),
  };

  // Keep relation aliases used by existing profile components.
  const teacherProfiles =
    record.teacher_profiles ?? teacher?.teacher_profiles;
  const teacherProfile =
    record.teacherProfile ?? teacher?.teacherProfile;

  if (teacherProfiles) normalized.teacher_profiles = teacherProfiles;
  if (teacherProfile) normalized.teacherProfile = teacherProfile;

  return normalized;
};

const normalizeMentorProfileResponse = (responseData) => {
  const body = unwrapMentorPayload(responseData);

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { profileExists: false, profile: null };
  }

  const explicitProfile =
    body.profile ??
    body.mentor ??
    body.teacher ??
    body.teachers ??
    null;

  if (explicitProfile && typeof explicitProfile === "object") {
    return {
      profileExists: true,
      profile: normalizeMentorRecord({
        ...body,
        profile: explicitProfile,
      }),
    };
  }

  const directRecordHasMentorFields = [
    "fullName",
    "employeeCode",
    "userAccountId",
    "teacherId",
    "designation",
    "email",
  ].some((key) => body[key] !== undefined && body[key] !== null);

  if (directRecordHasMentorFields) {
    return {
      profileExists: true,
      profile: normalizeMentorRecord(body),
    };
  }

  return {
    profileExists: body.profileExists === true,
    profile: null,
  };
};

/**
 * Get mentor profile.
 * Always returns { profileExists, profile } for the existing profile page.
 */
export const getMentorProfile = async () => {
  const response = await api.get("/mentor/profile");
  return normalizeMentorProfileResponse(response.data);
};

/**
 * Update mentor profile.
 */
export const updateMentorProfile = async (data) => {
  const response = await api.put("/mentor/profile", data);
  return normalizeMentorProfileResponse(response.data);
};

/* ==========================================================
   MENTORING OVERVIEW
========================================================== */

/**
 * Get mentor dashboard / mentoring overview
 */
export const getMentorOverview = async () => {
  const response = await api.get("/mentor/overview");

  return response.data.data;
};

/* ==========================================================
   ADMIN PROFILE
========================================================== */

/**
 * Normalize Admin profile API responses.
 *
 * Expected backend response:
 * {
 *   success: true,
 *   statusCode: 200,
 *   message: "Admin profile fetched successfully.",
 *   data: {
 *     profileExists: true,
 *     profile: { ... }
 *   }
 * }
 *
 * Supports both wrapped and direct response formats.
 */
const normalizeAdminProfileResponse = (responseData) => {
  const body = responseData?.data ?? responseData;

  return {
    profileExists: body?.profileExists === true,
    profile: body?.profile ?? null,
  };
};

/**
 * Get admin profile
 */
export const getAdminProfile = async () => {
  const response = await api.get("/admin/profile");

  return normalizeAdminProfileResponse(response.data);
};

/**
 * Create admin profile
 */
export const createAdminProfile = async (data) => {
  const response = await api.post("/admin/profile", data);

  return normalizeAdminProfileResponse(response.data);
};

/**
 * Update admin profile
 */
export const updateAdminProfile = async (data) => {
  const response = await api.put("/admin/profile", data);

  return normalizeAdminProfileResponse(response.data);
};

/* ==========================================================
   STUDENT PERSONAL PROFILE
========================================================== */

/**
 * Get student personal profile
 */
export const getPersonalProfile = async () => {
  const response = await api.get("/mentee/profile/personal");

  return response.data;
};

/**
 * Create student personal profile
 */
export const createPersonalProfile = async (data) => {
  const response = await api.post(
    "/mentee/profile/personal",
    data
  );

  return response.data;
};

/**
 * Update student personal profile
 */
export const updatePersonalProfile = async (data) => {
  const response = await api.put(
    "/mentee/profile/personal",
    data
  );

  return response.data;
};

/* ==========================================================
   STUDENT PARENT / GUARDIAN
========================================================== */

/**
 * Get parent / guardian details
 */
export const getParentDetails = async () => {
  const response = await api.get(
    "/mentee/profile/parent"
  );

  return response.data;
};

/**
 * Create parent / guardian details
 */
export const createParentDetails = async (data) => {
  const response = await api.post(
    "/mentee/profile/parent",
    data
  );

  return response.data;
};

/**
 * Update parent / guardian details
 */
export const updateParentDetails = async (data) => {
  const response = await api.put(
    "/mentee/profile/parent",
    data
  );

  return response.data;
};

/* ==========================================================
   STUDENT CONTACT
========================================================== */

/**
 * Get student contact details
 */
export const getContactDetails = async () => {
  const response = await api.get(
    "/mentee/profile/contact"
  );

  return response.data;
};

/**
 * Create student contact details
 */
export const createContactDetails = async (data) => {
  const response = await api.post(
    "/mentee/profile/contact",
    data
  );

  return response.data;
};

/**
 * Update student contact details
 */
export const updateContactDetails = async (data) => {
  const response = await api.put(
    "/mentee/profile/contact",
    data
  );

  return response.data;
};