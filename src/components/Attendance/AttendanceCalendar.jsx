
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weeks = [
  ["28", "29", "30", "1", "2", "3", "4"],
  ["5", "6", "7", "8", "9", "10", "11"],
  ["12", "13", "14", "15", "16", "17", "18"],
  ["19", "20", "21", "22", "23", "24", "25"],
  ["26", "27", "28", "29", "30", "31", "1"],
];

const colors = {
  3: "bg-red-100 text-red-700",
  6: "bg-green-100 text-slate-700",
  7: "bg-green-100 text-slate-700",
  8: "bg-green-100 text-slate-700",
  10: "bg-yellow-100 text-orange-600",
  12: "bg-green-100 text-slate-700",
  13: "bg-green-100 text-slate-700",
  14: "bg-red-100 text-red-700",
  15: "bg-green-100 text-slate-700",
  17: "bg-red-100 text-red-700",
  19: "bg-green-100 text-slate-700",
  20: "bg-green-100 text-slate-700",
  21: "bg-green-100 text-slate-700",
  22: "bg-green-100 text-slate-700",
  23: "bg-blue-600 text-white rounded-full",
  24: "bg-red-100 text-red-700",
  26: "bg-yellow-100 text-orange-600",
  27: "bg-green-100 text-slate-700",
  28: "bg-green-100 text-slate-700",
  29: "bg-green-100 text-slate-700",
  30: "bg-green-100 text-slate-700",
  31: "bg-green-100 text-slate-700",
};

const legend = [
  { name: "Present", color: "bg-green-100 border-green-200" },
  { name: "Half Day", color: "bg-yellow-100 border-yellow-200" },
  { name: "Absent", color: "bg-red-100 border-red-200" },
  { name: "Not Held", color: "bg-white border-slate-300" },
];

const AttendanceCalendar = () => {
  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <h3 className="text-sm font-semibold text-blue-600 sm:text-[15px]">
          Attendance Calendar (May 2025)
        </h3>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <button
            type="button"
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            className="h-8 rounded-md border border-blue-200 px-4 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Today
          </button>

          <button
            type="button"
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* =====================================================
          WEEK DAYS
      ===================================================== */}

      <div className="mb-3 grid grid-cols-7 gap-1 text-center sm:gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="py-1 text-[10px] font-semibold text-slate-500 sm:text-xs"
          >
            {day}
          </div>
        ))}
      </div>

      {/* =====================================================
          CALENDAR
      ===================================================== */}

      <div className="space-y-2 sm:space-y-3">
        {weeks.map((week, i) => (
          <div
            key={i}
            className="grid grid-cols-7 gap-1 sm:gap-2"
          >
            {week.map((day, index) => (
              <div
                key={`${i}-${index}`}
                className={`
                  flex
                  aspect-square
                  min-h-0
                  items-center
                  justify-center
                  rounded-md
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-lg
                  sm:text-xs
                  md:text-sm
                  ${
                    colors[day]
                      ? colors[day]
                      : "text-slate-400"
                  }
                `}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* =====================================================
          LEGEND
      ===================================================== */}

      <div className="mt-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-3 pt-8 sm:gap-x-6 sm:pt-10 lg:gap-x-8">

        {legend.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-[10px] text-slate-600 sm:text-xs"
          >
            <span
              className={`
                h-3.5
                w-3.5
                shrink-0
                rounded
                border
                sm:h-4
                sm:w-4
                ${item.color}
              `}
            />

            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
