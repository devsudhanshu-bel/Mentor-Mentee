import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  MessageCircle,
  X,
  Send,
  RefreshCw,
  RotateCw,
  Clock,
  LoaderCircle,
} from "lucide-react";

import api from "../../../api/axios";
import defaultProfile from "../../../assets/profile.jpg";
import StudentList from "./StudentList";

const PAGE_SIZE = 50;
const GROUPING_WINDOW_MS = 15 * 60 * 1000;

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const getUserId = () => {
  const user = getStoredUser();
  return user.id || user.userId || user.userAccountId || null;
};

const unwrapResponse = (response) => {
  const body = response?.data;

  if (body?.success === false) {
    throw new Error(body.message || "The request failed.");
  }

  return body?.data ?? body ?? null;
};

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

const getMentee = (conversation) =>
  conversation?.mentee ||
  conversation?.student ||
  conversation?.menteeProfile ||
  conversation?.students ||
  null;

const getMenteeName = (conversation) => {
  const mentee = getMentee(conversation);

  const firstLast = [
    mentee?.firstName,
    mentee?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    mentee?.fullName ||
    mentee?.name ||
    mentee?.user?.fullName ||
    mentee?.user?.name ||
    firstLast ||
    conversation?.menteeName ||
    conversation?.studentName ||
    "Mentee"
  );
};

const getMenteeImage = (conversation) => {
  const mentee = getMentee(conversation);

  return (
    mentee?.profileImage ||
    mentee?.profilePicture ||
    mentee?.avatar ||
    mentee?.image ||
    mentee?.user?.profileImage ||
    mentee?.user?.profilePicture ||
    conversation?.menteeProfileImage ||
    conversation?.studentProfileImage ||
    null
  );
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

const shouldShowSender = (messages, index) => {
  if (index === 0) return true;

  const current = messages[index];
  const previous = messages[index - 1];

  if (
    current.sendStatus === "failed" ||
    current.sendStatus === "sending"
  ) {
    return true;
  }

  if (String(current.senderId) !== String(previous.senderId)) {
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

const getMessageArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.messages)) return payload.messages;

  return [];
};

const MentorDiscussions = ({ onClose }) => {
  const currentUserId = getUserId();

  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] =
    useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const [loadingConversations, setLoadingConversations] =
    useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const [conversationError, setConversationError] = useState("");
  const [messageError, setMessageError] = useState("");

  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  const messageRequestRef = useRef(0);
  const conversationRequestRef = useRef(0);
  const selectedConversationRef = useRef(null);
  const selectedConversationIdRef = useRef(null);
  const sendingRef = useRef(false);

  const selectedConversation = useMemo(
    () =>
      conversations.find(
        (conversation) =>
          String(conversation.id) ===
          String(selectedConversationId)
      ) || null,
    [conversations, selectedConversationId]
  );

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
    selectedConversationIdRef.current = selectedConversationId;
  }, [selectedConversation, selectedConversationId]);

  const scrollMessagesToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(scrollMessagesToBottom);
  }, [messages, loadingMessages, scrollMessagesToBottom]);

  // Fetch conversations whenever this modal mounts.
  const loadConversations = useCallback(
    async ({ preserveSelection = true } = {}) => {
      const requestId = ++conversationRequestRef.current;

      setLoadingConversations(true);
      setConversationError("");

      console.info("[Mentor Discussions] Fetching conversations...");

      try {
        const response = await api.get("/chat/conversations");
        const payload = unwrapResponse(response);

        console.info(
          "[Mentor Discussions] Conversations response:",
          payload
        );

        if (!Array.isArray(payload)) {
          throw new Error(
            "The conversations API did not return an array. Check the backend response."
          );
        }

        if (requestId !== conversationRequestRef.current) {
          return;
        }

        const sorted = [...payload]
          .filter((item) => item && item.id != null)
          .sort((a, b) => {
            const aTime = new Date(
              a.updatedAt || a.lastMessage?.createdAt || 0
            ).getTime();

            const bTime = new Date(
              b.updatedAt || b.lastMessage?.createdAt || 0
            ).getTime();

            return bTime - aTime;
          });

        setConversations(sorted);

        const currentId = selectedConversationIdRef.current;

        const currentStillExists = sorted.some(
          (item) => String(item.id) === String(currentId)
        );

        if (preserveSelection && currentStillExists) {
          setSelectedConversationId(currentId);
        } else if (!currentStillExists) {
          setSelectedConversationId(
            sorted.length === 1 ? sorted[0].id : null
          );
        }
      } catch (error) {
        console.error(
          "[Mentor Discussions] Failed to fetch conversations:",
          error.response?.data || error
        );

        if (requestId === conversationRequestRef.current) {
          setConversationError(getErrorMessage(error));
        }
      } finally {
        if (requestId === conversationRequestRef.current) {
          setLoadingConversations(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    loadConversations({ preserveSelection: false });

    return () => {
      conversationRequestRef.current += 1;
      messageRequestRef.current += 1;
    };
  }, [loadConversations]);

  const markConversationRead = useCallback(async (conversationId) => {
    if (!conversationId) return;

    try {
      await api.patch(
        `/chat/conversations/${conversationId}/read`
      );

      setConversations((previous) =>
        previous.map((conversation) =>
          String(conversation.id) === String(conversationId)
            ? { ...conversation, unreadCount: 0 }
            : conversation
        )
      );
    } catch (error) {
      console.warn(
        "[Mentor Discussions] Could not update read status:",
        error.response?.data || error.message
      );
    }
  }, []);

  const loadMessages = useCallback(
    async (conversationId) => {
      if (!conversationId) return;

      const requestId = ++messageRequestRef.current;

      setLoadingMessages(true);
      setMessageError("");
      setMessages([]);

      try {
        const response = await api.get(
          `/chat/conversations/${conversationId}/messages`,
          {
            params: {
              page: 1,
              limit: PAGE_SIZE,
            },
          }
        );

        if (requestId !== messageRequestRef.current) return;

        const payload = unwrapResponse(response);
        setMessages(getMessageArray(payload));

        await markConversationRead(conversationId);
      } catch (error) {
        console.error(
          "[Mentor Discussions] Failed to load messages:",
          error.response?.data || error
        );

        if (requestId === messageRequestRef.current) {
          setMessages([]);
          setMessageError(getErrorMessage(error));
        }
      } finally {
        if (requestId === messageRequestRef.current) {
          setLoadingMessages(false);
        }
      }
    },
    [markConversationRead]
  );

  useEffect(() => {
    if (!selectedConversationId) {
      messageRequestRef.current += 1;
      setMessages([]);
      setLoadingMessages(false);
      setMessageError("");
      return;
    }

    loadMessages(selectedConversationId);

    return () => {
      messageRequestRef.current += 1;
    };
  }, [selectedConversationId, loadMessages]);

  const handleSelectConversation = useCallback((conversation) => {
    if (!conversation?.id) return;

    setMessageError("");
    setMessageText("");
    setSelectedConversationId(conversation.id);
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();

    const content = messageText.trim();
    const activeConversation = selectedConversationRef.current;

    if (
      !content ||
      !activeConversation ||
      sendingRef.current
    ) {
      return;
    }

    const conversationId = activeConversation.id;

    sendingRef.current = true;
    setSending(true);
    setMessageError("");
    setMessageText("");

    const tempId = `temp-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const optimisticMessage = {
      id: tempId,
      conversationId,
      senderId: currentUserId,
      content,
      createdAt: new Date().toISOString(),
      sendStatus: "sending",
    };

    setMessages((previous) => [...previous, optimisticMessage]);

    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
      scrollMessagesToBottom();
    });

    try {
      const response = await api.post(
        `/chat/conversations/${conversationId}/messages`,
        { content }
      );

      const savedMessage = unwrapResponse(response);

      if (!savedMessage?.id) {
        throw new Error(
          "The server did not return the saved message."
        );
      }

      setMessages((previous) => [
        ...previous.filter((message) => message.id !== tempId),
        { ...savedMessage, sendStatus: "sent" },
      ]);

      setConversations((previous) =>
        previous
          .map((conversation) =>
            String(conversation.id) === String(conversationId)
              ? {
                  ...conversation,
                  updatedAt: savedMessage.createdAt,
                  lastMessage: savedMessage,
                  unreadCount: 0,
                }
              : conversation
          )
          .sort(
            (a, b) =>
              new Date(
                b.updatedAt || b.lastMessage?.createdAt || 0
              ) -
              new Date(
                a.updatedAt || a.lastMessage?.createdAt || 0
              )
          )
      );

      await markConversationRead(conversationId);
    } catch (error) {
      console.error(
        "[Mentor Discussions] Failed to send message:",
        error.response?.data || error
      );

      setMessages((previous) =>
        previous.map((message) =>
          message.id === tempId
            ? {
                ...message,
                sendStatus: "failed",
                sendError: getErrorMessage(error),
              }
            : message
        )
      );
    } finally {
      sendingRef.current = false;
      setSending(false);

      requestAnimationFrame(() => {
        inputRef.current?.focus({ preventScroll: true });
        scrollMessagesToBottom();
      });
    }
  };

  const retryMessage = async (message) => {
    const activeConversation = selectedConversationRef.current;

    if (
      !activeConversation ||
      message.sendStatus !== "failed" ||
      sendingRef.current
    ) {
      return;
    }

    const conversationId = activeConversation.id;
    const tempId = message.id;

    sendingRef.current = true;
    setSending(true);

    setMessages((previous) =>
      previous.map((item) =>
        item.id === tempId
          ? { ...item, sendStatus: "sending", sendError: null }
          : item
      )
    );

    try {
      const response = await api.post(
        `/chat/conversations/${conversationId}/messages`,
        { content: message.content }
      );

      const savedMessage = unwrapResponse(response);

      if (!savedMessage?.id) {
        throw new Error(
          "The server did not return the saved message."
        );
      }

      setMessages((previous) => [
        ...previous.filter((item) => item.id !== tempId),
        { ...savedMessage, sendStatus: "sent" },
      ]);

      setConversations((previous) =>
        previous.map((conversation) =>
          String(conversation.id) === String(conversationId)
            ? {
                ...conversation,
                updatedAt: savedMessage.createdAt,
                lastMessage: savedMessage,
              }
            : conversation
        )
      );
    } catch (error) {
      setMessages((previous) =>
        previous.map((item) =>
          item.id === tempId
            ? {
                ...item,
                sendStatus: "failed",
                sendError: getErrorMessage(error),
              }
            : item
        )
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  const handleRefresh = async () => {
    await loadConversations({ preserveSelection: true });
  };

  const isOwnMessage = (message) =>
    currentUserId != null &&
    message.senderId != null &&
    String(message.senderId) === String(currentUserId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-900/30 p-1.5 sm:p-4 lg:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Mentor discussions"
        className="flex h-[calc(100dvh-0.75rem)] max-h-[850px] min-h-0 w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:h-[min(92dvh,850px)] sm:rounded-[28px]"
      >
        <header className="flex min-h-[64px] shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-3 py-2.5 sm:h-20 sm:px-7 sm:py-0">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:h-12 sm:w-12">
              <MessageCircle size={20} className="sm:h-[25px] sm:w-[25px]" />
            </div>

            <div>
              <h2 className="truncate text-base font-semibold text-slate-800 sm:text-lg">
                Discussions
              </h2>
              <p className="text-xs text-slate-500 sm:text-sm">
                Chat with your mentees
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loadingConversations}
              title="Refresh discussions"
              aria-label="Refresh discussions"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
            >
              <RefreshCw
                size={18}
                className={loadingConversations ? "animate-spin" : ""}
              />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close discussions"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <X size={23} />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <aside className="flex h-[34%] min-h-[125px] w-full shrink-0 flex-col border-b border-slate-200 md:h-auto md:min-h-0 md:w-[280px] md:border-b-0 md:border-r md:sm:w-[350px]">
            <div className="min-h-0 flex-1">
              <StudentList
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
                loading={loadingConversations}
                error={conversationError}
                onRefresh={handleRefresh}
              />
            </div>

            {conversationError && (
              <div
                role="alert"
                className="border-t border-red-100 bg-red-50 px-4 py-3 text-xs text-red-700"
              >
                <p className="font-medium">
                  Unable to load conversations
                </p>
                <p className="mt-1 break-words">
                  {conversationError}
                </p>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="mt-2 font-semibold underline"
                >
                  Try again
                </button>
              </div>
            )}
          </aside>

          <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-slate-50">
            {!selectedConversation ? (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-3 py-4 text-center sm:px-6">
                <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:mb-7 sm:h-[120px] sm:w-[120px]">
                  <MessageCircle size={34} strokeWidth={1.8} className="sm:h-14 sm:w-14" />
                </div>

                <h3 className="text-lg font-semibold text-slate-800 sm:text-2xl">
                  {loadingConversations
                    ? "Loading Discussions..."
                    : conversationError
                      ? "Unable to load Discussions"
                      : conversations.length === 0
                        ? "No assigned mentees found"
                        : "Welcome to Discussions"}
                </h3>

                <p className="mt-2 max-w-md break-words text-xs leading-5 text-slate-500 sm:mt-4 sm:text-sm sm:leading-7">
                  {loadingConversations
                    ? "Fetching your assigned mentees. Please wait."
                    : conversationError
                      ? "Check the error on the left and retry. The actual API error is shown there."
                      : conversations.length === 0
                        ? "The chat API returned no conversations. Check the backend logs for GET /api/chat/conversations and verify the mentor assignment lookup."
                        : "Select a student from the left panel to start chatting."}
                </p>

                {!loadingConversations && (
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="mt-4 inline-flex max-w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 sm:mt-5 sm:px-4 sm:text-sm"
                  >
                    <RefreshCw size={15} />
                    Refresh conversations
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
                  <img
                    src={
                      getMenteeImage(selectedConversation) ||
                      defaultProfile
                    }
                    alt={getMenteeName(selectedConversation)}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = defaultProfile;
                    }}
                    className="h-9 w-9 shrink-0 rounded-full border border-slate-100 object-cover sm:h-10 sm:w-10"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {getMenteeName(selectedConversation)}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Assigned mentee
                    </p>
                  </div>
                </div>

                <div
                  ref={messageListRef}
                  className="min-h-0 flex-1 space-y-1 overflow-x-hidden overflow-y-auto overscroll-contain px-2.5 py-3 sm:px-6 sm:py-4"
                >
                  {loadingMessages ? (
                    <div className="flex justify-center py-10">
                      <LoaderCircle
                        size={23}
                        className="animate-spin text-blue-600"
                      />
                    </div>
                  ) : messageError ? (
                    <div className="py-10 text-center">
                      <p role="alert" className="text-sm text-red-600">
                        {messageError}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          loadMessages(selectedConversation.id)
                        }
                        className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
                      >
                        Retry loading messages
                      </button>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="py-12 text-center">
                      <MessageCircle
                        size={30}
                        className="mx-auto mb-3 text-slate-300"
                      />
                      <p className="text-sm font-medium text-slate-700">
                        No messages yet
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Send a message to start the conversation.
                      </p>
                    </div>
                  ) : (
                    messages.map((message, index) => {
                      const isMine = isOwnMessage(message);
                      const showSender = shouldShowSender(
                        messages,
                        index
                      );

                      return (
                        <div
                          key={message.id}
                          className={`flex min-w-0 items-end gap-1.5 sm:gap-2 ${
                            isMine ? "justify-end" : "justify-start"
                          } ${showSender ? "mt-5" : "mt-1"}`}
                        >
                          {!isMine && showSender && (
                            <img
                              src={
                                getMenteeImage(selectedConversation) ||
                                defaultProfile
                              }
                              alt={getMenteeName(selectedConversation)}
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = defaultProfile;
                              }}
                              className="h-8 w-8 shrink-0 rounded-full object-cover"
                            />
                          )}

                          {!isMine && !showSender && (
                            <div className="w-8 shrink-0" />
                          )}

                          <div
                            className={`min-w-0 max-w-[86%] sm:max-w-[75%] ${
                              isMine ? "text-right" : "text-left"
                            }`}
                          >
                            {showSender && (
                              <div
                                className={`mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 ${
                                  isMine
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                <span className="break-words text-[10px] font-semibold text-slate-700 sm:text-[11px]">
                                  {isMine
                                    ? "You"
                                    : getMenteeName(selectedConversation)}
                                </span>

                                <span className="text-[9px] text-slate-400 sm:text-[10px]">
                                  {formatDate(message.createdAt)}{" "}
                                  {formatTime(message.createdAt)}
                                </span>
                              </div>
                            )}

                            {!showSender && (
                              <p className="mb-1 text-[10px] text-slate-400">
                                {formatTime(message.createdAt)}
                              </p>
                            )}

                            <div
                              className={`inline-block max-w-full whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-left text-xs leading-5 sm:px-4 sm:py-2.5 sm:text-[13px] ${
                                isMine
                                  ? "rounded-br-md bg-blue-600 text-white"
                                  : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                              }`}
                            >
                              {message.content}

                              {isMine &&
                                message.sendStatus === "sending" && (
                                  <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-blue-100">
                                    <Clock size={10} />
                                    Sending
                                  </span>
                                )}

                              {isMine &&
                                message.sendStatus === "failed" && (
                                  <div className="mt-2 flex flex-wrap items-center justify-end gap-2 text-[10px] text-red-200">
                                    <span>Message failed.</span>
                                    <button
                                      type="button"
                                      onClick={() => retryMessage(message)}
                                      disabled={sending}
                                      className="inline-flex items-center gap-1 font-semibold underline disabled:opacity-50"
                                    >
                                      <RotateCw size={10} />
                                      Retry
                                    </button>
                                  </div>
                                )}
                            </div>
                          </div>

                          {isMine && showSender && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
                              You
                            </div>
                          )}

                          {isMine && !showSender && (
                            <div className="w-8 shrink-0" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {messageError && (
                  <p
                    role="alert"
                    className="border-t border-red-100 bg-red-50 px-5 py-2 text-xs text-red-600"
                  >
                    {messageError}
                  </p>
                )}

                <form
                  onSubmit={handleSend}
                  className="flex shrink-0 items-end gap-2 border-t border-slate-200 bg-white p-2.5 sm:gap-3 sm:p-5"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={messageText}
                    onChange={(event) =>
                      setMessageText(event.target.value)
                    }
                    placeholder={`Message ${getMenteeName(
                      selectedConversation
                    )}...`}
                    maxLength={10000}
                    aria-label="Write a message"
                    className="min-h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:py-3 sm:text-sm"
                  />

                  <button
                    type="submit"
                    disabled={!messageText.trim() || sending}
                    className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:h-11 sm:gap-2 sm:px-4 sm:text-sm"
                  >
                    {sending ? (
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={17} />
                    )}
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </>
            )}
          </main>
        </div>
      </section>
    </div>
  );
};

export default MentorDiscussions;