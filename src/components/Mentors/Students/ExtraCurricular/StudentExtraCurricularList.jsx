
import React from "react";
import { Search, ListFilter, Trophy } from "lucide-react";
import ExtraCurricularActivityCard from "./ExtraCurricularActivityCard";

const StudentExtraCurricularList = ({
  activities = [],
  searchTerm = "",
  onSearchChange = () => {},
  statusFilter = "ALL",
  onStatusFilterChange = () => {},
  onView = () => {},
  onReview = () => {},
  hasActivities = activities.length > 0,
}) => {
  const hasFilters =
    searchTerm.trim().length > 0 || statusFilter !== "ALL";

  const isEmpty = activities.length === 0;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Extra Curricular Activities
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Review activity records and their supporting documents.
          </p>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          {activities.length}{" "}
          {activities.length === 1 ? "activity" : "activities"}
        </span>
      </div>

      {/* Search and Filter */}
      <div className="my-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            aria-label="Search extra curricular activities"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search activities, descriptions, or files..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative sm:w-52">
          <ListFilter
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            aria-label="Filter activities by review status"
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(event.target.value)
            }
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="ALL">All statuses</option>
            <option value="NOT_REVIEWED">Pending Review</option>
            <option value="VERIFIED">Verified</option>
            <option value="CORRECTIONS_REQUESTED">
              Corrections Requested
            </option>
          </select>
        </div>
      </div>

      {/* Activity List / Empty State */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
            <Trophy size={22} className="text-slate-400" />
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-800">
            {hasFilters
              ? "No matching activities"
              : hasActivities
                ? "No matching activities"
                : "No activities submitted yet"}
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
            {hasFilters
              ? "Try changing your search term or selecting a different status."
              : "Once the student uploads extra curricular activity records, they will appear here for your review."}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                onStatusFilterChange("ALL");
              }}
              className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <ExtraCurricularActivityCard
              key={activity.id}
              activity={activity}
              onView={onView}
              onReview={onReview}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default StudentExtraCurricularList;
