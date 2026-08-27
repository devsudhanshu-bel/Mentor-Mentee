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
    <div className="fixed inset-0 z-[220] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200">

          <h2 className="text-base font-semibold text-slate-800">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition"
          >
            <X size={19} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="px-5 py-7 text-center">

          <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">

            <AlertCircle
              size={30}
              className="text-red-600"
            />

          </div>

          <p className="text-sm text-slate-600 leading-5">
            {message}
          </p>

        </div>

        {/* FOOTER */}

        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">

          <button
            type="button"
            onClick={onClose}
            className="h-9 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default DocumentErrorModal;