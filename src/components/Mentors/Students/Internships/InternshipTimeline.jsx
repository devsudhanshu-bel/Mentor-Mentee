import React from "react";
import {
  CalendarDays,
  Clock3,
} from "lucide-react";

const timeline = [
  {
    label: "Start Date",
    value: "15 Jan 2025",
    icon: CalendarDays,
  },
  {
    label: "End Date",
    value: "15 Jul 2025",
    icon: CalendarDays,
  },
  {
    label: "Duration",
    value: "6 Months",
    icon: Clock3,
  },
];

const InternshipTimeline = () => {
  return (
    <div className="mt-6">
      {/* ================= Timeline ================= */}

      <div className="grid grid-cols-3 gap-4">
        {timeline.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label}>
              <p className="mb-2 text-[10px] font-medium text-slate-500">
                {item.label}
              </p>

              <div className="flex items-center gap-2">
                <Icon
                  size={13}
                  className="text-slate-500"
                />

                <span className="text-[11px] font-medium text-slate-700">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= Progress ================= */}

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-500">
            Progress
          </span>

          <span className="text-[11px] font-semibold text-slate-700">
            72%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-[72%] rounded-full bg-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default InternshipTimeline;