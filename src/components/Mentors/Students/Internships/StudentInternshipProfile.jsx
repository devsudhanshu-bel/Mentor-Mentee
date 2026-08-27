import React from "react";
import {
  User,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  BadgeCheck,
  Briefcase,
  Star,
} from "lucide-react";

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2 py-2 border-b border-slate-100 last:border-0">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
      <Icon size={15} className="text-blue-600" />
    </div>

    <div className="flex-1">
      <p className="text-[10px] text-slate-500">{label}</p>
      <p className="text-[11px] font-medium text-slate-700">{value}</p>
    </div>
  </div>
);

const StudentInternshipProfile = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Profile ================= */}

      <div className="flex flex-col items-center">
        <img
          src="https://i.pravatar.cc/120?img=12"
          alt="Student"
          className="h-20 w-20 rounded-full border-4 border-blue-100 object-cover"
        />

        <h2 className="mt-3 text-[14px] font-semibold text-slate-800">
          Aarav Sharma
        </h2>

        <p className="text-[11px] text-slate-500">
          22BCA1234
        </p>

        <span className="mt-2 rounded-full bg-green-100 px-3 py-1 text-[10px] font-medium text-green-700">
          Internship Active
        </span>
      </div>

      {/* ================= Details ================= */}

      <div className="mt-5 space-y-1">
        <DetailRow
          icon={GraduationCap}
          label="Programme"
          value="BCA - AI & ML"
        />

        <DetailRow
          icon={Building2}
          label="Current Company"
          value="TechNova Solutions"
        />

        <DetailRow
          icon={Briefcase}
          label="Current Role"
          value="Software Developer Intern"
        />

        <DetailRow
          icon={BadgeCheck}
          label="Internships Completed"
          value="2"
        />

        <DetailRow
          icon={Star}
          label="Average Rating"
          value="4.6 / 5"
        />

        <DetailRow
          icon={Mail}
          label="Email"
          value="aarav@christuniversity.in"
        />

        <DetailRow
          icon={Phone}
          label="Phone"
          value="+91 98765 43210"
        />
      </div>
    </div>
  );
};

export default StudentInternshipProfile;