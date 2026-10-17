
import React, { useMemo } from "react";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
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
    };

    records.forEach((meeting) => {
      const status = normalizeStatus(meeting?.status);
      const startDate = getStartDate(meeting);

      // Count completed meetings.
      if (status === "COMPLETED") {
        result.completed += 1;
      }

      // Count only future meetings that are still scheduled.
      if (
        status === "SCHEDULED" &&
        startDate &&
        startDate >= now
      ) {
        result.upcoming += 1;
      }
    });

    return result;
  }, [meetings]);

  // Prefer counts calculated from actual meeting records.
  // Use the supplied summary when no meeting records exist.
  const hasMeetingRecords =
    Array.isArray(meetings) && meetings.length > 0;

  const displayedStats = hasMeetingRecords
    ? stats
    : suppliedSummary
      ? {
          total: suppliedSummary.total ?? 0,
          completed: suppliedSummary.completed ?? 0,
          upcoming: suppliedSummary.upcoming ?? 0,
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
  ];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      aria-labelledby="meeting-summary-heading"
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
