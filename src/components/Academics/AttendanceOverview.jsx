
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#2563EB", "#DBEAFE"];

const AttendanceOverview = ({ attendanceData }) => {
  // Summary
  const summary = attendanceData?.summary || {};

  const attended = Number(summary.classesAttended) || 0;
  const held = Number(summary.classesHeld) || 0;
  const missed = Math.max(held - attended, 0);

  // Attendance Percentage
  const calculatedPercentage =
    held > 0 ? (attended / held) * 100 : null;

  const backendPercentage = Number(summary.percentage);

  let safePercentage = 0;

  if (
    calculatedPercentage !== null &&
    Number.isFinite(calculatedPercentage)
  ) {
    safePercentage = calculatedPercentage;
  } else if (
    summary.percentage !== null &&
    summary.percentage !== undefined &&
    summary.percentage !== "" &&
    Number.isFinite(backendPercentage)
  ) {
    safePercentage = backendPercentage;
  }

  // Chart Data
  const chartData =
    held > 0
      ? [
          { name: "Attended", value: attended },
          { name: "Missed", value: missed },
        ]
      : safePercentage > 0
        ? [
            { name: "Attendance", value: safePercentage },
            { name: "Remaining", value: Math.max(100 - safePercentage, 0) },
          ]
        : [{ name: "No Attendance", value: 1 }];

  // Standing
  let standing = "No Data";
  let standingColor = "text-slate-400";

  if (safePercentage > 0) {
    if (safePercentage < 75) {
      standing = "Needs Attention";
      standingColor = "text-red-600";
    } else if (safePercentage < 85) {
      standing = "Good";
      standingColor = "text-orange-600";
    } else {
      standing = "Excellent";
      standingColor = "text-green-600";
    }
  }

  const hasAttendanceData = safePercentage > 0;

  return (
    <div className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-blue-600 sm:text-base">
          Overall Attendance
        </h3>
        <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
          Your overall class attendance summary
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-3">
        {/* Donut Chart */}
        <div className="relative h-[145px] w-[145px] shrink-0 sm:h-[135px] sm:w-[135px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius="68%"
                outerRadius="88%"
                startAngle={90}
                endAngle={450}
                stroke="none"
                paddingAngle={0}
              >
                {chartData.map((entry, index) => {
                  const fill = hasAttendanceData
                    ? COLORS[index] || COLORS[1]
                    : "#E2E8F0";

                  return <Cell key={entry.name} fill={fill} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-[#142970] sm:text-lg">
              {safePercentage.toFixed(2)}%
            </h2>

            <p
              className={`mt-0.5 text-[10px] font-semibold sm:text-[11px] ${standingColor}`}
            >
              {standing}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="w-full min-w-0 space-y-4 sm:flex-1 sm:pl-2">
          {/* Classes Attended */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-sm bg-blue-600" />
              <span className="text-xs text-slate-600 sm:text-[11px] lg:text-xs">
                Classes Attended
              </span>
            </div>

            <span className="text-sm font-semibold tabular-nums text-[#142970]">
              {attended}
            </span>
          </div>

          {/* Classes Held */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-sm bg-blue-200" />
              <span className="text-xs text-slate-600 sm:text-[11px] lg:text-xs">
                Classes Held
              </span>
            </div>

            <span className="text-sm font-semibold tabular-nums text-[#142970]">
              {held}
            </span>
          </div>

          {/* Classes Missed */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-sm bg-red-500" />
              <span className="text-xs text-slate-600 sm:text-[11px] lg:text-xs">
                Classes Missed
              </span>
            </div>

            <span className="text-sm font-semibold tabular-nums text-[#142970]">
              {missed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
