import React from "react";
import { ChevronDown } from "lucide-react";

const ExtraCurricularStatusFilter = () => {
  return (
    <button className="h-9 border border-slate-200 rounded-md px-3 flex items-center gap-2 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 transition">
      All Status

      <ChevronDown size={16} />
    </button>
  );
};

export default ExtraCurricularStatusFilter;