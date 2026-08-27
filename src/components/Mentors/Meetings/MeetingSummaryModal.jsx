import React from "react";
import {
  X,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Download,
} from "lucide-react";

import StudentDetailsCard from "./StudentDetailsCard";
import MeetingSummaryCard from "./MeetingSummaryCard";

const MeetingSummaryModal = ({
  open,
  onClose,
  meeting,
}) => {
  if (!open) return null;

  const student = meeting?.student || {
    name: "Sudhanshu Sharma",
    registrationNumber: "22BCS001",
    department: "Computer Science & Engineering",
    year: "3rd Year • Semester 6",
    email: "sudhanshu@example.com",
    mentor: "Dr. Arjun Mehta",
  };

  const summary = meeting?.summary || {
    outcome: "Good",
    participation: 5,
    preparedness: 4,
    communication: 5,
    overallRating: 5,
    followUpRequired: true,
    nextMeeting: "07 Jun 2026 • 11:00 AM",
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-[9999] w-[75vw] max-w-5xl max-h-[75vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-slate-50 shadow-2xl">

        {/* ================= Header ================= */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-xl font-bold text-slate-800">
                {meeting?.title || "Progress Review Meeting"}
              </h1>

              <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <CheckCircle2 size={13} />
                Completed
              </span>

            </div>

            <div className="mt-2 flex items-center gap-5 text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <CalendarDays size={15} />
                {meeting?.date || "12 Jul 2026"}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={15} />
                {meeting?.duration || "01:03:22"}
              </div>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <button className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50">

              <Download size={16} />

              Download Report

            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* ================= Content ================= */}

        <div className="max-h-[calc(75vh-84px)] overflow-y-auto p-5">

          <div className="grid gap-5 lg:grid-cols-[270px_1fr]">

            {/* Student Details */}

            <StudentDetailsCard student={student} />

            {/* Meeting Summary */}

            <MeetingSummaryCard summary={summary} />

          </div>

        </div>

      </div>

    </>
  );
};

export default MeetingSummaryModal;