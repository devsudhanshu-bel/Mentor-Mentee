
import express from "express";
import MentorController from "../controllers/mentor.controller.js";

const router = express.Router();

router.get("/", MentorController.getMyMentor);

export default router;
