
import React, { useCallback, useEffect, useState } from "react";

import {
  FileText,
  CircleCheck,
  Clock3,
  FileClock,
} from "lucide-react";

import { getDocumentsDashboard } from "../../api/document.api";

// ==========================================================
// REVIEW STATUS
// ==========================================================

const getReviewStatus = (document) => {
  const status =
    document?.extraCurricularReviewStatus ??
    document?.extraCurricularStatus ??
    document?.researchReviewStatus ??
    document?.reviewStatus ??
    document?.verificationStatus ??
    document?.approvalStatus ??
    document?.status;

  return typeof status === "string"
    ? status.trim().toUpperCase()
    : "";
};

const APPROVED_STATUSES = ["APPROVED", "VERIFIED"];

const UNDER_REVIEW_STATUSES = [
  "PENDING",
  "PENDING_REVIEW",
  "NOT_REVIEWED",
  "UNDER_REVIEW",
  "SUBMITTED",
  "CORRECTIONS_REQUESTED",
  "REJECTED",
];

const DRAFT_STATUSES = ["DRAFT"];

// ==========================================================
// COMPONENT
// ==========================================================

const ExtraCurricularStats = ({ refreshKey = 0 }) => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    approved: 0,
    underReview: 0,
    drafts: 0,
  });

  const [loading, setLoading] = useState(true);

  // ==========================================================
  // FETCH STATS
  // ==========================================================

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDocumentsDashboard("EXTRA_CURRICULAR");

      const documents = Array.isArray(data)
        ? data
        : Array.isArray(data?.documents)
          ? data.documents
          : [];

      const extraCurricularDocuments = documents.filter(
        (document) => document?.category === "EXTRA_CURRICULAR"
      );

      let approved = 0;
      let underReview = 0;
      let drafts = 0;

      extraCurricularDocuments.forEach((document) => {
        const status = getReviewStatus(document);

        if (APPROVED_STATUSES.includes(status)) {
          approved += 1;
        } else if (DRAFT_STATUSES.includes(status)) {
          drafts += 1;
        } else if (UNDER_REVIEW_STATUSES.includes(status)) {
          underReview += 1;
        } else {
          console.warn(
            "Unknown Extra-Curricular review status:",
            {
              id: document?.id,
              status: status || "MISSING",
            }
          );
        }
      });

      setStats({
        totalSubmissions: extraCurricularDocuments.length,
        approved,
        underReview,
        drafts,
      });
    } catch (error) {
      console.error("Failed to fetch Extra-Curricular stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD + REFRESH AFTER UPLOAD/REUPLOAD
  // ==========================================================

  useEffect(() => {
    fetchStats();
  }, [fetchStats, refreshKey]);

  // ==========================================================
  // STAT ITEMS
  // ==========================================================

  const statItems = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      subtitle: "All activities",
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Approved",
      value: stats.approved,
      subtitle: "Approved activities",
      icon: CircleCheck,
      bg: "bg-green-50",
      color: "text-green-500",
    },
    {
      title: "Under Review",
      value: stats.underReview,
      subtitle: "Awaiting review",
      icon: Clock3,
      bg: "bg-orange-50",
      color: "text-orange-500",
    },
    {
      title: "Drafts",
      value: stats.drafts,
      subtitle: "Work in progress",
      icon: FileClock,
      bg: "bg-purple-50",
      color: "text-purple-500",
    },
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-3 shadow-sm transition-all hover:shadow-md sm:gap-3 sm:px-4 sm:py-4"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${item.bg}`}
            >
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="break-words text-[10px] font-medium leading-4 text-slate-500 sm:text-xs">
                {item.title}
              </p>

              <h2 className="mt-1 text-xl font-bold leading-none text-slate-800 sm:text-2xl">
                {loading ? "—" : item.value}
              </h2>

              <p className="mt-1 break-words text-[10px] leading-4 text-slate-400 sm:text-xs">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExtraCurricularStats;
