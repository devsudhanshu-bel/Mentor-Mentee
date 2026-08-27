import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Breadcrumb from "./Breadcrumb";

const MentorDetailsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {/* Breadcrumb + Button */}
      <div className="flex items-center justify-between">
        <Breadcrumb />

        <button
          onClick={() => navigate("/admin/mentors")}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={14} />
          Back to Mentors
        </button>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900">
          Mentor Details
        </h1>

        <p className="text-sm text-slate-500">
          View mentor information, overview and assigned students.
        </p>
      </div>
    </div>
  );
};

export default MentorDetailsHeader;