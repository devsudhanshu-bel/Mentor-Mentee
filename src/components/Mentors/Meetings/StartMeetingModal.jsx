import React from "react";
import {
  X,
  TriangleAlert,
  CalendarDays,
  MapPin,
} from "lucide-react";

const StartMeetingModal = ({
  open,
  onClose,
  meeting,
  onStartMeeting,
}) => {
  if (!open || !meeting) return null;

  const handleStartMeeting = () => {
    if (onStartMeeting) {
      onStartMeeting(meeting);
    }

    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[9999] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

          <h2 className="text-[17px] font-semibold text-slate-800">
            Start Meeting
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X
              size={18}
              className="text-slate-600"
            />
          </button>

        </div>

        {/* Body */}
        <div className="space-y-5 p-5">

          {/* Warning */}
          <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">

            <div className="mt-0.5 rounded-full bg-orange-100 p-2">

              <TriangleAlert
                size={18}
                className="text-orange-500"
              />

            </div>

            <div>

              <h3 className="text-[13px] font-semibold text-slate-800">
                You are about to start this meeting
              </h3>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Once started, the Meeting Workspace will open where you
                can manage meeting notes, discussion points, action items,
                resources, mentor feedback and follow-up scheduling.
              </p>

            </div>

          </div>

          {/* Meeting Information */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="grid grid-cols-[100px_1fr] items-center">

              <span className="text-[12px] font-medium text-slate-500">
                Meeting
              </span>

              <p className="text-[13px] font-semibold text-slate-800">
                {meeting.title}
              </p>

            </div>

            <div className="grid grid-cols-[100px_1fr] items-center">

              <span className="text-[12px] font-medium text-slate-500">
                Date & Time
              </span>

              <div className="flex items-center gap-2 text-[13px] text-slate-700">

                <CalendarDays size={15} />

                <span>
                  {meeting.date} • {meeting.time}
                </span>

              </div>

            </div>

            <div className="grid grid-cols-[100px_1fr] items-center">

              <span className="text-[12px] font-medium text-slate-500">
                Location
              </span>

              <div className="flex items-center gap-2 text-[13px] text-slate-700">

                <MapPin size={15} />

                <span>{meeting.location}</span>

              </div>

            </div>

          </div>

          {/* Features */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">

            <p className="text-[12px] font-semibold text-slate-700">
              Meeting Workspace Includes
            </p>

            <ul className="mt-3 space-y-1 text-[12px] text-slate-600">

              <li>• Live Meeting Notes</li>

              <li>• Discussion Tracker</li>

              <li>• Action Items Manager</li>

              <li>• Learning Resources</li>

              <li>• Mentor Feedback</li>

              <li>• Follow-up Scheduling</li>

            </ul>

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-2 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleStartMeeting}
            className="rounded-lg bg-blue-600 px-5 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700"
          >
            Start Meeting
          </button>

        </div>

      </div>
    </>
  );
};

export default StartMeetingModal;