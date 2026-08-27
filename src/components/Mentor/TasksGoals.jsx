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
    statusColor:
      "bg-blue-100 text-blue-600",
    icon: (
      <CheckSquare
        size={16}
        className="text-blue-600"
      />
    ),
    iconBg: "bg-blue-50",
  },
  {
    title: "Read Research Paper on LLM",
    due: "25 May 2025",
    status: "Completed",
    statusColor:
      "bg-green-100 text-green-600",
    icon: (
      <CheckCircle2
        size={16}
        className="text-green-600"
      />
    ),
    iconBg: "bg-green-50",
  },
  {
    title: "Prepare for Aptitude Assessment",
    due: "05 Jun 2025",
    status: "Pending",
    statusColor:
      "bg-orange-100 text-orange-600",
    icon: (
      <Clock3
        size={16}
        className="text-orange-500"
      />
    ),
    iconBg: "bg-orange-50",
  },
];

const TasksGoals = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-blue-600">
          Tasks & Goals
        </h3>

        <button className="text-[12px] font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg p-3 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${task.iconBg}`}
              >
                {task.icon}
              </div>

              {/* Content */}
              <div>
                <h4 className="text-[12px] font-semibold text-[#142970]">
                  {task.title}
                </h4>

                <p className="text-[11px] text-slate-500 mt-1">
                  Due: {task.due}
                </p>
              </div>
            </div>

            {/* Status */}
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-semibold ${task.statusColor}`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksGoals;