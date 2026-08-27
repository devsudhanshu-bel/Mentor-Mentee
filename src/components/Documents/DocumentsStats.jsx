import React from "react";
import { FileText, FolderOpen, Clock, Files } from "lucide-react";

const DocumentsStats = ({ stats = {}, loading = false }) => {
  const {
    totalDocuments = 0,
    totalCategories = 0,
    recentlyAdded = 0,
    totalFiles = 0,
  } = stats;

  const statCards = [
    {
      label: "Total Documents",
      value: totalDocuments,
      icon: FileText,
    },
    {
      label: "Total Categories",
      value: totalCategories,
      icon: FolderOpen,
    },
    {
      label: "Recently Added",
      value: recentlyAdded,
      icon: Clock,
    },
    {
      label: "Total Files",
      value: totalFiles,
      icon: Files,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  {stat.label}
                </p>

                <p className="text-2xl font-semibold text-slate-800 mt-1">
                  {loading ? "—" : stat.value}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon
                  size={19}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentsStats;