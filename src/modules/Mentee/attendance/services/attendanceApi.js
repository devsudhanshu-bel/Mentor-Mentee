const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/*
|--------------------------------------------------------------------------
| SHARED RESPONSE HANDLER
|--------------------------------------------------------------------------
*/

const handleResponse = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| GET SEMESTER ATTENDANCE
| GET /api/mentee/attendance/semester/:semester
|--------------------------------------------------------------------------
*/

export const getSemesterAttendance = async (semester) => {
  const response = await fetch(
    `${API_BASE_URL}/api/mentee/attendance/semester/${semester}`,
  );

  return handleResponse(response, "Failed to fetch attendance.");
};

/*
|--------------------------------------------------------------------------
| SAVE SEMESTER ATTENDANCE
| POST /api/mentee/attendance/semester/:semester
|--------------------------------------------------------------------------
*/

export const saveSemesterAttendance = async (semester, subjects) => {
  const response = await fetch(
    `${API_BASE_URL}/api/mentee/attendance/semester/${semester}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subjects }),
    },
  );

  return handleResponse(response, "Failed to save attendance.");
};

/*
|--------------------------------------------------------------------------
| CLEAR SUBJECTS FOR SELECTED SEMESTER
| DELETE /api/mentee/attendance/semester/:semester/subjects
|--------------------------------------------------------------------------
*/

export const clearSemesterSubjects = async (semester) => {
  const response = await fetch(
    `${API_BASE_URL}/api/mentee/attendance/semester/${semester}/subjects`,
    {
      method: "DELETE",
    },
  );

  return handleResponse(response, "Failed to clear semester subjects.");
};
