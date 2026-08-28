import React, { useEffect, useState } from "react";

import { X, Plus, Pencil, Trash2, AlertCircle, Loader2 } from "lucide-react";

import {
  getBacklogs,
  createBacklog,
  updateBacklog,
  deleteBacklog,
} from "../../api/academic.api";

const SEMESTERS = [
  { value: 1, label: "Semester I" },
  { value: 2, label: "Semester II" },
  { value: 3, label: "Semester III" },
  { value: 4, label: "Semester IV" },
  { value: 5, label: "Semester V" },
  { value: 6, label: "Semester VI" },
  { value: 7, label: "Semester VII" },
  { value: 8, label: "Semester VIII" },
];

const BacklogModal = ({ isOpen, onClose, onBacklogChange }) => {
  const [backlogs, setBacklogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [subjectCode, setSubjectCode] = useState("");

  const [subjectName, setSubjectName] = useState("");

  const [semesterNumber, setSemesterNumber] = useState("");

  const [editingId, setEditingId] = useState(null);

  // =========================================================
  // LOAD
  // =========================================================

  const loadBacklogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBacklogs();

      const data = response?.data ?? response;

      const records = data?.backlogs ?? [];

      setBacklogs(
        Array.isArray(records)
          ? records.filter((backlog) => backlog?.status === "ACTIVE")
          : [],
      );
    } catch (err) {
      console.error("Failed to load backlogs:", err);

      setError(
        err?.response?.data?.message || "Failed to load backlog records.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    setEditingId(null);
    setSubjectCode("");
    setSubjectName("");
    setSemesterNumber("");
    setError("");
    setSuccess("");

    loadBacklogs();
  }, [isOpen]);

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setEditingId(null);
    setSubjectCode("");
    setSubjectName("");
    setSemesterNumber("");
    setError("");
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanSubjectCode = subjectCode.trim().toUpperCase();

    const cleanSubjectName = subjectName.trim();

    const semester = Number(semesterNumber);

    if (!cleanSubjectCode) {
      setError("Please enter the subject code.");
      return;
    }

    if (!cleanSubjectName) {
      setError("Please enter the subject name.");
      return;
    }

    if (!Number.isInteger(semester) || semester < 1 || semester > 8) {
      setError("Please select a valid semester.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateBacklog(editingId, {
          subjectCode: cleanSubjectCode,
          subjectName: cleanSubjectName,
          semesterNumber: semester,
        });

        setSuccess("Backlog details updated successfully.");
      } else {
        await createBacklog({
          subjectCode: cleanSubjectCode,
          subjectName: cleanSubjectName,
          semesterNumber: semester,
        });

        setSuccess("Backlog added successfully.");
      }

      resetForm();

      await loadBacklogs();

      onBacklogChange?.();

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error("Failed to save backlog:", err);

      setError(err?.response?.data?.message || "Failed to save backlog.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (backlog) => {
    setEditingId(backlog.id);

    setSubjectCode(backlog.subjectCode || "");

    setSubjectName(backlog.subjectName || "");

    setSemesterNumber(String(backlog.semesterNumber || ""));

    setError("");
    setSuccess("");
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (backlogId) => {
    if (
      !window.confirm("Are you sure you want to remove this backlog record?")
    ) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      setSaving(true);

      await deleteBacklog(backlogId);

      setSuccess("Backlog removed successfully.");

      await loadBacklogs();

      onBacklogChange?.();

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error("Failed to delete backlog:", err);

      setError(err?.response?.data?.message || "Failed to remove backlog.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const getSemesterLabel = (number) => {
    const semester = SEMESTERS.find((item) => item.value === Number(number));

    return semester?.label || `Semester ${number}`;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <AlertCircle size={20} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#082B73]">Backlogs</h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Manage your pending academic backlogs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        {/* BODY */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
              {success}
            </div>
          )}

          {/* FORM */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#082B73]">
                {editingId ? "Edit Backlog" : "Add Backlog"}
              </h3>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-medium text-slate-500 hover:text-blue-600"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {/* CODE */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Subject Code *
                </label>

                <input
                  type="text"
                  value={subjectCode}
                  onChange={(event) =>
                    setSubjectCode(event.target.value.toUpperCase())
                  }
                  placeholder="e.g. CSEAM731"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* NAME */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Subject Name *
                </label>

                <input
                  type="text"
                  value={subjectName}
                  onChange={(event) => setSubjectName(event.target.value)}
                  placeholder="e.g. Mathematics"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* SEMESTER */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Semester *
                </label>

                <select
                  value={semesterNumber}
                  onChange={(event) => setSemesterNumber(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select semester</option>

                  {SEMESTERS.map((semester) => (
                    <option key={semester.value} value={semester.value}>
                      {semester.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B63F6] px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Saving...
                    </>
                  ) : editingId ? (
                    <>
                      <Pencil size={15} />
                      Update Backlog
                    </>
                  ) : (
                    <>
                      <Plus size={15} />
                      Add Backlog
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ACTIVE */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#082B73]">
                Active Backlogs
              </h3>

              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
                {backlogs.length}
              </span>
            </div>

            {loading && (
              <div className="flex items-center justify-center rounded-xl border border-slate-200 py-8">
                <Loader2 size={20} className="animate-spin text-blue-600" />
              </div>
            )}

            {!loading && backlogs.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                <AlertCircle
                  size={24}
                  className="mx-auto mb-2 text-slate-400"
                />

                <p className="text-sm font-medium text-slate-600">
                  No active backlogs
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add a backlog using the form above.
                </p>
              </div>
            )}

            {!loading && backlogs.length > 0 && (
              <div className="space-y-3">
                {backlogs.map((backlog) => (
                  <div
                    key={backlog.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-600">
                          {backlog.subjectCode || "N/A"}
                        </span>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {backlog.subjectName}
                        </p>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {getSemesterLabel(backlog.semesterNumber)}
                      </p>
                    </div>

                    <div className="ml-4 flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(backlog)}
                        className="flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(backlog.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BacklogModal;
