import api from "./axios";

// ==========================================================
// ACADEMIC OVERVIEW
// ==========================================================

export const getAcademicOverview = async () => {
  const response = await api.get("/mentee/academics");

  return response.data;
};

// ==========================================================
// SEMESTER
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

export const createAcademicSemester = async (data) => {
  const response = await api.post("/mentee/academics/semester", data);

  return response.data;
};

// ==========================================================
// BACKLOGS
// ==========================================================

/**
 * Get all active and cleared backlogs
 */
export const getBacklogs = async () => {
  const response = await api.get("/mentee/academics/backlogs");

  return response.data;
};

/**
 * Add a new backlog
 *
 * data:
 * {
 *   subjectName: "BIO136",
 *   semesterNumber: 1
 * }
 */
export const createBacklog = async (data) => {
  const response = await api.post("/mentee/academics/backlogs", data);

  return response.data;
};

/**
 * Edit an existing backlog
 *
 * data:
 * {
 *   subjectName: "BIO136",
 *   semesterNumber: 1
 * }
 */
export const updateBacklog = async (backlogId, data) => {
  const response = await api.put(
    `/mentee/academics/backlogs/${backlogId}`,
    data,
  );

  return response.data;
};

/**
 * Remove an existing backlog
 */
export const deleteBacklog = async (backlogId) => {
  const response = await api.delete(`/mentee/academics/backlogs/${backlogId}`);

  return response.data;
};

/**
 * Mark a backlog as cleared
 *
 * data:
 * {
 *   clearedSemesterNumber: 3,
 *   clearedGrade: "B+",
 *   clearedMarks: 72
 * }
 */
export const clearBacklog = async (backlogId, data) => {
  const response = await api.patch(
    `/mentee/academics/backlogs/${backlogId}/clear`,
    data,
  );

  return response.data;
};
