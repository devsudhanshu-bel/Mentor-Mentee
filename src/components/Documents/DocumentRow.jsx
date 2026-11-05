import { useState } from "react";
import {
  FileText,
  Eye,
  Download,
  Trash2,
  Loader2,
} from "lucide-react";

import api from "../../api/axios";

const DocumentRow = ({
  document,
  onDelete,
  onView,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!document) {
    return null;
  }

  // ==========================================================
  // FORMAT CATEGORY
  // ==========================================================

  const formattedCategory = document.category
    ? document.category
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "Other";

  // ==========================================================
  // FILE TYPE
  // ==========================================================

  const fileType = document.fileType
    ? document.fileType.split("/").pop()?.toUpperCase()
    : "FILE";

  // ==========================================================
  // UPLOADED DATE
  // ==========================================================

  const uploadedDate = document.uploadedAt
    ? new Date(document.uploadedAt).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-";

  // ==========================================================
  // RESOLVE FILE URL
  // ==========================================================

  const resolveFileUrl = (fileUrl) => {
    if (!fileUrl) {
      return null;
    }

    // Preserve absolute URLs.
    if (/^https?:\/\//i.test(fileUrl)) {
      return fileUrl;
    }

    // Axios instance already uses the configured API base URL.
    if (fileUrl.startsWith("/api/")) {
      return fileUrl.replace(/^\/api/, "");
    }

    return fileUrl.startsWith("/")
      ? fileUrl
      : `/${fileUrl}`;
  };

  // ==========================================================
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = () => {
    if (!document.fileUrl) {
      console.error("Document file URL is not available.");
      return;
    }

    onView?.(document);
  };

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = async () => {
    if (!document.fileUrl || isDownloading) {
      return;
    }

    let blobUrl = null;

    try {
      setIsDownloading(true);

      const fileUrl = resolveFileUrl(document.fileUrl);

      const response = await api.get(fileUrl, {
        responseType: "blob",
      });

      const blob = response.data;

      blobUrl = window.URL.createObjectURL(blob);

      const link = window.document.createElement("a");

      link.href = blobUrl;
      link.download = document.documentName || "document";

      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);

    } catch (error) {
      console.error("Failed to download document:", error);

      const status = error.response?.status;

      if (status === 401 || status === 403) {
        alert(
          "You are not authorized to download this document. Please log in again if your session has expired."
        );
      } else if (status === 404) {
        alert("The requested document could not be found.");
      } else {
        alert("Unable to download the document. Please try again.");
      }
    } finally {
      if (blobUrl) {
        window.URL.revokeObjectURL(blobUrl);
      }

      setIsDownloading(false);
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = () => {
    if (!document.id) {
      console.error(
        "Cannot delete document: document ID is missing."
      );

      return;
    }

    onDelete?.(document);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <tr className="border-b border-slate-200 transition last:border-b-0 hover:bg-slate-50">

      {/* DOCUMENT NAME */}

      <td className="min-w-[220px] px-2 py-3 sm:min-w-[260px] sm:px-3 sm:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-11 sm:w-11">
            <FileText
              size={18}
              className="text-blue-600 sm:hidden"
            />

            <FileText
              size={21}
              className="hidden text-blue-600 sm:block"
            />
          </div>

          <div className="min-w-0 flex-1">

            <p
              className="max-w-[180px] truncate text-xs font-semibold text-slate-800 sm:max-w-[300px] sm:text-sm"
              title={document.documentName}
            >
              {document.documentName}
            </p>

            {document.description ? (
              <p
                className="mt-1 max-w-[180px] truncate text-[10px] text-slate-400 sm:max-w-[300px] sm:text-xs"
                title={document.description}
              >
                {document.description}
              </p>
            ) : (
              <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                No description
              </p>
            )}

          </div>
        </div>
      </td>

      {/* CATEGORY */}

      <td className="whitespace-nowrap px-2 py-3 sm:px-3 sm:py-4">
        <span className="text-xs text-slate-600 sm:text-sm">
          {formattedCategory}
        </span>
      </td>

      {/* TYPE */}

      <td className="whitespace-nowrap px-2 py-3 sm:px-3 sm:py-4">
        <span className="text-xs text-slate-600 sm:text-sm">
          {fileType}
        </span>
      </td>

      {/* DATE */}

      <td className="whitespace-nowrap px-2 py-3 sm:px-3 sm:py-4">
        <span className="text-xs text-slate-600 sm:text-sm">
          {uploadedDate}
        </span>
      </td>

      {/* ACTIONS */}

      <td className="whitespace-nowrap px-2 py-3 sm:px-3 sm:py-4">

        <div className="flex items-center gap-1 sm:gap-2">

          {/* VIEW */}

          <button
            type="button"
            onClick={handleView}
            disabled={isDownloading || !document.fileUrl}
            title="View document"
            aria-label="View document"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9"
          >
            <Eye size={17} />
          </button>

          {/* DOWNLOAD */}

          <button
            type="button"
            onClick={handleDownload}
            disabled={
              isDownloading ||
              !document.fileUrl
            }
            title="Download document"
            aria-label="Download document"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9"
          >
            {isDownloading ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Download size={17} />
            )}
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDownloading}
            title="Delete document"
            aria-label="Delete document"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9"
          >
            <Trash2 size={17} />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default DocumentRow;