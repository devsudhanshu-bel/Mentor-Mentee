import React from "react";

const categoryStyles = {
  Technical: "bg-blue-50 text-blue-700",
  Social: "bg-cyan-50 text-cyan-700",
  Leadership: "bg-emerald-50 text-emerald-700",
  Cultural: "bg-violet-50 text-violet-700",
  Sports: "bg-orange-50 text-orange-700",
};

const CategoryBadge = ({ category }) => {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-[10px] font-medium ${
        categoryStyles[category] || "bg-slate-100 text-slate-700"
      }`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;