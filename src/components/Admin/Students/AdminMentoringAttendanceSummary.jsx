import React, { useCallback, useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock3, RefreshCw, XCircle } from "lucide-react";
import api from "../../../api/axios";

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? String(value).slice(0, 10)
    : date.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};

const Stat = ({ label, value, hint, icon: Icon, tone }) => {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone] || tones.blue}`}><Icon size={17} /></span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
};

export default function AdminMentoringAttendanceSummary({ studentId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (isRefresh = false) => {
    if (!studentId) return;
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const response = await api.get(`/admin/students/${studentId}/mentoring-attendance`);
      const payload = response?.data?.data ?? response?.data ?? {};
      setData(payload);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load mentoring attendance summary.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [studentId]);

  useEffect(() => { load(); }, [load]);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900"><CalendarCheck size={19} className="text-blue-600" /> Mentoring Attendance</h2>
          <p className="mt-1 text-sm text-slate-500">Read-only summary of the meetings recorded by the student's mentor.</p>
        </div>
        <button type="button" onClick={() => load(true)} disabled={loading || refreshing} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
          <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">Loading mentoring attendance…</div>
      ) : error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" role="alert">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Total Meetings" value={data?.summary?.total ?? 0} hint="Recorded meetings" icon={Clock3} tone="blue" />
            <Stat label="Present" value={data?.summary?.present ?? 0} hint="Meetings attended" icon={CheckCircle2} tone="green" />
            <Stat label="Absent" value={data?.summary?.absent ?? 0} hint="Meetings missed" icon={XCircle} tone="red" />
            <Stat label="Attendance Rate" value={`${data?.summary?.percentage ?? 0}%`} hint="Present ÷ total recorded" icon={CalendarCheck} tone="slate" />
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="font-semibold text-slate-800">Attendance History</h3>
              <p className="mt-1 text-xs text-slate-500">Newest meeting first</p>
            </div>
            {!Array.isArray(data?.history) || data.history.length === 0 ? (
              <p className="p-6 text-center text-sm text-slate-500">No mentoring attendance has been recorded for this student yet.</p>
            ) : (
              <div className="max-h-80 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr><th className="px-4 py-3 font-semibold">Meeting Date</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Recorded At</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.history.map((row, index) => (
                      <tr key={`${row.sessionDate}-${index}`} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-4 py-3 text-slate-700">{formatDate(row.sessionDate)}</td>
                        <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === "PRESENT" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{row.status === "PRESENT" ? "Present" : "Absent"}</span></td>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-500">{row.markedAt ? new Date(row.markedAt).toLocaleString() : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
