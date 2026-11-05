
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
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <h2 className="mb-4 text-sm font-semibold text-slate-800 sm:text-base">
        Certificates by Category
      </h2>

      {/* ======================================================
          CHART + LEGEND
      ====================================================== */}

      <div className="flex w-full min-w-0 flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-3">

        {/* ====================================================
            PIE CHART
        ==================================================== */}

        <div className="h-36 w-full max-w-[180px] shrink-0 sm:h-32 sm:w-36 sm:max-w-none md:h-36 md:w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="48%"
                outerRadius="75%"
                paddingAngle={2}
                cx="50%"
                cy="50%"
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ====================================================
            CATEGORY LEGEND
        ==================================================== */}

        <div className="grid w-full min-w-0 grid-cols-1 gap-x-4 gap-y-2 sm:flex-1">

          {data.map((item) => (
            <div
              key={item.name}
              className="flex min-w-0 items-center justify-between gap-2 text-xs"
            >
              {/* CATEGORY NAME */}

              <div className="flex min-w-0 items-center gap-2">

                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="truncate text-slate-600">
                  {item.name}
                </span>

              </div>

              {/* CATEGORY COUNT */}

              <span className="shrink-0 font-semibold tabular-nums text-slate-800">
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
