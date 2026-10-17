import React from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";

const UploadCoCurricularCard = ({
  onUploadClick,
  disabled = false,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* HEADING */}

      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Upload Co-Curricular Activity
      </h2>

      {/* UPLOAD BOX */}

      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-slate-50">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <UploadCloud
            size={24}
            className="text-blue-600"
            strokeWidth={2}
          />
        </div>

        <h3 className="text-sm font-medium text-slate-700">
          Upload your certificate or activity document
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Certificates, participation records and activity reports
        </p>

        <button
          type="button"
          onClick={onUploadClick}
          disabled={disabled}
          className="mt-4 flex h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FileCheck2 size={15} />
          Browse Files
        </button>

        <div className="mt-4 space-y-1 text-center">
          <p className="text-xs text-slate-500">
            Supported formats:{" "}
            <span className="font-medium">
              PDF, DOC, DOCX, PPT, PPTX, JPG, PNG
            </span>
          </p>

          <p className="text-xs text-slate-500">
            Maximum file size:{" "}
            <span className="font-medium">20 MB</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCoCurricularCard;