
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

const SEMESTER_NAMES = [
  "Sem I",
  "Sem II",
  "Sem III",
  "Sem IV",
  "Sem V",
  "Sem VI",
  "Sem VII",
  "Sem VIII",
];

const getSemesterNumber = (semester) =>
  Number(
    semester?.semesterNumber ??
      semester?.semester ??
      semester?.number ??
      0
  ) || 0;

const getSubjects = (semester) =>
  semester?.subjects ?? semester?.courses ?? [];

const calculateSGPA = (semester) => {
  // Prefer the backend-calculated SGPA.
  const backendSGPA =
    semester?.sgpa ??
    semester?.SGPA ??
    semester?.gpa;

  if (
    backendSGPA !== null &&
    backendSGPA !== undefined &&
    backendSGPA !== ""
  ) {
    const value = Number(backendSGPA);

    return Number.isFinite(value) ? value : null;
  }

  // Fallback for records that contain subjects but no SGPA.
  const subjects = getSubjects(semester);

  if (!Array.isArray(subjects) || subjects.length === 0) {
    return null;
  }

  let totalCredits = 0;
  let weightedPoints = 0;

  subjects.forEach((subject) => {
    const credits = Number(subject?.credits);
    const rawGradePoint = subject?.gradePoint;

    if (
      rawGradePoint === null ||
      rawGradePoint === undefined ||
      rawGradePoint === ""
    ) {
      return;
    }

    const gradePoint = Number(rawGradePoint);

    if (
      !Number.isFinite(credits) ||
      !Number.isFinite(gradePoint) ||
      credits <= 0 ||
      gradePoint < 0 ||
      gradePoint > 10
    ) {
      return;
    }

    totalCredits += credits;
    weightedPoints += credits * gradePoint;
  });

  if (totalCredits === 0) {
    return null;
  }

  return weightedPoints / totalCredits;
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item || !Number.isFinite(item.sgpa)) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-slate-500">
        {item.semester}
      </p>

      <p className="mt-1 text-sm font-bold text-[#0B63F6]">
        SGPA: {item.sgpa.toFixed(2)} / 10
      </p>
    </div>
  );
};

const SGPATrend = ({
  academicData = null,
  maxSGPA = 10,
  loading = false,
  error = "",
}) => {
  const semesters =
    academicData?.semesters ??
    academicData?.data?.semesters ??
    [];

  const scale = maxSGPA === 4 ? 4 : 10;

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

        // Ignore semesters without an academic record.
        if (
          semester?.hasRecord === false ||
          semester?.hasRecord === null
        ) {
          return null;
        }

        const sgpa = calculateSGPA(semester);

        if (
          sgpa === null ||
          !Number.isFinite(sgpa) ||
          sgpa < 0 ||
          sgpa > scale
        ) {
          return null;
        }

        return {
          semester: SEMESTER_NAMES[semesterNumber - 1],
          semesterNumber,
          sgpa: Number(sgpa.toFixed(2)),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.semesterNumber - b.semesterNumber);
  }, [semesters, scale]);

  const ticks =
    scale === 4
      ? [0, 1, 2, 3, 4]
      : [0, 2, 4, 6, 8, 10];

  return (
    <section className="min-h-[270px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-base font-semibold text-[#0B63F6]">
          SGPA Trend
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Semester-wise academic performance
        </p>
      </div>

      {/* Error */}
      {error ? (
        <div
          role="alert"
          className="flex h-[195px] items-center justify-center text-center text-xs text-red-600"
        >
          {error}
        </div>
      ) : loading ? (
        <div className="flex h-[195px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-[195px] items-center justify-center">
          <p className="text-xs text-slate-400">
            No SGPA data available yet.
          </p>
        </div>
      ) : (
        <div className="h-[195px]">
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
                stroke="#E8EEF6"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="semester"
                tick={{
                  fontSize: 10,
                  fill: "#64748B",
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={[0, scale]}
                ticks={ticks}
                allowDecimals={false}
                tick={{
                  fontSize: 10,
                  fill: "#94A3B8",
                }}
                tickLine={false}
                axisLine={false}
                width={30}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#CBD5E1",
                  strokeDasharray: "3 3",
                }}
              />

              <Line
                type="monotone"
                dataKey="sgpa"
                name="SGPA"
                stroke="#0B63F6"
                strokeWidth={2.5}
                connectNulls={false}
                dot={{
                  r: 4,
                  fill: "#0B63F6",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  fill: "#0B63F6",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              >
                <LabelList
                  dataKey="sgpa"
                  position="top"
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
      )}
    </section>
  );
};

export default SGPATrend;
