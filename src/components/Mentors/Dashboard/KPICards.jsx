import React, { useCallback, useEffect, useState } from "react";
import {
  GraduationCap, CalendarDays, CalendarClock, ClipboardCheck,
  BriefcaseBusiness, CheckCircle2, RefreshCw, AlertCircle,
} from "lucide-react";
import api from "../../../api/axios";

const INITIAL_METRICS = {
  assignedStudents: null,
  meetingsToday: null,
  upcomingMeetings: null,
  pendingInternshipReviews: null,
  pendingCompletionRequests: null,
  completedMeetings: null,
};

const cards = [
  { key: "assignedStudents", title: "Assigned Students", description: "Currently assigned mentees", icon: GraduationCap, bg: "bg-blue-50", color: "text-blue-600" },
  { key: "meetingsToday", title: "Today's Meetings", description: "Scheduled for today", icon: CalendarDays, bg: "bg-purple-50", color: "text-purple-600" },
  { key: "upcomingMeetings", title: "Upcoming Meetings", description: "Future scheduled sessions", icon: CalendarClock, bg: "bg-sky-50", color: "text-sky-600" },
  { key: "pendingInternshipReviews", title: "Internship Reviews", description: "Awaiting initial verification", icon: ClipboardCheck, bg: "bg-amber-50", color: "text-amber-600" },
  { key: "pendingCompletionRequests", title: "Completion Requests", description: "Awaiting completion verification", icon: BriefcaseBusiness, bg: "bg-orange-50", color: "text-orange-600" },
  { key: "completedMeetings", title: "Completed Meetings", description: "Recorded as completed", icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
];

const KPICards = () => {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [studentsResult, overviewResult] = await Promise.allSettled([
        api.get("/mentor/students"),
        api.get("/mentor/dashboard/overview"),
      ]);

      const nextMetrics = { ...INITIAL_METRICS };
      let hasSuccessfulRequest = false;

      if (studentsResult.status === "fulfilled") {
        hasSuccessfulRequest = true;
        const students = studentsResult.value.data?.data?.students;
        if (Array.isArray(students)) nextMetrics.assignedStudents = students.length;
      }

      if (overviewResult.status === "fulfilled") {
        hasSuccessfulRequest = true;
        const overview = overviewResult.value.data?.data;

        if (overview) {
          const stats = overview.stats || {};

          if (Array.isArray(overview.todaysMeetings)) {
            nextMetrics.meetingsToday = overview.todaysMeetings.length;
          } else if (Number.isFinite(Number(stats.meetingsToday))) {
            nextMetrics.meetingsToday = Number(stats.meetingsToday);
          }

          if (Array.isArray(overview.upcomingMeetings)) {
            nextMetrics.upcomingMeetings = overview.upcomingMeetings.length;
          } else if (Number.isFinite(Number(stats.upcomingMeetings))) {
            nextMetrics.upcomingMeetings = Number(stats.upcomingMeetings);
          }

          if (Array.isArray(overview.upcomingDeadlines)) {
            const reviews = overview.upcomingDeadlines;
            nextMetrics.pendingInternshipReviews = reviews.filter(
              (item) => item.type === "INITIAL_INTERNSHIP_VERIFICATION"
            ).length;
            nextMetrics.pendingCompletionRequests = reviews.filter(
              (item) => item.type === "INTERNSHIP_COMPLETION_VERIFICATION"
            ).length;
          } else {
            if (Number.isFinite(Number(stats.pendingInternshipReviews))) {
              nextMetrics.pendingInternshipReviews = Number(stats.pendingInternshipReviews);
            }
            if (Number.isFinite(Number(stats.pendingCompletionRequests))) {
              nextMetrics.pendingCompletionRequests = Number(stats.pendingCompletionRequests);
            }
          }

          if (Number.isFinite(Number(stats.completedMeetings))) {
            nextMetrics.completedMeetings = Number(stats.completedMeetings);
          }
        }
      }

      setMetrics(nextMetrics);

      if (!hasSuccessfulRequest) {
        setError("Unable to load dashboard statistics.");
      } else if (Object.values(nextMetrics).every((value) => value === null)) {
        setError("Dashboard statistics are not available from the API yet.");
      }
    } catch (err) {
      console.error("Failed to fetch mentor KPI metrics:", err);
      setError("Unable to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <section className="w-full min-w-0">
      <div className="mb-3 flex min-h-8 items-start justify-between gap-3 sm:items-center">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-700">Mentoring Overview</h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            Your students, meetings, and pending reviews
          </p>
        </div>

        <button
          type="button"
          onClick={fetchMetrics}
          disabled={loading}
          aria-label="Refresh mentoring overview"
          title="Refresh statistics"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="mb-3 flex min-w-0 items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="min-w-0 break-words text-xs leading-5 text-amber-700">{error}</p>
        </div>
      )}

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {cards.map((card) => {
          const Icon = card.icon;
          const value = metrics[card.key];

          return (
            <article
              key={card.key}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
            >
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${card.bg}`}>
                  <Icon size={20} strokeWidth={2.1} className={card.color} />
                </div>
                <h3 className="min-w-0 break-words text-xs font-semibold leading-tight text-slate-700">
                  {card.title}
                </h3>
              </div>

              <div className="mt-3 sm:mt-4">
                <p className="break-words text-2xl font-bold leading-none tabular-nums text-slate-900">
                  {loading && value === null ? "—" : value === null ? "—" : value}
                </p>
                <p className="mt-2 break-words text-xs leading-5 text-slate-500">
                  {card.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default KPICards;
