
import React from "react";
import KPICard from "./KPICard";

import {
  GraduationCap,
  BarChart3,
  UserCheck,
  CalendarDays,
  Files,
  BriefcaseBusiness,
} from "lucide-react";

const formatMeetingDate = (value) => {
  if (!value) return "Not scheduled";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not scheduled";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const KPICards = ({ dashboardData = null, loading = false }) => {
  const kpis = dashboardData?.kpis ?? {};
  const student = dashboardData?.student ?? {};

  const semester =
    kpis.currentSemester ?? student.currentSemester;

  const cgpa = kpis.cgpa ?? student.currentCGPA;
  const attendance = kpis.attendancePercentage;

  const cards = [
    {
      title: "Current Semester",
      value: semester ? `Semester ${semester}` : "—",
      icon: GraduationCap,
      iconBg: "#EAF2FF",
      iconColor: "#2563EB",
    },
    {
      title: "CGPA",
      value:
        cgpa !== null && cgpa !== undefined && cgpa !== ""
          ? Number(cgpa).toFixed(2)
          : "—",
      icon: BarChart3,
      iconBg: "#EAF6FF",
      iconColor: "#3B82F6",
    },
    {
      title: "Attendance",
      value:
        attendance !== null &&
        attendance !== undefined &&
        Number.isFinite(Number(attendance))
          ? `${Number(attendance).toFixed(2)}%`
          : "—",
      icon: UserCheck,
      iconBg: "#EBFAF1",
      iconColor: "#16A34A",
    },
    {
      title: "Next Meeting",
      value: formatMeetingDate(kpis.nextMeeting?.startAt),
      icon: CalendarDays,
      iconBg: "#F3ECFF",
      iconColor: "#8B5CF6",
    },
    {
      title: "Documents",
      value:
        kpis.documentCount !== null &&
        kpis.documentCount !== undefined
          ? String(kpis.documentCount)
          : "—",
      icon: Files,
      iconBg: "#EAFBFC",
      iconColor: "#06B6D4",
    },
    {
      title: "Internships",
      value:
        kpis.internshipCount !== null &&
        kpis.internshipCount !== undefined
          ? String(kpis.internshipCount)
          : "—",
      icon: BriefcaseBusiness,
      iconBg: "#FFF8EB",
      iconColor: "#F59E0B",
    },
  ];

  return (
    <section className="w-full" aria-busy={loading}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card) => (
          <div key={card.title} className="min-w-0">
            <KPICard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default KPICards;
