import api from "./axios";

// ==========================================================
// STUDENT API
// ==========================================================

// ==========================================================
// IMPORT STUDENTS FROM PDF
// ==========================================================
//
// POST /api/admin/students/import
//
// Multipart:
//
// file
// departmentId
// termId
//
// ==========================================================

export const importStudentsFromPdf = async ({ file, departmentId, termId }) => {
  // ========================================================
  // VALIDATION
  // ========================================================

  if (!file) {
    throw new Error("Student PDF file is required.");
  }

  if (!departmentId) {
    throw new Error("Department is required.");
  }

  if (!termId) {
    throw new Error("Academic term is required.");
  }

  // ========================================================
  // FORM DATA
  // ========================================================

  const formData = new FormData();

  formData.append("file", file);

  formData.append("departmentId", departmentId);

  formData.append("termId", termId);

  // ========================================================
  // REQUEST
  // ========================================================

  const response = await api.post("/admin/students/import", formData);

  // ========================================================
  // RESPONSE
  // ========================================================

  return response.data;
};


// ==========================================================
// DELETE A STUDENT RECORD (ADMIN ONLY ON THE BACKEND)
// ==========================================================
export const deleteStudent = async (studentId) => {
  if (!studentId) throw new Error("Student ID is required.");
  const response = await api.delete(`/admin/students/${encodeURIComponent(studentId)}`);
  return response.data;
};
