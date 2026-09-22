import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/* ==========================================================
   COLORS
========================================================== */

const COLORS = ["#2563EB", "#DBEAFE"];

/* ==========================================================
   ATTENDANCE OVERVIEW
========================================================== */

const AttendanceOverview = ({ attendanceData }) => {
  /* ========================================================
     SUMMARY
  ======================================================== */

  const summary = attendanceData?.summary || {};

  const attended = Number(summary.classesAttended) || 0;

  const held = Number(summary.classesHeld) || 0;

  const missed = Math.max(held - attended, 0);

  /* ========================================================
     ATTENDANCE PERCENTAGE

     Priority:
     1. Calculate from actual class counts
     2. If counts are unavailable, use backend
        stored/calculated percentage

     This preserves existing attendance such as
     94.44% when the old record still has 0/0
     class counts.
  ======================================================== */

  const calculatedPercentage = held > 0 ? (attended / held) * 100 : null;

  const backendPercentage = Number(summary.percentage);

  let safePercentage = 0;

  if (calculatedPercentage !== null && Number.isFinite(calculatedPercentage)) {
    safePercentage = calculatedPercentage;
  } else if (Number.isFinite(backendPercentage)) {
    safePercentage = backendPercentage;
  }

  /* ========================================================
     CHART DATA
  ======================================================== */

  const chartData =
    held > 0
      ? [
          {
            name: "Attended",
            value: attended,
          },
          {
            name: "Missed",
            value: missed,
          },
        ]
      : safePercentage > 0
        ? [
            {
              name: "Attendance",
              value: safePercentage,
            },
            {
              name: "Remaining",
              value: Math.max(100 - safePercentage, 0),
            },
          ]
        : [
            {
              name: "No Attendance",
              value: 1,
            },
          ];

  /* ========================================================
     STANDING
  ======================================================== */

  let standing = "No Data";

  let standingColor = "text-slate-400";

  if (safePercentage > 0) {
    if (safePercentage < 75) {
      standing = "Needs Attention";

      standingColor = "text-red-600";
    } else if (safePercentage < 85) {
      standing = "Good";

      standingColor = "text-orange-600";
    } else {
      standing = "Excellent";

      standingColor = "text-green-600";
    }
  }

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-5
        h-[200px]
      "
    >
      {/* ====================================================
          TITLE
      ==================================================== */}

      <h3
        className="
          text-[14px]
          font-semibold
          text-blue-600
          mb-4
        "
      >
        Overall Attendance
      </h3>

      <div
        className="
          flex
          items-center
          justify-between
          h-[145px]
        "
      >
        {/* ==================================================
            DONUT CHART
        ================================================== */}

        <div
          className="
            relative
            w-[120px]
            h-[120px]
          "
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={42}
                outerRadius={58}
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                {chartData.map((entry, index) => {
                  /*
                   * When actual class data exists:
                   * blue = attended
                   * light blue = missed
                   *
                   * When only stored percentage exists:
                   * blue = stored attendance
                   * light blue = remaining
                   *
                   * When nothing exists:
                   * grey donut
                   */

                  const fill =
                    safePercentage > 0 ? COLORS[index] || COLORS[1] : "#E2E8F0";

                  return <Cell key={entry.name} fill={fill} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* =================================================
              CENTER TEXT
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <h2
              className="
                text-[18px]
                font-bold
                text-[#142970]
              "
            >
              {safePercentage.toFixed(2)}%
            </h2>

            <p
              className={`
                text-[11px]
                font-medium
                ${standingColor}
              `}
            >
              {standing}
            </p>
          </div>
        </div>

        {/* ==================================================
            STATS
        ================================================== */}

        <div
          className="
            space-y-4
            text-[12px]
          "
        >
          {/* =================================================
              CLASSES ATTENDED
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-8
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
                  rounded
                  bg-blue-600
                "
              />

              <span
                className="
                  text-slate-600
                "
              >
                Classes Attended
              </span>
            </div>

            <span
              className="
                font-semibold
                text-[#142970]
              "
            >
              {attended}
            </span>
          </div>

          {/* =================================================
              CLASSES HELD
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-8
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
                  rounded
                  bg-blue-200
                "
              />

              <span
                className="
                  text-slate-600
                "
              >
                Classes Held
              </span>
            </div>

            <span
              className="
                font-semibold
                text-[#142970]
              "
            >
              {held}
            </span>
          </div>

          {/* =================================================
              CLASSES MISSED
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-8
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
                  rounded
                  bg-red-500
                "
              />

              <span
                className="
                  text-slate-600
                "
              >
                Classes Missed
              </span>
            </div>

            <span
              className="
                font-semibold
                text-[#142970]
              "
            >
              {missed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
