import React, { useState } from "react";
import {
  X,
  User,
  CalendarDays,
  Clock3,
} from "lucide-react";

const students = [
  "Sudhanshu Sreedhara Belavarthy",
  "Rahul Sharma",
  "Ananya Gupta",
  "Priya Nair",
  "Kiran Kumar",
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const RecurringMeetingModal = ({
  open,
  onClose,
  onMeetingSuccess,
}) => {
  const [form, setForm] = useState({
    student: "",
    title: "",
    frequency: "Weekly",
    startDate: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    endType: "Never",
    endDate: "",
    venue: "",
    agenda: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[9999] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-[18px] font-semibold text-slate-800">
              Create Recurring Meeting
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Schedule recurring meetings for your mentee.
            </p>
          </div>

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
        <div className="space-y-4 p-5">
          {/* Student */}
          <div>
            <label className="mb-1 block text-[12px] font-medium text-slate-700">
              Student <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={form.student}
                onChange={(e) =>
                  handleChange("student", e.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-[13px] outline-none transition focus:border-emerald-500"
              >
                <option value="">
                  Select Student
                </option>

                {students.map((student) => (
                  <option
                    key={student}
                    value={student}
                  >
                    {student}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Meeting Title */}
          <div>
            <label className="mb-1 block text-[12px] font-medium text-slate-700">
              Meeting Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              placeholder="Weekly Mentorship Meeting"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-emerald-500"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="mb-2 block text-[12px] font-medium text-slate-700">
              Frequency
            </label>

            <div className="flex flex-wrap gap-5 text-[13px]">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  checked={form.frequency === "Weekly"}
                  onChange={() =>
                    handleChange("frequency", "Weekly")
                  }
                />
                Weekly
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  checked={form.frequency === "Bi-weekly"}
                  onChange={() =>
                    handleChange(
                      "frequency",
                      "Bi-weekly"
                    )
                  }
                />
                Bi-weekly
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  checked={form.frequency === "Monthly"}
                  onChange={() =>
                    handleChange(
                      "frequency",
                      "Monthly"
                    )
                  }
                />
                Monthly
              </label>
            </div>
          </div>

          {/* Starts On & Every */}
          <div className="grid grid-cols-2 gap-4">
            {/* Starts On */}
            <div>
              <label className="mb-1 block text-[12px] font-medium text-slate-700">
                Starts On
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    handleChange(
                      "startDate",
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-[13px] outline-none transition focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Every */}
            <div>
              <label className="mb-1 block text-[12px] font-medium text-slate-700">
                Every
              </label>

              <select
                value={form.day}
                onChange={(e) =>
                  handleChange("day", e.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-emerald-500"
              >
                {weekDays.map((day) => (
                  <option
                    key={day}
                    value={day}
                  >
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="mb-2 block text-[12px] font-medium text-slate-700">
              Time
            </label>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="relative">
                <Clock3
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    handleChange(
                      "startTime",
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-[13px] outline-none transition focus:border-emerald-500"
                />
              </div>

              <span className="text-[13px] text-slate-500">
                to
              </span>

              <div className="relative">
                <Clock3
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    handleChange(
                      "endTime",
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-[13px] outline-none transition focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
                    {/* Ends */}
          <div>
            <label className="mb-2 block text-[12px] font-medium text-slate-700">
              Ends
            </label>

            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-[13px]">
                <input
                  type="radio"
                  checked={form.endType === "Never"}
                  onChange={() =>
                    handleChange("endType", "Never")
                  }
                />
                Never
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-[13px]">
                <input
                  type="radio"
                  checked={form.endType === "On"}
                  onChange={() =>
                    handleChange("endType", "On")
                  }
                />
                On
              </label>

              <div className="relative flex-1">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  disabled={form.endType !== "On"}
                  value={form.endDate}
                  onChange={(e) =>
                    handleChange(
                      "endDate",
                      e.target.value
                    )
                  }
                  className={`h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-[13px] outline-none transition ${
                    form.endType !== "On"
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : "focus:border-emerald-500"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="mb-1 block text-[12px] font-medium text-slate-700">
              Venue / Cabin
            </label>

            <input
              type="text"
              value={form.venue}
              onChange={(e) =>
                handleChange("venue", e.target.value)
              }
              placeholder="Faculty Cabin B205"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-emerald-500"
            />
          </div>

          {/* Agenda */}
          <div>
            <label className="mb-1 block text-[12px] font-medium text-slate-700">
              Agenda
            </label>

            <textarea
              rows={3}
              value={form.agenda}
              onChange={(e) =>
                handleChange("agenda", e.target.value)
              }
              placeholder="Weekly catch-up, academic progress review, internship updates..."
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (
                !form.student ||
                !form.title ||
                !form.startDate ||
                !form.startTime ||
                !form.endTime
              ) {
                alert(
                  "Please fill all required fields."
                );
                return;
              }

              const meetingData = {
                title: form.title,
                date: form.startDate,
                time: `${form.startTime} - ${form.endTime}`,
                venue:
                  form.venue || "Faculty Cabin",
                type: "Recurring Meeting",
                student: form.student,
                frequency: form.frequency,
                day: form.day,
                endType: form.endType,
                endDate: form.endDate,
                agenda: form.agenda,
              };

              if (onMeetingSuccess) {
                onMeetingSuccess(meetingData);
              }

              setForm({
                student: "",
                title: "",
                frequency: "Weekly",
                startDate: "",
                day: "Monday",
                startTime: "",
                endTime: "",
                endType: "Never",
                endDate: "",
                venue: "",
                agenda: "",
              });

              onClose();
            }}
            className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 text-[13px] font-medium text-white transition hover:bg-emerald-700"
          >
            Create Recurring Meeting
          </button>
        </div>
      </div>
    </>
  );
};

export default RecurringMeetingModal;