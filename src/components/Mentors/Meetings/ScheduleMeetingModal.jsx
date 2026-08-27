import React, { useState } from "react";
import {
  X,
  CalendarDays,
  Clock3,
  MapPin,
  User,
} from "lucide-react";

const students = [
  "Sudhanshu Sreedhara Belavarthy",
  "Rahul Sharma",
  "Ananya Gupta",
  "Priya Nair",
  "Kiran Kumar",
];

const ScheduleMeetingModal = ({
  open,
  onClose,
  onMeetingSuccess,
}) => {
  const [form, setForm] = useState({
    student: "",
    title: "",
    meetingType: "Regular",
    meetingMode: "In Person",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    priority: "Medium",
    agenda: "",
    description: "",
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
              Schedule Meeting
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Schedule a meeting with your mentee.
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
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-[13px] outline-none transition focus:border-blue-500"
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
              Meeting Title{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              placeholder="Semester Progress Review"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Meeting Type & Mode */}
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <label className="mb-2 block text-[12px] font-medium text-slate-700">
                Meeting Type
              </label>

              <div className="flex gap-3 text-[13px]">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    checked={form.meetingType === "Regular"}
                    onChange={() =>
                      handleChange(
                        "meetingType",
                        "Regular"
                      )
                    }
                  />
                  Regular
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    checked={form.meetingType === "Special"}
                    onChange={() =>
                      handleChange(
                        "meetingType",
                        "Special"
                      )
                    }
                  />
                  Special
                </label>
              </div>
            </div>

            {/* Mode */}
            <div>
              <label className="mb-2 block text-[12px] font-medium text-slate-700">
                Meeting Mode
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "meetingMode",
                      "In Person"
                    )
                  }
                  className={`rounded-lg border px-4 py-2 text-[12px] font-medium transition ${
                    form.meetingMode === "In Person"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  In Person
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "meetingMode",
                      "Online"
                    )
                  }
                  className={`rounded-lg border px-4 py-2 text-[12px] font-medium transition ${
                    form.meetingMode === "Online"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Online
                </button>
              </div>
            </div>
          </div>
                    {/* Venue & Priority */}
          <div className="grid grid-cols-2 gap-4">
            {/* Venue */}
            <div>
              <label className="mb-1 block text-[12px] font-medium text-slate-700">
                {form.meetingMode === "Online"
                  ? "Google Meet Link"
                  : "Venue / Cabin"}
              </label>

              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) =>
                    handleChange("venue", e.target.value)
                  }
                  placeholder={
                    form.meetingMode === "Online"
                      ? "https://meet.google.com/..."
                      : "Faculty Cabin B205"
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-[13px] outline-none transition focus:border-blue-500"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-1 block text-[12px] font-medium text-slate-700">
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) =>
                  handleChange(
                    "priority",
                    e.target.value
                  )
                }
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none transition focus:border-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
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
              placeholder="Discuss semester progress, assignments, internships..."
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-[12px] font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              placeholder="Additional notes regarding this meeting..."
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none transition focus:border-blue-500"
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
                !form.date ||
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
                date: form.date,
                time: `${form.startTime} - ${form.endTime}`,
                venue:
                  form.venue ||
                  (form.meetingMode === "Online"
                    ? "Google Meet"
                    : "Faculty Cabin"),
                type: `${form.meetingType} Meeting`,
                student: form.student,
                priority: form.priority,
                agenda: form.agenda,
                description: form.description,
                meetingMode: form.meetingMode,
              };

              if (onMeetingSuccess) {
                onMeetingSuccess(meetingData);
              }

              setForm({
                student: "",
                title: "",
                meetingType: "Regular",
                meetingMode: "In Person",
                date: "",
                startTime: "",
                endTime: "",
                venue: "",
                priority: "Medium",
                agenda: "",
                description: "",
              });

              onClose();
            }}
            className="cursor-pointer rounded-lg bg-[#2563EB] px-5 py-2 text-[13px] font-medium text-white transition hover:bg-[#1D4ED8]"
          >
            Schedule Meeting
          </button>
        </div>
      </div>
    </>
  );
};

export default ScheduleMeetingModal;