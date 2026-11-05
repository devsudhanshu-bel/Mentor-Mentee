import React from "react";
import { Filter } from "lucide-react";

const CertificateFilter = () => {
  return (
    <button
      type="button"
      className="
        inline-flex h-9 shrink-0 items-center justify-center gap-2
        rounded-md border border-slate-200 bg-white
        px-3
        text-xs font-medium text-slate-600
        transition-colors duration-200
        hover:bg-slate-50 hover:text-slate-800
        active:bg-slate-100
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:ring-offset-1
        sm:h-10 sm:px-4
      "
    >
      <Filter size={14} className="shrink-0" />
      <span>Filter</span>
    </button>
  );
};

export default CertificateFilter;
