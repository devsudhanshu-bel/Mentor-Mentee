import React, {
  useEffect,
  useState,
} from "react";

import {
  X,
  Download,
  ExternalLink,
  FileText,
  Loader2,
} from "lucide-react";

const AwardsDocumentViewerModal = ({
  isOpen,
  onClose,
  document,
}) => {
  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // RESET LOADING
  // ==========================================================

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
    }
  }, [isOpen, document]);

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    setLoading(true);
    onClose?.();
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
      "award-document";

    window.document.body.appendChild(
      link
    );

    link.click();

    window.document.body.removeChild(
      link
    );
  };

  // ==========================================================
  // OPEN EXTERNAL
  // ==========================================================

  const handleOpenExternal = () => {
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
  // FILE TYPE
  // ==========================================================

  const getFileType = () => {
    if (!document?.fileType) {
      return "";
    }

    return document.fileType.toLowerCase();
  };

  const fileType =
    getFileType();

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
  // RENDER DOCUMENT
  // ==========================================================

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

    // ========================================================
    // PDF
    // ========================================================

    if (isPdf) {
      return (
        <div className="relative w-full h-full">

          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">

              <div className="flex items-center gap-2 text-sm text-slate-500">

                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Loading document...

              </div>

            </div>
          )}

          <iframe
            src={
              document.fileUrl
            }
            title={
              document.documentName
            }
            className="w-full h-full border-0"
            onLoad={() =>
              setLoading(false)
            }
          />

        </div>
      );
    }

    // ========================================================
    // IMAGE
    // ========================================================

    if (isImage) {
      return (
        <div className="relative w-full h-full overflow-auto flex items-center justify-center p-6 bg-slate-100">

          {loading && (
            <div className="absolute flex items-center gap-2 text-sm text-slate-500">

              <Loader2
                size={20}
                className="animate-spin"
              />

              Loading image...

            </div>
          )}

          <img
            src={
              document.fileUrl
            }
            alt={
              document.documentName
            }
            className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
            onLoad={() =>
              setLoading(false)
            }
            onError={() =>
              setLoading(false)
            }
          />

        </div>
      );
    }

    // ========================================================
    // VIDEO
    // ========================================================

    if (isVideo) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-black p-6">

          <video
            src={
              document.fileUrl
            }
            controls
            className="max-w-full max-h-full"
            onLoadedData={() =>
              setLoading(false)
            }
          >
            Your browser does not
            support video playback.
          </video>

        </div>
      );
    }

    // ========================================================
    // AUDIO
    // ========================================================

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
              src={
                document.fileUrl
              }
              controls
              className="w-full"
              onLoadedData={() =>
                setLoading(false)
              }
            />

          </div>

        </div>
      );
    }

    // ========================================================
    // OTHER FILE TYPES
    // ========================================================

    return (
      <div className="h-full flex flex-col items-center justify-center text-center">

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
          This file type cannot be
          displayed directly inside
          the viewer. You can open it
          in a new tab or download it.
        </p>

        <div className="flex items-center gap-2 mt-5">

          <button
            type="button"
            onClick={
              handleOpenExternal
            }
            className="h-9 px-4 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition"
          >
            <ExternalLink
              size={16}
            />

            Open File
          </button>

          <button
            type="button"
            onClick={
              handleDownload
            }
            className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition"
          >
            <Download
              size={16}
            />

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
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >

      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between shrink-0">

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
                title={
                  document.documentName
                }
              >
                {document.documentName}
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Awards & Achievements
              </p>

            </div>

          </div>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-1">

            <button
              type="button"
              onClick={
                handleDownload
              }
              disabled={
                !document.fileUrl
              }
              title="Download"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-40"
            >
              <Download
                size={18}
              />
            </button>

            <button
              type="button"
              onClick={
                handleOpenExternal
              }
              disabled={
                !document.fileUrl
              }
              title="Open in new tab"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-40"
            >
              <ExternalLink
                size={18}
              />
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

        {/* ==================================================
            DOCUMENT CONTENT
        ================================================== */}

        <div className="flex-1 min-h-0">
          {renderDocument()}
        </div>

      </div>

    </div>
  );
};

export default AwardsDocumentViewerModal;