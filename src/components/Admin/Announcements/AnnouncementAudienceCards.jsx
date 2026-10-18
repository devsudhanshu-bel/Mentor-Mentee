
import React from "react";
import {
  Users,
  GraduationCap,
  Globe,
} from "lucide-react";

const audiences = [
  {
    title: "Mentors only",
    description: "Send announcements to all faculty mentors.",
    value: "MENTORS",
    icon: Users,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Students only",
    description: "Send announcements to all students.",
    value: "STUDENTS",
    icon: GraduationCap,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Everyone",
    description: "Send announcements to both mentors and students.",
    value: "ALL",
    icon: Globe,
    iconStyle: "bg-purple-50 text-purple-600",
  },
];

const AnnouncementAudienceCards = ({
  selectedAudience = "ALL",
  onAudienceChange,
}) => {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {audiences.map((audience) => {
        const Icon = audience.icon;
        const selected = selectedAudience === audience.value;

        return (
          <button
            key={audience.value}
            type="button"
            onClick={() => onAudienceChange?.(audience.value)}
            aria-pressed={selected}
            className={`
              flex items-center gap-4
              rounded-2xl border bg-white
              px-5 py-4 text-left
              shadow-sm transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-md
              ${
                selected
                  ? "border-blue-300 ring-1 ring-blue-100"
                  : "border-slate-200 hover:border-blue-200"
              }
            `}
          >
            <div
              className={`
                flex h-16 w-16 shrink-0
                items-center justify-center
                rounded-2xl
                ${audience.iconStyle}
              `}
            >
              <Icon size={32} strokeWidth={2.5} />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900">
                {audience.title}
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                {audience.description}
              </p>
            </div>
          </button>
        );
      })}
    </section>
  );
};

export default AnnouncementAudienceCards;
