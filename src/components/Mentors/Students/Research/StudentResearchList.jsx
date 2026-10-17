import React from "react";
import {
  Search,
  FileSearch,
  X,
  Filter,
} from "lucide-react";

import ResearchDocumentCard from "./ResearchDocumentCard";

const StudentResearchList = ({
  researchWorks = [],
  searchTerm = "",
  onSearchChange,
  statusFilter = "ALL",
  onStatusFilterChange,
  onView,
  onReview,
}) => {
  const hasFilters =
    searchTerm.trim().length > 0 || statusFilter !== "ALL";

  const handleClearFilters = () => {
    onSearchChange?.("");
    onStatusFilterChange?.("ALL");
  };

  return (
    <section
      aria-labelledby="student-research-list-title"
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2
            id="student-research-list-title"
            className="text-lg font-semibold text-slate-900"
          >
            Student Research Works
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review submitted research and supporting documents.
          </p>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          <div className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
            <Search
              size={16}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              aria-label="Search research documents"
              value={searchTerm}
              onChange={(event) =>
                onSearchChange?.(event.target.value)
              }
              placeholder="Search research..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

            {searchTerm && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onSearchChange?.("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="relative">
            <Filter
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              aria-label="Filter research by review status"
              value={statusFilter}
              onChange={(event) =>
                onStatusFilterChange?.(event.target.value)
              }
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-52"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending review</option>
              <option value="VERIFIED">Verified</option>
              <option value="CORRECTIONS_REQUESTED">
                Corrections requested
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULT COUNT */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/70 px-5 py-3">
        <p className="text-xs font-medium text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {researchWorks.length}
          </span>{" "}
          {researchWorks.length === 1
            ? "research submission"
            : "research submissions"}
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            <X size={13} />
            Clear filters
          </button>
        )}
      </div>

      {/* RESEARCH DOCUMENTS */}
      <div className="space-y-3 p-4 sm:p-5">
        {researchWorks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <FileSearch size={23} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-slate-800">
              {hasFilters
                ? "No matching research documents"
                : "No research documents yet"}
            </h3>

            <p className="mt-1 max-w-sm text-sm leading-5 text-slate-500">
              {hasFilters
                ? "Try another search term or choose a different review status."
                : "Research submissions from this student will appear here once uploaded."}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Reset search and filters
              </button>
            )}
          </div>
        ) : (
          researchWorks.map((research) => (
            <ResearchDocumentCard
              key={research.id}
              research={research}
              onView={() => onView?.(research)}
              onReview={() => onReview?.(research)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default StudentResearchList;