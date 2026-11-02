
import React, { useMemo } from "react";
import {
  CheckCircle2,
  Lock,
  Plus,
  GraduationCap,
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
      (semester) =>
        Number(semester?.semesterNumber) === Number(semesterNumber)
    );
  };

  // =========================================================
  // SELECTED SEMESTER
  // =========================================================

  const selectedRecord = useMemo(
    () => getSemesterRecord(activeSemester),
    [semesterData, activeSemester]
  );

  // =========================================================
  // HANDLE SEMESTER CLICK
  // =========================================================

  const handleSemesterClick = (semesterNumber) => {
    // Current and future semesters are locked.
    if (semesterNumber >= Number(currentSemester)) {
      return;
    }

    const record = getSemesterRecord(semesterNumber);

    // No saved record.
    if (!record?.hasRecord) {
      onSemesterChange?.(semesterNumber, {
        mode: "ENTRY",
      });

      return;
    }

    // Existing semester.
    onSemesterChange?.(semesterNumber, {
      mode: "VIEW",
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="w-full min-w-0 space-y-4">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <GraduationCap size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-[#082B73] sm:text-xl">
              Academic Information
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              View your academic performance and course details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 sm:self-center">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          <span className="text-[11px] font-semibold text-blue-700">
            Current: Semester {currentSemester}
          </span>
        </div>
      </div>

      {/* =====================================================
          SEMESTER NAVIGATION
      ===================================================== */}

      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* LEGEND */}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 px-3 py-3 sm:px-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Semester status
          </span>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-green-500" />
              <span className="text-[10px] text-slate-500">
                Completed
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Plus size={12} className="text-blue-600" />
              <span className="text-[10px] text-slate-500">
                Add details
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Lock size={12} className="text-slate-400" />
              <span className="text-[10px] text-slate-500">
                Locked
              </span>
            </div>
          </div>
        </div>

        {/* SEMESTER GRID */}

        <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:gap-3 sm:p-4 lg:grid-cols-4 xl:grid-cols-8">

          {semesters.map((semester) => {
            const semesterNumber = getSemesterNumber(semester);

            const record = getSemesterRecord(semesterNumber);

            const isCurrent =
              semesterNumber === Number(currentSemester);

            const isLocked =
              semesterNumber >= Number(currentSemester);

            const hasRecord =
              Boolean(record?.hasRecord) &&
              semesterNumber < Number(currentSemester);

            const isActive =
              semesterNumber === Number(activeSemester);

            return (
              <button
                key={semester}
                type="button"
                disabled={isLocked}
                onClick={() => handleSemesterClick(semesterNumber)}
                aria-pressed={isActive}
                aria-label={`${semester}${
                  isLocked
                    ? ", locked"
                    : hasRecord
                      ? ", completed"
                      : ", add academic details"
                }`}
                className={`
                  group relative flex min-h-[76px] min-w-0 flex-col
                  items-center justify-center gap-2
                  overflow-hidden rounded-xl border px-2 py-3
                  transition-all duration-200

                  ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                      : isLocked
                        ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                        : hasRecord
                          ? "border-slate-200 bg-white text-slate-700 hover:border-green-200 hover:bg-green-50/50"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-700"
                  }

                  ${!isLocked && !isActive ? "active:scale-[0.98]" : ""}
                  disabled:cursor-not-allowed
                `}
              >
                {/* STATUS ICON */}

                <div
                  className={`
                    flex h-7 w-7 items-center justify-center rounded-lg
                    transition-colors

                    ${
                      isActive
                        ? "bg-white/15 text-white"
                        : isLocked
                          ? "bg-slate-100 text-slate-400"
                          : hasRecord
                            ? "bg-green-50 text-green-600"
                            : "bg-blue-50 text-blue-600"
                    }
                  `}
                >
                  {hasRecord ? (
                    <CheckCircle2 size={15} />
                  ) : isLocked ? (
                    <Lock size={14} />
                  ) : (
                    <Plus size={15} />
                  )}
                </div>

                {/* SEMESTER LABEL */}

                <span
                  className={`
                    text-center text-[11px] font-semibold leading-tight
                    sm:text-xs

                    ${
                      isActive
                        ? "text-white"
                        : isLocked
                          ? "text-slate-400"
                          : "text-slate-700"
                    }
                  `}
                >
                  {semester}
                </span>

                {/* CURRENT LABEL */}

                {isCurrent && (
                  <span
                    className={`
                      absolute right-1.5 top-1.5 rounded-full
                      px-1.5 py-0.5 text-[8px] font-bold
                      tracking-wide

                      ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    CURRENT
                  </span>
                )}

                {/* COMPLETED INDICATOR */}

                {hasRecord && !isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-green-400" />
                )}

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white/70" />
                )}
              </button>
            );
          })}
        </div>

        {/* SELECTED SEMESTER FOOTER */}

        <div className="flex flex-col gap-1 border-t border-slate-100 bg-slate-50/70 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <p className="text-xs font-semibold text-slate-700">
            Selected: Semester {activeSemester}
          </p>

          <p className="text-[10px] text-slate-500 sm:text-xs">
            {Number(activeSemester) >= Number(currentSemester)
              ? "This semester is locked."
              : selectedRecord?.hasRecord
                ? "Academic records are available for viewing."
                : "No records found. Select this semester to add details."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AcademicInfo;
