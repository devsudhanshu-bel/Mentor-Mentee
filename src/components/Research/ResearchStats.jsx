import React, { useEffect, useState } from "react";

import {
  FileText,
  CircleCheck,
  Clock3,
  FileClock,
} from "lucide-react";

import { getDocumentsDashboard } from "../../api/document.api";

const ResearchStats = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    published: 0,
    underReview: 0,
    drafts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearchStats = async () => {
      try {
        setLoading(true);

        const data = await getDocumentsDashboard("RESEARCH");

        const documents = Array.isArray(data?.documents)
          ? data.documents
          : [];

        /*
         * The API is already requesting only RESEARCH
         * documents.
         *
         * We still filter here as an extra safety check.
         */
        const researchDocuments = documents.filter(
          (document) => document.category === "RESEARCH"
        );

        /*
         * Current StudentDocument model does not contain
         * a research status field such as:
         *
         * DRAFT
         * UNDER_REVIEW
         * PUBLISHED
         *
         * Therefore only Total Submissions can currently
         * be calculated from the existing backend.
         */
        setStats({
          totalSubmissions: researchDocuments.length,
          published: 0,
          underReview: 0,
          drafts: 0,
        });
      } catch (error) {
        console.error(
          "ResearchStats: Failed to fetch research documents:",
          error
        );

        setStats({
          totalSubmissions: 0,
          published: 0,
          underReview: 0,
          drafts: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResearchStats();
  }, []);

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
      subtitle: "Published works",
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
      bg: "bg-amber-50",
      color: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {statItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-4 flex items-center gap-3 hover:shadow-md transition-all"
          >
            {/* Icon */}
            <div
              className={`w-11 h-11 rounded-full ${item.bg} flex items-center justify-center`}
            >
              <Icon
                className={`w-5 h-5 ${item.color}`}
              />
            </div>

            {/* Content */}
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

export default ResearchStats;