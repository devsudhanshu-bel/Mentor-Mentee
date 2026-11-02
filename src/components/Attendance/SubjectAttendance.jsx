
import React from "react";
import { FileText, Pencil, Trash2 } from "lucide-react";

import generateAttendanceReport from "../../utils/generateAttendanceReport";

/* ==========================================================
   ATTENDANCE BADGE COLOR
========================================================== */

const badgeColor = (value) => {
  if (value >= 95) {
    return "bg-green-100 text-green-700";
  }

  if (value >= 90) {
    return "bg-emerald-100 text-emerald-700";
  }

  if (value >= 75) {
    return "bg-yellow-100 text-orange-700";
  }

  return "bg-red-100 text-red-700";
};

/* ==========================================================
   SUBJECT ATTENDANCE
========================================================== */

const SubjectAttendance = ({
  attendanceData,
  onEdit,
  onClear,
  clearing = false,
}) => {
  const subjects = attendanceData?.subjects || [];

  /* ========================================================
     EDIT
  ======================================================== */

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  /* ========================================================
     CLEAR SUBJECTS
  ======================================================== */

  const handleClear = () => {
    if (clearing || typeof onClear !== "function") {
      return;
    }

    onClear();
  };

  /* ========================================================
     PDF REPORT
  ======================================================== */

  const handleDetailedReport = () => {
    if (!attendanceData) {
      return;
    }

    generateAttendanceReport(attendanceData);
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="
        w-full
        min-w-0
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        p-3
        sm:p-4
      "
    >
      {/* HEADING */}

      <h3
        className="
          text-[14px]
          font-semibold
          text-blue-600
          mb-3
        "
      >
        Subject-wise Attendance
      </h3>

      {/* EMPTY STATE */}

      {subjects.length === 0 ? (
        <div
          className="
            min-h-[160px]
            sm:h-[180px]
            flex
            items-center
            justify-center
            border
            border-slate-200
            rounded-lg
            text-[11px]
            sm:text-[12px]
            text-slate-400
            text-center
            px-4
          "
        >
          No attendance entered for this semester yet.
        </div>
      ) : (
        <>
          {/* TABLE */}

          <div
            className="
              w-full
              overflow-x-auto
              overscroll-x-contain
              rounded-lg
              border
              border-slate-200
            "
          >
            <table
              className="
                w-full
                min-w-[650px]
                border-collapse
              "
            >
              <thead className="bg-slate-50">
                <tr className="text-[11px] text-slate-600">
                  <th className="py-2 px-2 text-center w-10">
                    #
                  </th>

                  <th className="py-2 px-3 text-left min-w-[180px]">
                    Subject Name
                  </th>

                  <th className="py-2 px-3 text-center min-w-[110px]">
                    Classes Held
                  </th>

                  <th className="py-2 px-3 text-center min-w-[130px]">
                    Classes Attended
                  </th>

                  <th className="py-2 px-3 text-center min-w-[110px]">
                    Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject, index) => {
                  const held = Number(subject.classesHeld || 0);

                  const storedAttendance = Number(subject.storedAttendance);

                  const hasClassData = held > 0;

                  const percentage = hasClassData
                    ? Number(subject.percentage || 0)
                    : Number.isFinite(storedAttendance)
                      ? storedAttendance
                      : Number(subject.percentage || 0);

                  return (
                    <tr
                      key={subject.id || subject.courseCode || index}
                      className="
                        border-t
                        border-slate-100
                        hover:bg-slate-50
                        transition
                      "
                    >
                      <td className="py-2.5 text-center text-[11px] text-slate-500">
                        {index + 1}
                      </td>

                      <td className="px-3 py-2.5 text-[11px] text-slate-700">
                        <span className="block max-w-[260px] break-words">
                          {subject.subjectName || "—"}
                        </span>
                      </td>

                      <td className="py-2.5 text-center text-[11px] text-slate-700">
                        {held}
                      </td>

                      <td className="py-2.5 text-center text-[11px] text-slate-700">
                        {Number(subject.classesAttended || 0)}
                      </td>

                      <td className="py-2.5 text-center">
                        <span
                          className={`
                            inline-block
                            min-w-[65px]
                            rounded-full
                            px-2
                            py-1
                            text-[10px]
                            font-semibold
                            ${badgeColor(percentage)}
                          `}
                        >
                          {percentage.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td
                    colSpan={4}
                    className="
                      px-4
                      py-3
                      text-right
                      text-[11px]
                      sm:text-[12px]
                      font-semibold
                      text-[#142970]
                    "
                  >
                    Overall Attendance
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-[10px]
                        sm:text-[11px]
                        font-semibold
                        text-green-700
                        whitespace-nowrap
                      "
                    >
                      {Number(
                        attendanceData?.summary?.percentage || 0,
                      ).toFixed(2)}
                      %
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* ACTION BUTTONS */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              flex-wrap
              justify-center
              items-stretch
              sm:items-center
              gap-2
              sm:gap-3
              mt-4
            "
          >
            {/* EDIT */}

            <button
              type="button"
              onClick={handleEdit}
              disabled={clearing}
              className="
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-blue-300
                px-4
                sm:px-5
                py-2
                text-[11px]
                sm:text-[12px]
                font-medium
                text-blue-600
                transition
                hover:bg-blue-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Pencil size={14} />
              Edit Attendance
            </button>

            {/* PDF REPORT */}

            <button
              type="button"
              onClick={handleDetailedReport}
              disabled={clearing}
              className="
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-blue-300
                px-4
                sm:px-5
                py-2
                text-[11px]
                sm:text-[12px]
                font-medium
                text-blue-600
                transition
                hover:bg-blue-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <FileText size={14} />
              View Detailed Report
            </button>

            {/* CLEAR SUBJECTS */}

            <button
              type="button"
              onClick={handleClear}
              disabled={clearing || typeof onClear !== "function"}
              className="
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-red-300
                px-4
                sm:px-5
                py-2
                text-[11px]
                sm:text-[12px]
                font-medium
                text-red-600
                transition
                hover:bg-red-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              title={
                typeof onClear !== "function"
                  ? "Connect the onClear handler in the parent Attendance page"
                  : "Clear subjects for the selected semester"
              }
            >
              <Trash2 size={14} />
              {clearing ? "Clearing..." : "Clear Subjects"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectAttendance;
