import api from "./axios";

/*
|--------------------------------------------------------------------------
| GET SEMESTER ATTENDANCE
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

/*
|--------------------------------------------------------------------------
| IMPORT ATTENDANCE FROM STUDENT PDF
|--------------------------------------------------------------------------
*/

export const importAttendancePdf = async (semester, file) => {
  const formData = new FormData();
  formData.append("attendancePdf", file);

  const response = await api.post(
    `/mentee/attendance/import-pdf/${semester}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| CLEAR SUBJECTS FOR SELECTED SEMESTER
| DELETE /mentee/attendance/semester/:semester/subjects
|--------------------------------------------------------------------------
*/

export const clearSemesterSubjects = async (semester) => {
  const response = await api.delete(
    `/mentee/attendance/semester/${semester}/subjects`,
  );

  return response.data;
};
