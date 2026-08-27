import express from "express";
import authRoutes from "../modules/auth/routes/auth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;