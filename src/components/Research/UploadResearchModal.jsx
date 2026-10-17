import React, { useRef, useState } from "react";

import {
  X,
  UploadCloud,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { uploadDocument } from "../../api/document.api";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
];

const UploadResearchModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const fileInputRef = useRef(null);

  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================================
  // RESET FORM
  // ==========================================================

  const resetForm = () => {
    setDocumentName("");
    setDescription("");
    setSelectedFile(null);
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleClose = () => {
    if (isUploading) return;

    resetForm();
    onClose?.();
  };

  // ==========================================================
  // FILE EXTENSION
  // ==========================================================

  const getFileExtension = (fileName) => {
    if (!fileName) return "";

    const lastDotIndex = fileName.lastIndexOf(".");

    if (lastDotIndex === -1) return "";

    return fileName.substring(lastDotIndex).toLowerCase();
  };

  // ==========================================================
  // VALIDATE FILE
  // ==========================================================

  const validateFile = (file) => {
    if (!file) {
      return "Please select a file.";
    }

    if (file.size === 0) {
      return "The selected file is empty.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must not exceed 20MB.";
    }

    const extension = getFileExtension(file.name);

    const isValidType = ALLOWED_FILE_TYPES.includes(file.type);
    const isValidExtension = ALLOWED_EXTENSIONS.includes(extension);

    if (!isValidType && !isValidExtension) {
      return "Invalid file format. Please upload PDF, DOC, DOCX, PPT, or PPTX.";
    }

    return "";
  };

  // ==========================================================
  // HANDLE FILE SELECTION
  // ==========================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setErrorMessage("");

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setErrorMessage(validationError);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    // Use the file name automatically when the name is empty.
    if (!documentName.trim()) {
      const extension = getFileExtension(file.name);

      const nameWithoutExtension = extension
        ? file.name.slice(0, -extension.length)
        : file.name;

      setDocumentName(nameWithoutExtension);
    }
  };

  // ==========================================================
  // HANDLE DRAG AND DROP
  // ==========================================================

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    setErrorMessage("");

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setErrorMessage(validationError);
      return;
    }

    setSelectedFile(file);

    if (!documentName.trim()) {
      const extension = getFileExtension(file.name);

      const nameWithoutExtension = extension
        ? file.name.slice(0, -extension.length)
        : file.name;

      setDocumentName(nameWithoutExtension);
    }
  };

  // ==========================================================
  // FORMAT FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // ==========================================================
  // UPLOAD RESEARCH
  // ==========================================================

  const handleUpload = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!documentName.trim()) {
      setErrorMessage("Please enter a research document name.");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("Please select a research document.");
      return;
    }

    const validationError = validateFile(selectedFile);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setIsUploading(true);

      await uploadDocument({
        documentName: documentName.trim(),
        category: "RESEARCH",
        description: description.trim(),
        file: selectedFile,
      });

      resetForm();

      // Refresh the research list after a successful upload.
      onSuccess?.();

      // Close the modal after success.
      onClose?.();
    } catch (error) {
      console.error("UploadResearchModal.handleUpload error:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload research document. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // ==========================================================
  // IF CLOSED
  // ==========================================================

  if (!isOpen) return null;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isUploading) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-research-title"
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2
              id="upload-research-title"
              className="text-base font-semibold text-slate-800"
            >
              Upload Research
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Add a research paper, presentation, or report.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            aria-label="Close upload modal"
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleUpload}>
          <div className="space-y-4 px-5 py-5">
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

            {/* RESEARCH NAME */}

            <div>
              <label
                htmlFor="upload-research-name"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Research Name <span className="text-red-500">*</span>
              </label>

              <input
                id="upload-research-name"
                type="text"
                value={documentName}
                onChange={(event) => setDocumentName(event.target.value)}
                placeholder="Enter research document name"
                disabled={isUploading}
                maxLength={200}
                required
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                htmlFor="upload-research-description"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="upload-research-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add a short description about this research..."
                rows={3}
                maxLength={5000}
                disabled={isUploading}
                className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            {/* RESEARCH FILE */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Research File <span className="text-red-500">*</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onDrop={handleDrop}
                onClick={() => {
                  if (!isUploading) {
                    fileInputRef.current?.click();
                  }
                }}
                className="cursor-pointer rounded-lg border-2 border-dashed border-blue-200 px-5 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                  <UploadCloud size={22} className="text-blue-600" />
                </div>

                {selectedFile ? (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <FileText size={17} className="shrink-0 text-blue-600" />

                      <p className="max-w-[300px] truncate text-sm font-medium text-slate-700">
                        {selectedFile.name}
                      </p>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatFileSize(selectedFile.size)}
                    </p>

                    <p className="mt-2 text-xs text-blue-600">
                      Click to choose another file
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700">
                      Drag & drop your file here
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      or click to browse
                    </p>

                    <p className="mt-3 text-[11px] text-slate-400">
                      PDF, DOC, DOCX, PPT, PPTX · Maximum 20MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="h-9 rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="flex h-9 items-center gap-2 rounded-md bg-blue-600 px-5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud size={14} />
                  Upload Research
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadResearchModal;