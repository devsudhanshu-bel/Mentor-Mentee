import React from "react";
import { Filter } from "lucide-react";

const CertificateFilter = () => {
  return (
    <button className="h-9 px-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 flex items-center gap-2 text-xs font-medium text-slate-600 transition">
      <Filter size={14} />
      Filter
    </button>
  );
};

export default CertificateFilter;