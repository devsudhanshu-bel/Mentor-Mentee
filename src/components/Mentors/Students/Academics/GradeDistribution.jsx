import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  {
    name: "A+ (9 - 10)",
    value: 18,
    color: "#2563EB",
  },
  {
    name: "A (8 - 8.99)",
    value: 14,
    color: "#10B981",
  },
  {
    name: "B+ (7 - 7.99)",
    value: 6,
    color: "#FB923C",
  },
  {
    name: "B (6 - 6.99)",
    value: 2,
    color: "#8B5CF6",
  },
  {
    name: "Below 6",
    value: 0,
    color: "#EF4444",
  },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const GradeDistribution = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm h-full">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Grade Distribution
        </h3>

        <p className="text-[10px] text-slate-500">
          All Semesters
        </p>
      </div>

      {/* Chart */}
      <div className="flex justify-center">
        <div className="relative h-[180px] w-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-slate-500">
              Total
            </span>

            <span className="text-[26px] font-bold text-slate-900">
              {total}
            </span>

            <span className="text-[10px] text-slate-500">
              Courses
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="truncate text-[10px] text-slate-600">
                {item.name}
              </span>
            </div>

            <span className="ml-2 shrink-0 text-[10px] font-semibold text-slate-700">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeDistribution;