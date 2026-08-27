import React from "react";
import {
  UserRoundCheck,
  BarChart3,
  BriefcaseBusiness,
  FlaskConical,
  BadgeCheck,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Attendance",
    value: "92%",
    subtitle: "Overall",
    icon: UserRoundCheck,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "CGPA",
    value: "8.72",
    subtitle: "Current",
    icon: BarChart3,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Internships",
    value: "1",
    subtitle: "Completed",
    icon: BriefcaseBusiness,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Research",
    value: "2",
    subtitle: "Submitted",
    icon: FlaskConical,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Certificates",
    value: "5",
    subtitle: "Earned",
    icon: BadgeCheck,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Co-Curricular",
    value: "7",
    subtitle: "Activities",
    icon: Star,
    color: "bg-amber-100 text-amber-600",
  },
];

const OverviewStats = () => {
  return (
    <section className="grid grid-cols-6 gap-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color}`}
              >
                <Icon size={18} strokeWidth={2} />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium leading-none text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-2 text-[18px] font-bold leading-none text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-2 text-[11px] leading-none text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default OverviewStats;