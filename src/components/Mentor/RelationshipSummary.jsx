import React from "react";
import {
  ClipboardCheck,
  UserRound,
  CalendarDays,
  CheckCircle2,
  CalendarCheck,
  CircleCheck,
} from "lucide-react";

const RelationshipSummary = () => {
  const progress = 80;

  const items = [
    {
      icon: <UserRound size={15} />,
      label: "Mentor Since",
      value: "Jan 2024",
      valueClass: "text-slate-700",
    },
    {
      icon: <CalendarDays size={15} />,
      label: "Total Meetings",
      value: "8",
      valueClass: "text-slate-700",
    },
    {
      icon: <CheckCircle2 size={15} />,
      label: "Tasks Completed",
      value: "12 / 15",
      valueClass: "text-green-600",
    },
    {
      icon: <CalendarCheck size={15} />,
      label: "Next Meeting",
      value: "24 May 2025",
      valueClass: "text-blue-600",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <ClipboardCheck size={16} className="text-blue-600" />

        <h3 className="text-[14px] font-semibold text-blue-600">
          Relationship Summary
        </h3>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-slate-600">
              {item.icon}

              <span className="text-[12px]">
                {item.label}
              </span>
            </div>

            <span
              className={`text-[12px] font-semibold ${item.valueClass}`}
            >
              {item.value}
            </span>
          </div>
        ))}

        {/* Progress */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-slate-600">
              <CircleCheck size={15} />

              <span className="text-[12px]">
                Overall Progress
              </span>
            </div>

            <span className="text-[12px] font-semibold text-slate-700">
              {progress}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipSummary;