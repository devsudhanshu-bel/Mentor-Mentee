import React, { useEffect, useState } from "react";

import {
  BadgeCheck,
  GraduationCap,
  CalendarDays,
  Mail,
  Phone,
  Trophy,
  UserRoundCheck,
  BookOpen,
  Camera,
} from "lucide-react";

import { getPersonalProfile } from "../../api/profile.api";

import profile from "../../assets/profile.jpg";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ========================================================
     LOAD PROFILE
  ======================================================== */

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await getPersonalProfile();

        /*
         * ApiResponse:
         *
         * response.data
         *
         * contains the actual profile.
         */

        if (mounted) {
          setUser(response?.data ?? null);
        }
      } catch (error) {
        console.error("Failed to fetch student profile:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  /* ========================================================
     DISPLAY VALUES
  ======================================================== */

  const fullName = user?.fullName || (loading ? "Loading..." : "Student");

  const profileImage = user?.profileImage || profile;

  const registerNumber = user?.registerNumber || "Not Available";

  const admissionNumber = user?.admissionNumber || "Not Available";

  const programme = user?.programme || "Not Available";

  const semester = user?.semester || "Not Available";

  const email = user?.email || "Not Available";

  const phone = user?.phoneNumber || "Not Available";

  const cgpa = user?.currentCGPA ?? "—";

  const mentor = user?.currentMentor || "Not Assigned";

  const academicStanding = user?.academicStanding || "Not Available";

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm px-7 py-5">
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* ==================================================
            LEFT
        ================================================== */}

        <div className="col-span-12 xl:col-span-8 flex items-center gap-5">
          {/* Profile */}

          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profileImage}
                alt={fullName}
                onError={(event) => {
                  event.currentTarget.src = profile;
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              aria-label="Change profile picture"
              className="
                absolute
                -bottom-1
                -right-1
                w-8
                h-8
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                shadow-md
                hover:bg-blue-700
                transition
              "
            >
              <Camera size={14} />
            </button>
          </div>

          {/* Student Information */}

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold text-slate-900">
                {fullName}
              </h1>

              <BadgeCheck
                size={17}
                className="text-blue-600 fill-blue-600 text-white"
              />
            </div>

            <p className="mt-2 text-[13px] text-slate-600">
              Reg. No.
              <span className="font-semibold text-slate-800">
                {" "}
                {registerNumber}
              </span>
              <span className="mx-3 text-slate-300">|</span>
              Adm. No.
              <span className="font-semibold text-slate-800">
                {" "}
                {admissionNumber}
              </span>
            </p>

            {/* Chips */}

            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
                <GraduationCap size={15} className="text-blue-600" />

                <span className="text-xs font-semibold">{programme}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
                <CalendarDays size={15} className="text-blue-600" />

                <span className="text-xs font-semibold">
                  Semester {semester}
                </span>
              </div>
            </div>

            {/* Contact */}

            <div className="flex flex-wrap gap-2 mt-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                <Mail size={15} className="text-blue-600" />

                <span className="text-xs">{email}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">
                <Phone size={15} className="text-blue-600" />

                <span className="text-xs">{phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            RIGHT
        ================================================== */}

        <div className="col-span-12 xl:col-span-4">
          <div className="rounded-2xl border border-slate-200 p-5 shadow-sm bg-white space-y-4">
            {/* CGPA */}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Trophy size={15} className="text-blue-600" />

                <span className="text-[13px] text-slate-600">Current CGPA</span>
              </div>

              <span className="text-lg font-bold text-blue-600">
                {cgpa}

                <span className="text-sm text-slate-400">/4</span>
              </span>
            </div>

            {/* Mentor */}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserRoundCheck size={15} className="text-blue-600" />

                <span className="text-[13px] text-slate-600">
                  Current Mentor
                </span>
              </div>

              <span className="text-xs font-semibold text-blue-600">
                {mentor}
              </span>
            </div>

            {/* Academic Standing */}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-blue-600" />

                <span className="text-[13px] text-slate-600">
                  Academic Standing
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">
                {academicStanding}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
