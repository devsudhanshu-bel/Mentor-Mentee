import api from "./axios";

// ==========================================================
// GET TERM CHANGE CONTEXT
// ==========================================================

export const getTermChangeContext = async () => {
  const response = await api.get("/admin/term-change/context");

  return response?.data?.data ?? response?.data ?? null;
};

// ==========================================================
// CREATE TERM CHANGE REQUEST
// ==========================================================

export const createTermChangeRequest = async ({
  requestedStartDate,
  requestedEndDate,
}) => {
  const response = await api.post("/admin/term-change/request", {
    requestedStartDate,
    requestedEndDate,
  });

  return response?.data?.data ?? response?.data ?? null;
};
