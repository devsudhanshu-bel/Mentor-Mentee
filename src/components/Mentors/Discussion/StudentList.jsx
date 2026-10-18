
import React, { useMemo, useState } from "react";
import {
  Search,
  MessageCircle,
  RefreshCw,
} from "lucide-react";

import StudentChatCard from "./StudentChatCard";

const getStudent = (conversation) =>
  conversation?.mentee ||
  conversation?.student ||
  conversation?.menteeProfile ||
  conversation?.students ||
  null;

const getStudentName = (conversation) => {
  const student = getStudent(conversation);

  const firstLastName = [
    student?.firstName,
    student?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    student?.fullName ||
    student?.name ||
    student?.user?.fullName ||
    student?.user?.name ||
    firstLastName ||
    conversation?.menteeName ||
    conversation?.studentName ||
    "Mentee"
  );
};

const getStudentImage = (conversation) => {
  const student = getStudent(conversation);

  return (
    student?.profileImage ||
    student?.profilePicture ||
    student?.avatar ||
    student?.image ||
    student?.user?.profileImage ||
    student?.user?.profilePicture ||
    conversation?.menteeProfileImage ||
    conversation?.studentProfileImage ||
    null
  );
};

const getLastMessage = (conversation) =>
  conversation?.lastMessage?.content ||
  conversation?.messages?.[0]?.content ||
  conversation?.lastMessageText ||
  "Start a conversation";

const formatMessageTime = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const StudentList = ({
  conversations = [],
  selectedConversationId = null,
  onSelectConversation,
  loading = false,
  error = "",
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const safeConversations = Array.isArray(conversations)
    ? conversations.filter(
        (conversation) =>
          conversation && conversation.id != null
      )
    : [];

  const filteredConversations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return safeConversations;

    return safeConversations.filter((conversation) => {
      const name = getStudentName(conversation).toLowerCase();
      const lastMessage = getLastMessage(conversation).toLowerCase();

      return (
        name.includes(query) ||
        lastMessage.includes(query)
      );
    });
  }, [safeConversations, searchTerm]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {/* Search */}
      <div className="shrink-0 border-b border-slate-200 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search students..."
            aria-label="Search assigned mentees"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-[13px] outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">
            {safeConversations.length}{" "}
            {safeConversations.length === 1
              ? "conversation"
              : "conversations"}
          </p>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              aria-label="Refresh conversations"
              title="Refresh conversations"
              className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          )}
        </div>
      </div>

      {/* Conversations */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading && safeConversations.length === 0 ? (
          <div className="flex justify-center py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        ) : error && safeConversations.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <MessageCircle
              size={28}
              className="mx-auto mb-2 text-red-300"
            />

            <p className="text-sm font-medium text-red-600">
              Unable to load conversations
            </p>

            <p className="mt-2 break-words text-xs leading-5 text-slate-500">
              {error}
            </p>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50"
              >
                Try again
              </button>
            )}
          </div>
        ) : (
          <>
            {error && (
              <div
                role="alert"
                className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700"
              >
                {error}
              </div>
            )}

            {filteredConversations.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <MessageCircle
                  size={28}
                  className="mx-auto mb-2 text-slate-300"
                />

                <p className="text-sm font-medium text-slate-700">
                  {searchTerm
                    ? "No matching students"
                    : "No assigned mentees yet"}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {searchTerm
                    ? "Try another student name or message."
                    : "Your active assigned mentees will appear here when their conversations are available."}
                </p>

                {!searchTerm && onRefresh && (
                  <button
                    type="button"
                    onClick={onRefresh}
                    disabled={loading}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50"
                  >
                    Refresh
                  </button>
                )}
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const student = {
                  id: conversation.id,
                  name: getStudentName(conversation),
                  profileImage: getStudentImage(conversation),
                  message: getLastMessage(conversation),
                  time: formatMessageTime(
                    conversation.lastMessage?.createdAt ||
                      conversation.updatedAt
                  ),
                  unread: Math.max(
                    0,
                    Number(conversation.unreadCount) || 0
                  ),
                  online: Boolean(conversation.online),
                };

                return (
                  <StudentChatCard
                    key={conversation.id}
                    student={student}
                    active={
                      String(selectedConversationId) ===
                      String(conversation.id)
                    }
                    onClick={() =>
                      onSelectConversation?.(conversation)
                    }
                  />
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentList;
