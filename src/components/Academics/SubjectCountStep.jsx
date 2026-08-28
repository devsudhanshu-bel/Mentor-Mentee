import React, { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";

const SubjectCountStep = ({ semesterNumber, onContinue, onBack }) => {
  const [count, setCount] = useState("");

  const handleContinue = () => {
    const value = Number(count);

    if (!value || value < 1 || value > 20) {
      alert("Please enter a valid subject count between 1 and 20.");
      return;
    }

    onContinue(value);
  };

  return (
    <div className="rounded-2xl bg-white p-7 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <BookOpen size={22} className="text-[#0B63F6]" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#082B73]">
            Semester {semesterNumber}
          </h2>

          <p className="text-xs text-slate-500">
            How many subjects did you take?
          </p>
        </div>
      </div>

      <div className="mt-7">
        <label className="mb-2 block text-xs font-medium text-slate-600">
          Number of Subjects
        </label>

        <input
          type="number"
          min="1"
          max="20"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="e.g. 8"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600"
        >
          Back
        </button>

        <button
          onClick={handleContinue}
          className="flex items-center gap-2 rounded-lg bg-[#0B63F6] px-5 py-2.5 text-xs font-semibold text-white"
        >
          Continue
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default SubjectCountStep;
