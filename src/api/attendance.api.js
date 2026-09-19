import api from "./axios";

/*
|--------------------------------------------------------------------------
| GET SEMESTER ATTENDANCE
|--------------------------------------------------------------------------
|
| Axios automatically attaches:
|
| Authorization: Bearer <accessToken>
|
| through src/api/axios.js
|
|--------------------------------------------------------------------------
*/

export const getSemesterAttendance = async (semester) => {
  const response = await api.get(`/mentee/attendance/semester/${semester}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| SAVE SEMESTER ATTENDANCE
|--------------------------------------------------------------------------
*/

export const saveSemesterAttendance = async (semester, subjects) => {
  const response = await api.post(`/mentee/attendance/semester/${semester}`, {
    subjects,
  });

  return response.data;
};
