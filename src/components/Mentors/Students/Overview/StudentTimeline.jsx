import React from "react";
import {
  CalendarDays,
  GraduationCap,
  BriefcaseBusiness,
  Award,
  ChevronRight,
} from "lucide-react";

const timeline = [
  {
    id: 1,
    title: "Mentor Meeting Completed",
    date: "10 May 2025",
    icon: CalendarDays,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Internship Started",
    date: "15 Jan 2025",
    icon: BriefcaseBusiness,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 3,
    title: "Research Submitted",
    date: "12 Feb 2025",
    icon: GraduationCap,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    title: "Certificate Earned",
    date: "20 Mar 2025",
    icon: Award,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const StudentTimeline = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Student Timeline
        </h3>

        <button className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* ================= Timeline ================= */}
      <div className="flex-1">
        {timeline.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="relative flex gap-3 pb-5 last:pb-0"
            >
              {/* Timeline */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${item.iconBg}`}
                >
                  <Icon
                    size={16}
                    className={item.iconColor}
                  />
                </div>

                {index !== timeline.length - 1 && (
                  <div className="mt-1 h-full w-px bg-slate-200" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h4 className="text-[12px] font-semibold text-slate-800">
                  {item.title}
                </h4>

                <p className="mt-1 text-[10px] text-slate-500">
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= Footer ================= */}
      <button className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
        View Complete Timeline
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default StudentTimeline;