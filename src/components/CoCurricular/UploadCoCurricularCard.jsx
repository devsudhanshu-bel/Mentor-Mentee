
import React from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";

const UploadCoCurricularCard = ({
  onUploadClick,
  disabled = false,
}) => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      {/* HEADING */}

      <h2 className="mb-4 break-words text-base font-semibold text-slate-800 sm:text-lg">
        Upload Co-Curricular Activity
      </h2>

      {/* UPLOAD BOX */}

      <div className="flex min-w-0 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-3 py-6 text-center transition hover:border-blue-400 hover:bg-slate-50 sm:px-6 sm:py-8">
        <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-12 sm:w-12">
          <UploadCloud
            size={24}
            className="text-blue-600"
            strokeWidth={2}
          />
        </div>

        <h3 className="max-w-full break-words text-sm font-medium text-slate-700">
          Upload your certificate or activity document
        </h3>

        <p className="mt-1 max-w-full break-words text-xs leading-relaxed text-slate-400 sm:text-sm">
          Certificates, participation records and activity reports
        </p>

        <button
          type="button"
          onClick={onUploadClick}
          disabled={disabled}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-sm"
        >
          <FileCheck2 size={15} className="shrink-0" />
          Browse Files
        </button>

        {/* FILE REQUIREMENTS */}

        <div className="mt-4 w-full space-y-1 text-center">
          <p className="break-words text-xs leading-relaxed text-slate-500">
            Supported formats:{" "}
            <span className="font-medium text-slate-600">
              PDF, DOC, DOCX, PPT, PPTX, JPG, PNG
            </span>
          </p>

          <p className="text-xs text-slate-500">
            Maximum file size:{" "}
            <span className="font-medium text-slate-600">
              20 MB
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCoCurricularCard;
