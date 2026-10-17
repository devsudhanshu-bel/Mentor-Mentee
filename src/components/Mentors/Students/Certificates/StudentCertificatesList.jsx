import React from "react";
import {
  Search,
  SlidersHorizontal,
  Award,
} from "lucide-react";

import CertificateActivityCard from "./CertificateActivityCard";

const StudentCertificatesList = ({
  activities = [],
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onView,
  onReview,
}) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">
        <div>
          <h2 className="font-bold text-slate-900">
            Certificate Submissions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review certificates and provide mentor feedback.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {activities.length} {activities.length === 1 ? "certificate" : "certificates"}
        </span>
      </div>

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
            placeholder="Search certificates..."
            aria-label="Search certificates"
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
            className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="ALL">All statuses</option>
            <option value="NOT_REVIEWED">Under Review</option>
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Approved</option>
            <option value="CORRECTIONS_REQUESTED">Corrections Requested</option>
          </select>
        </div>
      </div>

      {activities.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {activities.map((activity) => (
            <CertificateActivityCard
              key={activity.id}
              activity={activity}
              onView={() => onView(activity)}
              onReview={() => onReview(activity)}
            />
          ))}
        </div>
      ) : (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Award size={23} className="text-slate-400" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No certificates found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing the search term or status filter.
          </p>
        </div>
      )}
    </section>
  );
};

export default StudentCertificatesList;