import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#2563EB", "#DBEAFE"];

const AttendanceOverview = ({ attendanceData }) => {
  const summary = attendanceData?.summary || {};

  const attended = Number(summary.classesAttended) || 0;
  const held = Number(summary.classesHeld) || 0;

  const missed = Math.max(held - attended, 0);

  const percentage = held > 0 ? (attended / held) * 100 : 0;

  const safePercentage = Number.isFinite(percentage) ? percentage : 0;

  const chartData =
    held > 0
      ? [
          {
            name: "Attended",
            value: attended,
          },
          {
            name: "Missed",
            value: missed,
          },
        ]
      : [
          {
            name: "No Attendance",
            value: 1,
          },
        ];

  let standing = "No Data";
  let standingColor = "text-slate-400";

  if (held > 0) {
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-[200px]">
      <h3 className="text-[14px] font-semibold text-blue-600 mb-4">
        Overall Attendance
      </h3>

      <div className="flex items-center justify-between h-[145px]">
        {/* Donut Chart */}

        <div className="relative w-[120px] h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={42}
                outerRadius={58}
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={held > 0 ? COLORS[index] : "#E2E8F0"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-[18px] font-bold text-[#142970]">
              {safePercentage.toFixed(2)}%
            </h2>

            <p className={`text-[11px] font-medium ${standingColor}`}>
              {standing}
            </p>
          </div>
        </div>

        {/* Stats */}

        <div className="space-y-4 text-[12px]">
          {/* Attended */}

          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-600"></span>

              <span className="text-slate-600">Classes Attended</span>
            </div>

            <span className="font-semibold text-[#142970]">{attended}</span>
          </div>

          {/* Held */}

          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-200"></span>

              <span className="text-slate-600">Classes Held</span>
            </div>

            <span className="font-semibold text-[#142970]">{held}</span>
          </div>

          {/* Missed */}

          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500"></span>

              <span className="text-slate-600">Classes Missed</span>
            </div>

            <span className="font-semibold text-[#142970]">{missed}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
