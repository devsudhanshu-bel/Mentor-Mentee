
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "University Level", value: 3, color: "#3B82F6" },
  { name: "National Level", value: 5, color: "#10B981" },
  { name: "International Level", value: 2, color: "#A855F7" },
  { name: "Department Level", value: 2, color: "#FB923C" },
];

const AchievementChart = () => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <h2 className="mb-4 text-base font-semibold text-slate-800">
        Achievement by Level
      </h2>

      <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-3">
        {/* PIE CHART */}
        <div className="h-36 w-full min-w-0 max-w-[180px] shrink-0 sm:h-32 sm:w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={34}
                outerRadius={52}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}
        <div className="w-full min-w-0 flex-1 space-y-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex min-w-0 items-center justify-between gap-3 text-xs"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="min-w-0 break-words text-slate-600">
                  {item.name}
                </span>
              </div>

              <span className="shrink-0 font-semibold text-slate-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementChart;
