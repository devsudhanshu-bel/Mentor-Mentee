import React from "react";
import {
  Lightbulb,
  Upload,
  BadgeCheck,
  FileText,
} from "lucide-react";

const CertificatesTips = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      <div className="flex items-center gap-2 mb-4">

        <Lightbulb
          size={16}
          className="text-amber-500"
        />

        <h2 className="text-base font-semibold">
          Tips
        </h2>

      </div>

      <div className="space-y-4 text-xs text-slate-600">

        <div className="flex gap-3">
          <Upload size={15} className="text-slate-500 mt-0.5" />
          <p>Upload clear and valid certificates for verification.</p>
        </div>

        <div className="flex gap-3">
          <FileText size={15} className="text-slate-500 mt-0.5" />
          <p>Ensure the certificate contains your name and course details.</p>
        </div>

        <div className="flex gap-3">
          <Upload size={15} className="text-slate-500 mt-0.5" />
          <p>Use PDF, JPG, or PNG formats (Max. 5MB).</p>
        </div>

        <div className="flex gap-3">
          <BadgeCheck size={15} className="text-slate-500 mt-0.5" />
          <p>Verified certificates will be marked and highlighted.</p>
        </div>

      </div>

    </div>
  );
};

export default CertificatesTips;