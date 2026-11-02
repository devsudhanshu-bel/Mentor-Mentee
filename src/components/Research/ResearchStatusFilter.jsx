
import React from "react";
import { ChevronDown } from "lucide-react";

const ResearchStatusFilter = () => {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto"
    >
      <span>All Status</span>
      <ChevronDown size={14} strokeWidth={2.2} className="shrink-0" />
    </button>
  );
};

export default ResearchStatusFilter;
