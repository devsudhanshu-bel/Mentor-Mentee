import React, { useMemo } from "react";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const PerformanceInsights = ({ semesterData = null }) => {
  // =========================================================
  // Extract semester data
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
  // Generate dynamic insights
  // =========================================================
  const insights = useMemo(() => {
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return ["No academic performance data is available for this semester."];
    }

    const result = [];

    // =======================================================
    // Calculate weighted average grade point
    // =======================================================
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

    // =======================================================
    // Academic Performance
    //
    // 4-point scale:
    // 3.50 - 4.00 = Excellent
    // 3.00 - 3.49 = Strong
    // 2.00 - 2.99 = Satisfactory
    // Below 2.00  = Needs improvement
    // =======================================================
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

    // =======================================================
    // Grade Distribution
    // =======================================================
    const gradeCounts = {};

    subjects.forEach((subject) => {
      const grade = String(subject?.grade || "")
        .trim()
        .toUpperCase();

      if (grade) {
        gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
      }
    });

    // =======================================================
    // A-range grades
    // =======================================================
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

    // =======================================================
    // Attendance
    // =======================================================
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

    // =======================================================
    // Backlogs
    // =======================================================
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

    // -------------------------------------------------------
    // Maximum four insights
    // -------------------------------------------------------
    return result.slice(0, 4);
  }, [subjects]);

  // =========================================================
  // Render
  // =========================================================
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* =====================================================
          Header
         ===================================================== */}
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb size={16} className="text-[#0B63F6]" strokeWidth={2} />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Performance Insights
        </h3>
      </div>

      {/* =====================================================
          Insights
         ===================================================== */}
      <div className="space-y-2.5">
        {insights.map((insight, index) => (
          <div key={`${insight}-${index}`} className="flex items-start gap-2">
            <CheckCircle2
              size={13}
              className="mt-[2px] shrink-0 text-green-500"
            />

            <p className="text-[11px] leading-5 text-slate-600">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceInsights;
