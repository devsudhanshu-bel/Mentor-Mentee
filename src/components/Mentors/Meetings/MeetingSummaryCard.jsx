import React from "react";
import {
  FileText,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

/* =========================================================
   HELPERS
========================================================= */

const getText = (value) => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    return String(
      value.content ??
        value.text ??
        value.notes ??
        value.remarks ??
        value.description ??
        ""
    ).trim();
  }

  return "";
};

const getDiscussionPoints = (value) => {
  if (!Array.isArray(value)) {
    return getText(value);
  }

  return value
    .map((point) => {
      if (typeof point === "string") {
        return point.trim();
      }

      return getText(
        point?.content ??
          point?.text ??
          point?.title ??
          point?.description
      );
    })
    .filter(Boolean);
};

/* =========================================================
   CONTENT SECTION
========================================================= */

const ContentSection = ({
  title,
  icon: Icon,
  content,
  emptyMessage,
  isList = false,
}) => {
  const hasContent = Array.isArray(content)
    ? content.length > 0
    : Boolean(getText(content));

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon
          size={17}
          className="shrink-0 text-blue-600"
        />

        <h3 className="text-sm font-semibold text-slate-800">
          {title}
        </h3>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        {hasContent ? (
          isList ? (
            <ul className="list-disc space-y-2 pl-5 text-[13px] leading-6 text-slate-600">
              {content.map((point, index) => (
                <li
                  key={`${index}-${point}`}
                  className="break-words"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="whitespace-pre-wrap break-words text-[13px] leading-6 text-slate-600">
              {getText(content)}
            </p>
          )
        ) : (
          <p className="text-[13px] leading-6 text-slate-400">
            {emptyMessage}
          </p>
        )}
      </div>
    </section>
  );
};

/* =========================================================
   MEETING SUMMARY CARD
========================================================= */

const MeetingSummaryCard = ({
  summary,
  notes,
  discussionPoints,
  remarks,
}) => {
  const meetingSummary =
    summary && typeof summary === "object"
      ? summary
      : {};

  // Meeting Notes
  const meetingNotes = getText(
    notes ??
      meetingSummary.notes ??
      meetingSummary.meetingNotes ??
      meetingSummary.meeting_notes ??
      meetingSummary.content
  );

  // Discussion Points
  const rawDiscussionPoints =
    discussionPoints ??
    meetingSummary.discussionPoints ??
    meetingSummary.discussion_points ??
    meetingSummary.discussion ??
    [];

  const formattedDiscussionPoints =
    getDiscussionPoints(rawDiscussionPoints);

  // Remarks
  const meetingRemarks = getText(
    remarks ??
      meetingSummary.remarks ??
      meetingSummary.mentorRemarks ??
      meetingSummary.mentor_remarks ??
      meetingSummary.comments
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-800">
          Meeting Summary
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Meeting notes, discussion points, and remarks from the mentoring session.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <ContentSection
          title="Meeting Notes"
          icon={FileText}
          content={meetingNotes}
          emptyMessage="No meeting notes have been recorded yet."
        />

        <ContentSection
          title="Discussion Points"
          icon={MessageSquare}
          content={formattedDiscussionPoints}
          emptyMessage="No discussion points have been recorded yet."
          isList
        />

        <ContentSection
          title="Remarks"
          icon={ClipboardList}
          content={meetingRemarks}
          emptyMessage="No remarks have been recorded yet."
        />
      </div>
    </div>
  );
};

export default MeetingSummaryCard;