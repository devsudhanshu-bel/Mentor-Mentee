
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Send,
  MessageCircle,
  RefreshCw,
  RotateCw,
  Clock,
} from "lucide-react";
import { io } from "socket.io-client";
import api from "../../api/axios";

const PAGE_SIZE = 30;
const GROUPING_WINDOW_MS = 15 * 60 * 1000;
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user.id || user.userId || user.userAccountId || null;
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Unable to send the message.";

/* ==========================================================
   MERGE MESSAGES
========================================================== */

const mergeMessage = (previous, incoming) => {
  if (!incoming?.id) return previous;

  const existingIndex = previous.findIndex(
    (item) => String(item.id) === String(incoming.id)
  );

  if (existingIndex !== -1) {
    return previous.map((item, index) =>
      index === existingIndex
        ? {
            ...item,
            ...incoming,
            sendStatus: "sent",
          }
        : item
    );
  }

  const incomingTime = new Date(incoming.createdAt).getTime();

  const optimisticIndex = previous.findIndex((item) => {
    if (!String(item.id).startsWith("temp-")) return false;
    if (!item.isOwnMessage) return false;

    const sameConversation =
      String(item.conversationId) === String(incoming.conversationId);

    const sameSender =
      String(item.senderId) === String(incoming.senderId);

    const sameContent = item.content === incoming.content;

    const optimisticTime = new Date(item.createdAt).getTime();

    const closeInTime =
      Number.isFinite(incomingTime) &&
      Number.isFinite(optimisticTime) &&
      Math.abs(optimisticTime - incomingTime) < 30000;

    return (
      sameConversation &&
      sameSender &&
      sameContent &&
      closeInTime
    );
  });

  if (optimisticIndex !== -1) {
    return previous.map((item, index) =>
      index === optimisticIndex
        ? {
            ...incoming,
            sendStatus: "sent",
            isOwnMessage: true,
          }
        : item
    );
  }

  return [...previous, incoming];
};

/* ==========================================================
   MESSAGE GROUPING
========================================================== */

const shouldShowSender = (messages, index, isOwnMessage) => {
  if (index === 0) return true;

  const current = messages[index];
  const previous = messages[index - 1];

  if (current.sendStatus === "failed") return true;

  const currentIsMine = isOwnMessage(current);
  const previousIsMine = isOwnMessage(previous);

  if (currentIsMine !== previousIsMine) return true;

  if (
    current.senderId != null &&
    previous.senderId != null &&
    String(current.senderId) !== String(previous.senderId)
  ) {
    return true;
  }

  const currentTime = new Date(current.createdAt).getTime();
  const previousTime = new Date(previous.createdAt).getTime();

  if (
    !Number.isFinite(currentTime) ||
    !Number.isFinite(previousTime)
  ) {
    return true;
  }

  const elapsed = currentTime - previousTime;

  return elapsed < 0 || elapsed >= GROUPING_WINDOW_MS;
};

/* ==========================================================
   DISCUSSION
========================================================== */

const Discussion = () => {
  const currentUserId = getCurrentUserId();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [conversationNotice, setConversationNotice] = useState("");

  const messagesContainerRef = useRef(null);
  const requestIdRef = useRef(0);
  const inputRef = useRef(null);
  const pageScrollRef = useRef(0);
  const conversationRef = useRef(null);

  const socketRef = useRef(null);
  const joinedConversationRef = useRef(null);

  /* ========================================================
     SCROLL HELPERS
  ======================================================== */

  const scrollMessagesToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, []);

  const restorePageScroll = useCallback(() => {
    window.scrollTo({
      top: pageScrollRef.current,
      left: 0,
      behavior: "auto",
    });
  }, []);

  /* ========================================================
     LOAD CONVERSATION
  ======================================================== */

  const loadConversation = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError("");
    setConversationNotice("");

    try {
      const response = await api.get("/chat/conversations");
      const conversations = response.data?.data;

      if (!Array.isArray(conversations)) {
        throw new Error("Unexpected conversations response.");
      }

      if (requestId !== requestIdRef.current) return;

      if (conversations.length === 0) {
        conversationRef.current = null;
        setConversation(null);
        setMessages([]);

        setConversationNotice(
          "No active mentor assignment was found. Please contact your administrator if this seems incorrect."
        );

        return;
      }

      if (conversations.length > 1) {
        conversationRef.current = null;
        setConversation(null);
        setMessages([]);

        setConversationNotice(
          "Multiple conversations are available. A conversation selector is needed to choose one."
        );

        return;
      }

      const selectedConversation = conversations[0];

      conversationRef.current = selectedConversation;
      setConversation(selectedConversation);

      const messageResponse = await api.get(
        `/chat/conversations/${selectedConversation.id}/messages`,
        {
          params: {
            page: 1,
            limit: PAGE_SIZE,
          },
        }
      );

      if (requestId !== requestIdRef.current) return;

      const items = messageResponse.data?.data?.items;

      setMessages(Array.isArray(items) ? items : []);

      api
        .patch(`/chat/conversations/${selectedConversation.id}/read`)
        .catch(() => {});
    } catch (err) {
      if (requestId === requestIdRef.current) {
        setError(getErrorMessage(err));
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadConversation();

    return () => {
      requestIdRef.current += 1;
    };
  }, [loadConversation]);

  useEffect(() => {
    scrollMessagesToBottom();
  }, [messages, scrollMessagesToBottom]);

  /* ========================================================
     CHECK OWN MESSAGE
  ======================================================== */

  const isOwnMessage = useCallback(
    (message) => {
      if (message.isOwnMessage) return true;

      if (
        currentUserId != null &&
        message.senderId != null &&
        String(message.senderId) === String(currentUserId)
      ) {
        return true;
      }

      const menteeUserAccountId =
        conversationRef.current?.menteeUserAccountId;

      if (
        menteeUserAccountId != null &&
        message.senderId != null &&
        String(message.senderId) === String(menteeUserAccountId)
      ) {
        return true;
      }

      return false;
    },
    [currentUserId]
  );

  /* ========================================================
     SEND MESSAGE
  ======================================================== */

  const transmitMessage = useCallback(
    async (message, targetConversation) => {
      const tempId = message.id;

      setMessages((previous) =>
        previous.map((item) =>
          item.id === tempId
            ? {
                ...item,
                sendStatus: "sending",
              }
            : item
        )
      );

      try {
        const response = await api.post(
          `/chat/conversations/${targetConversation.id}/messages`,
          {
            content: message.content,
          }
        );

        const savedMessage = response.data?.data;

        if (!savedMessage?.id) {
          throw new Error("The server did not return the saved message.");
        }

        setMessages((previous) => {
          const withoutTemp = previous.filter(
            (item) => item.id !== tempId
          );

          return mergeMessage(withoutTemp, {
            ...savedMessage,
            sendStatus: "sent",
            isOwnMessage: true,
          });
        });

        api
          .patch(`/chat/conversations/${targetConversation.id}/read`)
          .catch(() => {});
      } catch (err) {
        setMessages((previous) =>
          previous.map((item) =>
            item.id === tempId
              ? {
                  ...item,
                  sendStatus: "failed",
                  sendError: getErrorMessage(err),
                }
              : item
          )
        );
      } finally {
        requestAnimationFrame(restorePageScroll);
      }
    },
    [restorePageScroll]
  );

  /* ========================================================
     SOCKET.IO CONNECTION
  ======================================================== */

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return undefined;

    const socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    /* INCOMING MESSAGE */

    const handleIncomingMessage = (incoming) => {
      const activeConversation = conversationRef.current;

      if (
        !activeConversation ||
        String(incoming?.conversationId) !==
          String(activeConversation.id)
      ) {
        return;
      }

      setMessages((previous) =>
        mergeMessage(previous, incoming)
      );

      if (
        currentUserId == null ||
        String(incoming?.senderId) !== String(currentUserId)
      ) {
        api
          .patch(`/chat/conversations/${activeConversation.id}/read`)
          .catch(() => {});
      }
    };

    /* JOIN CONVERSATION */

    const joinCurrentConversation = () => {
      const activeConversation = conversationRef.current;

      if (!activeConversation?.id) return;

      socket.emit("chat:join", {
        conversationId: activeConversation.id,
      });

      joinedConversationRef.current = activeConversation.id;

      /* CATCH UP ON MISSED MESSAGES */

      api
        .get(
          `/chat/conversations/${activeConversation.id}/messages`,
          {
            params: {
              page: 1,
              limit: PAGE_SIZE,
            },
          }
        )
        .then((response) => {
          const items = response.data?.data?.items;

          if (!Array.isArray(items)) return;

          if (
            String(conversationRef.current?.id) !==
            String(activeConversation.id)
          ) {
            return;
          }

          setMessages((previous) => {
            const merged = [...items];

            for (const item of previous) {
              const isTemporary =
                String(item.id).startsWith("temp-");

              const isPending =
                item.sendStatus === "sending" ||
                item.sendStatus === "failed";

              if (isTemporary || isPending) {
                const alreadyPresent = merged.some(
                  (candidate) =>
                    String(candidate.id) === String(item.id)
                );

                if (!alreadyPresent) {
                  merged.push(item);
                }
              }
            }

            return merged;
          });
        })
        .catch(() => {});
    };

    socket.on("connect", joinCurrentConversation);
    socket.on("chat:message", handleIncomingMessage);

    return () => {
      const activeConversationId =
        joinedConversationRef.current;

      if (activeConversationId) {
        socket.emit("chat:leave", {
          conversationId: activeConversationId,
        });
      }

      socket.off("connect", joinCurrentConversation);
      socket.off("chat:message", handleIncomingMessage);

      socket.disconnect();

      socketRef.current = null;
      joinedConversationRef.current = null;
    };
  }, [currentUserId]);

  /* ========================================================
     JOIN SELECTED CONVERSATION
  ======================================================== */

  useEffect(() => {
    const socket = socketRef.current;

    if (!socket || !conversation?.id || !socket.connected) {
      return;
    }

    const previousId = joinedConversationRef.current;

    if (
      previousId &&
      String(previousId) !== String(conversation.id)
    ) {
      socket.emit("chat:leave", {
        conversationId: previousId,
      });
    }

    socket.emit("chat:join", {
      conversationId: conversation.id,
    });

    joinedConversationRef.current = conversation.id;
  }, [conversation?.id]);

  /* ========================================================
     HANDLE SEND
  ======================================================== */

  const handleSend = (event) => {
    event.preventDefault();

    pageScrollRef.current = window.scrollY;

    const content = messageText.trim();
    const activeConversation = conversationRef.current;

    if (!content) return;

    if (!activeConversation) {
      setError(
        "An active mentor conversation is required to send a message."
      );

      return;
    }

    setError("");
    setMessageText("");

    const optimisticMessage = {
      id: `temp-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
      conversationId: activeConversation.id,
      senderId: currentUserId,
      content,
      createdAt: new Date().toISOString(),
      sendStatus: "sending",
      isOwnMessage: true,
    };

    setMessages((previous) => [
      ...previous,
      optimisticMessage,
    ]);

    requestAnimationFrame(() => {
      restorePageScroll();

      inputRef.current?.focus({
        preventScroll: true,
      });
    });

    void transmitMessage(
      optimisticMessage,
      activeConversation
    );
  };

  /* ========================================================
     RETRY FAILED MESSAGE
  ======================================================== */

  const retryMessage = (message) => {
    const activeConversation = conversationRef.current;

    if (
      !activeConversation ||
      message.sendStatus !== "failed"
    ) {
      return;
    }

    setError("");

    void transmitMessage(
      {
        ...message,
        sendStatus: "sending",
      },
      activeConversation
    );
  };

  /* ========================================================
     KEYBOARD HANDLING
  ======================================================== */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="
        w-full
        min-w-0
        min-h-[300px]
        h-full
        bg-white
        border
        border-slate-200
        rounded-xl
        shadow-sm
        p-3
        sm:p-4
        hover:shadow-md
        transition-all
        duration-300
        flex
        flex-col
        overflow-hidden
      "
    >
      {/* HEADER */}

      <div className="flex items-center justify-between gap-2 mb-4 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <MessageCircle
            size={19}
            className="text-blue-600 shrink-0"
          />

          <h3 className="text-[13px] sm:text-[14px] font-semibold text-blue-600 truncate">
            Discussion
          </h3>
        </div>

        <button
          type="button"
          onClick={loadConversation}
          disabled={loading}
          className="
            p-1.5
            rounded-lg
            text-blue-600
            hover:bg-blue-50
            hover:text-blue-700
            disabled:opacity-50
            transition
            shrink-0
          "
          aria-label="Refresh discussion"
          title="Refresh discussion"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* MESSAGE HISTORY */}

      <div
        ref={messagesContainerRef}
        className="
          flex-1
          min-h-[130px]
          max-h-[300px]
          sm:max-h-[350px]
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          pr-1
          scrollbar-thin
        "
      >
        {loading ? (
          <p className="text-center text-xs text-slate-500 py-8">
            Loading conversation...
          </p>
        ) : !conversation ? (
          <div className="text-center py-8 px-2">
            <MessageCircle
              size={28}
              className="mx-auto text-slate-300 mb-2"
            />

            <p className="text-xs font-medium text-slate-700">
              No conversation available
            </p>

            <p className="text-[11px] text-slate-400 mt-1 leading-5 break-words">
              {conversationNotice ||
                error ||
                "Your assigned mentor conversation will appear here."}
            </p>

            {error && (
              <button
                type="button"
                onClick={loadConversation}
                className="mt-3 text-xs font-medium text-blue-600 hover:underline"
              >
                Try again
              </button>
            )}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-xs text-slate-500 py-8">
            <MessageCircle
              size={25}
              className="mx-auto text-slate-300 mb-2"
            />

            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message, index) => {
              const isMine = isOwnMessage(message);

              const showSender = shouldShowSender(
                messages,
                index,
                isOwnMessage
              );

              return (
                <div
                  key={message.id}
                  className={`
                    flex
                    items-start
                    gap-2
                    sm:gap-3
                    min-w-0
                    ${isMine ? "flex-row-reverse" : ""}
                    ${showSender ? "mt-5" : "mt-1"}
                  `}
                >
                  {/* AVATAR */}

                  {showSender ? (
                    <div
                      className={`
                        w-7
                        h-7
                        sm:w-8
                        sm:h-8
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-[9px]
                        sm:text-[10px]
                        font-semibold
                        flex-shrink-0
                        ${
                          isMine
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-600"
                        }
                      `}
                    >
                      {isMine ? "You" : "M"}
                    </div>
                  ) : (
                    <div className="w-7 sm:w-8 flex-shrink-0" />
                  )}

                  {/* MESSAGE CONTENT */}

                  <div
                    className={`
                      flex-1
                      min-w-0
                      ${isMine ? "text-right" : ""}
                    `}
                  >
                    {/* SENDER AND DATE */}

                    {showSender && (
                      <div
                        className={`
                          flex
                          flex-wrap
                          items-center
                          gap-x-2
                          gap-y-1
                          ${
                            isMine
                              ? "justify-end"
                              : "justify-between"
                          }
                        `}
                      >
                        <h4 className="text-[11px] sm:text-[12px] font-semibold text-[#142970]">
                          {isMine ? "You" : "Mentor"}
                        </h4>

                        <span className="text-[9px] sm:text-[10px] text-slate-500">
                          {formatDate(message.createdAt)}{" "}
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    )}

                    {!showSender && (
                      <div className="text-[9px] sm:text-[10px] text-slate-400 mb-1">
                        {formatTime(message.createdAt)}
                      </div>
                    )}

                    {/* MESSAGE BUBBLE */}

                    <div
                      className={`
                        mt-1
                        inline-block
                        max-w-[95%]
                        sm:max-w-[90%]
                        rounded-lg
                        px-3
                        py-2
                        text-left
                        text-[11px]
                        leading-5
                        whitespace-pre-wrap
                        break-words
                        ${
                          isMine
                            ? "bg-blue-50 text-slate-700"
                            : "bg-slate-50 text-slate-600"
                        }
                      `}
                    >
                      <p>{message.content}</p>

                      {/* SENDING STATUS */}

                      {isMine &&
                        message.sendStatus === "sending" && (
                          <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                            <Clock size={10} />
                            Sending
                          </span>
                        )}

                      {/* FAILED STATUS */}

                      {isMine &&
                        message.sendStatus === "failed" && (
                          <div className="mt-2 flex flex-col items-end gap-1">
                            <span className="text-[10px] text-red-500">
                              Not sent
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                retryMessage(message)
                              }
                              className="
                                inline-flex
                                items-center
                                gap-1
                                text-[10px]
                                font-semibold
                                text-blue-600
                                hover:underline
                              "
                            >
                              <RotateCw size={10} />
                              Retry
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ERROR MESSAGE */}

      {error && conversation && (
        <p
          role="alert"
          className="mt-2 text-[10px] sm:text-[11px] text-red-500 break-words"
        >
          {error}
        </p>
      )}

      {/* MESSAGE INPUT */}

      <form
        onSubmit={handleSend}
        className="
          flex
          items-center
          gap-2
          mt-3
          sm:mt-4
          shrink-0
          w-full
          min-w-0
        "
      >
        <input
          ref={inputRef}
          type="text"
          value={messageText}
          onChange={(event) =>
            setMessageText(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          maxLength={10000}
          disabled={loading || !conversation}
          aria-label="Write a message"
          className="
            flex-1
            min-w-0
            w-full
            border
            border-slate-200
            rounded-lg
            px-3
            py-2.5
            text-[11px]
            sm:text-[12px]
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            disabled:bg-slate-50
            disabled:cursor-not-allowed
          "
        />

        <button
          type="submit"
          disabled={
            !conversation ||
            !messageText.trim() ||
            loading
          }
          className="
            shrink-0
            flex
            items-center
            justify-center
            gap-1.5
            sm:gap-2
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-slate-300
            text-white
            px-3
            sm:px-4
            py-2.5
            rounded-lg
            text-[11px]
            sm:text-[12px]
            font-medium
            transition
          "
        >
          <Send size={14} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default Discussion;
