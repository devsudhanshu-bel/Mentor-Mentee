
import React, { useRef, useState } from "react";

import {
  X,
  UploadCloud,
  Award,
  FileText,
} from "lucide-react";

import { uploadDocument } from "../../api/document.api";

const UploadCoCurricularModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const fileInputRef = useRef(null);

  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================================
  // RESET
  // ==========================================================

  const resetForm = () => {
    setDocumentName("");
    setDescription("");
    setFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    if (loading) {
      return;
    }

    resetForm();
    onClose?.();
  };

  // ==========================================================
  // FILE SELECT
  // ==========================================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setError("");

    // 20 MB

    const maxSize = 20 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 20MB.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);

    // Automatically use filename if name empty

    if (!documentName) {
      const nameWithoutExtension = selectedFile.name.replace(
        /\.[^/.]+$/,
        ""
      );

      setDocumentName(nameWithoutExtension);
    }
  };

  // ==========================================================
  // DRAG & DROP
  // ==========================================================

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) return;

    const droppedFile = event.dataTransfer.files?.[0];

    if (!droppedFile) {
      return;
    }

    const maxSize = 20 * 1024 * 1024;

    if (droppedFile.size > maxSize) {
      setError("File size must be less than 20MB.");
      return;
    }

    setError("");
    setFile(droppedFile);

    if (!documentName) {
      const nameWithoutExtension = droppedFile.name.replace(
        /\.[^/.]+$/,
        ""
      );

      setDocumentName(nameWithoutExtension);
    }

    if (fileInputRef.current) {
      try {
        const transfer = new DataTransfer();
        transfer.items.add(droppedFile);
        fileInputRef.current.files = transfer.files;
      } catch {
        // File remains available in component state.
      }
    }
  };

  // ==========================================================
  // UPLOAD
  // ==========================================================

  const handleUpload = async () => {
    setError("");

    if (!documentName.trim()) {
      setError("Please enter an activity name.");
      return;
    }

    if (!file) {
      setError(
        "Please select a certificate or activity document."
      );
      return;
    }

    try {
      setLoading(true);

      await uploadDocument({
        documentName: documentName.trim(),
        category: "CO_CURRICULAR",
        description: description.trim(),
        file,
      });

      resetForm();

      onSuccess?.();

      onClose?.();
    } catch (error) {
      console.error(
        "UploadCoCurricularModal.handleUpload error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload the activity."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // NOT OPEN
  // ==========================================================

  if (!isOpen) {
    return null;
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/40 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="my-auto flex max-h-[96dvh] w-full max-w-2xl min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-h-[90vh]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2 className="break-words text-base font-semibold text-slate-800 sm:text-lg">
              Upload Co-Curricular Activity
            </h2>

            <p className="mt-1 break-words text-xs leading-relaxed text-slate-500 sm:text-sm">
              Upload certificates, event participation or activity
              records.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close upload modal"
            className="shrink-0 rounded-md p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* ==================================================
            BODY
        ================================================== */}

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">

          {/* ERROR */}

          {error && (
            <div
              role="alert"
              className="break-words rounded-md border border-red-200 bg-red-50 px-3 py-3 text-xs leading-5 text-red-600 sm:px-4"
            >
              {error}
            </div>
          )}

          {/* ACTIVITY NAME */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Activity Name
            </label>

            <input
              type="text"
              value={documentName}
              onChange={(event) =>
                setDocumentName(event.target.value)
              }
              placeholder="Enter activity name"
              disabled={loading}
              className="h-10 w-full min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
            />
          </div>

          {/* CATEGORY */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Activity Category
            </label>

            <select
              disabled={loading}
              className="h-10 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
            >
              <option>Event Participation</option>
              <option>Workshop</option>
              <option>Seminar</option>
              <option>Conference</option>
              <option>Competition</option>
              <option>Hackathon</option>
              <option>Volunteer Service</option>
              <option>Community Service</option>
              <option>Sports</option>
              <option>Cultural Activity</option>
              <option>Club Activity</option>
              <option>Other</option>
            </select>

            <p className="mt-1 break-words text-[11px] leading-relaxed text-slate-400">
              This is for display purposes. The backend document
              category is CO_CURRICULAR.
            </p>
          </div>

          {/* UPLOAD */}

          <div className="min-w-0">
            <label className="mb-2 block text-xs font-medium text-slate-700">
              Upload Certificate / Document
            </label>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              disabled={loading}
            />

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => {
                if (!loading) {
                  fileInputRef.current?.click();
                }
              }}
              className={`flex min-w-0 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-3 py-6 text-center transition hover:border-blue-500 hover:bg-slate-50 sm:px-6 sm:py-8 ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >
              <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-12 sm:w-12">
                <UploadCloud
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <p className="break-words text-sm font-medium text-slate-700">
                Drag &amp; Drop your file here
              </p>

              <p className="mt-1 text-xs text-slate-500">
                or click to browse
              </p>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  if (!loading) {
                    fileInputRef.current?.click();
                  }
                }}
                disabled={loading}
                className="mt-3 flex h-9 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-xs font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Browse Files
              </button>

              <p className="mt-3 break-words text-[11px] leading-relaxed text-slate-400">
                PDF, DOC, DOCX, PPT, PPTX, JPG, PNG • Max 20MB
              </p>
            </div>

            {/* SELECTED FILE */}

            {file && (
              <div className="mt-3 flex min-w-0 items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                <FileText
                  size={18}
                  className="shrink-0 text-blue-600"
                />

                <div className="min-w-0 flex-1">
                  <p className="break-all text-xs font-medium text-slate-700">
                    {file.name}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}

          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              disabled={loading}
              placeholder="Briefly describe your participation or role..."
              className="w-full min-w-0 resize-none rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="h-10 w-full rounded-md border border-slate-300 px-4 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Award size={16} />

            {loading ? "Uploading..." : "Upload Activity"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCoCurricularModal;
