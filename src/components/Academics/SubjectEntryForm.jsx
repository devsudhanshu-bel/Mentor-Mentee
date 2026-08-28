import React, { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

const EMPTY_SUBJECT = {
  courseCode: "",
  courseName: "",
  credits: "",
  cia1: "",
  cia2: "",
  cia3: "",
  mse: "",
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

  const handleNext = () => {
    if (!subject.courseCode.trim()) {
      alert("Please enter the course code.");
      return;
    }

    if (!subject.courseName.trim()) {
      alert("Please enter the course name.");
      return;
    }

    if (!subject.credits) {
      alert("Please enter the credits.");
      return;
    }

    if (!subject.totalMarks) {
      alert("Please enter the total marks obtained.");
      return;
    }

    if (!subject.maxMarks) {
      alert("Please enter the maximum marks.");
      return;
    }

    if (!subject.grade) {
      alert("Please select the grade.");
      return;
    }

    if (!subject.gradePoint) {
      alert("Please enter the grade point.");
      return;
    }

    if (isLastSubject) {
      onComplete(subjects);
      return;
    }

    setCurrentSubject((previous) => previous + 1);
  };

  const handleBack = () => {
    if (currentSubject === 0) {
      onBack();
      return;
    }

    setCurrentSubject((previous) => previous - 1);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-1.5 block text-xs font-medium text-slate-600";

  return (
    <div className="rounded-2xl bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <BookOpen size={21} className="text-[#0B63F6]" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#082B73]">
              Semester {semesterNumber} Academic Details
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Enter the marks and academic details for each subject.
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 pt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">
            Subject {currentSubject + 1} of {subjectCount}
          </span>

          <span className="text-xs text-slate-400">
            {Math.round(((currentSubject + 1) / subjectCount) * 100)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#0B63F6] transition-all duration-300"
            style={{
              width: `${((currentSubject + 1) / subjectCount) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2">
        {/* Course Code */}
        <div>
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
        <div>
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
        <div>
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

        {/* CIA 1 */}
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label className={labelClass}>Grade Point *</label>

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={subject.gradePoint}
            onChange={(e) => updateField("gradePoint", e.target.value)}
            placeholder="Max 4"
            className={inputClass}
          />
        </div>

        {/* Attendance */}
        <div>
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 rounded-lg bg-[#0B63F6] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
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
