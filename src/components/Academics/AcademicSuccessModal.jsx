
import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const AcademicSuccessModal = ({
  isOpen,
  semesterNumber,
  onContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-black/40 px-3 py-5 backdrop-blur-sm sm:px-5">
      <div className="my-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">

        {/* Success Icon */}
        <div className="flex justify-center px-5 pt-7 sm:pt-9">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50 sm:h-[72px] sm:w-[72px]">
            <CheckCircle2
              size={38}
              strokeWidth={2}
              className="text-green-600"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-6 pt-5 text-center sm:px-8 sm:pb-8">
          <h2 className="text-lg font-bold text-[#082B73] sm:text-xl">
            Submitted Successfully!
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
            Your academic details for{" "}
            <span className="font-semibold text-slate-700">
              Semester {semesterNumber}
            </span>{" "}
            have been saved successfully.
          </p>

          {/* Confirmation Message */}
          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-3 sm:px-4">
            <CheckCircle2
              size={16}
              className="shrink-0 text-green-600"
            />

            <p className="text-[11px] font-medium leading-relaxed text-green-700 sm:text-xs">
              Your academic record has been updated.
            </p>
          </div>

          {/* Continue */}
          <button
            type="button"
            onClick={onContinue}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B63F6] px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] sm:py-3.5 sm:text-sm"
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicSuccessModal;
