import React from "react";
import { GraduationCap, UserRound } from "lucide-react";

const badgeStyles = {
  Student: {
    icon: GraduationCap,
    className:
      "bg-blue-50 text-blue-700 border border-blue-200",
  },

  Mentor: {
    icon: UserRound,
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

const RequesterTypeBadge = ({ type }) => {
  const config =
    badgeStyles[type] || {
      icon: UserRound,
      className:
        "bg-slate-100 text-slate-700 border border-slate-200",
    };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={14} />
      {type}
    </span>
  );
};

export default RequesterTypeBadge;