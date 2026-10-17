
import React, { useEffect, useMemo, useState } from "react";

import {
  X,
  User,
  MapPin,
  Users,
  Video,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import meetingsService from "../../../services/meetingsService.js";

const INITIAL_FORM = {
  studentId: "",
  meetingMode: "IN_PERSON",
  venue: "",
  meetingLink: "",
  agenda: "",
};

// =========================================================
// RESPONSE HELPERS
// =========================================================

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
    } else {
      break;
    }
  }

  return result;
};

const normalizeStudents = (response) => {
  const result = unwrapResponse(response);

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.students)) return result.students;
  if (Array.isArray(result?.items)) return result.items;
  if (Array.isArray(result?.results)) return result.results;

  return [];
};

const getMeetingId = (meeting) =>
  meeting?.id ??
  meeting?.meetingId ??
  meeting?.meeting_id ??
  meeting?.meeting?.id ??
  meeting?.meeting?.meetingId ??
  null;

const getStudentId = (student) =>
  student?.id ??
  student?.studentId ??
  student?.student_id ??
  "";

const getStudentName = (student) =>
  student?.fullName ??
  student?.name ??
  student?.studentName ??
  "Unnamed student";

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

// =========================================================
// INSTANT MEETING MODAL
// =========================================================

const InstantMeetingModal = ({
  open,
  onClose,
  onMeetingSuccess,
}) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedStudent = useMemo(
    () =>
      students.find(
        (student) =>
          String(getStudentId(student)) === String(form.studentId)
      ) ?? null,
    [students, form.studentId]
  );

  // -------------------------------------------------------
  // LOAD ASSIGNED STUDENTS
  // -------------------------------------------------------

  useEffect(() => {
    if (!open) return undefined;

    let active = true;

    const loadStudents = async () => {
      setLoadingStudents(true);
      setError("");

      try {
        const response =
          await meetingsService.getAssignedStudents();

        if (active) {
          setStudents(normalizeStudents(response));
        }
      } catch (err) {
        if (active) {
          setError(
            getErrorMessage(err) ||
              "Unable to load assigned students."
          );
        }
      } finally {
        if (active) {
          setLoadingStudents(false);
        }
      }
    };

    loadStudents();

    return () => {
      active = false;
    };
  }, [open]);

  // -------------------------------------------------------
  // ESCAPE KEY
  // -------------------------------------------------------

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !submitting) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, submitting, onClose]);

  // -------------------------------------------------------
  // FORM HELPERS
  // -------------------------------------------------------

  const handleChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setError("");
  };

  const handleClose = () => {
    if (submitting) return;
    onClose?.();
  };

  // -------------------------------------------------------
  // CREATE AND START INSTANT MEETING
  // -------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    if (!selectedStudent) {
      setError("Please select an assigned student.");
      return;
    }

    if (
      form.meetingMode === "IN_PERSON" &&
      !form.venue.trim()
    ) {
      setError("Please enter the meeting venue.");
      return;
    }

    if (form.meetingMode === "ONLINE") {
      if (!form.meetingLink.trim()) {
        setError("Please enter the online meeting link.");
        return;
      }

      try {
        const parsedUrl = new URL(form.meetingLink.trim());

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          setError(
            "Please enter a valid HTTP or HTTPS meeting link."
          );
          return;
        }
      } catch {
        setError("Please enter a valid online meeting link.");
        return;
      }
    }

    setSubmitting(true);
    setError("");

    try {
      const now = new Date();
      const durationMinutes = 30;

      const endAt = new Date(
        now.getTime() + durationMinutes * 60 * 1000
      );

      const createPayload = {
        studentId: getStudentId(selectedStudent),
        title: `Instant Meeting with ${getStudentName(selectedStudent)}`,
        meetingType: "REGULAR",
        mode: form.meetingMode,
        priority: "NORMAL",
        startAt: now.toISOString(),
        endAt: endAt.toISOString(),

        ...(form.meetingMode === "IN_PERSON"
          ? { venue: form.venue.trim() }
          : { meetingLink: form.meetingLink.trim() }),

        ...(form.agenda.trim()
          ? { agenda: form.agenda.trim() }
          : {}),
      };

      // Step 1: Create the meeting record.
      const createResponse =
        await meetingsService.createMeeting(createPayload);

      const createdMeeting = unwrapResponse(createResponse);
      const meetingId = getMeetingId(createdMeeting);

      if (!meetingId) {
        throw new Error(
          "The meeting was created, but the server did not return a meeting ID. Check the create-meeting API response."
        );
      }

      // Step 2: Start the meeting using the backend lifecycle endpoint.
      // Do not report success if this request fails.
      await meetingsService.startMeeting(meetingId);

      // Step 3: Retrieve the authoritative meeting record.
      // The start endpoint may return only a status/message.
      let finalMeeting;

      try {
        const detailsResponse =
          await meetingsService.getMeeting(meetingId);

        finalMeeting = unwrapResponse(detailsResponse);

        // Some APIs wrap the meeting inside a "meeting" property.
        if (
          finalMeeting?.meeting &&
          typeof finalMeeting.meeting === "object"
        ) {
          finalMeeting = finalMeeting.meeting;
        }
      } catch (detailsError) {
        console.error(
          "Meeting started, but refreshing its details failed:",
          detailsError
        );

        // The start endpoint succeeded. Use the created record
        // as a fallback and explicitly represent the successful
        // lifecycle transition in the object passed to the parent.
        finalMeeting = {
          ...createdMeeting,
          id: meetingId,
          status: "IN_PROGRESS",
        };
      }

      if (
        !finalMeeting ||
        typeof finalMeeting !== "object" ||
        Array.isArray(finalMeeting)
      ) {
        finalMeeting = {
          ...createdMeeting,
          id: meetingId,
          status: "IN_PROGRESS",
        };
      }

      // Preserve reliable fields from the create response if the
      // details endpoint does not return them.
      finalMeeting = {
        ...createdMeeting,
        ...finalMeeting,
        id: getMeetingId(finalMeeting) ?? meetingId,
      };

      // Step 4: Notify the parent only after the start request succeeds.
      // The parent will open the meeting workspace.
      await onMeetingSuccess?.(finalMeeting);

      resetForm();
      onClose?.();
    } catch (err) {
      console.error("Failed to start instant meeting:", err);

      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const inputClass =
    "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-[13px] text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100";

  const labelClass =
    "mb-1 block text-[12px] font-medium text-slate-700";

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <>
      {/* Overlay */}
      <div
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[9999] flex max-h-[90vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-[18px] font-semibold text-slate-800">
              Start Instant Meeting
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Launch an instant mentoring session.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            aria-label="Close instant meeting form"
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} className="text-slate-600" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-4 p-5">
            {/* Errors */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />
                <span>{error}</span>
              </div>
            )}

            {/* Student */}
            <div>
              <label className={labelClass}>
                Student <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  required
                  value={form.studentId}
                  disabled={loadingStudents || submitting}
                  onChange={(event) =>
                    handleChange("studentId", event.target.value)
                  }
                  className={`${inputClass} pl-10`}
                >
                  <option value="">
                    {loadingStudents
                      ? "Loading assigned students..."
                      : "Select Student"}
                  </option>

                  {students.map((student) => (
                    <option
                      key={getStudentId(student)}
                      value={getStudentId(student)}
                    >
                      {getStudentName(student)}
                      {student.registerNumber
                        ? ` — ${student.registerNumber}`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              {!loadingStudents && students.length === 0 && (
                <p className="mt-1 text-xs text-amber-700">
                  No assigned students found. Check the mentor assignment.
                </p>
              )}
            </div>

            {/* Student preview */}
            {selectedStudent && (
              <div className="flex items-center gap-4 rounded-xl border border-violet-100 bg-violet-50 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white bg-violet-200 text-lg font-semibold text-violet-800 shadow-sm">
                  {getStudentName(selectedStudent)
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part[0] ?? "")
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-semibold text-slate-800">
                    {getStudentName(selectedStudent)}
                  </h3>

                  {selectedStudent.email && (
                    <p className="mt-1 break-all text-[12px] text-slate-600">
                      {selectedStudent.email}
                    </p>
                  )}

                  {selectedStudent.registerNumber && (
                    <p className="mt-1 text-[12px] text-slate-500">
                      Reg. No. {selectedStudent.registerNumber}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Meeting mode */}
            <div>
              <label className="mb-2 block text-[12px] font-medium text-slate-700">
                Meeting Mode
              </label>

              <div className="flex flex-wrap gap-3">
                {[
                  {
                    label: "In Person",
                    value: "IN_PERSON",
                    Icon: Users,
                  },
                  {
                    label: "Online",
                    value: "ONLINE",
                    Icon: Video,
                  },
                ].map(({ label, value, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    disabled={submitting}
                    onClick={() =>
                      handleChange("meetingMode", value)
                    }
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-[12px] font-medium transition ${
                      form.meetingMode === value
                        ? "border-violet-600 bg-violet-50 text-violet-700"
                        : "border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Venue / online link */}
            <div>
              <label className={labelClass}>
                {form.meetingMode === "ONLINE"
                  ? "Online Meeting Link"
                  : "Venue / Cabin"}
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                {form.meetingMode === "ONLINE" ? (
                  <input
                    required
                    type="url"
                    value={form.meetingLink}
                    disabled={submitting}
                    onChange={(event) =>
                      handleChange("meetingLink", event.target.value)
                    }
                    placeholder="https://meet.google.com/..."
                    className={`${inputClass} pl-10`}
                  />
                ) : (
                  <input
                    required
                    type="text"
                    maxLength={250}
                    value={form.venue}
                    disabled={submitting}
                    onChange={(event) =>
                      handleChange("venue", event.target.value)
                    }
                    placeholder="Faculty Cabin B205"
                    className={`${inputClass} pl-10`}
                  />
                )}
              </div>
            </div>

            {/* Agenda */}
            <div>
              <label className={labelClass}>
                Agenda{" "}
                <span className="font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <textarea
                rows={4}
                maxLength={2000}
                value={form.agenda}
                disabled={submitting}
                onChange={(event) =>
                  handleChange("agenda", event.target.value)
                }
                placeholder="What would you like to discuss?"
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-100"
              />
            </div>

            <p className="text-xs leading-5 text-slate-500">
              An initial 30-minute meeting record will be created.
              The session will then be started through the meeting API.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4">
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <LoaderCircle size={15} className="animate-spin" />
              )}

              {submitting
                ? "Starting Meeting..."
                : "Start Instant Meeting"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InstantMeetingModal;
