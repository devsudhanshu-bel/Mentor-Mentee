import React from "react";
import { Phone, Video, MoreVertical, UserRound } from "lucide-react";
import profile from "../../../assets/profile.png";

const getDisplayName = (conversation) => {
  const student =
    conversation?.mentee ||
    conversation?.student ||
    conversation?.menteeProfile ||
    conversation?.students ||
    {};

  const user =
    student?.userAccount ||
    student?.user ||
    student?.userAccountDetails ||
    {};

  const name =
    student?.name ||
    student?.fullName ||
    student?.studentName ||
    user?.name ||
    user?.fullName ||
    [student?.firstName, student?.lastName]
      .filter(Boolean)
      .join(" ") ||
    [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(" ");

  return name || "Student";
};

const getProfileImage = (conversation) => {
  const student =
    conversation?.mentee ||
    conversation?.student ||
    conversation?.menteeProfile ||
    conversation?.students ||
    {};

  const user =
    student?.userAccount ||
    student?.user ||
    {};

  return (
    student?.profileImage ||
    student?.profilePicture ||
    student?.avatar ||
    user?.profileImage ||
    user?.profilePicture ||
    user?.avatar ||
    profile
  );
};

const ChatHeader = ({ conversation = null }) => {
  const studentName = getDisplayName(conversation);
  const studentImage = getProfileImage(conversation);

  return (
    <div className="flex h-14 w-full min-w-0 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:h-16 sm:gap-3 sm:px-5">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <div className="relative shrink-0">
          {studentImage ? (
            <img
              src={studentImage}
              alt={studentName}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = profile;
              }}
              className="h-10 w-10 rounded-full border border-slate-200 object-cover sm:h-11 sm:w-11"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 sm:h-11 sm:w-11">
              <UserRound size={20} className="text-slate-500 sm:hidden" />
              <UserRound size={22} className="hidden text-slate-500 sm:block" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-800 sm:text-[15px]">
            {studentName}
          </h3>

          <p className="text-[11px] text-slate-500 sm:text-[12px]">
            Mentee
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-0 sm:gap-1">
        <button
          type="button"
          title="Call"
          aria-label="Call"
          onClick={() =>
            alert("Voice calling is not implemented yet.")
          }
          className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 sm:p-2"
        >
          <Phone size={16} className="sm:hidden" />
          <Phone size={18} className="hidden sm:block" />
        </button>

        <button
          type="button"
          title="Video call"
          aria-label="Video call"
          onClick={() =>
            alert("Video calling is not implemented yet.")
          }
          className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 sm:p-2"
        >
          <Video size={16} className="sm:hidden" />
          <Video size={18} className="hidden sm:block" />
        </button>

        <button
          type="button"
          title="More options"
          aria-label="More options"
          onClick={() =>
            alert("More chat options are not implemented yet.")
          }
          className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 sm:p-2"
        >
          <MoreVertical size={16} className="sm:hidden" />
          <MoreVertical size={18} className="hidden sm:block" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
