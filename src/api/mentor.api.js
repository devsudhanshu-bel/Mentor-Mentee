import api from "./axios";

// ==========================================================
// RESPONSE HELPERS
// ==========================================================

const unwrapResponse = (response) =>
  response?.data?.data ?? response?.data ?? {};

// ==========================================================
// GET MENTORS (ADMIN)
// GET /api/admin/mentors
// ==========================================================

export const getMentors = async ({
  search = "",
  departmentId = "",
  status = "",
  workload = "",
} = {}) => {
  const params = {};

  if (search.trim()) params.search = search.trim();
  if (departmentId) params.departmentId = departmentId;
  if (status) params.status = status;
  if (workload) params.workload = workload;

  const response = await api.get("/admin/mentors", { params });

  return unwrapResponse(response);
};

// ==========================================================
// GET MENTOR DETAILS (ADMIN)
// GET /api/admin/mentors/:mentorId
// ==========================================================

export const getMentorDetails = async (mentorId) => {
  if (!mentorId) {
    throw new Error("Mentor ID is required.");
  }

  const response = await api.get(`/admin/mentors/${mentorId}`);

  return unwrapResponse(response);
};

// ==========================================================
// GET MEETINGS FOR A SELECTED MENTOR (ADMIN)
// GET /api/admin/mentors/:mentorId/meetings
// ==========================================================

export const getMentorMeetings = async (mentorId) => {
  if (!mentorId) {
    throw new Error("Mentor ID is required.");
  }

  const response = await api.get(
    `/admin/mentors/${mentorId}/meetings`
  );

  const result = unwrapResponse(response);

  // Support either an array response or { meetings: [...] }.
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.meetings)) {
    return result.meetings;
  }

  return [];
};

// ==========================================================
// GET STUDENTS ASSIGNED TO A SPECIFIC MENTOR (ADMIN)
// GET /api/admin/mentors/:mentorId/students
// ==========================================================

export const getMentorAssignedStudents = async (mentorId) => {
  if (!mentorId) {
    throw new Error("Mentor ID is required.");
  }

  const response = await api.get(
    `/admin/mentors/${mentorId}/students`
  );

  const result = unwrapResponse(response);

  // Support either an array response or { students: [...] }.
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.students)) {
    return result.students;
  }

  return [];
};

// ==========================================================
// GET MY ASSIGNED MENTOR (STUDENT)
// GET /api/mentee/mentor
// ==========================================================

export const getMyMentor = async () => {
  const response = await api.get("/mentee/mentor");

  return unwrapResponse(response);
};