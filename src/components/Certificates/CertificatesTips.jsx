import React from "react";
import {
  Lightbulb,
  Upload,
  BadgeCheck,
  FileText,
} from "lucide-react";

const CertificatesTips = () => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-3 flex items-center gap-2 sm:mb-4">

        <Lightbulb
          size={16}
          className="shrink-0 text-amber-500"
        />

        <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
          Tips
        </h2>

      </div>

      {/* ======================================================
          TIPS LIST
      ====================================================== */}

      <div className="space-y-3 text-xs leading-relaxed text-slate-600 sm:space-y-4">

        <div className="flex items-start gap-2.5 sm:gap-3">
          <Upload
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <p className="min-w-0">
            Upload clear and valid certificates for verification.
          </p>
        </div>

        <div className="flex items-start gap-2.5 sm:gap-3">
          <FileText
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <p className="min-w-0">
            Ensure the certificate contains your name and course details.
          </p>
        </div>

        <div className="flex items-start gap-2.5 sm:gap-3">
          <Upload
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <p className="min-w-0">
            Use PDF, JPG, or PNG formats (Max. 5MB).
          </p>
        </div>

        <div className="flex items-start gap-2.5 sm:gap-3">
          <BadgeCheck
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />
          <p className="min-w-0">
            Verified certificates will be marked and highlighted.
          </p>
        </div>

      </div>

    </div>
  );
};

export default CertificatesTips;
