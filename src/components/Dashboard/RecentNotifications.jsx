import React from "react";
import {
  CheckCircle2,
  CalendarDays,
  BarChart3,
  Briefcase,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CheckCircle2,
    bg: "bg-green-100",
    color: "text-green-600",
    title: "Your internship at Infosys has been approved.",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: CalendarDays,
    bg: "bg-blue-100",
    color: "text-blue-600",
    title: "New meeting scheduled on 16 May 2025 at 11:00 AM.",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: BarChart3,
    bg: "bg-orange-100",
    color: "text-orange-500",
    title: "Attendance updated for the month of April.",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: Briefcase,
    bg: "bg-purple-100",
    color: "text-purple-600",
    title: "New placement drive: Microsoft – Registrations Open!",
    time: "2 days ago",
  },
];

const RecentNotifications = () => {
  return (
    <div className="bg-white rounded-[22px] border border-gray-200 shadow-sm p-4 h-[355px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-bold text-slate-900">
          Recent Notifications
        </h2>

        <button className="text-[12px] font-semibold text-[#1677FF] hover:underline">
          View All
        </button>
      </div>

      {/* Notifications */}
      <div className="flex-1 divide-y divide-gray-100">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-3"
            >
              {/* Left */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}
                >
                  <Icon size={16} className={item.color} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-slate-900 leading-5 break-words">
                    {item.title}
                  </p>

                  <p className="text-[12px] text-gray-500 mt-1">
                    {item.time}
                  </p>
                </div>
              </div>

              {/* Blue Dot */}
              <div className="ml-3 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1677FF]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentNotifications;