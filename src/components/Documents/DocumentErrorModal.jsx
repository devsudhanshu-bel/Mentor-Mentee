import React from "react";
import {
  X,
  AlertCircle,
} from "lucide-react";

const DocumentErrorModal = ({
  isOpen,
  title = "Something went wrong",
  message = "Unable to complete the operation.",
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">

      <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3.5 sm:px-5 sm:py-4">

          <h2 className="min-w-0 break-words text-sm font-semibold text-slate-800 sm:text-base">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close error dialog"
            className="shrink-0 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={19} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="px-4 py-6 text-center sm:px-5 sm:py-7">

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 sm:mb-4 sm:h-14 sm:w-14">

            <AlertCircle
              size={26}
              className="text-red-600 sm:hidden"
            />

            <AlertCircle
              size={30}
              className="hidden text-red-600 sm:block"
            />

          </div>

          <p className="break-words text-xs leading-5 text-slate-600 sm:text-sm">
            {message}
          </p>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-4 py-3.5 sm:px-5 sm:py-4">

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full rounded-md bg-blue-600 px-5 text-xs font-medium text-white transition hover:bg-blue-700 sm:h-9 sm:w-auto"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default DocumentErrorModal;
