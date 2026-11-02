
import React, { useEffect, useState } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

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

  const [selectedBacklog, setSelectedBacklog] = useState(null);

  const [clearedSemesterNumber, setClearedSemesterNumber] = useState("");
  const [clearedGrade, setClearedGrade] = useState("");
  const [clearedMarks, setClearedMarks] = useState("");

  // LOAD ACTIVE BACKLOGS
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

  // OPEN
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

  // SELECT BACKLOG
  const handleSelectBacklog = (backlog) => {
    setSelectedBacklog(backlog);
    setClearedSemesterNumber("");
    setClearedGrade("");
    setClearedMarks("");
    setError("");
    setSuccess("");
  };

  // BACK TO LIST
  const handleBack = () => {
    setSelectedBacklog(null);
    setClearedSemesterNumber("");
    setClearedGrade("");
    setClearedMarks("");
    setError("");
    setSuccess("");
  };

  // CLEAR BACKLOG
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

  if (!isOpen) return null;

  const getSemesterLabel = (number) => {
    const semester = SEMESTERS.find(
      (item) => item.value === Number(number),
    );

    return semester?.label || `Semester ${number}`;
  };

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center overflow-y-auto bg-black/40 px-3 py-4 backdrop-blur-sm sm:px-5 sm:py-6">
      <div className="my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl">

        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 sm:h-11 sm:w-11">
              <CheckCircle2 size={21} className="text-green-600" />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#082B73] sm:text-lg">
                Cleared Backlogs
              </h2>

              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                Mark your previously pending subjects as cleared.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cleared backlogs modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        {/* BODY */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">

          {/* ERROR */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 sm:px-4">
              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-red-600"
              />
              <p className="text-xs leading-relaxed text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-3 sm:px-4">
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-green-600"
              />
              <p className="text-xs leading-relaxed text-green-700">
                {success}
              </p>
            </div>
          )}

          {/* CLEARANCE FORM */}
          {selectedBacklog ? (
            <div>
              {/* BACK BUTTON */}
              <button
                type="button"
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 rounded-lg py-1 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
              >
                <ArrowLeft size={15} />
                Back to Backlogs
              </button>

              {/* SELECTED SUBJECT */}
              <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-3 sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
                  Backlog Subject
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {selectedBacklog.subjectCode && (
                    <span className="shrink-0 rounded-md bg-white px-2 py-1 text-[10px] font-bold text-blue-600 sm:text-[11px]">
                      {selectedBacklog.subjectCode}
                    </span>
                  )}

                  <h3 className="break-words text-sm font-bold text-[#082B73] sm:text-base">
                    {selectedBacklog.subjectName}
                  </h3>
                </div>

                <p className="mt-2 text-[11px] text-slate-500 sm:text-xs">
                  Original backlog:{" "}
                  {getSemesterLabel(selectedBacklog.semesterNumber)}
                </p>
              </div>

              {/* FORM */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold text-[#082B73]">
                  Enter Clearance Details
                </h3>

                <form
                  onSubmit={handleClearBacklog}
                  className="space-y-4"
                >
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5"
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
                      onChange={(event) =>
                        setClearedMarks(event.target.value)
                      }
                      placeholder="e.g. 78"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5"
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
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
              {/* ACTIVE BACKLOGS INTRO */}
              <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                <h3 className="text-sm font-semibold text-[#082B73]">
                  Pending Backlogs
                </h3>

                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                  Select a subject below after you have successfully cleared it.
                </p>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="flex items-center justify-center rounded-xl border border-slate-200 py-10">
                  <Loader2
                    size={22}
                    className="animate-spin text-blue-600"
                  />
                  <span className="ml-2 text-xs text-slate-500">
                    Loading backlogs...
                  </span>
                </div>
              )}

              {/* EMPTY STATE */}
              {!loading && backlogs.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center sm:py-10">
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

              {/* BACKLOG LIST */}
              {!loading && backlogs.length > 0 && (
                <div className="space-y-3">
                  {backlogs.map((backlog) => (
                    <div
                      key={backlog.id}
                      className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-green-200 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-4"
                    >
                      {/* SUBJECT DETAILS */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          {backlog.subjectCode && (
                            <span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 sm:text-[11px]">
                              {backlog.subjectCode}
                            </span>
                          )}

                          <p className="min-w-0 break-words text-sm font-semibold text-slate-700">
                            {backlog.subjectName}
                          </p>
                        </div>

                        <p className="mt-2 text-[11px] text-slate-500 sm:mt-1 sm:text-xs">
                          Backlog from{" "}
                          {getSemesterLabel(backlog.semesterNumber)}
                        </p>
                      </div>

                      {/* CLEAR BUTTON */}
                      <div className="mt-3 border-t border-slate-100 pt-3 sm:mt-0 sm:shrink-0 sm:border-0 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => handleSelectBacklog(backlog)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-50 px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-100 sm:w-auto"
                        >
                          <CheckCircle2 size={14} />
                          Clear Backlog
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
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

export default ClearedBacklogModal;
