import React from "react";
import {
  FileText,
  MessageCircle,
  ClipboardList,
  FileBadge,
  ChevronRight,
} from "lucide-react";

const resources = [
  {
    title: "Resume Builder",
    subtitle: "Create or improve your resume",
    icon: FileText,
  },
  {
    title: "Interview Preparation",
    subtitle: "Practice with mocks and questions",
    icon: MessageCircle,
  },
  {
    title: "Internship Guidelines",
    subtitle: "University guidelines & policies",
    icon: ClipboardList,
  },
  {
    title: "Sample Cover Letters",
    subtitle: "Templates for different roles",
    icon: FileBadge,
  },
];

const InternshipResources = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-[340px] p-4">
      {/* Header */}
      <h2 className="text-[15px] font-semibold text-[#142970] mb-4">
        Resources
      </h2>

      {/* Resource List */}
      <div className="space-y-3">
        {resources.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition rounded-xl px-3 py-3 border border-slate-100"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon
                    size={18}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h3 className="text-[13px] font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InternshipResources;