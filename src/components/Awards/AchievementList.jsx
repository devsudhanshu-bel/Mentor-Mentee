import React from "react";
import { Plus } from "lucide-react";

import AchievementFilter from "./AchievementFilter";
import AchievementCard from "./AchievementCard";

const achievements = [
  {
    id: 1,
    icon: "trophy",
    title: "Winner – National Innovation Challenge 2024",
    description:
      "First place in National Innovation Challenge organized by AICTE.",
    level: "National Level",
    date: "15 Apr 2024",
  },
  {
    id: 2,
    icon: "medal",
    title: "Best Project Award",
    description:
      "Awarded for the best final year project in AI & Data Science Department.",
    level: "Department Level",
    date: "22 Mar 2024",
  },
  {
    id: 3,
    icon: "award",
    title: "Hackathon Winner – CodeFest 2023",
    description:
      "Winner of CodeFest 2023, a 24-hour national level hackathon.",
    level: "National Level",
    date: "10 Dec 2023",
  },
  {
    id: 4,
    icon: "award",
    title: "Dean's Meritorious Award",
    description:
      "Awarded by the Dean for outstanding academic and co-curricular performance.",
    level: "University Level",
    date: "05 Oct 2023",
  },
  {
    id: 5,
    icon: "star",
    title: "Research Paper Presentation – ICRTET 2023",
    description:
      "Presented research paper at International Conference on Recent Trends in Engineering & Technology.",
    level: "International Level",
    date: "18 Aug 2023",
  },
];

const AchievementList = ({ onUploadClick }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-semibold text-slate-800">
          Your Achievements
        </h2>

        <div className="flex items-center gap-2">

          <AchievementFilter />

          <button
            onClick={onUploadClick}
            className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium flex items-center gap-2 transition"
          >
            <Plus size={15} />
            Add Achievement
          </button>

        </div>

      </div>

      {/* Cards */}
      <div className="space-y-2.5">

        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />
        ))}

      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-center">

        <button className="w-80 h-10 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition">
          View All Achievements
        </button>

      </div>

    </div>
  );
};

export default AchievementList;