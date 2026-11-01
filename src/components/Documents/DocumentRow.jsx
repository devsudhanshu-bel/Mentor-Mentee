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
    <tr className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition">

      {/* DOCUMENT NAME */}

      <td className="px-3 py-4">
        <div className="flex items-center gap-3 min-w-[260px]">

          <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <FileText
              size={21}
              className="text-blue-600"
            />
          </div>

          <div className="min-w-0">

            <p
              className="text-sm font-semibold text-slate-800 truncate max-w-[300px]"
              title={document.documentName}
            >
              {document.documentName}
            </p>

            {document.description ? (
              <p
                className="text-xs text-slate-400 mt-1 truncate max-w-[300px]"
                title={document.description}
              >
                {document.description}
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1">
                No description
              </p>
            )}

          </div>
        </div>
      </td>

      {/* CATEGORY */}

      <td className="px-3 py-4">
        <span className="text-sm text-slate-600">
          {formattedCategory}
        </span>
      </td>

      {/* TYPE */}

      <td className="px-3 py-4">
        <span className="text-sm text-slate-600">
          {fileType}
        </span>
      </td>

      {/* DATE */}

      <td className="px-3 py-4 whitespace-nowrap">
        <span className="text-sm text-slate-600">
          {uploadedDate}
        </span>
      </td>

      {/* ACTIONS */}

      <td className="px-3 py-4">

        <div className="flex items-center gap-3">

          {/* VIEW */}

          <button
            type="button"
            onClick={handleView}
            disabled={isDownloading || !document.fileUrl}
            title="View document"
            className="text-slate-500 hover:text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye size={19} />
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
            className="text-slate-500 hover:text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <Loader2
                size={19}
                className="animate-spin"
              />
            ) : (
              <Download size={19} />
            )}
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDownloading}
            title="Delete document"
            className="text-slate-500 hover:text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={19} />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default DocumentRow;