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
      className="flex items-center gap-3 border-t border-slate-200 bg-white p-4"
    >
      <button
        type="button"
        disabled={disabled || sending}
        title="Emoji"
        aria-label="Emoji"
        onClick={() => {
          // Connect an emoji picker here if needed.
        }}
        className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
      >
        <Smile size={20} />
      </button>

      <button
        type="button"
        disabled={disabled || sending}
        title="Attach file"
        aria-label="Attach file"
        onClick={onAttachment}
        className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
      >
        <Paperclip size={20} />
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
        className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-[13px] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />

      <button
        type="submit"
        disabled={!message.trim() || sending || disabled}
        aria-label="Send message"
        title="Send message"
        className="flex shrink-0 items-center justify-center rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {sending ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <SendHorizontal size={18} />
        )}
      </button>
    </form>
  );
};

export default ChatInput;