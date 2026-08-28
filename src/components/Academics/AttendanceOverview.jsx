import React, { useMemo } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { CalendarCheck2 } from "lucide-react";

const AttendanceOverview = ({ semesterData = null }) => {
  const semester =
    semesterData?.semester ||
    semesterData?.data?.semester ||
    semesterData?.data ||
    semesterData;

  const subjects = semester?.subjects || semesterData?.subjects || [];

  const attendanceData = useMemo(() => {
    const validSubjects = subjects.filter(
      (subject) =>
        subject?.attendance !== null &&
        subject?.attendance !== undefined &&
        subject?.attendance !== "",
    );

    if (!validSubjects.length) {
      return {
        percentage: null,
        attended: null,
        held: null,
        subjects: subjects.length,
      };
    }

    const totalAttendance = validSubjects.reduce(
      (sum, subject) => sum + Number(subject.attendance),
      0,
    );

    const percentage = totalAttendance / validSubjects.length;

    return {
      percentage: Number(percentage.toFixed(1)),
      attended: null,
      held: null,
      subjects: subjects.length,
    };
  }, [subjects]);

  const chartData =
    attendanceData.percentage !== null
      ? [
          {
            name: "Attendance",
            value: attendanceData.percentage,
            fill: "#0B63F6",
          },
        ]
      : [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <CalendarCheck2 size={16} className="text-[#0B63F6]" />

        <h3 className="text-[15px] font-semibold text-[#0B3B8F]">
          Attendance Overview
        </h3>
      </div>

      {attendanceData.percentage === null ? (
        <div className="flex min-h-[120px] items-center justify-center">
          <p className="text-[11px] text-slate-400">
            No attendance data available
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {/* Circular Progress */}
          <div className="relative h-[95px] w-[95px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="100%"
                barSize={8}
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={20}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[18px] font-bold text-[#0B3B8F]">
                {attendanceData.percentage}%
              </span>

              <span className="text-center text-[9px] leading-tight text-slate-500">
                Overall
                <br />
                Attendance
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="w-[120px] space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Classes Attended</span>

              <span className="font-semibold text-[#0B3B8F]">
                {attendanceData.attended ?? "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Classes Held</span>

              <span className="font-semibold text-[#0B3B8F]">
                {attendanceData.held ?? "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Total Subjects</span>

              <span className="font-semibold text-[#0B3B8F]">
                {attendanceData.subjects}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceOverview;
