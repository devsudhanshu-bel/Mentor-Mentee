import api from "./axios";

const unwrap = (response) => response?.data?.data ?? response?.data ?? {};

export const getStudentProjects = async (studentId) => {
  const response = await api.get(`/mentor/projects/students/${encodeURIComponent(studentId)}`);
  const result = unwrap(response);
  return Array.isArray(result) ? result : result.projects || [];
};

export const assignStudentProject = async (studentId, payload) => {
  const response = await api.post(`/mentor/projects/students/${encodeURIComponent(studentId)}`, payload);
  return unwrap(response);
};

export const updateStudentProjectStatus = async (projectId, status) => {
  const response = await api.patch(`/mentor/projects/${encodeURIComponent(projectId)}/status`, { status });
  return unwrap(response);
};

export const getProjectMessages = async (projectId) => {
  const response = await api.get(`/mentor/projects/${encodeURIComponent(projectId)}/messages`);
  const result = unwrap(response);
  return Array.isArray(result) ? result : result.messages || [];
};

export const sendProjectMessage = async (projectId, message) => {
  const response = await api.post(`/mentor/projects/${encodeURIComponent(projectId)}/messages`, { message });
  return unwrap(response);
};
