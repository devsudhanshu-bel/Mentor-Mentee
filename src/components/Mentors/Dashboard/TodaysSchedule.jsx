import React, { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import api from "../../../api/axios";

const TodaysSchedule = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodaysSchedule = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/mentor/dashboard/overview");
      const data = response.data?.data;

      if (!data) {
        throw new Error("Dashboard schedule data could not be loaded.");
      }

      setMeetings(
        Array.isArray(data.todaysMeetings) ? data.todaysMeetings : [],
      );
    } catch (err) {
      console.error("Failed to fetch today's schedule:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load today's meetings.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodaysSchedule();
  }, [fetchTodaysSchedule]);

  const formatTime = (dateValue) => {
    if (!dateValue) return { time: "--:--", period: "" };

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return { time: "--:--", period: "" };
    }

    return {
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).replace(/\s?(AM|PM)$/i, ""),
      period: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).slice(-2),
    };
  };

  const formatTimeRange = (startAt, endAt) => {
    if (!startAt) return "Time not specified";

    const start = new Date(startAt);

    if (Number.isNaN(start.getTime())) {
      return "Time not specified";
    }

    const startText = start.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (!endAt) return startText;

    const end = new Date(endAt);

    if (Number.isNaN(end.getTime())) return startText;

    const endText = end.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${startText} – ${endText}`;
  };

  const getStudentName = (meeting) =>
    meeting.students?.fullName ||
    meeting.student?.fullName ||
    meeting.studentName ||
    "Student";

  const getStatusStyles = (status) => {
    switch ((status || "").toUpperCase()) {
      case "IN_PROGRESS":
        return "bg-emerald-50 text-emerald-700";

      case "COMPLETED":
        return "bg-slate-100 text-slate-600";

      case "CANCELLED":
        return "bg-red-50 text-red-600";

      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Scheduled";

    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleViewCalendar = () => {
    // Update this route if your application uses a different meetings path.
    window.location.assign("/mentor/meetings");
  };

  const visibleMeetings = meetings.slice(0, 3);
  const remainingMeetings = Math.max(meetings.length - 3, 0);

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
            <CalendarDays size={18} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Today's Schedule
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Your meetings for today
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchTodaysSchedule}
          disabled={loading}
          aria-label="Refresh today's schedule"
          title="Refresh schedule"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex animate-pulse items-start gap-4 border-b border-slate-100 pb-4 last:border-0"
            >
              <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-100" />

              <div className="flex-1 space-y-3 pt-1">
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-100" />
                <div className="h-3 w-1/3 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error */
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <AlertCircle size={28} className="mb-3 text-red-500" />

          <h3 className="text-sm font-semibold text-slate-800">
            Couldn't load schedule
          </h3>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchTodaysSchedule}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      ) : meetings.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 size={24} className="text-emerald-600" />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            No meetings scheduled
          </h3>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
            You don't have any meetings scheduled for today.
          </p>

          <button
            type="button"
            onClick={handleViewCalendar}
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View meetings
            <ChevronRight size={14} />
          </button>
        </div>
      ) : (
        <>
          {/* Meetings */}
          <div className="space-y-4">
            {visibleMeetings.map((meeting, index) => {
              const { time, period } = formatTime(meeting.startAt);

              return (
                <article
                  key={meeting.id || `${meeting.startAt}-${index}`}
                  className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-none last:pb-0"
                >
                  {/* Meeting time */}
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50">
                    <span className="text-[13px] font-bold text-blue-700">
                      {time}
                    </span>

                    <span className="text-[10px] font-medium uppercase text-slate-500">
                      {period}
                    </span>
                  </div>

                  {/* Meeting details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="min-w-0 text-sm font-semibold text-slate-800">
                        {meeting.title || "Mentoring Meeting"}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusStyles(
                          meeting.status,
                        )}`}
                      >
                        {formatStatus(meeting.status)}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <UserRound
                        size={13}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {getStudentName(meeting)}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3
                        size={13}
                        className="shrink-0"
                      />

                      <span>
                        {formatTimeRange(
                          meeting.startAt,
                          meeting.endAt,
                        )}
                      </span>
                    </div>

                    {meeting.location && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin
                          size={13}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {meeting.location}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="text-xs text-slate-500">
              {remainingMeetings > 0
                ? `+ ${remainingMeetings} more meeting${
                    remainingMeetings === 1 ? "" : "s"
                  } today`
                : `${meetings.length} meeting${
                    meetings.length === 1 ? "" : "s"
                  } scheduled`}
            </span>

            <button
              type="button"
              onClick={handleViewCalendar}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View Calendar
              <ChevronRight size={14} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default TodaysSchedule;
