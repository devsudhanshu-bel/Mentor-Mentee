import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import filesController from "./files.controller.js";

const router = Router();

// Private file access — authentication and record-level
// authorization are handled by the middleware and service.
router.get(
  "/private",
  authenticate,
  filesController.getPrivateFile
);

export default router;