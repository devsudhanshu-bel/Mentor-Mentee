
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const GRADE_CONFIG = [
  { grade: "O", name: "O (10)", color: "#2563EB" },
  { grade: "A+", name: "A+ (9 - 9.99)", color: "#10B981" },
  { grade: "A", name: "A (8 - 8.99)", color: "#6366F1" },
  { grade: "B+", name: "B+ (7 - 7.99)", color: "#FB923C" },
  { grade: "B", name: "B (6 - 6.99)", color: "#8B5CF6" },
  { grade: "C", name: "C (5 - 5.99)", color: "#EC4899" },
  { grade: "P", name: "P (4 - 4.99)", color: "#14B8A6" },
  { grade: "F", name: "F (Fail)", color: "#EF4444" },
];

const GradeDistribution = ({
  semesterData = null,
  loading = false,
  error = "",
}) => {
  const subjects =
    semesterData?.subjects ??
    semesterData?.courses ??
    semesterData?.data?.subjects ??
    [];

  const data = useMemo(() => {
    const counts = new Map(
      GRADE_CONFIG.map((item) => [item.grade, 0])
    );

    if (Array.isArray(subjects)) {
      subjects.forEach((subject) => {
        const grade = String(subject?.grade ?? "")
          .trim()
          .toUpperCase();

        if (counts.has(grade)) {
          counts.set(grade, counts.get(grade) + 1);
        }
      });
    }

    return GRADE_CONFIG.map((item) => ({
      ...item,
      value: counts.get(item.grade) ?? 0,
    })).filter((item) => item.value > 0);
  }, [subjects]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Grade Distribution
        </h3>

        <p className="text-[10px] text-slate-500">
          Selected semester
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex h-[230px] items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
        </div>
      ) : error ? (
        <div
          role="alert"
          className="flex h-[230px] items-center justify-center text-center text-xs text-red-600"
        >
          {error}
        </div>
      ) : total === 0 ? (
        <div className="flex h-[230px] flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-slate-600">
            No grade data available
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            Grades will appear when course records are available.
          </p>
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="flex justify-center">
            <div className="relative h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={72}
                    paddingAngle={2}
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {data.map((item) => (
                      <Cell
                        key={item.grade}
                        fill={item.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [
                      `${value} course${Number(value) === 1 ? "" : "s"}`,
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      fontSize: "11px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-slate-500">
                  Total
                </span>

                <span className="text-[26px] font-bold text-slate-900">
                  {total}
                </span>

                <span className="text-[10px] text-slate-500">
                  Graded Courses
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 space-y-2">
            {data.map((item) => (
              <div
                key={item.grade}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="truncate text-[10px] text-slate-600">
                    {item.name}
                  </span>
                </div>

                <span className="ml-2 shrink-0 text-[10px] font-semibold text-slate-700">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GradeDistribution;
