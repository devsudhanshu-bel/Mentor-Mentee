
import React, { useEffect, useState } from "react";
import {
  X,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";

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

  // LOAD BACKLOGS
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

  // RESET FORM
  const resetForm = () => {
    setEditingId(null);
    setSubjectCode("");
    setSubjectName("");
    setSemesterNumber("");
    setError("");
  };

  // SAVE BACKLOG
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

  // EDIT BACKLOG
  const handleEdit = (backlog) => {
    setEditingId(backlog.id);
    setSubjectCode(backlog.subjectCode || "");
    setSubjectName(backlog.subjectName || "");
    setSemesterNumber(String(backlog.semesterNumber || ""));
    setError("");
    setSuccess("");
  };

  // DELETE BACKLOG
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

  if (!isOpen) return null;

  const getSemesterLabel = (number) => {
    const semester = SEMESTERS.find(
      (item) => item.value === Number(number),
    );

    return semester?.label || `Semester ${number}`;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/40 px-3 py-4 backdrop-blur-sm sm:px-5 sm:py-6">
      <div className="my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl">

        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 sm:h-11 sm:w-11">
              <AlertCircle size={21} className="text-blue-600" />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#082B73] sm:text-lg">
                Backlogs
              </h2>

              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                Manage your pending academic backlogs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close backlog modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        {/* BODY */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 sm:px-4">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
              <p className="text-xs leading-relaxed text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-3 py-3 sm:px-4">
              <p className="text-xs font-medium leading-relaxed text-green-700">
                {success}
              </p>
            </div>
          )}

          {/* FORM */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:rounded-2xl sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-[#082B73]">
                {editingId ? "Edit Backlog" : "Add Backlog"}
              </h3>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="shrink-0 text-[11px] font-semibold text-slate-500 transition hover:text-blue-600 sm:text-xs"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
            >
              {/* SUBJECT CODE */}
              <div className="min-w-0">
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5"
                />
              </div>

              {/* SUBJECT NAME */}
              <div className="min-w-0">
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Subject Name *
                </label>

                <input
                  type="text"
                  value={subjectName}
                  onChange={(event) => setSubjectName(event.target.value)}
                  placeholder="e.g. Mathematics"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5"
                />
              </div>

              {/* SEMESTER */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Semester *
                </label>

                <select
                  value={semesterNumber}
                  onChange={(event) => setSemesterNumber(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5"
                >
                  <option value="">Select semester</option>

                  {SEMESTERS.map((semester) => (
                    <option key={semester.value} value={semester.value}>
                      {semester.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUBMIT */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B63F6] px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:py-2.5"
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

          {/* ACTIVE BACKLOGS */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[#082B73]">
                Active Backlogs
              </h3>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
                {backlogs.length}
              </span>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="flex items-center justify-center rounded-xl border border-slate-200 py-9">
                <Loader2 size={22} className="animate-spin text-blue-600" />
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && backlogs.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center sm:py-10">
                <AlertCircle
                  size={26}
                  className="mx-auto mb-2 text-slate-400"
                />

                <p className="text-sm font-semibold text-slate-600">
                  No active backlogs
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add a backlog using the form above.
                </p>
              </div>
            )}

            {/* BACKLOG LIST */}
            {!loading && backlogs.length > 0 && (
              <div className="space-y-3">
                {backlogs.map((backlog) => (
                  <div
                    key={backlog.id}
                    className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-200 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3"
                  >
                    {/* DETAILS */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 sm:text-[11px]">
                          {backlog.subjectCode || "N/A"}
                        </span>

                        <p className="min-w-0 break-words text-sm font-semibold text-slate-700">
                          {backlog.subjectName}
                        </p>
                      </div>

                      <p className="mt-2 text-[11px] text-slate-500 sm:mt-1">
                        {getSemesterLabel(backlog.semesterNumber)}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3 sm:mt-0 sm:shrink-0 sm:border-0 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => handleEdit(backlog)}
                        disabled={saving}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100 disabled:opacity-50 sm:flex-none"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(backlog.id)}
                        disabled={saving}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50 sm:flex-none"
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
        <div className="flex shrink-0 justify-end border-t border-slate-100 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto sm:py-2.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BacklogModal;
