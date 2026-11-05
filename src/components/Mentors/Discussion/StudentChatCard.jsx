import React from "react";
import profile from "../../../assets/profile.jpg";

const StudentChatCard = ({ student, active, onClick }) => {
  const studentName = student?.name || "Mentee";

  const profileImage =
    student?.profileImage ||
    student?.profilePicture ||
    profile;

  const unreadCount = Math.max(
    0,
    Number(student?.unread) || 0
  );

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = profile;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={Boolean(active)}
      aria-label={`Open conversation with ${studentName}`}
      className={`flex w-full min-w-0 cursor-pointer items-center gap-2.5 border-b border-slate-100 px-3 py-2.5 text-left transition-all duration-200 sm:gap-3 sm:px-4 sm:py-3 ${
        active
          ? "border-l-4 border-l-blue-600 bg-blue-50"
          : "border-l-4 border-l-transparent hover:bg-slate-50"
      }`}
    >
      {/* Student profile */}
      <div className="relative shrink-0">
        <img
          src={profileImage}
          alt={studentName}
          onError={handleImageError}
          className="h-10 w-10 rounded-full border border-slate-100 object-cover sm:h-12 sm:w-12"
        />

        {student?.online && (
          <span
            className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 sm:h-3.5 sm:w-3.5"
            title="Online"
          />
        )}
      </div>

      {/* Student details and latest message */}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center justify-between gap-1.5 sm:gap-2">
          <h3 className="min-w-0 truncate text-[13px] font-semibold text-slate-800 sm:text-[14px]">
            {studentName}
          </h3>

          <span className="max-w-[76px] shrink-0 truncate text-[10px] text-slate-400 sm:max-w-none sm:text-[11px]">
            {student?.time || ""}
          </span>
        </div>

        <p className="mt-1 truncate text-[11px] text-slate-500 sm:text-[12px]">
          {student?.message || "Start a conversation"}
        </p>
      </div>

      {/* Unread message count */}
      {unreadCount > 0 && (
        <div
          aria-label={`${unreadCount} unread messages`}
          className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </div>
      )}
    </button>
  );
};

export default StudentChatCard;
