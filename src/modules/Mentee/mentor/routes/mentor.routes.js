import express from "express";

import MentorController from "../controllers/mentor.controller.js";

const router = express.Router();

/*
 * Authentication and STUDENT authorization
 * are already applied by mentee.routes.js.
 */

router.get("/", MentorController.getMyMentor);

export default router;
