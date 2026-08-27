import React from "react";
import profile from "../../../assets/profile.jpg";

const StudentChatCard = ({ student, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-3 border-b border-slate-100 px-4 py-3 text-left transition-all duration-200 ${
        active
          ? "bg-blue-50 border-l-4 border-l-blue-600"
          : "hover:bg-slate-50"
      }`}
    >
      {/* Profile */}
      <div className="relative">
        <img
          src={profile}
          alt={student.name}
          className="h-12 w-12 rounded-full object-cover"
        />

        {student.online && (
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-[14px] font-semibold text-slate-800">
            {student.name}
          </h3>

          <span className="text-[11px] text-slate-400">
            {student.time}
          </span>
        </div>

        <p className="truncate text-[12px] text-slate-500">
          {student.message}
        </p>
      </div>

      {student.unread > 0 && (
        <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
          {student.unread}
        </div>
      )}
    </button>
  );
};

export default StudentChatCard;