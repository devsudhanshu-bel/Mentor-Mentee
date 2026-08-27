import React from "react";
import {
  FileText,
  BadgeCheck,
  Clock3,
  FolderOpen,
} from "lucide-react";

const stats = [
  {
    title: "Total Certificates",
    value: 14,
    subtitle: "All certificates uploaded",
    icon: FileText,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Verified Certificates",
    value: 11,
    subtitle: "Verified and valid",
    icon: BadgeCheck,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  {
    title: "Pending Verification",
    value: 3,
    subtitle: "Awaiting verification",
    icon: Clock3,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
  {
    title: "Categories",
    value: 6,
    subtitle: "Different certificate categories",
    icon: FolderOpen,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
];

const CertificatesStats = () => {
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

export default CertificatesStats;