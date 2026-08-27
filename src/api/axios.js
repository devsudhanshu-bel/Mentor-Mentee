import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ==========================================================
// REQUEST INTERCEPTOR
// ==========================================================
//
// JWT is attached automatically.
//
// We intentionally DO NOT set a global Content-Type here.
//
// Axios will automatically use:
// - application/json for normal JSON requests
// - multipart/form-data with the correct boundary for FormData
//
// ==========================================================

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    // ======================================================
    // FORM DATA HANDLING
    // ======================================================
    //
    // When the request body is FormData, allow Axios/browser
    // to automatically set the Content-Type and boundary.
    //
    // This is critical for Multer to receive req.file.
    //
    // ======================================================

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================================
// RESPONSE INTERCEPTOR
// ==========================================================
//
// Handle expired/invalid JWT.
//
// ==========================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "userRole"
      );

      localStorage.removeItem(
        "isAuthenticated"
      );

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;