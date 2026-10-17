
const configuredUrl = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const API_BASE_URL = /\/api$/i.test(configuredUrl)
  ? configuredUrl
  : `${configuredUrl}/api`;

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("access_token");

const dashboardApi = {
  async getOverview() {
    const token = getToken();

    let response;

    try {
      response = await fetch(`${API_BASE_URL}/mentee/dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch {
      throw new Error(
        "Unable to connect to the server. Please check your connection."
      );
    }

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (response.status === 401) {
      throw new Error("Your session has expired. Please log in again.");
    }

    if (!response.ok || result?.success === false) {
      throw new Error(
        result?.message || `Dashboard request failed (${response.status})`
      );
    }

    // ApiResponse commonly wraps the actual payload in `data`.
    return result?.data ?? result;
  },
};

// Admin dashboard — added without changing the existing student API.
export const getAdminDashboardOverview = async () => {
  const token = getToken();

  let response;

  try {
    response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your connection."
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again.");
  }

  if (response.status === 403) {
    throw new Error(
      "You do not have permission to access this dashboard."
    );
  }

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message || `Dashboard request failed (${response.status})`
    );
  }

  return result?.data ?? result;
};

export default dashboardApi;
