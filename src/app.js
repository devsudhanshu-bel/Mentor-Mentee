import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import menteeRoutes from "./modules/Mentee/routes/mentee.routes.js";

const app = express();

/* ==========================================================
   Security Middleware
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
   Body Parsers
========================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ==========================================================
   Logger
========================================================== */

app.use(morgan("dev"));

/* ==========================================================
   Health Check
========================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mentor-Mentee Backend Running 🚀",
  });
});

/* ==========================================================
   API Routes
========================================================== */

// Authentication
app.use("/api/auth", authRoutes);

// Mentee
app.use("/api/mentee", menteeRoutes);

/* ==========================================================
   404 Handler
========================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ==========================================================
   Global Error Handler
========================================================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

export default app;