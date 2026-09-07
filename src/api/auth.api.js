import api from "./axios";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token, user } = response.data.data;

  localStorage.setItem("accessToken", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("userRole", user.role);
  localStorage.setItem("isAuthenticated", "true");

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("userRole");
  localStorage.removeItem("isAuthenticated");
};
