import React from "react";
import {
  Smile,
  Paperclip,
  SendHorizonal,
} from "lucide-react";

const ChatInput = () => {
  return (
    <div className="flex items-center gap-3 border-t border-slate-200 bg-white p-4">
      <button className="rounded-lg p-2 hover:bg-slate-100">
        <Smile size={20} />
      </button>

      <button className="rounded-lg p-2 hover:bg-slate-100">
        <Paperclip size={20} />
      </button>

      <input
        placeholder="Type a message..."
        className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-[13px] outline-none focus:border-blue-500"
      />

      <button className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700">
        <SendHorizonal size={18} />
      </button>
    </div>
  );
};

export default ChatInput;