import React from "react";

const statusStyles = {
  Pending:
    "bg-amber-50 text-amber-700 border border-amber-200",

  Approved:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",

  Rejected:
    "bg-red-50 text-red-600 border border-red-200",

  Completed:
    "bg-blue-50 text-blue-700 border border-blue-200",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ||
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;