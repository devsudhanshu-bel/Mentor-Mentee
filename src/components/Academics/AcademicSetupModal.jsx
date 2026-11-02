
import React, { useEffect, useState } from "react";
import {
  X,
  GraduationCap,
  CheckCircle2,
  Lock,
  BookOpen,
} from "lucide-react";

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
    } else {
      setSelectedSemester(null);
    }
  }, [currentSemester, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleContinue = () => {
    if (!selectedSemester) return;
    onContinue(selectedSemester);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 px-3 py-4 backdrop-blur-sm sm:px-5 sm:py-6">
      <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 sm:h-12 sm:w-12">
              <GraduationCap
                size={23}
                className="text-[#0B63F6]"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold leading-snug text-[#082B73] sm:text-lg">
                Set Up Your Academic Records
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                Enter your previous semester results to build your academic
                profile.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close academic setup"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={19} />
          </button>
        </div>

        {/* Current Semester Information */}
        <div className="mx-4 mt-4 rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 sm:mx-6 sm:mt-5 sm:rounded-2xl sm:px-5 sm:py-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <BookOpen size={17} className="text-[#0B63F6]" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                Current Semester
              </p>

              <p className="mt-1 text-sm font-bold text-[#082B73] sm:text-base">
                Semester {ROMAN[currentSemester - 1] || currentSemester}
              </p>

              <p className="mt-1 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                Only semesters completed before your current semester can be
                entered.
              </p>
            </div>
          </div>
        </div>

        {/* Semester Selection */}
        <div className="px-4 py-5 sm:px-6 sm:py-6">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-slate-800 sm:text-base">
              Select a semester to enter
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
              Choose one of your previously completed semesters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {previousSemesters.map((semesterNumber) => {
              const selected = selectedSemester === semesterNumber;

              return (
                <button
                  type="button"
                  key={semesterNumber}
                  onClick={() => setSelectedSemester(semesterNumber)}
                  aria-pressed={selected}
                  className={`group rounded-xl border p-3 text-left transition-all duration-200 sm:rounded-2xl sm:p-4 ${
                    selected
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500 shadow-sm"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold sm:text-sm ${
                        selected ? "text-[#0B63F6]" : "text-slate-700"
                      }`}
                    >
                      Semester {ROMAN[semesterNumber - 1]}
                    </span>

                    {selected && (
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-[#0B63F6]"
                      />
                    )}
                  </div>

                  <p className="mt-2 text-[10px] text-slate-500 sm:text-xs">
                    Previous semester
                  </p>
                </button>
              );
            })}

            {/* Current Semester - Locked */}
            {currentSemester <= 8 && (
              <div className="cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 p-3 opacity-75 sm:rounded-2xl sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500 sm:text-sm">
                    Semester {ROMAN[currentSemester - 1]}
                  </span>

                  <Lock
                    size={16}
                    className="shrink-0 text-slate-400"
                  />
                </div>

                <p className="mt-2 text-[10px] text-slate-400 sm:text-xs">
                  Current semester
                </p>
              </div>
            )}
          </div>

          {previousSemesters.length === 0 && (
            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xs leading-relaxed text-amber-700">
                You are currently in your first semester. There are no previous
                semester records to enter yet.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-[10px] leading-relaxed text-slate-400 sm:max-w-[55%] sm:text-left sm:text-xs">
            You can add your previous semester records one by one.
          </p>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedSemester}
            className="w-full rounded-xl bg-[#0B63F6] px-6 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2.5"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicSetupModal;
