import React from "react";
import { CalendarDays, HardDrive } from "lucide-react";

import FileIcon from "./FileIcon";
import CategoryBadge from "./CategoryBadge";
import FileTypeBadge from "./FileTypeBadge";
import TableActions from "./TableActions";

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

const DocumentRow = ({ document, onView, onDownload }) => {
  const name = document.documentName || "Untitled Document";
  const fileType = document.fileType || "";
  const description = document.description || "No description provided.";

  const handleView = () => {
    if (onView) {
      onView(document);
      return;
    }

    if (document.fileUrl) {
      window.open(document.fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(document);
      return;
    }

    if (document.fileUrl) {
      const link = window.document.createElement("a");
      link.href = document.fileUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = name;

      window.document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

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
        <TableActions
          onView={handleView}
          onDownload={handleDownload}
        />
      </td>
    </tr>
  );
};

export default DocumentRow;