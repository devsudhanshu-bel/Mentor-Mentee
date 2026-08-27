import React from "react";
import { BrainCircuit } from "lucide-react";

import ProgressBar from "./ProgressBar";

const researchAreas = [
  {
    id: 1,
    label: "Artificial Intelligence",
    value: 85,
    color: "bg-blue-600",
  },
  {
    id: 2,
    label: "Machine Learning",
    value: 72,
    color: "bg-violet-600",
  },
  {
    id: 3,
    label: "Blockchain",
    value: 58,
    color: "bg-emerald-600",
  },
  {
    id: 4,
    label: "Data Analytics",
    value: 40,
    color: "bg-amber-500",
  },
];

const ResearchAreas = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-800">
            Research Areas
          </h2>

          <p className="mt-1 text-[12px] text-slate-500">
            Student's primary research interests.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
          <BrainCircuit
            size={21}
            className="text-indigo-600"
          />
        </div>
      </div>

      {/* ================= Areas ================= */}

      <div className="space-y-5 p-5">
        {researchAreas.map((area) => (
          <ProgressBar
            key={area.id}
            label={area.label}
            value={area.value}
            color={area.color}
          />
        ))}
      </div>
    </div>
  );
};

export default ResearchAreas;