
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
        px-2.5
        sm:px-3
        py-3
        min-h-[120px]
        sm:h-[130px]
        flex
        items-center
        justify-between
        gap-1
        min-w-0
      `}
    >
      <div className="min-w-0 flex-1">
        <p
          className="
            text-[9px]
            sm:text-[10px]
            font-medium
            text-slate-500
            leading-tight
            break-words
          "
        >
          {title}
        </p>

        <h3
          className={`
            text-[13px]
            sm:text-[15px]
            font-bold
            mt-2
            break-words
            ${valueColor}
          `}
        >
          {value}
        </h3>

        {subtitle && (
          <p
            className="
              text-[9px]
              sm:text-[10px]
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
        size={18}
        strokeWidth={2}
        className={`
          ${iconColor}
          shrink-0
          ml-1
          sm:w-[21px]
          sm:h-[21px]
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
        w-full
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        p-3
        sm:p-4
        min-h-[200px]
        flex
        flex-col
      "
    >
      {/* TITLE */}

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

      {/* THREE STAT CARDS */}

      <div
        className="
          grid
          grid-cols-1
          min-[400px]:grid-cols-3
          gap-2
          sm:gap-3
          flex-1
          items-stretch
        "
      >
        {/* THIS SEMESTER */}

        <StatCard
          title="This Semester"
          value={`${semesterPercentage.toFixed(2)}%`}
          valueColor="text-[#142970]"
          borderColor="border-slate-200"
          iconColor="text-blue-600"
        />

        {/* HIGHEST SUBJECT */}

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

        {/* LOWEST SUBJECT */}

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
