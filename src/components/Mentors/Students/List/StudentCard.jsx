import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const getStatusClasses = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-emerald-100 text-emerald-700";

      case "Good Standing":
        return "bg-blue-100 text-blue-700";

      case "Needs Attention":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Top */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <img
            src={student.avatar}
            alt={student.name}
            className="h-14 w-14 rounded-full border-2 border-slate-200 object-cover"
          />

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
              student.status
            )}`}
          >
            {student.status}
          </span>
        </div>

        <h3 className="mt-3 text-[15px] font-semibold text-slate-900">
          {student.name}
        </h3>

        <p className="mt-0.5 text-[12px] text-slate-500">
          {student.regNo}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-600">
          <GraduationCap size={14} />

          <span>
            {student.course} • {student.semester}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-y border-slate-200">
        <div className="py-3 text-center">
          <p className="text-[11px] text-slate-500">
            Attendance
          </p>

          <p className="mt-1 text-[15px] font-semibold text-slate-800">
            {student.attendance}%
          </p>
        </div>

        <div className="border-x border-slate-200 py-3 text-center">
          <p className="text-[11px] text-slate-500">
            CGPA
          </p>

          <p className="mt-1 text-[15px] font-semibold text-slate-800">
            {student.cgpa}
          </p>
        </div>

        <div className="py-3 text-center">
          <p className="text-[11px] text-slate-500">
            Meetings
          </p>

          <p className="mt-1 text-[15px] font-semibold text-slate-800">
            {student.meetings}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-[12px] text-slate-500">
          <CalendarDays size={14} />

          <span>
            Last Meeting • {student.lastMeeting}
          </span>
        </div>

        {/* Open Dashboard */}
        <button
          onClick={() =>
            navigate(`/mentor/students/${student.id}/overview`)
          }
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-[13px] font-medium text-white transition hover:bg-blue-700"
        >
          Open Dashboard

          <ArrowRight size={15} />
        </button>

        {/* Schedule Meeting */}
        <button className="flex h-9 w-full items-center justify-center rounded-lg border border-slate-300 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50">
          Schedule Meeting
        </button>
      </div>
    </div>
  );
};

export default StudentCard;