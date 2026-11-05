import { useEffect, useState } from "react";

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

import api from "../../api/axios";

const CertificatesDocumentViewerModal = ({
  isOpen,
  onClose,
  document,
}) => {
  const [previewState, setPreviewState] = useState({
    requestKey: "",
    previewUrl: "",
    error: "",
  });

  const [downloading, setDownloading] = useState(false);

  const currentFileUrl = document?.fileUrl || "";
  const requestKey = `${isOpen}:${currentFileUrl}`;

  const isLoading =
    isOpen &&
    Boolean(currentFileUrl) &&
    previewState.requestKey !== requestKey;

  const previewUrl =
    previewState.requestKey === requestKey
      ? previewState.previewUrl
      : "";

  const fileError =
    previewState.requestKey === requestKey
      ? previewState.error
      : "";

  // ==========================================================
  // RESOLVE PRIVATE FILE URL
  // ==========================================================

  const resolveFileUrl = (fileUrl) => {
    if (!fileUrl) return "";

    if (/^https?:\/\//i.test(fileUrl)) {
      return fileUrl;
    }

    if (fileUrl.startsWith("/api/")) {
      return fileUrl.replace(/^\/api/, "");
    }

    return fileUrl;
  };

  // ==========================================================
  // FETCH PRIVATE FILE
  // ==========================================================

  useEffect(() => {
    if (!isOpen || !currentFileUrl) {
      return undefined;
    }

    let isCancelled = false;
    let objectUrl = "";

    const fetchDocument = async () => {
      try {
        const response = await api.get(
          resolveFileUrl(currentFileUrl),
          {
            responseType: "blob",
          }
        );

        if (isCancelled) return;

        objectUrl = URL.createObjectURL(response.data);

        setPreviewState({
          requestKey,
          previewUrl: objectUrl,
          error: "",
        });
      } catch (error) {
        if (isCancelled) return;

        console.error(
          "Certificate file fetch failed:",
          error
        );

        const status = error.response?.status;

        let message =
          "Unable to load the certificate. Please try again.";

        if (status === 401 || status === 403) {
          message =
            "You are not authorized to access this certificate. Please refresh and try again.";
        } else if (status === 404) {
          message =
            "The certificate file could not be found.";
        }

        setPreviewState({
          requestKey,
          previewUrl: "",
          error: message,
        });
      }
    };

    fetchDocument();

    return () => {
      isCancelled = true;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [isOpen, currentFileUrl, requestKey]);

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
      const parts = document.documentName.split(".");

      if (parts.length > 1) {
        return parts.pop().toLowerCase();
      }
    }

    return "";
  };

  const fileExtension = getFileExtension();

  // ==========================================================
  // FILE TYPE
  // ==========================================================

  const isPdf = fileExtension === "pdf";

  const isImage = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
  ].includes(fileExtension);

  const isWord = ["doc", "docx"].includes(fileExtension);

  const isPowerPoint = ["ppt", "pptx"].includes(fileExtension);

  const isExcel = ["xls", "xlsx"].includes(fileExtension);

  // ==========================================================
  // FILE ICON
  // ==========================================================

  const getFileIcon = () => {
    if (isImage) {
      return <ImageIcon size={20} className="text-purple-600" />;
    }

    if (isPdf) {
      return <FileText size={20} className="text-red-500" />;
    }

    if (isWord) {
      return <FileText size={20} className="text-blue-600" />;
    }

    if (isPowerPoint) {
      return <Presentation size={20} className="text-orange-500" />;
    }

    if (isExcel) {
      return <FileSpreadsheet size={20} className="text-green-500" />;
    }

    return <FileText size={20} className="text-slate-500" />;
  };

  // ==========================================================
  // DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    try {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return "Unknown date";
      }

      return parsedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  // ==========================================================
  // FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // ==========================================================
  // FETCH FILE FOR DOWNLOAD / OPEN
  // ==========================================================

  const fetchFileBlob = async () => {
    if (!document?.fileUrl) {
      throw new Error("Certificate file URL is unavailable.");
    }

    const response = await api.get(
      resolveFileUrl(document.fileUrl),
      {
        responseType: "blob",
      }
    );

    return response.data;
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = async () => {
    if (!document?.fileUrl || downloading) return;

    let downloadUrl = "";

    try {
      setDownloading(true);

      const blob = await fetchFileBlob();

      downloadUrl = URL.createObjectURL(blob);

      const link = window.document.createElement("a");

      link.href = downloadUrl;
      link.download =
        document.documentName || "certificate";

      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } catch (error) {
      console.error("Certificate download failed:", error);

      alert(
        error.response?.status === 401 ||
        error.response?.status === 403
          ? "You are not authorized to download this certificate."
          : "Unable to download the certificate. Please try again."
      );
    } finally {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }

      setDownloading(false);
    }
  };

  // ==========================================================
  // OPEN IN NEW TAB
  // ==========================================================

  const handleOpenNewTab = async () => {
    if (!document?.fileUrl) return;

    const newTab = window.open("about:blank", "_blank");

    try {
      const blob = await fetchFileBlob();
      const objectUrl = URL.createObjectURL(blob);

      if (newTab) {
        newTab.opener = null;
        newTab.location.href = objectUrl;
      } else {
        window.open(
          objectUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch (error) {
      if (newTab) {
        newTab.close();
      }

      console.error("Certificate open failed:", error);

      alert(
        error.response?.status === 401 ||
        error.response?.status === 403
          ? "You are not authorized to access this certificate."
          : "Unable to open the certificate. Please try again."
      );
    }
  };

  // ==========================================================
  // NOT OPEN
  // ==========================================================

  if (!isOpen || !document) {
    return null;
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        overflow-y-auto
        bg-black/50 backdrop-blur-sm
        p-2 sm:p-4 md:p-5
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* ======================================================
          MODAL
      ====================================================== */}

      <div
        className="
          my-auto flex
          h-[96dvh] sm:h-[92dvh] md:h-[90vh]
          w-full max-w-5xl
          min-h-0 flex-col
          overflow-hidden rounded-lg sm:rounded-xl
          border border-slate-200
          bg-white shadow-2xl
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="
          flex shrink-0 items-center justify-between gap-2
          border-b border-slate-200
          px-3 py-3 sm:px-5 sm:py-4
        ">

          {/* FILE INFORMATION */}

          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">

            <div className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg bg-blue-50
              sm:h-10 sm:w-10
            ">
              {getFileIcon()}
            </div>

            <div className="min-w-0 flex-1">

              <h2
                className="truncate text-xs font-semibold text-slate-800 sm:text-sm"
                title={document.documentName}
              >
                {document.documentName || "Certificate"}
              </h2>

              <p className="mt-0.5 flex flex-wrap items-center gap-x-1 text-[10px] text-slate-500 sm:text-xs">
                <span>Certificate</span>
                <span>•</span>
                <span>{formatDate(document.uploadedAt)}</span>

                {document.fileSize ? (
                  <>
                    <span>•</span>
                    <span>{formatFileSize(document.fileSize)}</span>
                  </>
                ) : null}
              </p>

            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">

            {document.fileUrl && (
              <button
                type="button"
                onClick={handleOpenNewTab}
                title="Open in new tab"
                aria-label="Open in new tab"
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-md text-slate-500
                  transition hover:bg-blue-50 hover:text-blue-600
                "
              >
                <ExternalLink size={17} />
              </button>
            )}

            {document.fileUrl && (
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                title="Download"
                aria-label="Download certificate"
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-md text-slate-500
                  transition hover:bg-slate-100 hover:text-slate-700
                  disabled:opacity-50
                "
              >
                {downloading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Download size={17} />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close viewer"
              className="
                ml-0.5 flex h-9 w-9 items-center justify-center
                rounded-md text-slate-500
                transition hover:bg-slate-100 hover:text-slate-700
              "
            >
              <X size={18} />
            </button>

          </div>
        </div>

        {/* ====================================================
            DOCUMENT INFORMATION
        ==================================================== */}

        <div className="
          shrink-0 border-b border-slate-200
          bg-slate-50
          px-3 py-2.5 sm:px-5 sm:py-3
        ">

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">

            {/* TYPE */}

            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <span className="text-[9px] font-medium uppercase text-slate-400 sm:text-[11px]">
                Type
              </span>

              <span className="max-w-[90px] truncate rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium uppercase text-slate-600 sm:max-w-none sm:text-[11px]">
                {fileExtension || "FILE"}
              </span>
            </div>

            {/* CATEGORY */}

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[9px] font-medium uppercase text-slate-400 sm:text-[11px]">
                Category
              </span>

              <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600 sm:text-[11px]">
                Certificates
              </span>
            </div>

            {/* UPLOAD DATE */}

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[9px] font-medium uppercase text-slate-400 sm:text-[11px]">
                Uploaded
              </span>

              <span className="text-[10px] text-slate-600 sm:text-xs">
                {formatDate(document.uploadedAt)}
              </span>
            </div>

          </div>
        </div>

        {/* ====================================================
            DOCUMENT VIEWER
        ==================================================== */}

        <div className="
          min-h-0 flex-1 overflow-hidden
          bg-slate-100
          p-2 sm:p-3 md:p-4
        ">

          {/* NO FILE URL */}

          {!document.fileUrl ? (

            <div className="flex h-full items-center justify-center">
              <div className="max-w-xs px-4 text-center">

                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white">
                  <FileText size={24} className="text-slate-400" />
                </div>

                <h3 className="text-sm font-semibold text-slate-700">
                  Certificate file unavailable
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  No file URL was returned by the server.
                </p>

              </div>
            </div>

          ) : isLoading ? (

            /* LOADING */

            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center">

                <Loader2
                  size={26}
                  className="animate-spin text-blue-600"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Loading certificate...
                </p>

              </div>
            </div>

          ) : fileError ? (

            /* ERROR */

            <div className="flex h-full items-center justify-center">
              <div className="max-w-md rounded-xl border border-slate-200 bg-white p-5 text-center sm:p-8">

                <FileText
                  size={28}
                  className="mx-auto mb-3 text-red-400"
                />

                <h3 className="text-sm font-semibold text-slate-700">
                  Unable to load certificate
                </h3>

                <p className="mt-2 break-words text-xs leading-relaxed text-slate-500">
                  {fileError}
                </p>

              </div>
            </div>

          ) : isPdf ? (

            /* PDF VIEWER */

            <div className="relative h-full min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <iframe
                src={previewUrl}
                title={document.documentName || "Certificate"}
                className="h-full w-full border-0"
              />
            </div>

          ) : isImage ? (

            /* IMAGE VIEWER */

            <div className="
              flex h-full min-h-0
              items-center justify-center
              overflow-auto rounded-lg
              border border-slate-200
              bg-white p-2 sm:p-4 md:p-6
            ">
              <img
                src={previewUrl}
                alt={document.documentName || "Certificate"}
                className="
                  h-auto max-h-full
                  w-auto max-w-full
                  object-contain
                "
              />
            </div>

          ) : (

            /* OTHER FILE FORMATS */

            <div className="flex h-full items-center justify-center overflow-y-auto">
              <div className="my-auto max-w-md rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm sm:p-8">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                  {getFileIcon()}
                </div>

                <h3 className="text-sm font-semibold text-slate-800">
                  Preview unavailable
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  This file type cannot be previewed directly in the browser.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="
                    mt-5 inline-flex min-h-10
                    w-full items-center justify-center gap-2
                    rounded-md bg-blue-600 px-4 py-2
                    text-xs font-medium text-white
                    transition hover:bg-blue-700
                    disabled:cursor-not-allowed disabled:opacity-60
                    sm:w-auto
                  "
                >
                  {downloading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Download size={14} />
                  )}

                  Download Certificate
                </button>

              </div>
            </div>

          )}

        </div>

        {/* ====================================================
            DESCRIPTION
        ==================================================== */}

        {document.description && (
          <div className="
            max-h-24 shrink-0
            overflow-y-auto
            border-t border-slate-200
            bg-white
            px-3 py-2.5 sm:px-5 sm:py-3
          ">

            <p className="mb-1 text-[10px] font-medium uppercase text-slate-400 sm:text-[11px]">
              Description
            </p>

            <p className="break-words whitespace-pre-wrap text-xs leading-relaxed text-slate-600">
              {document.description}
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default CertificatesDocumentViewerModal;
