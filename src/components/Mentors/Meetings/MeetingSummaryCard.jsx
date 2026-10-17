import React from "react";
import {
  FileText,
  MessageSquare,
  ClipboardList,
  Star,
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
    const text = getText(value);
    return text ? [text] : [];
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
   FEEDBACK HELPERS
========================================================= */

const getFeedbackRecord = (...sources) => {
  for (const source of sources) {
    if (!source || typeof source !== "object") {
      continue;
    }

    const candidates = [
      source.mentor_meeting_feedback,
      source.mentorMeetingFeedback,
      source.mentor_feedback,
      source.mentorFeedback,
      source.feedback,
      source.evaluation,
    ];

    for (const value of candidates) {
      if (Array.isArray(value)) {
        const record = value.find(
          (item) =>
            item &&
            typeof item === "object"
        );

        if (record) return record;
        continue;
      }

      if (value && typeof value === "object") {
        return value;
      }
    }

    // Support a feedback record passed directly.
    if (
      source.rating !== undefined ||
      source.comments !== undefined ||
      source.comment !== undefined
    ) {
      return source;
    }
  }

  return null;
};

const getValidRating = (...sources) => {
  for (const source of sources) {
    if (source === null || source === undefined || source === "") {
      continue;
    }

    const value =
      typeof source === "object"
        ? source.rating
        : source;

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      continue;
    }

    const rating = Number(value);

    if (
      Number.isInteger(rating) &&
      rating >= 1 &&
      rating <= 5
    ) {
      return rating;
    }
  }

  return null;
};

const getFeedbackText = (...sources) => {
  for (const source of sources) {
    if (typeof source === "string" && source.trim()) {
      return source.trim();
    }

    if (!source || typeof source !== "object") {
      continue;
    }

    const candidates = [
      source.feedback,
      source.comments,
      source.comment,
      source.remarks,
      source.content,
      source.text,
    ];

    for (const candidate of candidates) {
      const text = getText(candidate);

      if (text) return text;
    }
  }

  return "";
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
          aria-hidden="true"
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
   MENTOR RATING SECTION
========================================================= */

const MentorRatingSection = ({
  rating,
  feedback,
  feedbackText: suppliedFeedbackText,
}) => {
  const feedbackRecord = getFeedbackRecord(feedback);

  const validRating = getValidRating(
    rating,
    feedbackRecord,
    feedback
  );

  const comments =
    getText(suppliedFeedbackText) ||
    getFeedbackText(feedbackRecord, feedback);

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Star
          size={17}
          className="shrink-0 text-amber-500"
          aria-hidden="true"
        />

        <h3 className="text-sm font-semibold text-slate-800">
          Mentor Rating
        </h3>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        {/* Star Rating */}
        <div>
          <div
            className="flex flex-wrap items-center gap-1"
            role="img"
            aria-label={
              validRating !== null
                ? `Mentor rating: ${validRating} out of 5 stars`
                : "No mentor rating submitted"
            }
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled =
                validRating !== null &&
                star <= validRating;

              return (
                <Star
                  key={star}
                  size={22}
                  strokeWidth={1.8}
                  className={
                    isFilled
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }
                  aria-hidden="true"
                />
              );
            })}

            <span
              className={`ml-2 text-sm font-semibold ${
                validRating !== null
                  ? "text-slate-800"
                  : "text-slate-400"
              }`}
            >
              {validRating !== null
                ? `${validRating}/5`
                : "No rating submitted"}
            </span>
          </div>

          {validRating !== null && (
            <p className="mt-1 text-xs text-slate-400">
              Saved meeting rating
            </p>
          )}
        </div>

        {/* Written Feedback */}
        <div className="border-t border-slate-100 pt-3">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquare
              size={15}
              className="text-slate-500"
              aria-hidden="true"
            />

            <h4 className="text-xs font-semibold text-slate-700">
              Feedback Comments
            </h4>
          </div>

          {comments ? (
            <p className="whitespace-pre-wrap break-words text-[13px] leading-6 text-slate-600">
              {comments}
            </p>
          ) : (
            <p className="text-[13px] leading-6 text-slate-400">
              No feedback comments have been recorded.
            </p>
          )}
        </div>
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
  feedback,
  rating: suppliedRating,
  mentorFeedback,
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
      meetingSummary.mentor_meeting_notes ??
      meetingSummary.content
  );

  // Discussion Points
  const rawDiscussionPoints =
    discussionPoints ??
    meetingSummary.discussionPoints ??
    meetingSummary.discussion_points ??
    meetingSummary.mentor_meeting_discussion_points ??
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

  // Feedback record: prefer explicitly supplied saved feedback.
  const meetingFeedback =
    getFeedbackRecord(
      mentorFeedback,
      feedback,
      meetingSummary
    );

  // Accept the rating directly or from the persisted feedback record.
  const meetingRating = getValidRating(
    suppliedRating,
    meetingFeedback,
    meetingSummary
  );

  // Support either a feedback record or a plain comment string.
  const meetingFeedbackText =
    getText(feedback) ||
    getFeedbackText(meetingFeedback) ||
    getFeedbackText(meetingSummary);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-800">
          Meeting Summary
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Meeting notes, discussion points, remarks, and mentor
          feedback from the mentoring session.
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

        <MentorRatingSection
          rating={meetingRating}
          feedback={meetingFeedback}
          feedbackText={meetingFeedbackText}
        />
      </div>
    </div>
  );
};

export default MeetingSummaryCard;