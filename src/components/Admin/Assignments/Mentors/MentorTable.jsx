import React from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MentorTableHeader from "./MentorTableHeader";
import MentorRow from "./MentorRow";
import MentorCapacityBar from "./MentorCapacityBar";

const MentorMobileCard = ({ mentor, selectedMentor, setSelectedMentor }) => {
  const navigate = useNavigate();
  const isSelected = selectedMentor === mentor.id;
  const assigned = Number(mentor.currentMentees) || 0;
  const capacity = Number(mentor.maxMentees) || 0;
  const available =
    mentor.availableSlots !== undefined
      ? Number(mentor.availableSlots)
      : Math.max(capacity - assigned, 0);

  const initials = (mentor.fullName || "Mentor")
    .replace(/^(Dr\\.|Prof\\.)\\s*/i, "")
    .split(/\\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={`rounded-xl border p-3 ${
        isSelected ? "border-blue-300 bg-blue-50/70" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          isSelected ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"
        }`}>
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="break-words text-sm font-semibold leading-5 text-slate-800">
            {mentor.fullName || "Unnamed Mentor"}
          </p>
          <p className="break-all text-xs leading-5 text-slate-500">
            {mentor.email || "No email"}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            {mentor.employeeCode || "No employee code"}
          </p>
        </div>

        <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${
          available > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
        }`}>
          {available} slots
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Department</p>
          <p className="mt-1 break-words leading-4 text-slate-700">
            {mentor.department?.name || "—"}
            {mentor.department?.code ? ` (${mentor.department.code})` : ""}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Designation</p>
          <p className="mt-1 break-words leading-4 text-slate-700">
            {mentor.designation || "Faculty Mentor"}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Capacity</span>
          <span className="text-[11px] text-slate-500">{assigned} / {capacity}</span>
        </div>
        <MentorCapacityBar assigned={assigned} capacity={capacity} />
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-200/80 pt-3">
        <button
          type="button"
          onClick={() => setSelectedMentor(mentor.id)}
          disabled={available <= 0}
          className={`min-h-10 flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition ${
            available <= 0
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : isSelected
                ? "bg-blue-600 text-white"
                : "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
          }`}
        >
          {isSelected ? "Selected" : available > 0 ? "Select Mentor" : "Full"}
        </button>

        <button
          type="button"
          onClick={() => navigate(`/admin/mentor/${mentor.id}`)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100"
          title="View Mentor"
          aria-label={`View ${mentor.fullName || "mentor"}`}
        >
          <Eye size={16} />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100"
          title="More Actions"
          aria-label={`More actions for ${mentor.fullName || "mentor"}`}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </article>
  );
};

const MentorTable = ({
  mentors = [],
  selectedMentor,
  setSelectedMentor,
}) => {
  return (
    <div className="w-full min-w-0">
      {/* Mobile: readable full-width mentor cards */}
      <div className="grid min-w-0 grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:hidden">
        {mentors.map((mentor) => (
          <MentorMobileCard
            key={mentor.id}
            mentor={mentor}
            selectedMentor={selectedMentor}
            setSelectedMentor={setSelectedMentor}
          />
        ))}

        {mentors.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500 sm:col-span-2">
            No mentors found.
          </p>
        )}
      </div>

      {/* Desktop: existing table and actions */}
      <div className="hidden w-full min-w-0 overflow-x-auto lg:block">
        <table className="w-full min-w-[1040px] table-auto">
          <MentorTableHeader />
          <tbody>
            {mentors.map((mentor) => (
              <MentorRow
                key={mentor.id}
                mentor={mentor}
                selectedMentor={selectedMentor}
                setSelectedMentor={setSelectedMentor}
              />
            ))}

            {mentors.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-slate-500">
                  No mentors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MentorTable;
