import React, { useEffect, useState } from "react";

import {
  Trophy,
  BadgeCheck,
  Star,
  Globe,
} from "lucide-react";

import {
  getDocumentsDashboard,
} from "../../api/document.api";

const AwardsStats = () => {
  const [stats, setStats] = useState([
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
  ]);

  // ==========================================================
  // FETCH AWARDS
  // ==========================================================

  useEffect(() => {
    const fetchAwardsStats = async () => {
      try {
        const data =
          await getDocumentsDashboard(
            "AWARDS"
          );

        console.log(
          "Awards documents response:",
          data
        );

        const documents =
          Array.isArray(data?.documents)
            ? data.documents
            : [];

        const awardsDocuments =
          documents.filter(
            (document) =>
              document?.category ===
              "AWARDS"
          );

        // ======================================================
        // CALCULATE STATS
        // ======================================================

        const totalAchievements =
          awardsDocuments.length;

        const certificates =
          awardsDocuments.filter(
            (document) => {
              const name =
                document?.documentName
                  ?.toLowerCase() || "";

              return (
                name.includes(
                  "certificate"
                ) ||
                document?.documentType
                  ?.toLowerCase()
                  ?.includes("certificate")
              );
            }
          ).length;

        const nationalLevel =
          awardsDocuments.filter(
            (document) => {
              const name =
                document?.documentName
                  ?.toLowerCase() || "";

              const level =
                document?.level
                  ?.toLowerCase() || "";

              return (
                level === "national" ||
                name.includes("national")
              );
            }
          ).length;

        const internationalLevel =
          awardsDocuments.filter(
            (document) => {
              const name =
                document?.documentName
                  ?.toLowerCase() || "";

              const level =
                document?.level
                  ?.toLowerCase() || "";

              return (
                level ===
                  "international" ||
                name.includes(
                  "international"
                )
              );
            }
          ).length;

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

        setStats([
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
        ]);
      }
    };

    fetchAwardsStats();
  }, []);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="grid grid-cols-4 gap-3">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3 hover:shadow-md transition"
          >

            {/* ==================================================
                ICON
            ================================================== */}

            <div
              className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon
                className={`w-5 h-5 ${item.color}`}
              />
            </div>

            {/* ==================================================
                CONTENT
            ================================================== */}

            <div>

              <p className="text-[12px] font-medium text-slate-600">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 leading-none mt-1">
                {item.value}
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