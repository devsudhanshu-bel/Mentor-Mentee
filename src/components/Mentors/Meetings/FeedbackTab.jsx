import React, { useMemo } from "react";
import {
  Star,
  MessageSquareText,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

const MAX_FEEDBACK_LENGTH = 5000;

const FeedbackTab = ({
  rating = 4,
  setRating,
  feedback = "",
  setFeedback,
  onSaveFeedback,
  saving = false,
  meetingStatus = "IN_PROGRESS",
}) => {
  const safeRating = Math.min(
    5,
    Math.max(1, Number(rating) || 1)
  );

  const feedbackText =
    typeof feedback === "string" ? feedback : "";

  const characterCount = feedbackText.length;

  const normalizedStatus = String(meetingStatus ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  const canRecordFeedback = [
    "IN_PROGRESS",
    "COMPLETED",
  ].includes(normalizedStatus);

  const feedbackIsEmpty = !feedbackText.trim();

  const ratingIsValid =
    Number.isInteger(Number(rating)) &&
    Number(rating) >= 1 &&
    Number(rating) <= 5;

  const canSave =
    canRecordFeedback &&
    !saving &&
    ratingIsValid &&
    typeof onSaveFeedback === "function";

  const handleRatingChange = (value) => {
    if (saving || !canRecordFeedback) return;
    setRating?.(value);
  };

  const handleFeedbackChange = (event) => {
    if (saving || !canRecordFeedback) return;

    setFeedback?.(
      event.target.value.slice(0, MAX_FEEDBACK_LENGTH)
    );
  };

  const handleSave = async () => {
    if (!canSave) return;

    try {
      await onSaveFeedback();
    } catch {
      // The parent component displays the API error message.
    }
  };

  const statusMessage = useMemo(() => {
    if (normalizedStatus === "SCHEDULED") {
      return "Feedback can be recorded once the meeting has started.";
    }

    if (
      normalizedStatus === "CANCELLED" ||
      normalizedStatus === "CANCELED"
    ) {
      return "Feedback cannot be recorded for a cancelled meeting.";
    }

    if (normalizedStatus === "NO_SHOW") {
      return "Feedback cannot be recorded for a meeting marked as no-show.";
    }

    return "";
  }, [normalizedStatus]);

  return (
    <div className="min-w-0 p-3 sm:p-5">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
            Mentor Feedback
          </h2>

          {canRecordFeedback && (
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-medium text-green-700 sm:px-3 sm:text-xs">
              <CheckCircle2 size={14} className="shrink-0" />
              Available during meeting
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-[13px] sm:leading-normal">
          Record your observations, suggestions and overall meeting
          feedback as the session progresses.
        </p>
      </div>

      {/* Meeting status information */}
      {statusMessage && (
        <div
          role="status"
          className="mb-4 break-words rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-800 sm:mb-5 sm:px-4 sm:py-3 sm:text-sm"
        >
          {statusMessage}
        </div>
      )}

      {/* Rating */}
      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-700 sm:text-base">
              Overall Rating
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-[12px]">
              Rate the mentee's performance during this session.
            </p>
          </div>

          <div className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 sm:px-4">
            <span className="text-base font-bold text-blue-700 sm:text-lg">
              {safeRating}/5
            </span>
          </div>
        </div>

        <div
          className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2"
          role="group"
          aria-label="Meeting rating out of five stars"
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const selected = star <= safeRating;

            return (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                disabled={saving || !canRecordFeedback}
                aria-label={`Rate ${star} out of 5`}
                aria-pressed={safeRating === star}
                title={`${star} out of 5`}
                className="rounded-md p-0.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:p-0"
              >
                <Star
                  size={25}
                  fill={selected ? "#FACC15" : "none"}
                  className={`sm:h-[30px] sm:w-[30px] ${
                    selected
                      ? "text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-[11px] text-slate-400 sm:text-xs">
          1 = Needs improvement · 5 = Excellent
        </p>
      </div>

      {/* Feedback / Remarks */}
      <div className="mt-4 min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mt-6 sm:p-5">
        <div className="mb-3 flex min-w-0 items-center gap-2 sm:mb-4">
          <MessageSquareText
            size={18}
            className="shrink-0 text-blue-600"
          />

          <h3 className="text-sm font-semibold text-slate-700 sm:text-base">
            Meeting Feedback & Remarks
          </h3>
        </div>

        <textarea
          value={feedbackText}
          onChange={handleFeedbackChange}
          placeholder={
            canRecordFeedback
              ? "Record observations, student progress, concerns, suggestions and action items..."
              : "Feedback will be available when the meeting starts."
          }
          maxLength={MAX_FEEDBACK_LENGTH}
          disabled={saving || !canRecordFeedback}
          aria-label="Meeting feedback and remarks"
          className="h-[220px] w-full min-w-0 resize-y rounded-lg border border-slate-300 p-3 text-xs leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 sm:h-[260px] sm:p-4 sm:text-[13px]"
        />

        <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span className="text-[11px] leading-5 text-slate-500 sm:text-[12px]">
            Keep your feedback clear, specific and constructive.
          </span>

          <span
            className={`text-right text-[11px] font-medium sm:text-[12px] ${
              characterCount >= MAX_FEEDBACK_LENGTH
                ? "text-amber-600"
                : "text-slate-500"
            }`}
            aria-live="polite"
          >
            {characterCount.toLocaleString()} /{" "}
            {MAX_FEEDBACK_LENGTH.toLocaleString()} characters
          </span>
        </div>

        {/* Save feedback */}
        {onSaveFeedback && (
          <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-5 text-slate-400 sm:text-xs">
              Your feedback is saved to the meeting record.
            </p>

            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2 sm:text-sm"
            >
              {saving ? (
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <MessageSquareText size={16} />
              )}

              {saving ? "Saving..." : "Save Feedback"}
            </button>
          </div>
        )}

        {feedbackIsEmpty && canRecordFeedback && (
          <p className="mt-3 text-[11px] leading-5 text-slate-400 sm:text-xs">
            You can add remarks now and update them as the meeting progresses.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackTab;
