import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CATEGORY_COLORS = {
  "Core Subjects": "#0B63F6",
  "Elective Subjects": "#93C5FD",
  "Open Electives": "#F59E0B",
  "Ability Enhancement Courses": "#22C55E",
};

const normalizeCategory = (subject) => {
  const rawCategory =
    subject?.subjectType ?? subject?.type ?? subject?.category ?? "";

  const category = String(rawCategory)
    .trim()
    .toUpperCase()
    .replace(/[-\s]+/g, "_");

  // =========================================================
  // Ability Enhancement Course
  // =========================================================
  if (
    category.includes("ABILITY_ENHANCEMENT") ||
    category.includes("ABILITY_ENHANCEMENT_COURSE") ||
    category === "AEC"
  ) {
    return "Ability Enhancement Courses";
  }

  // =========================================================
  // Open Elective
  // =========================================================
  if (category.includes("OPEN") && category.includes("ELECT")) {
    return "Open Electives";
  }

  // =========================================================
  // Elective
  // =========================================================
  if (category.includes("ELECTIVE")) {
    return "Elective Subjects";
  }

  // =========================================================
  // Core
  // =========================================================
  if (category.includes("CORE") || category === "") {
    return "Core Subjects";
  }

  // =========================================================
  // Fallback
  // =========================================================
  return "Core Subjects";
};

const SubjectsChart = ({ semesterData = null, academicData = null }) => {
  // =========================================================
  // Selected semester
  // =========================================================
  const semester =
    semesterData?.semester ||
    semesterData?.data?.semester ||
    semesterData?.data ||
    semesterData;

  // =========================================================
  // Subjects
  // =========================================================
  const subjects =
    semester?.subjects || semester?.courses || semesterData?.subjects || [];

  // =========================================================
  // Calculate category distribution
  // =========================================================
  const data = useMemo(() => {
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return [];
    }

    const counts = {
      "Core Subjects": 0,
      "Elective Subjects": 0,
      "Open Electives": 0,
      "Ability Enhancement Courses": 0,
    };

    subjects.forEach((subject) => {
      const category = normalizeCategory(subject);

      counts[category] += 1;
    });

    return Object.entries(counts)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value,
        color: CATEGORY_COLORS[name],
      }));
  }, [subjects]);

  // =========================================================
  // Total subjects
  // =========================================================
  const totalSubjects = useMemo(() => {
    return subjects.length;
  }, [subjects]);

  // =========================================================
  // Empty state
  // =========================================================
  if (!totalSubjects) {
    return (
      <div className="h-[220px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-[15px] font-semibold text-[#0B63F6]">
          Subjects
        </h3>

        <div className="flex h-[165px] items-center justify-center">
          <p className="text-[11px] text-slate-400">
            No subject data available yet.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // Main chart
  // =========================================================
  return (
    <div className="h-[220px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <h3 className="mb-3 text-[15px] font-semibold text-[#0B63F6]">
        Subjects
      </h3>

      <div className="flex h-[165px] items-center justify-between">
        {/* ===================================================
            Donut
           =================================================== */}
        <div className="relative h-[150px] w-[150px]">
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
                  <Cell key={`${entry.name}-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* =================================================
              Center
             ================================================= */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[30px] font-bold leading-none text-[#0B3B8F]">
              {totalSubjects}
            </span>

            <span className="mt-1 text-[11px] text-slate-500">
              Total Subjects
            </span>
          </div>
        </div>

        {/* ===================================================
            Legend
           =================================================== */}
        <div className="w-[175px] space-y-3 text-[11px]">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="leading-4 text-slate-700">{item.name}</span>
              </div>

              <span className="shrink-0 font-semibold text-[#0B3B8F]">
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
