import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

const data = [
  { semester: "Sem I", sgpa: 7.61 },
  { semester: "Sem II", sgpa: 8.14 },
  { semester: "Sem III", sgpa: 8.45 },
  { semester: "Sem IV", sgpa: 8.72 },
  { semester: "Sem V", sgpa: 8.78 },
];

const SGPATrend = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 h-[215px]">
      {/* Header */}
      <h3 className="text-[15px] font-semibold text-[#0B63F6] mb-2">
        SGPA Trend
      </h3>

      <div className="h-[165px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 15,
              left: -20,
              bottom: -5,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EEF2F7"
            />

            <XAxis
              dataKey="semester"
              tick={{
                fontSize: 11,
                fill: "#64748B",
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[6, 10]}
              ticks={[6, 7, 8, 9, 10]}
              tick={{
                fontSize: 10,
                fill: "#94A3B8",
              }}
              tickLine={false}
              axisLine={false}
            />

            <Line
              type="monotone"
              dataKey="sgpa"
              stroke="#0B63F6"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#0B63F6",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 5,
              }}
            >
              <LabelList
                dataKey="sgpa"
                position="top"
                offset={10}
                style={{
                  fontSize: 11,
                  fill: "#0F172A",
                  fontWeight: 600,
                }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SGPATrend;