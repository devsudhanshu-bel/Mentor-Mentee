import React from "react";
import { UserRound, Mail, Phone, GraduationCap } from "lucide-react";

import profile from "../../assets/profile.jpg";

const MenteeCard = ({ mentorData, loading = false }) => {
  const student = mentorData?.student;

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
        <div className="flex items-center gap-2 mb-3">
          <UserRound size={15} className="text-blue-600" />

          <h3 className="text-[14px] font-semibold text-blue-600">
            You (Mentee)
          </h3>
        </div>

        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
        <div className="flex items-center gap-2 mb-3">
          <UserRound size={15} className="text-blue-600" />

          <h3 className="text-[14px] font-semibold text-blue-600">
            You (Mentee)
          </h3>
        </div>

        <p className="text-[12px] text-slate-500">
          Student information is unavailable.
        </p>
      </div>
    );
  }

  const studentImage = student.profileImage || profile;

  const department = student.department?.name || "Department not available";

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <UserRound size={15} className="text-blue-600" />

        <h3 className="text-[14px] font-semibold text-blue-600">
          You (Mentee)
        </h3>
      </div>

      {/* Body */}
      <div className="flex gap-4 items-start">
        {/* Profile */}
        <img
          src={studentImage}
          alt={student.fullName}
          className="w-16 h-16 rounded-full object-cover border border-slate-200 flex-shrink-0"
        />

        {/* Details */}
        <div className="flex-1 flex flex-col">
          {/* Name */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[16px] font-bold text-[#142970] leading-tight">
              {student.fullName}
            </h2>

            <span className="px-2 py-[2px] rounded-full bg-blue-100 text-blue-700 text-[9px] font-medium">
              Mentee
            </span>
          </div>

          {/* Programme */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
            <GraduationCap size={12} />

            <span>{student.programme || "Programme not available"}</span>
          </div>

          {/* Semester + Register */}
          <p className="text-[11px] text-slate-500 leading-5">
            {student.semester
              ? `Semester ${student.semester}`
              : "Semester not available"}

            {student.registerNumber && (
              <>&nbsp; • &nbsp; Reg. No. {student.registerNumber}</>
            )}
          </p>

          {/* Department */}
          <p className="text-[11px] text-slate-500">{department}</p>

          {/* Contact */}
          <div className="mt-3 space-y-2">
            {student.email && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Mail size={13} />

                <span className="truncate">{student.email}</span>
              </div>
            )}

            {student.phone && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Phone size={13} />

                <span>{student.phone}</span>
              </div>
            )}
          </div>

          {/* Button */}
          <div className="mt-7 flex justify-end">
            <button
              type="button"
              className="
                px-4
                py-1.5
                text-[12px]
                font-medium
                text-blue-600
                border
                border-blue-500
                rounded-lg
                hover:bg-blue-50
                transition-all
              "
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeCard;
