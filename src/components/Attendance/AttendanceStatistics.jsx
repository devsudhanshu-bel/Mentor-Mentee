import React from "react";
import { TrendingUp } from "lucide-react";

/* ==========================================================
   STAT CARD
========================================================== */

const StatCard = ({
  title,
  value,
  subtitle,
  valueColor,
  borderColor,
  iconColor,
}) => {
  return (
    <div
      className={`
        border
        ${borderColor}
        rounded-xl
        px-3
        py-3
        h-[130px]
        flex
        items-center
        justify-between
        min-w-0
      `}
    >
      <div className="min-w-0 flex-1">
        <p
          className="
            text-[10px]
            font-medium
            text-slate-500
            leading-tight
          "
        >
          {title}
        </p>

        <h3
          className={`
            text-[15px]
            font-bold
            mt-2
            ${valueColor}
          `}
        >
          {value}
        </h3>

        {subtitle && (
          <p
            className="
              text-[10px]
              text-slate-500
              leading-[13px]
              mt-1
              break-words
              line-clamp-2
            "
            title={subtitle}
          >
            {subtitle}
          </p>
        )}
      </div>

      <TrendingUp
        size={21}
        strokeWidth={2}
        className={`
          ${iconColor}
          flex-shrink-0
          ml-1
        `}
      />
    </div>
  );
};

/* ==========================================================
   ATTENDANCE STATISTICS
========================================================== */

const AttendanceStatistics = ({ attendanceData }) => {
  const subjects = attendanceData?.subjects || [];

  const summary = attendanceData?.summary || {};

  const semesterPercentage = Number(summary.percentage) || 0;

  /* ========================================================
     SORT SUBJECTS
  ======================================================== */

  const sortedSubjects = [...subjects].sort(
    (a, b) => Number(b?.percentage || 0) - Number(a?.percentage || 0),
  );

  const highest = sortedSubjects.length > 0 ? sortedSubjects[0] : null;

  const lowest =
    sortedSubjects.length > 0
      ? sortedSubjects[sortedSubjects.length - 1]
      : null;

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        p-4
        h-[200px]
        flex
        flex-col
      "
    >
      {/* ======================================================
          TITLE
      ====================================================== */}

      <h3
        className="
          text-[14px]
          font-semibold
          text-blue-600
          mb-3
        "
      >
        Attendance Statistics
      </h3>

      {/* ======================================================
          THREE STAT CARDS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-3
          gap-3
          flex-1
          items-center
        "
      >
        {/* ====================================================
            THIS SEMESTER
        ==================================================== */}

        <StatCard
          title="This Semester"
          value={`${semesterPercentage.toFixed(2)}%`}
          valueColor="text-[#142970]"
          borderColor="border-slate-200"
          iconColor="text-blue-600"
        />

        {/* ====================================================
            HIGHEST SUBJECT
        ==================================================== */}

        <StatCard
          title="Highest (Subject)"
          value={
            highest ? `${Number(highest.percentage || 0).toFixed(2)}%` : "—"
          }
          subtitle={highest ? highest.subjectName : "No subject data"}
          valueColor="text-emerald-600"
          borderColor="border-emerald-200"
          iconColor="text-emerald-500"
        />

        {/* ====================================================
            LOWEST SUBJECT
        ==================================================== */}

        <StatCard
          title="Lowest (Subject)"
          value={lowest ? `${Number(lowest.percentage || 0).toFixed(2)}%` : "—"}
          subtitle={lowest ? lowest.subjectName : "No subject data"}
          valueColor="text-orange-500"
          borderColor="border-orange-200"
          iconColor="text-orange-500"
        />
      </div>
    </div>
  );
};

export default AttendanceStatistics;
