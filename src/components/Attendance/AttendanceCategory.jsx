import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CATEGORY_COLORS = ["#2563EB", "#60A5FA", "#F8C34A", "#EF4444"];

const AttendanceCategory = ({ attendanceData }) => {
  const subjects = attendanceData?.subjects || [];

  const categories = {
    excellent: 0,
    good: 0,
    atRisk: 0,
    critical: 0,
  };

  subjects.forEach((subject) => {
    const percentage = Number(subject.percentage) || 0;

    if (percentage >= 95) {
      categories.excellent++;
    } else if (percentage >= 85) {
      categories.good++;
    } else if (percentage >= 75) {
      categories.atRisk++;
    } else {
      categories.critical++;
    }
  });

  const data = [
    {
      name: "Excellent",
      value: categories.excellent,
    },
    {
      name: "Good",
      value: categories.good,
    },
    {
      name: "At Risk",
      value: categories.atRisk,
    },
    {
      name: "Critical",
      value: categories.critical,
    },
  ];

  const hasSubjects = subjects.length > 0;

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      shadow-sm
      p-4
      h-[200px]
    "
    >
      <h3
        className="
        text-[14px]
        font-semibold
        text-blue-600
        mb-3
      "
      >
        Attendance by Category
      </h3>

      <div
        className="
        flex
        items-center
        justify-between
        h-[145px]
      "
      >
        {/* Donut */}

        <div
          className="
          w-[140px]
          h-[140px]
        "
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={
                  hasSubjects
                    ? data
                    : [
                        {
                          name: "No Data",
                          value: 1,
                        },
                      ]
                }
                dataKey="value"
                innerRadius={42}
                outerRadius={58}
                stroke="white"
                strokeWidth={2}
              >
                {hasSubjects ? (
                  data.map((item, index) => (
                    <Cell key={item.name} fill={CATEGORY_COLORS[index]} />
                  ))
                ) : (
                  <Cell fill="#E2E8F0" />
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}

        <div
          className="
          flex-1
          ml-4
          space-y-2.5
        "
        >
          {hasSubjects ? (
            data.map((item, index) => (
              <div
                key={item.name}
                className="
                    flex
                    items-center
                    justify-between
                    text-[11px]
                  "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                        w-3
                        h-3
                        rounded-sm
                      "
                    style={{
                      backgroundColor: CATEGORY_COLORS[index],
                    }}
                  />

                  <span
                    className="
                      text-slate-600
                    "
                  >
                    {item.name}
                  </span>
                </div>

                <span
                  className="
                    font-semibold
                    text-[#142970]
                  "
                >
                  {item.value}
                </span>
              </div>
            ))
          ) : (
            <p
              className="
              text-[11px]
              text-slate-400
            "
            >
              No subject attendance available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCategory;
