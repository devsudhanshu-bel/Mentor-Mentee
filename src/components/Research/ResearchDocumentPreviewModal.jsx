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
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* HEADER */}

        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-800 truncate">
              {documentName}
            </h2>

            <p className="text-xs text-slate-500 mt-0.5">
              {extension ? extension.toUpperCase() : "DOCUMENT"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!fileUrl || isDownloading}
              className="h-9 px-3 rounded-md border border-slate-300 hover:bg-slate-50 text-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Download size={15} />
              )}

              {isDownloading ? "Downloading..." : "Download"}
            </button>

            <button
              type="button"
              onClick={handleOpen}
              disabled={!previewUrl}
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
          {!fileUrl && (
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              No document file is available.
            </div>
          )}

          {fileUrl && isLoading && !isOffice && (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-500">
              <Loader2 size={30} className="animate-spin text-blue-600" />
              <p className="text-sm">Loading document...</p>
            </div>
          )}

          {fileUrl && error && (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <AlertCircle
                  size={32}
                  className="text-red-500 mx-auto mb-3"
                />

                <h3 className="text-lg font-semibold text-slate-800">
                  Unable to display document
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Download size={16} />
                  Download Document
                </button>
              </div>
            </div>
          )}

          {fileUrl && !isLoading && !error && isPdf && previewUrl && (
            <iframe
              src={previewUrl}
              title={documentName}
              className="w-full h-full border-0"
            />
          )}

          {fileUrl && !isLoading && !error && isImage && previewUrl && (
            <div className="w-full h-full flex items-center justify-center p-6 overflow-auto">
              <img
                src={previewUrl}
                alt={documentName}
                className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
              />
            </div>
          )}

          {fileUrl && !isLoading && !error && isOffice && (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <ExternalLink size={28} className="text-blue-600" />
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  Secure preview unavailable
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  This Office document is stored privately. Download it to
                  view it using Microsoft Office or a compatible application.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Download size={16} />
                  Download Document
                </button>
              </div>
            </div>
          )}

          {fileUrl &&
            !isLoading &&
            !error &&
            !isPdf &&
            !isImage &&
            !isOffice && (
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <ExternalLink size={28} className="text-blue-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    Preview not available
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    This research file format cannot be displayed directly
                    in the browser. You can download the original document.
                  </p>

                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50"
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

export default ResearchDocumentPreviewModal;