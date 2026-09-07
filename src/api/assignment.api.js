import api from "./axios";

// ============================================================
// GET ASSIGNMENT CONTEXT
// ============================================================
//
// Dynamic cascade:
//
// Academic Year
//      ↓
// Term
//      ↓
// Department
//      ↓
// Year
//      ↓
// Section
//
// All options come from the backend/database.
// Nothing academic is hardcoded here.
//
// ============================================================

export const getAssignmentContext = async ({
  academicYear,
  academicYearId,
  termId,
  departmentId,
  semesterNumber,
  section,
} = {}) => {
  const params = {};

  // ------------------------------------------------------------
  // Academic Year
  // ------------------------------------------------------------

  if (academicYear) {
    params.academicYear = academicYear;
  }

  if (academicYearId) {
    params.academicYearId = academicYearId;
  }

  // ------------------------------------------------------------
  // Term
  // ------------------------------------------------------------

  if (termId) {
    params.termId = termId;
  }

  // ------------------------------------------------------------
  // Department
  // ------------------------------------------------------------

  if (departmentId) {
    params.departmentId = departmentId;
  }

  // ------------------------------------------------------------
  // Semester / Year
  // ------------------------------------------------------------

  if (
    semesterNumber !== undefined &&
    semesterNumber !== null &&
    semesterNumber !== ""
  ) {
    params.semesterNumber = semesterNumber;
  }

  // ------------------------------------------------------------
  // Section
  // ------------------------------------------------------------

  if (section && section !== "All Sections") {
    params.section = section;
  }

  // ============================================================
  // REQUEST
  // ============================================================

  const response = await api.get("/admin/assignments/context", {
    params,
  });

  // ============================================================
  // IMPORTANT
  // ============================================================
  //
  // Controller response:
  //
  // {
  //   success: true,
  //   message: "...",
  //   data: {...}
  // }
  //
  // Return ONLY the actual context.
  //
  // ============================================================

  return response?.data?.data ?? response?.data ?? null;
};

// ============================================================
// ASSIGN STUDENTS TO MENTOR
// ============================================================

export const assignStudentsToMentor = async ({
  studentIds,
  teacherId,
  termId,
  assignedBy,
}) => {
  const response = await api.post("/admin/assignments", {
    studentIds,
    teacherId,
    termId,
    assignedBy,
  });

  return response?.data?.data ?? response?.data ?? null;
};

// ============================================================
// GET ALL ASSIGNMENTS
// ============================================================

export const getAllAssignments = async ({
  termId,
  departmentId,
  teacherId,
  search,
} = {}) => {
  const params = {};

  if (termId) {
    params.termId = termId;
  }

  if (departmentId) {
    params.departmentId = departmentId;
  }

  if (teacherId) {
    params.teacherId = teacherId;
  }

  if (search && search.trim()) {
    params.search = search.trim();
  }

  const response = await api.get("/admin/assignments", {
    params,
  });

  return response?.data?.data ?? response?.data ?? [];
};
