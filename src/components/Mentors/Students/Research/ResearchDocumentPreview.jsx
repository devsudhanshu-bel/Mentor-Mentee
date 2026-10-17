import React from "react";
import { X, FileText, Download, ExternalLink } from "lucide-react";

const ResearchDocumentPreview = ({ research, onClose }) => {
  if (!research) return null;

  const hasFileUrl = Boolean(research.fileUrl);

  const handleDownload = () => {
    if (!hasFileUrl) return;

    const link = document.createElement("a");
    link.href = research.fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = research.fileName || "research-document";
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
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

        <div className="min-h-64 flex-1 overflow-y-auto p-5">
          <h3 className="text-sm font-semibold text-slate-800">
            Description
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {research.description || "No description provided."}
          </p>

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

          {hasFileUrl && (
            <div className="mt-4 h-[50vh] overflow-hidden rounded-lg border border-slate-200">
              <iframe
                title={research.fileName || research.title}
                src={research.fileUrl}
                className="h-full w-full"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 p-4">
          {hasFileUrl && (
            <>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Download size={16} />
                Download
              </button>

              <a
                href={research.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <ExternalLink size={16} />
                Open file
              </a>
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