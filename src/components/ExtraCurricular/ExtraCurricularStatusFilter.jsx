
import React from "react";
import { ChevronDown } from "lucide-react";

const ExtraCurricularStatusFilter = () => {
  return (
    <button
      type="button"
      className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto"
    >
      All Status

      <ChevronDown size={16} className="shrink-0" />
    </button>
  );
};

export default ExtraCurricularStatusFilter;
