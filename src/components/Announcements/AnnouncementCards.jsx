import React, { useCallback, useEffect, useState } from "react";
import { AlertTriangle, BookOpen, CalendarDays, Megaphone, RefreshCw, Users } from "lucide-react";
import api from "../../api/axios";

const categoryMeta = {
  GENERAL: { label: "General", icon: Megaphone, style: "border-sky-200 bg-sky-50 text-sky-700" },
  ACADEMIC: { label: "Academic", icon: BookOpen, style: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  MEETING_EVENT: { label: "Meeting / Event", icon: CalendarDays, style: "border-violet-200 bg-violet-50 text-violet-700" },
  URGENT_NOTICE: { label: "Urgent Notice", icon: AlertTriangle, style: "border-rose-200 bg-rose-50 text-rose-700" },
};

const priorityMeta = {
  NORMAL: "bg-slate-100 text-slate-600",
  HIGH: "bg-amber-100 text-amber-800",
  URGENT: "bg-rose-100 text-rose-700",
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export default function AnnouncementCards({ compact = false }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/announcements");
      const payload = response?.data?.data;
      setItems(Array.isArray(payload) ? payload : Array.isArray(payload?.items) ? payload.items : []);
    } catch (err) {
      console.error("Failed to load dashboard announcements:", err);
      setError(err?.response?.data?.message || "Announcements are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAnnouncements(); }, [loadAnnouncements]);

  return (
    <section className={`rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm ${compact ? "flex h-[355px] flex-col overflow-hidden" : "sm:p-5"}`} aria-labelledby="dashboard-announcements-title">
      <div className={`flex items-center justify-between gap-3 ${compact ? "mb-3" : "mb-4"}`} >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Megaphone size={20} />
          </div>
          <div>
            <h2 id="dashboard-announcements-title" className="text-[17px] font-bold text-slate-900">Announcements</h2>
            {!compact && <p className="text-xs text-slate-500">Updates from your Mentor–Mentee Portal</p>}
          </div>
        </div>
        {!loading && items.length > 0 && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{items.length}</span>}
      </div>

      {loading ? (
        <div className={`space-y-3 ${compact ? "flex-1 overflow-hidden" : ""}`} aria-live="polite">
          {[1, 2].map((n) => <div key={n} className={`${compact ? "h-12" : "h-24"} animate-pulse rounded-xl bg-slate-100`} />)}
        </div>
      ) : error ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <span>{error}</span>
          <button type="button" onClick={loadAnnouncements} className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-3 py-1.5 font-semibold hover:bg-amber-100"><RefreshCw size={14} /> Retry</button>
        </div>
      ) : items.length === 0 ? (
        <div className={`rounded-xl border border-dashed border-slate-200 px-4 text-center ${compact ? "flex flex-1 flex-col items-center justify-center py-4" : "py-8"}`}>
          <Megaphone className="mx-auto mb-2 text-slate-300" size={26} />
          <p className="text-sm font-semibold text-slate-700">No announcements right now</p>
          <p className="mt-1 text-xs text-slate-500">New announcements for your audience will appear here.</p>
        </div>
      ) : (
        <div className={compact ? "flex-1 divide-y divide-slate-100 overflow-y-auto" : "grid grid-cols-1 gap-3 xl:grid-cols-2"}>
          {(compact ? items.slice(0, 5) : items).map((item) => {
            const category = categoryMeta[item.category] || categoryMeta.GENERAL;
            const CategoryIcon = category.icon;
            const date = formatDate(item.publishedAt || item.createdAt);
            return (
              <article key={item.id} className={compact ? "py-3 first:pt-0 last:pb-0" : `rounded-xl border p-4 transition-shadow hover:shadow-sm ${item.category === "URGENT_NOTICE" ? "border-rose-200 bg-rose-50/40" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${category.style}`}><CategoryIcon size={16} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="break-words text-[13px] font-semibold leading-5 text-slate-900">{item.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${category.style}`}>{category.label}</span>
                    </div>
                    <p className={`whitespace-pre-wrap break-words text-slate-600 ${compact ? "mt-1 line-clamp-2 text-xs leading-4" : "mt-2 text-sm leading-5"}`}>{item.message}</p>
                    <div className={`flex flex-wrap items-center gap-2 text-xs text-slate-500 ${compact ? "mt-1" : "mt-3"}`}>
                      {date && <span className="inline-flex items-center gap-1"><CalendarDays size={12} />{date}</span>}
                      {item.priority && item.priority !== "NORMAL" && <span className={`rounded-full px-2 py-0.5 font-semibold ${priorityMeta[item.priority] || priorityMeta.NORMAL}`}>{item.priority === "URGENT" ? "Urgent priority" : "High priority"}</span>}
                      <span className="inline-flex items-center gap-1"><Users size={12} />{item.audience === "ALL" ? "Everyone" : item.audience === "MENTORS" ? "Mentors" : "Students"}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
