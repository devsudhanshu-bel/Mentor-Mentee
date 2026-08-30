import api from "./axios";

// ==========================================================
// ACADEMIC OVERVIEW
// ==========================================================

export const getAcademicOverview = async () => {
  const response = await api.get("/mentee/academics");

  return response.data;
};

// ==========================================================
// SEMESTER - GET
// ==========================================================

export const getSemesterAcademicData = async (semesterNumber) => {
  const response = await api.get(
    `/mentee/academics/semester/${semesterNumber}`,
  );

  return response.data;
};

export const getAcademicSemester = async (semesterNumber) => {
  const response = await api.get(
    `/mentee/academics/semester/${semesterNumber}`,
  );

  return response.data;
};

// ==========================================================
// SEMESTER - CREATE
// ==========================================================

export const createAcademicSemester = async (data) => {
  const response = await api.post("/mentee/academics/semester", data);

  return response.data;
};

// ==========================================================
// SEMESTER - UPDATE
// ==========================================================

export const updateAcademicSemester = async (semesterNumber, data) => {
  const response = await api.put(
    `/mentee/academics/semester/${semesterNumber}`,
    data,
  );

  return response.data;
};

// ==========================================================
// BACKLOGS
// ==========================================================

export const getBacklogs = async () => {
  const response = await api.get("/mentee/academics/backlogs");

  return response.data;
};

export const createBacklog = async (data) => {
  const response = await api.post("/mentee/academics/backlogs", data);

  return response.data;
};

export const updateBacklog = async (backlogId, data) => {
  const response = await api.put(
    `/mentee/academics/backlogs/${backlogId}`,
    data,
  );

  return response.data;
};

export const deleteBacklog = async (backlogId) => {
  const response = await api.delete(`/mentee/academics/backlogs/${backlogId}`);

  return response.data;
};

export const clearBacklog = async (backlogId, data) => {
  const response = await api.patch(
    `/mentee/academics/backlogs/${backlogId}/clear`,
    data,
  );

  return response.data;
};
