import React from "react";
import KPICard from "./KPICard";

import {
  GraduationCap,
  BarChart3,
  UserCheck,
  CalendarDays,
  ClipboardList,
  BadgeCheck,
  Briefcase,
} from "lucide-react";

const cards = [
  {
    title: "Current Semester",
    value: "V",
    icon: GraduationCap,
    iconBg: "#EAF2FF",
    iconColor: "#2563EB",
  },
  {
    title: "CGPA",
    value: "8.92",
    icon: BarChart3,
    iconBg: "#EAF6FF",
    iconColor: "#3B82F6",
  },
  {
    title: "Attendance",
    value: "94%",
    icon: UserCheck,
    iconBg: "#EBFAF1",
    iconColor: "#16A34A",
  },
  {
    title: "Next Meeting",
    value: "Tomorrow",
    icon: CalendarDays,
    iconBg: "#F3ECFF",
    iconColor: "#8B5CF6",
  },
  {
    title: "Pending Tasks",
    value: "3",
    icon: ClipboardList,
    iconBg: "#FFF2E9",
    iconColor: "#F97316",
  },
  {
    title: "Certificates",
    value: "12",
    icon: BadgeCheck,
    iconBg: "#EAFBFC",
    iconColor: "#06B6D4",
  },
  {
    title: "Internships",
    value: "1",
    icon: Briefcase,
    iconBg: "#FFF8EB",
    iconColor: "#F59E0B",
  },
];

const KPICards = () => {
  return (
    <section className="w-full">
      <div className="flex justify-between gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex-1 min-w-0"
          >
            <KPICard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default KPICards;