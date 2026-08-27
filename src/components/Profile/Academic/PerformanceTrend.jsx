import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const trendData = [
  {
    semester: "Sem I",
    sgpa: 7.52,
  },
  {
    semester: "Sem II",
    sgpa: 7.94,
  },
  {
    semester: "Sem III",
    sgpa: 8.23,
  },
  {
    semester: "Sem IV",
    sgpa: 8.61,
  },
  {
    semester: "Sem V",
    sgpa: 8.78,
  },
];

const PerformanceTrend = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 h-full">

      {/* Header */}

      <div className="flex items-center justify-between mb-4">

        <h3 className="text-base font-semibold text-slate-800">
          Performance Trend
        </h3>

        <span className="text-[12px] text-blue-600 font-medium">
          SGPA
        </span>

      </div>

      {/* Chart */}

      <div className="h-[220px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={trendData}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="semester"
              tick={{
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[7, 9]}
              tick={{
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sgpa"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 7,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="mt-3 flex items-center justify-between text-[12px]">

        <span className="text-slate-500">
          Current SGPA
        </span>

        <span className="font-semibold text-blue-600">
          8.78
        </span>

      </div>

    </div>
  );
};

export default PerformanceTrend;