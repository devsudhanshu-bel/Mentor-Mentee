
import React from "react";
import { CheckCircle2, LockKeyhole, Plus } from "lucide-react";

const SemesterTabs = ({
  selectedSemester,
  onSelect,
  semesters = [],
  currentSemester = 6,
}) => {
  const availableSemesters = Array.from(
    { length: 8 },
    (_, index) => index + 1
  );

  const hasRecord = (number) =>
    semesters.some((semester) => {
      const semesterNumber = Number(
        semester.semesterNumber ??
        semester.semester ??
        semester.number
      );

      return (
        semesterNumber === number &&
        semester.hasRecord !== false
      );
    });

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid min-w-[720px] grid-cols-8">
        {availableSemesters.map((number) => {
          const selected = selectedSemester === number;
          const locked = number > currentSemester;
          const recorded = hasRecord(number);

          return (
            <button
              key={number}
              type="button"
              disabled={locked}
              onClick={() => onSelect(number)}
              className={[
                "flex min-h-[56px] flex-col items-center justify-center gap-1",
                "border-r border-slate-200 px-2 py-2 text-xs font-medium",
                "transition-colors last:border-r-0",
                selected
                  ? "bg-[#0B63F6] text-white"
                  : locked
                    ? "cursor-not-allowed bg-slate-50 text-slate-400"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
              ].join(" ")}
            >
              <span className="flex items-center gap-1.5">
                {selected ? (
                  <CheckCircle2 size={15} />
                ) : locked ? (
                  <LockKeyhole size={14} />
                ) : recorded ? (
                  <CheckCircle2 size={14} className="text-blue-500" />
                ) : (
                  <Plus size={14} className="text-blue-500" />
                )}

                Semester {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][number - 1]}
              </span>

              {number === currentSemester && (
                <span className="text-[9px] uppercase opacity-75">
                  Current
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SemesterTabs;
