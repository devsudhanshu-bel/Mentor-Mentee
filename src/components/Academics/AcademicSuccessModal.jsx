import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const AcademicSuccessModal = ({
  isOpen,
  semesterNumber,
  onContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Success Icon */}
        <div className="flex justify-center pt-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2
              size={38}
              strokeWidth={2}
              className="text-green-600"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-7 pb-7 pt-5 text-center">
          <h2 className="text-xl font-bold text-[#082B73]">
            Submitted Successfully!
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your academic details for{" "}
            <span className="font-semibold text-slate-700">
              Semester {semesterNumber}
            </span>{" "}
            have been saved successfully.
          </p>

          <div className="mt-5 rounded-xl bg-green-50 px-4 py-3">
            <p className="text-xs font-medium text-green-700">
              Your academic record has been updated.
            </p>
          </div>

          {/* Continue */}
          <button
            type="button"
            onClick={onContinue}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B63F6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
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