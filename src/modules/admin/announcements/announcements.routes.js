
import { Router } from "express";

import AnnouncementsController from "./announcements.controller.js";

const router = Router();

// GET    /api/admin/announcements
// POST   /api/admin/announcements
// GET    /api/admin/announcements/:id
// PATCH  /api/admin/announcements/:id/archive

router.get("/", (req, res) =>
  AnnouncementsController.getAnnouncements(req, res)
);

router.post("/", (req, res) =>
  AnnouncementsController.createAnnouncement(req, res)
);

router.get("/:id", (req, res) =>
  AnnouncementsController.getAnnouncementById(req, res)
);

router.patch("/:id/archive", (req, res) =>
  AnnouncementsController.archiveAnnouncement(req, res)
);

export default router;
