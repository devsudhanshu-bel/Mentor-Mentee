import api from "./axios";

// ============================================================
// GET ASSIGNMENT CONTEXT
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

  if (academicYear) params.academicYear = academicYear;
  if (academicYearId) params.academicYearId = academicYearId;
  if (termId) params.termId = termId;
  if (departmentId) params.departmentId = departmentId;

  if (
    semesterNumber !== undefined &&
    semesterNumber !== null &&
    semesterNumber !== ""
  ) {
    params.semesterNumber = semesterNumber;
  }

  if (section && section !== "All Sections") {
    params.section = section;
  }

  const response = await api.get("/admin/assignments/context", {
    params,
  });

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
// GET ALL ACTIVE ASSIGNMENTS
// ============================================================

export const getAllAssignments = async ({
  termId,
  departmentId,
  teacherId,
  search,
} = {}) => {
  const params = {};

  if (termId) params.termId = termId;
  if (departmentId) params.departmentId = departmentId;
  if (teacherId) params.teacherId = teacherId;

  if (search && search.trim()) {
    params.search = search.trim();
  }

  const response = await api.get("/admin/assignments", {
    params,
  });

  return response?.data?.data ?? response?.data ?? [];
};

// ============================================================
// BULK ASSIGN STUDENTS FROM PDF
// ============================================================

export const bulkAssignStudentsFromPdf = async ({
  file,
  teacherId,
  termId,
  assignedBy,
}) => {
  const formData = new FormData();

  formData.append("studentListPdf", file);
  formData.append("teacherId", teacherId);
  formData.append("termId", termId);
  formData.append("assignedBy", assignedBy);

  const response = await api.post("/admin/assignments/bulk-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response?.data?.data ?? response?.data ?? null;
};

// ============================================================
// REMOVE ACTIVE MENTOR ASSIGNMENT
// DELETE /admin/assignments/:assignmentId
// ============================================================

export const removeMentorAssignment = async (assignmentId) => {
  if (!assignmentId) {
    throw new Error("Assignment ID is required.");
  }

  const response = await api.delete(
    `/admin/assignments/${encodeURIComponent(assignmentId)}`,
  );

  return response?.data?.data ?? response?.data ?? null;
};
