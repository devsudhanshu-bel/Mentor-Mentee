import express from "express";

import AuthController from "../controllers/auth.controller.js";

import { validateLogin } from "../validators/auth.validator.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

const router = express.Router();

// ==========================================================
// LOGIN
// ==========================================================

router.post("/login", validateLogin, AuthController.login);

// ==========================================================
// CHANGE PASSWORD
// ==========================================================
//
// Protected endpoint.
//
// The user must already be authenticated.
//
// ==========================================================

router.post("/change-password", authenticate, AuthController.changePassword);

export default router;
