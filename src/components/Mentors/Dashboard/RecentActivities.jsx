import React from "react";
import {
  MessageSquare,
  FileCheck,
  CalendarCheck2,
  ClipboardList,
} from "lucide-react";

const activities = [
  {
    icon: MessageSquare,
    title: "Mentoring session completed",
    student: "Aarav Sharma",
    time: "15 min ago",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FileCheck,
    title: "Remarks submitted",
    student: "Meera Reddy",
    time: "1 hour ago",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: CalendarCheck2,
    title: "Meeting scheduled",
    student: "Vivek Singh",
    time: "3 hours ago",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: ClipboardList,
    title: "Attendance updated",
    student: "Ananya Iyer",
    time: "Yesterday",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const RecentActivities = () => {
  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex min-w-0 items-center justify-between gap-3 sm:mb-5">
        <h2 className="text-base font-semibold text-slate-800">
          Recent Activities
        </h2>

        <button className="shrink-0 text-xs font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Timeline */}
      <div className="min-w-0 space-y-3 sm:space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex min-w-0 items-start gap-2.5 border-b border-slate-100 pb-3 last:border-none last:pb-0 sm:gap-3 sm:pb-4"
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${activity.bg}`}
              >
                <Icon
                  size={18}
                  className={activity.color}
                  strokeWidth={2.2}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-[13px] font-semibold leading-5 text-slate-800 sm:text-[14px]">
                  {activity.title}
                </h3>

                <p className="mt-1 break-words text-[12px] leading-4 text-slate-500">
                  {activity.student}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;
