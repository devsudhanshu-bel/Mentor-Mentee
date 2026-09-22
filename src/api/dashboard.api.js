import api from "./axios";

/* ==========================================================
   MENTOR DASHBOARD
   Existing API — preserved
========================================================== */

export const getDashboardBanner = async () => {
  const response = await api.get("/mentor/dashboard/banner");

  return response.data.data;
};

/* ==========================================================
   ADMIN DASHBOARD
========================================================== */

export const getAdminDashboardOverview = async () => {
  const response = await api.get("/admin/dashboard/overview");

  return response?.data?.data ?? response?.data ?? {};
};

export const getAdminDashboardBanner = async () => {
  const response = await api.get("/admin/dashboard/banner");

  return response?.data?.data ?? response?.data ?? {};
};
