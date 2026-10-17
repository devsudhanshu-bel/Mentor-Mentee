import React, { useEffect, useState } from "react";
import {
  X,
  User,
  CalendarDays,
  Clock3,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import meetingsService from "../../../services/meetingsService.js";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const FREQUENCY_MAP = {
  Weekly: "WEEKLY",
  "Bi-weekly": "BIWEEKLY",
  Monthly: "MONTHLY",
};

const INITIAL_FORM = {
  studentId: "",
  title: "",
  frequency: "Weekly",
  startDate: "",
  day: "Monday",
  startTime: "",
  endTime: "",
  endType: "Never",
  endDate: "",
  mode: "IN_PERSON",
  venue: "",
  meetingLink: "",
  agenda: "",
};

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

const getStudentName = (student) =>
  student?.fullName ??
  student?.name ??
  student?.studentName ??
  "Unnamed student";

const getStudentId = (student) =>
  student?.id ?? student?.studentId ?? student?.student_id ?? "";

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDateTime = (date, time) => {
  if (!date || !time) return null;

  const value = new Date(`${date}T${time}:00`);

  return Number.isNaN(value.getTime()) ? null : value;
};

const RecurringMeetingModal = ({
  open,
  onClose,
  onMeetingSuccess,
}) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  // Load the mentor's real assigned students.
  useEffect(() => {
    if (!open) return undefined;

    let active = true;

    const loadStudents = async () => {
      setLoadingStudents(true);
      setError("");

      try {
        const response = await meetingsService.getAssignedStudents();

        if (active) {
          setStudents(normalizeStudents(response));
        }
      } catch (err) {
        if (active) {
          setError(
            err?.message ||
              "Unable to load assigned students. Please try again."
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

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setError("");
  };

  const handleClose = () => {
    if (submitting) return;
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    const student = students.find(
      (item) => String(getStudentId(item)) === String(form.studentId)
    );

    if (!student) {
      setError("Please select an assigned student.");
      return;
    }

    if (!form.title.trim()) {
      setError("Please enter a meeting title.");
      return;
    }

    if (!form.startDate) {
      setError("Please select the starting date.");
      return;
    }

    if (!form.startTime || !form.endTime) {
      setError("Please select both meeting times.");
      return;
    }

    const startAt = getDateTime(form.startDate, form.startTime);
    const endAt = getDateTime(form.startDate, form.endTime);

    if (!startAt || !endAt || endAt <= startAt) {
      setError("The meeting end time must be after its start time.");
      return;
    }

    if (
      form.frequency !== "Monthly" &&
      !form.day
    ) {
      setError("Please select a weekday.");
      return;
    }

    if (
      form.endType === "On" &&
      !form.endDate
    ) {
      setError("Please select an end date.");
      return;
    }

    if (
      form.endType === "On" &&
      form.endDate < form.startDate
    ) {
      setError("The end date cannot be before the starting date.");
      return;
    }

    if (
      form.endType === "On" &&
      form.endDate > getLocalDateString(
        new Date(
          new Date(`${form.startDate}T00:00:00`).getTime() +
            366 * 24 * 60 * 60 * 1000
        )
      )
    ) {
      setError("Recurring meetings cannot exceed one year.");
      return;
    }

    if (
      form.mode === "IN_PERSON" &&
      !form.venue.trim()
    ) {
      setError("Please enter the meeting venue.");
      return;
    }

    if (
      form.mode === "ONLINE" &&
      !form.meetingLink.trim()
    ) {
      setError("Please enter the online meeting link.");
      return;
    }

    const payload = {
      studentId: getStudentId(student),
      title: form.title.trim(),
      frequency: FREQUENCY_MAP[form.frequency],
      startDate: form.startDate,
      startTime: form.startTime,
      endTime: form.endTime,
      dayOfWeek:
        form.frequency === "Monthly"
          ? undefined
          : WEEKDAYS.indexOf(form.day),
      endDate:
        form.endType === "On"
          ? form.endDate
          : undefined,
      meetingType: "REGULAR",
      mode: form.mode,
      priority: "NORMAL",
      venue:
        form.mode === "IN_PERSON"
          ? form.venue.trim()
          : undefined,
      meetingLink:
        form.mode === "ONLINE"
          ? form.meetingLink.trim()
          : undefined,
      agenda: form.agenda.trim() || undefined,
      timezone: "Asia/Kolkata",
    };

    setSubmitting(true);
    setError("");

    try {
      const response =
        await meetingsService.createRecurringSeries(payload);

      const result = unwrapResponse(response);

      if (!result || !result.seriesId) {
        throw new Error(
          "The server did not confirm that the recurring series was created."
        );
      }

      resetForm();

      // Notify the parent only after successful API creation.
      await onMeetingSuccess?.(result);
      onClose?.();
    } catch (err) {
      setError(
        err?.message ||
          "Unable to create the recurring meetings. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const inputClass =
    "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-[13px] text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100";

  const labelClass =
    "mb-1 block text-[12px] font-medium text-slate-700";

  return (
    <>
      <div
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      <div className="fixed left-1/2 top-1/2 z-[9999] flex max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-[18px] font-semibold text-slate-800">
              Create Recurring Meeting
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Schedule repeated mentoring sessions for an assigned student.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            aria-label="Close recurring meeting form"
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} className="text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-4 p-5">
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
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
                  No assigned students were found. Check the mentor assignment
                  before creating a series.
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className={labelClass}>
                Meeting Title <span className="text-red-500">*</span>
              </label>

              <input
                required
                type="text"
                maxLength={150}
                value={form.title}
                disabled={submitting}
                onChange={(event) =>
                  handleChange("title", event.target.value)
                }
                placeholder="Weekly Mentorship Meeting"
                className={inputClass}
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="mb-2 block text-[12px] font-medium text-slate-700">
                Frequency
              </label>

              <div className="flex flex-wrap gap-5 text-[13px]">
                {["Weekly", "Bi-weekly", "Monthly"].map((frequency) => (
                  <label
                    key={frequency}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={frequency}
                      checked={form.frequency === frequency}
                      disabled={submitting}
                      onChange={() =>
                        handleChange("frequency", frequency)
                      }
                      className="accent-emerald-600"
                    />
                    {frequency}
                  </label>
                ))}
              </div>
            </div>

            {/* Start date and weekday */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Starts On <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    type="date"
                    min={getLocalDateString()}
                    value={form.startDate}
                    disabled={submitting}
                    onChange={(event) =>
                      handleChange("startDate", event.target.value)
                    }
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {form.frequency !== "Monthly" && (
                <div>
                  <label className={labelClass}>
                    Repeat On
                  </label>

                  <select
                    value={form.day}
                    disabled={submitting}
                    onChange={(event) =>
                      handleChange("day", event.target.value)
                    }
                    className={inputClass}
                  >
                    {WEEKDAYS.slice(1).concat(WEEKDAYS[0]).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {form.frequency === "Monthly" && (
              <p className="text-xs text-slate-500">
                Monthly meetings repeat on the starting date's day of the
                month. Months without that date use the last day of the month.
              </p>
            )}

            {/* Times */}
            <div>
              <label className="mb-2 block text-[12px] font-medium text-slate-700">
                Meeting Time <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="relative">
                  <Clock3
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    type="time"
                    value={form.startTime}
                    disabled={submitting}
                    onChange={(event) =>
                      handleChange("startTime", event.target.value)
                    }
                    className={`${inputClass} pl-10`}
                  />
                </div>

                <span className="text-[13px] text-slate-500">to</span>

                <div className="relative">
                  <Clock3
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    required
                    type="time"
                    value={form.endTime}
                    disabled={submitting}
                    onChange={(event) =>
                      handleChange("endTime", event.target.value)
                    }
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>

            {/* End date */}
            <div>
              <label className="mb-2 block text-[12px] font-medium text-slate-700">
                Ends
              </label>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {["Never", "On"].map((endType) => (
                  <label
                    key={endType}
                    className="flex cursor-pointer items-center gap-2 text-[13px]"
                  >
                    <input
                      type="radio"
                      name="endType"
                      value={endType}
                      checked={form.endType === endType}
                      disabled={submitting}
                      onChange={() => handleChange("endType", endType)}
                      className="accent-emerald-600"
                    />
                    {endType === "Never" ? "No end date" : "On a date"}
                  </label>
                ))}

                {form.endType === "On" && (
                  <div className="relative min-w-[180px] flex-1">
                    <CalendarDays
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      required
                      type="date"
                      min={form.startDate || getLocalDateString()}
                      max={
                        form.startDate
                          ? getLocalDateString(
                              new Date(
                                new Date(
                                  `${form.startDate}T00:00:00`
                                ).getTime() +
                                  366 * 24 * 60 * 60 * 1000
                              )
                            )
                          : undefined
                      }
                      value={form.endDate}
                      disabled={submitting}
                      onChange={(event) =>
                        handleChange("endDate", event.target.value)
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                )}
              </div>

              <p className="mt-2 text-xs text-slate-500">
                The current backend generates up to 90 days of occurrences
                when no end date is provided. A series with an end date can
                generate up to one year of occurrences.
              </p>
            </div>

            {/* Meeting mode */}
            <div>
              <label className={labelClass}>
                Meeting Mode
              </label>

              <div className="flex flex-wrap gap-5 text-[13px]">
                {[
                  { label: "In person", value: "IN_PERSON" },
                  { label: "Online", value: "ONLINE" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={item.value}
                      checked={form.mode === item.value}
                      disabled={submitting}
                      onChange={() => {
                        setForm((previous) => ({
                          ...previous,
                          mode: item.value,
                        }));
                        setError("");
                      }}
                      className="accent-emerald-600"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Venue or link */}
            {form.mode === "IN_PERSON" ? (
              <div>
                <label className={labelClass}>
                  Venue / Cabin <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="text"
                  value={form.venue}
                  disabled={submitting}
                  onChange={(event) =>
                    handleChange("venue", event.target.value)
                  }
                  placeholder="Faculty Cabin B205"
                  className={inputClass}
                />
              </div>
            ) : (
              <div>
                <label className={labelClass}>
                  Meeting Link <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="url"
                  value={form.meetingLink}
                  disabled={submitting}
                  onChange={(event) =>
                    handleChange("meetingLink", event.target.value)
                  }
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
            )}

            {/* Agenda */}
            <div>
              <label className={labelClass}>Agenda</label>

              <textarea
                rows={3}
                maxLength={2000}
                value={form.agenda}
                disabled={submitting}
                onChange={(event) =>
                  handleChange("agenda", event.target.value)
                }
                placeholder="Academic progress review, internship updates..."
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100"
              />
            </div>
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
              disabled={submitting || loadingStudents || students.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <LoaderCircle size={15} className="animate-spin" />
              )}

              {submitting
                ? "Creating Meetings..."
                : "Create Recurring Meeting"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RecurringMeetingModal;