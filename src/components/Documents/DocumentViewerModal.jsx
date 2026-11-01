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
// DOCUMENT VIEWER MODAL
// ==========================================================

const DocumentViewerModal = ({
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
    /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(
      document?.documentName || ""
    );

  const isAudio =
    fileType.includes("audio") ||
    /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i.test(
      document?.documentName || ""
    );

  // ========================================================
  // FETCH PRIVATE DOCUMENT
  // ========================================================

  useEffect(() => {
    if (!isOpen || !document?.id || !document?.fileUrl) {
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
          "Failed to load private document:",
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
    onClose();
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
    link.download = document.documentName || "document";

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // ========================================================
  // OPEN IN NEW TAB
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
  // RENDER FILE
  // ========================================================

  const renderDocument = () => {
    if (!document?.fileUrl) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-slate-500">
          <FileText
            size={48}
            className="text-slate-300 mb-3"
          />

          <p className="text-sm font-medium">
            Document preview unavailable
          </p>

          <p className="text-xs text-slate-400 mt-1">
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
        <div className="h-full flex flex-col items-center justify-center text-slate-500">
          <Loader2
            size={28}
            className="animate-spin text-blue-600 mb-3"
          />

          <p className="text-sm">
            Loading secure document...
          </p>
        </div>
      );
    }

    // ======================================================
    // ERROR
    // ======================================================

    if (previewError) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <FileText
            size={48}
            className="text-red-400 mb-3"
          />

          <p className="text-sm font-medium text-slate-700">
            Document unavailable
          </p>

          <p className="text-xs text-slate-400 mt-2 max-w-md">
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
          className="w-full h-full border-0"
        />
      );
    }

    // ======================================================
    // IMAGE
    // ======================================================

    if (isImage) {
      return (
        <div className="w-full h-full overflow-auto flex items-center justify-center p-6 bg-slate-100">
          <img
            src={previewState.url}
            alt={document.documentName}
            className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
          />
        </div>
      );
    }

    // ======================================================
    // VIDEO
    // ======================================================

    if (isVideo) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-black p-6">
          <video
            src={previewState.url}
            controls
            className="max-w-full max-h-full"
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
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-5">
              <FileText
                size={30}
                className="text-blue-600"
              />
            </div>

            <p className="text-sm font-medium text-slate-700 mb-5">
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
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <FileText
            size={30}
            className="text-slate-400"
          />
        </div>

        <p className="text-sm font-semibold text-slate-700">
          Preview not supported
        </p>

        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          This file type cannot be displayed directly inside the
          viewer. You can open it in a new tab or download it.
        </p>

        <div className="flex items-center gap-2 mt-5">
          <button
            type="button"
            onClick={handleOpenExternal}
            className="h-9 px-4 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition"
          >
            <ExternalLink size={16} />
            Open File
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition"
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
      className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}

        <div className="min-h-16 px-5 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <FileText
                size={19}
                className="text-blue-600"
              />
            </div>

            <div className="min-w-0">
              <h2
                className="text-sm font-semibold text-slate-800 truncate max-w-[500px]"
                title={document.documentName}
              >
                {document.documentName}
              </h2>

              {document.category && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {document.category
                    .toLowerCase()
                    .replace(/_/g, " ")}
                </p>
              )}
            </div>
          </div>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!hasLoaded}
              title="Download"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-40"
            >
              <Download size={18} />
            </button>

            <button
              type="button"
              onClick={handleOpenExternal}
              disabled={!hasLoaded}
              title="Open in new tab"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-40"
            >
              <ExternalLink size={18} />
            </button>

            <button
              type="button"
              onClick={handleClose}
              title="Close"
              className="w-9 h-9 ml-1 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* DOCUMENT CONTENT */}

        <div className="flex-1 min-h-0">
          {renderDocument()}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;