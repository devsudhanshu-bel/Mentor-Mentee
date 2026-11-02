
import React from "react";
import {
  ClipboardCheck,
  UserRound,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const RelationshipSummary = ({ mentorData, loading = false }) => {
  // ==========================================================
  // LOADING STATE
  // ==========================================================

  if (loading) {
    return (
      <div className="w-full min-w-0 h-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardCheck
            size={16}
            className="shrink-0 text-blue-600"
          />

          <h3 className="text-[13px] font-semibold text-blue-600 sm:text-[14px]">
            Relationship Summary
          </h3>
        </div>

        <div className="animate-pulse space-y-4">
          <div className="h-4 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-200" />
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="h-4 w-3/4 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  // ==========================================================
  // ASSIGNMENT DATA
  // ==========================================================

  const assigned = mentorData?.assigned === true;

  const assignment = mentorData?.assignment;
  const relationship = mentorData?.relationship;

  const term = relationship?.term ?? assignment?.term;

  const mentorSince =
    relationship?.mentorSince ?? assignment?.assignedAt;

  const assignmentStatus =
    relationship?.assignmentStatus ?? assignment?.status;

  const semesterNumber = term?.semesterNumber;

  const termName =
    term?.name ||
    (semesterNumber ? `Semester ${semesterNumber}` : null);

  const items = [
    {
      icon: UserRound,
      label: "Mentor Since",
      value: assigned ? formatDate(mentorSince) : "Not assigned",
    },
    {
      icon: CalendarDays,
      label: "Current Term",
      value: assigned ? termName || "Not available" : "Not assigned",
    },
    {
      icon: ShieldCheck,
      label: "Assignment Status",
      value: assigned
        ? assignmentStatus || "Not available"
        : "Not assigned",
    },
    {
      icon: CalendarDays,
      label: "Term Ends",
      value: term?.endDate ? formatDate(term.endDate) : "Not available",
    },
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="
        w-full
        min-w-0
        h-full
        rounded-xl
        border
        border-slate-200
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
        sm:p-4
      "
    >
      {/* HEADER */}

      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <ClipboardCheck
          size={16}
          className="shrink-0 text-blue-600"
        />

        <h3 className="text-[13px] font-semibold text-blue-600 sm:text-[14px]">
          Relationship Summary
        </h3>
      </div>

      {/* DETAILS */}

      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                flex
                min-w-0
                flex-col
                gap-1.5
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-3
              "
            >
              {/* LABEL */}

              <div className="flex min-w-0 items-center gap-2 text-slate-600">
                <Icon
                  size={15}
                  className="shrink-0 text-slate-500"
                />

                <span className="text-[11px] sm:text-[12px]">
                  {item.label}
                </span>
              </div>

              {/* VALUE */}

              <span
                className="
                  min-w-0
                  break-words
                  pl-[23px]
                  text-left
                  text-[11px]
                  font-semibold
                  text-slate-700
                  sm:pl-0
                  sm:text-right
                  sm:text-[12px]
                "
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* INFORMATION */}

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-[10px] leading-4 text-slate-400">
          Assignment information is based on your current mentor record.
        </p>
      </div>
    </div>
  );
};

export default RelationshipSummary;
