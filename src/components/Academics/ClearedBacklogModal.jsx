import React, { useEffect, useState } from "react";

import { X, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

import { getBacklogs, clearBacklog } from "../../api/academic.api";

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

const ClearedBacklogModal = ({ isOpen, onClose, onBacklogChange }) => {
  const [backlogs, setBacklogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // Selected subject to clear
  const [selectedBacklog, setSelectedBacklog] = useState(null);

  // Clearing form
  const [clearedSemesterNumber, setClearedSemesterNumber] = useState("");

  const [clearedGrade, setClearedGrade] = useState("");

  const [clearedMarks, setClearedMarks] = useState("");

  // =========================================================
  // LOAD ACTIVE BACKLOGS
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

  // =========================================================
  // OPEN
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    setSelectedBacklog(null);
    setClearedSemesterNumber("");
    setClearedGrade("");
    setClearedMarks("");
    setError("");
    setSuccess("");

    loadBacklogs();
  }, [isOpen]);

  // =========================================================
  // SELECT BACKLOG
  // =========================================================

  const handleSelectBacklog = (backlog) => {
    setSelectedBacklog(backlog);

    setClearedSemesterNumber("");

    setClearedGrade("");

    setClearedMarks("");

    setError("");

    setSuccess("");
  };

  // =========================================================
  // BACK TO LIST
  // =========================================================

  const handleBack = () => {
    setSelectedBacklog(null);

    setClearedSemesterNumber("");

    setClearedGrade("");

    setClearedMarks("");

    setError("");

    setSuccess("");
  };

  // =========================================================
  // CLEAR BACKLOG
  // =========================================================

  const handleClearBacklog = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedBacklog) {
      setError("Please select a backlog.");
      return;
    }

    const semester = Number(clearedSemesterNumber);

    const grade = clearedGrade.trim();

    const marks = clearedMarks === "" ? null : Number(clearedMarks);

    if (!Number.isInteger(semester) || semester < 1 || semester > 8) {
      setError("Please select the semester in which the backlog was cleared.");
      return;
    }

    if (!grade) {
      setError("Please enter the cleared grade.");
      return;
    }

    if (marks !== null && (!Number.isFinite(marks) || marks < 0)) {
      setError("Please enter valid marks.");
      return;
    }

    try {
      setSaving(true);

      await clearBacklog(selectedBacklog.id, {
        clearedSemesterNumber: semester,

        clearedGrade: grade,

        clearedMarks: marks,
      });

      setSuccess(`${selectedBacklog.subjectName} has been marked as cleared.`);

      onBacklogChange?.();

      await loadBacklogs();

      setTimeout(() => {
        setSelectedBacklog(null);
        setClearedSemesterNumber("");
        setClearedGrade("");
        setClearedMarks("");
        setSuccess("");
      }, 1200);
    } catch (err) {
      console.error("Failed to clear backlog:", err);

      setError(
        err?.response?.data?.message || "Failed to mark backlog as cleared.",
      );
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
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* ===================================================
            HEADER
           =================================================== */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#082B73]">
                Cleared Backlogs
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Mark your previously pending subjects as cleared.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        {/* ===================================================
            BODY
           =================================================== */}

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
              <CheckCircle2 size={15} />

              {success}
            </div>
          )}

          {/* =================================================
              CLEAR FORM
             ================================================= */}

          {selectedBacklog ? (
            <div>
              {/* Back */}
              <button
                type="button"
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600"
              >
                <ArrowLeft size={15} />
                Back to Backlogs
              </button>

              {/* SUBJECT */}
              <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-[10px] font-medium uppercase tracking-wide text-blue-500">
                  Backlog Subject
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {selectedBacklog.subjectCode && (
                    <span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-blue-600">
                      {selectedBacklog.subjectCode}
                    </span>
                  )}

                  <h3 className="text-base font-bold text-[#082B73]">
                    {selectedBacklog.subjectName}
                  </h3>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Original backlog:{" "}
                  {getSemesterLabel(selectedBacklog.semesterNumber)}
                </p>
              </div>

              {/* FORM */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-4 text-sm font-semibold text-[#082B73]">
                  Enter Clearance Details
                </h3>

                <form onSubmit={handleClearBacklog} className="space-y-4">
                  {/* CLEARED SEMESTER */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Semester Cleared *
                    </label>

                    <select
                      value={clearedSemesterNumber}
                      onChange={(event) =>
                        setClearedSemesterNumber(event.target.value)
                      }
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

                  {/* GRADE */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Grade Obtained *
                    </label>

                    <input
                      type="text"
                      value={clearedGrade}
                      onChange={(event) =>
                        setClearedGrade(event.target.value.toUpperCase())
                      }
                      placeholder="e.g. B+"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* MARKS */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                      Total Marks Obtained
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={clearedMarks}
                      onChange={(event) => setClearedMarks(event.target.value)}
                      placeholder="e.g. 78"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={15} />
                        Mark as Cleared
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {/* =================================================
                  ACTIVE BACKLOGS LIST
                 ================================================= */}

              <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-[#082B73]">
                  Pending Backlogs
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Select a subject below after you have successfully cleared it.
                </p>
              </div>

              {loading && (
                <div className="flex items-center justify-center rounded-xl border border-slate-200 py-10">
                  <Loader2 size={22} className="animate-spin text-blue-600" />

                  <span className="ml-2 text-xs text-slate-500">
                    Loading backlogs...
                  </span>
                </div>
              )}

              {!loading && backlogs.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                  <CheckCircle2
                    size={28}
                    className="mx-auto mb-2 text-green-500"
                  />

                  <p className="text-sm font-semibold text-slate-600">
                    No pending backlogs
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    All your recorded backlogs have been cleared.
                  </p>
                </div>
              )}

              {!loading && backlogs.length > 0 && (
                <div className="space-y-3">
                  {backlogs.map((backlog) => (
                    <div
                      key={backlog.id}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {backlog.subjectCode && (
                            <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-600">
                              {backlog.subjectCode}
                            </span>
                          )}

                          <p className="truncate text-sm font-semibold text-slate-700">
                            {backlog.subjectName}
                          </p>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          Backlog from{" "}
                          {getSemesterLabel(backlog.semesterNumber)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectBacklog(backlog)}
                        className="ml-4 flex shrink-0 items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                      >
                        <CheckCircle2 size={14} />
                        Clear
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ===================================================
            FOOTER
           =================================================== */}

        <div className="flex items-center justify-end border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearedBacklogModal;
