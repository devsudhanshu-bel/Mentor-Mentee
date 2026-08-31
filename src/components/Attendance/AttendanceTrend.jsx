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
      bg-white
      border
      border-slate-200
      rounded-2xl
      shadow-sm
      p-4
      h-[145px]
    "
    >
      <h3
        className="
        text-[14px]
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
          h-[100px]
          flex
          items-center
          justify-center
          text-[11px]
          text-slate-400
        "
        >
          No attendance data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={100}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="subject"
              tick={{
                fontSize: 9,
              }}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={30}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fontSize: 9,
              }}
              tickLine={false}
              axisLine={false}
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
      )}
    </div>
  );
};

export default AttendanceTrend;
