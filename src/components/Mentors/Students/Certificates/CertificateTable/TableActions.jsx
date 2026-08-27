import React from "react";
import {
  Eye,
  Download,
} from "lucide-react";

const buttonStyle =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600";

const TableActions = ({
  onView,
  onDownload,
}) => {
  return (
    <div className="flex items-center justify-end gap-2">
      {/* View */}

      <button
        type="button"
        title="View Certificate"
        className={buttonStyle}
        onClick={onView}
      >
        <Eye
          size={14}
          strokeWidth={2}
        />
      </button>

      {/* Download */}

      <button
        type="button"
        title="Download Certificate"
        className={buttonStyle}
        onClick={onDownload}
      >
        <Download
          size={14}
          strokeWidth={2}
        />
      </button>
    </div>
  );
};

export default TableActions;