import React, { useCallback, useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, XCircle, ClipboardList, RefreshCw } from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const getToken = () =>
  localStorage.getItem("accessToken") ||
  localStorage.getItem("token") ||
  localStorage.getItem("access_token");

const unwrap = (payload) => {
  let value = payload;
  for (let i = 0; i < 4; i += 1) {
    if (value && !Array.isArray(value) && typeof value === "object" && value.data !== undefined) {
      value = value.data;
    } else break;
  }
  return value;
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
};

const StatCard = ({ icon: Icon, label, value, tone }) => {
  const tones = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    green: "border-emerald-100 bg-emerald-50 text-emerald-700",
    red: "border-rose-100 bg-rose-50 text-rose-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone]}`}>
        <Icon size={18} />
      </div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
};

export default function StudentMentoringAttendance() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAttendance = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/mentee/mentoring-attendance`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const contentType = response.headers.get("content-type") || "";
      const body = response.status === 204 ? null : contentType.includes("application/json") ? await response.json() : await response.text();
      if (!response.ok) {
        throw new Error(body?.message || body?.error || (typeof body === "string" ? body : "Unable to load mentoring attendance."));
      }
      const data = unwrap(body) || {};
      setSummary(data.summary || { total: 0, present: 0, absent: 0, percentage: 0 });
      setHistory(Array.isArray(data.history) ? data.history : []);
    } catch (e) {
      setError(e?.message || "Unable to load mentoring attendance.");
      setSummary(null);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAttendance(); }, [loadAttendance]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#142970]">Mentoring Attendance</h2>
          <p className="mt-1 text-xs text-slate-500">Your recorded attendance for mentor meetings.</p>
        </div>
        <button type="button" onClick={loadAttendance} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => <div key={n} className="h-28 animate-pulse rounded-xl bg-slate-100" />)}
        </div>
      ) : error ? (
        <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p>{error}</p>
          <button type="button" onClick={loadAttendance} className="mt-2 font-semibold underline">Try again</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={ClipboardList} label="Total Recorded Meetings" value={summary?.total ?? 0} tone="blue" />
            <StatCard icon={CheckCircle2} label="Present" value={summary?.present ?? 0} tone="green" />
            <StatCard icon={XCircle} label="Absent" value={summary?.absent ?? 0} tone="red" />
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700"><CalendarDays size={18} /></div>
              <p className="text-xs font-medium text-slate-500">Attendance Rate</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{Number(summary?.percentage ?? 0).toFixed(1)}%</p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
              <h3 className="text-sm font-semibold text-slate-800">Attendance History</h3>
            </div>
            {history.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-slate-500">No mentoring attendance has been recorded for you yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-white text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr><th className="px-4 py-3 font-semibold">Meeting date</th><th className="px-4 py-3 font-semibold">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {history.map((item, index) => {
                      const present = String(item.status || "").toUpperCase() === "PRESENT";
                      return <tr key={`${item.sessionDate || item.date || index}-${index}`} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-4 py-3 text-slate-700">{formatDate(item.sessionDate || item.date)}</td>
                        <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${present ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{present ? "Present" : "Absent"}</span></td>
                      </tr>;
                    })}
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
