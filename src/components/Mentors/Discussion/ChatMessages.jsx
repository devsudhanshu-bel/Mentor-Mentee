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
      <div className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle
            size={22}
            className="animate-spin text-blue-600"
          />
          Loading messages...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <MessageCircle
          size={36}
          className="mb-3 text-slate-300"
        />

        <p className="max-w-md break-words text-sm text-red-600">
          {error}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Retry loading messages
          </button>
        )}
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <MessageCircle
            size={30}
            className="text-blue-600"
          />
        </div>

        <h3 className="text-base font-semibold text-slate-800">
          No messages yet
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Send a message to start the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
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