import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-xs font-semibold text-blue-600">
        SGPA: {Number(payload[0].value).toFixed(2)}
      </p>
    </div>
  );
};

const CGPATrend = ({ dashboardData, loading = false }) => {
  const data = useMemo(() => {
    const trend = dashboardData?.sgpaTrend;

    if (!Array.isArray(trend)) return [];

    return trend
      .map((item) => {
        const semesterNumber =
          Number(item.semesterNumber) ||
          Number(String(item.semester ?? "").replace(/\D/g, ""));

        const sgpa = Number(item.sgpa);

        if (
          !Number.isFinite(semesterNumber) ||
          semesterNumber < 1 ||
          !Number.isFinite(sgpa) ||
          sgpa < 0 ||
          sgpa > 10
        ) {
          return null;
        }

        return {
          semester: `Sem ${["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][semesterNumber - 1] ?? semesterNumber}`,
          sgpa,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const getNumber = (item) =>
          Number(item.semesterNumber) ||
          Number(item.semester.replace(/\D/g, ""));

        return getNumber(a) - getNumber(b);
      });
  }, [dashboardData]);

  return (
    <div className="bg-white rounded-[22px] border border-gray-200 shadow-sm p-5 h-[300px] w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-slate-900">
          SGPA Trend
        </h2>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/academic-records";
          }}
          className="text-[13px] font-semibold text-[#1677ff] hover:underline"
        >
          View Details
        </button>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">
            Loading academic records...
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-sm text-slate-400">
            <p>No semester results available yet.</p>
            <p className="mt-1 text-xs">
              Your academic trend will appear here when results are available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 18,
                right: 8,
                left: -25,
                bottom: -5,
              }}
            >
              <defs>
                <linearGradient
                  id="cgpaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#1677ff"
                    stopOpacity={0.18}
                  />
                  <stop
                    offset="100%"
                    stopColor="#1677ff"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#EDF2F7"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="semester"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 11,
                }}
              />

              <YAxis
                domain={[0, 10]}
                ticks={[0, 3, 6, 9, 10]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 11,
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="sgpa"
                stroke="#1677ff"
                strokeWidth={2.5}
                fill="url(#cgpaGradient)"
                connectNulls={false}
                dot={{
                  r: 3.5,
                  fill: "#1677ff",
                  stroke: "#1677ff",
                }}
                activeDot={{
                  r: 5,
                  fill: "#1677ff",
                }}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    fill="#1E293B"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {Number(value).toFixed(2)}
                  </text>
                )}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CGPATrend;