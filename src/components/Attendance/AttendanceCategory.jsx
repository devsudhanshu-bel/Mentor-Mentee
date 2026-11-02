
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CATEGORY_COLORS = ["#2563EB", "#60A5FA", "#F8C34A", "#EF4444"];

/* ==========================================================
   ATTENDANCE CATEGORY
========================================================== */

const AttendanceCategory = ({ attendanceData }) => {
  const subjects = attendanceData?.subjects || [];

  /* ========================================================
     CATEGORY CALCULATION
  ======================================================== */

  const categories = {
    excellent: 0,
    good: 0,
    atRisk: 0,
    critical: 0,
  };

  subjects.forEach((subject) => {
    const percentage = Number(subject.percentage) || 0;

    if (percentage >= 90) {
      categories.excellent++;
    } else if (percentage >= 85) {
      categories.good++;
    } else if (percentage >= 75) {
      categories.atRisk++;
    } else {
      categories.critical++;
    }
  });

  /* ========================================================
     CHART DATA
  ======================================================== */

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

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="flex h-full min-h-[220px] w-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <h3 className="mb-3 text-sm font-semibold text-blue-600 sm:text-[15px]">
        Attendance by Category
      </h3>

      {/* ====================================================
          CHART CONTENT
      ==================================================== */}

      <div className="flex flex-1 flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between sm:gap-2">

        {/* ==================================================
            DONUT CHART
        ================================================== */}

        <div className="relative h-[135px] w-[135px] shrink-0 sm:h-[140px] sm:w-[140px]">
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
                    <Cell
                      key={item.name}
                      fill={CATEGORY_COLORS[index]}
                    />
                  ))
                ) : (
                  <Cell fill="#E2E8F0" />
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ==================================================
            LEGEND
        ================================================== */}

        <div className="w-full min-w-0 flex-1 space-y-3 sm:ml-2 sm:space-y-2.5">

          {hasSubjects ? (
            data.map((item, index) => (
              <div
                key={item.name}
                className="flex min-w-0 items-center justify-between gap-2 text-[11px]"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: CATEGORY_COLORS[index],
                    }}
                  />

                  <span className="min-w-0 break-words text-slate-600">
                    {item.name}
                  </span>
                </div>

                <span className="shrink-0 font-semibold text-[#142970]">
                  {item.value}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-[11px] leading-relaxed text-slate-400 sm:text-left">
              No subject attendance available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCategory;
