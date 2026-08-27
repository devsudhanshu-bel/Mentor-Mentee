import React from "react";
import {
  GraduationCap,
  BarChart3,
  BookOpen,
  BadgeCheck,
  Clock3,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "CGPA (Current)",
    value: "8.72",
    suffix: "/10",
    subtitle: "Till Semester IV",
    icon: GraduationCap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "SGPA (Semester IV)",
    value: "8.45",
    suffix: "/10",
    subtitle: "Current Semester",
    icon: BarChart3,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    id: 3,
    title: "Credits Earned",
    value: "88",
    suffix: "/120",
    subtitle: "73.33% Completed",
    icon: BookOpen,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: 4,
    title: "Academic Standing",
    value: "Excellent",
    suffix: "",
    subtitle: "Top Performer",
    icon: BadgeCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 5,
    title: "Program Progress",
    value: "73.33%",
    suffix: "",
    subtitle: "On Track",
    icon: Clock3,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const AcademicKPICards = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="flex min-h-[96px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {/* Icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
            >
              <Icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium leading-4 text-slate-500">
                {item.title}
              </p>

              <div className="mt-1 flex items-end gap-1">
                <span
                  className={`font-bold leading-none ${
                    item.id === 4
                      ? "text-[16px]"
                      : item.id === 5
                      ? "text-[18px]"
                      : "text-[18px]"
                  } text-slate-900`}
                >
                  {item.value}
                </span>

                {item.suffix && (
                  <span className="pb-[2px] text-[11px] font-medium text-slate-400">
                    {item.suffix}
                  </span>
                )}
              </div>

              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AcademicKPICards;