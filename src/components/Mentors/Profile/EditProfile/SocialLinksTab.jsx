import React from "react";
import {
  BadgeCheck,
  GraduationCap,
  Globe,
  BookOpen,
  Link,
} from "lucide-react";

const fields = [
  {
    label: "LinkedIn",
    name: "linkedIn",
    icon: BadgeCheck,
    placeholder: "https://linkedin.com/in/username",
  },
  {
    label: "Google Scholar",
    name: "googleScholar",
    icon: GraduationCap,
    placeholder: "https://scholar.google.com/...",
  },
  {
    label: "ResearchGate",
    name: "researchGate",
    icon: BookOpen,
    placeholder: "https://researchgate.net/profile/...",
  },
  {
    label: "ORCID",
    name: "orcid",
    icon: Globe,
    placeholder: "https://orcid.org/...",
  },
  {
    label: "Website",
    name: "website",
    icon: Link,
    placeholder: "https://yourwebsite.com",
  },
];

const SocialLinksTab = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[15px] font-semibold text-slate-900 sm:text-base">
          Social Links
        </h2>

        <p className="mt-1 text-xs text-slate-500 sm:text-[13px]">
          Add your professional profiles and research links.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div
              key={field.name}
              className="min-w-0 space-y-2"
            >
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 sm:text-[13px]">
                <Icon
                  size={14}
                  className="shrink-0 text-slate-500"
                />

                {field.label}
              </label>

              <input
                type="url"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-slate-300
                  px-3
                  py-3
                  text-xs
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  sm:px-4
                  sm:text-[13px]
                "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksTab;
