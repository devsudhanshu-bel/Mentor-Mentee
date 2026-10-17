
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
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-800">
            Mentor Feedback
          </h2>

          {canRecordFeedback && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <CheckCircle2 size={14} />
              Available during meeting
            </span>
          )}
        </div>

        <p className="mt-1 text-[13px] text-slate-500">
          Record your observations, suggestions and overall meeting
          feedback as the session progresses.
        </p>
      </div>

      {/* Meeting status information */}
      {statusMessage && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          {statusMessage}
        </div>
      )}

      {/* Rating */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-700">
              Overall Rating
            </h3>

            <p className="mt-1 text-[12px] text-slate-500">
              Rate the mentee's performance during this session.
            </p>
          </div>

          <div className="shrink-0 rounded-lg bg-blue-50 px-4 py-2">
            <span className="text-lg font-bold text-blue-700">
              {safeRating}/5
            </span>
          </div>
        </div>

        <div
          className="mt-5 flex gap-2"
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
                className="rounded-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Star
                  size={30}
                  fill={selected ? "#FACC15" : "none"}
                  className={
                    selected
                      ? "text-yellow-400"
                      : "text-slate-300"
                  }
                />
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-slate-400">
          1 = Needs improvement · 5 = Excellent
        </p>
      </div>

      {/* Feedback / Remarks */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquareText
            size={18}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-slate-700">
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
          className="h-[260px] w-full resize-y rounded-lg border border-slate-300 p-4 text-[13px] leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[12px] text-slate-500">
            Keep your feedback clear, specific and constructive.
          </span>

          <span
            className={`text-[12px] font-medium ${
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
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Your feedback is saved to the meeting record.
            </p>

            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
          <p className="mt-3 text-xs text-slate-400">
            You can add remarks now and update them as the meeting progresses.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackTab;
