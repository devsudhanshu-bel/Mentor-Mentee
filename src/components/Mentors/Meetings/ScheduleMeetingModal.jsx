import React, { useEffect, useState } from "react";

import {
  X,
  MapPin,
  User,
  CalendarDays,
  Clock3,
  LoaderCircle,
  Video,
  Users,
} from "lucide-react";

import meetingsService from "../../../services/meetingsService.js";

const ALL_STUDENTS = "__ALL_STUDENTS__";

const EMPTY_FORM = {
  studentId: "",
  title: "",
  meetingType: "REGULAR",
  mode: "IN_PERSON",
  date: "",
  startTime: "",
  endTime: "",
  venue: "",
  meetingLink: "",
  priority: "NORMAL",
  agenda: "",
  description: "",
};

const VALID_MODES = ["IN_PERSON", "ONLINE"];
const VALID_TYPES = ["REGULAR", "SPECIAL", "INSTANT"];
const VALID_PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"];

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getLocalTimeString = (value) => {
  if (!value || Number.isNaN(new Date(value).getTime())) return "";

  const date = new Date(value);

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

const extractData = (response) => {
  let value = response;

  for (let i = 0; i < 5; i += 1) {
    if (Array.isArray(value)) return value;
    if (!value || typeof value !== "object") return [];

    if (Array.isArray(value.students)) return value.students;
    if (Array.isArray(value.items)) return value.items;
    if (Array.isArray(value.results)) return value.results;

    if (value.data !== undefined) {
      value = value.data;
      continue;
    }

    return [];
  }

  return Array.isArray(value) ? value : [];
};

const unwrapResponse = (response) => {
  let value = response;

  for (let i = 0; i < 5; i += 1) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return value;
    }

    if (value.data !== undefined) {
      value = value.data;
      continue;
    }

    return value;
  }

  return value;
};

const getStudentName = (student) =>
  student?.fullName ||
  student?.name ||
  student?.user?.fullName ||
  student?.userAccount?.fullName ||
  "Unnamed Student";

const getMeetingStudentId = (meeting) =>
  meeting?.studentId ??
  meeting?.students?.id ??
  meeting?.student?.id ??
  meeting?.student?.studentId ??
  "";

const getMeetingDate = (meeting) => {
  const value = meeting?.startAt ?? meeting?.startTime;

  if (!value) return "";

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "" : getLocalDateString(date);
};

const buildFormFromMeeting = (meeting, mode, initialValues) => {
  const base = {
    ...EMPTY_FORM,
    studentId: String(getMeetingStudentId(meeting)),
    title: meeting?.title ?? "",
    meetingType: meeting?.meetingType ?? "REGULAR",
    mode: meeting?.mode ?? "IN_PERSON",
    date: getMeetingDate(meeting),
    startTime: getLocalTimeString(
      meeting?.startAt ?? meeting?.startTime
    ),
    endTime: getLocalTimeString(
      meeting?.endAt ?? meeting?.endTime
    ),
    venue: meeting?.venue ?? "",
    meetingLink: meeting?.meetingLink ?? "",
    priority: meeting?.priority ?? "NORMAL",
    agenda: meeting?.agenda ?? "",
    description: meeting?.description ?? "",
  };

  const values = { ...base, ...(initialValues || {}) };

  if (mode === "DUPLICATE" && !initialValues?.title) {
    values.title = meeting?.title ? `Copy of ${meeting.title}` : "";
  }

  return {
    ...values,
    studentId: String(values.studentId ?? ""),
    meetingType: VALID_TYPES.includes(values.meetingType)
      ? values.meetingType
      : "REGULAR",
    mode: VALID_MODES.includes(values.mode) ? values.mode : "IN_PERSON",
    priority: VALID_PRIORITIES.includes(values.priority)
      ? values.priority
      : "NORMAL",
  };
};

const ScheduleMeetingModal = ({
  open,
  onClose,
  onMeetingSuccess,
  mode = "CREATE",
  meeting = null,
  initialValues = null,
}) => {
  const normalizedMode = [
    "CREATE",
    "EDIT",
    "RESCHEDULE",
    "DUPLICATE",
  ].includes(String(mode).toUpperCase())
    ? String(mode).toUpperCase()
    : "CREATE";

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [studentError, setStudentError] = useState("");

  const isOnline = form.mode === "ONLINE";

  const isEditing =
    normalizedMode === "EDIT" || normalizedMode === "RESCHEDULE";

  const isDuplicate = normalizedMode === "DUPLICATE";

  const isAllStudents = form.studentId === ALL_STUDENTS;

  const meetingId = meeting?.id ?? meeting?.meetingId ?? null;

  const modalTitle = {
    CREATE: "Schedule Meeting",
    EDIT: "Edit Meeting",
    RESCHEDULE: "Reschedule Meeting",
    DUPLICATE: "Duplicate Meeting",
  }[normalizedMode];

  const submitLabel = {
    CREATE: isAllStudents
      ? "Schedule for All Mentees"
      : "Schedule Meeting",
    EDIT: "Save Changes",
    RESCHEDULE: "Reschedule Meeting",
    DUPLICATE: "Create Duplicate",
  }[normalizedMode];

  useEffect(() => {
    if (!open) return;

    setForm(
      buildFormFromMeeting(
        normalizedMode === "CREATE" ? null : meeting,
        normalizedMode,
        initialValues
      )
    );

    setError("");
    setStudentError("");
  }, [open, normalizedMode, meetingId]);

  useEffect(() => {
    if (!open) return undefined;

    let cancelled = false;

    const loadStudents = async () => {
      setLoadingStudents(true);
      setStudentError("");

      try {
        const response = await meetingsService.getAssignedStudents();

        if (cancelled) return;

        const activeStudents = extractData(response).filter(
          (student) =>
            student?.id &&
            !["INACTIVE", "DISABLED"].includes(
              String(student.status ?? "").toUpperCase()
            )
        );

        setStudents(activeStudents);
      } catch (err) {
        if (!cancelled) {
          setStudentError(
            err.message || "Unable to load assigned students."
          );
        }
      } finally {
        if (!cancelled) setLoadingStudents(false);
      }
    };

    loadStudents();

    return () => {
      cancelled = true;
    };
  }, [open]);

  const handleChange = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
  };

  const resetForm = () => {
    setForm({ ...EMPTY_FORM });
    setError("");
    setStudentError("");
  };

  const handleClose = () => {
    if (submitting) return;

    resetForm();
    onClose?.();
  };

  const handleRetryStudents = async () => {
    setLoadingStudents(true);
    setStudentError("");

    try {
      const response = await meetingsService.getAssignedStudents();

      setStudents(
        extractData(response).filter(
          (student) =>
            student?.id &&
            !["INACTIVE", "DISABLED"].includes(
              String(student.status ?? "").toUpperCase()
            )
        )
      );
    } catch (err) {
      setStudentError(
        err.message || "Unable to load assigned students."
      );
    } finally {
      setLoadingStudents(false);
    }
  };

  const validateForm = () => {
    if (!form.studentId) {
      return "Please select a student or All Mentees.";
    }

    if (isAllStudents && (isEditing || isDuplicate)) {
      return "All Mentees is available when creating a new meeting.";
    }

    if (!form.title.trim()) {
      return "Please enter a meeting title.";
    }

    if (form.title.trim().length > 200) {
      return "Meeting title cannot exceed 200 characters.";
    }

    if (!form.date || !form.startTime || !form.endTime) {
      return "Please select the date, start time, and end time.";
    }

    if (!VALID_TYPES.includes(form.meetingType)) {
      return "Please select a valid meeting type.";
    }

    if (!VALID_MODES.includes(form.mode)) {
      return "Please select a valid meeting mode.";
    }

    if (!VALID_PRIORITIES.includes(form.priority)) {
      return "Please select a valid meeting priority.";
    }

    if (isOnline && !form.meetingLink.trim()) {
      return "Please enter the online meeting link.";
    }

    if (
      isOnline &&
      !/^https?:\/\/\S+$/i.test(form.meetingLink.trim())
    ) {
      return "Enter a valid URL beginning with http:// or https://.";
    }

    if (!isOnline && !form.venue.trim()) {
      return "Please enter the meeting venue.";
    }

    if (form.agenda.length > 5000) {
      return "Agenda cannot exceed 5000 characters.";
    }

    if (form.description.length > 5000) {
      return "Description cannot exceed 5000 characters.";
    }

    const startAt = new Date(`${form.date}T${form.startTime}`);
    const endAt = new Date(`${form.date}T${form.endTime}`);

    if (
      Number.isNaN(startAt.getTime()) ||
      Number.isNaN(endAt.getTime())
    ) {
      return "Please enter a valid meeting date and time.";
    }

    if (startAt <= new Date()) {
      return "The meeting must be scheduled for a future time.";
    }

    if (endAt <= startAt) {
      return "End time must be later than start time.";
    }

    if (isEditing && !meetingId) {
      return "The meeting ID is missing. Please close and reopen this form.";
    }

    if (
      isEditing &&
      String(meeting?.status ?? "").toUpperCase() !== "SCHEDULED"
    ) {
      return "Only scheduled meetings can be edited or rescheduled.";
    }

    if (
      !isAllStudents &&
      !students.some(
        (student) => String(student.id) === String(form.studentId)
      )
    ) {
      // Allow an existing meeting to retain its student if the student
      // no longer appears in the current assignment list.
      if (
        !meeting ||
        String(getMeetingStudentId(meeting)) !== String(form.studentId)
      ) {
        return "Please select a currently assigned student.";
      }
    }

    if (students.length === 0) {
      return "No active assigned students were found.";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const startAt = new Date(`${form.date}T${form.startTime}`);
    const endAt = new Date(`${form.date}T${form.endTime}`);

    const meetingData = {
      ...(isAllStudents
        ? { allStudents: true }
        : { studentId: form.studentId }),

      title: form.title.trim(),
      meetingType: form.meetingType,
      mode: form.mode,
      priority: form.priority,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      venue: isOnline ? null : form.venue.trim(),
      meetingLink: isOnline ? form.meetingLink.trim() : null,
      agenda: form.agenda.trim() || null,
      description: form.description.trim() || null,
    };

    setSubmitting(true);

    try {
      let response;

      if (isEditing) {
        response = await meetingsService.updateMeeting(
          meetingId,
          meetingData
        );
      } else {
        response = await meetingsService.createMeeting(meetingData);
      }

      const savedMeeting = unwrapResponse(response);

      await onMeetingSuccess?.(savedMeeting);

      resetForm();
      onClose?.();
    } catch (err) {
      setError(
        err.message ||
          `Failed to ${
            isEditing ? "update" : "schedule"
          } the meeting. Please try again.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const today = getLocalDateString();

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-meeting-title"
        className="fixed left-1/2 top-1/2 z-[9999] max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2
              id="schedule-meeting-title"
              className="text-[18px] font-semibold text-slate-800"
            >
              {modalTitle}
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              {isEditing
                ? "Update the meeting details and schedule."
                : isDuplicate
                  ? "Review the copied details and choose a new time."
                  : "Schedule a meeting with one or all of your assigned mentees."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            aria-label="Close meeting modal"
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} className="text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700"
              >
                {error}
              </div>
            )}

            {/* STUDENT SELECTION */}
            <div>
              <label
                htmlFor="meeting-student"
                className="mb-1 block text-[12px] font-medium text-slate-700"
              >
                Student / Attendees{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                {isAllStudents ? (
                  <Users
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                  />
                ) : (
                  <User
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                )}

                <select
                  id="meeting-student"
                  value={form.studentId}
                  onChange={(event) =>
                    handleChange("studentId", event.target.value)
                  }
                  disabled={
                    loadingStudents ||
                    submitting ||
                    isEditing ||
                    isDuplicate
                  }
                  required
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-100"
                >
                  <option value="">
                    {loadingStudents
                      ? "Loading assigned students..."
                      : "Select Student"}
                  </option>

                  {normalizedMode === "CREATE" && students.length > 0 && (
                    <option value={ALL_STUDENTS}>
                      All Mentees ({students.length} students)
                    </option>
                  )}

                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {getStudentName(student)}
                      {student.registerNumber
                        ? ` (${student.registerNumber})`
                        : ""}
                    </option>
                  ))}

                  {form.studentId &&
                    form.studentId !== ALL_STUDENTS &&
                    !students.some(
                      (student) =>
                        String(student.id) === String(form.studentId)
                    ) && (
                      <option value={form.studentId}>
                        {meeting?.student
                          ? getStudentName(meeting.student)
                          : "Currently selected student"}
                      </option>
                    )}
                </select>
              </div>

              {isAllStudents && (
                <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-[12px] text-blue-800">
                  <p className="font-semibold">
                    This meeting will be created for all {students.length} active assigned mentees.
                  </p>

                  <p className="mt-1">
                    Each student will receive their own meeting record. All
                    records will initially have the same scheduled date and
                    time.
                  </p>
                </div>
              )}

              {studentError && (
                <div
                  role="alert"
                  className="mt-2 text-[12px] text-red-600"
                >
                  {studentError}

                  <button
                    type="button"
                    onClick={handleRetryStudents}
                    disabled={loadingStudents || submitting}
                    className="ml-2 font-semibold underline disabled:opacity-50"
                  >
                    {loadingStudents ? "Retrying..." : "Retry"}
                  </button>
                </div>
              )}

              {!loadingStudents &&
                !studentError &&
                students.length === 0 && (
                  <p className="mt-1 text-[12px] text-amber-600">
                    No active assigned students were found for your account.
                  </p>
                )}
            </div>

            {/* MEETING TITLE */}
            <div>
              <label
                htmlFor="meeting-title"
                className="mb-1 block text-[12px] font-medium text-slate-700"
              >
                Meeting Title <span className="text-red-500">*</span>
              </label>

              <input
                id="meeting-title"
                type="text"
                value={form.title}
                onChange={(event) =>
                  handleChange("title", event.target.value)
                }
                placeholder="Semester Progress Review"
                maxLength={200}
                required
                disabled={submitting}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-100"
              />
            </div>

            {/* MEETING TYPE AND MODE */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[12px] font-medium text-slate-700">
                  Meeting Type
                </label>

                <div className="flex flex-wrap gap-3 text-[13px]">
                  {[
                    ["REGULAR", "Regular"],
                    ["SPECIAL", "Special"],
                    ["INSTANT", "Instant"],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="meetingType"
                        value={value}
                        checked={form.meetingType === value}
                        onChange={() =>
                          handleChange("meetingType", value)
                        }
                        disabled={submitting}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-medium text-slate-700">
                  Meeting Mode
                </label>

                <div className="flex flex-wrap gap-2">
                  {[
                    ["IN_PERSON", "In Person"],
                    ["ONLINE", "Online"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleChange("mode", value)}
                      disabled={submitting}
                      aria-pressed={form.mode === value}
                      className={`rounded-lg border px-4 py-2 text-[12px] font-medium transition disabled:opacity-50 ${
                        form.mode === value
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DATE AND TIME */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="meeting-date"
                  className="mb-1 block text-[12px] font-medium text-slate-700"
                >
                  <CalendarDays size={14} className="mr-1 inline" />
                  Date <span className="text-red-500">*</span>
                </label>

                <input
                  id="meeting-date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(event) =>
                    handleChange("date", event.target.value)
                  }
                  required
                  disabled={submitting}
                  className="h-10 w-full rounded-lg border border-slate-300 px-2 text-[12px] outline-none focus:border-blue-500 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="meeting-start-time"
                  className="mb-1 block text-[12px] font-medium text-slate-700"
                >
                  <Clock3 size={14} className="mr-1 inline" />
                  Start Time <span className="text-red-500">*</span>
                </label>

                <input
                  id="meeting-start-time"
                  type="time"
                  value={form.startTime}
                  onChange={(event) =>
                    handleChange("startTime", event.target.value)
                  }
                  required
                  disabled={submitting}
                  className="h-10 w-full rounded-lg border border-slate-300 px-2 text-[12px] outline-none focus:border-blue-500 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="meeting-end-time"
                  className="mb-1 block text-[12px] font-medium text-slate-700"
                >
                  <Clock3 size={14} className="mr-1 inline" />
                  End Time <span className="text-red-500">*</span>
                </label>

                <input
                  id="meeting-end-time"
                  type="time"
                  value={form.endTime}
                  onChange={(event) =>
                    handleChange("endTime", event.target.value)
                  }
                  required
                  disabled={submitting}
                  className="h-10 w-full rounded-lg border border-slate-300 px-2 text-[12px] outline-none focus:border-blue-500 disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* VENUE / LINK AND PRIORITY */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="meeting-location"
                  className="mb-1 block text-[12px] font-medium text-slate-700"
                >
                  {isOnline ? "Online Meeting Link" : "Venue / Cabin"}
                  <span className="text-red-500"> *</span>
                </label>

                <div className="relative">
                  {isOnline ? (
                    <Video
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  ) : (
                    <MapPin
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  )}

                  <input
                    id="meeting-location"
                    type={isOnline ? "url" : "text"}
                    value={isOnline ? form.meetingLink : form.venue}
                    onChange={(event) =>
                      handleChange(
                        isOnline ? "meetingLink" : "venue",
                        event.target.value
                      )
                    }
                    placeholder={
                      isOnline
                        ? "https://meet.google.com/..."
                        : "Faculty Cabin B205"
                    }
                    required
                    disabled={submitting}
                    className="h-10 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-[12px] outline-none focus:border-blue-500 disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="meeting-priority"
                  className="mb-1 block text-[12px] font-medium text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="meeting-priority"
                  value={form.priority}
                  onChange={(event) =>
                    handleChange("priority", event.target.value)
                  }
                  disabled={submitting}
                  className="h-10 w-full rounded-lg border border-slate-300 px-3 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-100"
                >
                  <option value="LOW">Low</option>
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

            {/* AGENDA */}
            <div>
              <label
                htmlFor="meeting-agenda"
                className="mb-1 block text-[12px] font-medium text-slate-700"
              >
                Agenda
              </label>

              <textarea
                id="meeting-agenda"
                rows={3}
                value={form.agenda}
                onChange={(event) =>
                  handleChange("agenda", event.target.value)
                }
                placeholder="Topics to discuss during the meeting..."
                maxLength={5000}
                disabled={submitting}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-100"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                htmlFor="meeting-description"
                className="mb-1 block text-[12px] font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="meeting-description"
                rows={3}
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                placeholder="Additional details about this meeting..."
                maxLength={5000}
                disabled={submitting}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none focus:border-blue-500 disabled:bg-slate-100"
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="rounded-lg border border-slate-300 px-5 py-2 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                loadingStudents ||
                students.length === 0
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2 text-[13px] font-medium text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <LoaderCircle size={15} className="animate-spin" />
              )}

              {submitting ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleMeetingModal;