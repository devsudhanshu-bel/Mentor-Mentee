import React from "react";
import {
  GraduationCap,
  FlaskConical,
  Briefcase,
  HeartHandshake,
} from "lucide-react";

const expertise = [
  {
    title: "Academic Guidance",
    description:
      "Course planning, academic progress and semester guidance.",
    icon: GraduationCap,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Research Mentoring",
    description:
      "Project supervision, publications and research direction.",
    icon: FlaskConical,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    title: "Career Development",
    description:
      "Internships, placements and higher education guidance.",
    icon: Briefcase,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    title: "Personal Mentoring",
    description:
      "Well-being, motivation and personal development support.",
    icon: HeartHandshake,
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
];

const MentoringExpertise = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 p-4">
        <GraduationCap
          size={16}
          className="text-blue-600"
        />

        <h2 className="text-[16px] font-semibold text-slate-900">
          Mentoring Expertise
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
        {expertise.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-lg border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-sm"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}
              >
                <Icon
                  size={18}
                  className={item.color}
                />
              </div>

              <h3 className="mt-3 text-[13px] font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentoringExpertise;