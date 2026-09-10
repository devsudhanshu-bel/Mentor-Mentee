import api from "./axios";

// ==========================================================
// GET MENTORS
// ==========================================================

export const getMentors = async ({
  search = "",
  departmentId = "",
  status = "",
  workload = "",
} = {}) => {
  const params = {};

  if (search.trim()) {
    params.search = search.trim();
  }

  if (departmentId) {
    params.departmentId = departmentId;
  }

  if (status) {
    params.status = status;
  }

  if (workload) {
    params.workload = workload;
  }

  const response = await api.get("/admin/mentors", {
    params,
  });

  return response?.data?.data ?? response?.data ?? {};
};
