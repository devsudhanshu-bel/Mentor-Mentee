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
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
        <div className="flex items-center gap-2 mb-5">
          <ClipboardCheck size={16} className="text-blue-600" />

          <h3 className="text-[14px] font-semibold text-blue-600">
            Relationship Summary
          </h3>
        </div>

        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-4 bg-slate-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  const assigned = mentorData?.assigned === true;

  const relationship = mentorData?.relationship;

  const items = [
    {
      icon: <UserRound size={15} />,
      label: "Mentor Since",
      value: assigned ? formatDate(relationship?.mentorSince) : "Not assigned",
    },

    {
      icon: <CalendarDays size={15} />,
      label: "Current Term",
      value:
        relationship?.term?.name || relationship?.term?.semesterNumber
          ? `Semester ${relationship.term.semesterNumber}`
          : "Not available",
    },

    {
      icon: <ShieldCheck size={15} />,
      label: "Assignment Status",
      value: relationship?.assignmentStatus || "Not assigned",
    },

    {
      icon: <CalendarDays size={15} />,
      label: "Term Ends",
      value: relationship?.term?.endDate
        ? formatDate(relationship.term.endDate)
        : "Not available",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <ClipboardCheck size={16} className="text-blue-600" />

        <h3 className="text-[14px] font-semibold text-blue-600">
          Relationship Summary
        </h3>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-600">
              {item.icon}

              <span className="text-[12px]">{item.label}</span>
            </div>

            <span className="text-[12px] font-semibold text-slate-700 text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Information */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-[10px] leading-4 text-slate-400">
          Assignment information is based on your current mentor record.
        </p>
      </div>
    </div>
  );
};

export default RelationshipSummary;
