import React, { useEffect, useState } from "react";

import {
  FileText,
  CircleCheck,
  Clock3,
  FileClock,
} from "lucide-react";

import { getDocumentsDashboard } from "../../api/document.api";

const CoCurricularStats = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    approved: 0,
    underReview: 0,
    drafts: 0,
  });

  const [loading, setLoading] = useState(true);

  // ==========================================================
  // FETCH CO-CURRICULAR STATS
  // ==========================================================

  useEffect(() => {
    const fetchCoCurricularStats = async () => {
      try {
        setLoading(true);

        const data = await getDocumentsDashboard(
          "CO_CURRICULAR"
        );

        console.log(
          "CoCurricularStats API response:",
          data
        );

        const documents = Array.isArray(data?.documents)
          ? data.documents
          : [];

        /*
         * API is already requesting only
         * CO_CURRICULAR documents.
         *
         * We still filter here as an extra
         * safety check.
         */

        const coCurricularDocuments =
          documents.filter(
            (document) =>
              document.category === "CO_CURRICULAR"
          );

        /*
         * Current StudentDocument data does not
         * provide a status field that we can safely
         * use for:
         *
         * APPROVED
         * UNDER_REVIEW
         * DRAFT
         *
         * Therefore only Total Submissions is
         * calculated dynamically for now.
         */

        setStats({
          totalSubmissions:
            coCurricularDocuments.length,

          approved: 0,

          underReview: 0,

          drafts: 0,
        });

      } catch (error) {
        console.error(
          "CoCurricularStats: Failed to fetch co-curricular documents:",
          error
        );

        setStats({
          totalSubmissions: 0,
          approved: 0,
          underReview: 0,
          drafts: 0,
        });

      } finally {
        setLoading(false);
      }
    };

    fetchCoCurricularStats();
  }, []);

  // ==========================================================
  // STAT ITEMS
  // ==========================================================

  const statItems = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      subtitle: "All time",
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
    <div className="grid grid-cols-4 gap-3">

      {statItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-4 flex items-center gap-3 hover:shadow-md transition-all"
          >

            {/* ICON */}

            <div
              className={`w-11 h-11 rounded-full ${item.bg} flex items-center justify-center`}
            >
              <Icon
                className={`w-5 h-5 ${item.color}`}
              />
            </div>

            {/* CONTENT */}

            <div>

              <p className="text-xs font-medium text-slate-500">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-slate-800 leading-none mt-0.5">
                {loading ? "—" : item.value}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                {item.subtitle}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default CoCurricularStats;