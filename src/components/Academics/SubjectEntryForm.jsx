
import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

const EMPTY_SUBJECT = {
  courseCode: "",
  courseName: "",
  credits: "",
  subjectType: "",
  cia1: "",
  mse: "",
  cia3: "",
  ese: "",
  maxMarks: "",
  totalMarks: "",
  grade: "",
  gradePoint: "",
  attendance: "",
};

const SubjectEntryForm = ({
  semesterNumber,
  subjectCount,
  onBack,
  onComplete,
}) => {
  const [currentSubject, setCurrentSubject] = useState(0);

  const [subjects, setSubjects] = useState(
    Array.from({ length: subjectCount }, () => ({
      ...EMPTY_SUBJECT,
    })),
  );

  const subject = subjects[currentSubject];

  const updateField = (field, value) => {
    setSubjects((previous) =>
      previous.map((item, index) =>
        index === currentSubject
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const isLastSubject = currentSubject === subjectCount - 1;

  const progress = subjectCount > 0
    ? Math.round(((currentSubject + 1) / subjectCount) * 100)
    : 0;

  // =========================================================
  // Validate current subject
  // =========================================================
  const validateSubject = () => {
    if (!subject.courseCode.trim()) {
      alert("Please enter the course code.");
      return false;
    }

    if (!subject.courseName.trim()) {
      alert("Please enter the course name.");
      return false;
    }

    if (!subject.credits) {
      alert("Please enter the credits.");
      return false;
    }

    if (!subject.subjectType) {
      alert("Please select the subject type.");
      return false;
    }

    if (!subject.totalMarks) {
      alert("Please enter the total marks obtained.");
      return false;
    }

    if (!subject.maxMarks) {
      alert("Please enter the maximum marks.");
      return false;
    }

    if (!subject.grade) {
      alert("Please select the grade.");
      return false;
    }

    if (
      subject.gradePoint === "" ||
      subject.gradePoint === null ||
      subject.gradePoint === undefined
    ) {
      alert("Please enter the grade point.");
      return false;
    }

    if (Number(subject.gradePoint) < 0 || Number(subject.gradePoint) > 4) {
      alert("Grade point must be between 0 and 4.");
      return false;
    }

    return true;
  };

  // =========================================================
  // Next / Finish
  // =========================================================
  const handleNext = () => {
    const isValid = validateSubject();

    if (!isValid) {
      return;
    }

    if (isLastSubject) {
      onComplete(subjects);
      return;
    }

    setCurrentSubject((previous) => previous + 1);
  };

  // =========================================================
  // Back
  // =========================================================
  const handleBack = () => {
    if (currentSubject === 0) {
      onBack();
      return;
    }

    setCurrentSubject((previous) => previous - 1);
  };

  // =========================================================
  // Styles
  // =========================================================
  const inputClass =
    "w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-slate-600";

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-xl">

      {/* =====================================================
          Header
         ===================================================== */}
      <div className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <BookOpen size={21} className="text-[#0B63F6]" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold leading-snug text-[#082B73] sm:text-lg">
              Semester {semesterNumber} Academic Details
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
              Enter the marks and academic details for each subject.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          Progress
         ===================================================== */}
      <div className="px-4 pt-5 sm:px-6 sm:pt-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-600 sm:text-sm">
            Subject {currentSubject + 1} of {subjectCount}
          </span>

          <span className="shrink-0 text-xs font-medium text-slate-400">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#0B63F6] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* =====================================================
          Form
         ===================================================== */}
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 px-4 py-5 sm:grid-cols-2 sm:gap-y-5 sm:px-6 sm:py-6">

        {/* Course Code */}
        <div className="min-w-0">
          <label className={labelClass}>Course Code *</label>

          <input
            type="text"
            value={subject.courseCode}
            onChange={(e) =>
              updateField("courseCode", e.target.value.toUpperCase())
            }
            placeholder="e.g. CSEAM731"
            className={inputClass}
          />
        </div>

        {/* Course Name */}
        <div className="min-w-0">
          <label className={labelClass}>Course Name *</label>

          <input
            type="text"
            value={subject.courseName}
            onChange={(e) => updateField("courseName", e.target.value)}
            placeholder="e.g. Machine Learning"
            className={inputClass}
          />
        </div>

        {/* Credits */}
        <div className="min-w-0">
          <label className={labelClass}>Credits *</label>

          <input
            type="number"
            min="0"
            step="0.5"
            value={subject.credits}
            onChange={(e) => updateField("credits", e.target.value)}
            placeholder="4"
            className={inputClass}
          />
        </div>

        {/* Subject Type */}
        <div className="min-w-0">
          <label className={labelClass}>Subject Type *</label>

          <select
            value={subject.subjectType}
            onChange={(e) => updateField("subjectType", e.target.value)}
            className={inputClass}
          >
            <option value="">Select subject type</option>
            <option value="CORE">Core Subject</option>
            <option value="ELECTIVE">Elective Subject</option>
            <option value="OPEN_ELECTIVE">Open Elective</option>
            <option value="ABILITY_ENHANCEMENT">
              Ability Enhancement Course
            </option>
          </select>
        </div>

        {/* CIA 1 */}
        <div className="min-w-0">
          <label className={labelClass}>CIA 1</label>

          <input
            type="number"
            min="0"
            value={subject.cia1}
            onChange={(e) => updateField("cia1", e.target.value)}
            placeholder="Max 20"
            className={inputClass}
          />
        </div>

        {/* MSE */}
        <div className="min-w-0">
          <label className={labelClass}>MSE</label>

          <input
            type="number"
            min="0"
            value={subject.mse}
            onChange={(e) => updateField("mse", e.target.value)}
            placeholder="Max 50"
            className={inputClass}
          />
        </div>

        {/* CIA 3 */}
        <div className="min-w-0">
          <label className={labelClass}>CIA 3</label>

          <input
            type="number"
            min="0"
            value={subject.cia3}
            onChange={(e) => updateField("cia3", e.target.value)}
            placeholder="Max 20"
            className={inputClass}
          />
        </div>

        {/* ESE */}
        <div className="min-w-0">
          <label className={labelClass}>ESE</label>

          <input
            type="number"
            min="0"
            value={subject.ese}
            onChange={(e) => updateField("ese", e.target.value)}
            placeholder="Out of 50 or 100"
            className={inputClass}
          />
        </div>

        {/* Maximum Marks */}
        <div className="min-w-0">
          <label className={labelClass}>Maximum Marks *</label>

          <input
            type="number"
            min="0"
            value={subject.maxMarks}
            onChange={(e) => updateField("maxMarks", e.target.value)}
            placeholder="Max 50 or 100"
            className={inputClass}
          />
        </div>

        {/* Total Marks */}
        <div className="min-w-0">
          <label className={labelClass}>Total Marks Obtained *</label>

          <input
            type="number"
            min="0"
            value={subject.totalMarks}
            onChange={(e) => updateField("totalMarks", e.target.value)}
            placeholder="Marks Obtained"
            className={inputClass}
          />
        </div>

        {/* Grade */}
        <div className="min-w-0">
          <label className={labelClass}>Grade *</label>

          <select
            value={subject.grade}
            onChange={(e) => updateField("grade", e.target.value)}
            className={inputClass}
          >
            <option value="">Select grade</option>
            <option value="O">O</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="P">P</option>
            <option value="F">F</option>
          </select>
        </div>

        {/* Grade Point */}
        <div className="min-w-0">
          <label className={labelClass}>Grade Point *</label>

          <input
            type="number"
            min="0"
            max="4"
            step="0.1"
            value={subject.gradePoint}
            onChange={(e) => updateField("gradePoint", e.target.value)}
            placeholder="Max 4"
            className={inputClass}
          />
        </div>

        {/* Attendance */}
        <div className="min-w-0 sm:col-span-2">
          <label className={labelClass}>Attendance (%)</label>

          <input
            type="number"
            min="0"
            max="100"
            value={subject.attendance}
            onChange={(e) => updateField("attendance", e.target.value)}
            placeholder="Out of 100%"
            className={inputClass}
          />
        </div>
      </div>

      {/* =====================================================
          Footer
         ===================================================== */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <button
          type="button"
          onClick={handleBack}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto sm:py-2.5"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B63F6] px-5 py-3 text-xs font-semibold text-white transition hover:bg-blue-700 sm:w-auto sm:py-2.5"
        >
          {isLastSubject ? (
            <>
              <CheckCircle2 size={15} />
              Finish Subjects
            </>
          ) : (
            <>
              Next Subject
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SubjectEntryForm;
