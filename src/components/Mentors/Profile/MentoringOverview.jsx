import React from "react";
import {
  Users,
  CalendarCheck2,
  GraduationCap,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Assigned Students",
    value: "24",
    subtitle: "Active mentees",
    icon: Users,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Completed Meetings",
    value: "48",
    subtitle: "This Academic Year",
    icon: CalendarCheck2,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    title: "Research Supervision",
    value: "07",
    subtitle: "Active Scholars",
    icon: GraduationCap,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    title: "Years of Experience",
    value: "12+",
    subtitle: "In Mentoring",
    icon: Star,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
];

const MentoringOverview = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Users size={17} className="text-blue-600" />

        <h2 className="text-[16px] font-semibold text-slate-900">
          Mentoring Overview
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
            >
              {/* Top */}
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <Icon
                    size={18}
                    className={item.color}
                  />
                </div>

                <p className="text-[12px] font-medium leading-5 text-slate-600">
                  {item.title}
                </p>
              </div>

              {/* Number */}
              <h3 className="mt-5 text-[28px] font-bold leading-none text-slate-900">
                {item.value}
              </h3>

              {/* Subtitle */}
              <p className="mt-2 text-[11px] text-slate-500">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentoringOverview;