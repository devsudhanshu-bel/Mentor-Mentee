
import React from "react";

import {
  ShieldCheck,
  CalendarCheck2,
  CalendarDays,
  UserRound,
  BadgeCheck,
  ChevronDown,
  LockKeyhole,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

/* ==========================================================
   ROMAN NUMERALS
========================================================== */

const ROMAN = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
};

/* ==========================================================
   ALL SEMESTERS
   Always show I - VIII regardless of DB records.
========================================================== */

const semesterNumbers = Array.from({ length: 8 }, (_, index) => index + 1);

/* ==========================================================
   ATTENDANCE BANNER
========================================================== */

const AttendanceBanner = ({
  selectedSemester,
  onSemesterChange,
  attendanceData,
}) => {
  /* ==========================================================
     BACKEND STUDENT
  ========================================================== */

  const student = attendanceData?.student || {};

  /* ==========================================================
     CURRENT SEMESTER
  ========================================================== */

  const currentSemester = Number(attendanceData?.currentSemester) || 1;

  /* ==========================================================
     SELECTED SEMESTER
  ========================================================== */

  const activeSemester = Number(selectedSemester) || currentSemester;

  /* ==========================================================
     SUMMARY
     This always belongs to the selected semester.
  ========================================================== */

  const summary = attendanceData?.summary || {};

  const classesAttended = Number(summary.classesAttended) || 0;

  const classesHeld = Number(summary.classesHeld) || 0;

  const backendPercentage = Number(summary.percentage);

  const attendancePercentage = Number.isFinite(backendPercentage)
    ? backendPercentage
    : classesHeld > 0
      ? (classesAttended / classesHeld) * 100
      : 0;

  /* ==========================================================
     ACADEMIC STANDING
     Based on selected semester.
  ========================================================== */

  let standing = "No Data";

  let standingClass = "bg-slate-100 text-slate-500";

  if (classesHeld > 0) {
    if (attendancePercentage < 75) {
      standing = "Needs Attention";
      standingClass = "bg-red-100 text-red-700";
    } else if (attendancePercentage < 85) {
      standing = "Good";
      standingClass = "bg-orange-100 text-orange-700";
    } else {
      standing = "Excellent";
      standingClass = "bg-green-100 text-green-700";
    }
  }

  /* ==========================================================
     SEMESTER CHANGE
  ========================================================== */

  const handleSemesterChange = (event) => {
    const semester = Number(event.target.value);

    if (!Number.isInteger(semester)) {
      return;
    }

    /*
     * Current semester and every
     * semester after it are locked.
     */

    if (semester >= currentSemester) {
      return;
    }

    if (onSemesterChange) {
      onSemesterChange(semester);
    }
  };

  /* ==========================================================
     STUDENT DISPLAY DATA
  ========================================================== */

  const studentName = student?.fullName || "Student";

  const registerNumber = student?.registerNumber || "—";

  const programme = student?.programme || "Programme not available";

  const mentorName =
    student?.mentor?.fullName ||
    attendanceData?.mentor?.fullName ||
    "Not Assigned";

  const profileImage = student?.profileImage || profile;

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6 lg:px-6">

      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <div className="flex min-w-0 flex-col gap-5 xl:flex-row xl:items-center xl:justify-between xl:gap-6">

        {/* ==================================================
            STUDENT INFORMATION
        ================================================== */}

        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">

          {/* ==================================================
              PROFILE IMAGE
          ================================================== */}

          <div className="flex shrink-0 items-center sm:items-start">
            <img
              src={profileImage}
              alt={studentName}
              onError={(event) => {
                event.currentTarget.src = profile;
              }}
              className="h-[68px] w-[68px] rounded-full border-4 border-slate-100 object-cover sm:h-[78px] sm:w-[78px] lg:h-[88px] lg:w-[88px]"
            />
          </div>

          {/* ==================================================
              STUDENT DETAILS
          ================================================== */}

          <div className="min-w-0 flex-1">

            {/* Student Name */}

            <h2 className="break-words text-base font-semibold text-[#142970] sm:text-lg">
              {studentName}
            </h2>

            {/* Student Information */}

            <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 sm:gap-x-3">
              <span className="break-all">
                {registerNumber}
              </span>

              <span className="hidden text-slate-300 sm:inline">•</span>

              <span className="break-words">
                {programme}
              </span>

              <span className="hidden text-slate-300 sm:inline">•</span>

              <span className="whitespace-nowrap">
                Semester {ROMAN[activeSemester] || activeSemester}
              </span>
            </div>

            {/* ==================================================
                ATTENDANCE INFORMATION
            ================================================== */}

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-6">

              {/* Overall Attendance */}

              <Info
                icon={<ShieldCheck size={16} />}
                title="Overall Attendance"
                value={`${attendancePercentage.toFixed(2)}%`}
              />

              {/* Classes Attended */}

              <Info
                icon={<CalendarCheck2 size={16} />}
                title="Classes Attended"
                value={classesAttended}
              />

              {/* Classes Held */}

              <Info
                icon={<CalendarDays size={16} />}
                title="Classes Held"
                value={classesHeld}
              />

              {/* Mentor */}

              <Info
                icon={<UserRound size={16} />}
                title="Mentor"
                value={mentorName}
                blue
              />

              {/* Academic Standing */}

              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <BadgeCheck
                    size={16}
                    className="shrink-0 text-blue-600"
                  />

                  <span>Academic Standing</span>
                </div>

                <span
                  className={`
                    mt-2
                    inline-block
                    max-w-full
                    rounded-full
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    ${standingClass}
                  `}
                >
                  {standing}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            SEMESTER SELECTOR
        ==================================================== */}

        <div className="w-full shrink-0 rounded-xl border border-slate-200 px-4 py-3 sm:px-5 xl:w-[240px]">

          {/* Label */}

          <p className="mb-3 text-xs font-medium text-slate-500">
            Attendance for
          </p>

          {/* Select */}

          <div className="relative">
            <select
              value={activeSemester}
              onChange={handleSemesterChange}
              className="
                w-full
                appearance-none
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                py-2.5
                pr-9
                text-xs
                font-medium
                text-slate-700
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                sm:text-sm
              "
            >
              {semesterNumbers.map((semester) => {
                const isCurrent = semester === currentSemester;

                const isFuture = semester > currentSemester;

                const isLocked = semester >= currentSemester;

                return (
                  <option
                    key={semester}
                    value={semester}
                    disabled={isLocked}
                  >
                    Semester {ROMAN[semester] || semester}
                    {isCurrent
                      ? " • Current • Locked"
                      : isFuture
                        ? " • Locked"
                        : ""}
                  </option>
                );
              })}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          {/* Lock Message */}

          <div className="mt-2 flex items-start gap-1.5">
            <LockKeyhole
              size={11}
              className="mt-0.5 shrink-0 text-slate-400"
            />

            <span className="text-[10px] leading-relaxed text-slate-400">
              Current and future semesters are locked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================
   INFO COMPONENT
========================================================== */

const Info = ({ icon, title, value, blue = false }) => {
  return (
    <div className="min-w-0">
      <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
        <div className="shrink-0 text-blue-600">
          {icon}
        </div>

        <span className="min-w-0 break-words leading-4">
          {title}
        </span>
      </div>

      <p
        className={`
          mt-2
          break-words
          text-sm
          font-semibold
          leading-snug
          ${blue ? "text-blue-600" : "text-[#142970]"}
        `}
      >
        {value}
      </p>
    </div>
  );
};

export default AttendanceBanner;
