import api from "./axios";

// Fetch current and next academic term context.
export const getTermChangeContext = async () => {
  const response = await api.get("/admin/term-change/context");
  return response?.data?.data ?? response?.data ?? null;
};

// Directly activate the next term as an authenticated Admin.
export const activateAcademicTerm = async ({
  requestedStartDate,
  requestedEndDate,
  expectedCurrentTermId,
}) => {
  const response = await api.post("/admin/term-change/activate", {
    requestedStartDate,
    requestedEndDate,
    expectedCurrentTermId,
  });
  return response?.data?.data ?? response?.data ?? null;
};

// Legacy request helper retained for any other screen that may still use it.
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
