const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const BASE_PATH = `${API_BASE_URL}/mentor/students`;

// =========================================================
// AUTHENTICATION
// =========================================================

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("access_token");

// =========================================================
// HELPERS
// =========================================================

const encodeId = (id) => {
  if (
    id === undefined ||
    id === null ||
    String(id).trim() === ""
  ) {
    throw new Error("A valid student ID is required.");
  }

  return encodeURIComponent(String(id));
};

const getErrorMessage = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return (
        data?.message ||
        data?.error ||
        `Request failed (${response.status})`
      );
    }

    const text = await response.text();

    if (text.trim()) {
      try {
        const data = JSON.parse(text);
        return (
          data?.message ||
          data?.error ||
          `Request failed (${response.status})`
        );
      } catch {
        return text;
      }
    }
  } catch {
    // Use the fallback below if the response cannot be parsed.
  }

  return `Request failed (${response.status})`;
};

const handleUnauthorized = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("userRole");
  localStorage.removeItem("isAuthenticated");

  window.location.href = "/";
};

// =========================================================
// REPORT SERVICE
// =========================================================

const studentReportService = {
  /**
   * Downloads the complete PDF report for a student.
   *
   * Expected backend endpoint:
   * GET /api/mentor/students/:studentId/report
   *
   * The backend must verify the authenticated mentor's
   * active assignment before generating the report.
   */
  downloadStudentReport: async ({
    studentId,
    studentName = "Student",
    registerNumber = "",
  }) => {
    const encodedStudentId = encodeId(studentId);
    const token = getToken();

    const headers = {
      Accept: "application/pdf, application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let response;

    try {
      response = await fetch(
        `${BASE_PATH}/${encodedStudentId}/report`,
        {
          method: "GET",
          headers,
          credentials: "include",
        }
      );
    } catch {
      throw new Error(
        "Unable to connect to the server. Check your connection and try again."
      );
    }

    if (response.status === 401) {
      handleUnauthorized();

      throw new Error(
        "Your session has expired. Please log in again."
      );
    }

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    const contentType = response.headers.get("content-type") || "";

    if (
      !contentType.includes("application/pdf") &&
      !contentType.includes("application/octet-stream")
    ) {
      throw new Error(
        "The server did not return a PDF. Please check the report API."
      );
    }

    const blob = await response.blob();

    if (!blob.size) {
      throw new Error("The generated PDF is empty.");
    }

    const safeName = (value) =>
      String(value || "")
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .replace(/\s+/g, "_");

    const fallbackFilename = [
      safeName(studentName) || "Student",
      safeName(registerNumber),
      "Report",
      new Date().toISOString().slice(0, 10),
    ]
      .filter(Boolean)
      .join("_") + ".pdf";

    const disposition =
      response.headers.get("content-disposition") || "";

    const filenameMatch =
      disposition.match(/filename\*=UTF-8''([^;]+)/i) ||
      disposition.match(/filename="?([^";]+)"?/i);

    let filename = fallbackFilename;

    if (filenameMatch?.[1]) {
      try {
        filename = decodeURIComponent(filenameMatch[1].trim());
      } catch {
        filename = filenameMatch[1].trim();
      }
    }

    if (!filename.toLowerCase().endsWith(".pdf")) {
      filename += ".pdf";
    }

    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Revoke after the browser has had time to start the download.
    window.setTimeout(() => {
      window.URL.revokeObjectURL(objectUrl);
    }, 1000);

    return {
      success: true,
      filename,
    };
  },
};

export default studentReportService;