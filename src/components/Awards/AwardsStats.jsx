import React from "react";
import {
  Trophy,
  BadgeCheck,
  Star,
  Globe,
} from "lucide-react";

const stats = [
  {
    title: "Total Achievements",
    value: 12,
    subtitle: "Achievements earned",
    icon: Trophy,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Certificates",
    value: 8,
    subtitle: "Certificates earned",
    icon: BadgeCheck,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  {
    title: "National Level",
    value: 5,
    subtitle: "National recognitions",
    icon: Star,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
  {
    title: "International Level",
    value: 2,
    subtitle: "International recognitions",
    icon: Globe,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
];

const AwardsStats = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3 hover:shadow-md transition"
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-5 h-5 ${item.color}`} />
            </div>

            {/* Content */}
            <div>
              <p className="text-[12px] font-medium text-slate-600">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 leading-none mt-1">
                {item.value}
              </h2>

              <p className="text-[12px] text-slate-400 mt-1">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AwardsStats;