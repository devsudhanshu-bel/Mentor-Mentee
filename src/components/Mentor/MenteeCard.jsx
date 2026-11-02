
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  Building2,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

const MenteeCard = ({ mentorData, loading = false }) => {
  const navigate = useNavigate();

  const student = mentorData?.student;

  // ==========================================================
  // LOADING STATE
  // ==========================================================

  if (loading) {
    return (
      <div className="w-full min-w-0 bg-white border border-slate-200 rounded-xl shadow-sm p-3 sm:p-4 h-full">
        <div className="flex items-center gap-2 mb-3">
          <UserRound size={15} className="text-blue-600 shrink-0" />

          <h3 className="text-[13px] sm:text-[14px] font-semibold text-blue-600">
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

  // ==========================================================
  // STUDENT INFORMATION UNAVAILABLE
  // ==========================================================

  if (!student) {
    return (
      <div className="w-full min-w-0 bg-white border border-slate-200 rounded-xl shadow-sm p-3 sm:p-4 h-full">
        <div className="flex items-center gap-2 mb-3">
          <UserRound size={15} className="text-blue-600 shrink-0" />

          <h3 className="text-[13px] sm:text-[14px] font-semibold text-blue-600">
            You (Mentee)
          </h3>
        </div>

        <div className="min-h-[180px] flex flex-col items-center justify-center text-center px-2">
          <UserRound size={38} className="text-slate-300 mb-3" />

          <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#142970]">
            Student Information Unavailable
          </h4>

          <p className="text-[11px] text-slate-500 mt-1 max-w-[220px]">
            Your profile information could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // STUDENT DETAILS
  // ==========================================================

  const studentImage = student.profileImage || profile;

  const department =
    student.department?.name || "Department not available";

  const handleViewProfile = () => {
    if (!student.id) return;

    navigate(`/students/profile/${student.id}`);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="
        w-full
        min-w-0
        bg-white
        border
        border-slate-200
        rounded-xl
        shadow-sm
        p-3
        sm:p-4
        hover:shadow-md
        transition-all
        duration-300
        h-full
      "
    >
      {/* HEADER */}

      <div className="flex items-center gap-2 mb-3">
        <UserRound size={15} className="text-blue-600 shrink-0" />

        <h3 className="text-[13px] sm:text-[14px] font-semibold text-blue-600">
          You (Mentee)
        </h3>
      </div>

      {/* BODY */}

      <div className="flex flex-col min-[420px]:flex-row gap-3 sm:gap-4 items-start min-h-[180px]">
        {/* PROFILE IMAGE */}

        <img
          src={studentImage}
          alt={student.fullName || "Student"}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = profile;
          }}
          className="
            w-14
            h-14
            sm:w-16
            sm:h-16
            rounded-full
            object-cover
            border
            border-slate-200
            shrink-0
          "
        />

        {/* STUDENT DETAILS */}

        <div className="flex-1 min-w-0 w-full flex flex-col">
          {/* NAME */}

          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h2 className="text-[15px] sm:text-[16px] font-bold text-[#142970] leading-tight break-words">
              {student.fullName || "Name unavailable"}
            </h2>

            <span className="px-2 py-[2px] rounded-full bg-blue-100 text-blue-700 text-[9px] font-medium shrink-0">
              Mentee
            </span>
          </div>

          {/* PROGRAMME */}

          <div className="flex items-start gap-1.5 text-[11px] text-slate-500 mt-2 min-w-0">
            <GraduationCap
              size={13}
              className="shrink-0 mt-0.5"
            />

            <span className="break-words min-w-0">
              {student.programme || "Programme not available"}
            </span>
          </div>

          {/* SEMESTER AND REGISTER NUMBER */}

          <p className="text-[11px] text-slate-500 leading-5 break-words">
            {student.semester
              ? `Semester ${student.semester}`
              : "Semester not available"}

            {student.registerNumber && (
              <>
                {" "}•{" "}
                Reg. No. {student.registerNumber}
              </>
            )}
          </p>

          {/* DEPARTMENT */}

          <div className="flex items-start gap-1.5 text-[11px] text-slate-500 min-w-0">
            <Building2
              size={12}
              className="shrink-0 mt-0.5"
            />

            <span className="break-words min-w-0">
              {department}
            </span>
          </div>

          {/* CONTACT DETAILS */}

          <div className="mt-3 space-y-2 min-w-0">
            {student.email && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600 min-w-0">
                <Mail
                  size={13}
                  className="shrink-0"
                />

                <span
                  className="truncate min-w-0"
                  title={student.email}
                >
                  {student.email}
                </span>
              </div>
            )}

            {student.phone && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600 min-w-0">
                <Phone
                  size={13}
                  className="shrink-0"
                />

                <span
                  className="truncate min-w-0"
                  title={student.phone}
                >
                  {student.phone}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeCard;
