
import React from "react";
import {
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
  Eye,
  ArrowRight,
} from "lucide-react";

import InternshipJourney from "./InternshipJourney";

const formatDate = (value) => {
  if (!value) return "Not specified";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not specified";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StatusBadge = ({ status }) => {
  const config = {
    ONGOING: ["Ongoing", "bg-blue-50 text-blue-700"],
    PENDING_INITIAL_VERIFICATION: [
      "Awaiting Verification",
      "bg-amber-50 text-amber-700",
    ],
    PENDING_COMPLETION_VERIFICATION: [
      "Completion Review",
      "bg-purple-50 text-purple-700",
    ],
    COMPLETED: ["Completed", "bg-green-50 text-green-700"],
    CANCELLED: ["Cancelled", "bg-slate-100 text-slate-600"],
  };

  const [label, style] = config[status] || [
    "Pending",
    "bg-slate-100 text-slate-600",
  ];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
};

const CurrentInternship = ({ internship, onView }) => {
  if (!internship) {
    return (
      <section className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
          <Building2 size={28} />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          No current internship
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Create an internship record to begin tracking mentor verification,
          documents, and completion.
        </p>
      </section>
    );
  }

  const duration =
    internship.startDate && internship.endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(internship.endDate) - new Date(internship.startDate)) /
              (1000 * 60 * 60 * 24 * 30.4375)
          )
        )
      : null;

  const details = [
    {
      label: "Start Date",
      value: formatDate(internship.startDate),
      Icon: CalendarDays,
    },
    {
      label: "End Date",
      value: formatDate(internship.endDate),
      Icon: CalendarDays,
    },
    {
      label: "Duration",
      value: duration ? `${duration} month(s)` : "Not specified",
      Icon: Clock3,
    },
    {
      label: "Location",
      value: internship.location || "Not specified",
      Icon: MapPin,
    },
    {
      label: "Mode",
      value: internship.mode || "Not specified",
      Icon: Monitor,
    },
  ];

  const mentorRemark =
    internship.completionVerificationStatus === "REJECTED"
      ? internship.completionMentorRemark
      : internship.mentorRemark;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            Current Internship
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Your internship details and verification progress
          </p>
        </div>

        <StatusBadge status={internship.status} />
      </header>

      <div className="space-y-5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-700">
            <Building2 size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-[#142970]">
              {internship.companyName}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {internship.internshipTitle}
            </p>
            {internship.role && (
              <p className="mt-1 text-xs text-slate-400">
                {internship.role}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {details.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Icon size={15} />
                <span className="text-xs">{label}</span>
              </div>
              <p className="mt-2 break-words text-sm font-semibold text-slate-700">
                {value}
              </p>
            </div>
          ))}
        </div>

        <InternshipJourney internship={internship} />

        {internship.description && (
          <div>
            <h4 className="text-sm font-semibold text-slate-800">
              Internship Description
            </h4>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">
              {internship.description}
            </p>
          </div>
        )}

        {mentorRemark && (
          <div
            className={`rounded-xl border p-4 ${
              internship.verificationStatus === "REJECTED" ||
              internship.completionVerificationStatus === "REJECTED"
                ? "border-red-200 bg-red-50"
                : "border-green-200 bg-green-50"
            }`}
          >
            <h4 className="text-sm font-semibold text-slate-800">
              Mentor Feedback
            </h4>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
              {mentorRemark}
            </p>
          </div>
        )}

        <div className="flex justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onView?.(internship)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Eye size={16} />
            View Details
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CurrentInternship;
