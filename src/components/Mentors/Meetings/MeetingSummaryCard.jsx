import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  FileText,
  Star,
} from "lucide-react";

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-slate-100 py-2.5 last:border-0">
    <p className="text-[13px] font-medium text-slate-600">
      {label}
    </p>

    <div>{value}</div>
  </div>
);

const RatingStars = ({ rating = 5 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={15}
        className={
          star <= rating
            ? "fill-amber-400 text-amber-400"
            : "text-slate-300"
        }
      />
    ))}
  </div>
);

const MeetingSummaryCard = ({ summary, notes }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-5 py-4">

        <h2 className="text-lg font-bold text-slate-800">
          Meeting Summary
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Overview of the completed mentorship session.
        </p>

      </div>

      <div className="p-5">

        <SummaryRow
          label="Overall Outcome"
          value={
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {summary?.outcome || "Good"}
            </span>
          }
        />

        <SummaryRow
          label="Student Participation"
          value={
            <RatingStars
              rating={summary?.participation || 5}
            />
          }
        />

        <SummaryRow
          label="Preparedness"
          value={
            <RatingStars
              rating={summary?.preparedness || 4}
            />
          }
        />

        <SummaryRow
          label="Communication"
          value={
            <RatingStars
              rating={summary?.communication || 5}
            />
          }
        />

        <SummaryRow
          label="Overall Rating"
          value={
            <RatingStars
              rating={summary?.overallRating || 5}
            />
          }
        />

        <SummaryRow
          label="Follow-up Required"
          value={
            summary?.followUpRequired ? (
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                <CircleAlert size={13} />
                Yes
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <CheckCircle2 size={13} />
                No
              </span>
            )
          }
        />

        <SummaryRow
          label="Next Meeting"
          value={
            <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
              <CalendarDays size={15} />
              {summary?.nextMeeting || "-"}
            </div>
          }
        />

        {/* Notes */}

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

          <div className="mb-3 flex items-center gap-2">

            <FileText
              size={17}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-slate-800">
              Meeting Notes
            </h3>

          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">

            <p className="text-[13px] leading-6 text-slate-600 whitespace-pre-line">

              {notes ||
                `Student has shown consistent improvement throughout the semester.

Needs to focus more on DSA practice and placement preparation.

Recommended to complete resume building and attend two mock interviews before the next mentoring session.`}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MeetingSummaryCard;