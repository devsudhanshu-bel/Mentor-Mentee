import express from "express";

import AuthController from "../controllers/auth.controller.js";

import { validateLogin } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/login", validateLogin, AuthController.login);

export default router;
