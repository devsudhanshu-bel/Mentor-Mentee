import React from "react";

import {
  Trophy,
  Medal,
  Award,
  Star,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const AchievementCard = ({
  achievement,
  onView,
  onDownload,
  onDelete,
  deleting = false,
}) => {
  if (!achievement) {
    return null;
  }

  // ==========================================================
  // ACHIEVEMENT LEVEL
  // ==========================================================

  const achievementLevel =
    achievement?.level ||
    achievement?.achievementLevel ||
    "University Level";

  // ==========================================================
  // ACHIEVEMENT TYPE
  // ==========================================================

  const achievementType =
    achievement?.achievementType ||
    achievement?.type ||
    achievement?.awardType ||
    achievement?.documentType ||
    "Award / Achievement";

  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  const description =
    achievement?.description ||
    achievement?.organization ||
    achievement?.eventName ||
    "Achievement / recognition document";

  // ==========================================================
  // DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    try {
      const parsedDate = new Date(date);

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        return "";
      }

      return parsedDate.toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return "";
    }
  };

  const achievementDate =
    formatDate(
      achievement?.achievementDate ||
        achievement?.date ||
        achievement?.uploadedAt
    );

  // ==========================================================
  // FILE SIZE
  // ==========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  };

  // ==========================================================
  // FILE EXTENSION
  // ==========================================================

  const getFileExtension = () => {
    if (achievement?.fileType) {
      return achievement.fileType
        .toLowerCase()
        .replace(".", "")
        .split("/")
        .pop();
    }

    if (achievement?.documentName) {
      const parts =
        achievement.documentName.split(
          "."
        );

      if (parts.length > 1) {
        return parts
          .pop()
          .toLowerCase();
      }
    }

    return "";
  };

  const fileExtension =
    getFileExtension();

  // ==========================================================
  // ICON
  // ==========================================================

  const getIcon = () => {
    switch (fileExtension) {
      case "pdf":
        return (
          <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <Award
              size={19}
              className="text-red-500"
            />
          </div>
        );

      case "jpg":
      case "jpeg":
      case "png":
        return (
          <div className="w-11 h-11 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
            <Star
              size={19}
              className="text-purple-500"
            />
          </div>
        );

      case "doc":
      case "docx":
        return (
          <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Trophy
              size={19}
              className="text-blue-500"
            />
          </div>
        );

      default:
        return (
          <div className="w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <Trophy
              size={19}
              className="text-amber-500"
            />
          </div>
        );
    }
  };

  // ==========================================================
  // LEVEL BADGE
  // ==========================================================

  const badgeColor = {
    "University Level":
      "bg-blue-50 text-blue-600",

    "Department Level":
      "bg-slate-100 text-slate-600",

    "National Level":
      "bg-indigo-50 text-indigo-600",

    "International Level":
      "bg-purple-50 text-purple-600",
  };

  const levelClass =
    badgeColor[
      achievementLevel
    ] ||
    "bg-slate-100 text-slate-600";

  // ==========================================================
  // VIEW
  // ==========================================================

  const handleView = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onView?.(achievement);
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    onDownload?.(achievement);
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (deleting) {
      return;
    }

    onDelete?.(achievement);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-sm transition bg-white">

      {/* ====================================================
          LEFT
      ==================================================== */}

      <div className="flex items-center gap-4 min-w-0">

        {getIcon()}

        <div className="min-w-0">

          {/* TITLE */}

          <h3
            className="text-sm font-semibold text-slate-800 truncate max-w-[520px]"
            title={
              achievement?.documentName
            }
          >
            {achievement?.documentName ||
              "Untitled Achievement"}
          </h3>

          {/* META */}

          <p className="text-xs text-slate-500 mt-1 truncate max-w-[520px]">

            {achievementType}

            {achievementDate && (
              <>
                <span className="mx-1.5">
                  •
                </span>

                {achievementDate}
              </>
            )}

            {achievement?.fileSize && (
              <>
                <span className="mx-1.5">
                  •
                </span>

                {formatFileSize(
                  achievement.fileSize
                )}
              </>
            )}

          </p>

        </div>
      </div>

      {/* ====================================================
          RIGHT
      ==================================================== */}

      <div className="flex items-center gap-3 ml-4 shrink-0">

        {/* LEVEL */}

        <span
          className={`
            px-2.5
            py-1
            rounded-full
            text-[11px]
            font-medium
            whitespace-nowrap
            ${levelClass}
          `}
        >
          {achievementLevel.replace(
            " Level",
            ""
          )}
        </span>

        {/* VIEW */}

        <button
          type="button"
          onClick={handleView}
          title="View"
          className="p-2 rounded-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
        >
          <Eye size={17} />
        </button>

        {/* DOWNLOAD */}

        <button
          type="button"
          onClick={handleDownload}
          title="Download"
          className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <Download size={17} />
        </button>

        {/* DELETE */}

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          title="Delete"
          className="p-2 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={17} />
        </button>

      </div>
    </div>
  );
};

export default AchievementCard;