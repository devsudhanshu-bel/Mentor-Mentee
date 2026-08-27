import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const weeks = [
  ["28", "29", "30", "1", "2", "3", "4"],
  ["5", "6", "7", "8", "9", "10", "11"],
  ["12", "13", "14", "15", "16", "17", "18"],
  ["19", "20", "21", "22", "23", "24", "25"],
  ["26", "27", "28", "29", "30", "31", "1"],
];

const dayStyle = (day) => {
  const present = [
    "28",
    "29",
    "30",
    "6",
    "7",
    "8",
    "12",
    "13",
    "15",
    "19",
    "20",
    "21",
    "22",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  const absent = ["3", "14", "17", "24"];

  const halfDay = ["10", "26"];

  const today = "23";

  if (day === today)
    return "bg-blue-600 text-white";

  if (present.includes(day))
    return "bg-green-100 text-green-700";

  if (absent.includes(day))
    return "bg-red-100 text-red-600";

  if (halfDay.includes(day))
    return "bg-yellow-100 text-yellow-700";

  return "bg-white text-slate-600";
};

const AttendanceCalendar = () => {
  return (
    <div className="h-[450px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-blue-600">
          Attendance Calendar (May 2025)
        </h2>

        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
            <ChevronLeft size={15} />
          </button>

          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-blue-600 hover:bg-blue-50">
            Today
          </button>

          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ================= Week Days ================= */}

      <div className="mb-2 grid grid-cols-7 gap-2 text-center text-[11px] font-medium text-slate-500">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* ================= Calendar ================= */}

      <div className="space-y-2">
        {weeks.map((week, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-2"
          >
            {week.map((day) => (
              <div
                key={day}
                className={`flex h-9 items-center justify-center rounded-lg text-[11px] font-medium ${dayStyle(
                  day
                )}`}
              >
                {day}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ================= Legend ================= */}

      <div className="mt-6 flex flex-wrap justify-center gap-5 text-[10px] text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-green-100"></span>
          Present
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-yellow-100"></span>
          Half Day
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-red-100"></span>
          Absent
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-slate-300 bg-white"></span>
          Not Held
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;