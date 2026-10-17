import React from "react";

const categoryStyles = {
  ACADEMICS: "bg-blue-100 text-blue-700",
  CERTIFICATES: "bg-green-100 text-green-700",
  INTERNSHIPS: "bg-orange-100 text-orange-700",
  PROJECTS: "bg-emerald-100 text-emerald-700",
  RESEARCH: "bg-pink-100 text-pink-700",
  CO_CURRICULAR: "bg-yellow-100 text-yellow-700",
  EXTRA_CURRICULAR: "bg-teal-100 text-teal-700",
  AWARDS: "bg-rose-100 text-rose-700",
  PERSONAL: "bg-violet-100 text-violet-700",
  OTHER: "bg-slate-100 text-slate-700",
};

const categoryLabels = {
  ACADEMICS: "Academics",
  CERTIFICATES: "Certificates",
  INTERNSHIPS: "Internships",
  PROJECTS: "Projects",
  RESEARCH: "Research",
  CO_CURRICULAR: "Co-Curricular",
  EXTRA_CURRICULAR: "Extra Curricular",
  AWARDS: "Awards",
  PERSONAL: "Personal",
  OTHER: "Other",
};

const CategoryBadge = ({ category }) => {
  const normalizedCategory = String(category || "OTHER")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  const label = categoryLabels[normalizedCategory] || "Other";
  const styles =
    categoryStyles[normalizedCategory] ||
    "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold ${styles}`}
    >
      {label}
    </span>
  );
};

export default CategoryBadge;