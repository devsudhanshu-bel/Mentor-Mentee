import React from "react";
import {
  MapPin,
} from "lucide-react";

const CompanyHeader = () => {
  return (
    <div className="flex items-start gap-4">
      {/* ================= Company Logo ================= */}

      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
        <img
          src="https://placehold.co/60x60?text=TN"
          alt="TechNova"
          className="h-12 w-12 object-contain"
        />
      </div>

      {/* ================= Company Details ================= */}

      <div className="flex-1">
        <h2 className="text-[18px] font-semibold text-slate-800">
          Software Development Intern
        </h2>

        <p className="mt-2 text-[13px] font-medium text-blue-600">
          TechNova Solutions
        </p>

        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
          <MapPin
            size={13}
            className="text-slate-400"
          />

          Bangalore, Karnataka
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;