import React, { useState } from "react";
import {
  X,
  Eye,
  Download,
  Trash2,
  FileText,
  Loader2,
} from "lucide-react";

import { deleteDocument } from "../../api/document.api";

const AllDocumentsModal = ({
  isOpen,
  onClose,
  documents = [],
  onDeleted,
  onView,
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // ==========================================================
  // DO NOT RENDER WHEN CLOSED
  // ==========================================================

  if (!isOpen) {
    return null;
  }

  // ==========================================================
  // FORMAT CATEGORY
  // ==========================================================

  const formatCategory = (category) => {
    if (!category) {
      return "Other";
    }

    return category
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // ==========================================================
  // FORMAT FILE TYPE
  // ==========================================================

  const formatFileType = (fileType) => {
    if (!fileType) {
      return "FILE";
    }

    if (fileType.includes("/")) {
      return fileType
        .split("/")
        .pop()
        .toUpperCase();
    }

    return fileType.toUpperCase();
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================================
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = (document) => {
    if (!document?.fileUrl) {
      window.alert(
        "Document file is not available."
      );
      return;
    }

    /*
     * Pass the complete document object to the
     * parent viewer.
     *
     * IMPORTANT:
     * We do NOT call getDocumentById() here.
     *
     * The dashboard already contains fileUrl.
     */

    if (onView) {
      onView(document);
    }
  };

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = async (document) => {
    if (!document?.fileUrl) {
      window.alert(
        "Document file is not available."
      );
      return;
    }

    try {
      setDownloadingId(document.id);

      /*
       * Try to download the actual Cloudinary file.
       */

      const response = await fetch(
        document.fileUrl
      );

      if (!response.ok) {
        throw new Error(
          "Unable to download document."
        );
      }

      const blob = await response.blob();

      const blobUrl =
        window.URL.createObjectURL(blob);

      const link =
        window.document.createElement("a");

      link.href = blobUrl;

      /*
       * Preserve the document name.
       */

      link.download =
        document.documentName ||
        "document";

      window.document.body.appendChild(link);

      link.click();

      window.document.body.removeChild(link);

      /*
       * Clean up temporary object URL.
       */

      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
      console.error(
        "Failed to download document:",
        error
      );

      /*
       * Cloudinary/browser CORS can sometimes prevent
       * fetch-based downloading.
       *
       * In that case, open the actual file URL.
       */

      window.open(
        document.fileUrl,
        "_blank",
        "noopener,noreferrer"
      );

    } finally {
      setDownloadingId(null);
    }
  };

  // ==========================================================
  // DELETE DOCUMENT
  // ==========================================================

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

      /*
       * Immediately update the parent state.
       *
       * No page reload required.
       */

      if (onDeleted) {
        onDeleted(document.id);
      }

    } catch (error) {
      console.error(
        "Failed to delete document:",
        error
      );

      window.alert(
        error?.response?.data?.message ||
          "Failed to delete the document. Please try again."
      );

    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">

          <div>

            <h2 className="text-xl font-semibold text-slate-800">
              All Documents
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {documents.length} document
              {documents.length !== 1
                ? "s"
                : ""}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={21} />
          </button>

        </div>

        {/* ====================================================
            DOCUMENT LIST
        ==================================================== */}

        <div className="flex-1 overflow-y-auto p-5">

          {documents.length === 0 ? (

            <div className="py-16 flex flex-col items-center justify-center">

              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">

                <FileText
                  size={25}
                  className="text-slate-400"
                />

              </div>

              <p className="text-sm font-medium text-slate-700 mt-4">
                No documents found
              </p>

              <p className="text-xs text-slate-400 mt-1">
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
                    className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition"
                  >

                    <div className="flex items-center justify-between gap-4">

                      {/* ======================================
                          DOCUMENT INFORMATION
                      ====================================== */}

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">

                          <FileText
                            size={20}
                            className="text-blue-600"
                          />

                        </div>

                        <div className="min-w-0">

                          <p
                            className="text-sm font-semibold text-slate-800 truncate"
                            title={
                              document.documentName
                            }
                          >
                            {document.documentName}
                          </p>

                          <div className="flex items-center flex-wrap gap-2 mt-1">

                            <span className="text-xs text-slate-500">
                              {formatCategory(
                                document.category
                              )}
                            </span>

                            <span className="text-slate-300">
                              •
                            </span>

                            <span className="text-xs text-slate-500">
                              {formatFileType(
                                document.fileType
                              )}
                            </span>

                            <span className="text-slate-300">
                              •
                            </span>

                            <span className="text-xs text-slate-500">
                              {formatDate(
                                document.uploadedAt
                              )}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* ======================================
                          ACTIONS
                      ====================================== */}

                      <div className="flex items-center gap-1 shrink-0">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            handleView(document)
                          }
                          disabled={
                            isDeleting ||
                            isDownloading
                          }
                          title="View document"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
                        >
                          <Eye size={18} />
                        </button>

                        {/* DOWNLOAD */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(
                              document
                            )
                          }
                          disabled={
                            isDeleting ||
                            isDownloading ||
                            !document.fileUrl
                          }
                          title="Download document"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
                        >

                          {isDownloading ? (

                            <Loader2
                              size={18}
                              className="animate-spin"
                            />

                          ) : (

                            <Download
                              size={18}
                            />

                          )}

                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              document
                            )
                          }
                          disabled={
                            isDeleting ||
                            isDownloading
                          }
                          title="Delete document"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50"
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

                    {/* ========================================
                        DESCRIPTION
                    ======================================== */}

                    {document.description && (

                      <p className="text-xs text-slate-500 mt-2 ml-[52px] line-clamp-2">
                        {document.description}
                      </p>

                    )}

                  </div>
                );
              })}

            </div>

          )}

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="border-t border-slate-200 px-6 py-4 flex justify-end shrink-0">

          <button
            type="button"
            onClick={onClose}
            className="h-9 px-5 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default AllDocumentsModal;