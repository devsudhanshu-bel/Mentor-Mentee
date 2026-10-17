import React, { useEffect, useState } from "react";
import { X, ShieldCheck, RotateCcw, FileText } from "lucide-react";

const ResearchVerificationModal = ({
  research,
  onClose,
  onSubmit,
}) => {
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setRemark(research?.mentorRemark || "");
    setError("");
  }, [research]);

  if (!research) return null;

  const handleSubmit = (status) => {
    if (
      status === "CORRECTIONS_REQUESTED" &&
      !remark.trim()
    ) {
      setError("Please provide a remark explaining the required corrections.");
      return;
    }

    onSubmit({
      id: research.id,
      status,
      remark: remark.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Review Research
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Verify the submitted document or request corrections.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close review"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <FileText size={22} className="mt-0.5 shrink-0 text-blue-600" />

            <div className="min-w-0">
              <h3 className="font-medium text-slate-900">
                {research.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {research.fileName}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Current status: {research.status.replaceAll("_", " ")}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="research-mentor-remark"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Mentor remarks
            </label>

            <textarea
              id="research-mentor-remark"
              value={remark}
              onChange={(event) => {
                setRemark(event.target.value);
                setError("");
              }}
              rows={4}
              placeholder="Add feedback or explain the corrections required..."
              className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <p className="text-xs leading-5 text-slate-500">
            Verify only after reviewing the submitted work. Request corrections
            when the mentee needs to update the document.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("CORRECTIONS_REQUESTED")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-200 px-4 py-2.5 text-sm font-medium text-orange-700 hover:bg-orange-50"
          >
            <RotateCcw size={16} />
            Request Corrections
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("VERIFIED")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
          >
            <ShieldCheck size={16} />
            Verify Research
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchVerificationModal;