import api from "./axios";

export const getMentorProfile = async () => {
  const response = await api.get("/mentor/profile");
  return response.data.data;
};

export const updateMentorProfile = async (data) => {
  const response = await api.put("/mentor/profile", data);

  return response.data;
};