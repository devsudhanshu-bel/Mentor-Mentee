import React from "react";

const typeStyles = {
  "Research Paper": "bg-violet-100 text-violet-700",
  Conference: "bg-blue-100 text-blue-700",
  Project: "bg-orange-100 text-orange-700",
  Patent: "bg-green-100 text-green-700",
};

const ResearchTypeBadge = ({ type }) => {
  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold ${
        typeStyles[type] || "bg-slate-100 text-slate-700"
      }`}
    >
      {type}
    </span>
  );
};

export default ResearchTypeBadge;