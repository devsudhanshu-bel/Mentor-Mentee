import React from "react";
import { Eye, FileText } from "lucide-react";

const iconButton =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50";

const TableActions = () => {
  return (
    <div className="flex items-center justify-end gap-2">
      {/* Document */}

      <button
        className={iconButton}
        title="View Document"
      >
        <FileText size={15} strokeWidth={2} />
      </button>

      {/* Preview */}

      <button
        className={iconButton}
        title="View Details"
      >
        <Eye size={15} strokeWidth={2} />
      </button>
    </div>
  );
};

export default TableActions;