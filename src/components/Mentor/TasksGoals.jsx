
import React from "react";
import {
  CheckSquare,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const tasks = [
  {
    title: "Complete Mini Project Proposal",
    due: "30 May 2025",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-600",
    icon: CheckSquare,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Read Research Paper on LLM",
    due: "25 May 2025",
    status: "Completed",
    statusColor: "bg-green-100 text-green-600",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    title: "Prepare for Aptitude Assessment",
    due: "05 Jun 2025",
    status: "Pending",
    statusColor: "bg-orange-100 text-orange-600",
    icon: Clock3,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
];

const TasksGoals = () => {
  return (
    <div
      className="
        w-full
        min-w-0
        h-full
        rounded-xl
        border
        border-slate-200
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
        sm:p-4
      "
    >
      {/* HEADER */}

      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-[13px] font-semibold text-blue-600 sm:text-[14px]">
          Tasks & Goals
        </h3>

        <button
          type="button"
          className="shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold text-blue-600 transition hover:bg-blue-50 hover:underline sm:text-[12px]"
        >
          View All
        </button>
      </div>

      {/* TASK LIST */}

      <div className="space-y-2">
        {tasks.map((task, index) => {
          const Icon = task.icon;

          return (
            <div
              key={index}
              className="
                flex
                min-w-0
                flex-col
                gap-3
                rounded-lg
                border
                border-slate-200
                p-3
                transition
                hover:bg-slate-50
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-2
              "
            >
              {/* TASK DETAILS */}

              <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                {/* ICON */}

                <div
                  className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${task.iconBg}
                  `}
                >
                  <Icon
                    size={16}
                    className={task.iconColor}
                  />
                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1">
                  <h4 className="break-words text-[11px] font-semibold leading-5 text-[#142970] sm:text-[12px]">
                    {task.title}
                  </h4>

                  <p className="mt-1 text-[10px] text-slate-500 sm:text-[11px]">
                    Due: {task.due}
                  </p>
                </div>
              </div>

              {/* STATUS */}

              <div className="flex shrink-0 sm:justify-end">
                <span
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    whitespace-nowrap
                    ${task.statusColor}
                  `}
                >
                  {task.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksGoals;
