const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const BASE_PATH = `${API_BASE_URL}/mentee/meetings`;

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("access_token");

async function request(path, options = {}) {
  const token = getToken();

  const headers = {
    Accept: "application/json",
    ...(options.body !== undefined
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;

  try {
    response = await fetch(`${BASE_PATH}${path}`, {
      ...options,
      credentials: "include",
      headers,
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Check your connection and try again."
    );
  }

  let result = null;

  if (response.status !== 204) {
    const contentType = response.headers.get("content-type") || "";

    try {
      result = contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    } catch {
      result = null;
    }
  }

  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");

    window.location.href = "/";
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        (typeof result === "string" && result.trim()) ||
        `Request failed (${response.status})`
    );
  }

  return result;
}

const encodeId = (id) => {
  if (id === undefined || id === null || String(id).trim() === "") {
    throw new Error("A valid meeting ID is required.");
  }

  return encodeURIComponent(String(id));
};

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          query.append(key, String(item));
        }
      });

      return;
    }

    query.append(key, String(value));
  });

  return query.toString();
};

const unwrap = (response) =>
  response?.data?.data ?? response?.data ?? response ?? {};

const menteeMeetingsService = {
  getMeetings: async (params = {}) => {
    const query = buildQuery(params);
    const response = await request(query ? `/?${query}` : "/");
    return unwrap(response);
  },

  getMeeting: async (meetingId) => {
    const response = await request(`/${encodeId(meetingId)}`);
    return unwrap(response);
  },
};

export default menteeMeetingsService;