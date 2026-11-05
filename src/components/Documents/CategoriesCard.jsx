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
    <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      {/* HEADER */}

      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
            Categories
          </h2>

          <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
            Documents by category
          </p>
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-9 sm:w-9">
          <FolderOpen
            size={17}
            className="text-blue-600 sm:hidden"
          />

          <FolderOpen
            size={18}
            className="hidden text-blue-600 sm:block"
          />
        </div>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="flex items-center justify-center py-7 sm:py-8">
          <Loader2
            size={18}
            className="animate-spin text-slate-400"
          />
        </div>
      ) : categories.length === 0 ? (

        /* EMPTY */

        <div className="py-7 text-center sm:py-8">
          <p className="text-xs text-slate-500 sm:text-sm">
            No categories yet.
          </p>

          <p className="mt-1 text-[11px] leading-5 text-slate-400 sm:text-xs">
            Upload a document to create a category.
          </p>
        </div>

      ) : (

        /* CATEGORIES */

        <div className="space-y-3">
          {categories.map((item) => (
            <div
              key={item.category}
              className="flex min-w-0 items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />

                <span
                  className="min-w-0 truncate text-xs text-slate-600 sm:text-sm"
                  title={formatCategoryName(item.category)}
                >
                  {formatCategoryName(item.category)}
                </span>
              </div>

              <span className="shrink-0 text-xs font-medium tabular-nums text-slate-700 sm:text-sm">
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
