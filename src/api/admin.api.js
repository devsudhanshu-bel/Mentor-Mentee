import api from "./axios";

const unwrapResponse = (response) => response?.data?.data ?? response?.data ?? {};

// Institution-wide student directory with each student's active mentor.
export const getAdminStudentDirectory = async ({
  search = "",
  semester = "",
  sort = "name-asc",
  mentorId = "",
} = {}) => {
  const params = {};
  if (search.trim()) params.search = search.trim();
  if (semester) params.semester = semester;
  if (sort) params.sort = sort;
  if (mentorId) params.mentorId = mentorId;

  const response = await api.get("/admin/students/directory", { params });
  return unwrapResponse(response);
};

// Fetch the complete mentor list, including mentors with no current mentees.
export const getAdminMentors = async () => {
  const response = await api.get("/admin/mentors");
  const result = unwrapResponse(response);

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.mentors)) return result.mentors;
  if (Array.isArray(result?.data)) return result.data;
  return [];
};
