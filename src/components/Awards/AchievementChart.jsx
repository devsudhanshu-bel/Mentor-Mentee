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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      <h2 className="text-base font-semibold text-slate-800 mb-4">
        Achievement by Level
      </h2>

      <div className="flex items-center">

        <div className="w-40 h-32">
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
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">

          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">

                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-slate-600">
                  {item.name}
                </span>

              </div>

              <span className="font-semibold text-slate-800">
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