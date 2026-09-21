import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CalendarDays,
  ArrowRight,
  UserRound,
} from "lucide-react";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  /* ==========================================================
     STATUS STYLING
  ========================================================== */

  const getStatusClasses = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";

      case "INVITED":
        return "bg-blue-100 text-blue-700";

      case "DETAINED":
        return "bg-amber-100 text-amber-700";

      case "GRADUATED":
        return "bg-violet-100 text-violet-700";

      case "INACTIVE":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  /* ==========================================================
     STATUS LABEL
  ========================================================== */

  const getStatusLabel = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Active";

      case "INVITED":
        return "Invited";

      case "DETAINED":
        return "Detained";

      case "GRADUATED":
        return "Graduated";

      case "INACTIVE":
        return "Inactive";

      default:
        return "Unknown";
    }
  };

  /* ==========================================================
     ASSIGNED DATE
  ========================================================== */

  const formattedAssignedDate = student.assignedAt
    ? new Date(student.assignedAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "Not available";

  /* ==========================================================
     OPEN STUDENT DASHBOARD
  ========================================================== */

  const handleOpenDashboard = () => {
    navigate(
      `/mentor/students/${student.studentId}/overview`
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

      {/* ======================================================
          TOP SECTION
      ====================================================== */}

      <div className="p-4">

        {/* Profile + Status */}

        <div className="flex items-start justify-between gap-3">

          {/* Profile Image */}

          {student.profileImage ? (
            <img
              src={student.profileImage}
              alt={student.name}
              className="h-14 w-14 rounded-full border-2 border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-100">
              <UserRound
                size={25}
                className="text-slate-400"
              />
            </div>
          )}

          {/* Student Status */}

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
              student.status
            )}`}
          >
            {getStatusLabel(student.status)}
          </span>
        </div>

        {/* ==================================================
            STUDENT NAME
        ================================================== */}

        <h3 className="mt-3 text-[15px] font-semibold text-slate-900">
          {student.name || "Unnamed Student"}
        </h3>

        {/* ==================================================
            REGISTER NUMBER
        ================================================== */}

        <p className="mt-0.5 text-[12px] text-slate-500">
          {student.registerNumber ||
            "Register number unavailable"}
        </p>

        {/* ==================================================
            PROGRAMME
        ================================================== */}

        <div className="mt-3 flex items-start gap-2 text-[12px] text-slate-600">
          <GraduationCap
            size={14}
            className="mt-0.5 shrink-0"
          />

          <span>
            {student.programme ||
              "Programme unavailable"}
          </span>
        </div>
      </div>

      {/* ======================================================
          ACADEMIC INFORMATION
      ====================================================== */}

      <div className="grid grid-cols-2 border-y border-slate-200">

        {/* ====================================================
            CURRENT CGPA
        ==================================================== */}

        <div className="py-3 text-center">
          <p className="text-[11px] text-slate-500">
            Current CGPA
          </p>

          <p className="mt-1 text-[16px] font-semibold text-slate-800">
            {student.currentCGPA !== null &&
            student.currentCGPA !== undefined
              ? Number(
                  student.currentCGPA
                ).toFixed(2)
              : "—"}
          </p>
        </div>

        {/* ====================================================
            SEMESTER
        ==================================================== */}

        <div className="border-l border-slate-200 py-3 text-center">
          <p className="text-[11px] text-slate-500">
            Semester
          </p>

          <p className="mt-1 text-[16px] font-semibold text-slate-800">
            {student.semester
              ? student.semester
              : "—"}
          </p>
        </div>
      </div>

      {/* ======================================================
          BOTTOM SECTION
      ====================================================== */}

      <div className="space-y-3 p-4">

        {/* ====================================================
            ASSIGNED DATE
        ==================================================== */}

        <div className="flex items-center gap-2 text-[12px] text-slate-500">
          <CalendarDays size={14} />

          <span>
            Assigned • {formattedAssignedDate}
          </span>
        </div>

        {/* ====================================================
            OPEN DASHBOARD
        ==================================================== */}

        <button
          type="button"
          onClick={handleOpenDashboard}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-[13px] font-medium text-white transition hover:bg-blue-700"
        >
          Open Dashboard

          <ArrowRight size={15} />
        </button>

        {/* ====================================================
            SCHEDULE MEETING
        ==================================================== */}

        <button
          type="button"
          className="flex h-9 w-full items-center justify-center rounded-lg border border-slate-300 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
};

export default StudentCard;