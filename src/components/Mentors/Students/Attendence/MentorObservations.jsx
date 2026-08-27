import React from "react";
import {
  Plus,
  UserCircle2,
} from "lucide-react";

const MentorObservations = () => {
  return (
    <div className="h-[380px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col">
      {/* ================= Header ================= */}

      <h2 className="mb-4 text-[13px] font-semibold text-blue-600">
        Mentor Observations
      </h2>

      {/* ================= Observation ================= */}

      <div className="rounded-xl bg-blue-50 p-3 text-[11px] leading-5 text-slate-700">
        Aarav maintains excellent attendance across most subjects. He is
        consistent and rarely misses classes. Encourage him to continue this
        discipline.
      </div>

      {/* ================= Mentor Info ================= */}

      <div className="mt-5 flex items-center gap-3">
        <UserCircle2
          size={36}
          className="text-slate-400"
        />

        <div>
          <h3 className="text-[11px] font-semibold text-slate-800">
            Dr. Arjun Mehta
          </h3>

          <p className="text-[10px] text-slate-500">
            Last updated: 10 May 2025
          </p>
        </div>
      </div>

      {/* Push Button Down */}

      <div className="flex-1" />

      {/* ================= Button ================= */}

      <button className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white py-2 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50">
        <Plus size={14} />

        Add New Observation
      </button>
    </div>
  );
};

export default MentorObservations;