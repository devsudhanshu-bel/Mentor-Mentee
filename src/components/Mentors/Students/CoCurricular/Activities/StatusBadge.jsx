import React from "react";

const statusStyles = {
  Approved: "bg-green-100 text-green-700",
  "Under Review": "bg-orange-100 text-orange-700",
  Draft: "bg-violet-100 text-violet-700",
  Rejected: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;