
import React, { useMemo } from "react";
import { ShieldCheck } from "lucide-react";

const SemesterSummary = ({ semesterData = null }) => {
  const summary = useMemo(() => {
    const subjects =
      semesterData?.subjects ||
      semesterData?.courses ||
      [];

    const totalCredits = subjects.reduce((total, subject) => {
      return total + (Number(subject.credits) || 0);
    }, 0);

    const creditsEarned = subjects.reduce((total, subject) => {
      const grade = String(subject.grade || "")
        .trim()
        .toUpperCase();

      const failed = ["F", "N", "AB", "U"].includes(grade);

      return failed
        ? total
        : total + (Number(subject.credits) || 0);
    }, 0);

    const weightedPoints = subjects.reduce((total, subject) => {
      return (
        total +
        (Number(subject.credits) || 0) *
          (Number(subject.gradePoint) || 0)
      );
    }, 0);

    const hasGrades = subjects.some(
      (subject) =>
        subject.gradePoint !== null &&
        subject.gradePoint !== undefined &&
        subject.gradePoint !== ""
    );

    const sgpa =
      semesterData?.sgpa ??
      semesterData?.SGPA ??
      semesterData?.gpa ??
      (totalCredits > 0 && hasGrades
        ? weightedPoints / totalCredits
        : null);

    const backlogs = subjects.filter((subject) =>
      ["F", "N", "AB", "U"].includes(
        String(subject.grade || "").trim().toUpperCase()
      )
    ).length;

    return {
      sgpa,
      totalCredits,
      creditsEarned,
      creditsRegistered:
        semesterData?.creditsRegistered ?? totalCredits,
      backlogs:
        semesterData?.backlogs ?? backlogs,
    };
  }, [semesterData]);

  const format = (value) =>
    value === null || value === undefined || value === ""
      ? "—"
      : value;

  const rows = [
    ["Total Credits", summary.totalCredits],
    ["Credits Earned", summary.creditsEarned],
    ["Credits Registered", summary.creditsRegistered],
    ["Backlogs", summary.backlogs],
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-[#0B3B8F]">
        <ShieldCheck size={18} className="text-blue-600" />
        Semester Summary
      </h2>

      <div className="mb-5">
        <p className="text-xs text-slate-500">SGPA</p>

        <p className="mt-1 text-2xl font-bold text-blue-600">
          {summary.sgpa == null
            ? "—"
            : Number(summary.sgpa).toFixed(2)}
          <span className="ml-1 text-sm font-normal text-slate-400">
            / 4
          </span>
        </p>
      </div>

      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <span className="text-slate-500">{label}</span>

            <span className="font-semibold text-[#0B3B8F]">
              {format(value)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SemesterSummary;
