
import React from "react";
import { ExternalLink, FileText, ArrowUpRight } from "lucide-react";

const ResumeCard = ({ resumeUrl = "", onUpload }) => {
  const openResume = () => {
    if (!resumeUrl) return;

    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
        <h2 className="font-semibold text-slate-900">
          My Resume
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Keep your professional profile up to date.
        </p>
      </div>

      <div className="min-w-0 p-4 sm:p-5">
        {/* Resume information */}
        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-blue-50 p-3 sm:p-4">
          <div className="shrink-0 rounded-xl bg-white p-2.5 text-blue-600 shadow-sm sm:p-3">
            <FileText size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="break-words font-semibold text-slate-800">
              Resume / CV
            </p>

            <p className="mt-1 text-xs text-slate-500">
              PDF recommended
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Keep your resume ready for internship applications and mentor
          discussions.
        </p>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {resumeUrl && (
            <button
              type="button"
              onClick={openResume}
              className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:flex-1"
            >
              <span>View Resume</span>
              <ExternalLink size={15} className="shrink-0" />
            </button>
          )}

          <button
            type="button"
            onClick={onUpload}
            className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex-1"
          >
            <span>{resumeUrl ? "Replace" : "Manage Resume"}</span>
            <ArrowUpRight size={16} className="shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResumeCard;
