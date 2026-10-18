import { Router } from "express";

import {
  getMyConversations,
  getConversationMessages,
  sendMessage,
  markConversationRead,
} from "./messages.controller.js";

const router = Router();

// Authentication is applied in the parent mount.
router.get("/conversations", getMyConversations);

router.get(
  "/conversations/:conversationId/messages",
  getConversationMessages
);

router.post(
  "/conversations/:conversationId/messages",
  sendMessage
);

router.patch(
  "/conversations/:conversationId/read",
  markConversationRead
);

export default router;