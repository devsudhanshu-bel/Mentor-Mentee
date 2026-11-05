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
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex min-w-0 items-center justify-between gap-3 sm:mb-5">
        <h2 className="text-base font-semibold text-slate-800">
          Pending Actions
        </h2>

        <button className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Actions */}
      <div className="min-w-0 space-y-3 sm:space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <div
              key={index}
              className="flex min-w-0 items-start justify-between gap-2 border-b border-slate-100 pb-3 last:border-none last:pb-0 sm:items-center sm:gap-3 sm:pb-4"
            >
              <div className="flex min-w-0 items-start gap-2.5 sm:items-center sm:gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:mt-0 sm:h-10 sm:w-10 ${action.bg}`}
                >
                  <Icon
                    size={18}
                    strokeWidth={2.2}
                    className={action.color}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-[13px] font-semibold leading-5 text-slate-800 sm:text-[14px]">
                    {action.title}
                  </h3>

                  <p className="mt-1 break-words text-[12px] leading-4 text-slate-500">
                    {action.subtitle}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Due: {action.due}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold sm:px-2.5 ${action.badgeStyle}`}
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
