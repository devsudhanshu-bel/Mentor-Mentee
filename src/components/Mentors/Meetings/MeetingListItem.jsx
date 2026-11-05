import React, { useEffect, useRef, useState } from "react";

import {
  Eye,
  MapPin,
  MoreVertical,
  Pencil,
  XCircle,
} from "lucide-react";

import MeetingDateBadge from "./MeetingDateBadge";

// =========================================================
// CONSTANTS
// =========================================================

const badgeColors = {
  "In Person": "bg-blue-50 text-blue-600",
  Recurring: "bg-emerald-50 text-emerald-600",
  Online: "bg-violet-50 text-violet-600",
};

const TERMINAL_STATUSES = [
  "COMPLETED",
  "CANCELLED",
  "CANCELED",
  "NO_SHOW",
  "NO-SHOW",
];

// =========================================================
// HELPERS
// =========================================================

const normalizeStatus = (status) =>
  String(status ?? "SCHEDULED")
    .trim()
    .toUpperCase()
    .replace(/[\\s-]+/g, "_");

// =========================================================
// MEETING LIST ITEM
// =========================================================

const MeetingListItem = ({
  meeting,

  onStartMeeting = () => {},
  onViewDetails = () => {},
  onEditMeeting = () => {},
  onCancelMeeting = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // -------------------------------------------------------
  // CLOSE MENU ON OUTSIDE CLICK / ESCAPE
  // -------------------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // -------------------------------------------------------
  // MEETING STATUS
  // -------------------------------------------------------

  const status = normalizeStatus(meeting?.status);

  const isTerminal = TERMINAL_STATUSES.includes(status);
  const isInProgress = status === "IN_PROGRESS";
  const isScheduled = status === "SCHEDULED";

  const isCompleted = status === "COMPLETED";
  const isNoShow = status === "NO_SHOW";

  const isCancelled =
    status === "CANCELLED" || status === "CANCELED";

  const meetingType = meeting?.type || "In Person";

  const badgeClass =
    badgeColors[meetingType] ||
    "bg-slate-100 text-slate-600";

  const menuItemClass =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[12px] text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50";

  // -------------------------------------------------------
  // ACTION HANDLERS
  // -------------------------------------------------------

  const invokeAction = (callback) => {
    setMenuOpen(false);

    if (typeof callback === "function") {
      // The parent receives the original API meeting record.
      callback(meeting?.rawMeeting ?? meeting);
    }
  };

  const handleToggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-all duration-300 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4">
      {/* LEFT SECTION */}
      <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
        <MeetingDateBadge
          month={meeting?.month || "---"}
          date={meeting?.date || "--"}
          day={meeting?.day || "---"}
        />

        {/* MEETING DETAILS */}
        <div className="min-w-0 flex-1 sm:pr-2">
          {/* TIME AND TYPE */}
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <p className="break-words text-[11px] font-semibold text-blue-600 sm:text-[12px]">
              {meeting?.time || "Time not specified"}
            </p>

            <span
              className={`rounded-full px-2 py-[2px] text-[9px] font-semibold ${badgeClass}`}
            >
              {meetingType}
            </span>

            {isInProgress && (
              <span className="rounded-full bg-amber-50 px-2 py-[2px] text-[9px] font-semibold text-amber-700">
                In Progress
              </span>
            )}

            {isCompleted && (
              <span className="rounded-full bg-emerald-50 px-2 py-[2px] text-[9px] font-semibold text-emerald-700">
                Completed
              </span>
            )}

            {isCancelled && (
              <span className="rounded-full bg-red-50 px-2 py-[2px] text-[9px] font-semibold text-red-700">
                Cancelled
              </span>
            )}

            {isNoShow && (
              <span className="rounded-full bg-orange-50 px-2 py-[2px] text-[9px] font-semibold text-orange-700">
                No Show
              </span>
            )}
          </div>

          {/* TITLE */}
          <h3 className="break-words text-[13px] font-semibold text-slate-800 sm:text-[14px]">
            {meeting?.title || "Mentorship Meeting"}
          </h3>

          {/* LOCATION */}
          <div className="mt-1 flex min-w-0 items-start gap-1 text-[11px] text-slate-500">
            <MapPin size={11} className="mt-0.5 shrink-0" />

            <span className="min-w-0 break-words">
              {meeting?.location || "Location not specified"}
            </span>
          </div>

          {/* AGENDA */}
          <p
            className="mt-1 max-w-[360px] overflow-hidden break-words text-[11px] leading-4 text-slate-500"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {meeting?.agenda || "No agenda provided."}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto">
        {/* START / CONTINUE MEETING */}
        <button
          type="button"
          onClick={() => invokeAction(onStartMeeting)}
          disabled={isTerminal}
          className="min-w-0 flex-1 cursor-pointer whitespace-normal rounded-lg border border-blue-300 px-3 py-2 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:whitespace-nowrap sm:py-1.5 sm:text-[12px]"
        >
          {isTerminal
            ? isCompleted
              ? "Completed"
              : isNoShow
                ? "No Show"
                : "Cancelled"
            : isInProgress
              ? "Continue Meeting"
              : "Start Meeting"}
        </button>

        {/* THREE-DOT MENU */}
        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            aria-label={`Actions for ${meeting?.title || "meeting"}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={handleToggleMenu}
            className="cursor-pointer rounded-lg p-2 transition hover:bg-slate-100"
          >
            <MoreVertical
              size={16}
              className="text-slate-500"
            />
          </button>

          {/* SIMPLIFIED DROPDOWN */}
          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-11 z-50 w-[min(14rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
            >
              {/* VIEW DETAILS */}
              <button
                type="button"
                role="menuitem"
                onClick={() => invokeAction(onViewDetails)}
                className={menuItemClass}
              >
                <Eye size={15} />
                View Details
              </button>

              {/* EDIT MEETING */}
              <button
                type="button"
                role="menuitem"
                onClick={() => invokeAction(onEditMeeting)}
                disabled={!isScheduled}
                title={
                  !isScheduled
                    ? "Only scheduled meetings can be edited"
                    : "Edit meeting"
                }
                className={menuItemClass}
              >
                <Pencil size={15} />
                Edit Meeting
              </button>

              <hr className="my-2 border-slate-200" />

              {/* CANCEL MEETING */}
              <button
                type="button"
                role="menuitem"
                onClick={() => invokeAction(onCancelMeeting)}
                disabled={!isScheduled}
                title={
                  !isScheduled
                    ? "Only scheduled meetings can be cancelled"
                    : "Cancel meeting"
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[12px] text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle size={15} />
                Cancel Meeting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingListItem;
