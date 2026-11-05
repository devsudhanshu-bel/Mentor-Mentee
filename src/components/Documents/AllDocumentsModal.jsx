import { useState } from "react";
import {
  X,
  Eye,
  Download,
  Trash2,
  FileText,
  Loader2,
} from "lucide-react";

import { deleteDocument } from "../../api/document.api";
import api from "../../api/axios";

// ==========================================================
// PRIVATE FILE URL RESOLUTION
// ==========================================================

function resolvePrivateFileUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== "string") {
    throw new Error("Document file is not available.");
  }

  const trimmedUrl = fileUrl.trim();

  if (!trimmedUrl) {
    throw new Error("Document file is not available.");
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    const parsedUrl = new URL(trimmedUrl);

    if (parsedUrl.origin !== window.location.origin) {
      throw new Error(
        "The document URL belongs to an untrusted origin."
      );
    }

    return `${parsedUrl.pathname}${parsedUrl.search}`;
  }

  if (/^(blob:|data:|javascript:)/i.test(trimmedUrl)) {
    throw new Error("Unsupported document URL.");
  }

  const normalizedPath = trimmedUrl.startsWith("/")
    ? trimmedUrl
    : `/${trimmedUrl}`;

  // Axios baseURL already contains /api.
  if (normalizedPath.startsWith("/api/")) {
    return normalizedPath.slice(4);
  }

  return normalizedPath;
}

// ==========================================================
// AUTHENTICATED PRIVATE FILE DOWNLOAD
// ==========================================================

async function downloadPrivateDocument(document) {
  const resolvedUrl = resolvePrivateFileUrl(document.fileUrl);

  const response = await api.get(resolvedUrl, {
    responseType: "blob",
    withCredentials: true,
  });

  const blobUrl = window.URL.createObjectURL(response.data);

  const link = window.document.createElement("a");

  link.href = blobUrl;
  link.download = document.documentName || "document";

  window.document.body.appendChild(link);
  link.click();
  link.remove();

  // Allow the browser to begin downloading before cleanup.
  window.setTimeout(() => {
    window.URL.revokeObjectURL(blobUrl);
  }, 60000);
}

// ==========================================================
// MAIN COMPONENT
// ==========================================================

const AllDocumentsModal = ({
  isOpen,
  onClose,
  documents = [],
  onDeleted,
  onView,
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  if (!isOpen) {
    return null;
  }

  // ========================================================
  // FORMAT CATEGORY
  // ========================================================

  const formatCategory = (category) => {
    if (!category) {
      return "Other";
    }

    return category
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // ========================================================
  // FORMAT FILE TYPE
  // ========================================================

  const formatFileType = (fileType) => {
    if (!fileType) {
      return "FILE";
    }

    if (fileType.includes("/")) {
      return fileType.split("/").pop().toUpperCase();
    }

    return fileType.toUpperCase();
  };

  // ========================================================
  // FORMAT DATE
  // ========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ========================================================
  // VIEW DOCUMENT
  // ========================================================

  const handleView = (document) => {
    if (!document?.fileUrl) {
      window.alert("Document file is not available.");
      return;
    }

    // Parent viewer handles authenticated document preview.
    if (onView) {
      onView(document);
    }
  };

  // ========================================================
  // DOWNLOAD DOCUMENT
  // ========================================================

  const handleDownload = async (document) => {
    if (!document?.fileUrl) {
      window.alert("Document file is not available.");
      return;
    }

    try {
      setDownloadingId(document.id);

      await downloadPrivateDocument(document);
    } catch (error) {
      console.error("Failed to download document:", error);

      window.alert(
        error?.response?.data?.message ||
          error.message ||
          "Unable to download the document. Please try again."
      );
    } finally {
      setDownloadingId(null);
    }
  };

  // ========================================================
  // DELETE DOCUMENT
  // ========================================================

  const handleDelete = async (document) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${document.documentName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(document.id);

      await deleteDocument(document.id);

      if (onDeleted) {
        onDeleted(document.id);
      }
    } catch (error) {
      console.error("Failed to delete document:", error);

      window.alert(
        error?.response?.data?.message ||
          "Failed to delete the document. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl">

        {/* HEADER */}

        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3.5 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-800 sm:text-xl">
              All Documents
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {documents.length} document
              {documents.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close documents"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={21} />
          </button>
        </div>

        {/* DOCUMENT LIST */}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5">
          {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <FileText
                  size={25}
                  className="text-slate-400"
                />
              </div>

              <p className="mt-4 text-sm font-medium text-slate-700">
                No documents found
              </p>

              <p className="mt-1 text-xs text-center text-slate-400">
                Upload a document to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((document) => {
                const isDeleting =
                  deletingId === document.id;

                const isDownloading =
                  downloadingId === document.id;

                return (
                  <div
                    key={document.id}
                    className="min-w-0 rounded-lg border border-slate-200 px-3 py-3 transition hover:bg-slate-50 sm:px-4"
                  >
                    {/* DOCUMENT INFORMATION + ACTIONS */}

                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

                      {/* DOCUMENT INFORMATION */}

                      <div className="flex min-w-0 items-start gap-2.5 sm:items-center sm:gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-10 sm:w-10">
                          <FileText
                            size={19}
                            className="text-blue-600 sm:hidden"
                          />

                          <FileText
                            size={20}
                            className="hidden text-blue-600 sm:block"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="break-words text-xs font-semibold leading-5 text-slate-800 sm:truncate sm:text-sm"
                            title={document.documentName}
                          >
                            {document.documentName}
                          </p>

                          <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-[11px] text-slate-500 sm:text-xs">
                              {formatCategory(document.category)}
                            </span>

                            <span className="text-slate-300">
                              •
                            </span>

                            <span className="text-[11px] text-slate-500 sm:text-xs">
                              {formatFileType(document.fileType)}
                            </span>

                            <span className="text-slate-300">
                              •
                            </span>

                            <span className="text-[11px] text-slate-500 sm:text-xs">
                              {formatDate(document.uploadedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="flex shrink-0 items-center justify-end gap-1 border-t border-slate-100 pt-2 sm:border-0 sm:pt-0">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => handleView(document)}
                          disabled={isDeleting || isDownloading}
                          title="View document"
                          aria-label="View document"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Eye size={18} />
                        </button>

                        {/* DOWNLOAD */}

                        <button
                          type="button"
                          onClick={() => handleDownload(document)}
                          disabled={
                            isDeleting ||
                            isDownloading ||
                            !document.fileUrl
                          }
                          title="Download document"
                          aria-label="Download document"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDownloading ? (
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                          ) : (
                            <Download size={18} />
                          )}
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() => handleDelete(document)}
                          disabled={isDeleting || isDownloading}
                          title="Delete document"
                          aria-label="Delete document"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting ? (
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* DESCRIPTION */}

                    {document.description && (
                      <p className="mt-2 break-words text-xs leading-5 text-slate-500 sm:ml-[52px]">
                        {document.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="flex shrink-0 justify-end border-t border-slate-200 px-3 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full rounded-md border border-slate-300 px-5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:h-9 sm:w-auto sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllDocumentsModal;
