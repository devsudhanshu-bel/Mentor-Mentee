
import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  ChevronDown,
  History,
  CalendarDays,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const InternshipHistory = ({
  internships = [],
  allInternships = [],
  onView,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("COMPLETED");

  const rows = useMemo(() => {
    const source =
      filter === "COMPLETED" ? internships : allInternships;

    const query = search.trim().toLowerCase();

    return source.filter((item) => {
      const matchesSearch =
        !query ||
        [item.companyName, item.internshipTitle, item.role]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        filter === "ALL" ||
        (filter === "COMPLETED" &&
          item.status === "COMPLETED" &&
          item.verificationStatus === "APPROVED" &&
          item.completionVerificationStatus === "APPROVED") ||
        (filter === "PENDING" &&
          (item.verificationStatus === "PENDING" ||
            item.completionVerificationStatus === "PENDING")) ||
        (filter === "REJECTED" &&
          (item.verificationStatus === "REJECTED" ||
            item.completionVerificationStatus === "REJECTED"));

      return matchesSearch && matchesStatus;
    });
  }, [internships, allInternships, search, filter]);

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <header className="flex min-w-0 flex-col gap-4 border-b border-slate-100 px-3 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-xl bg-blue-50 p-2.5 text-blue-600 sm:p-3">
            <History size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900">
              Internship History
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Review your internship records and verification status.
            </p>
          </div>
        </div>

        {/* Search and filter */}
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:shrink-0">
          <div className="relative min-w-0">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search internships..."
              aria-label="Search internships"
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-56"
            />
          </div>

          <div className="relative min-w-0">
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter internships"
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending verification</option>
              <option value="REJECTED">Needs attention</option>
              <option value="ALL">All records</option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </header>

      {/* Empty state or table */}
      {rows.length === 0 ? (
        <div className="flex flex-col items-center px-4 py-10 text-center sm:px-5 sm:py-12">
          <div className="rounded-2xl bg-slate-100 p-4 text-slate-400">
            <CalendarDays size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-800">
            No matching internships
          </h3>

          <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
            Your records will appear here when they match the selected filter.
          </p>
        </div>
      ) : (
        <div className="w-full min-w-0 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="whitespace-nowrap px-5 py-4">
                  Company / Role
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Duration
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Verification
                </th>

                <th className="whitespace-nowrap px-5 py-4">
                  Completion
                </th>

                <th className="whitespace-nowrap px-5 py-4 text-right">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="max-w-[240px] px-5 py-4">
                    <p className="break-words font-semibold text-slate-800">
                      {item.companyName || "Unnamed company"}
                    </p>

                    <p className="mt-1 break-words text-xs text-slate-500">
                      {item.internshipTitle || item.role || "Internship"}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {formatDate(item.startDate)}
                    <span className="mx-1 text-slate-300">–</span>
                    {formatDate(item.endDate)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusPill status={item.verificationStatus} />
                  </td>

                  <td className="px-5 py-4">
                    <StatusPill
                      status={item.completionVerificationStatus}
                    />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onView?.(item)}
                      aria-label={`View ${item.companyName || "internship"}`}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-3 text-xs text-slate-400 sm:px-5">
        <span>
          Showing {rows.length} record{rows.length === 1 ? "" : "s"}
        </span>

        <span className="text-slate-400">
          {filter === "ALL"
            ? "All records"
            : filter === "COMPLETED"
              ? "Completed internships"
              : filter === "PENDING"
                ? "Pending verification"
                : "Needs attention"}
        </span>
      </footer>
    </section>
  );
};

const StatusPill = ({ status }) => {
  const styles = {
    APPROVED: "bg-green-50 text-green-700",
    PENDING: "bg-amber-50 text-amber-700",
    REJECTED: "bg-red-50 text-red-700",
    NOT_SUBMITTED: "bg-slate-100 text-slate-600",
  };

  const labels = {
    APPROVED: "Approved",
    PENDING: "Pending",
    REJECTED: "Needs attention",
    NOT_SUBMITTED: "Not submitted",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {labels[status] || status || "Unknown"}
    </span>
  );
};

export default InternshipHistory;
