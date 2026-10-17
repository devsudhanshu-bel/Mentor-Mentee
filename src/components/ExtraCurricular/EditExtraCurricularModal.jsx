import React, { useEffect, useRef, useState } from "react";
import {
  X,
  UploadCloud,
  Loader2,
  AlertCircle,
  RotateCcw,
  FileCheck2,
} from "lucide-react";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];

const getExtension = (fileName = "") => {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot >= 0
    ? fileName.substring(lastDot).toLowerCase()
    : "";
};

const getDocumentName = (document) =>
  document?.documentName ??
  document?.fileName ??
  document?.title ??
  "";

const getBackendError = (error) => {
  const data = error?.response?.data;

  console.error("Extra-Curricular update failed:", {
    status: error?.response?.status,
    response: data,
    message: error?.message,
  });

  if (Array.isArray(data?.errors)) {
    return data.errors
      .map((item) => item.message || item.msg || String(item))
      .join(" ");
  }

  if (Array.isArray(data?.issues)) {
    return data.issues
      .map((item) => {
        const path = Array.isArray(item.path)
          ? item.path.join(".")
          : "";

        return path ? `${path}: ${item.message}` : item.message;
      })
      .join(" ");
  }

  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;

  if (typeof error?.message === "string") {
    return error.message;
  }

  return "Unable to update your Extra-Curricular document. Please try again.";
};

const EditExtraCurricularModal = ({
  isOpen,
  onClose,
  onSuccess,
  onSave,
  activity,
}) => {
  const fileInputRef = useRef(null);

  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================================
  // LOAD EXISTING DOCUMENT
  // ==========================================================

  useEffect(() => {
    if (!isOpen || !activity) return;

    setDocumentName(getDocumentName(activity));
    setDescription(activity.description ?? "");
    setSelectedFile(null);
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isOpen, activity]);

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleClose = () => {
    if (isSaving) return;

    setErrorMessage("");
    setSelectedFile(null);
    onClose?.();
  };

  // ==========================================================
  // VALIDATE FILE
  // ==========================================================

  const validateFile = (file) => {
    if (!file) {
      return "Please select the revised Extra-Curricular file.";
    }

    if (file.size === 0) {
      return "The selected file is empty.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must not exceed 20 MB.";
    }

    if (!ALLOWED_EXTENSIONS.includes(getExtension(file.name))) {
      return "Invalid format. Upload PDF, DOC, DOCX, PPT, or PPTX.";
    }

    return "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setErrorMessage(validationError);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isSaving) return;

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setErrorMessage(validationError);
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");

    if (fileInputRef.current) {
      try {
        const transfer = new DataTransfer();
        transfer.items.add(file);
        fileInputRef.current.files = transfer.files;
      } catch {
        // The selected file remains available in component state.
      }
    }
  };

  // ==========================================================
  // FORMAT FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // ==========================================================
  // SAVE CHANGES
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!activity?.id) {
      setErrorMessage(
        "The existing Extra-Curricular document has no valid ID."
      );
      return;
    }

    const trimmedName = documentName.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setErrorMessage("Please enter an activity name.");
      return;
    }

    if (trimmedName.length > 100) {
      setErrorMessage("Activity name cannot exceed 100 characters.");
      return;
    }

    if (trimmedDescription.length > 500) {
      setErrorMessage("Description cannot exceed 500 characters.");
      return;
    }

    const validationError = validateFile(selectedFile);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (typeof onSave !== "function") {
      setErrorMessage(
        "The Extra-Curricular update action is not connected yet."
      );
      return;
    }

    try {
      setIsSaving(true);

      await onSave({
        id: activity.id,
        documentName: trimmedName,
        description: trimmedDescription,
        file: selectedFile,
      });

      onSuccess?.();
      onClose?.();
    } catch (error) {
      setErrorMessage(getBackendError(error));
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !activity) return null;

  const mentorFeedback =
    activity.mentorRemark ??
    activity.reviewRemark ??
    activity.reviewComments ??
    activity.feedback;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-extracurricular-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl"
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2
              id="edit-extracurricular-title"
              className="text-base font-semibold text-slate-800"
            >
              Edit / Replace Extra-Curricular
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Update your document and resubmit it for review.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving}
            aria-label="Close edit Extra-Curricular modal"
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-5 py-5">
            {/* MENTOR FEEDBACK */}

            {mentorFeedback && (
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                <p className="text-xs font-semibold text-orange-800">
                  Mentor&apos;s Feedback
                </p>

                <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-orange-900">
                  {mentorFeedback}
                </p>
              </div>
            )}

            {/* ERROR */}

            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3"
              >
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <p className="text-xs leading-5 text-red-600">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* ACTIVITY NAME */}

            <div>
              <label
                htmlFor="extracurricular-document-name"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Activity Name <span className="text-red-500">*</span>
              </label>

              <input
                id="extracurricular-document-name"
                type="text"
                value={documentName}
                onChange={(event) => setDocumentName(event.target.value)}
                disabled={isSaving}
                maxLength={100}
                required
                placeholder="Enter activity name"
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {documentName.length}/100
              </p>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                htmlFor="extracurricular-description"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="extracurricular-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isSaving}
                rows={3}
                maxLength={500}
                placeholder="Describe your activity and any changes made..."
                className="w-full resize-none rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {description.length}/500
              </p>
            </div>

            {/* REVISED FILE */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Revised Activity File{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileChange}
                disabled={isSaving}
                className="hidden"
              />

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onDrop={handleDrop}
                onClick={() => {
                  if (!isSaving) {
                    fileInputRef.current?.click();
                  }
                }}
                className="cursor-pointer rounded-lg border-2 border-dashed border-blue-200 px-5 py-6 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                  {selectedFile ? (
                    <FileCheck2 size={22} className="text-green-600" />
                  ) : (
                    <UploadCloud size={22} className="text-blue-600" />
                  )}
                </div>

                {selectedFile ? (
                  <>
                    <p className="break-all text-sm font-medium text-slate-700">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatFileSize(selectedFile.size)}
                    </p>

                    <p className="mt-2 text-xs text-blue-600">
                      Click to replace with another file
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700">
                      Select your revised document
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Click to browse or drag and drop
                    </p>

                    <p className="mt-3 text-[11px] text-slate-400">
                      PDF, DOC, DOCX, PPT, PPTX · Maximum 20 MB
                    </p>
                  </>
                )}
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Your revised file will replace the existing file on the
                activity record once the update succeeds.
              </p>
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="h-9 rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex h-9 items-center gap-2 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Resubmitting...
                </>
              ) : (
                <>
                  <RotateCcw size={14} />
                  Save &amp; Resubmit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExtraCurricularModal;