import React from "react";
import {
  BriefcaseBusiness,
  FileText,
  Hourglass,
  CheckCircle2,
  Bookmark,
} from "lucide-react";

const stats = [
  {
    title: "Applications",
    value: 8,
    subtitle: "Total Applied",
    icon: BriefcaseBusiness,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Shortlisted",
    value: 3,
    subtitle: "Shortlisted",
    icon: FileText,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "In Progress",
    value: 1,
    subtitle: "Ongoing",
    icon: Hourglass,
    bg: "bg-orange-100",
    color: "text-orange-500",
  },
  {
    title: "Completed",
    value: 2,
    subtitle: "Completed",
    icon: CheckCircle2,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Saved",
    value: 5,
    subtitle: "Saved Opportunities",
    icon: Bookmark,
    bg: "bg-blue-100",
    color: "text-blue-500",
  },
];

const InternshipStats = () => {
  return (
    <div className="space-y-4">
      {/* ================= Heading ================= */}
      <div>
        <h1 className="text-[22px] font-bold text-[#142970]">
          Internships
        </h1>

        <p className="text-[13px] text-slate-500 mt-1">
          Explore opportunities, manage applications and track your internship
          journey.
        </p>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>

              {/* Text */}
              <div className="leading-tight">
                <p className="text-[13px] font-semibold text-slate-600">
                  {item.title}
                </p>

                <h2 className="text-[24px] font-bold text-[#142970] mt-1">
                  {item.value}
                </h2>

                <p className="text-[12px] text-slate-500 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InternshipStats;