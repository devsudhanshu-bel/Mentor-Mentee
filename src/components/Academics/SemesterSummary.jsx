
import React, { useMemo } from "react";
import { ShieldCheck } from "lucide-react";

const SemesterSummary = ({ semesterData = null }) => {
  // Extract semester object
  const semester =
    semesterData?.semester ||
    semesterData?.data?.semester ||
    semesterData?.data ||
    semesterData;

  // Extract subjects
  const subjects =
    semester?.subjects ||
    semesterData?.subjects ||
    semesterData?.data?.subjects ||
    [];

  // Calculate semester statistics
  const summary = useMemo(() => {
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return {
        sgpa: null,
        totalCredits: 0,
        creditsEarned: 0,
        creditsRegistered: 0,
        backlogs: 0,
      };
    }

    // Total registered credits
    const totalCredits = subjects.reduce(
      (total, subject) => total + Number(subject?.credits || 0),
      0,
    );

    // Weighted grade points
    const weightedGradePoints = subjects.reduce((total, subject) => {
      const credits = Number(subject?.credits || 0);
      const gradePoint = Number(subject?.gradePoint || 0);

      return total + credits * gradePoint;
    }, 0);

    // SGPA
    const sgpa =
      totalCredits > 0 ? weightedGradePoints / totalCredits : null;

    // Credits earned
    const creditsEarned = subjects.reduce((total, subject) => {
      const grade = String(subject?.grade || "")
        .trim()
        .toUpperCase();

      const credits = Number(subject?.credits || 0);

      if (grade === "F") {
        return total;
      }

      return total + credits;
    }, 0);

    // Backlogs
    const backlogs = subjects.filter((subject) => {
      const grade = String(subject?.grade || "")
        .trim()
        .toUpperCase();

      return grade === "F";
    }).length;

    return {
      sgpa,
      totalCredits,
      creditsEarned,
      creditsRegistered: totalCredits,
      backlogs,
    };
  }, [subjects]);

  // Display helper
  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  // Summary details
  const summaryItems = [
    {
      label: "Total Credits",
      value: displayValue(summary.totalCredits),
    },
    {
      label: "Credits Earned",
      value: displayValue(summary.creditsEarned),
    },
    {
      label: "Credits Registered",
      value: displayValue(summary.creditsRegistered),
    },
    {
      label: "Backlogs",
      value: displayValue(summary.backlogs),
      isBacklog: true,
    },
  ];

  return (
    <div className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <ShieldCheck
            size={17}
            className="text-[#0B63F6]"
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#0B3B8F] sm:text-[15px]">
            Semester Summary
          </h3>

          <p className="mt-0.5 text-[10px] text-slate-400 sm:text-[11px]">
            Overview of your semester results
          </p>
        </div>
      </div>

      {/* SGPA SECTION */}
      <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Semester Grade Point Average
            </p>

            <div className="mt-2 flex items-end gap-1.5">
              <span className="text-3xl font-bold leading-none text-[#0B63F6] sm:text-4xl">
                {summary.sgpa !== null
                  ? summary.sgpa.toFixed(2)
                  : "-"}
              </span>

              <span className="mb-0.5 text-xs font-medium text-slate-500">
                / 4
              </span>
            </div>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <ShieldCheck
              size={23}
              className="text-[#0B63F6]"
            />
          </div>
        </div>
      </div>

      {/* SUMMARY DETAILS */}
      <div className="space-y-0">
        {summaryItems.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center justify-between gap-3 py-3 ${
              index !== summaryItems.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            <span className="text-xs text-slate-500 sm:text-[13px]">
              {item.label}
            </span>

            <span
              className={`text-sm font-semibold tabular-nums sm:text-[13px] ${
                item.isBacklog && summary.backlogs > 0
                  ? "text-red-600"
                  : "text-[#0B3B8F]"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemesterSummary;
