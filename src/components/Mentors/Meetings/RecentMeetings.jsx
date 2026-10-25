import React, { useMemo, useState } from "react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import RecentMeetingItem from "./RecentMeetingItem";
import MeetingSummaryModal from "./MeetingSummaryModal";

/* =========================================================
   HELPERS
========================================================= */

const TERMINAL_STATUSES = [
  "COMPLETED",
  "CANCELLED",
  "CANCELED",
  "NO_SHOW",
];

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getMeetingId = (meeting) =>
  meeting?.id ??
  meeting?.meetingId ??
  meeting?.meeting_id ??
  meeting?.rawMeeting?.id ??
  null;

const getMeetingStart = (meeting) =>
  meeting?.startAt ??
  meeting?.startTime ??
  meeting?.scheduledAt ??
  meeting?.scheduledStart ??
  meeting?.start_time ??
  null;

const getMeetingEnd = (meeting) =>
  meeting?.endAt ??
  meeting?.endTime ??
  meeting?.scheduledEnd ??
  meeting?.end_time ??
  null;

const toValidDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const isTerminalMeeting = (meeting) =>
  TERMINAL_STATUSES.includes(normalizeStatus(meeting?.status));

const isMeetingRecent = (meeting, now) => {
  const status = normalizeStatus(meeting?.status);

  if (isTerminalMeeting(meeting)) {
    return true;
  }

  if (status === "IN_PROGRESS") {
    return false;
  }

  const startAt = toValidDate(getMeetingStart(meeting));

  return startAt !== null && startAt < now;
};

const formatTime = (date) =>
  date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

const formatNextMeeting = (value) => {
  const date = toValidDate(value);

  if (!date) {
    return value || "Not Scheduled";
  }

  return `${date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })} • ${formatTime(date)}`;
};

/* =========================================================
   NORMALIZE API MEETING FOR THE RECENT-MEETING CARD
========================================================= */

const formatRecentMeeting = (meeting) => {
  const startAt = toValidDate(getMeetingStart(meeting));
  const endAt = toValidDate(getMeetingEnd(meeting));

  if (!startAt) return null;

  const mode = String(meeting?.mode ?? "").toUpperCase();

  const meetingType =
    mode === "ONLINE"
      ? "Online"
      : mode === "IN_PERSON"
        ? "In Person"
        : meeting?.meetingType ?? "Meeting";

  const studentValue =
    meeting?.student ??
    meeting?.students ??
    meeting?.rawMeeting?.student ??
    meeting?.rawMeeting?.students ??
    {};

  // Support both object and array relation shapes.
  const student = Array.isArray(studentValue)
    ? studentValue[0] ?? {}
    : studentValue;

  const studentName =
    student.fullName ??
    student.name ??
    student.full_name ??
    meeting?.studentName ??
    "Student";

  const registrationNumber =
    student.registerNumber ??
    student.registrationNumber ??
    student.register_number ??
    meeting?.registrationNumber ??
    "";

  const department =
    student.department?.name ??
    student.departmentName ??
    (typeof student.department === "string"
      ? student.department
      : "") ??
    meeting?.departmentName ??
    "";

  const studentEmail =
    student.email ??
    meeting?.studentEmail ??
    "";

  const studentPhone =
    student.phone ??
    student.phoneNumber ??
    meeting?.studentPhone ??
    "";

  const startTime = formatTime(startAt);
  const endTime = endAt ? formatTime(endAt) : null;

  /*
   * Preserve the feedback relation from the backend.
   * The RecentMeetingItem component uses this to render
   * the mentor's five-star rating and written feedback.
   */
  const mentorFeedback =
    meeting?.mentor_meeting_feedback ??
    meeting?.mentorMeetingFeedback ??
    meeting?.rawMeeting?.mentor_meeting_feedback ??
    meeting?.rawMeeting?.mentorMeetingFeedback ??
    null;

  return {
    id: getMeetingId(meeting),
    meetingId: getMeetingId(meeting),

    month: startAt
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(),

    date: String(startAt.getDate()).padStart(2, "0"),

    day: startAt
      .toLocaleString("en-US", { weekday: "short" })
      .toUpperCase(),

    title: meeting?.title || "Mentorship Meeting",

    time: endTime
      ? `${startTime} - ${endTime}`
      : startTime,

    notes:
      meeting?.mentor_meeting_notes?.notes ??
      meeting?.mentor_meeting_notes?.content ??
      meeting?.agenda ??
      meeting?.description ??
      "",

    agenda:
      meeting?.agenda ??
      meeting?.description ??
      "",

    status: meeting?.status ?? "SCHEDULED",

    type: meetingType,
    mode: meeting?.mode,

    location:
      mode === "ONLINE"
        ? meeting?.meetingLink || "Online meeting"
        : meeting?.venue || "Location not specified",

    venue: meeting?.venue ?? null,
    meetingLink: meeting?.meetingLink ?? null,

    startAt: getMeetingStart(meeting),
    endAt: getMeetingEnd(meeting),

    studentId:
      meeting?.studentId ??
      student.id ??
      null,

    student: {
      id: student.id ?? meeting?.studentId ?? null,
      name: studentName,
      fullName: student.fullName ?? studentName,
      registrationNumber,
      department,
      year:
        student.year ??
        student.yearOfStudy ??
        meeting?.studentYear ??
        "",
      email: studentEmail,
      phone: studentPhone,
      mentor:
        meeting?.mentor?.fullName ??
        meeting?.mentorName ??
        "",
    },

    /*
     * Mentor rating and feedback.
     * Keep the original backend field name so that
     * RecentMeetingItem can read it directly.
     */
    mentor_meeting_feedback: mentorFeedback,
    mentorMeetingFeedback: mentorFeedback,

    summary:
      meeting?.summary ??
      meeting?.meetingSummary ??
      null,

    // Keep the original API response for modal and actions.
    rawMeeting: meeting,
  };
};

/* =========================================================
   RECENT MEETINGS
========================================================= */

const RecentMeetings = ({
  meetings: suppliedMeetings = [],

  onStartMeeting = () => {},
  onViewDetails = () => {},
  onEditMeeting = () => {},
  onRescheduleMeeting = () => {},
  onDuplicateMeeting = () => {},
  onCancelMeeting = () => {},

  onEditSeries = () => {},
  onSkipOccurrence = () => {},
  onPauseSeries = () => {},
  onDeleteSeries = () => {},

  onRefresh,
}) => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openSummary, setOpenSummary] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState("ALL");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const sourceMeetings = Array.isArray(suppliedMeetings)
    ? suppliedMeetings
    : [];

  /* =======================================================
     PREPARE RECENT MEETINGS
  ======================================================= */

  const recentMeetings = useMemo(() => {
    const now = new Date();

    return sourceMeetings
      .filter((meeting) => isMeetingRecent(meeting, now))
      .sort((a, b) => {
        const dateA = toValidDate(getMeetingStart(a));
        const dateB = toValidDate(getMeetingStart(b));

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateB.getTime() - dateA.getTime();
      })
      .map(formatRecentMeeting)
      .filter(Boolean);
  }, [sourceMeetings]);

  /* =======================================================
     WEEK + STUDENT FILTERS
     Both filters work independently. When both are selected,
     a meeting must match the selected week AND the student.
  ======================================================= */

  const weekRange = useMemo(() => {
    const now = new Date();
    const monday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const daysSinceMonday = (monday.getDay() + 6) % 7;
    monday.setDate(monday.getDate() - daysSinceMonday + weekOffset * 7);
    monday.setHours(0, 0, 0, 0);

    const nextMonday = new Date(monday);
    nextMonday.setDate(nextMonday.getDate() + 7);

    const sunday = new Date(nextMonday);
    sunday.setDate(sunday.getDate() - 1);
    sunday.setHours(23, 59, 59, 999);

    return { start: monday, end: sunday };
  }, [weekOffset]);

  const weekRangeLabel = useMemo(() => {
    const start = weekRange.start;
    const end = weekRange.end;
    const monthStart = start.toLocaleDateString("en-IN", { month: "short" });
    const monthEnd = end.toLocaleDateString("en-IN", { month: "short" });
    const yearEnd = end.getFullYear();

    if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
      return `${monthStart} ${start.getDate()} – ${end.getDate()}, ${yearEnd}`;
    }

    return `${monthStart} ${start.getDate()} – ${monthEnd} ${end.getDate()}, ${yearEnd}`;
  }, [weekRange]);

  const studentOptions = useMemo(() => {
    const unique = new Map();

    recentMeetings.forEach((meeting) => {
      const name = String(meeting.student?.name ?? "").trim();
      if (!name) return;

      const key = name.toLocaleLowerCase();
      if (!unique.has(key)) unique.set(key, name);
    });

    return [...unique.values()].sort((a, b) => a.localeCompare(b));
  }, [recentMeetings]);

  const filteredMeetings = useMemo(() => {
    return recentMeetings.filter((meeting) => {
      const startAt = toValidDate(meeting.startAt);
      if (!startAt) return false;

      const matchesWeek =
        startAt >= weekRange.start && startAt <= weekRange.end;
      const studentName = String(meeting.student?.name ?? "").trim().toLocaleLowerCase();
      const matchesStudent =
        selectedStudent === "ALL" ||
        studentName === selectedStudent.toLocaleLowerCase();

      return matchesWeek && matchesStudent;
    });
  }, [recentMeetings, weekRange, selectedStudent]);

  const displayedMeetings = showAll
    ? filteredMeetings
    : filteredMeetings.slice(0, 4);

  /* =======================================================
     SUMMARY MODAL
  ======================================================= */

  const handleOpenSummary = (meeting) => {
    setSelectedMeeting(meeting);
    setOpenSummary(true);
  };

  const handleCloseSummary = () => {
    setOpenSummary(false);
    setSelectedMeeting(null);
  };

  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = async () => {
    if (!onRefresh || refreshing) return;

    setRefreshing(true);
    setError("");

    try {
      const result = await onRefresh();

      if (result === null) {
        setError("Unable to refresh meetings. Please try again.");
      }
    } catch (err) {
      console.error("Failed to refresh recent meetings:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to refresh meetings."
      );
    } finally {
      setRefreshing(false);
    }
  };

  /* =======================================================
     ACTION FORWARDING
  ======================================================= */

  const forwardAction = (callback, meeting) => {
    if (typeof callback !== "function") return;

    callback(meeting?.rawMeeting ?? meeting);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarClock
              size={18}
              className="text-blue-600"
            />

            <h2 className="text-[16px] font-semibold text-slate-800">
              Recent Meetings
            </h2>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              {filteredMeetings.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={!onRefresh || refreshing}
            aria-label="Refresh recent meetings"
            title="Refresh recent meetings"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Standalone week and student filters; selections combine */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <button
              type="button"
              onClick={() => setWeekOffset((offset) => offset - 1)}
              aria-label="Previous week"
              title="Previous week"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <ChevronLeft size={17} />
            </button>

            <div className="min-w-0 text-center">
              <p className="text-xs font-semibold text-slate-800">
                {weekOffset === 0 ? "This Week" : weekOffset < 0 ? `${Math.abs(weekOffset)} ${Math.abs(weekOffset) === 1 ? "Week" : "Weeks"} Ago` : weekOffset === 1 ? "Next Week" : `In ${weekOffset} Weeks`}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">{weekRangeLabel}</p>
            </div>

            <button
              type="button"
              onClick={() => setWeekOffset((offset) => offset + 1)}
              aria-label="Next week"
              title="Next week"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="recent-meetings-student-filter" className="shrink-0 text-xs font-medium text-slate-600">
              Filter by student
            </label>
            <select
              id="recent-meetings-student-filter"
              value={selectedStudent}
              onChange={(event) => setSelectedStudent(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:flex-1"
            >
              <option value="ALL">All students</option>
              {studentOptions.map((studentName) => (
                <option key={studentName} value={studentName}>{studentName}</option>
              ))}
            </select>
            {(weekOffset !== 0 || selectedStudent !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setWeekOffset(0);
                  setSelectedStudent("ALL");
                  setShowAll(false);
                }}
                className="shrink-0 self-start rounded-lg px-2 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 sm:self-auto"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Refresh Error */}
        {error && (
          <div
            role="alert"
            className="mb-3 rounded-xl border border-red-100 bg-red-50 p-3"
          >
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={!onRefresh || refreshing}
              className="mt-2 text-sm font-semibold text-red-700 underline disabled:opacity-50"
            >
              Try again
            </button>
          </div>
        )}

        {/* List */}
        {!error && filteredMeetings.length > 0 && (
          <div className="space-y-2.5">
            {displayedMeetings.map((meeting, index) => (
              <RecentMeetingItem
                key={
                  meeting.id ??
                  `${meeting.startAt}-${index}`
                }
                meeting={meeting}
                onView={handleOpenSummary}
                onStartMeeting={(item) =>
                  forwardAction(
                    onStartMeeting,
                    item ?? meeting
                  )
                }
                onViewDetails={(item) =>
                  forwardAction(
                    onViewDetails,
                    item ?? meeting
                  )
                }
                onEditMeeting={(item) =>
                  forwardAction(
                    onEditMeeting,
                    item ?? meeting
                  )
                }
                onRescheduleMeeting={(item) =>
                  forwardAction(
                    onRescheduleMeeting,
                    item ?? meeting
                  )
                }
                onDuplicateMeeting={(item) =>
                  forwardAction(
                    onDuplicateMeeting,
                    item ?? meeting
                  )
                }
                onCancelMeeting={(item) =>
                  forwardAction(
                    onCancelMeeting,
                    item ?? meeting
                  )
                }
                onEditSeries={(item) =>
                  forwardAction(
                    onEditSeries,
                    item ?? meeting
                  )
                }
                onSkipOccurrence={(item) =>
                  forwardAction(
                    onSkipOccurrence,
                    item ?? meeting
                  )
                }
                onPauseSeries={(item) =>
                  forwardAction(
                    onPauseSeries,
                    item ?? meeting
                  )
                }
                onDeleteSeries={(item) =>
                  forwardAction(
                    onDeleteSeries,
                    item ?? meeting
                  )
                }
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!error && filteredMeetings.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
            <CalendarClock
              size={30}
              className="mb-3 text-slate-300"
            />

            <p className="text-sm font-semibold text-slate-700">
              No meetings match these filters
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try another week or select All students to see more meetings.
            </p>
          </div>
        )}

        {/* Footer */}
        {!error && filteredMeetings.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="mt-4 flex w-full items-center justify-center gap-1 text-[12px] font-semibold text-blue-600 transition hover:text-blue-700"
          >
            {showAll ? "Show Less" : "View All Recent Meetings"}

            <ChevronRight
              size={14}
              className={showAll ? "rotate-90" : ""}
            />
          </button>
        )}
      </div>

      {/* Meeting Summary */}
      <MeetingSummaryModal
        open={openSummary}
        onClose={handleCloseSummary}
        meeting={selectedMeeting}
      />
    </>
  );
};

export default RecentMeetings;