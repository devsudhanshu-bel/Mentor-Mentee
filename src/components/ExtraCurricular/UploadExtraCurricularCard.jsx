
import React from "react";

import { UploadCloud } from "lucide-react";

const UploadExtraCurricularCard = ({
  onUploadClick,
}) => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      {/* HEADING */}

      <h2 className="mb-4 break-words text-base font-semibold text-slate-800 sm:text-lg">
        Upload Extra-Curricular Activity
      </h2>

      {/* UPLOAD BOX */}

      <div className="flex min-w-0 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-3 py-6 text-center transition hover:border-blue-400 hover:bg-slate-50 sm:px-6 sm:py-8">

        {/* ICON */}

        <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-12 sm:w-12">
          <UploadCloud
            size={24}
            className="text-blue-600"
            strokeWidth={2}
          />
        </div>

        {/* TEXT */}

        <h3 className="break-words text-sm font-medium text-slate-700">
          Drag & drop your file here
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          or
        </p>

        {/* BROWSE */}

        <button
          type="button"
          onClick={onUploadClick}
          className="mt-3 flex h-9 w-full max-w-[160px] items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-blue-600 transition hover:bg-slate-50"
        >
          Browse Files
        </button>

        {/* FILE INFO */}

        <div className="mt-4 w-full space-y-1 text-center">
          <p className="break-words text-xs leading-5 text-slate-500">
            Supported formats:
            <span className="font-medium text-slate-600">
              {" "}
              PDF, DOC, DOCX, PPT, PPTX, JPG, PNG
            </span>
          </p>

          <p className="text-xs text-slate-500">
            Max file size:
            <span className="font-medium text-slate-600">
              {" "}
              20MB
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UploadExtraCurricularCard;
