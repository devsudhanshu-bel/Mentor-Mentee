import React from "react";

const statusStyles = {
  Published: "bg-green-100 text-green-700",
  "Under Review": "bg-amber-100 text-amber-700",
  Ongoing: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;