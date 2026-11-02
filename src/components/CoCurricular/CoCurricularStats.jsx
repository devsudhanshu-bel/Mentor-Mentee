
import React, { useCallback, useEffect, useState } from "react";

import {
  FileText,
  CircleCheck,
  Clock3,
  FileClock,
  RotateCcw,
} from "lucide-react";

import { getDocumentsDashboard } from "../../api/document.api";

// ==========================================================
// INITIAL STATS
// ==========================================================

const INITIAL_STATS = {
  totalSubmissions: 0,
  approved: 0,
  underReview: 0,
  drafts: 0,
};

// ==========================================================
// STATUS HELPERS
// ==========================================================

const normalizeStatus = (value) =>
  String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getReviewStatus = (document) =>
  normalizeStatus(
    document?.coCurricularReviewStatus ??
      document?.coCurricularStatus ??
      document?.researchReviewStatus ??
      document?.reviewStatus ??
      document?.verificationStatus ??
      document?.approvalStatus ??
      document?.status
  );

const APPROVED_STATUSES = new Set([
  "VERIFIED",
  "APPROVED",
]);

const REVIEW_STATUSES = new Set([
  "NOT_REVIEWED",
  "PENDING",
  "PENDING_REVIEW",
  "UNDER_REVIEW",
  "SUBMITTED",
  "CORRECTIONS_REQUESTED",
  "REJECTED",
]);

const DRAFT_STATUSES = new Set(["DRAFT"]);

// ==========================================================
// COMPONENT
// ==========================================================

const CoCurricularStats = ({ refreshKey = 0 }) => {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ========================================================
  // FETCH CO-CURRICULAR STATS
  // ========================================================

  const fetchCoCurricularStats = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getDocumentsDashboard("CO_CURRICULAR");

      const documents = Array.isArray(response?.documents)
        ? response.documents
        : Array.isArray(response?.data?.documents)
          ? response.data.documents
          : [];

      const coCurricularDocuments = documents.filter(
        (document) => document?.category === "CO_CURRICULAR"
      );

      let approved = 0;
      let underReview = 0;
      let drafts = 0;

      for (const document of coCurricularDocuments) {
        const status = getReviewStatus(document);

        if (APPROVED_STATUSES.has(status)) {
          approved += 1;
        } else if (DRAFT_STATUSES.has(status)) {
          drafts += 1;
        } else if (REVIEW_STATUSES.has(status) || !status) {
          underReview += 1;
        }
      }

      setStats({
        totalSubmissions: coCurricularDocuments.length,
        approved,
        underReview,
        drafts,
      });
    } catch (error) {
      console.error(
        "CoCurricularStats: Failed to fetch documents:",
        error
      );

      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to load Co-Curricular statistics."
      );

      setStats(INITIAL_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch whenever the parent increments refreshKey.
  useEffect(() => {
    fetchCoCurricularStats();
  }, [fetchCoCurricularStats, refreshKey]);

  // ========================================================
  // STAT ITEMS
  // ========================================================

  const statItems = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      subtitle: "All Co-Curricular documents",
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Approved",
      value: stats.approved,
      subtitle: "Verified activities",
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
      subtitle: "Saved draft activities",
      icon: FileClock,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <section
      aria-label="Co-Curricular statistics"
      className="w-full min-w-0"
    >
      {errorMessage && (
        <div
          role="alert"
          className="mb-3 flex min-w-0 flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="min-w-0 break-words">
            {errorMessage}
          </span>

          <button
            type="button"
            onClick={fetchCoCurricularStats}
            className="inline-flex shrink-0 items-center justify-center gap-1 self-start rounded-md px-2 py-1 font-medium transition hover:bg-red-100 sm:self-auto"
          >
            <RotateCcw size={14} />
            Retry
          </button>
        </div>
      )}

      <div className="grid w-full min-w-0 grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
        {statItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex min-w-0 flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:gap-3 sm:p-4"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${item.bg}`}
              >
                <Icon
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`}
                />
              </div>

              <div className="min-w-0">
                <p className="break-words text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">
                  {item.title}
                </p>

                <h2
                  className="mt-1 text-xl font-bold leading-none text-slate-800 sm:text-2xl"
                  aria-live="polite"
                >
                  {loading ? "—" : item.value}
                </h2>

                <p className="mt-1 break-words text-[10px] leading-snug text-slate-400 sm:text-xs">
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

export default CoCurricularStats;
