import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { sem: "Sem I", attendance: 91 },
  { sem: "Sem II", attendance: 89 },
  { sem: "Sem III", attendance: 92 },
  { sem: "Sem IV", attendance: 93 },
  { sem: "Sem V", attendance: 94 },
];

const AttendanceTrend = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 h-[145px]">
      <h3 className="text-[14px] font-semibold text-blue-600 mb-2">
        Attendance Trend
      </h3>

      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data}>
          <XAxis
            dataKey="sem"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Line
            dataKey="attendance"
            stroke="#2563EB"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceTrend;