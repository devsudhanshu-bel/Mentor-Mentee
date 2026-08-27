import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { semester: "Semester I", cgpa: 7.61 },
  { semester: "Semester II", cgpa: 8.14 },
  { semester: "Semester III", cgpa: 8.45 },
  { semester: "Semester IV", cgpa: 8.72 },
];

const CGPATrend = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm h-[400px]">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-slate-800">
          CGPA Trend
        </h3>

        <button className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600 hover:bg-slate-100">
          All Semesters
          <ChevronDown size={12} />
        </button>
      </div>

      {/* Chart */}
      <div className="h-[300px] pt-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 15,
              left: -18,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="semester"
              tick={{
                fontSize: 10,
                fill: "#64748B",
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 10]}
              tick={{
                fontSize: 10,
                fill: "#64748B",
              }}
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
                r: 4,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey="cgpa"
                position="top"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  fill: "#334155",
                }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CGPATrend;