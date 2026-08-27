import React from "react";
import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const statusStyles = {
  Verified: {
    icon: CheckCircle2,
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },

  Pending: {
    icon: Clock3,
    className:
      "bg-orange-100 text-orange-700 border border-orange-200",
  },

  Rejected: {
    icon: XCircle,
    className:
      "bg-red-100 text-red-700 border border-red-200",
  },
};

const StatusBadge = ({ status }) => {
  const current =
    statusStyles[status] || statusStyles.Pending;

  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold ${current.className}`}
    >
      <Icon
        size={10}
        strokeWidth={2.2}
      />

      {status}
    </span>
  );
};

export default StatusBadge;