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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-[16px] font-semibold text-slate-800">
          Quick Actions
        </h2>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <button
              key={index}
              className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.bg}`}
              >
                <Icon
                  size={20}
                  className={`${action.color} transition-transform duration-300 group-hover:scale-110`}
                />
              </div>

              <h3 className="mt-3 text-[13px] font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-1 text-[11px] leading-4 text-slate-500">
                {action.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;