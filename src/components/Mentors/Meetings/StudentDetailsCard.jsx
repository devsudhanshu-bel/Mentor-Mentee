
import React from "react";
import {
  User,
  GraduationCap,
  Mail,
  Building2,
  UserRound,
  Hash,
} from "lucide-react";

/* =========================================================
   HELPERS
========================================================= */

const isAvailable = (value) =>
  value !== null &&
  value !== undefined &&
  String(value).trim() !== "";

const getDisplayValue = (value) => {
  if (!isAvailable(value)) {
    return "Not available";
  }

  if (typeof value === "object") {
    return (
      value.name ??
      value.fullName ??
      value.semesterNumber ??
      "Not available"
    );
  }

  return String(value);
};

const formatSemester = (value) => {
  if (!isAvailable(value)) return null;

  const semesterNumber = Number(value);

  if (
    Number.isInteger(semesterNumber) &&
    semesterNumber > 0
  ) {
    return `Semester ${semesterNumber}`;
  }

  return String(value);
};

/* =========================================================
   DETAIL ROW
========================================================= */

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2.5 border-b border-slate-100 py-2.5 last:border-0">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
      <Icon size={16} className="text-blue-600" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className="mt-0.5 break-words text-[13px] font-semibold text-slate-700"
        title={value}
      >
        {value}
      </p>
    </div>
  </div>
);

/* =========================================================
   STUDENT DETAILS CARD
========================================================= */

const StudentDetailsCard = ({ student, meeting }) => {
  /*
   * Supports both the student object and meeting response.
   *
   * Backend meeting response:
   *   meeting.students
   *   meeting.teachers
   */

  const studentData = student ?? meeting?.students ?? {};
  const meetingMentor = meeting?.teachers;

  /* -------------------------------------------------------
     STUDENT NAME
  ------------------------------------------------------- */

  const studentName = getDisplayValue(
    studentData.fullName ??
      studentData.name
  );

  /* -------------------------------------------------------
     REGISTRATION NUMBER
  ------------------------------------------------------- */

  const registrationNumber = getDisplayValue(
    studentData.registerNumber ??
      studentData.registrationNumber ??
      studentData.register_number
  );

  /* -------------------------------------------------------
     DEPARTMENT
  ------------------------------------------------------- */

  const departmentName =
    studentData.departments?.name ??
    studentData.department?.name ??
    studentData.departmentName ??
    (typeof studentData.department === "string"
      ? studentData.department
      : null);

  const departmentCode =
    studentData.departments?.code ??
    studentData.department?.code;

  const department = getDisplayValue(
    departmentName
      ? departmentCode
        ? `${departmentName} (${departmentCode})`
        : departmentName
      : departmentCode
  );

  /* -------------------------------------------------------
     SEMESTER
  ------------------------------------------------------- */

  const academicSemesters = Array.isArray(
    studentData.academicSemesters
  )
    ? studentData.academicSemesters
    : [];

  const currentAcademicSemester =
    academicSemesters.find(
      (item) =>
        String(item?.status ?? "").toUpperCase() ===
        "CURRENT"
    ) ?? academicSemesters[0];

  const assignmentList = Array.isArray(
    studentData.mentor_assignments
  )
    ? studentData.mentor_assignments
    : [];

  const activeAssignment =
    assignmentList.find(
      (assignment) =>
        String(assignment?.status ?? "").toUpperCase() ===
        "ACTIVE"
    ) ?? assignmentList[0];

  const assignmentSemester =
    activeAssignment?.academic_terms?.semesterNumber;

  const semesterValue =
    studentData.semester ??
    assignmentSemester ??
    currentAcademicSemester?.semesterNumber;

  const semester = getDisplayValue(
    formatSemester(semesterValue)
  );

  /* -------------------------------------------------------
     EMAIL
  ------------------------------------------------------- */

  const email = getDisplayValue(studentData.email);

  /* -------------------------------------------------------
     ASSIGNED MENTOR
  ------------------------------------------------------- */

  const assignedTeacher =
    activeAssignment?.teachers ??
    activeAssignment?.teacher;

  const mentorName =
    meetingMentor?.fullName ??
    meetingMentor?.name ??
    assignedTeacher?.fullName ??
    assignedTeacher?.name ??
    studentData.mentor?.fullName ??
    studentData.mentor?.name ??
    studentData.mentorName ??
    studentData.assignedMentor;

  const mentor = getDisplayValue(mentorName);

  /* -------------------------------------------------------
     AVATAR INITIALS
  ------------------------------------------------------- */

  const initials =
    studentName !== "Not available"
      ? studentName
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part.charAt(0).toUpperCase())
          .join("")
      : "?";

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-800">
          Student Details
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Basic information about the mentee.
        </p>
      </div>

      {/* Avatar and Student Identity */}
      <div className="flex flex-col items-center px-5 py-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow">
          {initials === "?" ? (
            <User size={34} />
          ) : (
            <span
              aria-label={`Initials for ${studentName}`}
              className="text-2xl font-bold"
            >
              {initials}
            </span>
          )}
        </div>

        <h3 className="mt-3 break-words text-center text-lg font-bold text-slate-800">
          {studentName}
        </h3>

        <p className="break-all text-center text-[13px] text-slate-500">
          {registrationNumber}
        </p>
      </div>

      {/* Student Information */}
      <div className="px-5 pb-5">
        <DetailRow
          icon={Hash}
          label="Registration Number"
          value={registrationNumber}
        />

        <DetailRow
          icon={GraduationCap}
          label="Department"
          value={department}
        />

        <DetailRow
          icon={Building2}
          label="Semester"
          value={semester}
        />

        <DetailRow
          icon={Mail}
          label="Email"
          value={email}
        />

        <DetailRow
          icon={UserRound}
          label="Assigned Mentor"
          value={mentor}
        />
      </div>
    </div>
  );
};

export default StudentDetailsCard;
