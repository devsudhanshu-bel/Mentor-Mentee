import React from "react";
import { Eye, Download } from "lucide-react";

const buttonStyle =
  "flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-40";

const TableActions = ({
  onView,
  onDownload,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        className={buttonStyle}
        onClick={onView}
        disabled={disabled || !onView}
        title="View Document"
        aria-label="View document"
      >
        <Eye size={14} strokeWidth={2} />
      </button>

      <button
        type="button"
        className={buttonStyle}
        onClick={onDownload}
        disabled={disabled || !onDownload}
        title="Download Document"
        aria-label="Download document"
      >
        <Download size={14} strokeWidth={2} />
      </button>
    </div>
  );
};

export default TableActions;