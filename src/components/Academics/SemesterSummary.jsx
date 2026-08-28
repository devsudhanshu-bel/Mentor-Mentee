import React, { useMemo } from "react";
import { ShieldCheck } from "lucide-react";

const SemesterSummary = ({ semesterData = null }) => {
  // =========================================================
  // Extract semester object
  // =========================================================
  const semester =
    semesterData?.semester ||
    semesterData?.data?.semester ||
    semesterData?.data ||
    semesterData;

  // =========================================================
  // Extract subjects
  // =========================================================
  const subjects =
    semester?.subjects ||
    semesterData?.subjects ||
    semesterData?.data?.subjects ||
    [];

  // =========================================================
  // Calculate semester statistics
  // =========================================================
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

    // -------------------------------------------------------
    // Total registered credits
    // -------------------------------------------------------
    const totalCredits = subjects.reduce(
      (total, subject) => total + Number(subject?.credits || 0),
      0,
    );

    // -------------------------------------------------------
    // Weighted grade points
    //
    // SGPA =
    // Σ(Credits × Grade Point)
    // ------------------------
    //       Σ Credits
    // -------------------------------------------------------
    const weightedGradePoints = subjects.reduce((total, subject) => {
      const credits = Number(subject?.credits || 0);

      const gradePoint = Number(subject?.gradePoint || 0);

      return total + credits * gradePoint;
    }, 0);

    // -------------------------------------------------------
    // SGPA on 4-point scale
    // -------------------------------------------------------
    const sgpa = totalCredits > 0 ? weightedGradePoints / totalCredits : null;

    // -------------------------------------------------------
    // Credits earned
    //
    // A subject contributes its credits if it has
    // a passing grade.
    // F is treated as a failed subject.
    // -------------------------------------------------------
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

    // -------------------------------------------------------
    // Backlogs
    // -------------------------------------------------------
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

  // =========================================================
  // Display helper
  // =========================================================
  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return value;
  };

  // =========================================================
  // Render
  // =========================================================
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* =====================================================
          Header
         ===================================================== */}
      <div className="mb-4 flex items-center gap-2">
        <ShieldCheck size={16} className="text-[#0B63F6]" strokeWidth={2} />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Semester Summary
        </h3>
      </div>

      {/* =====================================================
          SGPA
         ===================================================== */}
      <div className="mb-4">
        <p className="text-[10px] uppercase text-slate-500">SGPA</p>

        <div className="mt-0.5 flex items-end gap-1">
          <span className="text-[18px] font-bold leading-none text-[#0B63F6]">
            {summary.sgpa !== null ? summary.sgpa.toFixed(2) : "-"}
          </span>

          <span className="mb-[2px] text-[11px] text-slate-500">/ 4</span>
        </div>
      </div>

      {/* =====================================================
          Details
         ===================================================== */}
      <div className="space-y-2 text-[11px]">
        {/* Total Credits */}
        <div className="flex justify-between">
          <span className="text-slate-500">Total Credits</span>

          <span className="font-semibold text-[#0B3B8F]">
            {displayValue(summary.totalCredits)}
          </span>
        </div>

        {/* Credits Earned */}
        <div className="flex justify-between">
          <span className="text-slate-500">Credits Earned</span>

          <span className="font-semibold text-[#0B3B8F]">
            {displayValue(summary.creditsEarned)}
          </span>
        </div>

        {/* Credits Registered */}
        <div className="flex justify-between">
          <span className="text-slate-500">Credits Registered</span>

          <span className="font-semibold text-[#0B3B8F]">
            {displayValue(summary.creditsRegistered)}
          </span>
        </div>

        {/* Backlogs */}
        <div className="flex justify-between">
          <span className="text-slate-500">Backlogs</span>

          <span
            className={`font-semibold ${
              summary.backlogs > 0 ? "text-red-600" : "text-[#0B3B8F]"
            }`}
          >
            {displayValue(summary.backlogs)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SemesterSummary;
