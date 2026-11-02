
import React, { useMemo } from "react";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const PerformanceInsights = ({ semesterData = null }) => {
  // Extract semester data
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

  // Generate dynamic insights
  const insights = useMemo(() => {
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return [
        "No academic performance data is available for this semester.",
      ];
    }

    const result = [];

    // Calculate weighted average grade point
    const subjectsWithGradePoint = subjects.filter(
      (subject) =>
        subject?.gradePoint !== null &&
        subject?.gradePoint !== undefined &&
        subject?.gradePoint !== "",
    );

    let averageGradePoint = null;

    if (subjectsWithGradePoint.length > 0) {
      const totalWeightedPoints = subjectsWithGradePoint.reduce(
        (sum, subject) => {
          const credits = Number(subject?.credits || 0);
          const gradePoint = Number(subject?.gradePoint || 0);

          return sum + credits * gradePoint;
        },
        0,
      );

      const totalCredits = subjectsWithGradePoint.reduce(
        (sum, subject) => sum + Number(subject?.credits || 0),
        0,
      );

      averageGradePoint =
        totalCredits > 0 ? totalWeightedPoints / totalCredits : null;
    }

    // Academic Performance
    if (averageGradePoint !== null) {
      if (averageGradePoint >= 3.5) {
        result.push("Excellent academic performance this semester.");
      } else if (averageGradePoint >= 3.0) {
        result.push("Strong academic performance this semester.");
      } else if (averageGradePoint >= 2.0) {
        result.push(
          "Your academic performance is satisfactory, with room for improvement.",
        );
      } else {
        result.push(
          "Focus on improving your academic performance in the next semester.",
        );
      }
    }

    // Grade Distribution
    const gradeCounts = {};

    subjects.forEach((subject) => {
      const grade = String(subject?.grade || "")
        .trim()
        .toUpperCase();

      if (grade) {
        gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
      }
    });

    // A-range grades
    const aGradeCount =
      (gradeCounts["O"] || 0) +
      (gradeCounts["A+"] || 0) +
      (gradeCounts["A"] || 0) +
      (gradeCounts["A-"] || 0);

    if (aGradeCount > 0) {
      result.push(
        `You have secured A-range grades in ${aGradeCount} subject${
          aGradeCount === 1 ? "" : "s"
        }.`,
      );
    }

    // Attendance
    const attendanceSubjects = subjects.filter(
      (subject) =>
        subject?.attendance !== null &&
        subject?.attendance !== undefined &&
        subject?.attendance !== "",
    );

    if (attendanceSubjects.length > 0) {
      const averageAttendance =
        attendanceSubjects.reduce(
          (sum, subject) => sum + Number(subject.attendance),
          0,
        ) / attendanceSubjects.length;

      if (averageAttendance >= 90) {
        result.push("Your attendance is excellent this semester.");
      } else if (averageAttendance >= 85) {
        result.push("Your attendance is satisfactory this semester.");
      } else {
        result.push("Your attendance needs attention this semester.");
      }
    }

    // Backlogs
    const backlogCount = subjects.filter(
      (subject) =>
        String(subject?.grade || "")
          .trim()
          .toUpperCase() === "F",
    ).length;

    if (backlogCount === 0) {
      result.push("No backlogs in this semester.");
    } else {
      result.push(
        `${backlogCount} subject${
          backlogCount === 1 ? "" : "s"
        } require attention.`,
      );
    }

    // Maximum four insights
    return result.slice(0, 4);
  }, [subjects]);

  return (
    <div className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* HEADER */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Lightbulb
            size={17}
            className="text-[#0B63F6]"
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#0B3B8F] sm:text-[15px]">
            Performance Insights
          </h3>

          <p className="mt-0.5 text-[10px] text-slate-400 sm:text-[11px]">
            Highlights from your academic performance
          </p>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={`${insight}-${index}`}
            className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 transition hover:border-blue-100 hover:bg-blue-50/40 sm:px-4"
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2
                size={13}
                className="text-green-600"
                strokeWidth={2.5}
              />
            </div>

            <p className="min-w-0 text-[11px] leading-relaxed text-slate-600 sm:text-xs sm:leading-5">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceInsights;
