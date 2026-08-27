import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  {
    semester: "Sem I",
    attendance: 88,
  },
  {
    semester: "Sem II",
    attendance: 91,
  },
  {
    semester: "Sem III",
    attendance: 93,
  },
  {
    semester: "Sem IV",
    attendance: 94,
  },
];

const AttendanceTrend = () => {
  return (
    <div className="h-[380px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm pb-50">
      {/* ================= Header ================= */}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-blue-600">
          Attendance Trend
        </h2>

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50">
          All Semesters
          <ChevronDown size={14} />
        </button>
      </div>

      {/* ================= Chart ================= */}

      <ResponsiveContainer width="100%" height={220} >
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="attendanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563EB"
                stopOpacity={0.22}
              />

              <stop
                offset="100%"
                stopColor="#2563EB"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#E5E7EB"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="semester"
            tick={{
              fontSize: 11,
              fill: "#64748B",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{
              fontSize: 10,
              fill: "#64748B",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [`${value}%`, "Attendance"]}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              fontSize: "12px",
            }}
          />

          <Area
            type="monotone"
            dataKey="attendance"
            stroke="#2563EB"
            strokeWidth={2.5}
            fill="url(#attendanceGradient)"
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "#FFFFFF",
              stroke: "#2563EB",
            }}
            activeDot={{
              r: 5,
            }}
          >
            <LabelList
              dataKey="attendance"
              position="top"
              formatter={(value) => `${value}%`}
              style={{
                fill: "#1E3A8A",
                fontSize: 11,
                fontWeight: 600,
              }}
            />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceTrend;