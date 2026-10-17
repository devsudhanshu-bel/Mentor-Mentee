import React from "react";
import {
  Search,
  SlidersHorizontal,
  Trophy,
} from "lucide-react";

import AwardsAchievementCard from "./AwardsAchievementCard";

const StudentAwardsAchievementsList = ({
  achievements = [],
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onView,
  onReview,
  hasAchievements,
}) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">
        <div>
          <h2 className="font-bold text-slate-900">
            Awards & Achievements Submissions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review student awards, achievements, and their supporting documents.
          </p>
        </div>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
          {achievements.length}{" "}
          {achievements.length === 1 ? "submission" : "submissions"}
        </span>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="grid grid-cols-1 gap-3 border-b border-slate-200 p-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search awards and achievements..."
            aria-label="Search awards and achievements"
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            aria-label="Filter by review status"
            className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          >
            <option value="ALL">All statuses</option>
            <option value="NOT_REVIEWED">Under Review</option>
            <option value="PENDING">Under Review</option>
            <option value="VERIFIED">Approved</option>
            <option value="CORRECTIONS_REQUESTED">
              Corrections Requested
            </option>
          </select>
        </div>
      </div>

      {/* SUBMISSIONS */}
      {achievements.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {achievements.map((achievement) => (
            <AwardsAchievementCard
              key={achievement.id}
              achievement={achievement}
              onView={() => onView(achievement)}
              onReview={() => onReview(achievement)}
            />
          ))}
        </div>
      ) : (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
            <Trophy size={23} className="text-purple-400" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {hasAchievements
              ? "No matching achievements"
              : "No awards or achievements found"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {hasAchievements
              ? "Try changing the search term or status filter."
              : "The student's submitted awards and achievement documents will appear here."}
          </p>
        </div>
      )}
    </section>
  );
};

export default StudentAwardsAchievementsList;