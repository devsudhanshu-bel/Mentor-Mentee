const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

const BASE_PATH = `${API_BASE_URL}/mentee/meetings`;

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("access_token");

async function request(path) {
  const token = getToken();

  let response;

  try {
    response = await fetch(`${BASE_PATH}${path}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Check your connection and try again."
    );
  }

  const contentType =
    response.headers.get("content-type") || "";

  let result = null;

  try {
    if (response.status !== 204) {
      result = contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    }
  } catch {
    result = null;
  }

  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");

    window.location.href = "/";

    throw new Error(
      "Your session has expired. Please log in again."
    );
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
  if (
    id === undefined ||
    id === null ||
    String(id).trim() === ""
  ) {
    throw new Error("A valid meeting ID is required.");
  }

  return encodeURIComponent(String(id));
};

const menteeMeetingsService = {
  getMeetings: (params = {}) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined && item !== null) {
            query.append(key, String(item));
          }
        });
      } else {
        query.append(key, String(value));
      }
    });

    const search = query.toString();

    return request(search ? `/?${search}` : "/");
  },

  getMeeting: (meetingId) =>
    request(`/${encodeId(meetingId)}`),
};

export default menteeMeetingsService;