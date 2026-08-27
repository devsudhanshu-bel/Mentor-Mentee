import React from "react";

import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const ExtraCurricularActivityCard = ({
  activity,
  onView,
  onDownload,
  onDelete,
  deleting = false,
}) => {
  // ==========================================================
  // SAFETY
  // ==========================================================

  if (!activity) {
    return null;
  }

  // ==========================================================
  // FILE EXTENSION
  // ==========================================================

  const getFileExtension = () => {
    if (activity?.fileType) {
      return activity.fileType
        .toLowerCase()
        .replace(".", "")
        .split("/")
        .pop();
    }

    if (activity?.documentName) {
      const parts =
        activity.documentName.split(".");

      if (parts.length > 1) {
        return parts.pop().toLowerCase();
      }
    }

    return "";
  };

  const fileExtension = getFileExtension();

  // ==========================================================
  // FILE ICON
  // ==========================================================

  const getIcon = () => {
    switch (fileExtension) {
      // ------------------------------------------------------
      // PDF
      // ------------------------------------------------------

      case "pdf":
        return (
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <FileText
              size={18}
              className="text-red-500"
            />
          </div>
        );

      // ------------------------------------------------------
      // WORD
      // ------------------------------------------------------

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

      // ------------------------------------------------------
      // POWERPOINT
      // ------------------------------------------------------

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

      // ------------------------------------------------------
      // EXCEL
      // ------------------------------------------------------

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

      // ------------------------------------------------------
      // OTHER
      // ------------------------------------------------------

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
      const parsedDate = new Date(date);

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        return "Unknown date";
      }

      return parsedDate.toLocaleDateString(
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

    if (
      bytes <
      1024 * 1024
    ) {
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
  // VIEW
  // ==========================================================

  const handleViewClick = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!activity) {
      return;
    }

    onView?.(activity);
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownloadClick = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!activity) {
      return;
    }

    onDownload?.(activity);
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDeleteClick = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      deleting ||
      !activity
    ) {
      return;
    }

    /*
     * IMPORTANT:
     *
     * The card does NOT delete directly.
     *
     * It sends the selected activity
     * to ExtraCurricularActivityList,
     * which opens ExtraCurricularDeleteModal.
     */

    onDelete?.(activity);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-sm transition">

      {/* ====================================================
          LEFT SIDE
      ==================================================== */}

      <div className="flex items-center gap-3 min-w-0">

        {/* FILE ICON */}

        {getIcon()}

        {/* DOCUMENT DETAILS */}

        <div className="min-w-0">

          <h3
            className="text-sm font-semibold text-slate-800 truncate max-w-[600px]"
            title={
              activity?.documentName
            }
          >
            {activity?.documentName ||
              "Untitled Activity"}
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">

            Extra-Curricular Activity

            <span className="mx-1.5">
              •
            </span>

            {formatDate(
              activity?.uploadedAt
            )}

            {activity?.fileSize ? (
              <>
                <span className="mx-1.5">
                  •
                </span>

                {formatFileSize(
                  activity.fileSize
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

        {/* ==================================================
            VIEW
        ================================================== */}

        <button
          type="button"
          onClick={
            handleViewClick
          }
          title="View"
          className="p-2 rounded-md hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition"
        >
          <Eye size={17} />
        </button>

        {/* ==================================================
            DOWNLOAD
        ================================================== */}

        <button
          type="button"
          onClick={
            handleDownloadClick
          }
          title="Download"
          className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
        >
          <Download size={17} />
        </button>

        {/* ==================================================
            DELETE
        ================================================== */}

        <button
          type="button"
          disabled={deleting}
          onClick={
            handleDeleteClick
          }
          title="Delete"
          className="p-2 rounded-md hover:bg-red-50 text-slate-500 hover:text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
};

export default ExtraCurricularActivityCard;