import React, { useState } from "react";

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

/*
|--------------------------------------------------------------------------
| Semester Configuration
|--------------------------------------------------------------------------
|
| Semester VII = Current Semester
| Semester VIII = Next Semester
|
| Semester I - VI remain selectable.
|
*/

const CURRENT_SEMESTER = 7;
const NEXT_SEMESTER = 8;

const SEMESTERS = [
  {
    number: 1,
    roman: "I",
    academicYear: "2022 - 2023",
    term: "Odd",
  },
  {
    number: 2,
    roman: "II",
    academicYear: "2022 - 2023",
    term: "Even",
  },
  {
    number: 3,
    roman: "III",
    academicYear: "2023 - 2024",
    term: "Odd",
  },
  {
    number: 4,
    roman: "IV",
    academicYear: "2023 - 2024",
    term: "Even",
  },
  {
    number: 5,
    roman: "V",
    academicYear: "2024 - 2025",
    term: "Odd",
  },
  {
    number: 6,
    roman: "VI",
    academicYear: "2024 - 2025",
    term: "Even",
  },
  {
    number: 7,
    roman: "VII",
    academicYear: "2025 - 2026",
    term: "Odd",
  },
  {
    number: 8,
    roman: "VIII",
    academicYear: "2025 - 2026",
    term: "Even",
  },
];

/*
|--------------------------------------------------------------------------
| Attendance Banner
|--------------------------------------------------------------------------
*/

const AttendanceBanner = ({
  selectedSemester,
  onSemesterChange,
  attendanceData,
}) => {
  /*
  |--------------------------------------------------------------------------
  | Internal Semester
  |--------------------------------------------------------------------------
  |
  | Attendance.jsx normally controls the semester.
  | Internal state is only a fallback.
  |
  */

  const [internalSemester, setInternalSemester] = useState(CURRENT_SEMESTER);

  const activeSemester = selectedSemester ?? internalSemester;

  /*
  |--------------------------------------------------------------------------
  | Semester Information
  |--------------------------------------------------------------------------
  */

  const semesterInfo =
    SEMESTERS.find((semester) => semester.number === activeSemester) ||
    SEMESTERS.find((semester) => semester.number === CURRENT_SEMESTER);

  /*
  |--------------------------------------------------------------------------
  | Backend Attendance Data
  |--------------------------------------------------------------------------
  */

  const summary = attendanceData?.summary || {};

  const classesAttended = Number(summary.classesAttended) || 0;

  const classesHeld = Number(summary.classesHeld) || 0;

  /*
  |--------------------------------------------------------------------------
  | Attendance Percentage
  |--------------------------------------------------------------------------
  |
  | The backend already calculates this.
  | We use the backend value when available.
  |
  */

  const backendPercentage = Number(summary.percentage);

  const calculatedPercentage =
    classesHeld > 0 ? (classesAttended / classesHeld) * 100 : 0;

  const attendancePercentage = Number.isFinite(backendPercentage)
    ? backendPercentage
    : calculatedPercentage;

  /*
  |--------------------------------------------------------------------------
  | Academic Standing
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Semester Selection
  |--------------------------------------------------------------------------
  */

  const handleSemesterChange = (event) => {
    const semesterNumber = Number(event.target.value);

    /*
     * VII and VIII are locked.
     */

    if (
      semesterNumber === CURRENT_SEMESTER ||
      semesterNumber === NEXT_SEMESTER
    ) {
      return;
    }

    /*
     * If Attendance.jsx controls the
     * semester, notify the parent.
     */

    if (onSemesterChange) {
      onSemesterChange(semesterNumber);
    } else {
      /*
       * Fallback for standalone usage.
       */

      setInternalSemester(semesterNumber);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

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
        {/* ==============================================================
            LEFT SECTION
        ============================================================== */}

        <div
          className="
            flex
            items-center
            gap-6
            min-w-0
          "
        >
          {/* ------------------------------------------------------------
              Profile
          ------------------------------------------------------------ */}

          <img
            src={profile}
            alt="Profile"
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

          {/* ------------------------------------------------------------
              Student Details
          ------------------------------------------------------------ */}

          <div className="min-w-0">
            {/* Student Name */}

            <h2
              className="
                text-[16px]
                font-semibold
                text-[#142970]
              "
            >
              Sudhanshu Sreedhara Belavarthy
            </h2>

            {/* Student Information */}

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
              <span>2362177</span>

              <span>•</span>

              <span>B.Tech - AI & Data Science Engineering</span>

              <span>•</span>

              <span>{semesterInfo.semester}</span>
            </div>

            {/* ==========================================================
                ATTENDANCE STATISTICS
            ========================================================== */}

            <div
              className="
                flex
                items-center
                gap-10
                mt-5
              "
            >
              {/* --------------------------------------------------------
                  Overall Attendance
              -------------------------------------------------------- */}

              <Info
                icon={<ShieldCheck size={16} />}
                title="Overall Attendance"
                value={`${attendancePercentage.toFixed(2)}%`}
              />

              {/* --------------------------------------------------------
                  Classes Attended
              -------------------------------------------------------- */}

              <Info
                icon={<CalendarCheck2 size={16} />}
                title="Classes Attended"
                value={classesAttended}
              />

              {/* --------------------------------------------------------
                  Classes Held
              -------------------------------------------------------- */}

              <Info
                icon={<CalendarDays size={16} />}
                title="Classes Held"
                value={classesHeld}
              />

              {/* --------------------------------------------------------
                  Mentor
              -------------------------------------------------------- */}

              <Info
                icon={<UserRound size={16} />}
                title="Mentor"
                value="Dr. Arjun Sharma"
                blue
              />

              {/* --------------------------------------------------------
                  Academic Standing
              -------------------------------------------------------- */}

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

        {/* ==============================================================
            RIGHT SECTION
        ============================================================== */}

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
          {/* Label */}

          <p
            className="
              text-[12px]
              text-slate-500
              mb-3
            "
          >
            Attendance for
          </p>

          {/* ------------------------------------------------------------
              Semester Dropdown
          ------------------------------------------------------------ */}

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
              {SEMESTERS.map((semester) => {
                const isCurrent = semester.number === CURRENT_SEMESTER;

                const isNext = semester.number === NEXT_SEMESTER;

                return (
                  <option
                    key={semester.number}
                    value={semester.number}
                    disabled={isCurrent || isNext}
                  >
                    Semester {semester.roman}
                    {isCurrent
                      ? " • Current Semester"
                      : isNext
                        ? " • Locked"
                        : ""}
                  </option>
                );
              })}
            </select>

            {/* Dropdown Arrow */}

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

          {/* ------------------------------------------------------------
              Lock Information
          ------------------------------------------------------------ */}

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
              Semesters VII & VIII are locked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Reusable Information Component
|--------------------------------------------------------------------------
*/

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
