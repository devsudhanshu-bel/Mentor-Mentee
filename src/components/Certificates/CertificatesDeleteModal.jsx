import React from "react";

import {
  X,
  Trash2,
  Loader2,
} from "lucide-react";

const CertificatesDeleteModal = ({
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
  // DOCUMENT NAME
  // ==========================================================

  const documentName =
    document?.documentName ||
    document?.title ||
    "this certificate";

  // ==========================================================
  // CLOSE / CANCEL
  // ==========================================================

  const handleCancel = () => {
    if (isDeleting) {
      return;
    }

    onCancel?.();
  };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirm = () => {
    if (isDeleting) {
      return;
    }

    onConfirm?.();
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isDeleting
        ) {
          handleCancel();
        }
      }}
    >
      {/* ======================================================
          MODAL
      ====================================================== */}

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

          <h2 className="text-base font-semibold text-slate-800">
            Delete Certificate
          </h2>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isDeleting}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="px-5 py-6">

          <div className="flex items-start gap-4">

            {/* DELETE ICON */}

            <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center shrink-0">

              <Trash2
                size={21}
                className="text-red-600"
              />

            </div>

            {/* MESSAGE */}

            <div className="min-w-0">

              <h3 className="text-sm font-semibold text-slate-800">
                Are you sure?
              </h3>

              <p className="text-sm text-slate-500 mt-1 leading-5">

                You are about to delete

                <span className="font-medium text-slate-700 break-words">
                  {" "}
                  "{documentName}"
                </span>

                .

              </p>

              <p className="text-xs text-slate-400 mt-2">
                This certificate document will be permanently
                removed from your certificates.
              </p>

              <p className="text-xs text-red-500 mt-1 font-medium">
                This action cannot be undone.
              </p>

            </div>

          </div>

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">

          {/* CANCEL */}

          <button
            type="button"
            onClick={handleCancel}
            disabled={isDeleting}
            className="h-9 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="h-9 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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

// ==========================================================
// DEFAULT EXPORT
// ==========================================================

export default CertificatesDeleteModal;