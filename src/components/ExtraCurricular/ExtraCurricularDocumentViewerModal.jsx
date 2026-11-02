
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
// RESOLVE FILE URL
// ==========================================================

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  // Axios base URL already contains /api.
  if (fileUrl.startsWith("/api/")) {
    return fileUrl.replace(/^\/api/, "");
  }

  return fileUrl.startsWith("/")
    ? fileUrl
    : `/${fileUrl}`;
};

const ExtraCurricularDocumentViewerModal = ({
  isOpen,
  onClose,
  document: selectedDocument,
}) => {
  const [preview, setPreview] = useState({
    key: null,
    url: null,
    error: null,
  });

  // ==========================================================
  // DOCUMENT DATA
  // ==========================================================

  const fileUrl = selectedDocument?.fileUrl;

  const documentName =
    selectedDocument?.documentName ||
    "Extra-Curricular Document";

  const requestKey = [
    selectedDocument?.id || "",
    fileUrl || "",
    isOpen,
  ].join(":");

  const previewUrl =
    preview.key === requestKey
      ? preview.url
      : null;

  const previewError =
    preview.key === requestKey
      ? preview.error
      : null;

  const isLoading =
    isOpen &&
    Boolean(fileUrl) &&
    preview.key !== requestKey;

  // ==========================================================
  // AUTHENTICATED FILE FETCH
  // ==========================================================

  useEffect(() => {
    if (!isOpen || !fileUrl) {
      return undefined;
    }

    let cancelled = false;
    let objectUrl = null;

    const fetchDocument = async () => {
      try {
        const resolvedUrl = resolveFileUrl(fileUrl);

        const response = await api.get(resolvedUrl, {
          responseType: "blob",
        });

        if (cancelled) {
          return;
        }

        objectUrl = window.URL.createObjectURL(
          response.data
        );

        setPreview({
          key: requestKey,
          url: objectUrl,
          error: null,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load Extra-Curricular document:",
          error
        );

        const status = error.response?.status;

        let errorMessage =
          "Unable to load this document. Please try again.";

        if (status === 401) {
          errorMessage =
            "Your session has expired. Please log in again.";
        } else if (status === 403) {
          errorMessage =
            "You are not authorized to access this document.";
        } else if (status === 404) {
          errorMessage =
            "The requested document could not be found.";
        }

        setPreview({
          key: requestKey,
          url: null,
          error: errorMessage,
        });
      }
    };

    fetchDocument();

    return () => {
      cancelled = true;

      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [
    isOpen,
    fileUrl,
    requestKey,
  ]);

  // ==========================================================
  // FILE TYPE
  // ==========================================================

  const getFileType = () => {
    const storedType =
      selectedDocument?.fileType?.toLowerCase() || "";

    if (storedType) {
      return storedType;
    }

    if (documentName.includes(".")) {
      return documentName
        .split(".")
        .pop()
        .toLowerCase();
    }

    return "";
  };

  const fileType = getFileType();

  const isPdf =
    fileType.includes("pdf");

  const isImage =
    fileType.includes("image") ||
    fileType.includes("jpg") ||
    fileType.includes("jpeg") ||
    fileType.includes("png") ||
    fileType.includes("webp") ||
    fileType.includes("gif");

  const isVideo =
    fileType.includes("video") ||
    fileType.includes("mp4") ||
    fileType.includes("webm") ||
    fileType.includes("mov");

  const isAudio =
    fileType.includes("audio") ||
    fileType.includes("mp3") ||
    fileType.includes("wav") ||
    fileType.includes("ogg");

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    onClose?.();
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = () => {
    if (!previewUrl) {
      alert(
        previewError ||
        "The document is not ready to download."
      );

      return;
    }

    try {
      const link =
        window.document.createElement("a");

      link.href = previewUrl;
      link.download = documentName;

      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } catch (error) {
      console.error(
        "Document download error:",
        error
      );

      alert("Unable to download this document.");
    }
  };

  // ==========================================================
  // OPEN EXTERNAL
  // ==========================================================

  const handleOpenExternal = () => {
    if (!previewUrl) {
      return;
    }

    window.open(
      previewUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================================
  // DOCUMENT ERROR
  // ==========================================================

  const renderError = () => (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
      <FileText
        size={48}
        className="mb-3 text-slate-300"
      />

      <p className="text-sm font-semibold text-slate-700">
        Document unavailable
      </p>

      <p className="mt-2 max-w-md break-words text-xs leading-5 text-slate-500">
        {previewError}
      </p>
    </div>
  );

  // ==========================================================
  // LOADING STATE
  // ==========================================================

  const renderLoading = () => (
    <div className="flex h-full flex-col items-center justify-center">
      <Loader2
        size={28}
        className="mb-3 animate-spin text-blue-600"
      />

      <p className="text-center text-xs text-slate-500 sm:text-sm">
        Loading document...
      </p>
    </div>
  );

  // ==========================================================
  // RENDER DOCUMENT
  // ==========================================================

  const renderDocument = () => {
    if (!fileUrl) {
      return (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
          <FileText
            size={48}
            className="mb-3 text-slate-300"
          />

          <p className="text-sm font-medium text-slate-600">
            Document preview unavailable
          </p>

          <p className="mt-1 text-xs text-slate-400">
            The uploaded document URL is not available.
          </p>
        </div>
      );
    }

    if (isLoading) {
      return renderLoading();
    }

    if (previewError) {
      return renderError();
    }

    if (!previewUrl) {
      return renderLoading();
    }

    // ========================================================
    // PDF
    // ========================================================

    if (isPdf) {
      return (
        <div className="h-full w-full bg-slate-100">
          <iframe
            src={previewUrl}
            title={documentName}
            className="h-full w-full border-0"
            loading="eager"
          />
        </div>
      );
    }

    // ========================================================
    // IMAGE
    // ========================================================

    if (isImage) {
      return (
        <div className="flex h-full w-full items-center justify-center overflow-auto bg-slate-100 p-3 sm:p-6">
          <img
            src={previewUrl}
            alt={documentName}
            className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
          />
        </div>
      );
    }

    // ========================================================
    // VIDEO
    // ========================================================

    if (isVideo) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-black p-3 sm:p-6">
          <video
            src={previewUrl}
            controls
            playsInline
            className="max-h-full max-w-full"
          >
            Your browser does not support video playback.
          </video>
        </div>
      );
    }

    // ========================================================
    // AUDIO
    // ========================================================

    if (isAudio) {
      return (
        <div className="flex h-full w-full items-center justify-center overflow-auto px-3 sm:px-6">
          <div className="w-full max-w-xl p-4 text-center sm:p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <FileText
                size={30}
                className="text-blue-600"
              />
            </div>

            <p className="mb-5 break-words text-sm font-medium text-slate-700">
              {documentName}
            </p>

            <audio
              src={previewUrl}
              controls
              className="w-full"
            />
          </div>
        </div>
      );
    }

    // ========================================================
    // UNSUPPORTED FILE
    // ========================================================

    return (
      <div className="flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <FileText
            size={30}
            className="text-slate-400"
          />
        </div>

        <p className="text-sm font-semibold text-slate-700">
          Preview not supported
        </p>

        <p className="mt-1 max-w-sm break-words text-xs leading-5 text-slate-400">
          This file type cannot be displayed directly inside the viewer.
        </p>

        <div className="mt-5 flex w-full max-w-sm flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleOpenExternal}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            <ExternalLink size={16} />
            Open File
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    );
  };

  // ==========================================================
  // SAFETY
  // ==========================================================

  if (!isOpen || !selectedDocument) {
    return null;
  }

  // ==========================================================
  // MODAL
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-2 sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* MODAL */}

      <div
        className="my-auto flex h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl sm:h-[90vh] sm:rounded-xl"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* HEADER */}

        <div className="flex min-h-[64px] shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-3 py-2 sm:px-5">
          {/* LEFT */}

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
                title={documentName}
              >
                {documentName}
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                Extra-Curricular
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={handleDownload}
              disabled={!previewUrl}
              title="Download"
              aria-label="Download document"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-40 sm:h-9 sm:w-9"
            >
              <Download size={17} />
            </button>

            {/* OPEN EXTERNAL */}

            <button
              type="button"
              onClick={handleOpenExternal}
              disabled={!previewUrl}
              title="Open in new tab"
              aria-label="Open document in new tab"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-40 sm:h-9 sm:w-9"
            >
              <ExternalLink size={17} />
            </button>

            {/* CLOSE */}

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

        {/* DOCUMENT */}

        <div className="min-h-0 flex-1 overflow-hidden">
          {renderDocument()}
        </div>
      </div>
    </div>
  );
};

export default ExtraCurricularDocumentViewerModal;
