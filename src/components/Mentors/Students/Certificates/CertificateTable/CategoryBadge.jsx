import React from "react";

const styles = {
  "Data Science":
    "bg-blue-100 text-blue-700",

  "Machine Learning":
    "bg-emerald-100 text-emerald-700",

  "Cloud Computing":
    "bg-violet-100 text-violet-700",

  Programming:
    "bg-orange-100 text-orange-700",

  "Computer Science":
    "bg-sky-100 text-sky-700",

  Business:
    "bg-cyan-100 text-cyan-700",

  Other:
    "bg-slate-100 text-slate-700",
};

const CategoryBadge = ({ category }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-semibold ${
        styles[category] || styles.Other
      }`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;