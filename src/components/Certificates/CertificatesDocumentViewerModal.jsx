import React, { useEffect, useState } from "react";

import {
  X,
  Download,
  ExternalLink,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

const CertificatesDocumentViewerModal = ({
  isOpen,
  onClose,
  document,
}) => {
  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // RESET LOADING WHEN DOCUMENT CHANGES
  // ==========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setLoading(true);
  }, [isOpen, document]);

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    onClose?.();
  };

  // ==========================================================
  // FILE EXTENSION
  // ==========================================================

  const getFileExtension = () => {
    if (document?.fileType) {
      return document.fileType
        .toLowerCase()
        .replace(".", "")
        .split("/")
        .pop();
    }

    if (document?.documentName) {
      const parts =
        document.documentName.split(".");

      if (parts.length > 1) {
        return parts.pop().toLowerCase();
      }
    }

    return "";
  };

  const fileExtension =
    getFileExtension();

  // ==========================================================
  // FILE TYPE
  // ==========================================================

  const isPdf =
    fileExtension === "pdf";

  const isImage =
    [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
    ].includes(fileExtension);

  const isWord =
    [
      "doc",
      "docx",
    ].includes(fileExtension);

  const isPowerPoint =
    [
      "ppt",
      "pptx",
    ].includes(fileExtension);

  const isExcel =
    [
      "xls",
      "xlsx",
    ].includes(fileExtension);

  // ==========================================================
  // FILE ICON
  // ==========================================================

  const getFileIcon = () => {
    if (isImage) {
      return (
        <ImageIcon
          size={20}
          className="text-purple-600"
        />
      );
    }

    if (isPdf) {
      return (
        <FileText
          size={20}
          className="text-red-500"
        />
      );
    }

    if (isWord) {
      return (
        <FileText
          size={20}
          className="text-blue-600"
        />
      );
    }

    if (isPowerPoint) {
      return (
        <Presentation
          size={20}
          className="text-orange-500"
        />
      );
    }

    if (isExcel) {
      return (
        <FileSpreadsheet
          size={20}
          className="text-green-500"
        />
      );
    }

    return (
      <FileText
        size={20}
        className="text-slate-500"
      />
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
          day: "numeric",
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
      return "Unknown size";
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
  // DOWNLOAD
  // ==========================================================

  const handleDownload = () => {
    if (!document?.fileUrl) {
      return;
    }

    const link =
      window.document.createElement(
        "a"
      );

    link.href =
      document.fileUrl;

    link.target = "_blank";

    link.rel =
      "noopener noreferrer";

    link.download =
      document.documentName ||
      "certificate";

    window.document.body.appendChild(
      link
    );

    link.click();

    window.document.body.removeChild(
      link
    );
  };

  // ==========================================================
  // OPEN IN NEW TAB
  // ==========================================================

  const handleOpenNewTab = () => {
    if (!document?.fileUrl) {
      return;
    }

    window.open(
      document.fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================================
  // NOT OPEN
  // ==========================================================

  if (!isOpen) {
    return null;
  }

  // ==========================================================
  // NO DOCUMENT
  // ==========================================================

  if (!document) {
    return null;
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >

      <div className="w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">

          <div className="flex items-center gap-3 min-w-0">

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              {getFileIcon()}
            </div>

            <div className="min-w-0">

              <h2
                className="text-sm font-semibold text-slate-800 truncate max-w-[600px]"
                title={
                  document.documentName
                }
              >
                {document.documentName ||
                  "Certificate"}
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Certificate
                <span className="mx-1.5">
                  •
                </span>
                {formatDate(
                  document.uploadedAt
                )}

                {document.fileSize ? (
                  <>
                    <span className="mx-1.5">
                      •
                    </span>

                    {formatFileSize(
                      document.fileSize
                    )}
                  </>
                ) : null}
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-1">

            {/* OPEN */}

            {document.fileUrl && (
              <button
                type="button"
                onClick={
                  handleOpenNewTab
                }
                title="Open in new tab"
                className="p-2 rounded-md hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition"
              >
                <ExternalLink
                  size={17}
                />
              </button>
            )}

            {/* DOWNLOAD */}

            {document.fileUrl && (
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
            )}

            {/* CLOSE */}

            <button
              type="button"
              onClick={
                handleClose
              }
              className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition ml-1"
            >
              <X size={18} />
            </button>

          </div>

        </div>

        {/* ==================================================
            DOCUMENT INFORMATION
        ================================================== */}

        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 shrink-0">

          <div className="flex items-center gap-4 flex-wrap">

            {/* TYPE */}

            <div className="flex items-center gap-2">

              <span className="text-[11px] font-medium text-slate-400 uppercase">
                Type
              </span>

              <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-600 uppercase">
                {fileExtension ||
                  "FILE"}
              </span>

            </div>

            {/* CATEGORY */}

            <div className="flex items-center gap-2">

              <span className="text-[11px] font-medium text-slate-400 uppercase">
                Category
              </span>

              <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[11px] font-medium">
                Certificates
              </span>

            </div>

            {/* DATE */}

            <div className="flex items-center gap-2">

              <span className="text-[11px] font-medium text-slate-400 uppercase">
                Uploaded
              </span>

              <span className="text-xs text-slate-600">
                {formatDate(
                  document.uploadedAt
                )}
              </span>

            </div>

          </div>

        </div>

        {/* ==================================================
            VIEWER
        ================================================== */}

        <div className="flex-1 min-h-0 bg-slate-100 p-4 overflow-hidden">

          {!document.fileUrl ? (

            <div className="h-full flex items-center justify-center">

              <div className="text-center">

                <div className="w-14 h-14 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3">
                  <FileText
                    size={24}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="text-sm font-semibold text-slate-700">
                  Certificate file unavailable
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  No file URL was returned
                  by the server.
                </p>

              </div>

            </div>

          ) : isPdf ? (

            /* ==================================================
               PDF VIEWER
            ================================================== */

            <div className="relative h-full bg-white rounded-lg border border-slate-200 overflow-hidden">

              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">

                  <div className="flex flex-col items-center">

                    <Loader2
                      size={24}
                      className="text-blue-600 animate-spin"
                    />

                    <p className="text-xs text-slate-500 mt-2">
                      Loading certificate...
                    </p>

                  </div>

                </div>
              )}

              <iframe
                src={
                  document.fileUrl
                }
                title={
                  document.documentName ||
                  "Certificate"
                }
                className="w-full h-full border-0"
                onLoad={() =>
                  setLoading(false)
                }
              />

            </div>

          ) : isImage ? (

            /* ==================================================
               IMAGE VIEWER
            ================================================== */

            <div className="h-full bg-white rounded-lg border border-slate-200 overflow-auto flex items-center justify-center p-6">

              {loading && (
                <div className="absolute flex flex-col items-center">

                  <Loader2
                    size={24}
                    className="text-blue-600 animate-spin"
                  />

                  <p className="text-xs text-slate-500 mt-2">
                    Loading certificate...
                  </p>

                </div>
              )}

              <img
                src={
                  document.fileUrl
                }
                alt={
                  document.documentName ||
                  "Certificate"
                }
                className={`max-w-full max-h-full object-contain ${
                  loading
                    ? "opacity-0"
                    : "opacity-100"
                } transition-opacity`}
                onLoad={() =>
                  setLoading(false)
                }
                onError={() =>
                  setLoading(false)
                }
              />

            </div>

          ) : (

            /* ==================================================
               OTHER FILE TYPES
            ================================================== */

            <div className="h-full flex items-center justify-center">

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center max-w-md">

                <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {getFileIcon()}
                </div>

                <h3 className="text-sm font-semibold text-slate-800">
                  Preview unavailable
                </h3>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  This file type cannot be
                  previewed directly in the
                  browser.
                </p>

                <button
                  type="button"
                  onClick={
                    handleOpenNewTab
                  }
                  className="mt-5 h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium inline-flex items-center gap-2 transition"
                >
                  <ExternalLink
                    size={14}
                  />
                  Open Certificate
                </button>

              </div>

            </div>

          )}

        </div>

        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        {document.description && (
          <div className="px-5 py-3 border-t border-slate-200 bg-white shrink-0">

            <p className="text-[11px] font-medium text-slate-400 uppercase mb-1">
              Description
            </p>

            <p className="text-xs text-slate-600 leading-5">
              {document.description}
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default CertificatesDocumentViewerModal;