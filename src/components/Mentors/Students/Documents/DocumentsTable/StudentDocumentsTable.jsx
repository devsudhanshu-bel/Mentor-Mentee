import React, { useEffect, useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";

import DocumentRow from "./DocumentRow";

const categoryLabels = {
  ACADEMICS: "Academics",
  CERTIFICATES: "Certificates",
  INTERNSHIPS: "Internships",
  PROJECTS: "Projects",
  RESEARCH: "Research",
  CO_CURRICULAR: "Co-Curricular",
  EXTRA_CURRICULAR: "Extra Curricular",
  AWARDS: "Awards",
  PERSONAL: "Personal",
  OTHER: "Other",
};

const StudentDocumentsTable = ({
  documents = [],
  categories = [],
  loading = false,
  searchTerm = "",
  onSearchChange,
  selectedCategory = "",
  onCategoryChange,
  selectedFileType = "",
  onFileTypeChange,
  pagination = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  onPageChange,
  onRefresh,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  // Keep typing responsive while updating the backend filter.
  useEffect(() => {
    if (localSearch === searchTerm) return;

    const timeout = setTimeout(() => {
      onSearchChange?.(localSearch);
    }, 350);

    return () => clearTimeout(timeout);
  }, [localSearch, searchTerm, onSearchChange]);

  const hasFilters = Boolean(selectedCategory || selectedFileType || searchTerm);

  const clearFilters = () => {
    setLocalSearch("");
    onSearchChange?.("");
    onCategoryChange?.("");
    onFileTypeChange?.("");
  };

  const firstItem =
    pagination.total === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1;

  const lastItem = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  const fileTypes = [
    "PDF",
    "DOC",
    "DOCX",
    "XLS",
    "XLSX",
    "PPT",
    "PPTX",
    "CSV",
    "JPG",
    "JPEG",
    "PNG",
    "WEBP",
    "TXT",
    "ZIP",
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Student Documents
          </h2>

          <p className="mt-0.5 text-[10px] text-slate-500">
            View all uploaded student documents across categories.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowSearch((current) => !current)}
            aria-expanded={showSearch}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-medium transition ${
              showSearch || searchTerm
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Search size={12} />
            Search
          </button>

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            aria-expanded={showFilters}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-medium transition ${
              showFilters || hasFilters
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Filter size={12} />
            Filter
            {hasFilters && (
              <span className="ml-0.5 rounded-full bg-blue-600 px-1.5 text-[9px] text-white">
                Active
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SEARCH */}

      {showSearch && (
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={localSearch}
              onChange={(event) => setLocalSearch(event.target.value)}
              placeholder="Search by document name, description, or category..."
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-9 text-xs outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
            />

            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch("");
                  onSearchChange?.("");
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* FILTERS */}

      {showFilters && (
        <div className="flex flex-wrap items-end gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3">
          <div className="min-w-[150px] flex-1">
            <label
              htmlFor="documents-category-filter"
              className="mb-1 block text-[10px] font-semibold text-slate-600"
            >
              Category
            </label>

            <select
              id="documents-category-filter"
              value={selectedCategory}
              onChange={(event) =>
                onCategoryChange?.(event.target.value)
              }
              className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-[11px] text-slate-700 outline-none focus:border-blue-300"
            >
              <option value="">All categories</option>

              {categories.map((item) => {
                const category =
                  typeof item === "string" ? item : item.category;

                if (!category) return null;

                return (
                  <option key={category} value={category}>
                    {categoryLabels[category] ||
                      category.replaceAll("_", " ")}
                    {typeof item === "object" && item.count != null
                      ? ` (${item.count})`
                      : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="min-w-[120px] flex-1">
            <label
              htmlFor="documents-type-filter"
              className="mb-1 block text-[10px] font-semibold text-slate-600"
            >
              File type
            </label>

            <select
              id="documents-type-filter"
              value={selectedFileType}
              onChange={(event) =>
                onFileTypeChange?.(event.target.value)
              }
              className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-2 text-[11px] text-slate-700 outline-none focus:border-blue-300"
            >
              <option value="">All file types</option>

              {fileTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-[10px] font-medium text-red-600 hover:bg-red-50"
            >
              <X size={12} />
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Document",
                "Category",
                "Type",
                "Uploaded",
                "Size",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={`whitespace-nowrap px-4 py-3 text-[9px] font-semibold uppercase tracking-wide text-slate-500 ${
                    heading === "Actions" ? "text-right" : "text-left"
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-xs text-slate-500"
                >
                  Loading student documents...
                </td>
              </tr>
            ) : documents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <Search size={17} className="text-slate-400" />
                  </div>

                  <p className="mt-2 text-xs font-semibold text-slate-700">
                    {hasFilters
                      ? "No matching documents found"
                      : "No documents uploaded yet"}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {hasFilters
                      ? "Try changing your search or filters."
                      : "Uploaded student documents will appear here."}
                  </p>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-3 text-[10px] font-semibold text-blue-600 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              documents.map((document) => (
                <DocumentRow
                  key={document.id}
                  document={document}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER / PAGINATION */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3">
        <p className="text-[10px] text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {firstItem}–{lastItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {pagination.total}
          </span>{" "}
          documents
        </p>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="rounded-md border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Refresh
            </button>
          )}

          <button
            type="button"
            onClick={() => onPageChange?.(pagination.page - 1)}
            disabled={loading || pagination.page <= 1}
            aria-label="Previous page"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>

          <span className="min-w-[65px] text-center text-[10px] text-slate-600">
            Page {pagination.page} of{" "}
            {Math.max(1, pagination.totalPages)}
          </span>

          <button
            type="button"
            onClick={() => onPageChange?.(pagination.page + 1)}
            disabled={
              loading ||
              pagination.page >= pagination.totalPages
            }
            aria-label="Next page"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentDocumentsTable;