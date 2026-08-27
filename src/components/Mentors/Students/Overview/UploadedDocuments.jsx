import React from "react";
import {
  FileText,
  FileSpreadsheet,
  FileCheck,
  ChevronRight,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Resume_AaravSharma.pdf",
    uploaded: "10 Feb 2025",
    icon: FileText,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: 2,
    name: "Project_Report-DS_Visualizer.pdf",
    uploaded: "20 Apr 2025",
    icon: FileSpreadsheet,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    name: "Internship_Certificate.pdf",
    uploaded: "05 Apr 2025",
    icon: FileCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const UploadedDocuments = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Uploaded Documents
        </h3>

        <button className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Documents */}
      <div className="flex-1 space-y-3">
        {documents.map((doc) => {
          const Icon = doc.icon;

          return (
            <div
              key={doc.id}
              className="flex items-start gap-3"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${doc.iconBg}`}
              >
                <Icon
                  size={16}
                  className={doc.iconColor}
                />
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-[12px] font-medium text-slate-800">
                  {doc.name}
                </h4>

                <p className="mt-1 text-[10px] text-slate-500">
                  Uploaded on {doc.uploaded}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <button className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
        View All Documents
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default UploadedDocuments;