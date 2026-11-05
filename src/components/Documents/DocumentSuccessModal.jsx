
import React from "react";
import {
  CheckCircle2,
  X,
} from "lucide-react";

const DocumentSuccessModal = ({
  isOpen,
  title = "Success",
  message = "Document uploaded successfully.",
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[210] bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">

      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 border-b border-slate-200">

          <h2 className="text-base font-semibold text-slate-800 break-words min-w-0">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition"
          >
            <X size={19} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="px-4 sm:px-5 py-6 sm:py-7 text-center">

          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4">

            <CheckCircle2
              size={28}
              className="sm:w-[30px] sm:h-[30px] text-green-600"
            />

          </div>

          <h3 className="text-sm sm:text-base font-semibold text-slate-800 break-words">
            {message}
          </h3>

        </div>

        {/* FOOTER */}

        <div className="px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-t border-slate-200 flex justify-end">

          <button
            type="button"
            onClick={onClose}
            className="h-10 sm:h-9 w-full sm:w-auto px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
          >
            Done
          </button>

        </div>

      </div>

    </div>
  );
};

export default DocumentSuccessModal;
