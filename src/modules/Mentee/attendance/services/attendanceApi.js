const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/*
|--------------------------------------------------------------------------
| GET SEMESTER ATTENDANCE
|--------------------------------------------------------------------------
*/

export const getSemesterAttendance = async (semester) => {
  const response = await fetch(
    `${API_BASE_URL}/api/attendance/semester/${semester}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch attendance.");
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| SAVE SEMESTER ATTENDANCE
|--------------------------------------------------------------------------
*/

export const saveSemesterAttendance = async (semester, subjects) => {
  const response = await fetch(
    `${API_BASE_URL}/api/attendance/semester/${semester}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        subjects,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save attendance.");
  }

  return data;
};
