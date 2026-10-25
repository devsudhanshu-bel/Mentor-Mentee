import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  LoaderCircle,
  Save,
  Users,
  X,
} from "lucide-react";
import api from "../../../api/axios";

const todayLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const emptySummary = {
  total: 0,
  marked: 0,
  present: 0,
  absent: 0,
  unmarked: 0,
  percentage: 0,
};

// ============================================================
// TOGGLE
// PRESENT = LEFT + GREEN
// ABSENT  = RIGHT + RED
// ============================================================

const Toggle = ({ value, onChange, disabled, name }) => {
  const isPresent = value === "PRESENT";
  const isAbsent = value === "ABSENT";

  return (
    <div
      className="inline-flex items-center gap-2"
      aria-label={`Attendance for ${name}`}
    >
      <span
        className={`text-xs font-semibold transition-colors ${
          isPresent ? "text-emerald-700" : "text-slate-400"
        }`}
      >
        Present
      </span>

      <button
        type="button"
        role="switch"
        aria-label={`Attendance for ${name}`}
        aria-checked={isAbsent}
        disabled={disabled}
        onClick={() => onChange(isPresent ? "ABSENT" : "PRESENT")}
        className={`relative inline-flex h-7 w-[54px] shrink-0 items-center rounded-full border-0 p-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
          isPresent ? "bg-emerald-500" : "bg-rose-500"
        }`}
      >
        <span
          className={`pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            isAbsent ? "translate-x-[26px]" : "translate-x-0"
          }`}
        />
      </button>

      <span
        className={`text-xs font-semibold transition-colors ${
          isAbsent ? "text-rose-700" : "text-slate-400"
        }`}
      >
        Absent
      </span>
    </div>
  );
};

// ============================================================
// MENTORING ATTENDANCE PANEL
// ============================================================

export default function MentoringAttendancePanel() {
  const [expanded, setExpanded] = useState(false);
  const [date, setDate] = useState(todayLocal);
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // ----------------------------------------------------------
  // LOAD ATTENDANCE
  // Server's submitted flag locks previously submitted dates.
  // ----------------------------------------------------------

  const load = useCallback(
    async (selectedDate = date) => {
      setLoading(true);
      setError("");
      setNotice("");
      setIsSubmitted(false);

      try {
        const response = await api.get("/mentor/mentoring-attendance", {
          params: { date: selectedDate },
        });

        const payload = response.data?.data ?? response.data;

        setStudents(Array.isArray(payload?.students) ? payload.students : []);
        setSummary(payload?.summary ?? emptySummary);

        const submitted = Boolean(payload?.submitted);
        setIsSubmitted(submitted);

        if (submitted) {
          setNotice(
            `Attendance for ${selectedDate} has already been submitted. This date is locked.`,
          );
        }
      } catch (e) {
        setError(
          e.response?.data?.message ||
            e.message ||
            "Could not load mentoring attendance.",
        );
      } finally {
        setLoading(false);
      }
    },
    [date],
  );

  useEffect(() => {
    if (expanded) {
      load(date);
    }
  }, [expanded, date, load]);

  // ----------------------------------------------------------
  // UPDATE STATUS AND SUMMARY
  // ----------------------------------------------------------

  const setStatus = (studentId, status) => {
    if (isSubmitted || saving) return;

    setStudents((current) => {
      const updated = current.map((student) =>
        student.id === studentId ? { ...student, status } : student,
      );

      const marked = updated.filter(
        (student) =>
          student.status === "PRESENT" || student.status === "ABSENT",
      );

      const present = marked.filter(
        (student) => student.status === "PRESENT",
      ).length;

      const absent = marked.filter(
        (student) => student.status === "ABSENT",
      ).length;

      setSummary({
        total: updated.length,
        marked: marked.length,
        present,
        absent,
        unmarked: updated.length - marked.length,
        percentage: marked.length
          ? Math.round((present / marked.length) * 100)
          : 0,
      });

      return updated;
    });

    setError("");
    setNotice("");
  };

  // ----------------------------------------------------------
  // RECORDS READY TO SUBMIT
  // ----------------------------------------------------------

  const pending = useMemo(
    () =>
      students
        .filter(
          (student) =>
            student.status === "PRESENT" || student.status === "ABSENT",
        )
        .map((student) => ({
          studentId: student.id,
          status: student.status,
        })),
    [students],
  );

  const allStudentsMarked =
    students.length > 0 && pending.length === students.length;

  // ----------------------------------------------------------
  // SUBMIT ATTENDANCE
  // ----------------------------------------------------------

  const save = async () => {
    if (isSubmitted || saving) return;

    if (!students.length || !allStudentsMarked) {
      setError(
        "Mark Present or Absent for every assigned mentee before submitting.",
      );
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await api.put("/mentor/mentoring-attendance", {
        date,
        records: pending,
      });

      const payload = response.data?.data ?? response.data;

      if (Array.isArray(payload?.students)) {
        setStudents(payload.students);
      }

      if (payload?.summary) {
        setSummary(payload.summary);
      }

      // Lock immediately after the server confirms submission.
      setIsSubmitted(true);
      setNotice(`Attendance submitted for ${date}. This date is now locked.`);
    } catch (e) {
      // HTTP 409 means the date was already submitted elsewhere.
      if (e.response?.status === 409) {
        setIsSubmitted(true);
        setError(
          "Attendance has already been submitted for this date. Changes are disabled.",
        );

        // Reload canonical saved records and submitted status.
        await load(date);
      } else {
        setError(
          e.response?.data?.message ||
            e.message ||
            "Could not submit attendance.",
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ClipboardCheck size={22} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Mentoring Attendance
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Record attendance for your assigned mentees by session date.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <ClipboardCheck size={16} />
          {expanded ? "Close Attendance" : "Mark Attendance"}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 p-5">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <label className="block max-w-xs text-xs font-semibold text-slate-600">
              Mentoring session date
              <div className="relative mt-2">
                <CalendarDays
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="date"
                  value={date}
                  max={todayLocal()}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </label>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Metric label="Mentees" value={summary.total} />
              <Metric
                label="Present"
                value={summary.present}
                color="text-emerald-700"
              />
              <Metric
                label="Absent"
                value={summary.absent}
                color="text-rose-700"
              />
              <Metric
                label="Unmarked"
                value={summary.unmarked}
                color="text-amber-700"
              />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700"
            >
              <X size={16} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {notice && (
            <div
              role="status"
              className={`mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                isSubmitted
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-emerald-100 bg-emerald-50 text-emerald-700"
              }`}
            >
              <Check size={16} />
              {notice}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
              <LoaderCircle size={18} className="animate-spin" />
              Loading assigned mentees…
            </div>
          ) : students.length === 0 ? (
            <div className="rounded-xl bg-slate-50 px-4 py-10 text-center">
              <Users size={28} className="mx-auto text-slate-400" />
              <p className="mt-3 text-sm font-medium text-slate-700">
                No active mentees found
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Assigned students will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-2 hidden grid-cols-[minmax(0,1fr)_auto] items-center px-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:grid">
                <span>Mentee</span>
                <span className="pr-2">Attendance status</span>
              </div>

              <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {student.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {student.registerNumber}
                        {student.section ? ` · ${student.section}` : ""}
                        {student.semester
                          ? ` · Semester ${student.semester}`
                          : ""}
                      </p>
                    </div>

                    <Toggle
                      name={student.fullName}
                      value={student.status}
                      disabled={saving || loading || isSubmitted}
                      onChange={(status) => setStatus(student.id, status)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  {summary.marked} of {summary.total} students marked ·{" "}
                  {summary.percentage}% present among marked students
                </p>

                <button
                  type="button"
                  onClick={save}
                  disabled={
                    saving || loading || isSubmitted || !allStudentsMarked
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : isSubmitted ? (
                    <Check size={16} />
                  ) : (
                    <Save size={16} />
                  )}

                  {saving
                    ? "Submitting…"
                    : isSubmitted
                      ? "Attendance Submitted"
                      : "Submit Attendance"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

// ============================================================
// SUMMARY METRIC
// ============================================================

function Metric({ label, value, color = "text-slate-900" }) {
  return (
    <div className="min-w-[74px] rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-[10px] font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-lg font-bold ${color}`}>{value ?? 0}</p>
    </div>
  );
}
