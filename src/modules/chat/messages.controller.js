import * as messagesService from "./messages.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

/**
 * Get the authenticated user's account ID.
 */
const getAuthenticatedUserId = (req) => {
  return (
    req.user?.id ||
    req.user?.userId ||
    req.user?.userAccountId
  );
};

/**
 * Handle asynchronous controller errors through Express middleware.
 */
const asyncHandler = (handler) => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

/**
 * GET /api/chat/conversations
 *
 * Fetch all conversations associated with the authenticated
 * mentor or mentee, regardless of assignment status.
 */
export const getMyConversations = asyncHandler(async (req, res) => {
  const userId = getAuthenticatedUserId(req);

  const conversations =
    await messagesService.getMyConversations(userId);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Conversations fetched successfully.",
      conversations
    )
  );
});

/**
 * GET /api/chat/conversations/:conversationId/messages
 *
 * Fetch paginated messages for a conversation.
 */
export const getConversationMessages = asyncHandler(
  async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const { conversationId } = req.params;
    const { page = 1, limit = 30 } = req.query;

    const result =
      await messagesService.getConversationMessages(
        userId,
        conversationId,
        page,
        limit
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Messages fetched successfully.",
        result
      )
    );
  }
);

/**
 * POST /api/chat/conversations/:conversationId/messages
 *
 * Save a message and broadcast it to the conversation's
 * Socket.IO room after the database transaction succeeds.
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const userId = getAuthenticatedUserId(req);
  const { conversationId } = req.params;
  const { content } = req.body ?? {};

  // Socket.IO is attached to the Express app in server.js.
  const io = req.app.get("io");

  const message = await messagesService.sendMessage(
    userId,
    conversationId,
    content,
    io
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      "Message sent successfully.",
      message
    )
  );
});

/**
 * PATCH /api/chat/conversations/:conversationId/read
 *
 * Mark a conversation as read for the authenticated participant.
 */
export const markConversationRead = asyncHandler(
  async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const { conversationId } = req.params;

    const conversation =
      await messagesService.markConversationRead(
        userId,
        conversationId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Conversation marked as read.",
        conversation
      )
    );
  }
);