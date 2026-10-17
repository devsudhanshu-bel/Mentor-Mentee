import React, { useEffect, useState } from "react";
import {
  CalendarClock,
  Clock,
  Building2,
  GraduationCap,
  ArrowRight,
  RefreshCw,
  ClipboardCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import api from "../../../api/axios";

const UpcomingDeadlines = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUpcomingDeadlines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/mentor/dashboard/overview");
      const data = response.data?.data;

      if (!data) {
        throw new Error("Dashboard data could not be loaded.");
      }

      setReviews(
        Array.isArray(data.upcomingDeadlines)
          ? data.upcomingDeadlines
          : [],
      );
    } catch (err) {
      console.error("Failed to fetch upcoming deadlines:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load pending reviews.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingDeadlines();
  }, []);

  const getReviewType = (type) => {
    switch (type) {
      case "INITIAL_INTERNSHIP_VERIFICATION":
        return {
          label: "Internship Verification",
          description: "Review the student's internship submission",
        };

      case "INTERNSHIP_COMPLETION_VERIFICATION":
        return {
          label: "Internship Completion",
          description: "Verify the internship completion request",
        };

      default:
        return {
          label: "Pending Review",
          description: "Review the submitted student information",
        };
    }
  };

  const getStudentName = (review) =>
    review.student?.fullName ||
    review.student?.name ||
    "Student";

  const getStudentIdentifier = (review) =>
    review.student?.registerNumber ||
    review.student?.registrationNumber ||
    "";

  const getCompanyName = (review) =>
    review.companyName || "Internship details";

  const getSubmittedDate = (review) => {
    const dateValue =
      review.completionRequestedAt ||
      review.createdAt;

    if (!dateValue) return null;

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getReviewKey = (review, index) =>
    `${review.type || "review"}-${review.id || index}`;

  return (
    <section className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
            <CalendarClock
              size={21}
              className="text-amber-600"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800">
              Upcoming Deadlines
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Internship reviews requiring your attention
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchUpcomingDeadlines}
          disabled={loading}
          title="Refresh reviews"
          aria-label="Refresh pending reviews"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <ClipboardCheck
            size={16}
            className="text-slate-500"
          />

          <span className="text-sm font-medium text-slate-600">
            Pending reviews
          </span>
        </div>

        <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
          {loading ? "—" : reviews.length}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-slate-100 p-4"
              >
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-200" />

                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-slate-200" />
                    <div className="h-3 w-1/2 rounded bg-slate-100" />
                    <div className="h-3 w-1/3 rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertCircle
                size={22}
                className="text-red-500"
              />
            </div>

            <h3 className="text-sm font-semibold text-slate-800">
              Couldn't load reviews
            </h3>

            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchUpcomingDeadlines}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
            >
              <RefreshCw size={14} />
              Try again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2
                size={23}
                className="text-emerald-600"
              />
            </div>

            <h3 className="text-sm font-semibold text-slate-800">
              You're all caught up!
            </h3>

            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
              There are no pending internship reviews for your currently
              assigned students.
            </p>
          </div>
        ) : (
          <div className="max-h-[390px] space-y-3 overflow-y-auto pr-1">
            {reviews.map((review, index) => {
              const reviewType = getReviewType(review.type);
              const studentName = getStudentName(review);
              const studentIdentifier =
                getStudentIdentifier(review);
              const submittedDate = getSubmittedDate(review);

              return (
                <article
                  key={getReviewKey(review, index)}
                  className="group rounded-xl border border-slate-200 p-4 transition hover:border-amber-200 hover:bg-amber-50/30"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                      {review.type ===
                      "INTERNSHIP_COMPLETION_VERIFICATION" ? (
                        <GraduationCap
                          size={19}
                          className="text-amber-600"
                        />
                      ) : (
                        <Building2
                          size={19}
                          className="text-amber-600"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-800">
                          {reviewType.label}
                        </h3>

                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                          Pending
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {reviewType.description}
                      </p>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <GraduationCap
                            size={14}
                            className="shrink-0 text-slate-400"
                          />

                          <span className="truncate font-medium">
                            {studentName}
                          </span>

                          {studentIdentifier && (
                            <span className="shrink-0 text-slate-400">
                              · {studentIdentifier}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Building2
                            size={14}
                            className="shrink-0 text-slate-400"
                          />

                          <span className="truncate">
                            {getCompanyName(review)}
                          </span>
                        </div>

                        {submittedDate && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock
                              size={14}
                              className="shrink-0 text-slate-400"
                            />

                            <span>
                              Submitted/requested {submittedDate}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {!loading && !error && reviews.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-3">
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={14} />
            Reviews are ordered by submission/request date.
          </p>
        </div>
      )}
    </section>
  );
};

export default UpcomingDeadlines;