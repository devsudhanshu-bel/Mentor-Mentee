import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Trophy,
  BadgeCheck,
  Star,
  Globe,
} from "lucide-react";

import { getDocumentsDashboard } from "../../api/document.api";

const createInitialStats = () => [
  {
    title: "Total Achievements",
    value: 0,
    subtitle: "Achievements earned",
    icon: Trophy,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Certificates",
    value: 0,
    subtitle: "Certificates earned",
    icon: BadgeCheck,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  {
    title: "National Level",
    value: 0,
    subtitle: "National recognitions",
    icon: Star,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
  {
    title: "International Level",
    value: 0,
    subtitle: "International recognitions",
    icon: Globe,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
];

const AwardsStats = ({ refreshKey = 0 }) => {
  const [stats, setStats] = useState(createInitialStats);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // NORMALIZE VALUES
  // ==========================================================

  const normalize = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/[_-]+/g, " ");

  // ==========================================================
  // FETCH AWARDS
  // ==========================================================

  const fetchAwardsStats = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDocumentsDashboard("AWARDS");

      const documents = Array.isArray(data?.documents)
        ? data.documents
        : Array.isArray(data)
          ? data
          : [];

      const awardsDocuments = documents.filter(
        (document) => document?.category === "AWARDS"
      );

      // ======================================================
      // TOTAL ACHIEVEMENTS
      // ======================================================

      const totalAchievements = awardsDocuments.length;

      // ======================================================
      // CERTIFICATES
      // ======================================================

      const certificates = awardsDocuments.filter(
        (document) => {
          const name = normalize(document?.documentName);
          const type = normalize(
            document?.achievementType ??
              document?.type ??
              document?.awardType ??
              document?.documentType
          );

          return (
            name.includes("certificate") ||
            type.includes("certificate")
          );
        }
      ).length;

      // ======================================================
      // NATIONAL LEVEL
      // ======================================================

      const nationalLevel = awardsDocuments.filter(
        (document) => {
          const level = normalize(
            document?.level ?? document?.achievementLevel
          );

          const name = normalize(document?.documentName);

          return (
            level === "national" ||
            level === "national level" ||
            name.includes("national")
          );
        }
      ).length;

      // ======================================================
      // INTERNATIONAL LEVEL
      // ======================================================

      const internationalLevel = awardsDocuments.filter(
        (document) => {
          const level = normalize(
            document?.level ?? document?.achievementLevel
          );

          const name = normalize(document?.documentName);

          return (
            level === "international" ||
            level === "international level" ||
            name.includes("international")
          );
        }
      ).length;

      // ======================================================
      // UPDATE CARDS
      // ======================================================

      setStats([
        {
          title: "Total Achievements",
          value: totalAchievements,
          subtitle: "Achievements earned",
          icon: Trophy,
          bg: "bg-blue-50",
          color: "text-blue-600",
        },
        {
          title: "Certificates",
          value: certificates,
          subtitle: "Certificates earned",
          icon: BadgeCheck,
          bg: "bg-green-50",
          color: "text-green-500",
        },
        {
          title: "National Level",
          value: nationalLevel,
          subtitle: "National recognitions",
          icon: Star,
          bg: "bg-purple-50",
          color: "text-purple-500",
        },
        {
          title: "International Level",
          value: internationalLevel,
          subtitle: "International recognitions",
          icon: Globe,
          bg: "bg-orange-50",
          color: "text-orange-500",
        },
      ]);
    } catch (error) {
      console.error(
        "AwardsStats.fetchAwardsStats error:",
        error
      );

      setStats(createInitialStats());
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD + REFRESH
  // ==========================================================

  useEffect(() => {
    fetchAwardsStats();
  }, [fetchAwardsStats, refreshKey]);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3 hover:shadow-md transition"
          >
            {/* ICON */}

            <div
              className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-5 h-5 ${item.color}`} />
            </div>

            {/* CONTENT */}

            <div className="min-w-0">
              <p className="text-[12px] font-medium text-slate-600">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 leading-none mt-1">
                {loading ? "—" : item.value}
              </h2>

              <p className="text-[12px] text-slate-400 mt-1">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AwardsStats;