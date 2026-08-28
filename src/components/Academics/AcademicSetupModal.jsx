import React, { useEffect, useState } from "react";
import { X, GraduationCap, CheckCircle2, Lock } from "lucide-react";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const AcademicSetupModal = ({
  isOpen,
  currentSemester,
  onClose,
  onContinue,
}) => {
  const [selectedSemester, setSelectedSemester] = useState(null);

  const previousSemesters = Array.from(
    { length: Math.max(currentSemester - 1, 0) },
    (_, index) => index + 1,
  );

  useEffect(() => {
    if (previousSemesters.length > 0) {
      setSelectedSemester(previousSemesters[0]);
    }
  }, [currentSemester, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleContinue = () => {
    if (!selectedSemester) {
      return;
    }

    onContinue(selectedSemester);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <GraduationCap size={23} className="text-[#0B63F6]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#082B73]">
                Set Up Your Academic Records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Enter your previous semester results to build your academic
                profile.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        {/* Current semester information */}
        <div className="mx-6 mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-[11px] font-medium text-blue-600">
            Current Semester
          </p>

          <p className="mt-1 text-sm font-semibold text-[#082B73]">
            Semester {ROMAN[currentSemester - 1]}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            Only semesters completed before your current semester can be
            entered.
          </p>
        </div>

        {/* Semester selection */}
        <div className="px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-700">
            Select a semester to enter
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {previousSemesters.map((semesterNumber) => {
              const selected = selectedSemester === semesterNumber;

              return (
                <button
                  key={semesterNumber}
                  onClick={() => setSelectedSemester(semesterNumber)}
                  className={`rounded-xl border px-4 py-4 text-left transition ${
                    selected
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        selected ? "text-[#0B63F6]" : "text-slate-700"
                      }`}
                    >
                      Semester {ROMAN[semesterNumber - 1]}
                    </span>

                    {selected && (
                      <CheckCircle2 size={17} className="text-[#0B63F6]" />
                    )}
                  </div>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Previous semester
                  </p>
                </button>
              );
            })}

            {/* Current semester */}
            {currentSemester <= 8 && (
              <div className="cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 opacity-70">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">
                    Semester {ROMAN[currentSemester - 1]}
                  </span>

                  <Lock size={16} className="text-slate-400" />
                </div>

                <p className="mt-1 text-[10px] text-slate-400">
                  Current semester
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-[10px] text-slate-400">
            You can add your previous semester records one by one.
          </p>

          <button
            onClick={handleContinue}
            disabled={!selectedSemester}
            className="rounded-xl bg-[#0B63F6] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicSetupModal;
