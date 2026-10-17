import React, { useCallback, useEffect, useState } from "react";

import {
  FileText,
  CircleCheck,
  Clock3,
  FileClock,
  RotateCcw,
} from "lucide-react";

import { getDocumentsDashboard } from "../../api/document.api";

const INITIAL_STATS = {
  totalSubmissions: 0,
  published: 0,
  underReview: 0,
  drafts: 0,
};

const normalizeStatus = (value) =>
  String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getResearchStatus = (document) =>
  normalizeStatus(
    document?.researchReviewStatus ??
      document?.reviewStatus ??
      document?.verificationStatus ??
      document?.approvalStatus ??
      document?.status
  );

const VERIFIED_STATUSES = new Set(["VERIFIED", "APPROVED"]);

const REVIEW_STATUSES = new Set([
  "NOT_REVIEWED",
  "PENDING",
  "PENDING_REVIEW",
  "UNDER_REVIEW",
  "SUBMITTED",
]);

const DRAFT_STATUSES = new Set(["DRAFT"]);

const ResearchStats = ({ refreshKey = 0 }) => {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchResearchStats = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getDocumentsDashboard("RESEARCH");

      // Support both the API helper's unwrapped response and
      // the nested shape returned by the backend service.
      const documents = Array.isArray(response?.documents)
        ? response.documents
        : Array.isArray(response?.data?.documents)
          ? response.data.documents
          : [];

      const researchDocuments = documents.filter(
        (document) => document?.category === "RESEARCH"
      );

      let published = 0;
      let underReview = 0;
      let drafts = 0;

      for (const document of researchDocuments) {
        const status = getResearchStatus(document);

        if (VERIFIED_STATUSES.has(status)) {
          published += 1;
        } else if (DRAFT_STATUSES.has(status)) {
          drafts += 1;
        } else if (
          REVIEW_STATUSES.has(status) ||
          status === "CORRECTIONS_REQUESTED" ||
          status === "REJECTED" ||
          !status
        ) {
          // Corrections and rejected submissions are not published.
          // They remain outstanding submissions needing action.
          underReview += 1;
        }
      }

      setStats({
        totalSubmissions: researchDocuments.length,
        published,
        underReview,
        drafts,
      });
    } catch (error) {
      console.error("ResearchStats: Failed to fetch research documents:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to load research statistics."
      );

      setStats(INITIAL_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResearchStats();
  }, [fetchResearchStats, refreshKey]);

  const statItems = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      subtitle: "All research documents",
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Published",
      value: stats.published,
      subtitle: "Verified research works",
      icon: CircleCheck,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Under Review",
      value: stats.underReview,
      subtitle: "Awaiting review or corrections",
      icon: Clock3,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Drafts",
      value: stats.drafts,
      subtitle: "Saved draft submissions",
      icon: FileClock,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
  ];

  return (
    <section aria-label="Research statistics">
      {errorMessage && (
        <div
          role="alert"
          className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          <span>{errorMessage}</span>

          <button
            type="button"
            onClick={fetchResearchStats}
            className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 font-medium hover:bg-red-100"
          >
            <RotateCcw size={14} />
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.bg}`}
              >
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  {item.title}
                </p>

                <h2
                  className="mt-0.5 text-2xl font-bold leading-none text-slate-800"
                  aria-live="polite"
                >
                  {loading ? "—" : item.value}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResearchStats;