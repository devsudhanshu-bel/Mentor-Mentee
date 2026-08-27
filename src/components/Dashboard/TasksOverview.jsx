import React from "react";
import { Circle } from "lucide-react";
import CircularProgress from "./CircularProgress";

const tasks = [
  {
    title: "Submit Project Report",
    due: "Due in 2 days",
  },
  {
    title: "Complete AI Course",
    due: "Due in 5 days",
  },
  {
    title: "Prepare for Aptitude Test",
    due: "Due in 7 days",
  },
];

const TasksOverview = () => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-5
        w-full
        h-full
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2l font-bold text-slate-900">
          Tasks Overview
        </h2>

        <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-[120px_1fr] gap-5 items-center">
        {/* Left */}
        <div className="flex justify-center">
          <CircularProgress value={75} pending={3} />
        </div>

        {/* Right */}
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index}>
              <div className="flex items-start gap-3">
                <Circle
                  size={18}
                  strokeWidth={2}
                  className="text-slate-500 mt-1 flex-shrink-0"
                />

                <div className="flex-1">
                  <h3 className="text-[12px] font-semibold text-slate-900 leading-6 ">
                    {task.title}
                  </h3>

                  <p className="text-sm text-orange-500 mt-1">
                    {task.due}
                  </p>
                </div>
              </div>

              {index !== tasks.length - 1 && (
                <div className="border-b border-slate-200 mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksOverview;