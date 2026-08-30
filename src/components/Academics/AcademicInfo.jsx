import React, { useMemo } from "react";
import { CheckCircle2, Lock, Plus } from "lucide-react";

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
  // =========================================================
  // GET SEMESTER NUMBER
  // =========================================================

  const getSemesterNumber = (semesterName) => {
    const index = semesters.indexOf(semesterName);
    return index + 1;
  };

  // =========================================================
  // FIND SEMESTER RECORD
  // =========================================================

  const getSemesterRecord = (semesterNumber) => {
    if (!Array.isArray(semesterData)) {
      return null;
    }

    return semesterData.find(
      (semester) => Number(semester?.semesterNumber) === Number(semesterNumber),
    );
  };

  // =========================================================
  // SELECTED SEMESTER
  // =========================================================

  const selectedRecord = useMemo(
    () => getSemesterRecord(activeSemester),
    [semesterData, activeSemester],
  );

  // =========================================================
  // HANDLE SEMESTER CLICK
  // =========================================================

  const handleSemesterClick = (semesterNumber) => {
    // Current and future semesters are locked
    if (semesterNumber >= Number(currentSemester)) {
      return;
    }

    const record = getSemesterRecord(semesterNumber);

    // No saved record
    if (!record?.hasRecord) {
      onSemesterChange?.(semesterNumber, {
        mode: "ENTRY",
      });

      return;
    }

    // Existing semester
    onSemesterChange?.(semesterNumber, {
      mode: "VIEW",
    });
  };

  return (
    <div className="space-y-4">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div>
        <h2 className="text-[20px] font-bold text-[#082B73]">
          Academic Information
        </h2>

        <p className="mt-1 text-[13px] text-slate-500">
          View your academic performance and course details
        </p>
      </div>

      {/* =====================================================
          SEMESTER TABS
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
                  relative
                  flex-1
                  py-3
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200

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
                {/* SAVED SEMESTER */}
                {hasRecord && (
                  <CheckCircle2
                    size={13}
                    className={isActive ? "text-white" : "text-green-500"}
                  />
                )}

                {/* LOCKED SEMESTER */}
                {isLocked && (
                  <Lock
                    size={13}
                    className={isActive ? "text-white" : "text-slate-400"}
                  />
                )}

                {/* UNSAVED SEMESTER */}
                {!isLocked && !hasRecord && (
                  <Plus
                    size={13}
                    className={isActive ? "text-white" : "text-[#0B63F6]"}
                  />
                )}

                {semester}
              </span>

              {/* CURRENT LABEL */}
              {isCurrent && (
                <span
                  className={`
                      absolute
                      bottom-0
                      left-0
                      right-0
                      text-[8px]
                      font-semibold

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
