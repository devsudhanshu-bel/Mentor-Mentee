import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  FileText,
  CircleCheck,
  Clock3,
  FolderOpen,
} from "lucide-react";

import {
  getDocumentsDashboard,
} from "../../api/document.api";

// ==========================================================
// INITIAL STATS
// ==========================================================

const initialStats = {
  totalCertificates: 0,
  verifiedCertificates: 0,
  pendingVerification: 0,
  categories: 0,
};

// ==========================================================
// STATUS HELPERS
// ==========================================================

const normalizeStatus = (value) =>
  String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getCertificateStatus = (document) => {
  return normalizeStatus(
    document?.certificateReviewStatus ??
      document?.researchReviewStatus ??
      document?.reviewStatus ??
      document?.verificationStatus ??
      document?.approvalStatus ??
      document?.status
  );
};

const VERIFIED_STATUSES = new Set([
  "VERIFIED",
  "APPROVED",
]);

const PENDING_STATUSES = new Set([
  "NOT_REVIEWED",
  "PENDING",
  "PENDING_REVIEW",
  "UNDER_REVIEW",
  "SUBMITTED",
  "IN_REVIEW",
  "AWAITING_REVIEW",
  "CORRECTIONS_REQUESTED",
  "REJECTED",
]);

// ==========================================================
// COMPONENT
// ==========================================================

const CertificatesStats = ({
  refreshKey = 0,
}) => {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // FETCH CERTIFICATE STATS
  // ==========================================================

  const fetchCertificateStats = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDocumentsDashboard(
        "CERTIFICATES"
      );

      const documents = Array.isArray(data?.documents)
        ? data.documents
        : Array.isArray(data)
          ? data
          : [];

      const certificateDocuments = documents.filter(
        (document) =>
          document?.category === "CERTIFICATES"
      );

      // ======================================================
      // UNIQUE CATEGORIES
      // ======================================================

      const uniqueCategories = new Set(
        certificateDocuments
          .map((document) =>
            String(
              document?.certificateType ??
                document?.type ??
                document?.documentType ??
                ""
            ).trim()
          )
          .filter(Boolean)
          .map((category) => category.toLowerCase())
      );

      // ======================================================
      // REVIEW COUNTS
      // ======================================================

      const verifiedCertificates =
        certificateDocuments.filter((document) =>
          VERIFIED_STATUSES.has(
            getCertificateStatus(document)
          )
        ).length;

      const pendingVerification =
        certificateDocuments.filter((document) =>
          PENDING_STATUSES.has(
            getCertificateStatus(document)
          )
        ).length;

      // ======================================================
      // UPDATE STATS
      // ======================================================

      setStats({
        totalCertificates: certificateDocuments.length,
        verifiedCertificates,
        pendingVerification,
        categories: uniqueCategories.size,
      });
    } catch (error) {
      console.error(
        "CertificatesStats.fetchCertificateStats error:",
        error
      );

      setStats(initialStats);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD + REFRESH
  // ==========================================================

  useEffect(() => {
    fetchCertificateStats();
  }, [fetchCertificateStats, refreshKey]);

  // ==========================================================
  // STAT ITEMS
  // ==========================================================

  const statItems = [
    {
      title: "Total Certificates",
      value: stats.totalCertificates,
      subtitle: "All certificates uploaded",
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Verified Certificates",
      value: stats.verifiedCertificates,
      subtitle: "Verified and valid",
      icon: CircleCheck,
      bg: "bg-green-50",
      color: "text-green-500",
    },
    {
      title: "Pending Verification",
      value: stats.pendingVerification,
      subtitle: "Awaiting verification",
      icon: Clock3,
      bg: "bg-purple-50",
      color: "text-purple-500",
    },
    {
      title: "Categories",
      value: stats.categories,
      subtitle: "Different certificate categories",
      icon: FolderOpen,
      bg: "bg-orange-50",
      color: "text-orange-500",
    },
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">

      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              flex min-w-0 items-center gap-2
              rounded-xl border border-slate-200
              bg-white px-2.5 py-3 shadow-sm
              transition-all hover:shadow-md
              sm:gap-3 sm:px-4 sm:py-4
            "
          >
            {/* ICON */}

            <div
              className={`
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full
                ${item.bg}
                sm:h-11 sm:w-11
              `}
            >
              <Icon
                className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`}
              />
            </div>

            {/* CONTENT */}

            <div className="min-w-0 flex-1">

              <p className="text-[10px] font-medium leading-tight text-slate-500 sm:text-xs">
                {item.title}
              </p>

              <h2 className="mt-1 text-xl font-bold leading-none text-slate-800 sm:text-2xl">
                {loading ? "—" : item.value}
              </h2>

              <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                {item.subtitle}
              </p>

            </div>
          </div>
        );
      })}

    </div>
  );
};

export default CertificatesStats;
