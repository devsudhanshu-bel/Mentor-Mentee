
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
    <div
      className="
        w-full
        min-w-0
        bg-white
        border
        border-slate-200
        rounded-xl
        shadow-sm
        p-3
        sm:p-4
        h-full
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      {/* HEADER */}

      <h3 className="text-[13px] sm:text-[14px] font-semibold text-blue-600 mb-3 sm:mb-4">
        Quick Actions
      </h3>

      {/* ACTION LIST */}

      <div className="space-y-2">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <button
              key={index}
              type="button"
              className="
                w-full
                min-w-0
                flex
                items-center
                justify-between
                gap-2
                p-2.5
                sm:p-3
                rounded-lg
                bg-slate-50
                hover:bg-blue-50
                active:bg-blue-100
                transition-all
                group
              "
            >
              {/* ACTION DETAILS */}

              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {/* ICON */}

                <div
                  className="
                    w-8
                    h-8
                    sm:w-9
                    sm:h-9
                    rounded-lg
                    bg-white
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Icon
                    size={16}
                    className="text-blue-600"
                  />
                </div>

                {/* TEXT */}

                <div className="min-w-0 text-left">
                  <h4 className="text-[11px] sm:text-[12px] font-semibold text-[#142970] leading-tight break-words">
                    {action.title}
                  </h4>

                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-4 break-words">
                    {action.subtitle}
                  </p>
                </div>
              </div>

              {/* ARROW */}

              <ChevronRight
                size={16}
                className="
                  text-slate-400
                  group-hover:text-blue-600
                  transition
                  shrink-0
                "
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
