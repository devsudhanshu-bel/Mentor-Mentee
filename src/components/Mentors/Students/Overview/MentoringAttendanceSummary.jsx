import React, { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock, LoaderCircle, XCircle } from "lucide-react";
import api from "../../../../api/axios";

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  });
};

export default function MentoringAttendanceSummary({ studentId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(
          `/mentor/mentoring-attendance/students/${studentId}/summary`
        );
        const payload = response.data?.data ?? response.data;
        if (!cancelled) setData(payload);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load this student's mentoring attendance."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (studentId) load();
    return () => { cancelled = true; };
  }, [studentId]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarCheck size={20} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Mentoring Attendance</h2>
          <p className="mt-1 text-xs text-slate-500">Individual meeting attendance recorded by your mentoring sessions.</p>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
            <LoaderCircle size={18} className="animate-spin" /> Loading attendance summary…
          </div>
        ) : error ? (
          <div role="alert" className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label="Meetings attended" value={data?.summary?.present ?? 0} color="text-emerald-700" />
              <Metric label="Meetings absent" value={data?.summary?.absent ?? 0} color="text-rose-700" />
              <Metric label="Total recorded" value={data?.summary?.total ?? 0} />
              <Metric label="Attendance rate" value={`${data?.summary?.percentage ?? 0}%`} color="text-blue-700" />
            </div>

            <div className="mt-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Meeting history</h3>
              {!data?.history?.length ? (
                <div className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  No mentoring attendance has been recorded for this student yet.
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  {data.history.map((item) => {
                    const present = item.status === "PRESENT";
                    return (
                      <div key={`${item.sessionDate}-${item.status}`} className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0">
                        <div className="flex items-center gap-2.5">
                          {present ? <CheckCircle2 size={17} className="text-emerald-600" /> : <XCircle size={17} className="text-rose-600" />}
                          <span className="text-sm font-medium text-slate-700">{formatDate(item.sessionDate)}</span>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${present ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                          {present ? "Present" : "Absent"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                <Clock size={13} /> Counts include saved attendance records only.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Metric({ label, value, color = "text-slate-900" }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
