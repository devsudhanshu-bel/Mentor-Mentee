import React from "react";

const categoryStyles = {
  Academics: "bg-blue-100 text-blue-700",
  Certificates: "bg-green-100 text-green-700",
  Internships: "bg-orange-100 text-orange-700",
  Projects: "bg-emerald-100 text-emerald-700",
  Research: "bg-pink-100 text-pink-700",
  "Co-Curricular": "bg-yellow-100 text-yellow-700",
  Personal: "bg-violet-100 text-violet-700",
  Other: "bg-slate-100 text-slate-700",
};

const CategoryBadge = ({ category }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${
        categoryStyles[category] || "bg-slate-100 text-slate-700"
      }`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;