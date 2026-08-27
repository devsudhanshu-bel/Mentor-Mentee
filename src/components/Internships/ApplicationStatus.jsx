import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Shortlisted", value: 3, color: "#22C55E" },
  { name: "In Review", value: 2, color: "#2563EB" },
  { name: "Applied", value: 3, color: "#93C5FD" },
  { name: "Rejected", value: 0, color: "#EF4444" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const ApplicationStatus = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm h-full">
      {/* Heading */}
      <h2 className="text-[16px] font-semibold text-[#142970] mb-4">
        Application Status
      </h2>

      {/* Chart + Legend */}
      <div className="flex items-center justify-between">
        <PieChart width={170} height={170}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-5 text-[13px]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600">{item.name}</span>
              </div>

              <span className="font-medium text-slate-700">
                {item.value} ({total ? Math.round((item.value / total) * 100) : 0}
                %)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-[13px] text-slate-500">
        Total Applications:
        <span className="font-semibold text-[#142970] ml-1">{total}</span>
      </p>
    </div>
  );
};

export default ApplicationStatus;