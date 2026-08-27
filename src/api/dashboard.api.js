import api from "./axios";

/**
 * Get Mentor Dashboard Banner
 */
export const getDashboardBanner = async () => {
  const response = await api.get("/mentor/dashboard/banner");
  return response.data.data;
};