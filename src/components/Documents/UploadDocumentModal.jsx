import React, { useState } from "react";
import { X, Upload, FileText, Loader2 } from "lucide-react";

import { uploadDocument } from "../../api/document.api";

const UploadDocumentModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [documentName, setDocumentName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  // ==========================================================
  // FILE SELECT
  // ==========================================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);

    if (!documentName) {
      const fileNameWithoutExtension =
        selectedFile.name.replace(/\.[^/.]+$/, "");

      setDocumentName(fileNameWithoutExtension);
    }

    setError("");
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleClose = () => {
    if (loading) {
      return;
    }

    setDocumentName("");
    setCategory("");
    setDescription("");
    setFile(null);
    setError("");

    onClose();
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!documentName.trim()) {
      setError("Document name is required.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    if (!file) {
      setError("Please select a document to upload.");
      return;
    }

    try {
      setLoading(true);

      await uploadDocument({
        documentName: documentName.trim(),
        category,
        description: description.trim(),
        file,
      });

      setDocumentName("");
      setCategory("");
      setDescription("");
      setFile(null);
      setError("");

      if (onSuccess) {
        await onSuccess();
      }

    } catch (err) {
      console.error(
        "Failed to upload document:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to upload the document. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Upload Document
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add a new document to your profile.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition disabled:opacity-50"
          >
            <X size={21} />
          </button>

        </div>


        {/* ====================================================
            FORM
        ==================================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          {/* Error */}

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">

              <p className="text-sm text-red-600">
                {error}
              </p>

            </div>
          )}


          {/* ==================================================
              DOCUMENT NAME
          ================================================== */}

          <div className="mb-4">

            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Document Name
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <input
              type="text"
              value={documentName}
              onChange={(event) =>
                setDocumentName(event.target.value)
              }
              placeholder="Enter document name"
              maxLength={100}
              disabled={loading}
              className="w-full h-10 px-3 rounded-md border border-slate-300 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />

          </div>


          {/* ==================================================
              CATEGORY
          ================================================== */}

          <div className="mb-4">

            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Category
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              disabled={loading}
              className="w-full h-10 px-3 rounded-md border border-slate-300 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            >
              <option value="">
                Select category
              </option>

              <option value="ACADEMICS">
                Academics
              </option>

              <option value="CERTIFICATES">
                Certificates
              </option>

              <option value="INTERNSHIPS">
                Internships
              </option>

              <option value="PROJECTS">
                Projects
              </option>

              <option value="RESEARCH">
                Research
              </option>

              <option value="CO_CURRICULAR">
                Co-Curricular
              </option>

              <option value="EXTRA_CURRICULAR">
                Extra-Curricular
              </option>

              <option value="AWARDS">
                Awards
              </option>

              <option value="PERSONAL">
                Personal
              </option>

              <option value="OTHER">
                Other
              </option>

            </select>

          </div>


          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div className="mb-4">

            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Add a short description..."
              maxLength={500}
              rows={3}
              disabled={loading}
              className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-800 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />

            <p className="text-xs text-slate-400 text-right mt-1">
              {description.length}/500
            </p>

          </div>


          {/* ==================================================
              FILE
          ================================================== */}

          <div className="mb-6">

            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Document File
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <label
              className={`block border-2 border-dashed rounded-lg p-5 text-center transition ${
                loading
                  ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                  : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer"
              }`}
            >

              <input
                type="file"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
              />

              {file ? (

                <div className="flex items-center justify-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

                    <FileText
                      size={21}
                      className="text-blue-600"
                    />

                  </div>

                  <div className="text-left min-w-0">

                    <p className="text-sm font-medium text-slate-700 truncate max-w-[280px]">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {(
                        file.size /
                        (1024 * 1024)
                      ).toFixed(2)}{" "}
                      MB
                    </p>

                  </div>

                </div>

              ) : (

                <>

                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">

                    <Upload
                      size={20}
                      className="text-blue-600"
                    />

                  </div>

                  <p className="text-sm font-medium text-slate-700">
                    Click to select a file
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Select the document you want to upload.
                  </p>

                </>

              )}

            </label>

          </div>


          {/* ==================================================
              ACTIONS
          ================================================== */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-10 px-5 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
            >
              Cancel
            </button>


            <button
              type="submit"
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
                  <Upload size={16} />

                  Upload Document
                </>

              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default UploadDocumentModal;