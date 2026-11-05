import React, { useEffect, useRef } from "react";
import { LoaderCircle, MessageCircle } from "lucide-react";
import MessageBubble from "./MessageBubble";

const ChatMessages = ({
  messages = [],
  loading = false,
  error = "",
  currentUserId = null,
  onRetry,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  const isOwnMessage = (message) => {
    if (
      currentUserId == null ||
      message.senderId == null
    ) {
      return Boolean(message.mine);
    }

    return (
      String(message.senderId) === String(currentUserId)
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-slate-50 px-3 py-4 sm:px-5">
        <div className="flex items-center gap-2 text-xs text-slate-500 sm:gap-3 sm:text-sm">
          <LoaderCircle
            size={20}
            className="animate-spin text-blue-600 sm:hidden"
          />
          <LoaderCircle
            size={22}
            className="hidden animate-spin text-blue-600 sm:block"
          />
          Loading messages...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-5 text-center sm:p-6">
        <MessageCircle
          size={32}
          className="mb-3 text-slate-300 sm:hidden"
        />
        <MessageCircle
          size={36}
          className="mb-3 hidden text-slate-300 sm:block"
        />

        <p className="w-full max-w-md break-words text-xs leading-5 text-red-600 sm:text-sm">
          {error}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 max-w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700 sm:text-sm"
          >
            Retry loading messages
          </button>
        )}
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-5 text-center sm:p-6">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 sm:mb-4 sm:h-16 sm:w-16">
          <MessageCircle
            size={26}
            className="text-blue-600 sm:hidden"
          />
          <MessageCircle
            size={30}
            className="hidden text-blue-600 sm:block"
          />
        </div>

        <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
          No messages yet
        </h3>

        <p className="mt-2 w-full max-w-sm break-words text-xs leading-5 text-slate-500 sm:text-sm">
          Send a message to start the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-0 min-w-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto bg-slate-50 p-3 sm:space-y-4 sm:p-5">
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id ?? `${msg.createdAt}-${index}`}
          {...msg}
          mine={isOwnMessage(msg)}
          message={msg.content ?? msg.message ?? ""}
          time={
            msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )
              : msg.time ?? ""
          }
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
