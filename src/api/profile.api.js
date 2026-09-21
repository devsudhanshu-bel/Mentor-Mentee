import api from "./axios";

/* ==========================================================
   GET MENTOR PROFILE
========================================================== */

export const getMentorProfile = async () => {
  const response = await api.get(
    "/mentor/profile"
  );

  return response.data.data;
};

/* ==========================================================
   UPDATE MENTOR PROFILE
========================================================== */

export const updateMentorProfile = async (
  data
) => {
  const response = await api.put(
    "/mentor/profile",
    data
  );

  return response.data.data;
};

/* ==========================================================
   GET MENTORING OVERVIEW
========================================================== */

export const getMentorOverview = async () => {
  const response = await api.get(
    "/mentor/overview"
  );

  return response.data.data;
};