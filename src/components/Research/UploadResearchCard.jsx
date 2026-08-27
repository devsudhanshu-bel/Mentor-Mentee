import React from "react";
import { UploadCloud } from "lucide-react";

const UploadResearchCard = ({
  onUploadClick,
}) => {

  // ==========================================================
  // DRAG OVER
  // ==========================================================

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // ==========================================================
  // DROP
  // ==========================================================

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    /*
     * The upload modal owns the actual upload form.
     *
     * We intentionally open the same modal here instead
     * of creating another modal instance inside this card.
     */
    if (onUploadClick) {
      onUploadClick();
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* ====================================================
          HEADING
      ==================================================== */}

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Upload Research Work
      </h2>

      {/* ====================================================
          UPLOAD BOX
      ==================================================== */}

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-slate-200 rounded-lg px-6 py-8 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-slate-50 transition"
      >

        {/* ==================================================
            ICON
        ================================================== */}

        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">

          <UploadCloud
            size={24}
            className="text-blue-600"
            strokeWidth={2}
          />

        </div>

        {/* ==================================================
            TEXT
        ================================================== */}

        <h3 className="text-sm font-medium text-slate-700">
          Drag & drop your file here
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          or
        </p>

        {/* ==================================================
            BROWSE BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={onUploadClick}
          className="mt-3 h-9 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-blue-600 text-xs font-medium transition"
        >
          Browse Files
        </button>

        {/* ==================================================
            FILE INFO
        ================================================== */}

        <div className="mt-4 text-center space-y-1">

          <p className="text-xs text-slate-500">
            Supported formats:
            <span className="font-medium">
              {" "}
              PDF, DOC, DOCX, PPT, PPTX
            </span>
          </p>

          <p className="text-xs text-slate-500">
            Max file size:
            <span className="font-medium">
              {" "}
              20MB
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default UploadResearchCard;