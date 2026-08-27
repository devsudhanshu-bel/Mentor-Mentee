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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-slate-800">
          Recent Activities
        </h2>

        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition">
          View All
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-none last:pb-0"
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${activity.bg}`}
              >
                <Icon
                  size={18}
                  className={activity.color}
                  strokeWidth={2.2}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <p className="mt-1 text-[12px] text-slate-500">
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