import React, { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  Megaphone,
  RefreshCw,
  Users,
} from "lucide-react";
import api from "../../api/axios";

const categoryMeta = {
  GENERAL: {
    label: "General",
    icon: Megaphone,
    style: "border-sky-200 bg-sky-50 text-sky-700",
  },
  ACADEMIC: {
    label: "Academic",
    icon: BookOpen,
    style: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  MEETING_EVENT: {
    label: "Meeting / Event",
    icon: CalendarDays,
    style: "border-violet-200 bg-violet-50 text-violet-700",
  },
  URGENT_NOTICE: {
    label: "Urgent Notice",
    icon: AlertTriangle,
    style: "border-rose-200 bg-rose-50 text-rose-700",
  },
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
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

export default function AnnouncementCards() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/announcements");
      const payload = response?.data?.data;
      setItems(
        Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.items)
            ? payload.items
            : []
      );
    } catch (err) {
      console.error("Failed to load dashboard announcements:", err);
      setError(
        err?.response?.data?.message ||
          "Announcements are temporarily unavailable."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return (
    <section
      className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5"
      aria-labelledby="dashboard-announcements-title"
    >
      <div className="mb-4 flex min-w-0 items-start justify-between gap-2 sm:items-center sm:gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
            <Megaphone size={20} />
          </div>
          <div className="min-w-0">
            <h2
              id="dashboard-announcements-title"
              className="text-base font-bold text-slate-900"
            >
              Announcements
            </h2>
            <p className="break-words text-xs text-slate-500">
              Updates from your Mentor–Mentee Portal
            </p>
          </div>
        </div>
        {!loading && items.length > 0 && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {items.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3" aria-live="polite">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-24 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex min-w-0 flex-col items-start justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="min-w-0 break-words">{error}</span>
          <button
            type="button"
            onClick={loadAnnouncements}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-amber-300 bg-white px-3 py-1.5 font-semibold hover:bg-amber-100"
          >
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 px-3 py-8 text-center sm:px-4">
          <Megaphone className="mx-auto mb-2 text-slate-300" size={26} />
          <p className="text-sm font-semibold text-slate-700">
            No announcements right now
          </p>
          <p className="mt-1 text-xs text-slate-500">
            New announcements for your audience will appear here.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-3 xl:grid-cols-2">
          {items.map((item) => {
            const category =
              categoryMeta[item.category] || categoryMeta.GENERAL;
            const CategoryIcon = category.icon;
            const date = formatDate(item.publishedAt || item.createdAt);
            return (
              <article
                key={item.id}
                className={`min-w-0 rounded-xl border p-3 transition-shadow hover:shadow-sm sm:p-4 ${
                  item.category === "URGENT_NOTICE"
                    ? "border-rose-200 bg-rose-50/40"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border sm:h-9 sm:w-9 ${category.style}`}
                  >
                    <CategoryIcon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h3 className="break-words text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${category.style}`}
                      >
                        {category.label}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
                      {item.message}
                    </p>
                    <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2 text-xs text-slate-500">
                      {date && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={12} className="shrink-0" />
                          {date}
                        </span>
                      )}
                      {item.priority && item.priority !== "NORMAL" && (
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold ${
                            priorityMeta[item.priority] || priorityMeta.NORMAL
                          }`}
                        >
                          {item.priority === "URGENT"
                            ? "Urgent priority"
                            : "High priority"}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Users size={12} className="shrink-0" />
                        {item.audience === "ALL"
                          ? "Everyone"
                          : item.audience === "MENTORS"
                            ? "Mentors"
                            : "Students"}
                      </span>
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
