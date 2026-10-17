import React, { useCallback, useEffect, useState } from "react";
import { Clock3, MapPin, CalendarDays, RefreshCw } from "lucide-react";

import menteeMeetingsService from "../../api/menteeMeetings.api";

const getStartDate = (meeting) =>
  meeting?.startAt ??
  meeting?.startTime ??
  meeting?.scheduledAt ??
  meeting?.date ??
  null;

const getEndDate = (meeting) =>
  meeting?.endAt ??
  meeting?.endTime ??
  meeting?.endsAt ??
  null;

const getStatus = (meeting) =>
  String(meeting?.status ?? "SCHEDULED").toUpperCase();

const getTitle = (meeting) =>
  meeting?.title ??
  meeting?.meetingTitle ??
  meeting?.topic ??
  meeting?.purpose ??
  "Mentor Meeting";

const getLocation = (meeting) =>
  meeting?.location ??
  meeting?.venue ??
  meeting?.room ??
  meeting?.meetingLink ??
  meeting?.onlineLink ??
  "";

const formatDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    full: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
};

const formatTime = (meeting) => {
  const startValue = getStartDate(meeting);
  if (!startValue) return "Time not specified";

  const start = new Date(startValue);
  if (Number.isNaN(start.getTime())) return "Time not specified";

  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  const startTime = start.toLocaleTimeString("en-US", options);

  const endValue = getEndDate(meeting);
  if (!endValue) return startTime;

  const end = new Date(endValue);
  if (Number.isNaN(end.getTime())) return startTime;

  return `${startTime} - ${end.toLocaleTimeString("en-US", options)}`;
};

const UpcomingMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchMeetings = useCallback(async () => {
    setError("");

    try {
      // Use the existing student meetings service.
      const response = await menteeMeetingsService.getMeetings();

      const records = Array.isArray(response)
        ? response
        : response?.meetings ??
          response?.data?.meetings ??
          response?.data ??
          [];

      if (!Array.isArray(records)) {
        throw new Error("Unexpected meetings response from the server.");
      }

      setMeetings(records);
    } catch (err) {
      console.error("Unable to load upcoming meetings:", err);
      setError(err.message || "Unable to load meetings.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    await fetchMeetings();
  };

  const nextMeetings = meetings
    .filter((meeting) => {
      const start = getStartDate(meeting);
      const time = start ? new Date(start).getTime() : NaN;
      const status = getStatus(meeting);

      return (
        Number.isFinite(time) &&
        time >= Date.now() &&
        !["COMPLETED", "CANCELLED", "CANCELED", "NO_SHOW"].includes(status)
      );
    })
    .sort(
      (a, b) =>
        new Date(getStartDate(a)).getTime() -
        new Date(getStartDate(b)).getTime()
    )
    .slice(0, 3);

  return (
    <div className="bg-white rounded-[22px] border border-gray-200 shadow-sm p-3 h-[300px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[16px] font-bold text-slate-900">
          Upcoming Meetings
        </h2>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading || refreshing}
          aria-label="Refresh meetings"
          className="text-[#1677FF] p-1 hover:bg-blue-50 rounded disabled:opacity-50"
          title="Refresh meetings"
        >
          <RefreshCw
            size={14}
            className={refreshing ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
          Loading meetings...
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={handleRefresh}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : nextMeetings.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <CalendarDays size={26} className="text-slate-300 mb-2" />
          <p className="text-sm font-semibold text-slate-700">
            No upcoming meetings
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Scheduled meetings will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-between min-h-0">
          {nextMeetings.map((meeting, index) => {
            const date = formatDate(getStartDate(meeting));
            const location = getLocation(meeting);

            return (
              <div
                key={meeting.id ?? `${getStartDate(meeting)}-${index}`}
                className={`flex justify-between items-start gap-2 py-2 ${
                  index !== nextMeetings.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* Date and details */}
                <div className="flex gap-2.5 min-w-0">
                  <div className="w-10 h-12 rounded-lg border border-blue-200 bg-blue-50 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-bold tracking-wide text-[#1677FF] leading-none">
                      {date?.month ?? "---"}
                    </span>
                    <span className="text-[15px] font-bold text-slate-900 leading-none mt-1">
                      {date?.day ?? "--"}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[12px] font-semibold text-slate-900 leading-5 truncate">
                      {getTitle(meeting)}
                    </h3>

                    <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                      <Clock3 size={10} className="flex-shrink-0" />
                      <span>{formatTime(meeting)}</span>
                    </div>

                    {location && (
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500 min-w-0">
                        <MapPin size={10} className="flex-shrink-0" />
                        <span className="truncate">
                          {location.startsWith("http")
                            ? "Online meeting"
                            : location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1677FF] text-[9px] font-semibold whitespace-nowrap">
                  {getStatus(meeting)
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .replace(/^\w/, (letter) => letter.toUpperCase())}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingMeetings;