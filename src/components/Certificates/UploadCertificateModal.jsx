import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  UploadCloud,
  FileBadge,
  Loader2,
  FileText,
} from "lucide-react";

import {
  uploadDocument,
} from "../../api/document.api";

const UploadCertificateModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  // ==========================================================
  // REFS
  // ==========================================================

  const fileInputRef =
    useRef(null);

  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [
    documentName,
    setDocumentName,
  ] = useState("");

  const [
    certificateType,
    setCertificateType,
  ] = useState("Data Science");

  const [
    issueDate,
    setIssueDate,
  ] = useState("");

  const [
    issuedBy,
    setIssuedBy,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    file,
    setFile,
  ] = useState(null);

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================================
  // RESET
  // ==========================================================

  const resetForm = () => {
    setDocumentName("");
    setCertificateType("Data Science");
    setIssueDate("");
    setIssuedBy("");
    setDescription("");
    setFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================================
  // RESET WHEN OPENED
  // ==========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    resetForm();
  }, [isOpen]);

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
  // FILE VALIDATION
  // ==========================================================

  const validateFile = (
    selectedFile
  ) => {
    if (!selectedFile) {
      return "Please select a certificate file.";
    }

    // 5MB

    const maxSize =
      5 * 1024 * 1024;

    if (
      selectedFile.size >
      maxSize
    ) {
      return "File size must not exceed 5MB.";
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    const allowedExtensions = [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
    ];

    const fileName =
      selectedFile.name.toLowerCase();

    const hasValidType =
      allowedTypes.includes(
        selectedFile.type
      );

    const hasValidExtension =
      allowedExtensions.some(
        (extension) =>
          fileName.endsWith(extension)
      );

    if (
      !hasValidType &&
      !hasValidExtension
    ) {
      return "Only PDF, JPG and PNG files are supported.";
    }

    return "";
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

    const validationError =
      validateFile(
        selectedFile
      );

    if (validationError) {
      setError(
        validationError
      );

      setFile(null);

      event.target.value = "";

      return;
    }

    setError("");
    setFile(selectedFile);

    /*
     * If certificate title is empty,
     * automatically use the filename
     * without extension.
     */

    if (!documentName.trim()) {
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
  // BROWSE
  // ==========================================================

  const handleBrowse = () => {
    if (loading) {
      return;
    }

    fileInputRef.current?.click();
  };

  // ==========================================================
  // DRAG OVER
  // ==========================================================

  const handleDragOver = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) {
      return;
    }
  };

  // ==========================================================
  // DROP
  // ==========================================================

  const handleDrop = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) {
      return;
    }

    const droppedFile =
      event.dataTransfer.files?.[0];

    if (!droppedFile) {
      return;
    }

    const validationError =
      validateFile(
        droppedFile
      );

    if (validationError) {
      setError(
        validationError
      );

      setFile(null);

      return;
    }

    setError("");
    setFile(droppedFile);

    if (!documentName.trim()) {
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

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!documentName.trim()) {
      setError(
        "Please enter a certificate title."
      );

      return;
    }

    if (!issueDate) {
      setError(
        "Please select the certificate issue date."
      );

      return;
    }

    if (!issuedBy.trim()) {
      setError(
        "Please enter the issuing organization."
      );

      return;
    }

    if (!file) {
      setError(
        "Please select a certificate file."
      );

      return;
    }

    const fileError =
      validateFile(file);

    if (fileError) {
      setError(fileError);

      return;
    }

    // ========================================================
    // UPLOAD
    // ========================================================

    try {
      setLoading(true);

      console.log(
        "Uploading Certificate:",
        {
          documentName:
            documentName.trim(),

          category:
            "CERTIFICATES",

          certificateType,

          issueDate,

          issuedBy:
            issuedBy.trim(),

          file:
            file.name,
        }
      );

      await uploadDocument({
        documentName:
          documentName.trim(),

        category:
          "CERTIFICATES",

        description:
          description.trim(),

        file,
      });

      console.log(
        "Certificate uploaded successfully."
      );

      // ======================================================
      // SUCCESS
      // ======================================================

      resetForm();

      /*
       * Tell the parent component that a new
       * certificate was uploaded.
       *
       * The parent can then re-fetch:
       *
       * - Certificate list
       * - KPI / statistics
       */

      onSuccess?.();

      onClose?.();

    } catch (error) {
      console.error(
        "UploadCertificateModal.handleUpload error:",
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
            "Failed to upload certificate. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // FILE SIZE
  // ==========================================================

  const formatFileSize = (
    bytes
  ) => {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6"
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !loading
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
              Upload Certificate
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Upload your course certificates and professional learning achievements.
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="p-2 rounded-md hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>

        </div>

        {/* ==================================================
            BODY
        ================================================== */}

        <div className="flex-1 overflow-y-auto">

          <div className="p-6 space-y-5">

            {/* ERROR */}

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* ==================================================
                CERTIFICATE TITLE
            ================================================== */}

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-1">
                Certificate Title
              </label>

              <input
                type="text"
                value={documentName}
                onChange={(event) =>
                  setDocumentName(
                    event.target.value
                  )
                }
                placeholder="Enter certificate title"
                disabled={loading}
                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
              />

            </div>

            {/* ==================================================
                CATEGORY & ISSUE DATE
            ================================================== */}

            <div className="grid grid-cols-2 gap-4">

              {/* CATEGORY */}

              <div>

                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Certificate Category
                </label>

                <select
                  value={
                    certificateType
                  }
                  onChange={(event) =>
                    setCertificateType(
                      event.target.value
                    )
                  }
                  disabled={loading}
                  className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                >

                  <option>
                    Data Science
                  </option>

                  <option>
                    Machine Learning
                  </option>

                  <option>
                    Cloud Computing
                  </option>

                  <option>
                    Programming
                  </option>

                  <option>
                    Web Development
                  </option>

                  <option>
                    Cyber Security
                  </option>

                  <option>
                    Business
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>

              {/* ISSUE DATE */}

              <div>

                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Issue Date
                </label>

                <input
                  type="date"
                  value={issueDate}
                  onChange={(event) =>
                    setIssueDate(
                      event.target.value
                    )
                  }
                  disabled={loading}
                  className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
                />

              </div>

            </div>

            {/* ==================================================
                ISSUED BY
            ================================================== */}

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-1">
                Issued By
              </label>

              <input
                type="text"
                value={issuedBy}
                onChange={(event) =>
                  setIssuedBy(
                    event.target.value
                  )
                }
                placeholder="Enter issuing organization"
                disabled={loading}
                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
              />

            </div>

            {/* ==================================================
                FILE UPLOAD
            ================================================== */}

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-2">
                Upload Certificate
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={
                  handleFileChange
                }
                className="hidden"
              />

              <div
                onDrop={
                  handleDrop
                }
                onDragOver={
                  handleDragOver
                }
                onClick={
                  handleBrowse
                }
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition ${
                  loading
                    ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                    : "border-slate-300 hover:border-blue-500 hover:bg-slate-50 cursor-pointer"
                }`}
              >

                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">

                  <UploadCloud
                    size={24}
                    className="text-blue-600"
                  />

                </div>

                {file ? (
                  <>

                    <div className="flex items-center gap-2 max-w-full">

                      <FileText
                        size={18}
                        className="text-blue-600 shrink-0"
                      />

                      <p
                        className="text-sm font-medium text-slate-700 truncate max-w-[400px]"
                        title={file.name}
                      >
                        {file.name}
                      </p>

                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {formatFileSize(
                        file.size
                      )}
                    </p>

                  </>
                ) : (
                  <>

                    <p className="text-sm font-medium text-slate-700">
                      Drag & Drop your certificate here
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
                      disabled={loading}
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
                placeholder="Add a short description..."
                disabled={loading}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
              />

            </div>

          </div>

        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-white shrink-0">

          {/* CANCEL */}

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="h-10 px-4 rounded-md border border-slate-300 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          {/* UPLOAD */}

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >

            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Uploading...
              </>
            ) : (
              <>
                <FileBadge
                  size={16}
                />

                Upload Certificate
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  );
};

export default UploadCertificateModal;