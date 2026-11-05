import React from "react";

const MessageBubble = ({ mine, message, time }) => {
  return (
    <div
      className={`flex min-w-0 w-full ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`min-w-0 max-w-[88%] rounded-2xl px-3 py-2 sm:max-w-[70%] sm:px-4 sm:py-3 ${
          mine
            ? "bg-blue-600 text-white"
            : "border border-slate-200 bg-white"
        }`}
      >
        <p className="break-words text-[12px] sm:text-[13px]">{message}</p>

        <p
          className={`mt-1 break-words text-right text-[9px] sm:text-[10px] ${
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
