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
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        px-7
        py-5
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
          gap-6
        "
      >
        {/* ====================================================
            STUDENT INFORMATION
        ==================================================== */}

        <div
          className="
            flex
            items-center
            gap-6
            min-w-0
          "
        >
          {/* ==================================================
              PROFILE IMAGE
          ================================================== */}

          <img
            src={profileImage}
            alt={studentName}
            onError={(event) => {
              event.currentTarget.src = profile;
            }}
            className="
              w-[88px]
              h-[88px]
              rounded-full
              border-4
              border-slate-100
              object-cover
              flex-shrink-0
            "
          />

          <div className="min-w-0">
            {/* ==================================================
                STUDENT NAME
            ================================================== */}

            <h2
              className="
                text-[16px]
                font-semibold
                text-[#142970]
              "
            >
              {studentName}
            </h2>

            {/* ==================================================
                STUDENT DETAILS
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-3
                mt-1
                text-[12px]
                text-slate-500
                whitespace-nowrap
              "
            >
              <span>{registerNumber}</span>

              <span>•</span>

              <span>{programme}</span>

              <span>•</span>

              <span>Semester {ROMAN[activeSemester] || activeSemester}</span>
            </div>

            {/* ==================================================
                ATTENDANCE INFORMATION
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-10
                mt-5
              "
            >
              {/* =================================================
                  OVERALL ATTENDANCE
              ================================================= */}

              <Info
                icon={<ShieldCheck size={16} />}
                title="Overall Attendance"
                value={`${attendancePercentage.toFixed(2)}%`}
              />

              {/* =================================================
                  CLASSES ATTENDED
              ================================================= */}

              <Info
                icon={<CalendarCheck2 size={16} />}
                title="Classes Attended"
                value={classesAttended}
              />

              {/* =================================================
                  CLASSES HELD
              ================================================= */}

              <Info
                icon={<CalendarDays size={16} />}
                title="Classes Held"
                value={classesHeld}
              />

              {/* =================================================
                  MENTOR
              ================================================= */}

              <Info
                icon={<UserRound size={16} />}
                title="Mentor"
                value={mentorName}
                blue
              />

              {/* =================================================
                  ACADEMIC STANDING
              ================================================= */}

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[12px]
                    text-slate-500
                  "
                >
                  <BadgeCheck size={16} className="text-blue-600" />

                  <span>Academic Standing</span>
                </div>

                <span
                  className={`
                    inline-block
                    mt-2
                    px-2
                    py-1
                    rounded-full
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

        <div
          className="
            border
            border-slate-200
            rounded-xl
            px-4
            py-3
            w-[240px]
            flex-shrink-0
          "
        >
          {/* ==================================================
              LABEL
          ================================================== */}

          <p
            className="
              text-[12px]
              text-slate-500
              mb-3
            "
          >
            Attendance for
          </p>

          {/* ==================================================
              SELECT
          ================================================== */}

          <div className="relative">
            <select
              value={activeSemester}
              onChange={handleSemesterChange}
              className="
                appearance-none
                w-full
                border
                border-slate-300
                rounded-lg
                px-3
                py-2
                pr-9
                text-[13px]
                font-medium
                text-slate-700
                bg-white
                outline-none
                cursor-pointer
                focus:border-blue-500
                focus:ring-1
                focus:ring-blue-100
              "
            >
              {semesterNumbers.map((semester) => {
                const isCurrent = semester === currentSemester;

                const isFuture = semester > currentSemester;

                const isLocked = semester >= currentSemester;

                return (
                  <option key={semester} value={semester} disabled={isLocked}>
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
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-500
                pointer-events-none
              "
            />
          </div>

          {/* ==================================================
              LOCK MESSAGE
          ================================================== */}

          <div
            className="
              flex
              items-center
              gap-1.5
              mt-2
            "
          >
            <LockKeyhole size={11} className="text-slate-400" />

            <span
              className="
                text-[10px]
                text-slate-400
              "
            >
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
    <div className="min-w-[105px]">
      <div
        className="
          flex
          items-center
          gap-2
          text-[12px]
          text-slate-500
        "
      >
        <div className="text-blue-600">{icon}</div>

        <span>{title}</span>
      </div>

      <p
        className={`
          mt-2
          text-[14px]
          font-semibold
          ${blue ? "text-blue-600" : "text-[#142970]"}
        `}
      >
        {value}
      </p>
    </div>
  );
};

export default AttendanceBanner;
