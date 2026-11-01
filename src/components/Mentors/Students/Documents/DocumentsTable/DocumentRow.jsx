import { useState } from "react";

import {
  CalendarDays,
  HardDrive,
  LoaderCircle,
} from "lucide-react";

import api from "../../../../../api/axios";

import FileIcon from "./FileIcon";
import CategoryBadge from "./CategoryBadge";
import FileTypeBadge from "./FileTypeBadge";
import TableActions from "./TableActions";

// ==========================================================
// FORMAT DATE
// ==========================================================

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

// ==========================================================
// FORMAT FILE SIZE
// ==========================================================

const formatFileSize = (value) => {
  if (value == null || value === "") return "—";

  const bytes = Number(value);

  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ==========================================================
// RESOLVE FILE URL
// ==========================================================

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) return null;

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  if (fileUrl.startsWith("/api/")) {
    return fileUrl.replace(/^\/api/, "");
  }

  return fileUrl.startsWith("/")
    ? fileUrl
    : `/${fileUrl}`;
};

// ==========================================================
// DOCUMENT ROW
// ==========================================================

const DocumentRow = ({
  document,
  onView,
  onDownload,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const name = document.documentName || "Untitled Document";
  const fileType = document.fileType || "";
  const description =
    document.description || "No description provided.";

  // ==========================================================
  // AUTHENTICATED FILE FETCH
  // ==========================================================

  const fetchDocumentBlob = async () => {
    const fileUrl = resolveFileUrl(document.fileUrl);

    if (!fileUrl) {
      throw new Error("Document URL is unavailable.");
    }

    const response = await api.get(fileUrl, {
      responseType: "blob",
    });

    return response.data;
  };

  // ==========================================================
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = async () => {
    if (onView) {
      onView(document);
      return;
    }

    if (!document.fileUrl || isOpening) return;

    const newWindow = window.open("about:blank", "_blank");

    if (!newWindow) {
      alert(
        "Your browser blocked the new tab. Please allow pop-ups and try again."
      );
      return;
    }

    newWindow.opener = null;

    try {
      setIsOpening(true);

      const blob = await fetchDocumentBlob();
      const objectUrl = window.URL.createObjectURL(blob);

      newWindow.location.href = objectUrl;

      window.setTimeout(() => {
        window.URL.revokeObjectURL(objectUrl);
      }, 60000);

    } catch (error) {
      console.error("Failed to open document:", error);

      newWindow.close();

      const status = error.response?.status;

      if (status === 401 || status === 403) {
        alert("You are not authorized to access this document.");
      } else if (status === 404) {
        alert("The requested document could not be found.");
      } else {
        alert("Unable to open the document. Please try again.");
      }

    } finally {
      setIsOpening(false);
    }
  };

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = async () => {
    if (onDownload) {
      onDownload(document);
      return;
    }

    if (!document.fileUrl || isDownloading) return;

    let objectUrl = null;

    try {
      setIsDownloading(true);

      const blob = await fetchDocumentBlob();

      objectUrl = window.URL.createObjectURL(blob);

      const link = window.document.createElement("a");

      link.href = objectUrl;
      link.download = name;

      window.document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Failed to download document:", error);

      const status = error.response?.status;

      if (status === 401 || status === 403) {
        alert("You are not authorized to download this document.");
      } else if (status === 404) {
        alert("The requested document could not be found.");
      } else {
        alert("Unable to download the document. Please try again.");
      }

    } finally {
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }

      setIsDownloading(false);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">

      {/* DOCUMENT */}

      <td className="px-4 py-2.5">
        <div className="flex items-center gap-2.5">

          <FileIcon type={fileType} />

          <div className="min-w-0">
            <h4
              className="break-words text-[11px] font-semibold leading-4 text-slate-800"
              title={name}
            >
              {name}
            </h4>

            <p className="mt-0.5 break-words text-[9px] leading-4 text-slate-500">
              {description}
            </p>
          </div>

        </div>
      </td>

      {/* CATEGORY */}

      <td className="px-4 py-2.5">
        <CategoryBadge category={document.category} />
      </td>

      {/* FILE TYPE */}

      <td className="px-4 py-2.5">
        <FileTypeBadge type={fileType} />
      </td>

      {/* UPLOADED DATE */}

      <td className="px-4 py-2.5">
        <div className="flex items-center gap-1.5">

          <CalendarDays
            size={11}
            className="shrink-0 text-slate-400"
          />

          <span className="whitespace-nowrap text-[9px] leading-4 text-slate-600">
            {formatDate(document.uploadedAt)}
          </span>

        </div>
      </td>

      {/* FILE SIZE */}

      <td className="px-4 py-2.5">
        <div className="flex items-center gap-1.5">

          <HardDrive
            size={11}
            className="shrink-0 text-slate-400"
          />

          <span className="whitespace-nowrap text-[9px] leading-4 text-slate-600">
            {formatFileSize(document.fileSize)}
          </span>

        </div>
      </td>

      {/* ACTIONS */}

      <td className="px-4 py-2.5 text-right">
        <div className="inline-flex items-center gap-1">

          {(isOpening || isDownloading) && (
            <LoaderCircle
              size={14}
              className="animate-spin text-blue-600"
            />
          )}

          <TableActions
            onView={handleView}
            onDownload={handleDownload}
          />

        </div>
      </td>

    </tr>
  );
};

export default DocumentRow;