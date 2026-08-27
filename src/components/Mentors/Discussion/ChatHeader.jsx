import React from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import profile from "../../../assets/profile.png";

const ChatHeader = () => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={profile}
            alt="Student"
            className="h-11 w-11 rounded-full object-cover"
          />

          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
        </div>

        <div>
          <h3 className="text-[15px] font-semibold text-slate-800">
            Sudhanshu Belavarthy
          </h3>

          <p className="text-[12px] text-emerald-600">
            Online
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-lg p-2 hover:bg-slate-100 transition">
          <Phone size={18} />
        </button>

        <button className="rounded-lg p-2 hover:bg-slate-100 transition">
          <Video size={18} />
        </button>

        <button className="rounded-lg p-2 hover:bg-slate-100 transition">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;