import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { semester: "Sem I", cgpa: 7.61 },
  { semester: "Sem II", cgpa: 8.14 },
  { semester: "Sem III", cgpa: 8.45 },
  { semester: "Sem IV", cgpa: 8.72 },
];

const AcademicProgress = () => {
  return (
    <div className="col-span-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Academic Progress
        </h3>

        <button className="text-[11px] font-medium text-blue-600 hover:text-blue-700">
          View Details
        </button>
      </div>

      <p className="mb-2 text-[11px] font-medium text-slate-500">
        CGPA Trend
      </p>

      <div className="h-[165px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="semester"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 10]}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="cgpa"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{
                r: 3,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AcademicProgress;