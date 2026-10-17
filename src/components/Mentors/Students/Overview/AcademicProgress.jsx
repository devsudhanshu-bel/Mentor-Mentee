import React, { useMemo } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AcademicProgress = ({
  academicProgress = [],
  student,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // ==========================================================
  // ROLE DETECTION
  // ==========================================================

  const isAdminRoute = location.pathname.startsWith(
    "/admin/overview/students/",
  );

  // ==========================================================
  // PREPARE ACADEMIC CHART DATA
  // ==========================================================

  const data = useMemo(() => {
    if (!Array.isArray(academicProgress)) {
      return [];
    }

    return [...academicProgress]
      .filter(
        (semester) =>
          semester.sgpa !== null &&
          semester.sgpa !== undefined &&
          Number.isFinite(Number(semester.sgpa)),
      )
      .sort(
        (a, b) =>
          Number(a.semesterNumber) -
          Number(b.semesterNumber),
      )
      .map((semester) => ({
        semester: `Sem ${semester.semesterNumber}`,
        sgpa: Number(semester.sgpa),
      }));
  }, [academicProgress]);

  // ==========================================================
  // VIEW ACADEMIC DETAILS
  // ==========================================================

  const handleViewDetails = () => {
    if (!id) {
      console.error(
        "Cannot open academic details: Student ID is missing.",
      );
      return;
    }

    if (isAdminRoute) {
      navigate(`/admin/mentor/student/${id}/academics`);
      return;
    }

    navigate(`/mentor/students/${id}/academics`);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="col-span-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Academic Progress
        </h3>

        <button
          type="button"
          onClick={handleViewDetails}
          disabled={!id}
          className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          View Details
        </button>
      </div>

      {/* Chart Description */}
      <p className="mb-2 text-[11px] font-medium text-slate-500">
        Semester SGPA Trend
      </p>

      {/* Academic Chart */}
      <div className="h-[165px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
              />

              <XAxis
                dataKey="semester"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={[0, 10]}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  Number(value).toFixed(2),
                  "SGPA",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sgpa"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: "#2563EB",
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-xs text-slate-400">
              No academic records available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicProgress;