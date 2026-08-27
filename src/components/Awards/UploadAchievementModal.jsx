import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  UploadCloud,
  Trophy,
  Loader2,
  FileText,
} from "lucide-react";

import {
  uploadDocument,
} from "../../api/document.api";

const UploadAchievementModal = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [achievementTitle, setAchievementTitle] =
    useState("");

  const [achievementLevel, setAchievementLevel] =
    useState("University Level");

  const [achievementDate, setAchievementDate] =
    useState("");

  const [organization, setOrganization] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [isUploading, setIsUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const fileInputRef =
    useRef(null);

  // ==========================================================
  // RESET FORM
  // ==========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setAchievementTitle("");
    setAchievementLevel("University Level");
    setAchievementDate("");
    setOrganization("");
    setDescription("");
    setSelectedFile(null);
    setIsUploading(false);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isOpen]);

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    if (isUploading) {
      return;
    }

    setError("");
    onClose?.();
  };

  // ==========================================================
  // FILE VALIDATION
  // ==========================================================

  const validateFile = (file) => {
    if (!file) {
      return "Please select a certificate or proof file.";
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return "File size must not exceed 5MB.";
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    const extension = file.name
      ?.split(".")
      .pop()
      ?.toLowerCase();

    const allowedExtensions = [
      "pdf",
      "jpg",
      "jpeg",
      "png",
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(extension)
    ) {
      return "Only PDF, JPG and PNG files are supported.";
    }

    return "";
  };

  // ==========================================================
  // FILE SELECT
  // ==========================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const validationError =
      validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  // ==========================================================
  // BROWSE
  // ==========================================================

  const handleBrowse = () => {
    if (isUploading) {
      return;
    }

    fileInputRef.current?.click();
  };

  // ==========================================================
  // DRAG & DROP
  // ==========================================================

  const handleDragOver = (event) => {
    event.preventDefault();

    if (isUploading) {
      return;
    }

    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (isUploading) {
      return;
    }

    const file =
      event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    const validationError =
      validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  // ==========================================================
  // UPLOAD
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUploading) {
      return;
    }

    setError("");

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!achievementTitle.trim()) {
      setError(
        "Please enter an achievement title."
      );
      return;
    }

    if (!achievementDate) {
      setError(
        "Please select the achievement date."
      );
      return;
    }

    if (!organization.trim()) {
      setError(
        "Please enter the organization or event name."
      );
      return;
    }

    if (!selectedFile) {
      setError(
        "Please upload a certificate or proof file."
      );
      return;
    }

    const fileError =
      validateFile(selectedFile);

    if (fileError) {
      setError(fileError);
      return;
    }

    // ========================================================
    // UPLOAD
    // ========================================================

    try {
      setIsUploading(true);

      /*
       * IMPORTANT:
       *
       * documentName must be the actual uploaded
       * file name because document.api.js requires
       * documentName.
       *
       * Example:
       *
       * SLAB_Hackathon_Consolidated_Info.pdf
       */

      const uploadPayload = {
        documentName: selectedFile.name,
        category: "AWARDS",
        description: description.trim(),
        file: selectedFile,
      };

      console.log(
        "Uploading Awards document:",
        {
          documentName:
            selectedFile.name,

          category:
            "AWARDS",

          achievementTitle:
            achievementTitle.trim(),

          achievementLevel,

          achievementDate,

          organization:
            organization.trim(),

          description:
            description.trim(),

          file:
            selectedFile.name,
        }
      );

      const response =
        await uploadDocument(
          uploadPayload
        );

      console.log(
        "Awards upload response:",
        response
      );

      // ======================================================
      // SUCCESS
      // ======================================================

      onUploadSuccess?.(
        response
      );

      onClose?.();

    } catch (error) {
      console.error(
        "UploadAchievementModal.handleSubmit error:",
        error
      );

      const status =
        error?.response?.status;

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "";

      if (status === 429) {
        setError(
          "Cloudinary upload limit has been reached. Please try again later."
        );
      } else {
        setError(
          message ||
            "Failed to upload achievement. Please try again."
        );
      }

    } finally {
      setIsUploading(false);
    }
  };

  // ==========================================================
  // FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (
      bytes <
      1024 * 1024
    ) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6"
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !isUploading
        ) {
          handleClose();
        }
      }}
    >
      <div className="w-full max-w-2xl max-h-[95vh] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Add Achievement
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Upload your awards, recognitions and supporting certificates.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            className="p-2 rounded-md hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>

        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto"
        >

          <div className="p-6 space-y-5">

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* ==================================================
                ACHIEVEMENT TITLE
            ================================================== */}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Achievement Title
              </label>

              <input
                type="text"
                value={achievementTitle}
                onChange={(event) =>
                  setAchievementTitle(
                    event.target.value
                  )
                }
                placeholder="Enter achievement title"
                disabled={isUploading}
                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* ==================================================
                LEVEL & DATE
            ================================================== */}

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Achievement Level
                </label>

                <select
                  value={achievementLevel}
                  onChange={(event) =>
                    setAchievementLevel(
                      event.target.value
                    )
                  }
                  disabled={isUploading}
                  className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                >
                  <option value="University Level">
                    University Level
                  </option>

                  <option value="Department Level">
                    Department Level
                  </option>

                  <option value="National Level">
                    National Level
                  </option>

                  <option value="International Level">
                    International Level
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Achievement Date
                </label>

                <input
                  type="date"
                  value={achievementDate}
                  onChange={(event) =>
                    setAchievementDate(
                      event.target.value
                    )
                  }
                  disabled={isUploading}
                  className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                />
              </div>

            </div>

            {/* ==================================================
                ORGANIZATION
            ================================================== */}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Organization / Event
              </label>

              <input
                type="text"
                value={organization}
                onChange={(event) =>
                  setOrganization(
                    event.target.value
                  )
                }
                placeholder="Enter organization or event name"
                disabled={isUploading}
                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* ==================================================
                FILE UPLOAD
            ================================================== */}

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-2">
                Upload Certificate / Proof
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleBrowse}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition ${
                  isUploading
                    ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                    : "border-slate-300 hover:border-blue-500 cursor-pointer"
                }`}
              >

                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">

                  <UploadCloud
                    size={24}
                    className="text-blue-600"
                  />

                </div>

                {selectedFile ? (
                  <>
                    <div className="flex items-center gap-2 max-w-full px-3">

                      <FileText
                        size={18}
                        className="text-blue-600 shrink-0"
                      />

                      <p
                        className="text-sm font-medium text-slate-700 truncate"
                        title={selectedFile.name}
                      >
                        {selectedFile.name}
                      </p>

                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {formatFileSize(
                        selectedFile.size
                      )}
                    </p>

                    <p className="text-[11px] text-blue-500 mt-2">
                      Click to replace file
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700">
                      Drag & Drop your file here
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      or click below to browse
                    </p>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleBrowse();
                      }}
                      disabled={isUploading}
                      className="mt-3 h-9 px-4 rounded-md border border-slate-300 text-xs font-medium hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Browse Files
                    </button>

                    <p className="text-[11px] text-slate-400 mt-3">
                      PDF, JPG, PNG • Max 5MB
                    </p>
                  </>
                )}

              </div>

            </div>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

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
                placeholder="Describe your achievement..."
                disabled={isUploading}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
            </div>

          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-white sticky bottom-0">

            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="h-10 px-4 rounded-md border border-slate-300 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {isUploading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  Uploading...
                </>
              ) : (
                <>
                  <Trophy size={16} />

                  Upload Achievement
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default UploadAchievementModal;