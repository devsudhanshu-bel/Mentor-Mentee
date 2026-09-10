import React from "react";

import { Users, UserCheck, UserRoundCheck, GraduationCap } from "lucide-react";

import MentorStatCard from "./MentorStatCard";

const MentorKPICards = ({ counts = {} }) => {
  const {
    totalMentors = 0,
    activeMentors = 0,
    mentorsWithStudents = 0,
    averageStudents = 0,
  } = counts;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MentorStatCard
        title="Total Mentors"
        value={totalMentors}
        subtitle="Across all departments"
        icon={Users}
        iconColor="text-blue-600"
        iconBg="bg-blue-50"
      />

      <MentorStatCard
        title="Active Mentors"
        value={activeMentors}
        subtitle="Currently mentoring"
        icon={UserCheck}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
      />

      <MentorStatCard
        title="With Students"
        value={mentorsWithStudents}
        subtitle="Assigned mentees"
        icon={UserRoundCheck}
        iconColor="text-orange-600"
        iconBg="bg-orange-50"
      />

      <MentorStatCard
        title="Avg. Students"
        value={averageStudents}
        subtitle="Per mentor"
        icon={GraduationCap}
        iconColor="text-violet-600"
        iconBg="bg-violet-50"
      />
    </div>
  );
};

export default MentorKPICards;
