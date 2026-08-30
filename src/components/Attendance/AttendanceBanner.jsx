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
| Semester Data
|--------------------------------------------------------------------------
| Semester VII = Current Semester
| Semester VIII = Next Semester
|--------------------------------------------------------------------------
*/

const SEMESTER_DATA = {
  1: {
    semester: "Semester I",
    academicYear: "2022 - 2023 (Odd)",
    attendance: 91,
    attended: 286,
    held: 314,
    mentor: "Dr. Arjun Sharma",
    standing: "Excellent",
  },

  2: {
    semester: "Semester II",
    academicYear: "2022 - 2023 (Even)",
    attendance: 92,
    attended: 301,
    held: 327,
    mentor: "Dr. Arjun Sharma",
    standing: "Excellent",
  },

  3: {
    semester: "Semester III",
    academicYear: "2023 - 2024 (Odd)",
    attendance: 89,
    attended: 292,
    held: 328,
    mentor: "Dr. Arjun Sharma",
    standing: "Good",
  },

  4: {
    semester: "Semester IV",
    academicYear: "2023 - 2024 (Even)",
    attendance: 93,
    attended: 315,
    held: 339,
    mentor: "Dr. Arjun Sharma",
    standing: "Excellent",
  },

  5: {
    semester: "Semester V",
    academicYear: "2024 - 2025 (Odd)",
    attendance: 94,
    attended: 324,
    held: 344,
    mentor: "Dr. Arjun Sharma",
    standing: "Excellent",
  },

  6: {
    semester: "Semester VI",
    academicYear: "2024 - 2025 (Even)",
    attendance: 92,
    attended: 318,
    held: 346,
    mentor: "Dr. Arjun Sharma",
    standing: "Excellent",
  },

  7: {
    semester: "Semester VII",
    academicYear: "2025 - 2026 (Odd)",
    attendance: 94,
    attended: 324,
    held: 344,
    mentor: "Dr. Arjun Sharma",
    standing: "Excellent",
  },

  8: {
    semester: "Semester VIII",
    academicYear: "2025 - 2026 (Even)",
    attendance: 94,
    attended: 324,
    held: 344,
    mentor: "Dr. Arjun Sharma",
    standing: "Excellent",
  },
};

/*
|--------------------------------------------------------------------------
| Semester Configuration
|--------------------------------------------------------------------------
*/

const CURRENT_SEMESTER = 7;
const NEXT_SEMESTER = 8;

const SEMESTERS = Object.keys(SEMESTER_DATA).map(Number);

const AttendanceBanner = ({ selectedSemester, onSemesterChange }) => {
  /*
   * If Attendance.jsx passes a selected semester,
   * that value controls the banner.
   *
   * Otherwise the banner defaults to Semester VII.
   */
  const [internalSemester, setInternalSemester] = useState(CURRENT_SEMESTER);

  const activeSemester = selectedSemester ?? internalSemester;

  const semesterData =
    SEMESTER_DATA[activeSemester] || SEMESTER_DATA[CURRENT_SEMESTER];

  /*
   |--------------------------------------------------------------------------
   | Handle Semester Selection
   |--------------------------------------------------------------------------
   */

  const handleSemesterChange = (semesterNumber) => {
    // Semester VII and VIII cannot be selected manually.
    if (
      semesterNumber === CURRENT_SEMESTER ||
      semesterNumber === NEXT_SEMESTER
    ) {
      return;
    }

    if (onSemesterChange) {
      onSemesterChange(semesterNumber);
    } else {
      setInternalSemester(semesterNumber);
    }
  };

  /*
   |--------------------------------------------------------------------------
   | Roman Numerals
   |--------------------------------------------------------------------------
   */

  const semesterRoman = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-7 py-5">
      <div className="flex justify-between items-center gap-6">
        {/* ================================================================
            LEFT SECTION
        ================================================================= */}

        <div className="flex items-center gap-6 min-w-0">
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

            <h2 className="text-[16px] font-semibold text-[#142970]">
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

              <span>{semesterData.semester}</span>
            </div>

            {/* ==========================================================
                ATTENDANCE STATISTICS
            ========================================================== */}

            <div className="flex items-center gap-10 mt-5">
              {/* --------------------------------------------------------
                  Overall Attendance
              -------------------------------------------------------- */}

              <Info
                icon={<ShieldCheck size={16} />}
                title="Overall Attendance"
                value={`${semesterData.attendance}%`}
              />

              {/* --------------------------------------------------------
                  Classes Attended
              -------------------------------------------------------- */}

              <Info
                icon={<CalendarCheck2 size={16} />}
                title="Classes Attended"
                value={semesterData.attended}
              />

              {/* --------------------------------------------------------
                  Classes Held
              -------------------------------------------------------- */}

              <Info
                icon={<CalendarDays size={16} />}
                title="Classes Held"
                value={semesterData.held}
              />

              {/* --------------------------------------------------------
                  Mentor
              -------------------------------------------------------- */}

              <Info
                icon={<UserRound size={16} />}
                title="Mentor"
                value={semesterData.mentor}
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
                    ${
                      semesterData.standing === "Excellent"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  `}
                >
                  {semesterData.standing}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            RIGHT SECTION
        ================================================================= */}

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
              onChange={(event) =>
                handleSemesterChange(Number(event.target.value))
              }
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
              {SEMESTERS.map((semesterNumber) => {
                const isCurrent = semesterNumber === CURRENT_SEMESTER;

                const isNext = semesterNumber === NEXT_SEMESTER;

                return (
                  <option
                    key={semesterNumber}
                    value={semesterNumber}
                    disabled={isCurrent || isNext}
                  >
                    Semester {semesterRoman[semesterNumber]}
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
