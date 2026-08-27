import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 28,
    color: "#2563EB",
  },
  {
    name: "Pending",
    value: 2,
    color: "#E5E7EB",
  },
];

const CourseStatus = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 h-full">

      {/* Header */}

      <h3 className="text-base font-semibold text-slate-800 mb-4">
        Course Status
      </h3>

      {/* Donut Chart */}

      <div className="relative h-[220px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={78}
              startAngle={90}
              endAngle={-270}
              paddingAngle={3}
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

        {/* Center */}

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            pointer-events-none
          "
        >
          <span className="text-3xl font-bold text-slate-800">
            28
          </span>

          <span className="text-[12px] text-slate-500">
            Completed
          </span>
        </div>

      </div>

      {/* Legend */}

      <div className="space-y-3 mt-2">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-blue-600"></span>

            <span className="text-[13px] text-slate-600">
              Completed
            </span>

          </div>

          <span className="font-semibold text-[13px]">
            28
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-slate-300"></span>

            <span className="text-[13px] text-slate-600">
              Pending
            </span>

          </div>

          <span className="font-semibold text-[13px]">
            2
          </span>

        </div>

        <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between">

          <span className="text-[13px] text-slate-600">
            Completion Rate
          </span>

          <span className="font-semibold text-blue-600">
            93%
          </span>

        </div>

      </div>

    </div>
  );
};

export default CourseStatus;