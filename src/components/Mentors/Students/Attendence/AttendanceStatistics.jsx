import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const statistics = [
  {
    title: "This Month",
    value: "93%",
    subtitle: "",
    color: "text-blue-600",
    Icon: TrendingUp,
    iconColor: "text-green-500",
  },
  {
    title: "This Semester",
    value: "94%",
    subtitle: "",
    color: "text-slate-800",
    Icon: TrendingUp,
    iconColor: "text-green-500",
  },
  {
    title: "Highest (Subject)",
    value: "100%",
    subtitle: "Mathematics",
    color: "text-green-600",
    Icon: TrendingUp,
    iconColor: "text-green-500",
  },
  {
    title: "Lowest (Subject)",
    value: "88%",
    subtitle: "Operating Systems",
    color: "text-orange-500",
    Icon: TrendingDown,
    iconColor: "text-orange-500",
  },
];

const AttendanceStatistics = () => {
  return (
    <div className="h-[260px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Heading ================= */}
      <h2 className="mb-4 text-[13px] font-semibold text-blue-600">
        Attendance Statistics
      </h2>

      {/* ================= Cards ================= */}
      <div className="grid h-[190px] grid-cols-2 gap-2">
        {statistics.map((item) => {
          const Icon = item.Icon;

          return (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition-all duration-200 hover:border-blue-200"
            >
              {/* Title */}
              <p className="text-[10px] text-slate-500">
                {item.title}
              </p>

              {/* Value */}
              <div className="flex items-end justify-between">
                <div>
                  <h3 className={`text-[18px] font-bold ${item.color}`}>
                    {item.value}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <Icon
                  size={16}
                  className={item.iconColor}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceStatistics;