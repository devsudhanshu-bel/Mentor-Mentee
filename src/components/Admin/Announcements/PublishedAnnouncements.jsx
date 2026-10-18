
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  List,
  Search,
  Users,
  CalendarDays,
  Hourglass,
  Megaphone,
  MoreVertical,
  GraduationCap,
  Globe,
  Eye,
  Archive,
  X,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  RefreshCw,
  Filter,
} from "lucide-react";

import api from "../../../api/axios";

const PAGE_SIZE = 5;

const audienceLabels = {
  ALL: "Everyone",
  MENTORS: "Mentors only",
  STUDENTS: "Students only",
};

const categoryLabels = {
  GENERAL: "General",
  ACADEMIC: "Academic",
  MEETING_EVENT: "Meeting / Event",
  URGENT_NOTICE: "Urgent Notice",
  General: "General",
  Academic: "Academic",
  "Meeting / Event": "Meeting / Event",
  "Urgent Notice": "Urgent Notice",
};

const priorityLabels = {
  NORMAL: "Normal",
  HIGH: "High",
  URGENT: "Urgent",
  Normal: "Normal",
  High: "High",
  Urgent: "Urgent",
};

const categoryStyles = {
  GENERAL: "bg-blue-50 text-blue-600",
  General: "bg-blue-50 text-blue-600",
  ACADEMIC: "bg-emerald-50 text-emerald-600",
  Academic: "bg-emerald-50 text-emerald-600",
  MEETING_EVENT: "bg-purple-50 text-purple-600",
  "Meeting / Event": "bg-purple-50 text-purple-600",
  URGENT_NOTICE: "bg-rose-50 text-rose-600",
  "Urgent Notice": "bg-rose-50 text-rose-600",
};

const audienceIcons = {
  ALL: Globe,
  MENTORS: Users,
  STUDENTS: GraduationCap,
};

const priorityStyles = {
  URGENT: "bg-rose-50 text-rose-600",
  Urgent: "bg-rose-50 text-rose-600",
  HIGH: "bg-amber-50 text-amber-700",
  High: "bg-amber-50 text-amber-700",
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeAnnouncement = (item) => ({
  ...item,
  category: categoryLabels[item.category] || item.category || "General",
  priority: priorityLabels[item.priority] || item.priority || "Normal",
  publishedAt: item.publishedAt || item.createdAt || null,
  expiresAt: item.expiresAt || item.expiryDate || null,
});

const PublishedAnnouncements = ({ announcements = [] }) => {
  const [serverAnnouncements, setServerAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("PUBLISHED");

  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [archivingId, setArchivingId] = useState(null);

  const loadAnnouncements = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/admin/announcements", {
        params: {
          status: statusFilter,
          limit: 100,
          page: 1,
        },
      });

      const body = response.data;

      if (body?.success === false) {
        throw new Error(
          body.message || "Failed to load announcements."
        );
      }

      const data = body?.data;
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.announcements)
            ? data.announcements
            : [];

      setServerAnnouncements(items.map(normalizeAnnouncement));
    } catch (err) {
      console.error("Failed to load announcements:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load announcements."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  // Combine server records with newly published records from the parent.
  // Server records take precedence for duplicate IDs.
  const allAnnouncements = useMemo(() => {
    const localRecords = announcements.map(normalizeAnnouncement);
    const serverIds = new Set(
      serverAnnouncements.map((item) => String(item.id))
    );

    const combined = [
      ...serverAnnouncements,
      ...localRecords.filter(
        (item) => !serverIds.has(String(item.id))
      ),
    ];

    const seen = new Set();

    return combined.filter((item) => {
      const id = String(item.id);

      if (seen.has(id)) return false;

      seen.add(id);
      return true;
    });
  }, [serverAnnouncements, announcements]);

  const filteredAnnouncements = useMemo(() => {
    const term = search.trim().toLowerCase();

    return allAnnouncements.filter((item) => {
      const matchesSearch =
        !term ||
        String(item.title || "").toLowerCase().includes(term) ||
        String(item.message || "").toLowerCase().includes(term);

      const matchesAudience =
        audienceFilter === "ALL" ||
        item.audience === audienceFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        item.category === categoryLabels[categoryFilter] ||
        item.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        item.priority === priorityLabels[priorityFilter] ||
        item.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesAudience &&
        matchesCategory &&
        matchesPriority
      );
    });
  }, [
    allAnnouncements,
    search,
    audienceFilter,
    categoryFilter,
    priorityFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAnnouncements.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedAnnouncements = filteredAnnouncements.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    audienceFilter,
    categoryFilter,
    priorityFilter,
    statusFilter,
  ]);

  const handleArchive = async (announcement) => {
    if (!announcement.id) return;

    const confirmed = window.confirm(
      `Archive "${announcement.title}"?`
    );

    if (!confirmed) {
      setOpenMenuId(null);
      return;
    }

    try {
      setArchivingId(announcement.id);
      setActionError("");
      setOpenMenuId(null);

      await api.patch(
        `/admin/announcements/${announcement.id}/archive`
      );

      setServerAnnouncements((previous) =>
        previous.filter(
          (item) => String(item.id) !== String(announcement.id)
        )
      );

      if (
        selectedAnnouncement &&
        String(selectedAnnouncement.id) === String(announcement.id)
      ) {
        setSelectedAnnouncement(null);
      }

      await loadAnnouncements(true);
    } catch (err) {
      console.error("Failed to archive announcement:", err);

      setActionError(
        err?.response?.data?.message ||
          "Unable to archive this announcement."
      );
    } finally {
      setArchivingId(null);
    }
  };

  const handleViewDetails = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenMenuId(null);
  };

  const clearFilters = () => {
    setSearch("");
    setAudienceFilter("ALL");
    setCategoryFilter("ALL");
    setPriorityFilter("ALL");
    setCurrentPage(1);
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <List size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold text-slate-900">
              Published Announcements
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              Search, filter and manage published announcements.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadAnnouncements(true)}
            disabled={refreshing || loading}
            aria-label="Refresh announcements"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by announcement title or message..."
            aria-label="Search announcements"
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filters */}
        <div className="mt-3 flex items-center gap-2">
          <Filter
            size={15}
            className="shrink-0 text-slate-400"
          />

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
            <select
              value={audienceFilter}
              onChange={(event) =>
                setAudienceFilter(event.target.value)
              }
              aria-label="Filter by audience"
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs outline-none focus:border-blue-500"
            >
              <option value="ALL">All audiences</option>
              <option value="MENTORS">Mentors</option>
              <option value="STUDENTS">Students</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              aria-label="Filter by category"
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs outline-none focus:border-blue-500"
            >
              <option value="ALL">All categories</option>
              <option value="GENERAL">General</option>
              <option value="ACADEMIC">Academic</option>
              <option value="MEETING_EVENT">Meeting / Event</option>
              <option value="URGENT_NOTICE">Urgent Notice</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
              aria-label="Filter by priority"
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs outline-none focus:border-blue-500"
            >
              <option value="ALL">All priorities</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs outline-none focus:border-blue-500"
            >
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Drafts</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[11px] text-slate-500">
            {filteredAnnouncements.length} announcement
            {filteredAnnouncements.length === 1 ? "" : "s"} found
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Action errors */}
      {actionError && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
        >
          {actionError}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
          <LoaderCircle
            size={28}
            className="animate-spin text-blue-600"
          />
          <p className="text-sm text-slate-500">
            Loading announcements...
          </p>
        </div>
      ) : error ? (
        <div className="px-5 py-12 text-center">
          <p className="text-sm font-semibold text-red-600">
            Could not load announcements
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => loadAnnouncements()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          {/* Announcement list: maximum five per page */}
          <div className="divide-y divide-slate-100">
            {paginatedAnnouncements.map((announcement) => {
              const AudienceIcon =
                audienceIcons[announcement.audience] || Globe;

              const categoryKey =
                Object.keys(categoryLabels).find(
                  (key) =>
                    categoryLabels[key] === announcement.category
                ) || announcement.category;

              const priorityKey =
                Object.keys(priorityLabels).find(
                  (key) =>
                    priorityLabels[key] === announcement.priority
                ) || announcement.priority;

              return (
                <article
                  key={announcement.id}
                  className="group relative flex gap-3 p-4 transition hover:bg-slate-50/70 sm:gap-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${
                      priorityKey === "URGENT" ||
                      priorityKey === "Urgent"
                        ? "bg-rose-50 text-rose-500"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Megaphone size={22} strokeWidth={2.2} />
                  </div>

                  <div className="min-w-0 flex-1 pr-5">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="break-words text-sm font-bold leading-5 text-slate-900">
                        {announcement.title}
                      </h3>

                      <span
                        className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${
                          priorityStyles[priorityKey] ||
                          categoryStyles[categoryKey] ||
                          "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {priorityKey === "URGENT" ||
                        priorityKey === "Urgent"
                          ? "Urgent"
                          : categoryLabels[categoryKey] ||
                            announcement.category}
                      </span>
                    </div>

                    <p className="line-clamp-3 text-xs leading-5 text-slate-500">
                      {announcement.message}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <AudienceIcon size={13} />
                        {audienceLabels[announcement.audience] ||
                          "Everyone"}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        {formatDate(announcement.publishedAt) ||
                          "Not published"}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Hourglass size={13} />
                        {announcement.expiresAt
                          ? `Expires ${formatDate(announcement.expiresAt)}`
                          : "No expiry"}
                      </span>
                    </div>
                  </div>

                  {/* Actions menu */}
                  <div className="absolute right-3 top-3">
                    <button
                      type="button"
                      aria-label={`Actions for ${announcement.title}`}
                      aria-expanded={openMenuId === announcement.id}
                      onClick={() =>
                        setOpenMenuId((current) =>
                          current === announcement.id
                            ? null
                            : announcement.id
                        )
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                    >
                      <MoreVertical size={17} />
                    </button>

                    {openMenuId === announcement.id && (
                      <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewDetails(announcement)
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
                        >
                          <Eye size={14} />
                          View details
                        </button>

                        {announcement.status !== "ARCHIVED" && (
                          <button
                            type="button"
                            disabled={archivingId === announcement.id}
                            onClick={() => handleArchive(announcement)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-amber-700 hover:bg-amber-50 disabled:opacity-50"
                          >
                            {archivingId === announcement.id ? (
                              <LoaderCircle
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <Archive size={14} />
                            )}
                            Archive
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}

            {paginatedAnnouncements.length === 0 && (
              <div className="px-5 py-12 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <Megaphone size={23} />
                </div>

                <h3 className="text-sm font-semibold text-slate-800">
                  No announcements found
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Try a different search term or filter.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredAnnouncements.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-slate-500">
                Showing{" "}
                {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(
                  safePage * PAGE_SIZE,
                  filteredAnnouncements.length
                )}{" "}
                of {filteredAnnouncements.length}
              </p>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>

                <span className="whitespace-nowrap text-xs font-semibold text-slate-700">
                  Page {safePage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Announcement details popup */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-detail-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Megaphone size={22} />
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Announcement details
                  </p>

                  <h3
                    id="announcement-detail-title"
                    className="break-words text-lg font-bold text-slate-900"
                  >
                    {selectedAnnouncement.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedAnnouncement(null)}
                className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700">
                {audienceLabels[selectedAnnouncement.audience] ||
                  "Everyone"}
              </span>

              <span
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${
                  categoryStyles[
                    Object.keys(categoryLabels).find(
                      (key) =>
                        categoryLabels[key] ===
                        selectedAnnouncement.category
                    )
                  ] || "bg-slate-100 text-slate-700"
                }`}
              >
                {selectedAnnouncement.category}
              </span>

              <span
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${
                  priorityStyles[selectedAnnouncement.priority] ||
                  "bg-slate-100 text-slate-700"
                }`}
              >
                {selectedAnnouncement.priority} priority
              </span>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                {selectedAnnouncement.message}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 p-3">
                <p className="text-[11px] text-slate-500">
                  Published on
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {formatDate(selectedAnnouncement.publishedAt) ||
                    "Not published"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-3">
                <p className="text-[11px] text-slate-500">
                  Expiry date
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {formatDate(selectedAnnouncement.expiresAt) ||
                    "No expiry"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-3">
                <p className="text-[11px] text-slate-500">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                  {String(
                    selectedAnnouncement.status || "PUBLISHED"
                  ).toLowerCase()}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-3">
                <p className="text-[11px] text-slate-500">
                  Recipients
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedAnnouncement._count
                    ?.announcement_recipients ??
                    selectedAnnouncement.recipientCount ??
                    "Not available"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedAnnouncement(null)}
              className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Close details
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PublishedAnnouncements;
