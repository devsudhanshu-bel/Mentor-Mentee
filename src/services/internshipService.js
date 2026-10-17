
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const BASE_PATH = `${API_BASE_URL}/mentee/internships`;

const getToken = () => {
  // Match the key used by your existing login implementation.
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("access_token")
  );
};

async function request(path = "", options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_PATH}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        (typeof result === "string" && result) ||
        `Request failed (${response.status})`
    );
  }

  return result;
}

export const internshipService = {
  getMine: () => request("/mine"),

  getById: (id) => request(`/${encodeURIComponent(id)}`),

  create: (payload) =>
    request("", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  uploadDocument: (internshipId, file, documentType) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("documentType", documentType);

    return request(`/${encodeURIComponent(internshipId)}/documents`, {
      method: "POST",
      body: formData,
    });
  },

  deleteDocument: (internshipId, documentId) =>
    request(
      `/${encodeURIComponent(internshipId)}/documents/${encodeURIComponent(documentId)}`,
      { method: "DELETE" }
    ),

  requestCompletion: (internshipId) =>
    request(`/${encodeURIComponent(internshipId)}/completion`, {
      method: "POST",
    }),
};

export default internshipService;
