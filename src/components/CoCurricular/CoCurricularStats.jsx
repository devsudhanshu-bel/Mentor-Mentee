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
    <section aria-label="Co-Curricular statistics">
      {errorMessage && (
        <div
          role="alert"
          className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          <span>{errorMessage}</span>

          <button
            type="button"
            onClick={fetchCoCurricularStats}
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

export default CoCurricularStats;