import { useEffect, useState } from "react";
import { X, Download, ExternalLink, FileText, Loader2 } from "lucide-react";

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
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}

        <div className="min-h-16 flex items-center justify-between px-5 py-3 border-b border-slate-200 flex-shrink-0 gap-3">

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-800 truncate">
              {document.documentName}
            </h2>

            <p className="text-xs text-slate-500 mt-0.5">
              {extension?.toUpperCase() || "DOCUMENT"}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">

            <button
              type="button"
              onClick={handleDownload}
              disabled={!hasPreview}
              className="h-9 px-3 rounded-md border border-slate-300 hover:bg-slate-50 text-sm flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={15} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              type="button"
              onClick={handleOpenInNewTab}
              disabled={!hasPreview}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition disabled:opacity-50"
              title="Open in new tab"
            >
              <ExternalLink size={18} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition"
              title="Close"
            >
              <X size={20} />
            </button>

          </div>
        </div>

        {/* PREVIEW */}

        <div className="flex-1 bg-slate-100 overflow-hidden">

          {/* LOADING */}

          {isLoading && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">

              <Loader2
                size={32}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm text-slate-500">
                Loading secure document preview...
              </p>

            </div>
          )}

          {/* ERROR */}

          {previewError && (
            <div className="w-full h-full flex items-center justify-center p-6">

              <div className="text-center max-w-md">

                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FileText
                    size={28}
                    className="text-red-500"
                  />
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  Document unavailable
                </h3>

                <p className="text-sm text-slate-500 mt-2">
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
              className="w-full h-full border-0"
            />
          )}

          {/* IMAGES */}

          {hasPreview && isImage && (
            <div className="w-full h-full flex items-center justify-center p-6 overflow-auto">

              <img
                src={previewState.url}
                alt={document.documentName}
                className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
              />

            </div>
          )}

          {/* OFFICE DOCUMENTS */}

          {hasPreview && isOffice && (
            <div className="h-full flex items-center justify-center p-6">

              <div className="text-center max-w-md">

                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FileText
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  Office document ready
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  This file is securely loaded. Download it to view
                  or edit it using Microsoft Office or a compatible
                  application.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Document
                </button>

              </div>

            </div>
          )}

          {/* UNSUPPORTED FORMAT */}

          {hasPreview && !isPdf && !isImage && !isOffice && (
            <div className="h-full flex items-center justify-center p-6">

              <div className="text-center max-w-md">

                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <ExternalLink
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  Preview not available
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  This file format cannot be displayed directly in
                  the browser. You can download the original document.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2"
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