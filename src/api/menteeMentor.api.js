import api from "./axios";

/**
 * ==========================================================
 * Get mentor assigned to the logged-in student
 * ==========================================================
 */
export const getMyMentor = async () => {
  const response = await api.get("/mentee/mentor");

  return response?.data?.data ?? null;
};
