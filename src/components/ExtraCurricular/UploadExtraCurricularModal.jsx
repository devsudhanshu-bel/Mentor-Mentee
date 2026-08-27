import React, {
  useRef,
  useState,
} from "react";

import {
  X,
  UploadCloud,
  Star,
  FileText,
} from "lucide-react";

import {
  uploadDocument,
} from "../../api/document.api";

const UploadExtraCurricularModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const fileInputRef =
    useRef(null);

  const [documentName, setDocumentName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

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

  const handleFileChange = (
    event
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setError("");

    // 20 MB

    const maxSize =
      20 * 1024 * 1024;

    if (
      selectedFile.size >
      maxSize
    ) {
      setError(
        "File size must be less than 20MB."
      );

      event.target.value = "";

      return;
    }

    setFile(selectedFile);

    // Automatically use filename if name is empty

    if (!documentName) {
      const nameWithoutExtension =
        selectedFile.name.replace(
          /\.[^/.]+$/,
          ""
        );

      setDocumentName(
        nameWithoutExtension
      );
    }
  };

  // ==========================================================
  // DRAG & DROP
  // ==========================================================

  const handleDragOver = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFile =
      event.dataTransfer.files?.[0];

    if (!droppedFile) {
      return;
    }

    const maxSize =
      20 * 1024 * 1024;

    if (
      droppedFile.size >
      maxSize
    ) {
      setError(
        "File size must be less than 20MB."
      );

      return;
    }

    setError("");
    setFile(droppedFile);

    if (!documentName) {
      const nameWithoutExtension =
        droppedFile.name.replace(
          /\.[^/.]+$/,
          ""
        );

      setDocumentName(
        nameWithoutExtension
      );
    }
  };

  // ==========================================================
  // UPLOAD
  // ==========================================================

  const handleUpload = async () => {
    setError("");

    if (!documentName.trim()) {
      setError(
        "Please enter an activity name."
      );

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
        documentName:
          documentName.trim(),

        category:
          "EXTRA_CURRICULAR",

        description:
          description.trim(),

        file,
      });

      resetForm();

      onSuccess?.();

      onClose?.();
    } catch (error) {
      console.error(
        "UploadExtraCurricularModal.handleUpload error:",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

          <div>

            <h2 className="text-lg font-semibold text-slate-800">
              Upload Extra-Curricular Activity
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Upload certificates, achievements,
              hobbies or activity records.
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="p-2 rounded-md hover:bg-slate-100 transition disabled:opacity-50"
          >
            <X size={18} />
          </button>

        </div>

        {/* ==================================================
            BODY
        ================================================== */}

        <div className="p-6 space-y-5">

          {/* Error */}

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Activity Name */}

          <div>

            <label className="block text-xs font-medium text-slate-700 mb-1">
              Activity Name
            </label>

            <input
              type="text"
              value={documentName}
              onChange={(event) =>
                setDocumentName(
                  event.target.value
                )
              }
              placeholder="Enter activity name"
              disabled={loading}
              className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50"
            />

          </div>

          {/* Category */}

          <div>

            <label className="block text-xs font-medium text-slate-700 mb-1">
              Activity Category
            </label>

            <select
              disabled={loading}
              className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50"
            >
              <option>
                Photography
              </option>

              <option>
                Music
              </option>

              <option>
                Dance
              </option>

              <option>
                Writing
              </option>

              <option>
                Art
              </option>

              <option>
                Sports
              </option>

              <option>
                Gaming
              </option>

              <option>
                Content Creation
              </option>

              <option>
                Travel
              </option>

              <option>
                Public Speaking
              </option>

              <option>
                Other
              </option>
            </select>

            <p className="text-[11px] text-slate-400 mt-1">
              This is for display purposes.
              The backend document category is
              EXTRA_CURRICULAR.
            </p>

          </div>

          {/* Upload */}

          <div>

            <label className="block text-xs font-medium text-slate-700 mb-2">
              Upload Certificate / Proof
            </label>

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-slate-50 transition cursor-pointer"
            >

              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">

                <UploadCloud
                  size={24}
                  className="text-blue-600"
                />

              </div>

              <p className="text-sm font-medium text-slate-700">
                Drag & Drop your file here
              </p>

              <p className="text-xs text-slate-500 mt-1">
                or click to browse
              </p>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  fileInputRef.current?.click();
                }}
                disabled={loading}
                className="mt-3 h-9 px-4 rounded-md border border-slate-300 text-xs font-medium hover:bg-slate-50 disabled:opacity-50"
              >
                Browse Files
              </button>

              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                onChange={
                  handleFileChange
                }
              />

              <p className="text-[11px] text-slate-400 mt-3">
                PDF, DOC, DOCX, PPT, PPTX,
                JPG, PNG • Max 20MB
              </p>

            </div>

            {/* Selected File */}

            {file && (
              <div className="mt-3 flex items-center gap-3 rounded-md bg-slate-50 border border-slate-200 px-3 py-2">

                <FileText
                  size={18}
                  className="text-blue-600 shrink-0"
                />

                <div className="min-w-0">

                  <p className="text-xs font-medium text-slate-700 truncate">
                    {file.name}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    {(
                      file.size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </p>

                </div>

              </div>
            )}

          </div>

          {/* Description */}

          <div>

            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              disabled={loading}
              placeholder="Describe your activity, achievements and highlights..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none outline-none focus:border-blue-500 disabled:bg-slate-50"
            />

          </div>

        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="h-10 px-4 rounded-md border border-slate-300 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >

            <Star size={16} />

            {loading
              ? "Uploading..."
              : "Upload Activity"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default UploadExtraCurricularModal;