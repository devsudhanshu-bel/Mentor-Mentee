import React from "react";
import { Loader2, FolderOpen } from "lucide-react";

const formatCategoryName = (category) => {
  if (!category) return "Other";

  return category
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const CategoriesCard = ({
  categories = [],
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Categories
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Documents by category
          </p>
        </div>

        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
          <FolderOpen
            size={18}
            className="text-blue-600"
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2
            size={18}
            className="animate-spin text-slate-400"
          />
        </div>
      ) : categories.length === 0 ? (
        /* Empty */
        <div className="py-8 text-center">
          <p className="text-sm text-slate-500">
            No categories yet.
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Upload a document to create a category.
          </p>
        </div>
      ) : (
        /* Categories */
        <div className="space-y-3">
          {categories.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />

                <span className="text-sm text-slate-600 truncate">
                  {formatCategoryName(item.category)}
                </span>
              </div>

              <span className="text-sm font-medium text-slate-700">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesCard;