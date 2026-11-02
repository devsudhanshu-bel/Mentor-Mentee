
import React, { useState } from "react";
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import internshipService from "../../services/internshipService";

const DOCUMENT_OPTIONS = {
  INITIAL: [
    { value: "OFFER_LETTER", label: "Offer Letter" },
    { value: "COMPLETION_CERTIFICATE", label: "Completion Certificate" },
    { value: "COMPLETION_LETTER", label: "Completion Letter" },
    { value: "FINAL_REPORT", label: "Final Report" },
    { value: "OTHER", label: "Other Document" },
  ],
  COMPLETION: [
    { value: "COMPLETION_CERTIFICATE", label: "Completion Certificate" },
    { value: "COMPLETION_LETTER", label: "Completion Letter" },
    { value: "FINAL_REPORT", label: "Final Report" },
    { value: "OTHER", label: "Other Document" },
  ],
};

const DocumentUploadModal = ({
  internship,
  onClose,
  onUploaded,
  initialStage = "INITIAL",
}) => {
  const alreadyCompleted =
    internship?.internshipType === "ALREADY_COMPLETED";

  // The backend stores completion documents for already-completed
  // internships under INITIAL.
  const stage = alreadyCompleted ? "INITIAL" : initialStage;
  const options = DOCUMENT_OPTIONS[stage] || DOCUMENT_OPTIONS.INITIAL;

  const [documentType, setDocumentType] = useState(options[0].value);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Choose a document to upload.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("The maximum file size is 10 MB.");
      return;
    }

    setUploading(true);

    try {
      await internshipService.uploadDocument(
        internship.id,
        file,
        documentType
      );

      setSuccess("Document uploaded successfully.");
      setFile(null);

      if (event.currentTarget) {
        event.currentTarget.reset();
      }

      await onUploaded?.();
      onClose?.();
    } catch (err) {
      setError(err.message || "Document upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-2 sm:p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-document-title"
        className="my-auto flex max-h-[calc(100dvh-1rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)]"
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2
              id="upload-document-title"
              className="font-bold text-slate-900"
            >
              Upload Document
            </h2>

            <p className="mt-1 truncate text-xs text-slate-500">
              {internship?.companyName || "Internship documents"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            aria-label="Close"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </header>

        {/* Form */}
        <form
          onSubmit={submit}
          className="min-h-0 space-y-5 overflow-y-auto p-4 sm:p-5"
        >
          {/* Error */}
          {error && (
            <p
              role="alert"
              className="break-words rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="break-words rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          {/* Document type */}
          <div className="min-w-0">
            <label
              htmlFor="documentType"
              className="text-sm font-medium text-slate-700"
            >
              Document Type
            </label>

            <select
              id="documentType"
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
              className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* File upload */}
          <div className="min-w-0">
            <label
              htmlFor="internshipDocument"
              className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center transition hover:border-blue-400 hover:bg-blue-50/50 sm:px-5 sm:py-8"
            >
              {file ? (
                <CheckCircle2
                  size={30}
                  className="shrink-0 text-green-600"
                />
              ) : (
                <UploadCloud
                  size={30}
                  className="shrink-0 text-blue-600"
                />
              )}

              <span className="mt-3 max-w-full break-all text-sm font-semibold text-slate-800">
                {file ? file.name : "Choose a document"}
              </span>

              <span className="mt-1 text-xs leading-5 text-slate-500">
                PDF, Word, spreadsheet, image or other supported file · Max 10 MB
              </span>

              <span className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                Browse Files
              </span>
            </label>

            <input
              id="internshipDocument"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.txt,.zip,.csv"
              className="sr-only"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setError("");
              }}
            />

            {file && (
              <div className="mt-3 flex min-w-0 items-center gap-2 text-xs text-slate-500">
                <FileText size={15} className="shrink-0" />

                <span className="min-w-0">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>

                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="ml-auto shrink-0 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading || !file}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {uploading && (
                <LoaderCircle size={16} className="animate-spin" />
              )}

              {uploading ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default DocumentUploadModal;
