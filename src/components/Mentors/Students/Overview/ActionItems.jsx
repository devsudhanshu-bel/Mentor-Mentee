import React from "react";
import { ChevronRight, CircleCheck } from "lucide-react";

const actionItems = [
  {
    id: 1,
    title: "Guide Aarav for the upcoming hackathon",
    due: "20 May 2025",
    status: "In Progress",
    badge:
      "bg-orange-100 text-orange-700 border border-orange-200",
  },
  {
    id: 2,
    title: "Review mini project report",
    due: "25 May 2025",
    status: "Pending",
    badge: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  {
    id: 3,
    title: "Discuss career goals and plans",
    due: "30 May 2025",
    status:
      "Completed",
    badge:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
];

const ActionItems = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm h-[320px]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-slate-800">
          Action Items
        </h3>

        <button className="text-[12px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {actionItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3"
          >
            {/* Left */}
            <div className="flex min-w-0 flex-1 gap-2">
              <CircleCheck
                size={16}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <div className="min-w-0">
                <h4 className="text-[13px] font-medium leading-5 text-slate-800">
                  {item.title}
                </h4>

                <p className="mt-1 text-[11px] text-slate-500">
                  Due: {item.due}
                </p>
              </div>
            </div>

            {/* Badge */}
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold ${item.badge}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="mt-5 flex items-center gap-1 text-[12px] font-medium text-blue-600 transition hover:text-blue-700">
        Manage Action Items
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default ActionItems;