
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
      semester?.semesterNumber ??
        semester?.semester ??
        semester?.number ??
        0,
    ) || 0
  );
};

const getSubjects = (semester) => {
  return semester?.subjects || semester?.courses || [];
};

const calculateSGPA = (semester) => {
  // Use backend SGPA when available
  const backendSGPA =
    semester?.sgpa ?? semester?.SGPA ?? semester?.gpa;

  if (
    backendSGPA !== null &&
    backendSGPA !== undefined &&
    backendSGPA !== ""
  ) {
    const value = Number(backendSGPA);
    return Number.isFinite(value) ? value : null;
  }

  // Calculate weighted SGPA
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
  // Extract semester records
  const semesters =
    academicData?.semesters ||
    academicData?.data?.semesters ||
    [];

  // Build chart data
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

        if (semester?.hasRecord === false) {
          return null;
        }

        const sgpa = calculateSGPA(semester);

        if (sgpa === null || !Number.isFinite(sgpa)) {
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

  // Empty state
  if (!data.length) {
    return (
      <div className="flex h-full min-h-[220px] min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="text-sm font-semibold text-[#0B63F6] sm:text-[15px]">
          SGPA Trend
        </h3>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <span className="text-lg font-bold text-blue-300">∿</span>
          </div>

          <p className="text-xs font-medium text-slate-500">
            No SGPA data available yet.
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Your semester performance trend will appear here.
          </p>
        </div>
      </div>
    );
  }

  // Chart
  return (
    <div className="h-full min-h-[220px] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* HEADER */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-[#0B63F6] sm:text-[15px]">
            SGPA Trend
          </h3>

          <p className="mt-0.5 text-[10px] text-slate-400 sm:text-[11px]">
            Semester-wise academic performance
          </p>
        </div>

        <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
          4.0 Scale
        </span>
      </div>

      {/* CHART */}
      <div className="h-[165px] w-full min-w-0 sm:h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 22,
              right: 12,
              left: -18,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#EEF2F7"
              strokeDasharray="3 3"
            />

            {/* X AXIS */}
            <XAxis
              dataKey="semester"
              interval={0}
              tick={{
                fontSize: 10,
                fill: "#64748B",
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            {/* Y AXIS */}
            <YAxis
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              width={32}
              tick={{
                fontSize: 10,
                fill: "#94A3B8",
              }}
              tickLine={false}
              axisLine={false}
            />

            {/* SGPA LINE */}
            <Line
              type="monotone"
              dataKey="sgpa"
              stroke="#0B63F6"
              strokeWidth={2.5}
              connectNulls={false}
              dot={{
                r: 4,
                fill: "#0B63F6",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#0B63F6",
                stroke: "#DBEAFE",
                strokeWidth: 3,
              }}
              isAnimationActive={true}
              animationDuration={700}
            >
              <LabelList
                dataKey="sgpa"
                position="top"
                offset={9}
                formatter={(value) => Number(value).toFixed(2)}
                style={{
                  fontSize: 10,
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
