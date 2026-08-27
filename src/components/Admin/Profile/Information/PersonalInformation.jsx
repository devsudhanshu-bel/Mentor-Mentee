import React from "react";
import { User } from "lucide-react";

import InfoRow from "./InfoRow";

const PersonalInformation = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-full">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <User
          size={18}
          className="text-blue-600"
        />

        <h2 className="text-[18px] font-semibold text-slate-900">
          Personal Information
        </h2>
      </div>

      <div className="space-y-1">
        <InfoRow
          label="Full Name"
          value="Dr. Arjun Mehta"
        />

        <InfoRow
          label="Date of Birth"
          value="12 Mar 1985"
        />

        <InfoRow
          label="Gender"
          value="Male"
        />

        <InfoRow
          label="Nationality"
          value="Indian"
        />

        <InfoRow
          label="Email Address"
          value="arjun.mehta@christuniversity.in"
        />

        <InfoRow
          label="Phone Number"
          value="+91 98765 43210"
        />

        <InfoRow
          label="Office Phone"
          value="080 4012 3456"
        />

        <InfoRow
          label="Office Location"
          value="Faculty Block 2, Room 304"
        />

        <InfoRow
          label="Date of Joining"
          value="15 Aug 2015"
        />
      </div>
    </div>
  );
};

export default PersonalInformation;