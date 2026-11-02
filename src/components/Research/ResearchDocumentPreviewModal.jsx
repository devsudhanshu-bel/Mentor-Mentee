
import { useEffect, useState } from "react";

import {
  X,
  Download,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";

import api from "../../api/axios";

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) return "";

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  if (fileUrl.startsWith("/api/")) {
    return fileUrl.replace(/^\/api/, "");
  }

  return fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`;
};

const getFileExtension = (fileType, fileUrl, documentName) => {
  if (fileType) {
    const type = fileType.toLowerCase();

    if (type.includes("pdf")) return "pdf";

    if (type.includes("jpeg") || type.includes("jpg")) {
      return "jpg";
    }

    if (type.includes("png")) return "png";
    if (type.includes("gif")) return "gif";
    if (type.includes("webp")) return "webp";

    if (
      type.includes("word") ||
      type.includes("document") ||
      type.includes("docx")
    ) {
      return "docx";
    }

    if (
      type.includes("excel") ||
      type.includes("spreadsheet") ||
      type.includes("xlsx")
    ) {
      return "xlsx";
    }

    if (
      type.includes("powerpoint") ||
      type.includes("presentation") ||
      type.includes("pptx")
    ) {
      return "pptx";
    }
  }

  const source = documentName || fileUrl;

  if (source) {
    const cleanSource = source.split("?")[0];
    const extension = cleanSource.split(".").pop()?.toLowerCase();

    if (extension && extension !== cleanSource.toLowerCase()) {
      return extension;
    }
  }

  return "";
};

const isImageFile = (extension) =>
  ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);

const isOfficeFile = (extension) =>
  ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(extension);

// Wrapper: remount the preview when the selected document changes.
const ResearchDocumentPreviewModal = ({
  isOpen,
  document,
  onClose,
  onDownload,
}) => {
  if (!isOpen || !document) {
    return null;
  }

  const previewKey = `${document.id || ""}-${document.fileUrl || ""}`;

  return (
    <ResearchDocumentPreviewContent
      key={previewKey}
      document={document}
      onClose={onClose}
      onDownload={onDownload}
    />
  );
};

const ResearchDocumentPreviewContent = ({
  document,
  onClose,
  onDownload,
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const fileUrl = document?.fileUrl || "";
  const documentName = document?.documentName || "Research Document";

  const extension = getFileExtension(
    document?.fileType,
    fileUrl,
    documentName
  );

  const isPdf = extension === "pdf";
  const isImage = isImageFile(extension);
  const isOffice = isOfficeFile(extension);

  useEffect(() => {
    if (!fileUrl || isOffice) {
      return undefined;
    }

    let isActive = true;
    let objectUrl = "";

    const loadPreview = async () => {
      try {
        const response = await api.get(resolveFileUrl(fileUrl), {
          responseType: "blob",
        });

        objectUrl = window.URL.createObjectURL(response.data);

        if (isActive) {
          setPreviewUrl(objectUrl);
        }
      } catch (err) {
        if (!isActive) return;

        if (err.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else if (err.response?.status === 403) {
          setError("You do not have permission to access this document.");
        } else if (err.response?.status === 404) {
          setError("This document could not be found.");
        } else {
          setError("Unable to load the document preview. Please try again.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadPreview();

    return () => {
      isActive = false;

      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fileUrl, isOffice]);

  const handleDownload = async () => {
    if (!fileUrl || isDownloading) return;

    if (onDownload) {
      onDownload(document);
      return;
    }

    setIsDownloading(true);

    try {
      const response = await api.get(resolveFileUrl(fileUrl), {
        responseType: "blob",
      });

      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = window.document.createElement("a");

      link.href = downloadUrl;
      link.download = documentName;

      window.document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
      }, 60000);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to download this document.");
      } else if (err.response?.status === 404) {
        setError("This document could not be found.");
      } else {
        setError("Unable to download the document. Please try again.");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpen = () => {
    if (!previewUrl) return;

    const newWindow = window.open(
      previewUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!newWindow) {
      setError(
        "Your browser blocked the new tab. Please allow pop-ups and try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      <div className="my-auto flex h-[96dvh] max-h-[96dvh] w-full min-w-0 max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:h-[90vh] sm:max-h-[90vh] sm:rounded-2xl">
        {/* HEADER */}
        <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 px-3 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-0">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
              {documentName}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {extension ? extension.toUpperCase() : "DOCUMENT"}
            </p>
          </div>

          <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!fileUrl || isDownloading}
              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:text-sm"
            >
              {isDownloading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Download size={15} />
              )}

              <span className="truncate">
                {isDownloading ? "Downloading..." : "Download"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleOpen}
              disabled={!previewUrl}
              className="shrink-0 rounded-md p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              title="Open in new tab"
              aria-label="Open document in new tab"
            >
              <ExternalLink size={18} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-md p-2 text-slate-500 transition hover:bg-slate-100"
              title="Close"
              aria-label="Close document preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="min-h-0 flex-1 overflow-hidden bg-slate-100">
          {!fileUrl && (
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-slate-500">
              No document file is available.
            </div>
          )}

          {fileUrl && isLoading && !isOffice && (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-slate-500">
              <Loader2 size={30} className="animate-spin text-blue-600" />
              <p className="text-sm">Loading document...</p>
            </div>
          )}

          {fileUrl && error && (
            <div className="flex h-full items-center justify-center overflow-y-auto p-4 sm:p-6">
              <div className="w-full max-w-md text-center">
                <AlertCircle
                  size={32}
                  className="mx-auto mb-3 text-red-500"
                />

                <h3 className="break-words text-base font-semibold text-slate-800 sm:text-lg">
                  Unable to display document
                </h3>

                <p className="mt-2 break-words text-sm leading-6 text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="mt-5 inline-flex h-10 max-w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
                >
                  {isDownloading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Download size={16} />
                  )}
                  Download Document
                </button>
              </div>
            </div>
          )}

          {/* PDF PREVIEW */}
          {fileUrl && !isLoading && !error && isPdf && previewUrl && (
            <iframe
              src={previewUrl}
              title={documentName}
              className="h-full w-full border-0"
            />
          )}

          {/* IMAGE PREVIEW */}
          {fileUrl && !isLoading && !error && isImage && previewUrl && (
            <div className="flex h-full w-full items-center justify-center overflow-auto p-3 sm:p-6">
              <img
                src={previewUrl}
                alt={documentName}
                className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
              />
            </div>
          )}

          {/* OFFICE FILE */}
          {fileUrl && !isLoading && !error && isOffice && (
            <div className="flex h-full items-center justify-center overflow-y-auto p-4 sm:p-6">
              <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm sm:h-16 sm:w-16">
                  <ExternalLink size={28} className="text-blue-600" />
                </div>

                <h3 className="break-words text-base font-semibold text-slate-800 sm:text-lg">
                  Secure preview unavailable
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  This Office document is stored privately. Download it to
                  view it using Microsoft Office or a compatible application.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="mt-5 inline-flex h-10 max-w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
                >
                  {isDownloading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Download size={16} />
                  )}
                  Download Document
                </button>
              </div>
            </div>
          )}

          {/* OTHER FILE FORMATS */}
          {fileUrl &&
            !isLoading &&
            !error &&
            !isPdf &&
            !isImage &&
            !isOffice && (
              <div className="flex h-full items-center justify-center overflow-y-auto p-4 sm:p-6">
                <div className="w-full max-w-md text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm sm:h-16 sm:w-16">
                    <ExternalLink size={28} className="text-blue-600" />
                  </div>

                  <h3 className="break-words text-base font-semibold text-slate-800 sm:text-lg">
                    Preview not available
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This research file format cannot be displayed directly
                    in the browser. You can download the original document.
                  </p>

                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="mt-5 inline-flex h-10 max-w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
                  >
                    {isDownloading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Download size={16} />
                    )}
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

export default ResearchDocumentPreviewModal;
