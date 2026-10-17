import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FileText,
  FileSpreadsheet,
  FileCheck,
  ChevronRight,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getFileIcon = (document) => {
  const fileName = document.documentName || "";
  const fileType = document.fileType || "";
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (
    extension === "xls" ||
    extension === "xlsx" ||
    fileType.includes("spreadsheet") ||
    fileType.includes("excel")
  ) {
    return {
      icon: FileSpreadsheet,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    };
  }

  if (
    fileName.toLowerCase().includes("certificate") ||
    document.category === "CERTIFICATES"
  ) {
    return {
      icon: FileCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    };
  }

  return {
    icon: FileText,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  };
};

const UploadedDocuments = ({ documents = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleViewAll = () => {
    if (id) {
      navigate(`/mentor/students/${id}/documents`);
    }
  };

  const displayedDocuments = Array.isArray(documents)
    ? documents.slice(0, 3)
    : [];

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Uploaded Documents
        </h3>

        <button
          type="button"
          onClick={handleViewAll}
          className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* Documents */}
      <div className="flex-1 space-y-3">
        {displayedDocuments.length > 0 ? (
          displayedDocuments.map((doc) => {
            const {
              icon: Icon,
              iconBg,
              iconColor,
            } = getFileIcon(doc);

            return (
              <div
                key={doc.id}
                className="flex items-start gap-3"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <Icon
                    size={16}
                    className={iconColor}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[12px] font-medium text-slate-800">
                    {doc.documentName || "Untitled document"}
                  </h4>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Uploaded on {formatDate(doc.uploadedAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex min-h-24 items-center justify-center">
            <p className="text-center text-xs text-slate-500">
              No documents uploaded yet.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <button
        type="button"
        onClick={handleViewAll}
        className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
      >
        View All Documents
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default UploadedDocuments;