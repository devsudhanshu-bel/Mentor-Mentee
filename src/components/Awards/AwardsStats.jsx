
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

      // TOTAL ACHIEVEMENTS

      const totalAchievements = awardsDocuments.length;

      // CERTIFICATES

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

      // NATIONAL LEVEL

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

      // INTERNATIONAL LEVEL

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

      // UPDATE CARDS

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
    <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-3 shadow-sm transition hover:shadow-md sm:gap-3 sm:px-4"
          >
            {/* ICON */}

            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${item.bg}`}
            >
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`} />
            </div>

            {/* CONTENT */}

            <div className="min-w-0 flex-1">
              <p className="break-words text-[10px] font-medium leading-4 text-slate-600 sm:text-xs">
                {item.title}
              </p>

              <h2 className="mt-1 text-xl font-bold leading-none text-slate-900 sm:text-2xl">
                {loading ? "—" : item.value}
              </h2>

              <p className="mt-1 break-words text-[9px] leading-4 text-slate-400 sm:text-xs">
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
