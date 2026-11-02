
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AttendanceTrend = ({ attendanceData }) => {
  const subjects = attendanceData?.subjects || [];

  const data = subjects.map((subject, index) => ({
    subject: subject.courseCode || `Subject ${index + 1}`,
    attendance: Number(subject.percentage) || 0,
  }));

  return (
    <div
      className="
        w-full
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        p-3
        sm:p-4
        min-h-[160px]
        flex
        flex-col
      "
    >
      <h3
        className="
          text-[13px]
          sm:text-[14px]
          font-semibold
          text-blue-600
          mb-2
        "
      >
        Subject Attendance Trend
      </h3>

      {data.length === 0 ? (
        <div
          className="
            flex-1
            min-h-[100px]
            flex
            items-center
            justify-center
            text-[11px]
            text-slate-400
            text-center
          "
        >
          No attendance data available.
        </div>
      ) : (
        <div className="w-full h-[115px] sm:h-[125px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="subject"
                tick={{
                  fontSize: 9,
                }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                angle={-15}
                textAnchor="end"
                height={35}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={{
                  fontSize: 9,
                }}
                tickLine={false}
                axisLine={false}
                width={35}
              />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toFixed(2)}%`,
                  "Attendance",
                ]}
              />

              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AttendanceTrend;
