import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const data = [
  { name: "A+", value: 1, color: "#0B63F6" },
  { name: "A", value: 5, color: "#3B82F6" },
  { name: "A-", value: 2, color: "#93C5FD" },
  { name: "B+", value: 1, color: "#F59E0B" },
  { name: "Others", value: 0, color: "#FDBA74" },
];

const GradeDistribution = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <PieChartIcon
          size={16}
          className="text-[#0B63F6]"
          strokeWidth={2}
        />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Grade Distribution
        </h3>
      </div>

      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="w-[110px] h-[110px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={34}
                outerRadius={52}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
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

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-slate-600">
                  {item.name}
                </span>
              </div>

              <span className="font-medium text-slate-700">
                ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeDistribution;