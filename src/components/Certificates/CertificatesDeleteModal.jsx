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
    if (isDeleting) return;

    onCancel?.();
  };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirm = () => {
    if (isDeleting) return;

    onConfirm?.();
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        overflow-y-auto
        bg-black/40 backdrop-blur-sm
        p-3 sm:p-4
      "
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

      <div
        className="
          my-auto w-full max-w-md
          overflow-hidden rounded-xl
          bg-white shadow-2xl
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5 sm:py-4">

          <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
            Delete Certificate
          </h2>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isDeleting}
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-md text-slate-500
              transition hover:bg-slate-100
              disabled:cursor-not-allowed disabled:opacity-50
            "
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="px-4 py-5 sm:px-5 sm:py-6">

          <div className="flex items-start gap-3 sm:gap-4">

            {/* DELETE ICON */}

            <div className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-red-50
              sm:h-11 sm:w-11
            ">
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
                You are about to delete{" "}
                <span className="font-medium text-slate-700">
                  "{documentName}"
                </span>
                .
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                This certificate document will be permanently
                removed from your certificates.
              </p>

              <p className="mt-1 text-xs font-medium text-red-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="
          flex flex-col-reverse gap-2
          border-t border-slate-200 bg-slate-50
          px-4 py-3
          sm:flex-row sm:justify-end sm:px-5 sm:py-4
        ">

          {/* CANCEL */}

          <button
            type="button"
            onClick={handleCancel}
            disabled={isDeleting}
            className="
              flex h-10 w-full items-center justify-center
              rounded-md border border-slate-300 bg-white
              px-4 text-xs font-medium text-slate-700
              transition hover:bg-slate-100
              disabled:cursor-not-allowed disabled:opacity-50
              sm:w-auto
            "
          >
            Cancel
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="
              flex h-10 w-full items-center justify-center gap-2
              rounded-md bg-red-600 px-4
              text-xs font-medium text-white
              transition hover:bg-red-700
              disabled:cursor-not-allowed disabled:opacity-60
              sm:w-auto
            "
          >
            {isDeleting ? (
              <>
                <Loader2
                  size={14}
                  className="shrink-0 animate-spin"
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

export default CertificatesDeleteModal;
