import React from "react";
import {
  CalendarPlus,
  ClipboardCheck,
  Users,
  FileText,
  Bell,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "Schedule Meeting",
    subtitle: "Create mentoring session",
    icon: CalendarPlus,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Submit Remarks",
    subtitle: "Update student remarks",
    icon: ClipboardCheck,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    title: "Manage Students",
    subtitle: "View assigned mentees",
    icon: Users,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    title: "Student Reports",
    subtitle: "Academic reports",
    icon: FileText,
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
  {
    title: "Announcements",
    subtitle: "Notify students",
    icon: Bell,
    bg: "bg-red-50",
    color: "text-red-600",
  },
  {
    title: "Analytics",
    subtitle: "Performance insights",
    icon: BarChart3,
    bg: "bg-cyan-50",
    color: "text-cyan-600",
  },
];

const QuickActions = () => {
  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-base font-semibold text-slate-800">
          Quick Actions
        </h2>
      </div>

      {/* Action Cards */}
      <div className="grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-6">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <button
              key={index}
              className="group flex min-w-0 items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:block sm:p-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.bg}`}
              >
                <Icon
                  size={20}
                  className={`${action.color} transition-transform duration-300 group-hover:scale-110`}
                />
              </div>

              <div className="min-w-0 sm:mt-3">
                <h3 className="break-words text-[13px] font-semibold leading-5 text-slate-800">
                  {action.title}
                </h3>

                <p className="mt-1 break-words text-[11px] leading-4 text-slate-500">
                  {action.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
