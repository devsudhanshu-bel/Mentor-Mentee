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
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <PieChartIcon size={16} className="text-[#0B63F6]" strokeWidth={2} />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Grade Distribution
        </h3>
      </div>

      {!data.length ? (
        <div className="flex h-[110px] items-center justify-center">
          <p className="text-[11px] text-slate-400">No grade data available</p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {/* Donut */}
          <div className="h-[110px] w-[110px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={34}
                  outerRadius={52}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="text-slate-600">{item.name}</span>
                </div>

                <span className="font-medium text-slate-700">
                  ({item.value})
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
