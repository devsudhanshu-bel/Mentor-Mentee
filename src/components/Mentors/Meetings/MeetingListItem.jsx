import React, { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Copy,
  Eye,
  MapPin,
  MoreVertical,
  PauseCircle,
  Pencil,
  Play,
  Trash2,
  XCircle,
} from "lucide-react";

import MeetingDateBadge from "./MeetingDateBadge";

const badgeColors = {
  "In Person": "bg-blue-50 text-blue-600",
  Recurring: "bg-emerald-50 text-emerald-600",
  Online: "bg-violet-50 text-violet-600",
};

const MeetingListItem = ({
  meeting,
  onStartMeeting = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const menuItemClass =
    "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-slate-700 transition hover:bg-slate-100";

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:shadow-sm">
      {/* Left Section */}
      <div className="flex flex-1 items-start gap-3">
        <MeetingDateBadge
          month={meeting.month}
          date={meeting.date}
          day={meeting.day}
        />

        {/* Meeting Details */}
        <div className="min-w-0 flex-1 pr-4">
          {/* Time & Badge */}
          <div className="mb-1 flex items-center gap-2">
            <p className="text-[12px] font-semibold text-blue-600">
              {meeting.time}
            </p>

            <span
              className={`rounded-full px-2 py-[2px] text-[9px] font-semibold ${
                badgeColors[meeting.type]
              }`}
            >
              {meeting.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[14px] font-semibold text-slate-800">
            {meeting.title}
          </h3>

          {/* Location */}
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <MapPin size={11} />
            <span>{meeting.location}</span>
          </div>

          {/* Agenda */}
          <p
            className="mt-1 max-w-[360px] overflow-hidden text-[11px] leading-4 text-slate-500"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {meeting.agenda}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative ml-5 flex flex-shrink-0 items-center gap-2">
        {/* Start Meeting */}
        <button
          onClick={() => onStartMeeting(meeting)}
          className="cursor-pointer rounded-lg border border-blue-300 px-3 py-1.5 text-[12px] font-medium text-blue-600 transition hover:bg-blue-50"
        >
          Start Meeting
        </button>

        {/* More Button */}
        <div
          ref={menuRef}
          className="relative"
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer rounded-lg p-2 transition hover:bg-slate-100"
          >
            <MoreVertical
              size={16}
              className="text-slate-500"
            />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              {meeting.type === "Recurring" ? (
                <>
                  <button className={menuItemClass}>
                    <Eye size={15} />
                    View Details
                  </button>

                  <button className={menuItemClass}>
                    <Pencil size={15} />
                    Edit Series
                  </button>

                  <button className={menuItemClass}>
                    <CalendarDays size={15} />
                    Skip This Week
                  </button>

                  <button className={menuItemClass}>
                    <PauseCircle size={15} />
                    Pause Series
                  </button>

                  <hr className="my-2 border-slate-200" />

                  <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-red-600 transition hover:bg-red-50">
                    <Trash2 size={15} />
                    Delete Series
                  </button>
                </>
              ) : (
                <>
                  <button className={menuItemClass}>
                    <Eye size={15} />
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onStartMeeting(meeting);
                    }}
                    className={menuItemClass}
                  >
                    <Play size={15} />
                    Start Meeting
                  </button>
                                    <button className={menuItemClass}>
                    <Pencil size={15} />
                    Edit Meeting
                  </button>

                  <button className={menuItemClass}>
                    <CalendarDays size={15} />
                    Reschedule
                  </button>

                  <button className={menuItemClass}>
                    <Copy size={15} />
                    Duplicate Meeting
                  </button>

                  <hr className="my-2 border-slate-200" />

                  <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-red-600 transition hover:bg-red-50">
                    <XCircle size={15} />
                    Cancel Meeting
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingListItem;