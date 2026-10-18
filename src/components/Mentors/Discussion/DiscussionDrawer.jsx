import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  MessageCircle,
  X,
  RefreshCw,
  Send,
  LoaderCircle,
} from "lucide-react";

import api from "../../../api/axios";
import defaultProfile from "../../../assets/profile.jpg";
import StudentList from "./StudentList";

/* =========================================================
   HELPERS
========================================================= */

const unwrapResponse = (response) => {
  const body = response?.data;

  if (body?.success === false) {
    throw new Error(body.message || "Request failed.");
  }

  return body?.data ?? body ?? null;
};

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.error(
      "[DiscussionDrawer] Unable to read stored user:",
      error
    );

    return {};
  }
};

const getCurrentUserId = () => {
  const user = getStoredUser();

  return (
    user.id ??
    user.userId ??
    user.userAccountId ??
    null
  );
};

const getMentee = (conversation) =>
  conversation?.mentee ||
  conversation?.student ||
  conversation?.menteeProfile ||
  conversation?.students ||
  null;

const getMenteeName = (conversation) => {
  const mentee = getMentee(conversation);

  const user =
    mentee?.userAccount ||
    mentee?.user ||
    {};

  return (
    mentee?.fullName ||
    mentee?.name ||
    mentee?.studentName ||
    [
      mentee?.firstName,
      mentee?.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    user?.fullName ||
    user?.name ||
    [
      user?.firstName,
      user?.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    conversation?.menteeName ||
    conversation?.studentName ||
    "Mentee"
  );
};

const getMenteeImage = (conversation) => {
  const mentee = getMentee(conversation);

  const user =
    mentee?.userAccount ||
    mentee?.user ||
    {};

  return (
    mentee?.profileImage ||
    mentee?.profilePicture ||
    mentee?.avatar ||
    user?.profileImage ||
    user?.profilePicture ||
    user?.avatar ||
    defaultProfile
  );
};

const getMessageContent = (message) =>
  message?.content ??
  message?.message ??
  "";

const getMessageTime = (message) => {
  if (!message?.createdAt) return "";

  const date = new Date(message.createdAt);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* =========================================================
   DISCUSSION DRAWER
========================================================= */

const DiscussionDrawer = ({
  isOpen,
  setIsDiscussionOpen,
}) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] =
    useState(null);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const [loadingConversations, setLoadingConversations] =
    useState(false);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [sending, setSending] = useState(false);

  const [conversationError, setConversationError] =
    useState("");

  const [messageError, setMessageError] =
    useState("");

  const messagesEndRef = useRef(null);
  const conversationRequestRef = useRef(0);
  const messageRequestRef = useRef(0);

  const currentUserId = getCurrentUserId();

  const selectedConversation =
    conversations.find(
      (conversation) =>
        String(conversation.id) ===
        String(selectedConversationId)
    ) || null;

  /* =======================================================
     LOAD CONVERSATIONS
  ======================================================= */

  const loadConversations = useCallback(async () => {
    const requestId = ++conversationRequestRef.current;

    setLoadingConversations(true);
    setConversationError("");

    try {
      console.info(
        "[DiscussionDrawer] GET /api/chat/conversations"
      );

      const response = await api.get("/chat/conversations");
      const payload = unwrapResponse(response);

      console.info(
        "[DiscussionDrawer] API response:",
        payload
      );

      if (!Array.isArray(payload)) {
        throw new Error(
          "The conversations endpoint did not return an array."
        );
      }

      if (requestId !== conversationRequestRef.current) {
        return;
      }

      const sorted = payload
        .filter((conversation) => conversation?.id != null)
        .sort(
          (a, b) =>
            new Date(b.updatedAt || 0).getTime() -
            new Date(a.updatedAt || 0).getTime()
        );

      setConversations(sorted);

      setSelectedConversationId((previousId) => {
        if (
          previousId != null &&
          sorted.some(
            (conversation) =>
              String(conversation.id) === String(previousId)
          )
        ) {
          return previousId;
        }

        // Automatically select only when there is one conversation.
        return sorted.length === 1 ? sorted[0].id : null;
      });
    } catch (error) {
      console.error(
        "[DiscussionDrawer] Failed to load conversations:",
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
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    loadConversations();

    return () => {
      conversationRequestRef.current += 1;
      messageRequestRef.current += 1;
    };
  }, [isOpen, loadConversations]);

  /* =======================================================
     LOAD MESSAGES
  ======================================================= */

  const loadMessages = useCallback(async (conversationId) => {
    const requestId = ++messageRequestRef.current;

    if (conversationId == null) {
      setMessages([]);
      setLoadingMessages(false);
      setMessageError("");
      return;
    }

    setLoadingMessages(true);
    setMessageError("");
    setMessages([]);

    try {
      const response = await api.get(
        `/chat/conversations/${conversationId}/messages`,
        {
          params: {
            page: 1,
            limit: 50,
          },
        }
      );

      const payload = unwrapResponse(response);

      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.items)
          ? payload.items
          : Array.isArray(payload?.messages)
            ? payload.messages
            : [];

      // Ignore an older request if the user selected another student.
      if (requestId !== messageRequestRef.current) {
        return;
      }

      setMessages(items);

      try {
        await api.patch(
          `/chat/conversations/${conversationId}/read`
        );

        if (requestId === messageRequestRef.current) {
          setConversations((previous) =>
            previous.map((conversation) =>
              String(conversation.id) === String(conversationId)
                ? { ...conversation, unreadCount: 0 }
                : conversation
            )
          );
        }
      } catch (error) {
        console.warn(
          "[DiscussionDrawer] Read-status update failed:",
          error.response?.data || error.message
        );
      }
    } catch (error) {
      console.error(
        "[DiscussionDrawer] Failed to load messages:",
        error.response?.data || error
      );

      if (requestId === messageRequestRef.current) {
        setMessageError(getErrorMessage(error));
      }
    } finally {
      if (requestId === messageRequestRef.current) {
        setLoadingMessages(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!isOpen || selectedConversationId == null) {
      messageRequestRef.current += 1;
      setMessages([]);
      setMessageError("");
      setLoadingMessages(false);
      return;
    }

    loadMessages(selectedConversationId);
  }, [
    isOpen,
    selectedConversationId,
    loadMessages,
  ]);

  /* =======================================================
     SCROLL TO LATEST MESSAGE
  ======================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  /* =======================================================
     SELECT CONVERSATION
  ======================================================= */

  const handleSelectConversation = useCallback(
    (conversation) => {
      if (conversation?.id == null) return;

      setSelectedConversationId(conversation.id);
      setMessageText("");
      setMessageError("");
    },
    []
  );

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const handleSend = async (event) => {
    event.preventDefault();

    const content = messageText.trim();
    const conversationId = selectedConversationId;

    if (
      !content ||
      conversationId == null ||
      sending
    ) {
      return;
    }

    setSending(true);
    setMessageError("");
    setMessageText("");

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

      // Do not add a message to a different conversation.
      if (
        String(selectedConversationId) ===
        String(conversationId)
      ) {
        setMessages((previous) => [
          ...previous,
          savedMessage,
        ]);
      }

      setConversations((previous) =>
        previous.map((conversation) =>
          String(conversation.id) === String(conversationId)
            ? {
                ...conversation,
                lastMessage: savedMessage,
                updatedAt: savedMessage.createdAt,
                unreadCount: 0,
              }
            : conversation
        )
      );

      try {
        await api.patch(
          `/chat/conversations/${conversationId}/read`
        );
      } catch (error) {
        console.warn(
          "[DiscussionDrawer] Read-status update failed:",
          error.response?.data || error.message
        );
      }
    } catch (error) {
      console.error(
        "[DiscussionDrawer] Failed to send message:",
        error.response?.data || error
      );

      setMessageError(getErrorMessage(error));
      setMessageText(content);
    } finally {
      setSending(false);
    }
  };

  /* =======================================================
     CLOSED DRAWER
  ======================================================= */

  if (!isOpen) return null;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="fixed bottom-24 right-6 z-[9998] flex h-[650px] max-h-[calc(100vh-120px)] w-[920px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <MessageCircle
              size={20}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-[17px] font-semibold text-slate-800">
              Discussions
            </h2>

            <p className="text-[12px] text-slate-500">
              Chat with your mentees
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadConversations}
            disabled={loadingConversations}
            aria-label="Refresh conversations"
            title="Refresh conversations"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={
                loadingConversations ? "animate-spin" : ""
              }
            />
          </button>

          <button
            type="button"
            onClick={() => setIsDiscussionOpen(false)}
            aria-label="Close discussions"
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={22} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="grid min-h-0 flex-1 grid-cols-[300px_minmax(0,1fr)]">
        {/* Sidebar */}
        <div className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
          {conversationError && (
            <div className="border-b border-red-100 bg-red-50 p-3 text-xs text-red-700">
              <p className="break-words">
                {conversationError}
              </p>

              <button
                type="button"
                onClick={loadConversations}
                className="mt-2 font-semibold underline"
              >
                Try again
              </button>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-y-auto">
            <StudentList
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
              loading={loadingConversations}
              error={conversationError}
              onRefresh={loadConversations}
            />
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex min-h-0 min-w-0 flex-col bg-slate-50">
          {!selectedConversation ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                {loadingConversations ? (
                  <LoaderCircle
                    size={42}
                    className="animate-spin text-blue-600"
                  />
                ) : (
                  <MessageCircle
                    size={46}
                    className="text-blue-600"
                  />
                )}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-800">
                {loadingConversations
                  ? "Loading discussions..."
                  : conversationError
                    ? "Unable to load discussions"
                    : conversations.length
                      ? "Welcome to Discussions"
                      : "No assigned mentees found"}
              </h3>

              <p className="mt-3 max-w-sm break-words text-sm leading-6 text-slate-500">
                {loadingConversations
                  ? "Fetching your assigned mentees."
                  : conversationError
                    ? "The request failed. Check the error displayed in the sidebar."
                    : conversations.length
                      ? "Select a student from the left panel to start chatting."
                      : "No conversations were returned by the chat API. Check the backend request and assignment lookup."}
              </p>

              {!loadingConversations && (
                <button
                  type="button"
                  onClick={loadConversations}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Refresh
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Selected Mentee Header */}
              <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
                <img
                  src={getMenteeImage(selectedConversation)}
                  alt={getMenteeName(selectedConversation)}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = defaultProfile;
                  }}
                  className="h-10 w-10 rounded-full border border-slate-100 object-cover"
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

              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {loadingMessages ? (
                  <div className="flex justify-center py-10">
                    <LoaderCircle
                      size={24}
                      className="animate-spin text-blue-600"
                    />
                  </div>
                ) : messageError ? (
                  <div className="break-words py-8 text-center text-sm text-red-600">
                    <p>{messageError}</p>

                    <button
                      type="button"
                      onClick={() =>
                        loadMessages(selectedConversationId)
                      }
                      className="mt-3 font-semibold underline"
                    >
                      Retry
                    </button>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-10 text-center">
                    <MessageCircle
                      size={28}
                      className="mx-auto mb-3 text-slate-300"
                    />

                    <p className="text-sm font-medium text-slate-700">
                      No messages yet
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Send a message to start the conversation.
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => {
                    const senderId = message?.senderId;

                    const ownMessage =
                      currentUserId != null &&
                      senderId != null &&
                      String(senderId) ===
                        String(currentUserId);

                    return (
                      <div
                        key={message.id ?? `${message.createdAt}-${index}`}
                        className={`flex ${
                          ownMessage
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] break-words rounded-2xl px-4 py-2.5 text-sm ${
                            ownMessage
                              ? "rounded-br-sm bg-blue-600 text-white"
                              : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">
                            {getMessageContent(message)}
                          </p>

                          <p
                            className={`mt-1 text-[10px] ${
                              ownMessage
                                ? "text-blue-100"
                                : "text-slate-400"
                            }`}
                          >
                            {getMessageTime(message)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Composer */}
              <form
                onSubmit={handleSend}
                className="shrink-0 border-t border-slate-200 bg-white p-3"
              >
                {messageError && (
                  <p className="mb-2 break-words text-xs text-red-600">
                    {messageError}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(event) =>
                      setMessageText(event.target.value)
                    }
                    placeholder={`Message ${getMenteeName(
                      selectedConversation
                    )}...`}
                    maxLength={10000}
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="submit"
                    disabled={!messageText.trim() || sending}
                    aria-label="Send message"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {sending ? (
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionDrawer;