import React from "react";
import { BriefcaseBusiness } from "lucide-react";

import InfoRow from "./InfoRow";

const ProfessionalInformation = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center gap-2">
        <BriefcaseBusiness
          size={18}
          className="text-blue-600"
        />

        <h2 className="text-[18px] font-semibold text-slate-900">
          Professional Information
        </h2>
      </div>

      {/* ================= Details ================= */}
      <div className="space-y-1">
        <InfoRow
          label="Employee ID"
          value="HOD-CSE-001"
        />

        <InfoRow
          label="Designation"
          value="Head of Department"
        />

        <InfoRow
          label="Department"
          value="Computer Science & Engineering"
        />

        <InfoRow
          label="School"
          value="School of Engineering & Technology"
        />

        <InfoRow
          label="Qualification"
          value="Ph.D. in Computer Science"
        />

        <InfoRow
          label="Specialization"
          value="Artificial Intelligence, Machine Learning"
        />

        <InfoRow
          label="Experience"
          value="17+ Years"
        />

        <InfoRow
          label="Office Hours"
          value="Mon - Fri | 10:00 AM - 4:00 PM"
        />
      </div>
    </div>
  );
};

export default ProfessionalInformation;