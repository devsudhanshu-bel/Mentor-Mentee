import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import cookieParser from "cookie-parser";

/* ==========================================================
   ROUTES
========================================================== */

import authRoutes from "./modules/auth/routes/auth.routes.js";

import menteeRoutes from "./modules/Mentee/routes/mentee.routes.js";

import adminRoutes from "./modules/admin/routes/admin.routes.js";

/* ==========================================================
   APP
========================================================== */

const app = express();

/* ==========================================================
   SECURITY
========================================================== */

app.use(helmet());

/* ==========================================================
   CORS
========================================================== */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

/* ==========================================================
   BODY PARSERS
========================================================== */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

/* ==========================================================
   LOGGER
========================================================== */

app.use(morgan("dev"));

/* ==========================================================
   HEALTH CHECK
========================================================== */

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Mentor-Mentee Backend Running 🚀",
  });
});

/* ==========================================================
   AUTHENTICATION
========================================================== */

app.use("/api/auth", authRoutes);

/* ==========================================================
   MENTEE / STUDENT
========================================================== */

app.use("/api/mentee", menteeRoutes);

/* ==========================================================
   ADMIN
========================================================== */

app.use("/api/admin", adminRoutes);

/* ==========================================================
   404 HANDLER
========================================================== */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  return res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message:
      err.message ||
      "Internal Server Error",
  });
});

export default app;