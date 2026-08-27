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

const ExtraCurricularDocumentViewerModal = ({
  isOpen,
  onClose,
  document: selectedDocument,
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
  }, [
    isOpen,
    selectedDocument?.id,
    selectedDocument?.fileUrl,
  ]);

  // ==========================================================
  // SAFETY
  // ==========================================================

  if (!isOpen || !selectedDocument) {
    return null;
  }

  // ==========================================================
  // DOCUMENT DATA
  // ==========================================================

  const fileUrl =
    selectedDocument?.fileUrl;

  const documentName =
    selectedDocument?.documentName ||
    "Extra-Curricular Document";

  // ==========================================================
  // FILE TYPE
  // ==========================================================

  const getFileType = () => {
    if (
      selectedDocument?.fileType
    ) {
      return selectedDocument.fileType
        .toLowerCase();
    }

    if (
      selectedDocument?.documentName
    ) {
      const parts =
        selectedDocument.documentName
          .split(".");

      if (parts.length > 1) {
        return parts
          .pop()
          .toLowerCase();
      }
    }

    return "";
  };

  const fileType =
    getFileType();

  // ==========================================================
  // FILE CHECKS
  // ==========================================================

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
    setLoading(true);

    onClose?.();
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = () => {
    if (!fileUrl) {
      alert(
        "File URL is not available."
      );

      return;
    }

    try {
      const link =
        window.document.createElement(
          "a"
        );

      link.href =
        fileUrl;

      link.target =
        "_blank";

      link.rel =
        "noopener noreferrer";

      link.download =
        documentName;

      window.document.body.appendChild(
        link
      );

      link.click();

      window.document.body.removeChild(
        link
      );
    } catch (error) {
      console.error(
        "Viewer download error:",
        error
      );

      window.open(
        fileUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  // ==========================================================
  // OPEN EXTERNAL
  // ==========================================================

  const handleOpenExternal = () => {
    if (!fileUrl) {
      return;
    }

    window.open(
      fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================================
  // DOCUMENT ERROR
  // ==========================================================

  const handleDocumentError = () => {
    setLoading(false);
  };

  // ==========================================================
  // RENDER DOCUMENT
  // ==========================================================

  const renderDocument = () => {

    // ========================================================
    // NO URL
    // ========================================================

    if (!fileUrl) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center px-6">

          <FileText
            size={48}
            className="text-slate-300 mb-3"
          />

          <p className="text-sm font-medium text-slate-600">
            Document preview unavailable
          </p>

          <p className="text-xs text-slate-400 mt-1">
            The uploaded document URL is not available.
          </p>

        </div>
      );
    }

    // ========================================================
    // PDF
    // ========================================================

    if (isPdf) {
      return (
        <div className="relative w-full h-full bg-slate-100">

          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">

              <div className="flex flex-col items-center gap-3">

                <Loader2
                  size={28}
                  className="animate-spin text-blue-600"
                />

                <p className="text-sm text-slate-500">
                  Loading document...
                </p>

              </div>

            </div>
          )}

          <iframe
            src={fileUrl}
            title={documentName}
            className="w-full h-full border-0"
            loading="eager"
            onLoad={() =>
              setLoading(false)
            }
            onError={
              handleDocumentError
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
            <div className="absolute inset-0 flex items-center justify-center">

              <div className="flex items-center gap-2 text-sm text-slate-500">

                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Loading image...

              </div>

            </div>
          )}

          <img
            src={fileUrl}
            alt={documentName}
            className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
            onLoad={() =>
              setLoading(false)
            }
            onError={
              handleDocumentError
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
            src={fileUrl}
            controls
            playsInline
            className="max-w-full max-h-full"
            onLoadedData={() =>
              setLoading(false)
            }
            onError={
              handleDocumentError
            }
          >
            Your browser does not support
            video playback.
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
              {documentName}
            </p>

            <audio
              src={fileUrl}
              controls
              className="w-full"
              onLoadedData={() =>
                setLoading(false)
              }
              onError={
                handleDocumentError
              }
            />

          </div>

        </div>
      );
    }

    // ========================================================
    // UNSUPPORTED FILE
    // ========================================================

    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-6">

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
          This file type cannot be displayed
          directly inside the viewer.
        </p>

        <div className="flex items-center gap-2 mt-5">

          <button
            type="button"
            onClick={
              handleOpenExternal
            }
            disabled={!fileUrl}
            className="h-9 px-4 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition disabled:opacity-50"
          >
            <ExternalLink size={16} />

            Open File
          </button>

          <button
            type="button"
            onClick={
              handleDownload
            }
            disabled={!fileUrl}
            className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
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

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >

      {/* ====================================================
          MODAL
      ==================================================== */}

      <div
        className="w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between shrink-0">

          {/* LEFT */}

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
                title={documentName}
              >
                {documentName}
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Extra-Curricular
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-1 shrink-0">

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={
                handleDownload
              }
              disabled={!fileUrl}
              title="Download"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-40"
            >
              <Download size={18} />
            </button>

            {/* OPEN EXTERNAL */}

            <button
              type="button"
              onClick={
                handleOpenExternal
              }
              disabled={!fileUrl}
              title="Open in new tab"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-40"
            >
              <ExternalLink size={18} />
            </button>

            {/* CLOSE */}

            <button
              type="button"
              onClick={
                handleClose
              }
              title="Close"
              className="w-9 h-9 ml-1 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* ==================================================
            DOCUMENT
        ================================================== */}

        <div className="flex-1 min-h-0 overflow-hidden">
          {renderDocument()}
        </div>

      </div>
    </div>
  );
};

export default ExtraCurricularDocumentViewerModal;