import React from "react";

import {
  FileText,
  FileImage,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const CertificateCard = ({
  certificate,
  onView,
  onDownload,
  onDelete,
  deleting = false,
}) => {
  // ==========================================================
  // SAFETY
  // ==========================================================

  if (!certificate) {
    return null;
  }

  // ==========================================================
  // FILE EXTENSION
  // ==========================================================

  const getFileExtension = () => {
    if (certificate?.fileType) {
      return certificate.fileType
        .toLowerCase()
        .replace(".", "")
        .split("/")
        .pop();
    }

    if (certificate?.documentName) {
      const parts =
        certificate.documentName.split(".");

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

  const getFileIcon = () => {
    // --------------------------------------------------------
    // IMAGE
    // --------------------------------------------------------

    if (
      ["jpg", "jpeg", "png", "webp"].includes(
        fileExtension
      )
    ) {
      return (
        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
          <FileImage
            size={18}
            className="text-purple-500"
          />
        </div>
      );
    }

    // --------------------------------------------------------
    // PDF
    // --------------------------------------------------------

    if (fileExtension === "pdf") {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
          <FileText
            size={18}
            className="text-red-500"
          />
        </div>
      );
    }

    // --------------------------------------------------------
    // DEFAULT
    // --------------------------------------------------------

    return (
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
        <FileText
          size={18}
          className="text-blue-500"
        />
      </div>
    );
  };

  // ==========================================================
  // DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    try {
      const parsedDate =
        new Date(date);

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
          day: "2-digit",
          month: "short",
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

  const handleView = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!certificate) {
      return;
    }

    onView?.(certificate);
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!certificate) {
      return;
    }

    onDownload?.(certificate);
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      deleting ||
      !certificate
    ) {
      return;
    }

    onDelete?.(certificate);
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

        {getFileIcon()}

        {/* CERTIFICATE DETAILS */}

        <div className="min-w-0">

          <h3
            className="text-sm font-semibold text-slate-800 truncate max-w-[600px]"
            title={
              certificate?.documentName
            }
          >
            {certificate?.documentName ||
              "Untitled Certificate"}
          </h3>

          {/* CATEGORY + ISSUER */}

          <div className="flex items-center gap-2 mt-1 flex-wrap">

            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium">
              {certificate?.certificateType ||
                certificate?.type ||
                "Certificate"}
            </span>

            {certificate?.issuer && (
              <>
                <span className="text-slate-300">
                  •
                </span>

                <span className="text-xs text-slate-500">
                  {certificate.issuer}
                </span>
              </>
            )}

          </div>

          {/* DATE + FILE SIZE */}

          <p className="text-xs text-slate-400 mt-1">

            Uploaded{" "}
            {formatDate(
              certificate?.uploadedAt
            )}

            {certificate?.fileSize ? (
              <>
                <span className="mx-1.5">
                  •
                </span>

                {formatFileSize(
                  certificate.fileSize
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
          onClick={handleView}
          title="View"
          className="p-2 rounded-md hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition"
        >
          <Eye size={17} />
        </button>

        {/* DOWNLOAD */}

        <button
          type="button"
          onClick={
            handleDownload
          }
          title="Download"
          className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
        >
          <Download
            size={17}
          />
        </button>

        {/* DELETE */}

        <button
          type="button"
          disabled={deleting}
          onClick={
            handleDelete
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

export default CertificateCard;