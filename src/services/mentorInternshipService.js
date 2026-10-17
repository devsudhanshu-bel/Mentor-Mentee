
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const BASE_PATH = `${API_BASE_URL}/mentor/internships`;

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("access_token");

async function request(path, options = {}) {
  const token = getToken();

  const response = await fetch(`${BASE_PATH}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body
        ? { "Content-Type": "application/json" }
        : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
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

const mentorInternshipService = {
  getInitialQueue: () => request("/initial"),

  getCompletionQueue: () => request("/completion"),

  getDetails: (id) => request(`/${encodeURIComponent(id)}`),

  getReviewHistory: (id) =>
    request(`/${encodeURIComponent(id)}/reviews`),

  reviewInitial: (id, payload) =>
    request(`/${encodeURIComponent(id)}/initial-review`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  reviewCompletion: (id, payload) =>
    request(`/${encodeURIComponent(id)}/completion-review`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
};

export default mentorInternshipService;
