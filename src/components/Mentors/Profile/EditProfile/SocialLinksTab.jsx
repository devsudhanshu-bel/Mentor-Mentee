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
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-[15px] font-semibold text-slate-900">
          Social Links
        </h2>

        <p className="mt-1 text-[12px] text-slate-500">
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
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                <Icon
                  size={14}
                  className="text-slate-500"
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
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-[13px]
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
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