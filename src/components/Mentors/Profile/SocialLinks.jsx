import React from "react";
import {
  Share2,
  GraduationCap,
  Globe,
  ExternalLink,
} from "lucide-react";

const SocialLinks = ({ mentor }) => {
  if (!mentor) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-slate-500">
            No social links available.
          </p>
        </div>
      </div>
    );
  }

  const links = [
    {
      icon: Globe,
      title: "LinkedIn",
      url: mentor.linkedIn,
      color: "text-[#0A66C2]",
    },
    {
      icon: GraduationCap,
      title: "Google Scholar",
      url: mentor.googleScholar,
      color: "text-blue-600",
    },
    {
      icon: Globe,
      title: "ResearchGate",
      url: mentor.researchGate,
      color: "text-emerald-600",
    },
    {
      icon: Globe,
      title: "ORCID",
      url: mentor.orcid,
      color: "text-lime-600",
    },
    {
      icon: Globe,
      title: "Website",
      url: mentor.website,
      color: "text-violet-600",
    },
  ].filter((item) => item.url && item.url.trim() !== "");

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 p-4">
        <Share2
          size={16}
          className="text-blue-600"
        />

        <h2 className="text-[16px] font-semibold text-slate-900">
          Social Links
        </h2>
      </div>

      {/* Links */}
      <div className="space-y-4 p-4">
        {links.length > 0 ? (
          links.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={item.color}
                  />

                  <div>
                    <p className="text-[12px] font-medium text-slate-800">
                      {item.title}
                    </p>

                    <p className="max-w-[220px] truncate text-[11px] text-blue-600">
                      {item.url}
                    </p>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-1 transition hover:bg-slate-100"
                >
                  <ExternalLink
                    size={14}
                    className="text-slate-400"
                  />
                </a>
              </div>
            );
          })
        ) : (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-slate-500">
              No social links available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;