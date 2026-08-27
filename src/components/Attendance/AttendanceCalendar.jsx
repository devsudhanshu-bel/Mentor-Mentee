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
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-blue-600">
          Attendance Calendar (May 2025)
        </h3>

        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center">
            <ChevronLeft size={15} />
          </button>

          <button className="px-3 h-7 rounded-md border border-blue-200 text-blue-600 text-[11px] font-medium">
            Today
          </button>

          <button className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-slate-600 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="space-y-2">
        {weeks.map((week, i) => (
          <div key={i} className="grid grid-cols-7 gap-2">
            {week.map((day) => (
              <div
                key={day}
                className={`h-9 rounded-lg flex items-center justify-center text-[12px] font-medium
                ${
                  colors[day]
                    ? colors[day]
                    : "text-slate-400"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-12 flex-wrap">
        {legend.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-[11px] text-slate-600"
          >
            <span
              className={`w-4 h-4 rounded border ${item.color}`}
            ></span>

            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;