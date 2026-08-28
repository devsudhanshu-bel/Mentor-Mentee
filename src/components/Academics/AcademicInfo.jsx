import React from "react";
import {
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  Lock,
  Plus,
} from "lucide-react";

const semesters = [
  "Semester I",
  "Semester II",
  "Semester III",
  "Semester IV",
  "Semester V",
  "Semester VI",
  "Semester VII",
  "Semester VIII",
];

const AcademicInfo = ({
  currentSemester = 1,
  semesterData = [],
  activeSemester = 1,
  onSemesterChange,
}) => {
  // ---------------------------------------------------------
  // Convert "Semester I" → 1
  // ---------------------------------------------------------
  const getSemesterNumber = (semesterName) => {
    const index = semesters.indexOf(semesterName);
    return index + 1;
  };

  // ---------------------------------------------------------
  // Find backend record for a semester
  // ---------------------------------------------------------
  const getSemesterRecord = (semesterNumber) => {
    return semesterData.find(
      (semester) => Number(semester?.semesterNumber) === Number(semesterNumber),
    );
  };

  // ---------------------------------------------------------
  // Handle tab click
  // ---------------------------------------------------------
  const handleSemesterClick = (semesterNumber) => {
    // Current + future semesters are locked.
    if (semesterNumber >= Number(currentSemester)) {
      return;
    }

    const record = getSemesterRecord(semesterNumber);

    // -------------------------------------------------------
    // No academic record yet
    // → Open subject-entry flow
    // -------------------------------------------------------
    if (!record?.hasRecord) {
      onSemesterChange?.(semesterNumber, {
        mode: "ENTRY",
      });

      return;
    }

    // -------------------------------------------------------
    // Existing record
    // → Display semester
    // -------------------------------------------------------
    onSemesterChange?.(semesterNumber, {
      mode: "VIEW",
    });
  };

  return (
    <div className="space-y-4">
      {/* =====================================================
          Heading
         ===================================================== */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#082B73]">
            Academic Information
          </h2>

          <p className="mt-1 text-[13px] text-slate-500">
            View your academic performance and course details
          </p>
        </div>

        {/* Academic Year */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition hover:border-blue-500"
        >
          <CalendarDays size={18} className="text-[#0B63F6]" />

          <span className="text-[14px] font-medium text-slate-700">
            Academic Year
          </span>

          <ChevronDown size={16} className="text-slate-500" />
        </button>
      </div>

      {/* =====================================================
          Semester Tabs
         ===================================================== */}
      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">
        {semesters.map((semester) => {
          const semesterNumber = getSemesterNumber(semester);

          const record = getSemesterRecord(semesterNumber);

          const isCurrent = semesterNumber === Number(currentSemester);

          const isLocked = semesterNumber >= Number(currentSemester);

          const hasRecord =
            Boolean(record?.hasRecord) &&
            semesterNumber < Number(currentSemester);

          const isActive = semesterNumber === Number(activeSemester);

          return (
            <button
              key={semester}
              type="button"
              disabled={isLocked}
              onClick={() => handleSemesterClick(semesterNumber)}
              className={`
                relative flex-1 py-3 text-[13px] font-medium
                transition-all duration-200

                ${
                  isActive
                    ? "bg-[#0B63F6] text-white"
                    : isLocked
                      ? "cursor-not-allowed bg-slate-50 text-slate-400"
                      : hasRecord
                        ? "cursor-pointer bg-white text-slate-700 hover:bg-slate-50"
                        : "cursor-pointer bg-white text-slate-500 hover:bg-blue-50 hover:text-[#0B63F6]"
                }

                ${semesterNumber !== 8 ? "border-r border-slate-200" : ""}
              `}
            >
              <span className="flex items-center justify-center gap-1.5">
                {/* Saved semester */}
                {hasRecord && (
                  <CheckCircle2
                    size={13}
                    className={isActive ? "text-white" : "text-green-500"}
                  />
                )}

                {/* Current / future */}
                {isLocked && (
                  <Lock
                    size={13}
                    className={isActive ? "text-white" : "text-slate-400"}
                  />
                )}

                {/* Previous semester without record */}
                {!isLocked && !hasRecord && (
                  <Plus
                    size={13}
                    className={isActive ? "text-white" : "text-[#0B63F6]"}
                  />
                )}

                {semester}
              </span>

              {/* Current label */}
              {isCurrent && (
                <span
                  className={`
                    absolute bottom-0 left-0 right-0
                    text-[8px] font-semibold
                    ${isActive ? "text-blue-100" : "text-slate-400"}
                  `}
                >
                  CURRENT
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AcademicInfo;
