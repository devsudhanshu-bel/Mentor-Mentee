import { useEffect, useState } from "react";
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Loader2,
} from "lucide-react";

import api from "../../api/axios";

// ==========================================================
// FILE EXTENSION
// ==========================================================

const getFileExtension = (fileType, fileUrl, documentName) => {
  if (fileType) {
    const type = fileType.toLowerCase();

    if (type.includes("pdf")) return "pdf";
    if (type.includes("png")) return "png";
    if (type.includes("jpeg") || type.includes("jpg")) return "jpg";
    if (type.includes("gif")) return "gif";
    if (type.includes("webp")) return "webp";
    if (type.includes("word")) return "docx";
    if (type.includes("excel") || type.includes("spreadsheet")) {
      return "xlsx";
    }
    if (type.includes("powerpoint") || type.includes("presentation")) {
      return "pptx";
    }
  }

  const filename = documentName || fileUrl || "";

  const cleanName = filename.split("?")[0].split("#")[0];
  const extension = cleanName.split(".").pop()?.toLowerCase();

  return extension || "";
};

// ==========================================================
// FILE TYPE HELPERS
// ==========================================================

const isImageFile = (extension) => {
  return ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);
};

const isOfficeFile = (extension) => {
  return ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(
    extension
  );
};

// ==========================================================
// RESOLVE PRIVATE FILE URL
// ==========================================================

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) {
    throw new Error("Document file is not available.");
  }

  const baseURL = api.defaults.baseURL;

  if (!baseURL) {
    throw new Error("API base URL is not configured.");
  }

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  const apiBase = new URL(baseURL, window.location.origin);

  const normalizedPath = fileUrl.startsWith("/")
    ? fileUrl
    : `/${fileUrl}`;

  if (normalizedPath.startsWith("/api/")) {
    return new URL(normalizedPath, apiBase.origin).toString();
  }

  if (normalizedPath.startsWith("/files/")) {
    return new URL(
      `${apiBase.pathname.replace(/\/$/, "")}${normalizedPath}`,
      apiBase.origin
    ).toString();
  }

  return new URL(normalizedPath, apiBase).toString();
};

// ==========================================================
// DOCUMENT PREVIEW MODAL
// ==========================================================

const DocumentPreviewModal = ({ document, onClose }) => {
  const [previewState, setPreviewState] = useState({
    documentId: null,
    status: "loading",
    url: null,
    error: null,
  });

  const extension = document
    ? getFileExtension(
        document.fileType,
        document.fileUrl,
        document.documentName
      )
    : "";

  const isPdf = extension === "pdf";
  const isImage = isImageFile(extension);
  const isOffice = isOfficeFile(extension);

  const isLoading =
    Boolean(document) &&
    previewState.documentId !== document.id;

  const hasPreview =
    previewState.documentId === document?.id &&
    previewState.status === "success";

  const previewError =
    previewState.documentId === document?.id &&
    previewState.status === "error"
      ? previewState.error
      : null;

  // ========================================================
  // FETCH PRIVATE DOCUMENT
  // ========================================================

  useEffect(() => {
    if (!document?.id || !document?.fileUrl) {
      return undefined;
    }

    let isActive = true;
    let objectUrl = null;

    const fetchDocument = async () => {
      try {
        const fileUrl = resolveFileUrl(document.fileUrl);

        const response = await api.get(fileUrl, {
          responseType: "blob",
        });

        if (!isActive) {
          return;
        }

        const blob = new Blob([response.data], {
          type:
            response.headers["content-type"] ||
            document.fileType ||
            "application/octet-stream",
        });

        objectUrl = window.URL.createObjectURL(blob);

        setPreviewState({
          documentId: document.id,
          status: "success",
          url: objectUrl,
          error: null,
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error(
          "Failed to load document preview:",
          error
        );

        const status = error?.response?.status;

        let message =
          "Unable to load this document. Please try again.";

        if (status === 401) {
          message =
            "Your session has expired. Please sign in again.";
        } else if (status === 403 || status === 404) {
          message =
            "This document link has expired or the file is no longer available. Please refresh your documents and try again.";
        }

        setPreviewState({
          documentId: document.id,
          status: "error",
          url: null,
          error: message,
        });
      }
    };

    fetchDocument();

    return () => {
      isActive = false;

      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [document?.id, document?.fileUrl, document?.fileType]);

  // ========================================================
  // DOWNLOAD DOCUMENT
  // ========================================================

  const handleDownload = () => {
    if (!hasPreview || !previewState.url) {
      return;
    }

    const link = window.document.createElement("a");

    link.href = previewState.url;
    link.download = document.documentName || "document";

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // ========================================================
  // OPEN IN NEW TAB
  // ========================================================

  const handleOpenInNewTab = () => {
    if (!hasPreview || !previewState.url) {
      return;
    }

    window.open(
      previewState.url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!document) {
    return null;
  }

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4">

      <div className="flex h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:h-[92dvh] sm:rounded-2xl md:h-[90vh]">

        {/* HEADER */}

        <div className="flex min-h-[60px] shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-3 py-2.5 sm:min-h-16 sm:gap-3 sm:px-5 sm:py-3">

          {/* DOCUMENT INFORMATION */}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
              {document.documentName}
            </h2>

            <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
              {extension?.toUpperCase() || "DOCUMENT"}
            </p>
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={handleDownload}
              disabled={!hasPreview}
              aria-label="Download document"
              className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-300 px-2 text-xs text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-3 sm:text-sm"
            >
              <Download size={15} />
              <span className="hidden sm:inline">
                Download
              </span>
            </button>

            {/* OPEN IN NEW TAB */}

            <button
              type="button"
              onClick={handleOpenInNewTab}
              disabled={!hasPreview}
              aria-label="Open in new tab"
              title="Open in new tab"
              className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ExternalLink size={17} />
            </button>

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close document preview"
              title="Close"
              className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100"
            >
              <X size={19} />
            </button>

          </div>
        </div>

        {/* PREVIEW */}

        <div className="relative min-h-0 flex-1 overflow-hidden bg-slate-100">

          {/* LOADING */}

          {isLoading && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">

              <Loader2
                size={30}
                className="animate-spin text-blue-600 sm:size-8"
              />

              <p className="text-center text-xs text-slate-500 sm:text-sm">
                Loading secure document preview...
              </p>

            </div>
          )}

          {/* ERROR */}

          {previewError && (
            <div className="flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6">

              <div className="w-full max-w-md text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm sm:h-16 sm:w-16">
                  <FileText
                    size={25}
                    className="text-red-500 sm:size-7"
                  />
                </div>

                <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
                  Document unavailable
                </h3>

                <p className="mt-2 break-words text-xs leading-5 text-slate-500 sm:text-sm">
                  {previewError}
                </p>

              </div>

            </div>
          )}

          {/* PDF */}

          {hasPreview && isPdf && (
            <iframe
              src={previewState.url}
              title={document.documentName}
              className="h-full w-full border-0"
            />
          )}

          {/* IMAGES */}

          {hasPreview && isImage && (
            <div className="flex h-full w-full items-center justify-center overflow-auto p-2 sm:p-6">

              <img
                src={previewState.url}
                alt={document.documentName}
                className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
              />

            </div>
          )}

          {/* OFFICE DOCUMENTS */}

          {hasPreview && isOffice && (
            <div className="flex h-full items-center justify-center overflow-y-auto p-4 sm:p-6">

              <div className="w-full max-w-md text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm sm:h-16 sm:w-16">
                  <FileText
                    size={25}
                    className="text-blue-600 sm:size-7"
                  />
                </div>

                <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
                  Office document ready
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                  This file is securely loaded. Download it to view
                  or edit it using Microsoft Office or a compatible
                  application.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-xs font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:text-sm"
                >
                  <Download size={16} />
                  Download Document
                </button>

              </div>

            </div>
          )}

          {/* UNSUPPORTED FORMAT */}

          {hasPreview && !isPdf && !isImage && !isOffice && (
            <div className="flex h-full items-center justify-center overflow-y-auto p-4 sm:p-6">

              <div className="w-full max-w-md text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm sm:h-16 sm:w-16">
                  <ExternalLink
                    size={25}
                    className="text-blue-600 sm:size-7"
                  />
                </div>

                <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
                  Preview not available
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                  This file format cannot be displayed directly in
                  the browser. You can download the original document.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-xs font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:text-sm"
                >
                  <Download size={16} />
                  Download Document
                </button>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
