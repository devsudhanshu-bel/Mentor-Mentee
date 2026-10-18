/*
|--------------------------------------------------------------------------
| API BASE URL
|--------------------------------------------------------------------------
*/

const configuredUrl = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const API_BASE_URL = /\/api$/i.test(configuredUrl)
  ? configuredUrl
  : `${configuredUrl}/api`;

/*
|--------------------------------------------------------------------------
| AUTHENTICATION
|--------------------------------------------------------------------------
*/

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("access_token");

/*
|--------------------------------------------------------------------------
| SHARED DASHBOARD REQUEST
|--------------------------------------------------------------------------
*/

const dashboardRequest = async (endpoint) => {
  const token = getToken();

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
      "You do not have permission to access this resource."
    );
  }

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message ||
        `Dashboard request failed (${response.status})`
    );
  }

  // ApiResponse wraps the payload in its data property.
  return result?.data ?? result;
};

/*
|--------------------------------------------------------------------------
| MENTEE DASHBOARD
|--------------------------------------------------------------------------
*/

const dashboardApi = {
  async getOverview() {
    return dashboardRequest("/mentee/dashboard");
  },
};

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD OVERVIEW
|--------------------------------------------------------------------------
|
| Existing dashboard page.
| GET /api/admin/dashboard/overview
|--------------------------------------------------------------------------
*/

export const getAdminDashboardOverview = async () => {
  return dashboardRequest("/admin/dashboard/overview");
};

/*
|--------------------------------------------------------------------------
| ADMIN PROFILE OVERVIEW
|--------------------------------------------------------------------------
|
| Profile page statistics:
| - Active mentors
| - Active students
| - Meetings
| - Average attendance
|
| GET /api/admin/dashboard/profile-overview
|--------------------------------------------------------------------------
*/

export const getAdminProfileOverview = async () => {
  return dashboardRequest("/admin/dashboard/profile-overview");
};

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

export default dashboardApi;