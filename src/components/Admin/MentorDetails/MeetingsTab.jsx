
import React from "react";
import { CalendarDays, Clock3, RefreshCw } from "lucide-react";

import UpcomingMeetings from "./Meetings/UpcomingMeetings";
import RecentMeetings from "./Meetings/RecentMeetings";

// ==========================================================
// LOADING SKELETON
// ==========================================================

const MeetingSectionSkeleton = ({ rows = 3 }) => (
  <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
    <div className="mb-5 h-5 w-40 rounded bg-slate-200" />

    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 rounded-xl border border-slate-100 p-3"
        >
          <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-100" />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="h-4 w-3/4 rounded bg-slate-200" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================================
// MEETINGS TAB
// ==========================================================

const MeetingsTab = ({
  meetings = [],
  loading = false,
  error = "",
  onRefresh,

  onStartMeeting,
  onViewDetails,
  onEditMeeting,
  onRescheduleMeeting,
  onDuplicateMeeting,
  onCancelMeeting,

  onEditSeries,
  onSkipOccurrence,
  onPauseSeries,
  onDeleteSeries,
}) => {
  const safeMeetings = Array.isArray(meetings) ? meetings : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-xl bg-blue-50 p-2.5">
              <CalendarDays size={22} className="text-blue-700" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Meetings
            </h1>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-slate-500">
            Manage upcoming mentoring sessions, review previous
            meetings, and keep track of your student interactions.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm sm:self-center">
          <Clock3 size={16} className="text-blue-600" />

          <span>
            {loading
              ? "Loading meetings..."
              : `${safeMeetings.length} meeting${
                  safeMeetings.length === 1 ? "" : "s"
                } available`}
          </span>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              aria-label="Refresh meetings"
              title="Refresh meetings"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={loading ? "animate-spin" : ""}
              />
              <span className="text-xs">Refresh</span>
            </button>
          )}
        </div>
      </section>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="rounded-lg border border-red-200 bg-white px-3 py-2 font-semibold transition hover:bg-red-100 disabled:opacity-50"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* Two-column layout */}
      <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        {/* Upcoming */}
        <div className="min-w-0">
          {loading ? (
            <MeetingSectionSkeleton rows={3} />
          ) : (
            <UpcomingMeetings
              meetings={safeMeetings}
              onRefresh={onRefresh}
              onStartMeeting={onStartMeeting}
              onViewDetails={onViewDetails}
              onEditMeeting={onEditMeeting}
              onCancelMeeting={onCancelMeeting}
            />
          )}
        </div>

        {/* Recent */}
        <div className="min-w-0">
          {loading ? (
            <MeetingSectionSkeleton rows={3} />
          ) : (
            <RecentMeetings
              meetings={safeMeetings}
              onRefresh={onRefresh}
              onStartMeeting={onStartMeeting}
              onViewDetails={onViewDetails}
              onEditMeeting={onEditMeeting}
              onRescheduleMeeting={onRescheduleMeeting}
              onDuplicateMeeting={onDuplicateMeeting}
              onCancelMeeting={onCancelMeeting}
              onEditSeries={onEditSeries}
              onSkipOccurrence={onSkipOccurrence}
              onPauseSeries={onPauseSeries}
              onDeleteSeries={onDeleteSeries}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default MeetingsTab;
