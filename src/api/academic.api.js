import api from "./axios";

/* ==========================================================
   ACADEMIC OVERVIEW
========================================================== */

/**
 * GET
 *
 * /api/mentee/academics
 */
export const getAcademicOverview = async () => {
  const response = await api.get("/mentee/academics");

  return response.data;
};

/* ==========================================================
   SINGLE SEMESTER
========================================================== */

/**
 * GET
 *
 * /api/mentee/academics/semester/:semesterNumber
 */
export const getAcademicSemester = async (semesterNumber) => {
  const number = Number(semesterNumber);

  if (!Number.isInteger(number) || number < 1 || number > 8) {
    throw new Error("Semester number must be between 1 and 8.");
  }

  const response = await api.get(`/mentee/academics/semester/${number}`);

  return response.data;
};

/* ==========================================================
   CREATE / SAVE ACADEMIC MARKS
========================================================== */

/**
 * POST
 *
 * /api/mentee/academics/semester
 *
 * NOTE:
 * The backend only accepts existing subject IDs.
 *
 * This does NOT create a new subject structure.
 */
export const createAcademicSemester = async (data) => {
  const response = await api.post("/mentee/academics/semester", data);

  return response.data;
};

/* ==========================================================
   UPDATE ACADEMIC MARKS
========================================================== */

/**
 * PUT
 *
 * /api/mentee/academics/semester/:semesterNumber
 */
export const updateAcademicSemester = async (semesterNumber, data) => {
  const number = Number(semesterNumber);

  if (!Number.isInteger(number) || number < 1 || number > 8) {
    throw new Error("Semester number must be between 1 and 8.");
  }

  const response = await api.put(`/mentee/academics/semester/${number}`, data);

  return response.data;
};

/* ==========================================================
   BACKLOGS
========================================================== */

/**
 * GET all backlogs
 */
export const getBacklogs = async () => {
  const response = await api.get("/mentee/academics/backlogs");

  return response.data;
};

/**
 * POST backlog
 */
export const createBacklog = async (data) => {
  const response = await api.post("/mentee/academics/backlogs", data);

  return response.data;
};

/**
 * PUT backlog
 */
export const updateBacklog = async (backlogId, data) => {
  const response = await api.put(
    `/mentee/academics/backlogs/${backlogId}`,
    data,
  );

  return response.data;
};

/**
 * DELETE backlog
 */
export const deleteBacklog = async (backlogId) => {
  const response = await api.delete(`/mentee/academics/backlogs/${backlogId}`);

  return response.data;
};

/**
 * PATCH clear backlog
 */
export const clearBacklog = async (backlogId, data) => {
  const response = await api.patch(
    `/mentee/academics/backlogs/${backlogId}/clear`,
    data,
  );

  return response.data;
};
