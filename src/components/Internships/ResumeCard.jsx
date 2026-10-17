
import React from "react";
import { ExternalLink, FileText, ArrowUpRight } from "lucide-react";

const ResumeCard = ({ resumeUrl = "", onUpload }) => {
  const openResume = () => {
    if (!resumeUrl) return;

    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-semibold text-slate-900">My Resume</h2>
        <p className="mt-1 text-xs text-slate-500">
          Keep your professional profile up to date.
        </p>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
          <div className="rounded-xl bg-white p-3 text-blue-600 shadow-sm">
            <FileText size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-800">
              Resume / CV
            </p>
            <p className="mt-1 text-xs text-slate-500">
              PDF recommended
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Keep your resume ready for internship applications and mentor
          discussions.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {resumeUrl && (
            <button
              type="button"
              onClick={openResume}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View Resume
              <ExternalLink size={15} />
            </button>
          )}

          <button
            type="button"
            onClick={onUpload}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {resumeUrl ? "Replace" : "Manage Resume"}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResumeCard;
