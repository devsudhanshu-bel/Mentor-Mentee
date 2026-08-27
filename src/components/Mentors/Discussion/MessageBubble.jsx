import React from "react";

const MessageBubble = ({ mine, message, time }) => {
  return (
    <div
      className={`flex ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          mine
            ? "bg-blue-600 text-white"
            : "bg-white border border-slate-200"
        }`}
      >
        <p className="text-[13px]">{message}</p>

        <p
          className={`mt-1 text-right text-[10px] ${
            mine ? "text-blue-100" : "text-slate-400"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;