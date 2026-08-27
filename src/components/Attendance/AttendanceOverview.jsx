import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Attended", value: 324 },
  { name: "Held", value: 20 },
];

const COLORS = ["#2563EB", "#DBEAFE"];

const AttendanceOverview = () => {
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
                data={data}
                dataKey="value"
                innerRadius={42}
                outerRadius={58}
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-[18px] font-bold text-[#142970]">94%</h2>
            <p className="text-[11px] text-green-600 font-medium">
              Excellent
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4 text-[12px]">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-600"></span>
              <span className="text-slate-600">Classes Attended</span>
            </div>
            <span className="font-semibold text-[#142970]">324</span>
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-200"></span>
              <span className="text-slate-600">Classes Held</span>
            </div>
            <span className="font-semibold text-[#142970]">344</span>
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500"></span>
              <span className="text-slate-600">Classes Missed</span>
            </div>
            <span className="font-semibold text-[#142970]">20</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;