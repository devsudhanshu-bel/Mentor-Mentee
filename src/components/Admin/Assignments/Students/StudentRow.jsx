import React from "react";
import { Trash2 } from "lucide-react";

const StudentRow = ({ student, selectedStudents = [], toggleStudent, onDeleteStudent }) => {
  const isSelected = selectedStudents.includes(student.id);

  // Backend field → UI value
  const name = student.fullName || student.name || "Unknown Student";

  const email = student.email || "No email";

  const registerNumber =
    student.registerNumber || student.usn || student.regNo || "N/A";

  // The active enrollment for the selected term is the authoritative
  // semester for assignment context. Older student rows may still have
  // a stale students.semester value (for example, 0).
  const enrollmentSemester = Array.isArray(student.student_enrollments)
    ? student.student_enrollments.find(
        (enrollment) => enrollment?.status === "ACTIVE",
      )?.semesterNumber
    : undefined;

  const semesterCandidates = [
    enrollmentSemester,
    student.semesterNumber,
    student.semester,
    student.year,
  ];

  const semester = semesterCandidates.find((value) => {
    if (value === null || value === undefined || value === "") return false;
    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue > 0;
  }) ?? "";

  const getYearLabel = (value) => {
    const semesterNumber = Number(value);

    if (value === "" || value === null || value === undefined) {
      return "N/A";
    }

    if (!Number.isFinite(semesterNumber) || semesterNumber <= 0) {
      return "N/A";
    }

    if (semesterNumber === 1 || semesterNumber === 2) {
      return "1st Year";
    }

    if (semesterNumber === 3 || semesterNumber === 4) {
      return "2nd Year";
    }

    if (semesterNumber === 5 || semesterNumber === 6) {
      return "3rd Year";
    }

    if (semesterNumber === 7 || semesterNumber === 8) {
      return "4th Year";
    }

    return `Semester ${semesterNumber}`;
  };

  const year = getYearLabel(semester);

  const status = student.status || "ACTIVE";

  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <tr
      onClick={() => toggleStudent(student.id)}
      className={`
        cursor-pointer
        border-b
        border-slate-100
        transition
        hover:bg-slate-50
        ${isSelected ? "bg-blue-50" : ""}
      `}
    >
      {/* ======================================================
          CHECKBOX
          ====================================================== */}

      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onClick={(event) => event.stopPropagation()}
          onChange={() => toggleStudent(student.id)}
          className="
            h-4
            w-4
            cursor-pointer
            accent-blue-600
          "
        />
      </td>

      {/* ======================================================
          STUDENT
          ====================================================== */}

      <td className="py-3">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-xs
              font-bold
              text-blue-700
            "
          >
            {initial}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-slate-800">
              {name}
            </p>

            <p className="truncate text-[11px] text-slate-500">{email}</p>
          </div>
        </div>
      </td>

      {/* ======================================================
          REGISTER NUMBER
          ====================================================== */}

      <td className="text-[12px] font-medium text-slate-600">
        {registerNumber}
      </td>

      {/* ======================================================
          YEAR
          ====================================================== */}

      <td className="text-[12px] text-slate-600">{year}</td>

      {/* ======================================================
          STATUS
          ====================================================== */}

      <td className="pr-4">
        <span
          className="
            rounded-md
            bg-amber-100
            px-2
            py-1
            text-[10px]
            font-semibold
            uppercase
            text-amber-700
          "
        >
          {status}
        </span>
      </td>

      {/* ADMIN DELETE ACTION */}

      <td className="px-4 text-right">
        <button
          type="button"
          title={`Delete ${name}`}
          aria-label={`Delete student ${name}`}
          onClick={(event) => {
            event.stopPropagation();
            onDeleteStudent?.(student);
          }}
          className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-600 transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
