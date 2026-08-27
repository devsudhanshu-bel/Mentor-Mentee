import React from "react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  MoreVertical,
} from "lucide-react";

const ExtraCurricularActivityCard = ({ activity }) => {
  if (!activity) return null;

  const {
    title,
    category,
    date,
    type,
    status,
  } = activity;

  const getIcon = () => {
    switch (type) {
      case "pdf":
        return (
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
            <FileText
              size={18}
              className="text-red-500"
            />
          </div>
        );

      case "docx":
        return (
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileText
              size={18}
              className="text-blue-500"
            />
          </div>
        );

      case "pptx":
        return (
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
            <Presentation
              size={18}
              className="text-orange-500"
            />
          </div>
        );

      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <FileSpreadsheet
              size={18}
              className="text-slate-500"
            />
          </div>
        );
    }
  };

  const getBadge = () => {
    switch (status) {
      case "Approved":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-600 text-[11px] font-medium">
            Approved
          </span>
        );

      case "Under Review":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[11px] font-medium">
            Under Review
          </span>
        );

      case "Draft":
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-600 text-[11px] font-medium">
            Draft
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-sm transition">

      <div className="flex items-center gap-3">

        {getIcon()}

        <div>

          <h3 className="text-sm font-semibold text-slate-800">
            {title}
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">
            {category}

            <span className="mx-1.5">•</span>

            {date}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        {getBadge()}

        <button className="p-1 rounded hover:bg-slate-100 transition">
          <MoreVertical
            size={16}
            className="text-slate-500"
          />
        </button>

      </div>

    </div>
  );
};

export default ExtraCurricularActivityCard;