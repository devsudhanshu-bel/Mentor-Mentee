import api from "./axios";

/* ==========================================================
   MENTOR PROFILE
========================================================== */

/**
 * Get mentor profile
 */
export const getMentorProfile = async () => {
  const response = await api.get("/mentor/profile");

  return response.data.data;
};

/**
 * Update mentor profile
 */
export const updateMentorProfile = async (data) => {
  const response = await api.put("/mentor/profile", data);

  return response.data.data;
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