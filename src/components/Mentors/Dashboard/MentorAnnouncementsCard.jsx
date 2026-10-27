import React, { useEffect, useState } from "react";
import { Megaphone, CalendarDays, AlertTriangle, BookOpen, Users, RefreshCw } from "lucide-react";
import api from "../../../api/axios";

const categoryMeta = {
  GENERAL: { label: "General", classes: "bg-blue-50 text-blue-700", Icon: Megaphone },
  ACADEMIC: { label: "Academic", classes: "bg-emerald-50 text-emerald-700", Icon: BookOpen },
  MEETING_EVENT: { label: "Meeting / Event", classes: "bg-violet-50 text-violet-700", Icon: CalendarDays },
  URGENT_NOTICE: { label: "Urgent Notice", classes: "bg-rose-50 text-rose-700", Icon: AlertTriangle },
};

const dateLabel = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

export default function MentorAnnouncementsCard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnnouncements = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/mentor/announcements");
      const payload = response.data?.data;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
          ? payload.items
          : Array.isArray(payload?.announcements)
            ? payload.announcements
            : [];
      setItems(list.slice(0, 4));
    } catch (err) {
      console.error("Failed to load mentor announcements:", err);
      setError(err.response?.data?.message || "Announcements are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
            <Megaphone size={19} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Announcements</h2>
            <p className="text-xs text-slate-500">Recent updates for mentors</p>
          </div>
        </div>
        <button
          type="button"
          onClick={loadAnnouncements}
          disabled={loading}
          aria-label="Refresh announcements"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading ? (
        <div className="py-7 text-center text-sm text-slate-500">Loading announcements…</div>
      ) : error ? (
        <p className="rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800">{error}</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 px-3 py-7 text-center">
          <Megaphone size={24} className="mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-medium text-slate-700">No announcements yet</p>
          <p className="mt-1 text-xs text-slate-500">Published notices for mentors and everyone will appear here.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {items.map((item) => {
            const meta = categoryMeta[item.category] || categoryMeta.GENERAL;
            const Icon = meta.Icon;
            return (
              <article key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`mt-0.5 shrink-0 rounded-lg p-2 ${meta.classes}`}>
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="break-words text-sm font-semibold text-slate-800">{item.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${meta.classes}`}>{meta.label}</span>
                    {item.priority === "URGENT" && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">Urgent</span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 whitespace-pre-wrap text-xs leading-5 text-slate-600">{item.message}</p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                    {dateLabel(item.publishedAt || item.createdAt) && (
                      <><CalendarDays size={11} /><span>{dateLabel(item.publishedAt || item.createdAt)}</span></>
                    )}
                    <span className="inline-flex items-center gap-1"><Users size={11} />{item.audience === "ALL" ? "Everyone" : "Mentors"}</span>
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
