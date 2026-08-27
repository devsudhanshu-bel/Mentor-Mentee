import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <Link
        to="/admin/mentors"
        className="transition hover:text-blue-600"
      >
        Mentors
      </Link>

      <ChevronRight
        size={14}
        className="text-slate-400"
      />

      <span className="font-medium text-slate-700">
        Mentor Details
      </span>
    </div>
  );
};

export default Breadcrumb;