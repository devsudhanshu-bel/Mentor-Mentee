import api from "./axios";

// ==========================================================
// LOGIN
// ==========================================================

export const login = async (identifier, password) => {
  const response = await api.post("/auth/login", {
    identifier,
    password,
  });

  const { token, user } = response.data.data;

  // ========================================================
  // STORE AUTHENTICATION
  // ========================================================

  localStorage.setItem("accessToken", token);

  localStorage.setItem("user", JSON.stringify(user));

  localStorage.setItem("userRole", user.role);

  localStorage.setItem("isAuthenticated", "true");

  return response.data;
};

// ==========================================================
// CHANGE PASSWORD
// ==========================================================

export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });

  // ========================================================
  // UPDATE STORED USER
  // ========================================================
  //
  // The backend has now completed the first-login
  // password requirement.
  //
  // ========================================================

  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);

      const updatedUser = {
        ...user,
        mustChangePassword: false,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {
      // Ignore malformed local storage.
    }
  }

  return response.data;
};

// ==========================================================
// LOGOUT
// ==========================================================

export const logout = () => {
  localStorage.removeItem("accessToken");

  localStorage.removeItem("user");

  localStorage.removeItem("userRole");

  localStorage.removeItem("isAuthenticated");
};
