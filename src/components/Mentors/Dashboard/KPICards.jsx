import React from "react";
import {
  GraduationCap,
  AlertTriangle,
  CalendarDays,
  ClipboardCheck,
  Users,
  BarChart3,
} from "lucide-react";

const cards = [
  {
    title: "Assigned Students",
    value: "24",
    description: "Total mentees assigned",
    icon: GraduationCap,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Need Attention",
    value: "6",
    description: "Students requiring support",
    icon: AlertTriangle,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  {
    title: "Meetings Today",
    value: "3",
    description: "Upcoming mentoring sessions",
    icon: CalendarDays,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    title: "Pending Remarks",
    value: "8",
    description: "Remarks yet to submit",
    icon: ClipboardCheck,
    bg: "bg-amber-50",
    color: "text-amber-500",
  },
  {
    title: "Average Attendance",
    value: "88%",
    description: "Across all mentees",
    icon: Users,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    title: "Average CGPA",
    value: "8.24",
    description: "Overall student performance",
    icon: BarChart3,
    bg: "bg-sky-50",
    color: "text-sky-600",
  },
];

const KPICards = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-6">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Top Row */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}
                >
                  <Icon
                    size={20}
                    strokeWidth={2.2}
                    className={card.color}
                  />
                </div>

                <h3 className="text-[12px] font-semibold text-slate-700 leading-tight">
                  {card.title}
                </h3>
              </div>

              {/* Value */}
              <h2 className="mt-4 text-2xl font-bold leading-none text-slate-900 pl-15">
                {card.value}
              </h2>

              {/* Description */}
              <p className="mt-2 text-xs text-slate-500 leading-5 pl-5">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KPICards;