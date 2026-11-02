
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CATEGORY_COLORS = {
  "Core Subjects": "#0B63F6",
  "Elective Subjects": "#93C5FD",
  "Open Electives": "#F59E0B",
  "Ability Enhancement Courses": "#22C55E",
};

// =========================================================
// NORMALIZE SUBJECT CATEGORY
// =========================================================

const normalizeCategory = (subject) => {
  const rawCategory =
    subject?.subjectType ?? subject?.type ?? subject?.category ?? "";

  const category = String(rawCategory)
    .trim()
    .toUpperCase()
    .replace(/[-\s]+/g, "_");

  if (
    category.includes("ABILITY_ENHANCEMENT") ||
    category.includes("ABILITY_ENHANCEMENT_COURSE") ||
    category === "AEC"
  ) {
    return "Ability Enhancement Courses";
  }

  if (category.includes("OPEN") && category.includes("ELECT")) {
    return "Open Electives";
  }

  if (category.includes("ELECTIVE")) {
    return "Elective Subjects";
  }

  if (category.includes("CORE") || category === "") {
    return "Core Subjects";
  }

  return "Core Subjects";
};

// =========================================================
// COMPONENT
// =========================================================

const SubjectsChart = ({ semesterData = null, academicData = null }) => {
  // =========================================================
  // SELECTED SEMESTER
  // =========================================================

  const semester =
    semesterData?.semester ||
    semesterData?.data?.semester ||
    semesterData?.data ||
    semesterData;

  // =========================================================
  // SUBJECTS
  // =========================================================

  const subjects =
    semester?.subjects || semester?.courses || semesterData?.subjects || [];

  // =========================================================
  // CATEGORY DISTRIBUTION
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
  // TOTAL SUBJECTS
  // =========================================================

  const totalSubjects = useMemo(() => {
    return subjects.length;
  }, [subjects]);

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!totalSubjects) {
    return (
      <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-[#0B63F6] sm:text-[15px]">
          Subjects
        </h3>

        <div className="flex min-h-[150px] items-center justify-center">
          <p className="text-center text-xs text-slate-400">
            No subject data available yet.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN CHART
  // =========================================================

  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* =====================================================
          HEADER
         ===================================================== */}

      <h3 className="mb-3 text-sm font-semibold text-[#0B63F6] sm:text-[15px]">
        Subjects
      </h3>

      {/* =====================================================
          CHART CONTENT
         ===================================================== */}

      <div className="flex min-h-[150px] flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-3">

        {/* ===================================================
            DONUT
           =================================================== */}

        <div className="relative h-[135px] w-[135px] shrink-0 sm:h-[140px] sm:w-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={42}
                outerRadius={60}
                paddingAngle={2}
                stroke="none"
                cx="50%"
                cy="50%"
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

          {/* =================================================
              CENTER VALUE
             ================================================= */}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[26px] font-bold leading-none text-[#0B3B8F] sm:text-[27px]">
              {totalSubjects}
            </span>

            <span className="mt-1 text-[10px] text-slate-500">
              Total Subjects
            </span>
          </div>
        </div>

        {/* ===================================================
            LEGEND
           =================================================== */}

        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-3 text-[11px] sm:w-auto sm:min-w-[150px] sm:max-w-[180px] sm:flex-1 sm:gap-y-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex min-w-0 items-center justify-between gap-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="min-w-0 break-words leading-4 text-slate-700">
                  {item.name}
                </span>
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
