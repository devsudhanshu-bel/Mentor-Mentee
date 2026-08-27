import React from "react";
import {
  GraduationCap,
  Mail,
  Phone,
  School,
  Building2,
  UserRound,
  BadgeCheck,
} from "lucide-react";

const StudentProfileCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* ================= Banner ================= */}

      <div className="h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

      {/* ================= Profile ================= */}

      <div className="-mt-10 flex flex-col items-center px-5 pb-6">
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="Student"
          className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
        />

        <h2 className="mt-3 text-[17px] font-semibold text-slate-800">
          Aarav Sharma
        </h2>

        <p className="mt-1 text-[12px] text-slate-500">
          2347158
        </p>

        <span className="mt-3 rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">
          Active Student
        </span>

        {/* ================= Divider ================= */}

        <div className="my-5 h-px w-full bg-slate-100" />

        {/* ================= Details ================= */}

        <div className="w-full space-y-4">
          <ProfileItem
            icon={GraduationCap}
            label="Programme"
            value="BCA"
          />

          <ProfileItem
            icon={School}
            label="Department"
            value="Computer Science"
          />

          <ProfileItem
            icon={Building2}
            label="Semester"
            value="Semester 5"
          />

          <ProfileItem
            icon={BadgeCheck}
            label="Section"
            value="A"
          />

          <ProfileItem
            icon={UserRound}
            label="Mentor"
            value="Dr. John David"
          />

          <ProfileItem
            icon={Mail}
            label="Email"
            value="aarav.sharma@christuniversity.in"
          />

          <ProfileItem
            icon={Phone}
            label="Phone"
            value="+91 9876543210"
          />
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
        <Icon
          size={16}
          className="text-slate-600"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 break-words text-[12px] font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StudentProfileCard;