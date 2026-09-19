import api from "./axios";

/* ==========================================================
   MENTOR PROFILE
   Existing API — preserved
========================================================== */

export const getMentorProfile = async () => {
  const response = await api.get("/mentor/profile");

  return response.data.data;
};

export const updateMentorProfile = async (data) => {
  const response = await api.put("/mentor/profile", data);

  return response.data;
};

/* ==========================================================
   STUDENT PERSONAL PROFILE
========================================================== */

export const getPersonalProfile = async () => {
  const response = await api.get("/mentee/profile/personal");

  return response.data;
};

export const createPersonalProfile = async (data) => {
  const response = await api.post("/mentee/profile/personal", data);

  return response.data;
};

export const updatePersonalProfile = async (data) => {
  const response = await api.put("/mentee/profile/personal", data);

  return response.data;
};

/* ==========================================================
   STUDENT PARENT / GUARDIAN
========================================================== */

export const getParentDetails = async () => {
  const response = await api.get("/mentee/profile/parent");

  return response.data;
};

export const createParentDetails = async (data) => {
  const response = await api.post("/mentee/profile/parent", data);

  return response.data;
};

export const updateParentDetails = async (data) => {
  const response = await api.put("/mentee/profile/parent", data);

  return response.data;
};

/* ==========================================================
   STUDENT CONTACT
========================================================== */

export const getContactDetails = async () => {
  const response = await api.get("/mentee/profile/contact");

  return response.data;
};

export const createContactDetails = async (data) => {
  const response = await api.post("/mentee/profile/contact", data);

  return response.data;
};

export const updateContactDetails = async (data) => {
  const response = await api.put("/mentee/profile/contact", data);

  return response.data;
};
