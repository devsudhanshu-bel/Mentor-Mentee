import React, { useMemo, useState } from "react";
import {
  X,
  User,
  MapPin,
  Users,
  Video,
} from "lucide-react";

const students = [
  {
    id: 1,
    name: "Sudhanshu Sreedhara Belavarthy",
    regNo: "2362177",
    branch: "B.Tech - AI & Data Science",
    semester: "Semester V",
    avatar:
      "https://ui-avatars.com/api/?name=Sudhanshu&background=2563EB&color=fff",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    regNo: "2362145",
    branch: "B.Tech - CSE",
    semester: "Semester V",
    avatar:
      "https://ui-avatars.com/api/?name=Rahul&background=10B981&color=fff",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    regNo: "2362152",
    branch: "B.Tech - IT",
    semester: "Semester V",
    avatar:
      "https://ui-avatars.com/api/?name=Ananya&background=7C3AED&color=fff",
  },
];

const InstantMeetingModal = ({
  open,
  onClose,
  onMeetingSuccess,
}) => {
  const [form, setForm] = useState({
    studentId: "",
    meetingMode: "In Person",
    venue: "",
    agenda: "",
  });

  const selectedStudent = useMemo(() => {
    return (
      students.find(
        (student) =>
          student.id === Number(form.studentId)
      ) || null
    );
  }, [form.studentId]);

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
      <div className="fixed left-1/2 top-1/2 z-[9999] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-[18px] font-semibold text-slate-800">
              Start Instant Meeting
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Launch an instant mentoring session.
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
                value={form.studentId}
                onChange={(e) =>
                  handleChange(
                    "studentId",
                    e.target.value
                  )
                }
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-[13px] outline-none transition focus:border-violet-500"
              >
                <option value="">
                  Select Student
                </option>

                {students.map((student) => (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Preview */}
          {selectedStudent && (
            <div className="flex items-center gap-4 rounded-xl border border-violet-100 bg-violet-50 p-4">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="h-14 w-14 rounded-full border border-white object-cover shadow-sm"
              />

              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-slate-800">
                  {selectedStudent.name}
                </h3>

                <p className="mt-1 text-[12px] text-slate-600">
                  {selectedStudent.branch}
                </p>

                <p className="mt-1 text-[12px] text-slate-500">
                  {selectedStudent.semester} &nbsp; | &nbsp;
                  Reg. No. {selectedStudent.regNo}
                </p>
              </div>
            </div>
          )}

          {/* Meeting Mode */}
          <div>
            <label className="mb-2 block text-[12px] font-medium text-slate-700">
              Meeting Mode
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  handleChange(
                    "meetingMode",
                    "In Person"
                  )
                }
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-[12px] font-medium transition ${
                  form.meetingMode === "In Person"
                    ? "border-violet-600 bg-violet-50 text-violet-700"
                    : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Users size={15} />
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
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-[12px] font-medium transition ${
                  form.meetingMode === "Online"
                    ? "border-violet-600 bg-violet-50 text-violet-700"
                    : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Video size={15} />
                Online
              </button>
            </div>
          </div>
                    {/* Venue / Meet Link */}
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
                className="h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-[13px] outline-none transition focus:border-violet-500"
              />
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="mb-1 block text-[12px] font-medium text-slate-700">
              Agenda{" "}
              <span className="text-slate-400">
                (Optional)
              </span>
            </label>

            <textarea
              rows={4}
              value={form.agenda}
              onChange={(e) =>
                handleChange("agenda", e.target.value)
              }
              placeholder="What would you like to discuss?"
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none transition focus:border-violet-500"
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
              if (!form.studentId) {
                alert("Please select a student.");
                return;
              }

              const meetingData = {
                title: selectedStudent
                  ? `Instant Meeting with ${selectedStudent.name}`
                  : "Instant Meeting",
                date: new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                venue:
                  form.venue ||
                  (form.meetingMode === "Online"
                    ? "Google Meet"
                    : "Faculty Cabin"),
                type: "Instant Meeting",
                student: selectedStudent,
                agenda: form.agenda,
                meetingMode: form.meetingMode,
              };

              if (onMeetingSuccess) {
                onMeetingSuccess(meetingData);
              }

              setForm({
                studentId: "",
                meetingMode: "In Person",
                venue: "",
                agenda: "",
              });

              onClose();
            }}
            className="cursor-pointer rounded-lg bg-violet-600 px-5 py-2 text-[13px] font-medium text-white transition hover:bg-violet-700"
          >
            Start Instant Meeting
          </button>
        </div>
      </div>
    </>
  );
};

export default InstantMeetingModal;