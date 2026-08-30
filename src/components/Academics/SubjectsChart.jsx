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
      <div className="h-[215px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
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
  // MAIN CHART
  // =========================================================

  return (
    <div className="h-[215px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* =====================================================
          HEADER
         ===================================================== */}

      <h3 className="mb-2 text-[15px] font-semibold text-[#0B63F6]">
        Subjects
      </h3>

      <div className="flex h-[165px] items-center justify-between">
        {/* ===================================================
            DONUT
           =================================================== */}

        <div className="relative h-[130px] w-[130px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"

                /*
                 * Reduced from:
                 * innerRadius={48}
                 * outerRadius={72}
                 *
                 * This gives the donut more breathing
                 * room inside the card.
                 */
                innerRadius={42}
                outerRadius={60}

                paddingAngle={2}
                stroke="none"
                cx="50%"
                cy="50%"
              >
                {data.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* =================================================
              CENTER VALUE
             ================================================= */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[27px] font-bold leading-none text-[#0B3B8F]">
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

        <div className="w-[165px] space-y-3 text-[11px]">
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
