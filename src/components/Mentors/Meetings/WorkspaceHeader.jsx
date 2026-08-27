import React from "react";
import { X, Clock3 } from "lucide-react";

const WorkspaceHeader = ({
  meeting,
  duration,
  onClose,
  onSaveMeeting,
  onEndMeeting,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

      {/* Left */}

      <div>

        <div className="flex items-center gap-2">

          <h2 className="text-[18px] font-bold text-slate-800">
            {meeting?.title || "Mentorship Meeting"}
          </h2>

          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            LIVE
          </span>

        </div>

        <div className="mt-2 flex items-center gap-6 text-[13px] text-slate-500">

          <span>
            Started • 11:00 AM
          </span>

          <span className="flex items-center gap-2">

            <Clock3 size={14} />

            <strong className="text-slate-700">
              {duration}
            </strong>

          </span>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

        <button
          onClick={onSaveMeeting}
          className="rounded-lg bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-blue-700"
        >
          Save Meeting
        </button>

        <button
          onClick={onEndMeeting}
          className="rounded-lg border border-red-300 px-5 py-2 text-[13px] font-semibold text-red-600 transition hover:bg-red-50"
        >
          End Meeting
        </button>

        <button
          onClick={onClose}
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          <X size={18} />
        </button>

      </div>

    </div>
  );
};

export default WorkspaceHeader;