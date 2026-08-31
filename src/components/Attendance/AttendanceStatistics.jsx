import React from "react";
import { TrendingUp } from "lucide-react";

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
        px-4
        py-2.5
        h-[66px]
        flex
        items-center
        justify-between
      `}
    >
      <div>
        <p
          className="
          text-[10px]
          font-medium
          text-slate-500
        "
        >
          {title}
        </p>

        <h3
          className={`
            text-[15px]
            font-bold
            mt-1
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
            leading-none
            mt-1
            max-w-[120px]
            truncate
          "
          >
            {subtitle}
          </p>
        )}
      </div>

      <TrendingUp size={22} strokeWidth={2} className={iconColor} />
    </div>
  );
};

const AttendanceStatistics = ({ attendanceData }) => {
  const subjects = attendanceData?.subjects || [];

  const summary = attendanceData?.summary || {};

  const semesterPercentage = Number(summary.percentage) || 0;

  /*
   * Find highest and lowest subject.
   */

  const sortedSubjects = [...subjects].sort(
    (a, b) => Number(b.percentage || 0) - Number(a.percentage || 0),
  );

  const highest = sortedSubjects[0];

  const lowest = sortedSubjects[sortedSubjects.length - 1];

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
    "
    >
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

      <div
        className="
        grid
        grid-cols-2
        gap-3
      "
      >
        {/* This Month */}

        <StatCard
          title="This Month"
          value="—"
          subtitle="Monthly data unavailable"
          valueColor="text-slate-400"
          borderColor="border-slate-200"
          iconColor="text-slate-400"
        />

        {/* This Semester */}

        <StatCard
          title="This Semester"
          value={`${semesterPercentage.toFixed(2)}%`}
          valueColor="text-[#142970]"
          borderColor="border-slate-200"
          iconColor="text-blue-600"
        />

        {/* Highest */}

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

        {/* Lowest */}

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
