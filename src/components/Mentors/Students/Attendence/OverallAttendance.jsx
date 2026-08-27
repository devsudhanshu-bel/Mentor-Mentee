import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const attendance = 94;

const chartData = [
  {
    name: "Attendance",
    value: attendance,
    color: "#2563EB",
  },
  {
    name: "Remaining",
    value: 100 - attendance,
    color: "#E2E8F0",
  },
];

const stats = [
  {
    label: "Classes Attended",
    value: 324,
    color: "bg-blue-600",
  },
  {
    label: "Classes Held",
    value: 344,
    color: "bg-blue-300",
  },
  {
    label: "Classes Missed",
    value: 20,
    color: "bg-red-500",
  },
];

const OverallAttendance = () => {
  return (
    <div className="h-[260px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Heading */}
      <h2 className="mb-4 text-[13px] font-semibold text-blue-600">
        Overall Attendance
      </h2>

      <div className="flex h-[190px] items-center justify-between">
        {/* ================= Donut ================= */}
        <div className="relative flex h-[125px] w-[125px] items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                innerRadius={42}
                outerRadius={56}
                stroke="none"
              >
                {chartData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-[22px] font-bold leading-none text-slate-800">
              {attendance}%
            </h3>

            <p className="mt-1 text-[10px] font-medium text-green-600">
              Excellent
            </p>
          </div>
        </div>

        {/* ================= Legend ================= */}
        <div className="ml-4 flex-1 space-y-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${item.color}`}
                />

                <span className="text-[11px] text-slate-600">
                  {item.label}
                </span>
              </div>

              <span className="text-[12px] font-semibold text-slate-700">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverallAttendance;