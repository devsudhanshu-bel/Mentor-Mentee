import React, { useState } from "react";
import {
  Smile,
  Paperclip,
  SendHorizontal,
  LoaderCircle,
} from "lucide-react";

const ChatInput = ({
  onSend,
  sending = false,
  disabled = false,
  placeholder = "Type a message...",
  onAttachment,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = message.trim();

    if (!content || sending || disabled || !onSend) {
      return;
    }

    try {
      await onSend(content);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full min-w-0 items-center gap-1.5 border-t border-slate-200 bg-white p-2.5 sm:gap-3 sm:p-4"
    >
      <button
        type="button"
        disabled={disabled || sending}
        title="Emoji"
        aria-label="Emoji"
        onClick={() => {
          // Connect an emoji picker here if needed.
        }}
        className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 sm:p-2"
      >
        <Smile size={18} className="sm:hidden" />
        <Smile size={20} className="hidden sm:block" />
      </button>

      <button
        type="button"
        disabled={disabled || sending}
        title="Attach file"
        aria-label="Attach file"
        onClick={onAttachment}
        className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 sm:p-2"
      >
        <Paperclip size={18} className="sm:hidden" />
        <Paperclip size={20} className="hidden sm:block" />
      </button>

      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={10000}
        disabled={disabled || sending}
        aria-label="Type a message"
        className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 sm:h-auto sm:px-4 sm:py-3 sm:text-[13px]"
      />

      <button
        type="submit"
        disabled={!message.trim() || sending || disabled}
        aria-label="Send message"
        title="Send message"
        className="flex shrink-0 items-center justify-center rounded-xl bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:p-3"
      >
        {sending ? (
          <LoaderCircle size={17} className="animate-spin sm:hidden" />
        ) : (
          <SendHorizontal size={17} className="sm:hidden" />
        )}
        {sending ? (
          <LoaderCircle size={18} className="hidden animate-spin sm:block" />
        ) : (
          <SendHorizontal size={18} className="hidden sm:block" />
        )}
      </button>
    </form>
  );
};

export default ChatInput;
