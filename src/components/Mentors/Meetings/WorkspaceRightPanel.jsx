import React from "react";
import {
  User,
  CalendarDays,
  Clock3,
  Video,
  MapPin,
} from "lucide-react";

const WorkspaceRightPanel = ({
  meeting,
  duration,
  notes,
  discussionPoints,
  actionItems,
  resources,
  saveNotes,
  onClose,
}) => {
  const completedTasks = actionItems.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="overflow-y-auto border-l border-slate-200 bg-slate-50 p-4">

      {/* ================= Student ================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

            <User
              size={20}
              className="text-blue-600"
            />

          </div>

          <div>

            <h3 className="text-[15px] font-semibold text-slate-800">
              {meeting?.studentName || "Student Name"}
            </h3>

            <p className="text-[12px] text-slate-500">
              {meeting?.registrationNumber || "22BCS001"}
            </p>

          </div>

        </div>

      </div>

      {/* ================= Meeting Info ================= */}

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <h3 className="mb-4 text-[15px] font-semibold text-slate-700">
          Meeting Information
        </h3>

        <div className="space-y-4">

          <InfoRow
            icon={<CalendarDays size={16} />}
            label="Date"
            value={meeting?.date || "Today"}
          />

          <InfoRow
            icon={<Clock3 size={16} />}
            label="Duration"
            value={duration}
          />

          <InfoRow
            icon={<Video size={16} />}
            label="Mode"
            value={meeting?.mode || "Online"}
          />

          <InfoRow
            icon={<MapPin size={16} />}
            label="Location"
            value={meeting?.location || "Google Meet"}
          />

        </div>

      </div>

      {/* ================= Progress ================= */}

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <h3 className="mb-4 text-[15px] font-semibold text-slate-700">
          Workspace Progress
        </h3>

        <ProgressRow
          title="Notes"
          value={`${notes.length} chars`}
        />

        <ProgressRow
          title="Discussion"
          value={discussionPoints.length}
        />

        <ProgressRow
          title="Tasks"
          value={`${completedTasks}/${actionItems.length}`}
        />

        <ProgressRow
          title="Resources"
          value={resources.length}
        />

      </div>

      {/* ================= Status ================= */}

      <div className="mt-4 rounded-xl bg-blue-50 p-4">

        <h3 className="font-semibold text-blue-700">
          Current Status
        </h3>

        <p className="mt-2 text-[12px] leading-5 text-blue-900">

          Meeting is currently in progress.

          Continue documenting notes,
          discussion points and mentor
          observations.

        </p>

      </div>

      {/* ================= Buttons ================= */}

      <div className="mt-5 space-y-2">

        <button
          onClick={saveNotes}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-[13px] font-semibold text-white transition hover:bg-blue-700"
        >
          Save Workspace
        </button>

        <button
          onClick={onClose}
          className="w-full rounded-lg border border-red-300 py-2.5 text-[13px] font-semibold text-red-600 transition hover:bg-red-50"
        >
          End Meeting
        </button>

      </div>

    </div>
  );
};

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-[10px] uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="text-[13px] font-medium text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}

function ProgressRow({
  title,
  value,
}) {
  return (
    <div className="mb-3 flex items-center justify-between">

      <span className="text-[13px] text-slate-600">
        {title}
      </span>

      <span className="font-semibold text-slate-700">
        {value}
      </span>

    </div>
  );
}

export default WorkspaceRightPanel;