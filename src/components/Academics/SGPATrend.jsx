import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

const semesterNames = [
  "Sem I",
  "Sem II",
  "Sem III",
  "Sem IV",
  "Sem V",
  "Sem VI",
  "Sem VII",
  "Sem VIII",
];

const getSemesterNumber = (semester) => {
  return (
    Number(
      semester?.semesterNumber ?? semester?.semester ?? semester?.number ?? 0,
    ) || 0
  );
};

const getSubjects = (semester) => {
  return semester?.subjects || semester?.courses || [];
};

const calculateSGPA = (semester) => {
  // ---------------------------------------------------------
  // If backend already provides SGPA, use it.
  // ---------------------------------------------------------
  const backendSGPA = semester?.sgpa ?? semester?.SGPA ?? semester?.gpa;

  if (backendSGPA !== null && backendSGPA !== undefined && backendSGPA !== "") {
    return Number(backendSGPA);
  }

  // ---------------------------------------------------------
  // Otherwise calculate:
  //
  // SGPA =
  // Σ(Credits × Grade Point)
  // ------------------------
  //       Σ Credits
  // ---------------------------------------------------------
  const subjects = getSubjects(semester);

  if (!Array.isArray(subjects) || !subjects.length) {
    return null;
  }

  let totalCredits = 0;
  let weightedPoints = 0;

  subjects.forEach((subject) => {
    const credits = Number(subject?.credits || 0);

    const gradePoint = Number(subject?.gradePoint || 0);

    if (credits > 0) {
      totalCredits += credits;

      weightedPoints += credits * gradePoint;
    }
  });

  if (totalCredits === 0) {
    return null;
  }

  return weightedPoints / totalCredits;
};

const SGPATrend = ({ academicData = null }) => {
  // =========================================================
  // Extract semester records
  // =========================================================
  const semesters =
    academicData?.semesters || academicData?.data?.semesters || [];

  // =========================================================
  // Build chart data
  // =========================================================
  const data = useMemo(() => {
    if (!Array.isArray(semesters)) {
      return [];
    }

    return semesters
      .map((semester) => {
        const semesterNumber = getSemesterNumber(semester);

        if (semesterNumber < 1 || semesterNumber > 8) {
          return null;
        }

        // Only show semesters that have records.
        if (semester?.hasRecord === false) {
          return null;
        }

        const sgpa = calculateSGPA(semester);

        if (sgpa === null) {
          return null;
        }

        return {
          semester: semesterNames[semesterNumber - 1],

          semesterNumber,

          sgpa: Number(Number(sgpa).toFixed(2)),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.semesterNumber - b.semesterNumber);
  }, [semesters]);

  // =========================================================
  // Empty state
  // =========================================================
  if (!data.length) {
    return (
      <div className="h-[215px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-[15px] font-semibold text-[#0B63F6]">
          SGPA Trend
        </h3>

        <div className="flex h-[165px] items-center justify-center">
          <p className="text-[11px] text-slate-400">
            No SGPA data available yet.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // Chart
  // =========================================================
  return (
    <div className="h-[215px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <h3 className="mb-2 text-[15px] font-semibold text-[#0B63F6]">
        SGPA Trend
      </h3>

      <div className="h-[165px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 15,
              left: -20,
              bottom: -5,
            }}
          >
            <CartesianGrid vertical={false} stroke="#EEF2F7" />

            {/* X Axis */}
            <XAxis
              dataKey="semester"
              tick={{
                fontSize: 11,
                fill: "#64748B",
              }}
              tickLine={false}
              axisLine={false}
            />

            {/* Y Axis - 4 Point Scale */}
            <YAxis
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tick={{
                fontSize: 10,
                fill: "#94A3B8",
              }}
              tickLine={false}
              axisLine={false}
            />

            {/* SGPA Line */}
            <Line
              type="monotone"
              dataKey="sgpa"
              stroke="#0B63F6"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#0B63F6",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 5,
              }}
            >
              <LabelList
                dataKey="sgpa"
                position="top"
                offset={10}
                formatter={(value) => Number(value).toFixed(2)}
                style={{
                  fontSize: 11,
                  fill: "#0F172A",
                  fontWeight: 600,
                }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SGPATrend;
