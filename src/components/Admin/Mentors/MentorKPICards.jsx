import React from "react";

import {
  Users,
  UserCheck,
  UserRoundCheck,
  GraduationCap,
} from "lucide-react";

import MentorStatCard from "./MentorStatCard";

const MentorKPICards = () => {
  const cards = [
    {
      title: "Total Mentors",
      value: "32",
      subtitle: "Across all departments",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Mentors",
      value: "30",
      subtitle: "Currently mentoring",
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "With Students",
      value: "28",
      subtitle: "Assigned mentees",
      icon: UserRoundCheck,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Avg. Students",
      value: "20.1",
      subtitle: "Per mentor",
      icon: GraduationCap,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <MentorStatCard
          key={card.title}
          {...card}
        />
      ))}
    </div>
  );
};

export default MentorKPICards;