import React from "react";
import { ChevronDown } from "lucide-react";

const ResearchStatusFilter = () => {
  return (
    <button className="border border-slate-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">
      <span>All Status</span>
      <ChevronDown size={14} strokeWidth={2.2} />
    </button>
  );
};

export default ResearchStatusFilter;