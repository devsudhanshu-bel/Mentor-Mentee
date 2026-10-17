import api from "../api/axios";

const mentorOverviewService = {
  getStudentOverview: async (studentId) => {
    if (!studentId) {
      throw new Error("Student ID is required to load the overview.");
    }

    const response = await api.get(
      `/mentor/students/${encodeURIComponent(studentId)}/overview`,
    );

    return response.data.data;
  },
};

export default mentorOverviewService;