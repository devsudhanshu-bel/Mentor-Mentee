import React from "react";
import {
  ClipboardCheck,
  CalendarClock,
  FileText,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    icon: ClipboardCheck,
    title: "Submit mentoring remarks",
    subtitle: "4 students pending",
    due: "Today",
    color: "text-blue-600",
    bg: "bg-blue-50",
    badge: "High",
    badgeStyle: "bg-red-50 text-red-600",
  },
  {
    icon: CalendarClock,
    title: "Confirm tomorrow's meetings",
    subtitle: "3 meetings scheduled",
    due: "Tomorrow",
    color: "text-purple-600",
    bg: "bg-purple-50",
    badge: "Medium",
    badgeStyle: "bg-amber-50 text-amber-600",
  },
  {
    icon: FileText,
    title: "Review student reports",
    subtitle: "2 reports uploaded",
    due: "This Week",
    color: "text-green-600",
    bg: "bg-green-50",
    badge: "Low",
    badgeStyle: "bg-green-50 text-green-600",
  },
  {
    icon: AlertCircle,
    title: "Follow up with low attendance",
    subtitle: "5 students",
    due: "This Week",
    color: "text-orange-600",
    bg: "bg-orange-50",
    badge: "High",
    badgeStyle: "bg-red-50 text-red-600",
  },
];

const PendingActions = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-slate-800">
          Pending Actions
        </h2>

        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-none last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.bg}`}
                >
                  <Icon
                    size={18}
                    strokeWidth={2.2}
                    className={action.color}
                  />
                </div>

                <div>
                  <h3 className="text-[14px] font-semibold text-slate-800">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-[12px] text-slate-500">
                    {action.subtitle}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Due: {action.due}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${action.badgeStyle}`}
                >
                  {action.badge}
                </span>

                <ChevronRight
                  size={16}
                  className="text-slate-400"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingActions;