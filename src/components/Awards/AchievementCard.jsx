import React from "react";
import {
  Trophy,
  Medal,
  Award,
  Star,
  MoreVertical,
} from "lucide-react";

const AchievementCard = ({ achievement }) => {
  if (!achievement) return null;

  const getIcon = () => {
    switch (achievement.icon) {
      case "trophy":
        return (
          <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center">
            <Trophy size={18} className="text-amber-500" />
          </div>
        );

      case "medal":
        return (
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center">
            <Medal size={18} className="text-slate-500" />
          </div>
        );

      case "award":
        return (
          <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center">
            <Award size={18} className="text-emerald-500" />
          </div>
        );

      case "star":
        return (
          <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center">
            <Star size={18} className="text-purple-500" />
          </div>
        );

      default:
        return (
          <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center">
            <Award size={18} className="text-orange-500" />
          </div>
        );
    }
  };

  const badgeColor = {
    "University Level":
      "bg-blue-50 text-blue-600",

    "National Level":
      "bg-blue-50 text-blue-600",

    "International Level":
      "bg-purple-50 text-purple-600",

    "Department Level":
      "bg-slate-100 text-slate-600",
  };

  return (
    <div className="border border-slate-200 rounded-lg px-4 py-3 flex justify-between items-center hover:shadow-sm transition">

      <div className="flex items-center gap-4">

        {getIcon()}

        <div>

          <h3 className="text-sm font-semibold text-slate-800">
            {achievement.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 leading-5">
            {achievement.description}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-5">

        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${badgeColor[achievement.level]}`}
        >
          {achievement.level}
        </span>

        <p className="text-xs text-slate-500 whitespace-nowrap">
          {achievement.date}
        </p>

        <button>
          <MoreVertical
            size={16}
            className="text-slate-500"
          />
        </button>

      </div>

    </div>
  );
};

export default AchievementCard;