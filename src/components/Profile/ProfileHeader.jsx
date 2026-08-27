import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  GraduationCap,
  CalendarDays,
  Mail,
  Phone,
  Trophy,
  ClipboardCheck,
  UserRoundCheck,
  BookOpen,
  Camera,
} from "lucide-react";

import api from "../../api/axios";

import profile from "../../assets/profile.jpg";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/mentee/profile/personal");
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm px-7 py-5">
      <div className="grid grid-cols-12 gap-6 items-center">

        {/* ================= LEFT ================= */}

        <div className="col-span-12 xl:col-span-8 flex items-center gap-5">

          {/* Profile */}

          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={user?.profileImage || profile}
                alt={user?.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>

            <button
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
                {user?.fullName || "Loading..."}
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
                {user?.registerNumber}
              </span>

              <span className="mx-3 text-slate-300">
                |
              </span>

              Adm. No.

              <span className="font-semibold text-slate-800">
                {" "}
                {user?.admissionNumber}
              </span>

            </p>

            {/* Chips */}

            <div className="flex flex-wrap gap-2 mt-4">

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">

                <GraduationCap
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-xs font-semibold">
                  {user?.programme}
                </span>

              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">

                <CalendarDays
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-xs font-semibold">
                  Semester {user?.semester}
                </span>

              </div>

            </div>
                        {/* Contact */}

            <div className="flex flex-wrap gap-2 mt-3">

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">

                <Mail
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-xs">
                  {user?.email || "Not Available"}
                </span>

              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-slate-50">

                <Phone
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-xs">
                  {user?.phoneNumber || "Not Available"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="col-span-12 xl:col-span-4">

          <div className="rounded-2xl border border-slate-200 p-5 shadow-sm bg-white space-y-4">

            {/* CGPA */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2">

                <Trophy
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-[13px] text-slate-600">
                  Current CGPA
                </span>

              </div>

              <span className="text-lg font-bold text-blue-600">

                {user?.currentCGPA ?? "8.92"}

                <span className="text-sm text-slate-400">
                  /10
                </span>

              </span>

            </div>

            {/* Attendance */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2">

                <ClipboardCheck
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-[13px] text-slate-600">
                  Overall Attendance
                </span>

              </div>

              <span className="text-base font-bold text-green-600">

                {user?.overallAttendance ?? "94"}%

              </span>

            </div>

            {/* Mentor */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2">

                <UserRoundCheck
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-[13px] text-slate-600">
                  Current Mentor
                </span>

              </div>

              <span className="text-xs font-semibold text-blue-600">

                {user?.currentMentor || "Not Assigned"}

              </span>

            </div>

            {/* Academic Standing */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2">

                <BookOpen
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-[13px] text-slate-600">
                  Academic Standing
                </span>

              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">

                {user?.academicStanding || "Excellent"}

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;