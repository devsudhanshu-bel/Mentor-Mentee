
import React, { useMemo, useState } from "react";
import { importAttendancePdf } from "../../api/attendance.api";

import {
  X,
  Plus,
  Trash2,
  BookOpen,
  Save,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const ROMAN = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
};

/* ==========================================================
   PERCENTAGE
========================================================== */

const calculatePercentage = (attended, held) => {
  const numericHeld = Number(held) || 0;
  const numericAttended = Number(attended) || 0;

  if (numericHeld <= 0) {
    return 0;
  }

  return (numericAttended / numericHeld) * 100;
};

/* ==========================================================
   EMPTY SUBJECT
========================================================== */

const createSubject = () => ({
  id: Date.now() + Math.random(),
  subjectName: "",
  courseCode: "",
  credits: "",
  category: "THEORY",

  /* Theory */
  theoryClassesHeld: "",
  theoryClassesAttended: "",

  /* Practical */
  practicalClassesHeld: "",
  practicalClassesAttended: "",
});

/* ==========================================================
   COMPONENT
========================================================== */

const AttendanceEntryModal = ({ semester, onClose, onSave }) => {
  const [subjects, setSubjects] = useState([createSubject()]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const [uploadedPdfName, setUploadedPdfName] = useState("");

  /* ========================================================
     ADD SUBJECT
  ======================================================== */

  const addSubject = () => {
    setSubjects((current) => [...current, createSubject()]);
  };

  /* ========================================================
     REMOVE SUBJECT
  ======================================================== */

  const removeSubject = (id) => {
    if (subjects.length === 1) {
      return;
    }

    setSubjects((current) =>
      current.filter((subject) => subject.id !== id),
    );

    setError("");
  };

  /* ========================================================
     UPDATE SUBJECT
  ======================================================== */

  const updateSubject = (id, field, value) => {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value,
            }
          : subject,
      ),
    );

    setError("");
  };

  /* ========================================================
     GET SUBJECT TOTALS
  ======================================================== */

  const getSubjectTotals = (subject) => {
    if (subject.category === "PRACTICAL") {
      const theoryHeld = Number(subject.theoryClassesHeld) || 0;
      const theoryAttended =
        Number(subject.theoryClassesAttended) || 0;

      const practicalHeld =
        Number(subject.practicalClassesHeld) || 0;

      const practicalAttended =
        Number(subject.practicalClassesAttended) || 0;

      const totalHeld = theoryHeld + practicalHeld;
      const totalAttended = theoryAttended + practicalAttended;

      return {
        theoryHeld,
        theoryAttended,
        theoryPercentage: calculatePercentage(
          theoryAttended,
          theoryHeld,
        ),

        practicalHeld,
        practicalAttended,
        practicalPercentage: calculatePercentage(
          practicalAttended,
          practicalHeld,
        ),

        totalHeld,
        totalAttended,
        combinedPercentage: calculatePercentage(
          totalAttended,
          totalHeld,
        ),
      };
    }

    const classesHeld =
      Number(subject.theoryClassesHeld) || 0;

    const classesAttended =
      Number(subject.theoryClassesAttended) || 0;

    return {
      theoryHeld: classesHeld,
      theoryAttended: classesAttended,
      theoryPercentage: calculatePercentage(
        classesAttended,
        classesHeld,
      ),

      practicalHeld: 0,
      practicalAttended: 0,
      practicalPercentage: 0,

      totalHeld: classesHeld,
      totalAttended: classesAttended,
      combinedPercentage: calculatePercentage(
        classesAttended,
        classesHeld,
      ),
    };
  };

  /* ========================================================
     LIVE SUMMARY
  ======================================================== */

  const summary = useMemo(() => {
    let classesHeld = 0;
    let classesAttended = 0;

    subjects.forEach((subject) => {
      const totals = getSubjectTotals(subject);

      classesHeld += totals.totalHeld;
      classesAttended += totals.totalAttended;
    });

    return {
      classesHeld,
      classesAttended,
      percentage: calculatePercentage(
        classesAttended,
        classesHeld,
      ),
    };
  }, [subjects]);

  /* ========================================================
     VALIDATE
  ======================================================== */

  const validate = () => {
    const names = [];

    for (const subject of subjects) {
      const name = subject.subjectName.trim();

      if (!name) {
        return "Please enter every subject name.";
      }

      const normalizedName = name.toLowerCase();

      if (names.includes(normalizedName)) {
        return `Duplicate subject: ${name}.`;
      }

      names.push(normalizedName);

      /* THEORY */

      const theoryHeld = Number(subject.theoryClassesHeld);
      const theoryAttended = Number(
        subject.theoryClassesAttended,
      );

      if (
        subject.theoryClassesHeld === "" ||
        !Number.isInteger(theoryHeld) ||
        theoryHeld < 0
      ) {
        return `Enter valid theory classes held for ${name}.`;
      }

      if (
        subject.theoryClassesAttended === "" ||
        !Number.isInteger(theoryAttended) ||
        theoryAttended < 0
      ) {
        return `Enter valid theory classes attended for ${name}.`;
      }

      if (theoryAttended > theoryHeld) {
        return `Theory classes attended cannot exceed classes held for ${name}.`;
      }

      /* PRACTICAL */

      if (subject.category === "PRACTICAL") {
        const practicalHeld = Number(
          subject.practicalClassesHeld,
        );

        const practicalAttended = Number(
          subject.practicalClassesAttended,
        );

        if (
          subject.practicalClassesHeld === "" ||
          !Number.isInteger(practicalHeld) ||
          practicalHeld < 0
        ) {
          return `Enter valid practical classes held for ${name}.`;
        }

        if (
          subject.practicalClassesAttended === "" ||
          !Number.isInteger(practicalAttended) ||
          practicalAttended < 0
        ) {
          return `Enter valid practical classes attended for ${name}.`;
        }

        if (practicalAttended > practicalHeld) {
          return `Practical classes attended cannot exceed classes held for ${name}.`;
        }
      }
    }

    return "";
  };

  /* ========================================================
     SAVE
  ======================================================== */

  const handleSave = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");

      /*
       * For practical subjects:
       *
       * Combined Held =
       * Theory Held + Practical Held
       *
       * Combined Attended =
       * Theory Attended + Practical Attended
       *
       * Backend receives final combined attendance.
       */

      const payload = subjects.map((subject) => {
        const totals = getSubjectTotals(subject);

        return {
          subjectName: subject.subjectName.trim(),
          courseCode: subject.courseCode.trim(),
          credits: Number(subject.credits) || 0,
          category: subject.category,

          classesHeld: totals.totalHeld,
          classesAttended: totals.totalAttended,
        };
      });

      await onSave(payload);
    } catch (err) {
      setError(err?.message || "Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  /* ========================================================
     INPUT STYLES
  ======================================================== */

  const inputClass =
    "w-full min-w-0 h-10 px-3 rounded-lg border border-slate-300 bg-white text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-[11px] font-medium text-slate-600";

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">

      {/* ======================================================
          BACKDROP
      ====================================================== */}

      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={saving ? undefined : onClose}
      />

      {/* ======================================================
          MODAL
      ====================================================== */}

      <div className="relative z-10 flex max-h-[96dvh] w-full max-w-[760px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <BookOpen size={19} className="text-blue-600" />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-semibold text-[#142970] sm:text-[17px]">
                Enter Attendance
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Semester {ROMAN[semester] || semester}
              </p>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setPdfError("");
                setSelectedPdf(null);
                setShowPdfDialog(true);
              }}
              className="h-9 flex-1 rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50 sm:flex-none"
            >
              Upload PDF
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close attendance dialog"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">

          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Add your subjects
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Select the subject category and enter the corresponding
              attendance details.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-xs leading-relaxed text-red-600">
              <AlertCircle
                size={15}
                className="mt-0.5 shrink-0"
              />

              <span className="min-w-0 break-words">
                {error}
              </span>
            </div>
          )}

          {/* ==================================================
              SUBJECTS
          ================================================== */}

          <div className="space-y-3">
            {subjects.map((subject, index) => {
              const totals = getSubjectTotals(subject);

              return (
                <div
                  key={subject.id}
                  className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/50 p-3 sm:p-4"
                >

                  {/* SUBJECT HEADER */}

                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-600">
                      Subject {index + 1}
                    </p>

                    {subjects.length > 1 && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => removeSubject(subject.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                        aria-label={`Remove subject ${index + 1}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  {/* SUBJECT NAME */}

                  <div className="mb-3">
                    <label className={labelClass}>
                      Subject Name
                    </label>

                    <input
                      type="text"
                      value={subject.subjectName}
                      onChange={(event) =>
                        updateSubject(
                          subject.id,
                          "subjectName",
                          event.target.value,
                        )
                      }
                      placeholder="e.g. Deep Learning"
                      className={inputClass}
                    />
                  </div>

                  {/* COURSE CODE + CREDITS */}

                  <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label className={labelClass}>
                        Course Code
                      </label>

                      <input
                        type="text"
                        value={subject.courseCode}
                        onChange={(event) =>
                          updateSubject(
                            subject.id,
                            "courseCode",
                            event.target.value,
                          )
                        }
                        placeholder="e.g. CSE701"
                        className={inputClass}
                      />
                    </div>

                    <div className="min-w-0">
                      <label className={labelClass}>
                        Credits
                      </label>

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={subject.credits}
                        onChange={(event) =>
                          updateSubject(
                            subject.id,
                            "credits",
                            event.target.value,
                          )
                        }
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* CATEGORY */}

                  <div className="mb-4">
                    <label className={labelClass}>
                      Subject Category
                    </label>

                    <div className="relative">
                      <select
                        value={subject.category}
                        onChange={(event) =>
                          updateSubject(
                            subject.id,
                            "category",
                            event.target.value,
                          )
                        }
                        className={`${inputClass} cursor-pointer appearance-none pr-9`}
                      >
                        <option value="THEORY">Theory</option>
                        <option value="PRACTICAL">Practical</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* THEORY */}

                  <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">

                    {subject.category === "PRACTICAL" && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-[#142970]">
                          Theory Part
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Enter theory attendance
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="min-w-0">
                        <label className={labelClass}>
                          Classes Held
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={subject.theoryClassesHeld}
                          onChange={(event) =>
                            updateSubject(
                              subject.id,
                              "theoryClassesHeld",
                              event.target.value,
                            )
                          }
                          placeholder="0"
                          className={inputClass}
                        />
                      </div>

                      <div className="min-w-0">
                        <label className={labelClass}>
                          Classes Attended
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={subject.theoryClassesAttended}
                          onChange={(event) =>
                            updateSubject(
                              subject.id,
                              "theoryClassesAttended",
                              event.target.value,
                            )
                          }
                          placeholder="0"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* THEORY PERCENTAGE */}

                    <div className="mt-3 text-right">
                      <span className="text-[11px] text-slate-400">
                        Theory Attendance:{" "}
                      </span>

                      <span className="text-[11px] font-semibold text-blue-600">
                        {totals.theoryPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* PRACTICAL */}

                  {subject.category === "PRACTICAL" && (
                    <>
                      <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">

                        <div className="mb-3">
                          <p className="text-xs font-semibold text-[#142970]">
                            Practical Part
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Enter practical attendance
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div className="min-w-0">
                            <label className={labelClass}>
                              Classes Held
                            </label>

                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={subject.practicalClassesHeld}
                              onChange={(event) =>
                                updateSubject(
                                  subject.id,
                                  "practicalClassesHeld",
                                  event.target.value,
                                )
                              }
                              placeholder="0"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Classes Attended
                            </label>

                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={subject.practicalClassesAttended}
                              onChange={(event) =>
                                updateSubject(
                                  subject.id,
                                  "practicalClassesAttended",
                                  event.target.value,
                                )
                              }
                              placeholder="0"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* PRACTICAL PERCENTAGE */}

                        <div className="mt-3 text-right">
                          <span className="text-[11px] text-slate-400">
                            Practical Attendance:{" "}
                          </span>

                          <span className="text-[11px] font-semibold text-blue-600">
                            {totals.practicalPercentage.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {/* COMBINED RESULT */}

                      <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/50 px-3 py-3 sm:px-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#142970]">
                              Combined Attendance
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              Theory + Practical
                            </p>
                          </div>

                          <span className="shrink-0 text-base font-bold text-blue-600">
                            {totals.combinedPercentage.toFixed(2)}%
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-400">
                              Total Classes Held
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#142970]">
                              {totals.totalHeld}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] text-slate-400">
                              Total Classes Attended
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#142970]">
                              {totals.totalAttended}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* THEORY FINAL PERCENTAGE */}

                  {subject.category === "THEORY" && (
                    <div className="mt-3 text-right">
                      <span className="text-[11px] text-slate-400">
                        Attendance:{" "}
                      </span>

                      <span className="text-[11px] font-semibold text-blue-600">
                        {totals.combinedPercentage.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ADD SUBJECT */}

          <button
            type="button"
            disabled={saving}
            onClick={addSubject}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-300 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
          >
            <Plus size={15} />
            Add Subject
          </button>
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 sm:px-6">

          {/* SUMMARY */}

          <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[10px] leading-relaxed text-slate-400 sm:text-xs">
                Classes Held
              </p>

              <p className="mt-1 text-sm font-semibold text-[#142970] sm:text-base">
                {summary.classesHeld}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] leading-relaxed text-slate-400 sm:text-xs">
                Classes Attended
              </p>

              <p className="mt-1 text-sm font-semibold text-[#142970] sm:text-base">
                {summary.classesAttended}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] leading-relaxed text-slate-400 sm:text-xs">
                Overall Attendance
              </p>

              <p className="mt-1 text-sm font-semibold text-blue-600 sm:text-base">
                {summary.percentage.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="h-10 w-full rounded-lg border border-slate-300 px-4 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          PDF PICKER DIALOG
      ====================================================== */}

      {showPdfDialog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4">

          <button
            type="button"
            aria-label="Close PDF upload dialog"
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setShowPdfDialog(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-pdf-title"
            className="relative z-10 w-full max-w-md rounded-2xl bg-white p-4 shadow-2xl sm:p-5"
          >
            {/* PDF HEADER */}

            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3
                  id="attendance-pdf-title"
                  className="text-base font-semibold text-[#142970]"
                >
                  Upload PDF
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Choose a PDF file from your device.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPdfDialog(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* FILE INPUT */}

            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;

                setPdfError("");
                setSelectedPdf(null);

                if (!file) return;

                const isPdf =
                  file.type === "application/pdf" ||
                  file.name.toLowerCase().endsWith(".pdf");

                if (!isPdf) {
                  setPdfError("Please select a PDF file.");
                  event.target.value = "";
                  return;
                }

                setSelectedPdf(file);
              }}
              className="block w-full min-w-0 rounded-lg border border-slate-200 p-3 text-xs text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-medium file:text-blue-700 hover:file:bg-blue-100"
            />

            {/* SELECTED FILE */}

            {selectedPdf && (
              <p className="mt-2 break-all text-xs text-slate-600">
                Selected: {selectedPdf.name}
              </p>
            )}

            {/* PDF ERROR */}

            {pdfError && (
              <p role="alert" className="mt-2 text-xs leading-relaxed text-red-600">
                {pdfError}
              </p>
            )}

            {uploadedPdfName && !selectedPdf && (
              <p className="mt-2 break-all text-xs text-emerald-700">
                Selected PDF: {uploadedPdfName}
              </p>
            )}

            {/* PDF ACTIONS */}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowPdfDialog(false);
                  setSelectedPdf(null);
                  setPdfError("");
                }}
                className="h-9 w-full rounded-lg border border-slate-300 px-4 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!selectedPdf || uploadingPdf}
                onClick={async () => {
                  if (!selectedPdf) {
                    setPdfError(
                      "Choose a PDF file before clicking Upload.",
                    );
                    return;
                  }

                  try {
                    setUploadingPdf(true);
                    setPdfError("");

                    const result = await importAttendancePdf(
                      semester,
                      selectedPdf,
                    );

                    const importedSubjects =
                      result?.data?.subjects || result?.subjects;

                    if (
                      !Array.isArray(importedSubjects) ||
                      importedSubjects.length === 0
                    ) {
                      throw new Error(
                        "No attendance subjects were found in this PDF.",
                      );
                    }

                    // Reuse the existing save callback.
                    await onSave(
                      importedSubjects.map((subject) => ({
                        subjectName: subject.subjectName,
                        courseCode: subject.courseCode || "",
                        credits: 0,
                        category: "THEORY",
                        classesHeld: Number(subject.classesHeld),
                        classesAttended: Number(
                          subject.classesAttended,
                        ),
                      })),
                    );

                    setUploadedPdfName(selectedPdf.name);
                    setShowPdfDialog(false);
                    setSelectedPdf(null);
                  } catch (err) {
                    setPdfError(
                      err?.response?.data?.message ||
                        err?.message ||
                        "Failed to import attendance PDF.",
                    );
                  } finally {
                    setUploadingPdf(false);
                  }
                }}
                className="h-9 w-full rounded-lg bg-blue-600 px-4 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {uploadingPdf ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceEntryModal;
