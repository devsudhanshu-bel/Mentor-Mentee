import React from "react";
import { Eye } from "lucide-react";

const ViewDetailsButton = () => {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-semibold text-blue-600 transition hover:bg-blue-100">
      <Eye size={14} />
      View Details
    </button>
  );
};

export default ViewDetailsButton;