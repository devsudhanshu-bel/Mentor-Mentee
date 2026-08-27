import React from "react";
import { Eye, Download } from "lucide-react";

const TableActions = () => {
  return (
    <div className="flex items-center justify-end gap-2">
      <button className="rounded-lg p-2 transition hover:bg-slate-100">
        <Eye size={15} className="text-slate-600" />
      </button>

      <button className="rounded-lg p-2 transition hover:bg-slate-100">
        <Download size={15} className="text-slate-600" />
      </button>
    </div>
  );
};

export default TableActions;