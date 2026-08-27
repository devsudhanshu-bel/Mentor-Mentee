import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Core Subjects",
    value: 6,
    color: "#0B63F6",
  },
  {
    name: "Elective Subjects",
    value: 1,
    color: "#93C5FD",
  },
  {
    name: "Open Electives",
    value: 1,
    color: "#F59E0B",
  },
];

const SubjectsChart = () => {
  const totalSubjects = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 h-[220px]">
      {/* Header */}
      <h3 className="text-[15px] font-semibold text-[#0B63F6] mb-3">
        Subjects
      </h3>

      <div className="flex items-center justify-between h-[165px]">
        {/* Donut Chart */}
        <div className="relative w-[150px] h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
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

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[30px] font-bold text-[#0B3B8F] leading-none">
              {totalSubjects}
            </span>

            <span className="text-[11px] text-slate-500 mt-1">
              Total Subjects
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4 text-[12px] w-[160px]">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-slate-700">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold text-[#0B3B8F]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsChart;