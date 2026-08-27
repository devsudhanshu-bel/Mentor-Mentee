import React from "react";
import {
  User,
  GraduationCap,
  Mail,
  Building2,
  UserRound,
  Hash,
} from "lucide-react";

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2.5 border-b border-slate-100 py-2.5 last:border-0">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
      <Icon size={16} className="text-blue-600" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 truncate text-[13px] font-semibold text-slate-700">
        {value || "-"}
      </p>
    </div>
  </div>
);

const StudentDetailsCard = ({ student }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-5 py-4">

        <h2 className="text-lg font-bold text-slate-800">
          Student Details
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Basic information about the mentee.
        </p>

      </div>

      {/* Avatar */}

      <div className="flex flex-col items-center px-5 py-5">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow">

          <User size={34} />

        </div>

        <h3 className="mt-3 text-lg font-bold text-slate-800">
          {student?.name || "Sudhanshu Sharma"}
        </h3>

        <p className="text-[13px] text-slate-500">
          {student?.registrationNumber || "22BCS001"}
        </p>

      </div>

      {/* Details */}

      <div className="px-5 pb-5">

        <DetailRow
          icon={Hash}
          label="Registration Number"
          value={student?.registrationNumber}
        />

        <DetailRow
          icon={GraduationCap}
          label="Department"
          value={student?.department}
        />

        <DetailRow
          icon={Building2}
          label="Year / Semester"
          value={student?.year}
        />

        <DetailRow
          icon={Mail}
          label="Email"
          value={student?.email}
        />

        <DetailRow
          icon={UserRound}
          label="Assigned Mentor"
          value={student?.mentor}
        />

      </div>

    </div>
  );
};

export default StudentDetailsCard;