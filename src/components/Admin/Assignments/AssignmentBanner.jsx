import React from "react";
import { CalendarDays } from "lucide-react";

const AssignmentBanner = ({ onChangeTerm }) => {
  return (
    <div className="flex w-full items-start justify-between">
      {/* ============================================================
          LEFT CONTENT
          ============================================================ */}

      <div className="pt-1">
        <h1
          className="
            text-[26px]
            font-bold
            leading-7
            tracking-tight
            text-slate-900
          "
        >
          Assign Students to Mentors
        </h1>

        <p
          className="
            mt-1.5
            text-[11px]
            font-medium
            leading-5
            text-slate-500
          "
        >
          Assign students to available mentors for Odd Semester 2026
          (3rd Year, All Sections)
        </p>
      </div>

      {/* ============================================================
          CURRENT TERM CARD
          ============================================================ */}

      <div
        className="
          flex
          h-[72px]
          w-[338px]
          shrink-0
          items-center
          justify-between
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          shadow-sm
        "
      >
        {/* ================= Term Information ================= */}

        <div className="flex items-center gap-3">
          {/* Calendar */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-50
              text-slate-500
            "
          >
            <CalendarDays
              size={18}
              strokeWidth={1.8}
            />
          </div>

          {/* Text */}

          <div className="flex flex-col">
            <span
              className="
                text-[9px]
                font-medium
                leading-4
                text-slate-400
              "
            >
              Current Term
            </span>

            <span
              className="
                text-[12px]
                font-bold
                leading-4
                text-slate-800
              "
            >
              Odd Semester 2026
            </span>

            <span
              className="
                text-[9px]
                font-medium
                leading-4
                text-slate-400
              "
            >
              Jul 15, 2026 - Dec 20, 2026
            </span>
          </div>
        </div>

        {/* ================= Change Term ================= */}

        <button
          type="button"
          onClick={onChangeTerm}
          className="
            flex
            h-10
            min-w-[116px]
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-blue-100
            bg-white
            px-4
            text-[10px]
            font-semibold
            text-blue-600
            transition-all
            duration-200
            hover:border-blue-300
            hover:bg-blue-50
            active:scale-[0.98]
          "
        >
          <CalendarDays
            size={14}
            strokeWidth={2}
          />

          <span>Change Term</span>
        </button>
      </div>
    </div>
  );
};

export default AssignmentBanner;