import React, { useEffect, useRef, useState } from "react";

import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Users,
  Building2,
  CalendarDays,
} from "lucide-react";

import { importStudentsFromPdf } from "../../../../api/student.api";

// ==========================================================
// COMPONENT
// ==========================================================

const AddStudentsModal = ({
  open,
  onClose,

  departments = [],

  selectedDepartmentId = "",

  termId = "",

  onSuccess,
}) => {
  // ========================================================
  // FILE INPUT
  // ========================================================

  const fileInputRef = useRef(null);

  // ========================================================
  // FORM STATE
  // ========================================================

  const [departmentId, setDepartmentId] = useState(selectedDepartmentId || "");

  const [file, setFile] = useState(null);

  // ========================================================
  // UI STATE
  // ========================================================

  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(null);

  // ========================================================
  // SYNC MODAL WITH CURRENT ASSIGNMENT FILTER
  // ========================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    setDepartmentId(selectedDepartmentId || "");

    setFile(null);

    setError("");

    setSuccess(null);

    setLoading(false);

    setDragActive(false);
  }, [open, selectedDepartmentId, termId]);

  // ========================================================
  // CLOSE MODAL
  // ========================================================

  const handleClose = () => {
    if (loading) {
      return;
    }

    setFile(null);

    setError("");

    setSuccess(null);

    setDragActive(false);

    onClose();
  };

  // ========================================================
  // FILE VALIDATION
  // ========================================================

  const validateFile = (selectedFile) => {
    if (!selectedFile) {
      return "Please select a PDF file.";
    }

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return "Only PDF files are allowed.";
    }

    // Maximum 10 MB.
    if (selectedFile.size > 10 * 1024 * 1024) {
      return "PDF file size must not exceed 10 MB.";
    }

    return "";
  };

  // ========================================================
  // HANDLE FILE
  // ========================================================

  const handleFileSelect = (selectedFile) => {
    const validationError = validateFile(selectedFile);

    if (validationError) {
      setFile(null);

      setError(validationError);

      return;
    }

    setError("");

    setSuccess(null);

    setFile(selectedFile);
  };

  // ========================================================
  // FILE INPUT CHANGE
  // ========================================================

  const handleInputChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFileSelect(selectedFile);
    }

    // Allows selecting the same file again.
    event.target.value = "";
  };

  // ========================================================
  // DRAG OVER
  // ========================================================

  const handleDragOver = (event) => {
    event.preventDefault();

    event.stopPropagation();

    if (!loading) {
      setDragActive(true);
    }
  };

  // ========================================================
  // DRAG LEAVE
  // ========================================================

  const handleDragLeave = (event) => {
    event.preventDefault();

    event.stopPropagation();

    setDragActive(false);
  };

  // ========================================================
  // DROP
  // ========================================================

  const handleDrop = (event) => {
    event.preventDefault();

    event.stopPropagation();

    setDragActive(false);

    if (loading) {
      return;
    }

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  // ========================================================
  // IMPORT STUDENTS
  // ========================================================

  const handleImport = async () => {
    // ----------------------------------------------------
    // RESET FEEDBACK
    // ----------------------------------------------------

    setError("");

    setSuccess(null);

    // ----------------------------------------------------
    // DEPARTMENT VALIDATION
    // ----------------------------------------------------

    if (!departmentId) {
      setError("Please select a department.");

      return;
    }

    // ----------------------------------------------------
    // TERM VALIDATION
    // ----------------------------------------------------

    if (!termId) {
      setError("Please select an academic term before importing students.");

      return;
    }

    // ----------------------------------------------------
    // FILE VALIDATION
    // ----------------------------------------------------

    if (!file) {
      setError("Please select a PDF file.");

      return;
    }

    try {
      setLoading(true);

      // ==================================================
      // SEND PDF + DEPARTMENT + TERM
      // ==================================================

      const response = await importStudentsFromPdf({
        file,

        departmentId,

        termId,
      });

      // ==================================================
      // NORMALIZE RESPONSE
      // ==================================================

      const result = response?.data ?? response;

      console.log("✅ Student import successful:", result);

      setSuccess(result);

      // ==================================================
      // NOTIFY PARENT PAGE
      // ==================================================

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      console.error("❌ Student import error:", err);

      const responseData = err?.response?.data;

      // ==================================================
      // VALIDATION ERRORS
      // ==================================================

      const validationErrors =
        responseData?.validationErrors || responseData?.data?.validationErrors;

      // ==================================================
      // PARSING ERRORS
      // ==================================================

      const parsingErrors =
        responseData?.parsingErrors || responseData?.data?.parsingErrors;

      // ==================================================
      // FORMAT VALIDATION ERRORS
      // ==================================================

      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const formattedErrors = validationErrors.slice(0, 8).map((item) => {
          const row = item.row ? `Row ${item.row}: ` : "";

          const identifier = item.registerNumber || item.email || "";

          return `${row}${identifier} ${
            item.reason || "Validation failed"
          }`.trim();
        });

        const extraCount =
          validationErrors.length > 8 ? validationErrors.length - 8 : 0;

        setError(
          `${
            responseData?.message || "Student import validation failed."
          }\n\n${formattedErrors.join("\n")}${
            extraCount ? `\n+ ${extraCount} more error(s)` : ""
          }`,
        );

        return;
      }

      // ==================================================
      // FORMAT PARSING ERRORS
      // ==================================================

      if (Array.isArray(parsingErrors) && parsingErrors.length > 0) {
        const formattedErrors = parsingErrors.slice(0, 8).map((item) => {
          const row = item.row ? `Row ${item.row}: ` : "";

          return `${row}${item.reason || "Could not parse this row"}`;
        });

        const extraCount =
          parsingErrors.length > 8 ? parsingErrors.length - 8 : 0;

        setError(
          `${
            responseData?.message || "The PDF could not be parsed."
          }\n\n${formattedErrors.join("\n")}${
            extraCount ? `\n+ ${extraCount} more error(s)` : ""
          }`,
        );

        return;
      }

      // ==================================================
      // GENERIC ERROR
      // ==================================================

      setError(
        responseData?.message ||
          responseData?.error ||
          err?.message ||
          "Failed to import students.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // DO NOT RENDER WHEN CLOSED
  // ========================================================

  if (!open) {
    return null;
  }

  // ========================================================
  // SUCCESS VIEW
  // ========================================================

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-6 backdrop-blur-sm">
        <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* ================================================
              SUCCESS HEADER
          ================================================= */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Students Imported
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                The student accounts have been created successfully.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* ================================================
              SUCCESS CONTENT
          ================================================= */}

          <div className="px-6 py-6">
            {/* ==============================================
                COUNT
            =============================================== */}

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                </div>

                <div>
                  <p className="text-lg font-bold text-emerald-900">
                    {success.importedCount || 0} student
                    {(success.importedCount || 0) !== 1 ? "s" : ""} imported
                  </p>

                  <p className="text-sm text-emerald-700">
                    Department:{" "}
                    {success.department?.name || "Selected department"}
                  </p>

                  <p className="mt-0.5 text-sm text-emerald-700">
                    Term: {success.term?.name || "Selected term"}
                  </p>
                </div>
              </div>
            </div>

            {/* ==============================================
                TEMP PASSWORD
            =============================================== */}

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Temporary Password
              </p>

              <p className="mt-2 font-mono text-lg font-bold text-slate-900">
                {success.temporaryPassword || "Password@123"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Students must change this password after their first successful
                login.
              </p>
            </div>

            {/* ==============================================
                ACTIVE STATUS
            =============================================== */}

            <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Students are active
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Imported students are immediately active and enrolled in the
                    selected academic term.
                  </p>
                </div>
              </div>
            </div>

            {/* ==============================================
                PARSING WARNINGS
            =============================================== */}

            {Array.isArray(success.parsingErrors) &&
              success.parsingErrors.length > 0 && (
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <div>
                      <p className="font-semibold text-amber-900">
                        Some PDF rows were skipped
                      </p>

                      <p className="mt-1 text-sm text-amber-700">
                        {success.parsingErrors.length} row(s) could not be
                        interpreted as student records.
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* ================================================
              FOOTER
          ================================================= */}

          <div className="flex justify-end border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // MAIN MODAL
  // ========================================================

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900">
                <Users size={21} className="text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add Students
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  Import student accounts from a PDF.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* ==================================================
            BODY
        ================================================== */}

        <div className="space-y-6 px-6 py-6">
          {/* =================================================
              DEPARTMENT
          ================================================= */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Building2 size={16} />
              Department
              <span className="text-red-500">*</span>
            </label>

            <select
              value={departmentId}
              onChange={(event) => {
                setDepartmentId(event.target.value);

                setError("");
              }}
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            >
              <option value="">Select department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-slate-400">
              All students in this PDF will be assigned to the selected
              department.
            </p>
          </div>

          {/* =================================================
              TERM
          ================================================= */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <CalendarDays size={16} />
              Academic Term
              <span className="text-red-500">*</span>
            </label>

            <div
              className={[
                "flex w-full items-center rounded-xl border px-4 py-3",
                termId
                  ? "border-slate-200 bg-slate-50"
                  : "border-red-200 bg-red-50",
              ].join(" ")}
            >
              <span
                className={
                  termId
                    ? "text-sm font-medium text-slate-700"
                    : "text-sm font-medium text-red-600"
                }
              >
                {termId
                  ? "Students will be enrolled in the currently selected academic term."
                  : "Please select an academic term on the Assignments page first."}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              The imported students will be created as ACTIVE and enrolled in
              this term automatically.
            </p>
          </div>

          {/* =================================================
              PDF UPLOAD
          ================================================= */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Student List PDF
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                if (!loading) {
                  fileInputRef.current?.click();
                }
              }}
              className={[
                "cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition",
                dragActive
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 hover:border-slate-400 hover:bg-slate-50",
                loading ? "pointer-events-none opacity-60" : "",
              ].join(" ")}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleInputChange}
                className="hidden"
              />

              {file ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <FileText size={24} className="text-red-500" />
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      if (!loading) {
                        setFile(null);

                        setError("");
                      }
                    }}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                    <Upload size={25} className="text-slate-500" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Drop your PDF here or click to browse
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PDF only • Maximum 10 MB
                  </p>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              EXPECTED FORMAT
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <FileText size={18} className="mt-0.5 shrink-0 text-slate-500" />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Expected PDF columns
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Register Number &nbsp; • &nbsp; Name &nbsp; • &nbsp; Email
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Each imported student receives the temporary password{" "}
                  <strong>Password@123</strong> and is required to change it on
                  first login.
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Students are created as <strong>ACTIVE</strong> and enrolled
                  in the selected academic term.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <p className="whitespace-pre-line text-sm leading-6 text-red-700">
                  {error}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          {/* =================================================
              CANCEL
          ================================================= */}

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          {/* =================================================
              IMPORT
          ================================================= */}

          <button
            type="button"
            onClick={handleImport}
            disabled={loading || !file || !departmentId || !termId}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload size={17} />
                Import Students
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentsModal;
