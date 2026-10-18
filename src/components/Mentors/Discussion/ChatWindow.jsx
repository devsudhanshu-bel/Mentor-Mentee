import React, { useCallback, useEffect, useState } from "react";

import { MessageCircle } from "lucide-react";
import api from "../../../api/axios";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

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
  "Unable to load messages. Please try again.";

const getCurrentUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return user.id || user.userId || user.userAccountId || null;
  } catch {
    return null;
  }
};

const ChatWindow = ({
  conversation = null,
  conversationId: conversationIdProp = null,
  onConversationUpdated,
}) => {
  const conversationId =
    conversationIdProp ?? conversation?.id ?? null;

  const currentUserId = getCurrentUserId();

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [sending, setSending] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([]);
      setMessageError("");
      setLoadingMessages(false);
      return;
    }

    setLoadingMessages(true);
    setMessageError("");

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

      setMessages(items);

      try {
        await api.patch(
          `/chat/conversations/${conversationId}/read`
        );

        onConversationUpdated?.({
          id: conversationId,
          unreadCount: 0,
        });
      } catch (error) {
        console.warn(
          "Unable to update conversation read status:",
          error.response?.data || error.message
        );
      }
    } catch (error) {
      console.error(
        "Unable to load conversation messages:",
        error.response?.data || error
      );

      setMessages([]);
      setMessageError(getErrorMessage(error));
    } finally {
      setLoadingMessages(false);
    }
  }, [conversationId, onConversationUpdated]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleSend = async (content) => {
    if (!conversationId || !content.trim() || sending) {
      return;
    }

    setSending(true);
    setMessageError("");

    try {
      const response = await api.post(
        `/chat/conversations/${conversationId}/messages`,
        {
          content: content.trim(),
        }
      );

      const savedMessage = unwrapResponse(response);

      if (!savedMessage?.id) {
        throw new Error(
          "The server did not return the saved message."
        );
      }

      setMessages((previous) => [
        ...previous,
        savedMessage,
      ]);

      onConversationUpdated?.({
        id: conversationId,
        lastMessage: savedMessage,
        updatedAt: savedMessage.createdAt,
        unreadCount: 0,
      });

      try {
        await api.patch(
          `/chat/conversations/${conversationId}/read`
        );
      } catch (error) {
        console.warn(
          "Unable to update read status:",
          error.response?.data || error.message
        );
      }
    } catch (error) {
      console.error(
        "Unable to send message:",
        error.response?.data || error
      );

      setMessageError(getErrorMessage(error));
      throw error;
    } finally {
      setSending(false);
    }
  };

  if (!conversationId) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <MessageCircle
              size={38}
              className="text-blue-600"
            />
          </div>

          <h3 className="text-lg font-semibold text-slate-800">
            Welcome to Discussions
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Select a mentee from the sidebar to view messages and
            start a conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader conversation={conversation} />

      <ChatMessages
        messages={messages}
        loading={loadingMessages}
        error={messageError}
        currentUserId={currentUserId}
        onRetry={loadMessages}
      />

      <ChatInput
        onSend={handleSend}
        sending={sending}
        disabled={!conversationId || loadingMessages}
        placeholder="Type a message..."
      />
    </div>
  );
};

export default ChatWindow;