
import React from "react";

import {
  X,
  Trash2,
  Loader2,
} from "lucide-react";

const ExtraCurricularDeleteModal = ({
  isOpen,
  document,
  onCancel,
  onConfirm,
  isDeleting = false,
}) => {
  // ==========================================================
  // SAFETY
  // ==========================================================

  if (!isOpen || !document) {
    return null;
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-sm sm:p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isDeleting
        ) {
          onCancel?.();
        }
      }}
    >
      <div className="my-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
          <h2 className="min-w-0 break-words text-sm font-semibold leading-5 text-slate-800 sm:text-base">
            Delete Extra-Curricular Activity
          </h2>

          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            aria-label="Close delete confirmation"
            className="shrink-0 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="px-4 py-5 sm:px-5 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-4">

            {/* DELETE ICON */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 sm:h-11 sm:w-11">
              <Trash2
                size={21}
                className="text-red-600"
              />
            </div>

            {/* MESSAGE */}

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-slate-800">
                Are you sure?
              </h3>

              <p className="mt-1 break-words text-sm leading-5 text-slate-500">
                You are about to delete
                <span className="break-words font-medium text-slate-700">
                  {" "}
                  &quot;{document.documentName}&quot;
                </span>
                .
              </p>

              <p className="mt-2 break-words text-xs leading-5 text-slate-400">
                This extra-curricular document will be permanently removed.
              </p>

              <p className="mt-1 text-xs font-medium text-red-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:justify-end sm:px-5">

          {/* CANCEL */}

          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-red-600 px-4 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isDeleting ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={14} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraCurricularDeleteModal;
