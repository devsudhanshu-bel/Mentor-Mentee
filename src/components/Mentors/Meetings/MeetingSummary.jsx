import React, { useMemo } from "react";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Star,
  MessageSquare,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

// =========================================================
// HELPERS
// =========================================================

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getStartDate = (meeting) => {
  const value =
    meeting?.startAt ??
    meeting?.startTime ??
    meeting?.scheduledAt ??
    meeting?.scheduledStart ??
    meeting?.start_time ??
    null;

  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

// Supports the Prisma relation and common API aliases.
const getMeetingFeedback = (meeting) => {
  const value =
    meeting?.mentor_meeting_feedback ??
    meeting?.mentorMeetingFeedback ??
    meeting?.mentor_feedback ??
    meeting?.mentorFeedback ??
    meeting?.feedback ??
    null;

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value && typeof value === "object" ? value : null;
};

// Only valid integer ratings from 1 to 5 are counted.
const getValidRating = (meeting) => {
  const feedback = getMeetingFeedback(meeting);

  if (
    !feedback ||
    feedback.rating === null ||
    feedback.rating === undefined ||
    feedback.rating === ""
  ) {
    return null;
  }

  const rating = Number(feedback.rating);

  return Number.isInteger(rating) && rating >= 1 && rating <= 5
    ? rating
    : null;
};

// =========================================================
// MEETING SUMMARY
// =========================================================

const MeetingSummary = ({
  meetings = [],
  summary: suppliedSummary = null,
  isLoading = false,
}) => {
  const stats = useMemo(() => {
    const records = Array.isArray(meetings) ? meetings : [];
    const now = new Date();

    const result = {
      total: records.length,
      completed: 0,
      upcoming: 0,
      feedbackCount: 0,
      averageRating: null,
    };

    let ratingTotal = 0;

    records.forEach((meeting) => {
      const status = normalizeStatus(meeting?.status);
      const startDate = getStartDate(meeting);

      if (status === "COMPLETED") {
        result.completed += 1;
      }

      if (
        status === "SCHEDULED" &&
        startDate &&
        startDate >= now
      ) {
        result.upcoming += 1;
      }

      const rating = getValidRating(meeting);

      if (rating !== null) {
        ratingTotal += rating;
        result.feedbackCount += 1;
      }
    });

    result.averageRating =
      result.feedbackCount > 0
        ? Number(
            (ratingTotal / result.feedbackCount).toFixed(1)
          )
        : null;

    return result;
  }, [meetings]);

  // Use live meeting records when available.
  // Fall back to the supplied summary when the list is empty.
  const hasMeetingRecords =
    Array.isArray(meetings) && meetings.length > 0;

  const displayedStats = hasMeetingRecords
    ? stats
    : suppliedSummary
      ? {
          total: suppliedSummary.total ?? 0,
          completed: suppliedSummary.completed ?? 0,
          upcoming: suppliedSummary.upcoming ?? 0,
          feedbackCount: suppliedSummary.feedbackCount ?? 0,
          averageRating: suppliedSummary.averageRating ?? null,
        }
      : stats;

  // =========================================================
  // SUMMARY CARDS
  // =========================================================

  const cards = [
    {
      key: "total",
      icon: CalendarDays,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Total Meetings",
      value: displayedStats.total,
      subtitle: "All meetings",
    },
    {
      key: "completed",
      icon: CircleCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Completed Meetings",
      value: displayedStats.completed,
      subtitle: "Completed meetings",
    },
    {
      key: "upcoming",
      icon: Clock3,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      title: "Upcoming Meetings",
      value: displayedStats.upcoming,
      subtitle: "Scheduled meetings",
    },
    {
      key: "average-rating",
      icon: Star,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      title: "Average Rating",
      value:
        displayedStats.averageRating === null ||
        displayedStats.averageRating === undefined ||
        !Number.isFinite(Number(displayedStats.averageRating))
          ? "—"
          : `${Number(displayedStats.averageRating).toFixed(1)}/5`,
      subtitle:
        displayedStats.feedbackCount === 0
          ? "No ratings submitted yet"
          : "Across rated meetings",
    },
    {
      key: "feedback-count",
      icon: MessageSquare,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      title: "Feedback Submitted",
      value: displayedStats.feedbackCount,
      subtitle: "Meetings with a valid rating",
    },
  ];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      aria-labelledby="meeting-summary-heading"
      aria-busy={isLoading}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          id="meeting-summary-heading"
          className="text-[16px] font-semibold text-slate-800"
        >
          Meeting Summary
        </h2>

        {isLoading && (
          <span
            role="status"
            className="text-xs text-slate-400"
          >
            Updating...
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <SummaryCard
            key={card.key}
            icon={card.icon}
            iconBg={card.iconBg}
            iconColor={card.iconColor}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetingSummary;