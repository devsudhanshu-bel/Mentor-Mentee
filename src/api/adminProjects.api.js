import api from "./axios";

export const getAdminProjectStudents = () =>
  api.get("/admin/projects/students").then((response) => response.data);

export const getAdminProjectDetails = (projectId) =>
  api.get(`/admin/projects/${encodeURIComponent(projectId)}`).then((response) => response.data);
