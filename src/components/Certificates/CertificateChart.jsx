import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Data Science", value: 3, color: "#2563EB" },
  { name: "Machine Learning", value: 3, color: "#10B981" },
  { name: "Cloud Computing", value: 2, color: "#A855F7" },
  { name: "Programming", value: 3, color: "#FB923C" },
  { name: "Business", value: 2, color: "#38BDF8" },
  { name: "Other", value: 1, color: "#94A3B8" },
];

const CertificateChart = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      <h2 className="text-base font-semibold text-slate-800 mb-4">
        Certificates by Category
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
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">

          {data.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center text-xs"
            >
              <div className="flex items-center gap-2">

                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
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

export default CertificateChart;