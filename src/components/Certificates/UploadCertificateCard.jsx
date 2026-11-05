import React from "react";
import { UploadCloud } from "lucide-react";

const UploadCertificateCard = ({
  onUploadClick,
}) => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      {/* ==================================================
          HEADING
      ================================================== */}

      <h2 className="mb-3 text-base font-semibold text-slate-800 sm:mb-4 sm:text-lg">
        Upload New Certificate
      </h2>

      {/* ==================================================
          UPLOAD BOX
      ================================================== */}

      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-3 py-6 text-center transition hover:border-blue-400 hover:bg-slate-50 sm:px-5 sm:py-8">

        {/* ICON */}

        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 sm:h-12 sm:w-12">

          <UploadCloud
            size={22}
            className="text-blue-600 sm:hidden"
            strokeWidth={2}
          />

          <UploadCloud
            size={24}
            className="hidden text-blue-600 sm:block"
            strokeWidth={2}
          />

        </div>

        {/* TEXT */}

        <h3 className="text-sm font-medium text-slate-700">
          Upload your certificate
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          or
        </p>

        {/* BROWSE */}

        <button
          type="button"
          onClick={onUploadClick}
          className="mt-3 flex h-10 w-full max-w-[180px] items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-xs font-medium text-blue-600 transition hover:bg-slate-50 active:bg-slate-100 sm:h-9"
        >
          Browse Files
        </button>

        {/* FILE INFO */}

        <div className="mt-4 w-full space-y-1 text-center">

          <p className="text-[11px] leading-5 text-slate-500 sm:text-xs">
            Supported formats:
            <span className="font-medium">
              {" "}PDF, JPG, PNG
            </span>
          </p>

          <p className="text-[11px] leading-5 text-slate-500 sm:text-xs">
            Max file size:
            <span className="font-medium">
              {" "}5MB
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default UploadCertificateCard;
