
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
// AWARDS DOCUMENT VIEWER MODAL
// ==========================================================

const AwardsDocumentViewerModal = ({
  isOpen,
  onClose,
  document,
}) => {
  const [previewState, setPreviewState] = useState({
    key: null,
    status: "loading",
    url: null,
    error: null,
  });

  const previewKey = document?.id
    ? `${document.id}:${isOpen}`
    : document?.fileUrl
      ? `${document.fileUrl}:${isOpen}`
      : null;

  const isLoading =
    Boolean(isOpen && document) &&
    previewState.key !== previewKey;

  const hasLoaded =
    Boolean(previewKey) &&
    previewState.key === previewKey &&
    previewState.status === "success";

  const previewError =
    previewState.key === previewKey &&
    previewState.status === "error"
      ? previewState.error
      : null;

  // ========================================================
  // FILE TYPE
  // ========================================================

  const fileType = document?.fileType?.toLowerCase() || "";

  const isPdf = fileType.includes("pdf");

  const isImage =
    fileType.includes("image") ||
    /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(
      document?.documentName || ""
    );

  const isVideo =
    fileType.includes("video") ||
    /\.(mp4|webm|mov)(\?.*)?$/i.test(
      document?.documentName || ""
    );

  const isAudio =
    fileType.includes("audio") ||
    /\.(mp3|wav|ogg)(\?.*)?$/i.test(
      document?.documentName || ""
    );

  // ========================================================
  // FETCH PRIVATE DOCUMENT
  // ========================================================

  useEffect(() => {
    if (!isOpen || !document?.fileUrl) {
      return undefined;
    }

    let isActive = true;
    let objectUrl = null;

    const fetchDocument = async () => {
      try {
        const fileUrl = resolveFileUrl(document.fileUrl);

        // Axios automatically attaches the authenticated JWT.
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
          key: previewKey,
          status: "success",
          url: objectUrl,
          error: null,
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error(
          "Failed to load award document:",
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
          key: previewKey,
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
  }, [
    isOpen,
    document?.id,
    document?.fileUrl,
    document?.fileType,
    previewKey,
  ]);

  // ========================================================
  // CLOSE
  // ========================================================

  const handleClose = () => {
    onClose?.();
  };

  // ========================================================
  // DOWNLOAD
  // ========================================================

  const handleDownload = () => {
    if (!hasLoaded || !previewState.url) {
      return;
    }

    const link = window.document.createElement("a");

    link.href = previewState.url;

    link.download =
      document.documentName || "award-document";

    window.document.body.appendChild(link);

    link.click();

    window.document.body.removeChild(link);
  };

  // ========================================================
  // OPEN EXTERNAL
  // ========================================================

  const handleOpenExternal = () => {
    if (!hasLoaded || !previewState.url) {
      return;
    }

    window.open(
      previewState.url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ========================================================
  // RENDER DOCUMENT
  // ========================================================

  const renderDocument = () => {
    if (!document?.fileUrl) {
      return (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center text-slate-500">
          <FileText
            size={48}
            className="mb-3 text-slate-300"
          />

          <p className="text-sm font-medium">
            Document preview unavailable
          </p>

          <p className="mt-1 text-xs text-slate-400">
            The document URL is not available.
          </p>
        </div>
      );
    }

    // ======================================================
    // LOADING
    // ======================================================

    if (isLoading) {
      return (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center text-slate-500">
          <Loader2
            size={28}
            className="mb-3 animate-spin text-blue-600"
          />

          <p className="text-sm">
            Loading secure award document...
          </p>
        </div>
      );
    }

    // ======================================================
    // ERROR
    // ======================================================

    if (previewError) {
      return (
        <div className="flex h-full flex-col items-center justify-center px-4 py-6 text-center">
          <FileText
            size={48}
            className="mb-3 text-red-400"
          />

          <p className="text-sm font-medium text-slate-700">
            Document unavailable
          </p>

          <p className="mt-2 max-w-md break-words text-xs leading-5 text-slate-400">
            {previewError}
          </p>
        </div>
      );
    }

    if (!hasLoaded || !previewState.url) {
      return null;
    }

    // ======================================================
    // PDF
    // ======================================================

    if (isPdf) {
      return (
        <iframe
          src={previewState.url}
          title={document.documentName}
          className="h-full w-full border-0"
        />
      );
    }

    // ======================================================
    // IMAGE
    // ======================================================

    if (isImage) {
      return (
        <div className="flex h-full w-full items-center justify-center overflow-auto bg-slate-100 p-3 sm:p-6">
          <img
            src={previewState.url}
            alt={document.documentName}
            className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
          />
        </div>
      );
    }

    // ======================================================
    // VIDEO
    // ======================================================

    if (isVideo) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-black p-3 sm:p-6">
          <video
            src={previewState.url}
            controls
            playsInline
            className="max-h-full max-w-full"
          >
            Your browser does not support video playback.
          </video>
        </div>
      );
    }

    // ======================================================
    // AUDIO
    // ======================================================

    if (isAudio) {
      return (
        <div className="flex h-full w-full items-center justify-center px-4">
          <div className="w-full max-w-xl p-4 text-center sm:p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <FileText
                size={30}
                className="text-blue-600"
              />
            </div>

            <p className="mb-5 break-words text-sm font-medium text-slate-700">
              {document.documentName}
            </p>

            <audio
              src={previewState.url}
              controls
              className="w-full"
            />
          </div>
        </div>
      );
    }

    // ======================================================
    // OTHER FILE TYPES
    // ======================================================

    return (
      <div className="flex h-full flex-col items-center justify-center px-4 py-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <FileText
            size={30}
            className="text-slate-400"
          />
        </div>

        <p className="text-sm font-semibold text-slate-700">
          Preview not supported
        </p>

        <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
          This file type cannot be displayed directly inside
          the viewer. You can open it in a new tab or download it.
        </p>

        <div className="mt-5 flex w-full max-w-sm flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={handleOpenExternal}
            className="flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ExternalLink size={16} />
            Open File
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex h-9 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    );
  };

  // ==========================================================
  // MODAL
  // ==========================================================

  if (!isOpen || !document) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-2 sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="my-auto flex h-[94dvh] max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:h-[90vh] sm:max-h-[90vh]">

        {/* HEADER */}

        <div className="flex min-h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-3 py-2.5 sm:min-h-16 sm:gap-3 sm:px-5 sm:py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-9 sm:w-9">
              <FileText
                size={19}
                className="text-blue-600"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                className="truncate text-xs font-semibold text-slate-800 sm:max-w-[500px] sm:text-sm"
                title={document.documentName}
              >
                {document.documentName}
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                Awards &amp; Achievements
              </p>
            </div>
          </div>

          {/* HEADER ACTIONS */}

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!hasLoaded}
              title="Download"
              aria-label="Download document"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-40 sm:h-9 sm:w-9"
            >
              <Download size={17} />
            </button>

            <button
              type="button"
              onClick={handleOpenExternal}
              disabled={!hasLoaded}
              title="Open in new tab"
              aria-label="Open document in new tab"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-40 sm:h-9 sm:w-9"
            >
              <ExternalLink size={17} />
            </button>

            <button
              type="button"
              onClick={handleClose}
              title="Close"
              aria-label="Close document viewer"
              className="ml-0.5 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 sm:ml-1 sm:h-9 sm:w-9"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* DOCUMENT CONTENT */}

        <div className="min-h-0 flex-1 overflow-hidden">
          {renderDocument()}
        </div>
      </div>
    </div>
  );
};

export default AwardsDocumentViewerModal;
