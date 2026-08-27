import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Core Subjects", value: 93, color: "#2563EB" },
  { name: "Elective Subjects", value: 94, color: "#60A5FA" },
  { name: "Open Electives", value: 95, color: "#67D68D" },
  { name: "Labs / Others", value: 92, color: "#F8C34A" },
];

const AttendanceCategory = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 h-[200px]">
      <h3 className="text-[14px] font-semibold text-blue-600 mb-3">
        Attendance by Category
      </h3>

      <div className="flex items-center justify-between h-[145px]">
        {/* Donut */}
        <div className="w-[140px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={42}
                outerRadius={58}
                stroke="white"
                strokeWidth={2}
              >
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 ml-4 space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-[12px]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                ></span>

                <span className="text-slate-600">{item.name}</span>
              </div>

              <span className="font-semibold text-[#142970]">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCategory;