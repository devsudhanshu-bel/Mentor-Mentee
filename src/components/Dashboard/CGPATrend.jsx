import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
  { semester: "Sem V", cgpa: 8.92 },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs font-semibold text-blue-600">
        CGPA: {payload[0].value}
      </p>
    </div>
  );
};

const CGPATrend = () => {
  return (
    <div className="bg-white rounded-[22px] border border-gray-200 shadow-sm p-5 h-[300px] w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-slate-900">
          CGPA Trend
        </h2>

        <button className="text-[13px] font-semibold text-[#1677ff] hover:underline">
          View Details
        </button>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 12,
              right: 5,
              left: -25,
              bottom: -5,
            }}
          >
            <defs>
              <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1677ff" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#1677ff" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#EDF2F7"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="semester"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 11,
              }}
            />

            <YAxis
              domain={[0, 10]}
              ticks={[0, 3, 6, 9, 10]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 11,
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="cgpa"
              stroke="#1677ff"
              strokeWidth={2.5}
              fill="url(#cgpaGradient)"
              dot={{
                r: 3.5,
                fill: "#1677ff",
                stroke: "#1677ff",
              }}
              activeDot={{
                r: 5,
                fill: "#1677ff",
              }}
              label={({ x, y, value }) => (
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fill="#1E293B"
                  fontSize="10"
                  fontWeight="600"
                >
                  {value}
                </text>
              )}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CGPATrend;