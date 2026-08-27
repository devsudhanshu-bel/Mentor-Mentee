import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  {
    name: "Core Subjects",
    value: 93,
    color: "#2563EB",
  },
  {
    name: "Elective Subjects",
    value: 94,
    color: "#60A5FA",
  },
  {
    name: "Open Electives",
    value: 95,
    color: "#22C55E",
  },
  {
    name: "Labs / Others",
    value: 92,
    color: "#F59E0B",
  },
];

const AttendanceCategory = () => {
  return (
    <div className="h-[260px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Heading ================= */}
      <h2 className="mb-4 text-[13px] font-semibold text-blue-600">
        Attendance by Category
      </h2>

      <div className="flex h-[190px] items-center justify-between gap-4">
        {/* ================= Donut Chart ================= */}
        <div className="h-[125px] w-[125px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={40}
                outerRadius={56}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ================= Legend ================= */}
        <div className="flex-1 space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-[11px] text-slate-600">
                  {item.name}
                </span>
              </div>

              <span className="text-[12px] font-semibold text-slate-700">
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