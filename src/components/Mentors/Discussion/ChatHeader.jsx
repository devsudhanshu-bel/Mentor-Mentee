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
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative shrink-0">
          {studentImage ? (
            <img
              src={studentImage}
              alt={studentName}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = profile;
              }}
              className="h-11 w-11 rounded-full border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
              <UserRound size={22} className="text-slate-500" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-slate-800">
            {studentName}
          </h3>

          <p className="text-[12px] text-slate-500">
            Mentee
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          title="Call"
          aria-label="Call"
          onClick={() =>
            alert("Voice calling is not implemented yet.")
          }
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <Phone size={18} />
        </button>

        <button
          type="button"
          title="Video call"
          aria-label="Video call"
          onClick={() =>
            alert("Video calling is not implemented yet.")
          }
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <Video size={18} />
        </button>

        <button
          type="button"
          title="More options"
          aria-label="More options"
          onClick={() =>
            alert("More chat options are not implemented yet.")
          }
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;