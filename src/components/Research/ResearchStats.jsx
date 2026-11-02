
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

  // ==========================================================
  // FETCH RESEARCH STATISTICS
  // ==========================================================

  const fetchResearchStats = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getDocumentsDashboard("RESEARCH");

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
      console.error(
        "ResearchStats: Failed to fetch research documents:",
        error
      );

      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to load research statistics."
      );

      setStats(INITIAL_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // REFRESH ON KEY CHANGE
  // ==========================================================

  useEffect(() => {
    fetchResearchStats();
  }, [fetchResearchStats, refreshKey]);

  // ==========================================================
  // STATISTICS DATA
  // ==========================================================

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

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section
      className="w-full min-w-0"
      aria-label="Research statistics"
    >
      {/* ERROR MESSAGE */}

      {errorMessage && (
        <div
          role="alert"
          className="mb-3 flex min-w-0 flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="min-w-0 break-words">
            {errorMessage}
          </span>

          <button
            type="button"
            onClick={fetchResearchStats}
            className="inline-flex w-fit shrink-0 items-center gap-1 rounded-md px-2 py-1 font-medium transition hover:bg-red-100"
          >
            <RotateCcw size={14} />
            Retry
          </button>
        </div>
      )}

      {/* STATISTICS GRID */}

      <div className="grid w-full min-w-0 grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
        {statItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex min-w-0 items-start gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-3 shadow-sm transition hover:shadow-md sm:items-center sm:gap-3 sm:px-4 sm:py-4"
            >
              {/* ICON */}

              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${item.bg}`}
              >
                <Icon
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`}
                />
              </div>

              {/* DETAILS */}

              <div className="min-w-0 flex-1">
                <p className="break-words text-[10px] font-medium leading-4 text-slate-500 sm:text-xs">
                  {item.title}
                </p>

                <h2
                  className="mt-1 text-xl font-bold leading-none text-slate-800 sm:text-2xl"
                  aria-live="polite"
                >
                  {loading ? "—" : item.value}
                </h2>

                <p className="mt-1 break-words text-[10px] leading-4 text-slate-400 sm:text-xs sm:leading-5">
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
