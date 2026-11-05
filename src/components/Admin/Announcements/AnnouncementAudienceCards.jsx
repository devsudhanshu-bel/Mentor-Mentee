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
    <section className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              flex min-w-0 items-center gap-3
              rounded-2xl border bg-white
              px-3 py-3 text-left
              shadow-sm transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-md
              sm:gap-4 sm:px-5 sm:py-4
              ${
                selected
                  ? "border-blue-300 ring-1 ring-blue-100"
                  : "border-slate-200 hover:border-blue-200"
              }
            `}
          >
            <div
              className={`
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl sm:h-16 sm:w-16
                ${audience.iconStyle}
              `}
            >
              <Icon size={26} strokeWidth={2.5} className="sm:hidden" />
              <Icon size={32} strokeWidth={2.5} className="hidden sm:block" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-sm font-bold text-slate-900 sm:text-base">
                {audience.title}
              </h3>

              <p className="mt-1 break-words text-xs leading-5 text-slate-500 sm:text-sm">
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
