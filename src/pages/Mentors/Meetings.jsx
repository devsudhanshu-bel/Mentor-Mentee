
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import MentorSidebar from "../../components/layouts/MentorSidebar";
import MentorHeader from "../../components/layouts/MentorHeader";

import MeetingHeader from "../../components/Mentors/Meetings/MeetingHeader";
import MeetingActions from "../../components/Mentors/Meetings/MeetingActions";
import UpcomingMeetings from "../../components/Mentors/Meetings/UpcomingMeetings";
import RecentMeetings from "../../components/Mentors/Meetings/RecentMeetings";
import MeetingSummary from "../../components/Mentors/Meetings/MeetingSummary";
import MeetingGuidelines from "../../components/Mentors/Meetings/MeetingGuidelines";

import ScheduleMeetingModal from "../../components/Mentors/Meetings/ScheduleMeetingModal";
import RecurringMeetingModal from "../../components/Mentors/Meetings/RecurringMeetingModal";
import InstantMeetingModal from "../../components/Mentors/Meetings/InstantMeetingModal";
import StartMeetingModal from "../../components/Mentors/Meetings/StartMeetingModal";
import MeetingWorkspaceModal from "../../components/Mentors/Meetings/MeetingWorkspaceModal";
import MeetingScheduledSuccessModal from "../../components/Mentors/Meetings/MeetingScheduledSuccessModal";

import FloatingDiscussionButton from "../../components/Mentors/Discussion/FloatingDiscussionButton";
import DiscussionDrawer from "../../components/Mentors/Discussion/DiscussionDrawer";

import meetingsService from "../../services/meetingsService.js";

import {
  X,
  CalendarDays,
  Clock3,
  MapPin,
  Video,
  UserRound,
  FileText,
  ClipboardList,
  Flag,
  Pencil,
} from "lucide-react";

// =========================================================
// GENERAL HELPERS
// =========================================================

const TERMINAL_STATUSES = [
  "COMPLETED",
  "CANCELLED",
  "CANCELED",
  "NO_SHOW",
  "NO-SHOW",
];

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const unwrapResponse = (response) => {
  let result = response;

  for (let i = 0; i < 5; i += 1) {
    if (
      result &&
      !Array.isArray(result) &&
      typeof result === "object" &&
      Object.prototype.hasOwnProperty.call(result, "data")
    ) {
      result = result.data;
      continue;
    }

    break;
  }

  return result;
};

const normalizeMeetings = (response) => {
  const payload = unwrapResponse(response);

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.meetings)) return payload.meetings;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;

  return [];
};

const normalizeStudents = (response) => {
  const payload = unwrapResponse(response);

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.students)) return payload.students;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;

  return [];
};

const getMeetingId = (meeting) =>
  meeting?.id ??
  meeting?.meetingId ??
  meeting?.meeting_id ??
  meeting?.rawMeeting?.id ??
  meeting?.rawMeeting?.meetingId ??
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

const getStudentId = (meeting) =>
  meeting?.studentId ??
  meeting?.student?.id ??
  meeting?.student?.studentId ??
  meeting?.student?.student_id ??
  meeting?.student?.userAccountId ??
  meeting?.student?.userAccount?.id ??
  meeting?.student?.user?.id ??
  meeting?.rawMeeting?.studentId ??
  "";

const getStudentName = (student) => {
  if (!student) return "";

  const directName =
    student.fullName ??
    student.name ??
    student.studentName ??
    student.displayName;

  if (typeof directName === "string" && directName.trim()) {
    return directName.trim();
  }

  const userName =
    student.user?.fullName ??
    student.user?.name ??
    student.userAccount?.fullName ??
    student.userAccount?.name ??
    student.account?.fullName;

  if (typeof userName === "string" && userName.trim()) {
    return userName.trim();
  }

  const firstName = student.firstName ?? student.first_name;
  const lastName = student.lastName ?? student.last_name;

  return [firstName, lastName]
    .filter((part) => typeof part === "string" && part.trim())
    .join(" ")
    .trim();
};

const getStudentRegisterNumber = (student) =>
  student?.registerNumber ??
  student?.register_number ??
  student?.registrationNumber ??
  student?.rollNumber ??
  student?.rollNo ??
  "";

const isTerminalMeeting = (meeting) =>
  TERMINAL_STATUSES.includes(normalizeStatus(meeting?.status));

const isMeetingUpcoming = (meeting, now) => {
  const status = normalizeStatus(meeting?.status);

  if (isTerminalMeeting(meeting) || status === "IN_PROGRESS") {
    return false;
  }

  const startValue = getMeetingStart(meeting);

  if (!startValue) return false;

  const startDate = new Date(startValue);

  return (
    !Number.isNaN(startDate.getTime()) &&
    startDate >= now
  );
};

const isMeetingRecent = (meeting, now) => {
  const status = normalizeStatus(meeting?.status);

  if (isTerminalMeeting(meeting)) return true;
  if (status === "IN_PROGRESS") return false;

  const startValue = getMeetingStart(meeting);

  if (!startValue) return false;

  const startDate = new Date(startValue);

  return (
    !Number.isNaN(startDate.getTime()) &&
    startDate < now
  );
};

const calculateSummary = (meetings) => {
  const summary = {
    total: meetings.length,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0,
    inProgress: 0,
  };

  const now = new Date();

  meetings.forEach((meeting) => {
    const status = normalizeStatus(meeting?.status);

    if (status === "COMPLETED") {
      summary.completed += 1;
    } else if (
      status === "CANCELLED" ||
      status === "CANCELED"
    ) {
      summary.cancelled += 1;
    } else if (status === "NO_SHOW") {
      summary.noShow += 1;
    } else if (status === "IN_PROGRESS") {
      summary.inProgress += 1;
    } else if (isMeetingUpcoming(meeting, now)) {
      summary.upcoming += 1;
    }
  });

  return summary;
};

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getLocalTimeString = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

const formatDate = (value) => {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not specified";

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not specified";

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatDuration = (startValue, endValue) => {
  if (!startValue || !endValue) return "Not specified";

  const start = new Date(startValue).getTime();
  const end = new Date(endValue).getTime();

  if (
    Number.isNaN(start) ||
    Number.isNaN(end) ||
    end <= start
  ) {
    return "Not specified";
  }

  const totalMinutes = Math.round((end - start) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours && minutes) return `${hours} hr ${minutes} min`;
  if (hours) return `${hours} hr`;

  return `${minutes} min`;
};

const displayValue = (value, fallback = "Not specified") => {
  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  return value ?? fallback;
};

// =========================================================
// STUDENT RELATION RESOLUTION
// =========================================================

const resolveStudentForMeeting = (meeting, students) => {
  if (!meeting) return null;

  const directStudent =
    meeting.student ??
    meeting.students ??
    meeting.mentee ??
    meeting.studentDetails ??
    meeting.student_details ??
    null;

  const studentFromRelation = Array.isArray(directStudent)
    ? directStudent[0] ?? null
    : directStudent;

  if (
    studentFromRelation &&
    typeof studentFromRelation === "object" &&
    getStudentName(studentFromRelation)
  ) {
    return studentFromRelation;
  }

  const studentId = getStudentId(meeting);

  if (studentId === "" || studentId === null) {
    return studentFromRelation;
  }

  const matchingStudent = students.find((student) => {
    const possibleIds = [
      student?.id,
      student?.studentId,
      student?.student_id,
      student?.userAccountId,
      student?.userAccount?.id,
      student?.user?.id,
    ].filter((value) => value !== undefined && value !== null);

    return possibleIds.some(
      (id) => String(id) === String(studentId)
    );
  });

  return matchingStudent ?? studentFromRelation;
};

const enrichMeetingWithStudent = (meeting, students) => {
  if (!meeting) return meeting;

  const student = resolveStudentForMeeting(meeting, students);

  return {
    ...meeting,
    student: student ?? meeting.student ?? null,
    studentName:
      getStudentName(student) ||
      meeting.studentName ||
      meeting.student_name ||
      "",
    studentRegisterNumber:
      getStudentRegisterNumber(student) ||
      meeting.studentRegisterNumber ||
      meeting.registerNumber ||
      "",
  };
};

// =========================================================
// READ-ONLY MEETING DETAILS MODAL
// =========================================================

const MeetingDetailsModal = ({
  open,
  meeting,
  loading,
  error,
  onClose,
  onEdit,
}) => {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const status = normalizeStatus(meeting?.status);
  const mode = String(meeting?.mode ?? "").toUpperCase();

  const startAt = getMeetingStart(meeting);
  const endAt = getMeetingEnd(meeting);

  const location =
    mode === "ONLINE"
      ? meeting?.meetingLink
      : meeting?.venue;

  const studentName =
    getStudentName(meeting?.student) ||
    meeting?.studentName ||
    meeting?.student_name ||
    "Not specified";

  const registerNumber =
    getStudentRegisterNumber(meeting?.student) ||
    meeting?.studentRegisterNumber ||
    meeting?.registerNumber ||
    "";

  const canEdit = status === "SCHEDULED";

  const fieldClass =
    "rounded-xl border border-slate-200 bg-slate-50 p-3";

  const labelClass =
    "mb-1 flex items-center gap-2 text-xs font-medium text-slate-500";

  const valueClass =
    "break-words text-sm font-medium text-slate-800";

  return (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="meeting-details-heading"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="meeting-details-heading"
                className="break-words text-lg font-semibold text-slate-900"
              >
                {meeting?.title || "Meeting Details"}
              </h2>

              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                {status.replace(/_/g, " ")}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Read-only meeting information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close meeting details"
            className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={19} />
          </button>
        </header>

        <div className="overflow-y-auto p-5 sm:p-6">
          {loading ? (
            <div
              role="status"
              className="py-12 text-center text-sm text-slate-500"
            >
              Loading meeting details...
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          ) : meeting ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className={fieldClass}>
                  <div className={labelClass}>
                    <UserRound size={15} />
                    Student
                  </div>

                  <p className={valueClass}>{studentName}</p>

                  {registerNumber && (
                    <p className="mt-1 text-xs text-slate-500">
                      {registerNumber}
                    </p>
                  )}
                </div>

                <div className={fieldClass}>
                  <div className={labelClass}>
                    <ClipboardList size={15} />
                    Meeting Type
                  </div>

                  <p className={valueClass}>
                    {displayValue(meeting?.meetingType, "REGULAR")}
                  </p>
                </div>

                <div className={fieldClass}>
                  <div className={labelClass}>
                    <CalendarDays size={15} />
                    Date
                  </div>

                  <p className={valueClass}>{formatDate(startAt)}</p>
                </div>

                <div className={fieldClass}>
                  <div className={labelClass}>
                    <Clock3 size={15} />
                    Time
                  </div>

                  <p className={valueClass}>
                    {formatTime(startAt)} – {formatTime(endAt)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Duration: {formatDuration(startAt, endAt)}
                  </p>
                </div>

                <div className={fieldClass}>
                  <div className={labelClass}>
                    {mode === "ONLINE" ? (
                      <Video size={15} />
                    ) : (
                      <MapPin size={15} />
                    )}

                    {mode === "ONLINE" ? "Meeting Link" : "Venue"}
                  </div>

                  {mode === "ONLINE" && meeting?.meetingLink ? (
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-sm font-medium text-blue-600 underline"
                    >
                      {meeting.meetingLink}
                    </a>
                  ) : (
                    <p className={valueClass}>
                      {displayValue(location)}
                    </p>
                  )}
                </div>

                <div className={fieldClass}>
                  <div className={labelClass}>
                    <Flag size={15} />
                    Priority
                  </div>

                  <p className={valueClass}>
                    {displayValue(meeting?.priority, "NORMAL")}
                  </p>
                </div>
              </div>

              <div className={fieldClass}>
                <div className={labelClass}>
                  <ClipboardList size={15} />
                  Agenda
                </div>

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {displayValue(
                    meeting?.agenda,
                    "No agenda provided."
                  )}
                </p>
              </div>

              <div className={fieldClass}>
                <div className={labelClass}>
                  <FileText size={15} />
                  Description
                </div>

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {displayValue(
                    meeting?.description,
                    "No description provided."
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-slate-500">
              Meeting details are unavailable.
            </div>
          )}
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>

          {!loading && !error && meeting && canEdit && (
            <button
              type="button"
              onClick={() => onEdit?.(meeting)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Pencil size={15} />
              Edit Meeting
            </button>
          )}
        </footer>
      </section>
    </div>
  );
};

// =========================================================
// MEETINGS PAGE
// =========================================================

const Meetings = () => {
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);

  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] =
    useState(false);
  const [isRecurringMeetingOpen, setIsRecurringMeetingOpen] =
    useState(false);
  const [isInstantMeetingOpen, setIsInstantMeetingOpen] =
    useState(false);

  const [scheduleMode, setScheduleMode] = useState("CREATE");
  const [meetingToEdit, setMeetingToEdit] = useState(null);

  const [isStartMeetingOpen, setIsStartMeetingOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [activeMeeting, setActiveMeeting] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsMeeting, setDetailsMeeting] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const [isMeetingSuccessOpen, setIsMeetingSuccessOpen] =
    useState(false);
  const [meetingData, setMeetingData] = useState(null);

  const [meetings, setMeetings] = useState([]);
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // -------------------------------------------------------
  // FETCH ASSIGNED STUDENTS
  // -------------------------------------------------------

  const refreshStudents = useCallback(async () => {
    try {
      const response = await meetingsService.getAssignedStudents();
      setStudents(normalizeStudents(response));
    } catch (err) {
      console.error("Failed to fetch assigned students:", err);
    }
  }, []);

  // -------------------------------------------------------
  // FETCH MEETINGS
  // -------------------------------------------------------

  const refreshMeetings = useCallback(async () => {
    setIsRefreshing(true);

    try {
      const response = await meetingsService.getMeetings();
      const normalized = normalizeMeetings(response);

      setMeetings(
        normalized.map((meeting) =>
          enrichMeetingWithStudent(meeting, students)
        )
      );

      setSummary(calculateSummary(normalized));
      setError("");

      return normalized;
    } catch (err) {
      console.error("Failed to fetch mentor meetings:", err);

      setError(
        err?.message || "Unable to load meetings. Please try again."
      );

      return null;
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [students]);

  useEffect(() => {
    refreshStudents();
  }, [refreshStudents]);

  useEffect(() => {
    refreshMeetings();
  }, [refreshMeetings]);

  useEffect(() => {
    setMeetings((current) =>
      current.map((meeting) =>
        enrichMeetingWithStudent(meeting, students)
      )
    );
  }, [students]);

  // -------------------------------------------------------
  // SCHEDULED / RECURRING SUCCESS
  // -------------------------------------------------------

  const handleMeetingSuccess = useCallback(
    async (meeting) => {
      setMeetingData(unwrapResponse(meeting) ?? null);
      setIsMeetingSuccessOpen(true);
      setScheduleMode("CREATE");
      setMeetingToEdit(null);

      await refreshStudents();
      await refreshMeetings();
    },
    [refreshMeetings, refreshStudents]
  );

  const closeSuccessModal = useCallback(() => {
    setIsMeetingSuccessOpen(false);
    setMeetingData(null);
  }, []);

  const showNotice = useCallback((message) => {
    setError("");
    setNotice(message);
  }, []);

  // -------------------------------------------------------
  // INSTANT MEETING SUCCESS
  // -------------------------------------------------------

  const handleInstantMeetingSuccess = useCallback(
    async (meeting) => {
      const startedMeeting = unwrapResponse(meeting);

      if (!startedMeeting || !getMeetingId(startedMeeting)) {
        setError(
          "The meeting started, but its details could not be loaded."
        );
        return;
      }

      setIsInstantMeetingOpen(false);
      setError("");
      setNotice("");

      setSelectedMeeting(null);
      setActiveMeeting(startedMeeting);
      setIsWorkspaceOpen(true);

      await refreshStudents();
      await refreshMeetings();
    },
    [refreshMeetings, refreshStudents]
  );

  // -------------------------------------------------------
  // CREATE / EDIT
  // -------------------------------------------------------

  const openCreateMeeting = useCallback(() => {
    setScheduleMode("CREATE");
    setMeetingToEdit(null);
    setIsScheduleMeetingOpen(true);
  }, []);

  const openEditMeeting = useCallback((meeting) => {
    if (!meeting) return;

    setIsDetailsOpen(false);
    setDetailsMeeting(null);

    setMeetingToEdit(meeting);
    setScheduleMode("EDIT");
    setIsScheduleMeetingOpen(true);
  }, []);

  const closeScheduleModal = useCallback(() => {
    setIsScheduleMeetingOpen(false);
    setMeetingToEdit(null);
    setScheduleMode("CREATE");
  }, []);

  const handleScheduleModalSuccess = useCallback(
    async (meeting) => {
      setIsScheduleMeetingOpen(false);
      setMeetingToEdit(null);
      setScheduleMode("CREATE");

      await handleMeetingSuccess(meeting);
    },
    [handleMeetingSuccess]
  );

  // -------------------------------------------------------
  // START EXISTING SCHEDULED MEETING
  // -------------------------------------------------------

  const handleOpenStartMeeting = useCallback((meeting) => {
    if (!meeting) {
      setError("Unable to select this meeting.");
      return;
    }

    setError("");
    setNotice("");
    setSelectedMeeting(meeting);
    setIsStartMeetingOpen(true);
  }, []);

  const handleCloseStartMeeting = useCallback(() => {
    setIsStartMeetingOpen(false);
    setSelectedMeeting(null);
  }, []);

  const handleLaunchWorkspace = useCallback(
    async (meeting) => {
      const workspaceMeeting = meeting || selectedMeeting;

      if (!workspaceMeeting) {
        setError("Unable to open the meeting workspace.");
        return;
      }

      setError("");
      setNotice("");

      setIsStartMeetingOpen(false);
      setSelectedMeeting(null);

      setActiveMeeting(workspaceMeeting);
      setIsWorkspaceOpen(true);

      await refreshMeetings();
    },
    [refreshMeetings, selectedMeeting]
  );

  // -------------------------------------------------------
  // VIEW DETAILS
  // -------------------------------------------------------

  const closeDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setDetailsMeeting(null);
    setDetailsError("");
    setIsDetailsLoading(false);
  }, []);

  const handleViewMeeting = useCallback(
    async (meeting) => {
      if (!meeting) return;

      const meetingId = getMeetingId(meeting);

      setDetailsMeeting(
        enrichMeetingWithStudent(meeting, students)
      );

      setDetailsError("");
      setIsDetailsOpen(true);

      if (!meetingId) {
        setDetailsError("This meeting has no valid ID.");
        return;
      }

      setIsDetailsLoading(true);

      try {
        const response = await meetingsService.getMeeting(meetingId);
        const details = unwrapResponse(response);

        if (!details || typeof details !== "object") {
          throw new Error(
            "Meeting details were not returned by the server."
          );
        }

        setDetailsMeeting(
          enrichMeetingWithStudent(details, students)
        );
      } catch (err) {
        console.error("Failed to fetch meeting details:", err);

        setDetailsMeeting((current) => {
          if (current && getMeetingId(current)) return current;
          return null;
        });

        setDetailsError(
          err?.message || "Unable to retrieve meeting details."
        );
      } finally {
        setIsDetailsLoading(false);
      }
    },
    [students]
  );

  // -------------------------------------------------------
  // CANCEL MEETING
  // -------------------------------------------------------

  const handleCancelMeeting = useCallback(
    async (meeting) => {
      if (!meeting) return;

      const meetingId = getMeetingId(meeting);

      if (!meetingId) {
        setError("This meeting has no valid ID.");
        return;
      }

      if (normalizeStatus(meeting.status) !== "SCHEDULED") {
        setError("Only scheduled meetings can be cancelled.");
        return;
      }

      const confirmed = window.confirm(
        `Cancel "${meeting.title || "this meeting"}"?`
      );

      if (!confirmed) return;

      try {
        setError("");
        setNotice("");

        await meetingsService.cancelMeeting(meetingId);

        setNotice("Meeting cancelled successfully.");
        await refreshMeetings();
      } catch (err) {
        setError(err?.message || "Unable to cancel this meeting.");
      }
    },
    [refreshMeetings]
  );

  // -------------------------------------------------------
  // RECURRING SERIES
  // -------------------------------------------------------

  const handleDeleteSeries = useCallback(
    async (meeting) => {
      if (!meeting) return;

      const seriesId =
        meeting.seriesId ??
        meeting.series?.id ??
        meeting.meetingSeriesId ??
        null;

      if (!seriesId) {
        setError("This meeting is not linked to a recurring series.");
        return;
      }

      const confirmed = window.confirm(
        "Cancel this recurring series and its eligible future meetings?"
      );

      if (!confirmed) return;

      try {
        setError("");
        setNotice("");

        await meetingsService.cancelRecurringSeries(seriesId);

        setNotice("Recurring series cancelled successfully.");
        await refreshMeetings();
      } catch (err) {
        setError(
          err?.message || "Unable to cancel the recurring series."
        );
      }
    },
    [refreshMeetings]
  );

  const handleEditSeries = useCallback(() => {
    showNotice(
      "Editing an existing recurring series requires a backend update endpoint and an edit form."
    );
  }, [showNotice]);

  const handleSkipOccurrence = useCallback(() => {
    showNotice(
      "Skipping one occurrence requires a dedicated backend endpoint."
    );
  }, [showNotice]);

  const handlePauseSeries = useCallback(() => {
    showNotice(
      "Pausing and resuming recurring series requires a backend endpoint."
    );
  }, [showNotice]);

  // -------------------------------------------------------
  // WORKSPACE
  // -------------------------------------------------------

  const closeWorkspace = useCallback(async () => {
    setIsWorkspaceOpen(false);
    setActiveMeeting(null);
    await refreshMeetings();
  }, [refreshMeetings]);

  const handleWorkspaceUpdated = useCallback(async () => {
    await refreshMeetings();
  }, [refreshMeetings]);

  const handleRetry = useCallback(() => {
    setNotice("");
    refreshMeetings();
    refreshStudents();
  }, [refreshMeetings, refreshStudents]);

  // -------------------------------------------------------
  // DERIVED LISTS
  // -------------------------------------------------------

  const upcomingMeetings = useMemo(() => {
    const now = new Date();

    return meetings
      .filter((meeting) => isMeetingUpcoming(meeting, now))
      .sort(
        (a, b) =>
          new Date(getMeetingStart(a) || 0) -
          new Date(getMeetingStart(b) || 0)
      );
  }, [meetings]);

  const recentMeetings = useMemo(() => {
    const now = new Date();

    return meetings
      .filter((meeting) => isMeetingRecent(meeting, now))
      .sort(
        (a, b) =>
          new Date(getMeetingStart(b) || 0) -
          new Date(getMeetingStart(a) || 0)
      );
  }, [meetings]);

  const editInitialValues = useMemo(() => {
    if (!meetingToEdit) return undefined;

    return {
      studentId: getStudentId(meetingToEdit),
      title: meetingToEdit.title || "",
      meetingType: meetingToEdit.meetingType || "REGULAR",
      mode: meetingToEdit.mode || "IN_PERSON",

      date: getMeetingStart(meetingToEdit)
        ? getLocalDateString(
            new Date(getMeetingStart(meetingToEdit))
          )
        : "",

      startTime: getLocalTimeString(
        getMeetingStart(meetingToEdit)
      ),

      endTime: getLocalTimeString(
        getMeetingEnd(meetingToEdit)
      ),

      venue: meetingToEdit.venue || "",
      meetingLink: meetingToEdit.meetingLink || "",
      priority: meetingToEdit.priority || "NORMAL",
      agenda: meetingToEdit.agenda || "",
      description: meetingToEdit.description || "",
    };
  }, [meetingToEdit]);

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <MentorSidebar />

        <div className="ml-[290px] min-h-screen">
          <MentorHeader />

          <main className="space-y-3 px-6 py-5">
            <MeetingHeader />

            <MeetingActions
              onScheduleMeeting={openCreateMeeting}
              onRecurringMeeting={() =>
                setIsRecurringMeetingOpen(true)
              }
              onInstantMeeting={() =>
                setIsInstantMeetingOpen(true)
              }
              onRefresh={handleRetry}
              isRefreshing={isRefreshing}
            />

            {error && (
              <div
                role="alert"
                className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <span>{error}</span>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="shrink-0 font-semibold underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {notice && (
              <div
                role="status"
                className="flex items-center justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800"
              >
                <span>{notice}</span>

                <button
                  type="button"
                  onClick={() => setNotice("")}
                  className="shrink-0 font-semibold underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {isLoading ? (
              <div
                role="status"
                className="rounded-xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500"
              >
                Loading meetings...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  <UpcomingMeetings
                    meetings={upcomingMeetings}
                    onStartMeeting={handleOpenStartMeeting}
                    onViewDetails={handleViewMeeting}
                    onEditMeeting={openEditMeeting}
                    onCancelMeeting={handleCancelMeeting}
                    onDeleteSeries={handleDeleteSeries}
                    onEditSeries={handleEditSeries}
                    onSkipOccurrence={handleSkipOccurrence}
                    onPauseSeries={handlePauseSeries}
                    onRefresh={refreshMeetings}
                  />

                  <RecentMeetings
                    meetings={recentMeetings}
                    onStartMeeting={handleOpenStartMeeting}
                    onViewDetails={handleViewMeeting}
                    onEditMeeting={openEditMeeting}
                    onCancelMeeting={handleCancelMeeting}
                    onDeleteSeries={handleDeleteSeries}
                    onEditSeries={handleEditSeries}
                    onSkipOccurrence={handleSkipOccurrence}
                    onPauseSeries={handlePauseSeries}
                    onRefresh={refreshMeetings}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  <MeetingSummary
                    meetings={meetings}
                    summary={summary}
                    onRefresh={refreshMeetings}
                  />

                  <MeetingGuidelines />
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      <DiscussionDrawer
        isOpen={isDiscussionOpen}
        setIsDiscussionOpen={setIsDiscussionOpen}
      />

      <StartMeetingModal
        open={isStartMeetingOpen}
        meeting={selectedMeeting}
        onClose={handleCloseStartMeeting}
        onStartMeeting={handleLaunchWorkspace}
      />

      <MeetingWorkspaceModal
        open={isWorkspaceOpen}
        meeting={activeMeeting}
        onClose={closeWorkspace}
        onMeetingUpdated={handleWorkspaceUpdated}
      />

      <MeetingDetailsModal
        open={isDetailsOpen}
        meeting={detailsMeeting}
        loading={isDetailsLoading}
        error={detailsError}
        onClose={closeDetails}
        onEdit={openEditMeeting}
      />

      <ScheduleMeetingModal
        open={isScheduleMeetingOpen}
        onClose={closeScheduleModal}
        onMeetingSuccess={handleScheduleModalSuccess}
        mode={scheduleMode}
        meeting={meetingToEdit}
        initialValues={editInitialValues}
      />

      <RecurringMeetingModal
        open={isRecurringMeetingOpen}
        onClose={() => setIsRecurringMeetingOpen(false)}
        onMeetingSuccess={(meeting) => {
          setIsRecurringMeetingOpen(false);
          handleMeetingSuccess(meeting);
        }}
      />

      <InstantMeetingModal
        open={isInstantMeetingOpen}
        onClose={() => setIsInstantMeetingOpen(false)}
        onMeetingSuccess={handleInstantMeetingSuccess}
      />

      <MeetingScheduledSuccessModal
        open={isMeetingSuccessOpen}
        meeting={meetingData}
        onClose={closeSuccessModal}
      />

      <FloatingDiscussionButton
        isOpen={isDiscussionOpen}
        setIsDiscussionOpen={setIsDiscussionOpen}
      />
    </>
  );
};

export default Meetings;
