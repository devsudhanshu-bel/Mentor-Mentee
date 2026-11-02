
import {
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

  const [achievementTitle, setAchievementTitle] = useState("");
  const [achievementLevel, setAchievementLevel] = useState("University Level");
  const [achievementDate, setAchievementDate] = useState("");
  const [organization, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // ==========================================================
  // RESET FORM
  // ==========================================================

  const resetForm = () => {
    setAchievementTitle("");
    setAchievementLevel("University Level");
    setAchievementDate("");
    setOrganization("");
    setDescription("");
    setSelectedFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    if (isUploading) {
      return;
    }

    resetForm();
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

    const validationError = validateFile(file);

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

    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    const validationError = validateFile(file);

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

    // VALIDATION

    if (!achievementTitle.trim()) {
      setError("Please enter an achievement title.");
      return;
    }

    if (!achievementDate) {
      setError("Please select the achievement date.");
      return;
    }

    if (!organization.trim()) {
      setError("Please enter the organization or event name.");
      return;
    }

    if (!selectedFile) {
      setError("Please upload a certificate or proof file.");
      return;
    }

    const fileError = validateFile(selectedFile);

    if (fileError) {
      setError(fileError);
      return;
    }

    // UPLOAD

    try {
      setIsUploading(true);

      const uploadPayload = {
        documentName: selectedFile.name,
        category: "AWARDS",
        description: description.trim(),
        file: selectedFile,
      };

      console.log("Uploading achievement document:", {
        documentName: selectedFile.name,
        category: "AWARDS",
        achievementTitle: achievementTitle.trim(),
        achievementLevel,
        achievementDate,
        organization: organization.trim(),
        description: description.trim(),
        file: selectedFile.name,
      });

      const response = await uploadDocument(uploadPayload);

      console.log("Achievement upload response:", response);

      // SUCCESS

      onUploadSuccess?.(response);

      resetForm();
      onClose?.();

    } catch (error) {
      console.error(
        "UploadAchievementModal.handleSubmit error:",
        error
      );

      const status = error?.response?.status;

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "";

      if (status === 429) {
        setError(
          message ||
          "Too many upload requests. Please wait a moment and try again."
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

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-6"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isUploading
        ) {
          handleClose();
        }
      }}
    >
      <div className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:max-h-[95vh]">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
              Add Achievement
            </h2>

            <p className="mt-1 break-words text-xs leading-5 text-slate-500">
              Upload your awards, recognitions and supporting certificates.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            aria-label="Close upload achievement modal"
            className="shrink-0 rounded-md p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >

          {/* SCROLLABLE CONTENT */}

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="break-words rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
              >
                {error}
              </div>
            )}

            {/* ACHIEVEMENT TITLE */}

            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Achievement Title
              </label>

              <input
                type="text"
                value={achievementTitle}
                onChange={(event) =>
                  setAchievementTitle(event.target.value)
                }
                placeholder="Enter achievement title"
                disabled={isUploading}
                className="h-10 w-full min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            {/* LEVEL & DATE */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="min-w-0">
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Achievement Level
                </label>

                <select
                  value={achievementLevel}
                  onChange={(event) =>
                    setAchievementLevel(event.target.value)
                  }
                  disabled={isUploading}
                  className="h-10 w-full min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
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

              <div className="min-w-0">
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Achievement Date
                </label>

                <input
                  type="date"
                  value={achievementDate}
                  onChange={(event) =>
                    setAchievementDate(event.target.value)
                  }
                  disabled={isUploading}
                  className="h-10 w-full min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

            </div>

            {/* ORGANIZATION */}

            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Organization / Event
              </label>

              <input
                type="text"
                value={organization}
                onChange={(event) =>
                  setOrganization(event.target.value)
                }
                placeholder="Enter organization or event name"
                disabled={isUploading}
                className="h-10 w-full min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            {/* FILE UPLOAD */}

            <div className="min-w-0">

              <label className="mb-2 block text-xs font-medium text-slate-700">
                Upload Certificate / Proof
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleBrowse}
                className={`flex min-w-0 flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-5 text-center transition sm:px-5 sm:py-6 ${
                  isUploading
                    ? "cursor-not-allowed border-slate-200 bg-slate-50"
                    : "cursor-pointer border-slate-300 hover:border-blue-500 hover:bg-blue-50/30"
                }`}
              >

                <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-12 sm:w-12">
                  <UploadCloud
                    size={24}
                    className="text-blue-600"
                  />
                </div>

                {selectedFile ? (
                  <>
                    <div className="flex w-full min-w-0 items-center justify-center gap-2 px-2">

                      <FileText
                        size={18}
                        className="shrink-0 text-blue-600"
                      />

                      <p
                        className="min-w-0 truncate text-sm font-medium text-slate-700"
                        title={selectedFile.name}
                      >
                        {selectedFile.name}
                      </p>

                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatFileSize(selectedFile.size)}
                    </p>

                    <p className="mt-2 text-[11px] text-blue-500">
                      Click to replace file
                    </p>
                  </>
                ) : (
                  <>
                    <p className="break-words text-sm font-medium text-slate-700">
                      Drag & Drop your file here
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      or click below to browse
                    </p>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleBrowse();
                      }}
                      disabled={isUploading}
                      className="mt-3 h-9 w-full max-w-[180px] rounded-md border border-slate-300 px-4 text-xs font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Browse Files
                    </button>

                    <p className="mt-3 break-words text-[11px] leading-5 text-slate-400">
                      PDF, JPG, PNG • Max 5MB
                    </p>
                  </>
                )}

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="min-w-0">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe your achievement..."
                disabled={isUploading}
                className="w-full min-w-0 resize-none rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

          </div>

          {/* FOOTER */}

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-white px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4">

            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="h-10 w-full rounded-md border border-slate-300 px-4 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
