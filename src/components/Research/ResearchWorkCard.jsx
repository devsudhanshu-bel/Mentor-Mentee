import React from "react";

import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const ResearchWorkCard = ({
  research,
  onView,
  onDownload,
  onDelete,
  deleting,
}) => {
  // ==========================================================
  // FILE EXTENSION
  // ==========================================================

  const getFileExtension = () => {
    if (research?.fileType) {
      return research.fileType
        .toLowerCase()
        .replace(".", "");
    }

    if (research?.documentName) {
      const parts =
        research.documentName.split(".");

      if (parts.length > 1) {
        return parts.pop().toLowerCase();
      }
    }

    return "";
  };

  const fileExtension =
    getFileExtension();

  // ==========================================================
  // FILE ICON
  // ==========================================================

  const getIcon = () => {
    switch (fileExtension) {
      case "pdf":
        return (
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <FileText
              size={18}
              className="text-red-500"
            />
          </div>
        );

      case "doc":
      case "docx":
        return (
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <FileText
              size={18}
              className="text-blue-500"
            />
          </div>
        );

      case "ppt":
      case "pptx":
        return (
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
            <Presentation
              size={18}
              className="text-orange-500"
            />
          </div>
        );

      case "xls":
      case "xlsx":
        return (
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <FileSpreadsheet
              size={18}
              className="text-green-500"
            />
          </div>
        );

      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <FileText
              size={18}
              className="text-slate-500"
            />
          </div>
        );
    }
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return "Unknown date";
    }
  };

  // ==========================================================
  // FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDeleteClick = () => {
    console.log(
      "ResearchWorkCard delete clicked:"
    );

    console.log(
      "Research document:",
      research
    );

    console.log(
      "Research document ID:",
      research?.id
    );

    if (!research?.id) {
      alert(
        "This document does not have a valid ID."
      );

      return;
    }

    onDelete?.(research);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-sm transition">

      {/* ====================================================
          LEFT
      ==================================================== */}

      <div className="flex items-center gap-3 min-w-0">

        {getIcon()}

        <div className="min-w-0">

          <h3
            className="text-sm font-semibold text-slate-800 truncate max-w-[600px]"
            title={
              research?.documentName
            }
          >
            {research?.documentName ||
              "Untitled Research"}
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">

            Research

            <span className="mx-1.5">
              •
            </span>

            {formatDate(
              research?.uploadedAt
            )}

            {research?.fileSize ? (
              <>
                <span className="mx-1.5">
                  •
                </span>

                {formatFileSize(
                  research.fileSize
                )}
              </>
            ) : null}

          </p>

        </div>

      </div>

      {/* ====================================================
          ACTIONS
      ==================================================== */}

      <div className="flex items-center gap-1 ml-4 shrink-0">

        {/* VIEW */}

        <button
          type="button"
          onClick={() =>
            onView?.(research)
          }
          title="View"
          className="p-2 rounded-md hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition"
        >
          <Eye size={17} />
        </button>

        {/* DOWNLOAD */}

        <button
          type="button"
          onClick={() =>
            onDownload?.(research)
          }
          title="Download"
          className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
        >
          <Download size={17} />
        </button>

        {/* DELETE */}

        <button
          type="button"
          disabled={deleting}
          onClick={handleDeleteClick}
          title="Delete"
          className="p-2 rounded-md hover:bg-red-50 text-slate-500 hover:text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
};

export default ResearchWorkCard;