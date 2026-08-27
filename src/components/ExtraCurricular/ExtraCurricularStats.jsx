import React from "react";
import {
  FileText,
  CircleCheck,
  Clock3,
  FileClock,
} from "lucide-react";

const stats = [
  {
    title: "Total Submissions",
    value: 6,
    subtitle: "All time",
    icon: FileText,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Approved",
    value: 4,
    subtitle: "Approved activities",
    icon: CircleCheck,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  {
    title: "Under Review",
    value: 1,
    subtitle: "Awaiting review",
    icon: Clock3,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  {
    title: "Drafts",
    value: 1,
    subtitle: "Work in progress",
    icon: FileClock,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
];

const ExtraCurricularStats = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-4 flex items-center gap-3"
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center`}
            >
              <Icon className={`w-6 h-6 ${item.color}`} />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-medium text-slate-500">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-slate-800 leading-none mt-1">
                {item.value}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExtraCurricularStats;