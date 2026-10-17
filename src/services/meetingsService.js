
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const BASE_PATH = `${API_BASE_URL}/mentor/meetings`;

// =========================================================
// AUTHENTICATION
// =========================================================

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("access_token");

// =========================================================
// SHARED REQUEST HELPER
// =========================================================

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

    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error ||
      (typeof result === "string" && result.trim()) ||
      `Request failed (${response.status})`;

    throw new Error(message);
  }

  return result;
}

// =========================================================
// URL HELPERS
// =========================================================

const encodeId = (id) => {
  if (
    id === undefined ||
    id === null ||
    String(id).trim() === ""
  ) {
    throw new Error("A valid meeting or record ID is required.");
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

// =========================================================
// MEETINGS SERVICE
// =========================================================

const meetingsService = {
  // -------------------------------------------------------
  // MEETING LIST AND DETAILS
  // -------------------------------------------------------

  getMeetings: (params = {}) => {
    const query = buildQuery(params);
    return request(query ? `/?${query}` : "/");
  },

  getAssignedStudents: () => request("/students"),

  getMeeting: (meetingId) =>
    request(`/${encodeId(meetingId)}`),

  // -------------------------------------------------------
  // CREATE AND UPDATE MEETINGS
  // -------------------------------------------------------

  createMeeting: (meetingData) => {
    if (
      !meetingData ||
      typeof meetingData !== "object" ||
      Array.isArray(meetingData)
    ) {
      throw new Error("Meeting details are required.");
    }

    return request("/", {
      method: "POST",
      body: JSON.stringify(meetingData),
    });
  },

  updateMeeting: (meetingId, meetingData) => {
    if (
      !meetingData ||
      typeof meetingData !== "object" ||
      Array.isArray(meetingData)
    ) {
      throw new Error("Updated meeting details are required.");
    }

    return request(`/${encodeId(meetingId)}`, {
      method: "PATCH",
      body: JSON.stringify(meetingData),
    });
  },

  // -------------------------------------------------------
  // MEETING LIFECYCLE
  // -------------------------------------------------------

  startMeeting: (meetingId) =>
    request(`/${encodeId(meetingId)}/start`, {
      method: "PATCH",
    }),

  completeMeeting: (meetingId) =>
    request(`/${encodeId(meetingId)}/complete`, {
      method: "PATCH",
    }),

  cancelMeeting: (meetingId, reason) =>
    request(`/${encodeId(meetingId)}/cancel`, {
      method: "PATCH",
      body: JSON.stringify(
        reason?.trim() ? { reason: reason.trim() } : {}
      ),
    }),

  markNoShow: (meetingId) =>
    request(`/${encodeId(meetingId)}/no-show`, {
      method: "PATCH",
    }),

  // -------------------------------------------------------
  // MEETING NOTES
  // -------------------------------------------------------

  saveNotes: (meetingId, content) => {
    if (typeof content !== "string") {
      throw new Error("Notes content must be a string.");
    }

    return request(`/${encodeId(meetingId)}/notes`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    });
  },

  // -------------------------------------------------------
  // DISCUSSION POINTS
  // -------------------------------------------------------

  addDiscussionPoint: (meetingId, content) => {
    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Discussion point content is required.");
    }

    return request(
      `/${encodeId(meetingId)}/discussion-points`,
      {
        method: "POST",
        body: JSON.stringify({
          content: content.trim(),
        }),
      }
    );
  },

  updateDiscussionPoint: (meetingId, pointId, content) => {
    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Discussion point content is required.");
    }

    return request(
      `/${encodeId(meetingId)}/discussion-points/${encodeId(pointId)}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          content: content.trim(),
        }),
      }
    );
  },

  deleteDiscussionPoint: (meetingId, pointId) =>
    request(
      `/${encodeId(meetingId)}/discussion-points/${encodeId(pointId)}`,
      {
        method: "DELETE",
      }
    ),

  // -------------------------------------------------------
  // MENTOR FEEDBACK
  // Saves feedback through the backend API.
  // -------------------------------------------------------

  saveFeedback: (meetingId, feedbackData) => {
    if (
      !feedbackData ||
      typeof feedbackData !== "object" ||
      Array.isArray(feedbackData)
    ) {
      throw new Error("Feedback details are required.");
    }

    const rating = Number(feedbackData.rating);

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      throw new Error(
        "Feedback rating must be between 1 and 5."
      );
    }

    const remarks = String(
      feedbackData.feedback ??
        feedbackData.comments ??
        feedbackData.remarks ??
        ""
    ).trim();

    return request(`/${encodeId(meetingId)}/feedback`, {
      method: "PUT",
      body: JSON.stringify({
        rating,
        feedback: remarks,
        comments: remarks,
      }),
    });
  },

  // -------------------------------------------------------
  // FOLLOW-UP MEETINGS
  // -------------------------------------------------------

  scheduleFollowUp: (meetingId, meetingData) => {
    if (
      !meetingData ||
      typeof meetingData !== "object" ||
      Array.isArray(meetingData)
    ) {
      throw new Error("Follow-up meeting details are required.");
    }

    return request(
      `/${encodeId(meetingId)}/follow-ups`,
      {
        method: "POST",
        body: JSON.stringify(meetingData),
      }
    );
  },

  // -------------------------------------------------------
  // RECURRING MEETINGS
  // -------------------------------------------------------

  getRecurringSeries: () =>
    request("/recurring"),

  createRecurringSeries: (seriesData) => {
    if (
      !seriesData ||
      typeof seriesData !== "object" ||
      Array.isArray(seriesData)
    ) {
      throw new Error("Recurring meeting details are required.");
    }

    return request("/recurring", {
      method: "POST",
      body: JSON.stringify(seriesData),
    });
  },

  cancelRecurringSeries: (seriesId) =>
    request(
      `/recurring/${encodeId(seriesId)}/cancel`,
      {
        method: "PATCH",
      }
    ),
};

export default meetingsService;
