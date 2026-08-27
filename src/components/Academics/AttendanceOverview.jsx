import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { CalendarCheck2 } from "lucide-react";

const data = [
  {
    name: "Attendance",
    value: 92,
    fill: "#0B63F6",
  },
];

const AttendanceOverview = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <CalendarCheck2
          size={16}
          className="text-[#0B63F6]"
        />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Attendance Overview
        </h3>
      </div>

      <div className="flex items-center justify-between">
        {/* Circular Progress */}
        <div className="relative w-[95px] h-[95px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="100%"
              barSize={8}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                background
                clockWise
                dataKey="value"
                cornerRadius={20}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[18px] font-bold text-[#0B3B8F]">
              92%
            </span>

            <span className="text-[9px] text-slate-500 text-center leading-tight">
              Overall
              <br />
              Attendance
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 text-[11px] w-[120px]">
          <div className="flex justify-between">
            <span className="text-slate-500">
              Classes Attended
            </span>

            <span className="font-semibold text-[#0B3B8F]">
              92
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Classes Held
            </span>

            <span className="font-semibold text-[#0B3B8F]">
              100
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Total Subjects
            </span>

            <span className="font-semibold text-[#0B3B8F]">
              8
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;