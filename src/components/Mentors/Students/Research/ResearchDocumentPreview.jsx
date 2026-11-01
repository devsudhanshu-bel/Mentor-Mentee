import { useEffect, useState } from "react";

import {
  X,
  FileText,
  Download,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

import api from "../../../../api/axios";

// ==========================================================
// RESOLVE FILE URL
// ==========================================================

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) return null;

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  if (fileUrl.startsWith("/api/")) {
    return fileUrl.replace(/^\/api/, "");
  }

  return fileUrl.startsWith("/")
    ? fileUrl
    : `/${fileUrl}`;
};

// ==========================================================
// RESEARCH DOCUMENT PREVIEW
// ==========================================================

const ResearchDocumentPreview = ({ research, onClose }) => {
  if (!research) return null;

  const previewKey = [
    research.id ?? "",
    research.fileUrl ?? "",
  ].join(":");

  return (
    <ResearchDocumentPreviewContent
      key={previewKey}
      research={research}
      onClose={onClose}
    />
  );
};

// ==========================================================
// PREVIEW CONTENT
// ==========================================================

const ResearchDocumentPreviewContent = ({
  research,
  onClose,
}) => {
  const hasFileUrl = Boolean(research.fileUrl);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(hasFileUrl);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================================
  // FETCH DOCUMENT - AUTHENTICATED
  // ==========================================================

  useEffect(() => {
    if (!research.fileUrl) return undefined;

    let isActive = true;
    let objectUrl = null;

    const fetchDocument = async () => {
      try {
        const response = await api.get(
          resolveFileUrl(research.fileUrl),
          {
            responseType: "blob",
          }
        );

        if (!isActive) return;

        objectUrl = window.URL.createObjectURL(response.data);

        setPreviewUrl(objectUrl);

      } catch (fetchError) {
        if (!isActive) return;

        console.error(
          "Failed to load research document:",
          fetchError
        );

        const status = fetchError.response?.status;

        if (status === 401 || status === 403) {
          setError(
            "You are not authorized to access this document. Please log in again if your session has expired."
          );
        } else if (status === 404) {
          setError("The requested document could not be found.");
        } else {
          setError(
            "Unable to load the document. Please try again."
          );
        }

      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchDocument();

    return () => {
      isActive = false;

      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [research.fileUrl]);

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = async () => {
    if (!research.fileUrl || isDownloading) return;

    let downloadUrl = null;

    try {
      setIsDownloading(true);
      setError("");

      const response = await api.get(
        resolveFileUrl(research.fileUrl),
        {
          responseType: "blob",
        }
      );

      downloadUrl = window.URL.createObjectURL(response.data);

      const link = window.document.createElement("a");

      link.href = downloadUrl;
      link.download =
        research.fileName || "research-document";

      window.document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (downloadError) {
      console.error(
        "Failed to download research document:",
        downloadError
      );

      const status = downloadError.response?.status;

      if (status === 401 || status === 403) {
        setError(
          "You are not authorized to download this document."
        );
      } else if (status === 404) {
        setError(
          "The requested document could not be found."
        );
      } else {
        setError(
          "Unable to download the document. Please try again."
        );
      }

    } finally {
      if (downloadUrl) {
        window.setTimeout(() => {
          window.URL.revokeObjectURL(downloadUrl);
        }, 60000);
      }

      setIsDownloading(false);
    }
  };

  // ==========================================================
  // OPEN DOCUMENT IN NEW TAB
  // ==========================================================

  const handleOpenDocument = () => {
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

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-slate-100 p-5">

          <div className="flex min-w-0 items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={22} />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-slate-900">
                {research.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {research.fileName}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* DOCUMENT DETAILS */}

        <div className="min-h-64 flex-1 overflow-y-auto p-5">

          <h3 className="text-sm font-semibold text-slate-800">
            Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {research.description || "No description provided."}
          </p>

          {/* FILE INFORMATION */}

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Document
            </p>

            <p className="mt-2 text-sm font-medium text-slate-800">
              {research.fileName}
            </p>

            {hasFileUrl ? (
              <p className="mt-2 text-xs text-green-700">
                A document URL is available.
              </p>
            ) : (
              <p className="mt-2 text-xs text-amber-700">
                No file URL is configured for this sample record.
              </p>
            )}

          </div>

          {/* LOADING */}

          {isLoading && (
            <div className="mt-5 flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-slate-200 bg-slate-50">

              <LoaderCircle
                size={28}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm text-slate-500">
                Loading document securely...
              </p>

            </div>
          )}

          {/* ERROR */}

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* DOCUMENT PREVIEW */}

          {previewUrl && !isLoading && (
            <div className="mt-4 h-[50vh] overflow-hidden rounded-lg border border-slate-200">

              <iframe
                title={research.fileName || research.title}
                src={previewUrl}
                className="h-full w-full"
              />

            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 p-4">

          {hasFileUrl && (
            <>
              {/* DOWNLOAD */}

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading || isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDownloading ? (
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Download size={16} />
                )}

                {isDownloading
                  ? "Downloading..."
                  : "Download"}
              </button>

              {/* OPEN FILE */}

              <button
                type="button"
                onClick={handleOpenDocument}
                disabled={!previewUrl || isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ExternalLink size={16} />
                Open file
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResearchDocumentPreview;