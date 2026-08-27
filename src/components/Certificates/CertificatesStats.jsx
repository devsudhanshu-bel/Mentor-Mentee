import React, {
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

const CertificatesStats = ({
  refreshKey = 0,
}) => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [stats, setStats] =
    useState({
      totalCertificates: 0,
      verifiedCertificates: 0,
      pendingVerification: 0,
      categories: 0,
    });

  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // FETCH CERTIFICATE STATS
  // ==========================================================

  useEffect(() => {
    const fetchCertificateStats =
      async () => {
        try {
          setLoading(true);

          const data =
            await getDocumentsDashboard(
              "CERTIFICATES"
            );

          console.log(
            "CertificatesStats API response:",
            data
          );

          const documents =
            Array.isArray(
              data?.documents
            )
              ? data.documents
              : [];

          // ==================================================
          // FILTER CERTIFICATES
          // ==================================================

          const certificateDocuments =
            documents.filter(
              (document) =>
                document?.category ===
                "CERTIFICATES"
            );

          // ==================================================
          // CALCULATE UNIQUE CATEGORIES
          // ==================================================

          const uniqueCategories =
            new Set(
              certificateDocuments
                .map(
                  (document) =>
                    document?.certificateType ||
                    document?.type
                )
                .filter(Boolean)
            );

          // ==================================================
          // UPDATE STATS
          // ==================================================

          setStats({
            totalCertificates:
              certificateDocuments.length,

            /*
             * Verification functionality
             * will be added later.
             */

            verifiedCertificates:
              0,

            pendingVerification:
              0,

            categories:
              uniqueCategories.size,
          });
        } catch (error) {
          console.error(
            "CertificatesStats: Failed to fetch certificates:",
            error
          );

          setStats({
            totalCertificates: 0,
            verifiedCertificates: 0,
            pendingVerification: 0,
            categories: 0,
          });
        } finally {
          setLoading(false);
        }
      };

    fetchCertificateStats();
  }, [refreshKey]);

  // ==========================================================
  // STAT ITEMS
  // ==========================================================

  const statItems = [
    {
      title: "Total Certificates",
      value:
        stats.totalCertificates,
      subtitle:
        "All certificates uploaded",
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },

    {
      title: "Verified Certificates",
      value:
        stats.verifiedCertificates,
      subtitle:
        "Verified and valid",
      icon: CircleCheck,
      bg: "bg-green-50",
      color: "text-green-500",
    },

    {
      title: "Pending Verification",
      value:
        stats.pendingVerification,
      subtitle:
        "Awaiting verification",
      icon: Clock3,
      bg: "bg-purple-50",
      color: "text-purple-500",
    },

    {
      title: "Categories",
      value:
        stats.categories,
      subtitle:
        "Different certificate categories",
      icon: FolderOpen,
      bg: "bg-orange-50",
      color: "text-orange-500",
    },
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="grid grid-cols-4 gap-3">

      {statItems.map(
        (item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-4 flex items-center gap-3 hover:shadow-md transition-all"
            >

              {/* ==================================================
                  ICON
              ================================================== */}

              <div
                className={`w-11 h-11 rounded-full ${item.bg} flex items-center justify-center shrink-0`}
              >
                <Icon
                  className={`w-5 h-5 ${item.color}`}
                />
              </div>

              {/* ==================================================
                  CONTENT
              ================================================== */}

              <div className="min-w-0">

                <p className="text-xs font-medium text-slate-500">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-slate-800 leading-none mt-0.5">
                  {loading
                    ? "—"
                    : item.value}
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  {item.subtitle}
                </p>

              </div>

            </div>
          );
        }
      )}

    </div>
  );
};

export default CertificatesStats;