import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = {
  Present: "#1677FF",
  Absent: "#FF4D4F",
  Leave: "#FFB547",
};

const AttendanceOverview = ({
  attendanceData,
  loading = false,
}) => {
  const attendance = useMemo(() => {
    const held = Number(attendanceData?.classesHeld) || 0;
    const attended = Number(attendanceData?.classesAttended) || 0;

    const missed =
      attendanceData?.classesMissed != null
        ? Math.max(0, Number(attendanceData.classesMissed) || 0)
        : Math.max(0, held - attended);

    const percentage =
      attendanceData?.percentage != null
        ? Number(attendanceData.percentage)
        : held > 0
          ? (attended / held) * 100
          : 0;

    return {
      held,
      attended,
      missed,
      percentage: Math.min(100, Math.max(0, percentage)),
    };
  }, [attendanceData]);

  const chartData = [
    {
      name: "Present",
      value: attendance.attended,
      color: COLORS.Present,
    },
    {
      name: "Absent",
      value: attendance.missed,
      color: COLORS.Absent,
    },
  ].filter((item) => item.value > 0);

  const hasAttendance = attendance.held > 0;

  return (
    <div className="bg-white rounded-[22px] border border-gray-200 shadow-sm p-5 h-[300px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-slate-900">
          Attendance Overview
        </h2>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/attendance";
          }}
          className="text-[#1677ff] text-[13px] font-semibold hover:underline"
        >
          View Details
        </button>
      </div>

      {/* Main */}
      <div className="flex flex-1 items-center justify-between min-h-0">
        {/* Donut */}
        <div className="relative w-[150px] h-[150px] shrink-0">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
              Loading...
            </div>
          ) : hasAttendance ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {chartData.map((item) => (
                      <Cell
                        key={item.name}
                        fill={item.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <h2 className="text-[32px] font-bold text-slate-900">
                  {Math.round(attendance.percentage)}%
                </h2>

                <p className="text-[15px] text-gray-600">
                  Overall
                </p>
              </div>
            </>
          ) : (
            <div className="w-full h-full rounded-full border-[14px] border-slate-100 flex items-center justify-center">
              <span className="text-xs text-slate-400 text-center px-2">
                No data
              </span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {[
            {
              name: "Present",
              value: attendance.attended,
              color: COLORS.Present,
            },
            {
              name: "Absent",
              value: attendance.missed,
              color: COLORS.Absent,
            },
          ].map((item) => (
            <div key={item.name} className="flex items-start gap-3">
              <span
                className="w-3 h-3 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: item.color }}
              />

              <div>
                <p className="font-semibold text-[15px] text-slate-900">
                  {item.name}
                </p>

                <p className="text-[13px] text-gray-500">
                  {loading ? "Loading..." : `${item.value} Classes`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 rounded-xl bg-blue-50 py-2 px-3 flex items-center justify-center gap-3 text-[13px] font-medium text-slate-700">
        {loading ? (
          <span>Loading attendance statistics...</span>
        ) : hasAttendance ? (
          <>
            <span>
              Classes Held:{" "}
              <span className="font-semibold text-[#1677FF]">
                {attendance.held}
              </span>
            </span>

            <span className="text-gray-300">|</span>

            <span>
              Attended:{" "}
              <span className="font-semibold text-[#1677FF]">
                {attendance.attended}
              </span>
            </span>
          </>
        ) : (
          <span>Attendance records are not available yet.</span>
        )}
      </div>
    </div>
  );
};

export default AttendanceOverview;