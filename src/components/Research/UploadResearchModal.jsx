import React, {
  useRef,
  useState,
} from "react";

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

  // ==========================================================
  // STATE
  // ==========================================================

  const fileInputRef = useRef(null);

  const [documentName, setDocumentName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

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

    if (isUploading) {
      return;
    }

    resetForm();

    if (onClose) {
      onClose();
    }
  };

  // ==========================================================
  // GET FILE EXTENSION
  // ==========================================================

  const getFileExtension = (fileName) => {

    if (!fileName) {
      return "";
    }

    const lastDotIndex =
      fileName.lastIndexOf(".");

    if (lastDotIndex === -1) {
      return "";
    }

    return fileName
      .substring(lastDotIndex)
      .toLowerCase();
  };

  // ==========================================================
  // VALIDATE FILE
  // ==========================================================

  const validateFile = (file) => {

    if (!file) {
      return "Please select a file.";
    }

    // File size
    if (file.size > MAX_FILE_SIZE) {
      return "File size must not exceed 20MB.";
    }

    const extension =
      getFileExtension(file.name);

    const isValidType =
      ALLOWED_FILE_TYPES.includes(file.type);

    const isValidExtension =
      ALLOWED_EXTENSIONS.includes(extension);

    if (!isValidType && !isValidExtension) {
      return "Invalid file format. Please upload PDF, DOC, DOCX, PPT, or PPTX.";
    }

    return "";
  };

  // ==========================================================
  // HANDLE FILE
  // ==========================================================

  const handleFileChange = (event) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setErrorMessage("");

    const validationError =
      validateFile(file);

    if (validationError) {

      setSelectedFile(null);

      setErrorMessage(
        validationError
      );

      return;
    }

    setSelectedFile(file);

    // Automatically use file name
    // as document name
    if (!documentName.trim()) {

      const extension =
        getFileExtension(file.name);

      const nameWithoutExtension =
        extension
          ? file.name.slice(
              0,
              -extension.length
            )
          : file.name;

      setDocumentName(
        nameWithoutExtension
      );
    }
  };

  // ==========================================================
  // HANDLE DROP
  // ==========================================================

  const handleDrop = (event) => {

    event.preventDefault();
    event.stopPropagation();

    const file =
      event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    setErrorMessage("");

    const validationError =
      validateFile(file);

    if (validationError) {

      setSelectedFile(null);

      setErrorMessage(
        validationError
      );

      return;
    }

    setSelectedFile(file);

    if (!documentName.trim()) {

      const extension =
        getFileExtension(file.name);

      const nameWithoutExtension =
        extension
          ? file.name.slice(
              0,
              -extension.length
            )
          : file.name;

      setDocumentName(
        nameWithoutExtension
      );
    }
  };

  // ==========================================================
  // FORMAT FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {

    if (!bytes) {
      return "0 KB";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
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
  // UPLOAD
  // ==========================================================

  const handleUpload = async (event) => {

    event.preventDefault();

    setErrorMessage("");

    // Document name
    if (!documentName.trim()) {

      setErrorMessage(
        "Please enter a research document name."
      );

      return;
    }

    // File
    if (!selectedFile) {

      setErrorMessage(
        "Please select a research document."
      );

      return;
    }

    // Validate again
    const validationError =
      validateFile(selectedFile);

    if (validationError) {

      setErrorMessage(
        validationError
      );

      return;
    }

    try {

      setIsUploading(true);

      console.log(
        "Uploading research document:",
        {
          documentName:
            documentName.trim(),
          category: "RESEARCH",
          description:
            description.trim(),
          file:
            selectedFile.name,
        }
      );

      await uploadDocument({
        documentName:
          documentName.trim(),

        category: "RESEARCH",

        description:
          description.trim(),

        file:
          selectedFile,
      });

      console.log(
        "Research document uploaded successfully."
      );

      resetForm();

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {

      console.error(
        "UploadResearchModal.handleUpload error:",
        error
      );

      const backendMessage =
        error?.response?.data?.message;

      setErrorMessage(
        backendMessage ||
        "Failed to upload research document. Please try again."
      );

    } finally {

      setIsUploading(false);
    }
  };

  // ==========================================================
  // IF CLOSED
  // ==========================================================

  if (!isOpen) {
    return null;
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

          <div>

            <h2 className="text-base font-semibold text-slate-800">
              Upload Research
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Add a research paper, presentation, or report.
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition disabled:opacity-50"
          >
            <X size={19} />
          </button>

        </div>

        {/* ====================================================
            FORM
        ==================================================== */}

        <form onSubmit={handleUpload}>

          <div className="px-5 py-5 space-y-4">

            {/* ==================================================
                ERROR
            ================================================== */}

            {errorMessage && (

              <div className="flex items-start gap-2 p-3 rounded-md bg-red-50 border border-red-200">

                <AlertCircle
                  size={17}
                  className="text-red-600 mt-0.5 shrink-0"
                />

                <p className="text-xs text-red-600 leading-5">
                  {errorMessage}
                </p>

              </div>

            )}

            {/* ==================================================
                DOCUMENT NAME
            ================================================== */}

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Research Name
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <input
                type="text"
                value={documentName}
                onChange={(event) =>
                  setDocumentName(
                    event.target.value
                  )
                }
                placeholder="Enter research document name"
                disabled={isUploading}
                className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-slate-50"
              />

            </div>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder="Add a short description about this research..."
                rows={3}
                disabled={isUploading}
                className="w-full px-3 py-2.5 rounded-md border border-slate-300 bg-white text-sm text-slate-700 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-slate-50"
              />

            </div>

            {/* ==================================================
                FILE
            ================================================== */}

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Research File
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />

              {/* DROP AREA */}

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
                className="border-2 border-dashed border-blue-200 rounded-lg px-5 py-7 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition"
              >

                <div className="w-11 h-11 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-3">

                  <UploadCloud
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                {selectedFile ? (

                  <>

                    <div className="flex items-center justify-center gap-2">

                      <FileText
                        size={17}
                        className="text-blue-600"
                      />

                      <p className="text-sm font-medium text-slate-700 truncate max-w-[300px]">
                        {selectedFile.name}
                      </p>

                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      {formatFileSize(
                        selectedFile.size
                      )}
                    </p>

                    <p className="text-xs text-blue-600 mt-2">
                      Click to choose another file
                    </p>

                  </>

                ) : (

                  <>

                    <p className="text-sm font-medium text-slate-700">
                      Drag & drop your file here
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      or click to browse
                    </p>

                    <p className="text-[11px] text-slate-400 mt-3">
                      PDF, DOC, DOCX, PPT, PPTX
                      {" • "}
                      Maximum 20MB
                    </p>

                  </>

                )}

              </div>

            </div>

          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">

            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="h-9 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="h-9 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {isUploading ? (

                <>
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />

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