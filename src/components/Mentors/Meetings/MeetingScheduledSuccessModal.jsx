import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
  ClipboardList,
  CalendarCheck2,
} from "lucide-react";

const MeetingScheduledSuccessModal = ({
  open,
  onClose,
  meeting = {
    title: "Progress Review Meeting",
    date: "24 May 2025",
    time: "11:00 AM - 12:00 PM",
    venue: "Faculty Cabin B205",
    type: "Regular Meeting",
  },
}) => {
  const [addToCalendar, setAddToCalendar] =
    useState(true);

  if (!open) return null;

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
        <div className="flex items-center justify-end px-5 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X
              size={18}
              className="text-slate-500"
            />
          </button>
        </div>

        {/* Success */}
        <div className="px-6 pb-6">

          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2
                size={42}
                className="text-emerald-600"
              />
            </div>

            <h2 className="mt-4 text-[22px] font-semibold text-slate-800">
              Meeting Scheduled!
            </h2>

            <p className="mt-2 text-center text-[13px] text-slate-500">
              Your meeting has been scheduled
              successfully.
            </p>
          </div>

          {/* Meeting Details */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

            {/* Title */}
            <div className="flex items-start gap-3">
              <ClipboardList
                size={16}
                className="mt-0.5 text-blue-600"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Title
                </p>

                <p className="mt-1 text-[13px] font-medium text-slate-700">
                  {meeting.title}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="mt-4 flex items-start gap-3">
              <Clock3
                size={16}
                className="mt-0.5 text-blue-600"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Date & Time
                </p>

                <p className="mt-1 text-[13px] font-medium text-slate-700">
                  {meeting.date} &nbsp; | &nbsp;
                  {meeting.time}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="mt-4 flex items-start gap-3">
              <MapPin
                size={16}
                className="mt-0.5 text-blue-600"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Venue
                </p>

                <p className="mt-1 text-[13px] font-medium text-slate-700">
                  {meeting.venue}
                </p>
              </div>
            </div>

            {/* Type */}
            <div className="mt-4 flex items-start gap-3">
              <CalendarCheck2
                size={16}
                className="mt-0.5 text-blue-600"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Type
                </p>

                <p className="mt-1 text-[13px] font-medium text-slate-700">
                  {meeting.type}
                </p>
              </div>
            </div>

          </div>
                    {/* Calendar Options */}
          <div className="mt-6 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={addToCalendar}
                onChange={(e) =>
                  setAddToCalendar(e.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-[13px] font-medium text-slate-700">
                Add to Calendar
              </span>
            </label>

            <div className="flex items-center gap-3">
              {/* Google Calendar */}
              <button
                type="button"
                disabled={!addToCalendar}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                  addToCalendar
                    ? "border-slate-300 bg-white hover:bg-slate-100"
                    : "cursor-not-allowed border-slate-200 bg-slate-100 opacity-50"
                }`}
                title="Google Calendar"
              >
                <img
                  src="https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_48dp.png"
                  alt="Google Calendar"
                  className="h-5 w-5"
                />
              </button>

              {/* Outlook */}
              <button
                type="button"
                disabled={!addToCalendar}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                  addToCalendar
                    ? "border-slate-300 bg-white hover:bg-slate-100"
                    : "cursor-not-allowed border-slate-200 bg-slate-100 opacity-50"
                }`}
                title="Microsoft Outlook"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg"
                  alt="Outlook"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default MeetingScheduledSuccessModal;