import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Present", value: 198, color: "#1677FF" },
  { name: "Absent", value: 12, color: "#FF4D4F" },
  { name: "Leave", value: 8, color: "#FFB547" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);
const attendance = Math.round((198 / total) * 100);

const AttendanceOverview = () => {
  return (
    <div className="bg-white rounded-[22px] border border-gray-200 shadow-sm p-5 h-[300px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-slate-900">
          Attendance Overview
        </h2>

        <button className="text-[#1677ff] text-[13px] font-semibold hover:underline">
          View Details
        </button>
      </div>

      {/* Main */}
      <div className="flex flex-1 items-center justify-between">
        {/* Donut */}
        <div className="relative w-[150px] h-[150px] ml-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-[32px] font-bold text-slate-900">
              {attendance}%
            </h2>

            <p className="text-[15px] text-gray-600">
              Overall
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-start gap-3">
              <span
                className="w-3 h-3 rounded-full mt-1"
                style={{ backgroundColor: item.color }}
              />

              <div>
                <p className="font-semibold text-[15px] text-slate-900">
                  {item.name}
                </p>

                <p className="text-[13px] text-gray-500">
                  {item.value} Days
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 rounded-xl bg-blue-50 py-2 px-3 flex items-center justify-center gap-4 text-[13px] font-medium text-slate-700">
        <span>
          Department Avg: <span className="font-semibold text-[#1677FF]">89%</span>
        </span>

        <span className="text-gray-300">|</span>

        <span>
          University Avg: <span className="font-semibold text-[#1677FF]">87%</span>
        </span>
      </div>
    </div>
  );
};

export default AttendanceOverview;