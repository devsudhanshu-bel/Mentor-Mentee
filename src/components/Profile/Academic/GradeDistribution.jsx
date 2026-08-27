import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "A+",
    value: 1,
    color: "#2563EB",
  },
  {
    name: "A",
    value: 4,
    color: "#3B82F6",
  },
  {
    name: "A-",
    value: 2,
    color: "#60A5FA",
  },
  {
    name: "B+",
    value: 1,
    color: "#93C5FD",
  },
];

const GradeDistribution = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 h-full">

      {/* Header */}

      <h3 className="text-base font-semibold text-slate-800 mb-4">
        Grade Distribution
      </h3>

      {/* Chart */}

      <div className="h-[220px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              iconType="circle"
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="mt-3 grid grid-cols-2 gap-2">

        <div className="flex justify-between text-[12px]">
          <span className="text-slate-500">
            Highest Grade
          </span>

          <span className="font-semibold">
            A+
          </span>
        </div>

        <div className="flex justify-between text-[12px]">
          <span className="text-slate-500">
            Average Grade
          </span>

          <span className="font-semibold">
            A
          </span>
        </div>

      </div>

    </div>
  );
};

export default GradeDistribution;