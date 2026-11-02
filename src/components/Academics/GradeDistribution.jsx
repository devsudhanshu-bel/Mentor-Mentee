
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const GRADE_COLORS = {
  O: "#0B63F6",
  "A+": "#3B82F6",
  A: "#60A5FA",
  "A-": "#93C5FD",
  "B+": "#F59E0B",
  B: "#FBBF24",
  "B-": "#FCD34D",
  C: "#F59E0B",
  P: "#FB923C",
  F: "#EF4444",
};

const GradeDistribution = ({ semesterData = null }) => {
  const semester =
    semesterData?.semester ||
    semesterData?.data?.semester ||
    semesterData?.data ||
    semesterData;

  const subjects = semester?.subjects || semesterData?.subjects || [];

  const data = useMemo(() => {
    const counts = {};

    subjects.forEach((subject) => {
      const grade = String(subject?.grade || "").trim();

      if (!grade) return;

      counts[grade] = (counts[grade] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: GRADE_COLORS[name] || "#CBD5E1",
    }));
  }, [subjects]);

  return (
    <div className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* HEADER */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <PieChartIcon
            size={16}
            className="text-[#0B63F6]"
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#0B3B8F] sm:text-[15px]">
            Grade Distribution
          </h3>

          <p className="mt-0.5 text-[10px] text-slate-400 sm:text-[11px]">
            Subject-wise grade breakdown
          </p>
        </div>
      </div>

      {/* EMPTY STATE */}
      {!data.length ? (
        <div className="flex min-h-[140px] flex-col items-center justify-center rounded-xl bg-slate-50 px-4 text-center">
          <PieChartIcon size={25} className="mb-2 text-slate-300" />

          <p className="text-xs font-medium text-slate-500">
            No grade data available
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Grades will appear once academic records are available.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          {/* DONUT CHART */}
          <div className="relative h-[140px] w-[140px] shrink-0 sm:h-[125px] sm:w-[125px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="62%"
                  outerRadius="88%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* CENTER VALUE */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-[#142970]">
                {data.reduce((total, item) => total + item.value, 0)}
              </span>

              <span className="text-[10px] text-slate-400">
                Subjects
              </span>
            </div>
          </div>

          {/* LEGEND */}
          <div
            className={`grid w-full gap-x-4 gap-y-2 sm:flex-1 ${
              data.length > 5 ? "grid-cols-2 sm:grid-cols-1" : "grid-cols-2 sm:grid-cols-1"
            }`}
          >
            {data.map((item) => (
              <div
                key={item.name}
                className="flex min-w-0 items-center justify-between gap-2 text-[11px]"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="truncate font-medium text-slate-600">
                    {item.name}
                  </span>
                </div>

                <span className="shrink-0 font-semibold tabular-nums text-slate-700">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeDistribution;
