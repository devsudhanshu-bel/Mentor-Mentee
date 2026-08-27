import React from "react";
import {
  CalendarPlus,
  FolderOpen,
  MessageSquareText,
  Target,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    icon: CalendarPlus,
    title: "Schedule a Meeting",
    subtitle: "Book a new meeting with your mentor",
  },
  {
    icon: FolderOpen,
    title: "Share Documents",
    subtitle: "Upload and share files",
  },
  {
    icon: MessageSquareText,
    title: "View Feedback",
    subtitle: "Check feedback and comments",
  },
  {
    icon: Target,
    title: "Set Goals",
    subtitle: "Define your goals together",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full hover:shadow-md transition-all duration-300">
      {/* Header */}
      <h3 className="text-[14px] font-semibold text-blue-600 mb-4">
        Quick Actions
      </h3>

      {/* Action List */}
      <div className="space-y-2">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <button
              key={index}
              className="
                w-full
                flex
                items-center
                justify-between
                p-3
                rounded-lg
                bg-slate-50
                hover:bg-blue-50
                transition-all
                group
              "
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Icon
                    size={16}
                    className="text-blue-600"
                  />
                </div>

                <div className="text-left">
                  <h4 className="text-[12px] font-semibold text-[#142970]">
                    {action.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {action.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={16}
                className="text-slate-400 group-hover:text-blue-600 transition"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;