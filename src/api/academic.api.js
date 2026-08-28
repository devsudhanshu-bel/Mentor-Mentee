import api from "./axios";

export const getAcademicOverview = async () => {
  const response = await api.get("/mentee/academics");
  return response.data;
};

export const getSemesterAcademicData = async (semesterNumber) => {
  const response = await api.get(
    `/mentee/academics/semester/${semesterNumber}`,
  );
  return response.data;
};

export const createAcademicSemester = async (data) => {
  const response = await api.post("/mentee/academics/semester", data);
  return response.data;
};
